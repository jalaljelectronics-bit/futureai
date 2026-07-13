import React, { useRef, useState } from "react";
import type { EntityConfig, FieldConfig } from "../config/entities";
import type { AnyRecord } from "../types";
import { useData } from "../context/DataContext";

const MAX_IMAGE_BYTES = 3 * 1024 * 1024; // 3 MB

/**
 * Image upload field. Passes the raw File object through onChange so the
 * API layer's hasFile() check picks it up and sends it as multipart/
 * form-data — multer + Cloudinary handle it from there. A URL box is
 * offered as an alternative for images already hosted elsewhere.
 */
function FileField({
  field,
  value,
  onChange,
}: {
  field: FieldConfig;
  value: any;
  onChange: (v: any) => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setError("Image is larger than 3 MB — please pick a smaller one.");
      return;
    }
    setPreviewUrl(URL.createObjectURL(file));
    onChange(file);
    if (inputRef.current) inputRef.current.value = "";
  }

  const isFile = value instanceof File;
  const isExistingUrl = typeof value === "string" && value.trim() !== "";
  const displaySrc = isFile ? previewUrl : isExistingUrl ? value : null;

  return (
    <div className="field">
      <label>
        {field.label}
        {field.required ? " *" : ""}
      </label>

      <div className="upload-row">
        <div className={`upload-preview${displaySrc ? "" : " is-empty"}`}>
          {displaySrc ? <img src={displaySrc} alt="Preview" /> : <span>No image</span>}
        </div>

        <div className="upload-controls">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="upload-input"
            onChange={handleFile}
          />
          <div className="upload-buttons">
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={() => inputRef.current?.click()}
            >
              {displaySrc ? "Replace image" : "Upload image"}
            </button>
            {displaySrc && (
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => {
                  setPreviewUrl(null);
                  onChange("");
                }}
              >
                Remove
              </button>
            )}
          </div>
          {!isFile && (
            <input
              type="text"
              className="upload-url"
              placeholder="…or paste an image URL"
              value={isExistingUrl ? value : ""}
              onChange={(e) => onChange(e.target.value)}
            />
          )}
        </div>
      </div>

      {field.hint && !error && <div className="upload-hint">{field.hint}</div>}
      {error && <div className="upload-error">{error}</div>}
    </div>
  );
}

interface Props {
  entity: EntityConfig;
  record: AnyRecord | null; // null = creating new
  onSubmit: (data: Record<string, any>) => void;
  onCancel: () => void;
}

// ---- curriculum helpers: Title | Duration | Body per line ----
interface CurriculumItem {
  title: string;
  dur: string;
  body: string;
}
function curriculumToText(items: CurriculumItem[] | undefined): string {
  return (items || []).map((m) => `${m.title} | ${m.dur || ""} | ${m.body || ""}`).join("\n");
}
function textToCurriculum(text: string): CurriculumItem[] {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((line) => {
      const [title, dur, body] = line.split("|").map((s) => (s || "").trim());
      return { title, dur, body };
    });
}

function initialValues(fields: FieldConfig[], record: AnyRecord | null): Record<string, any> {
  const values: Record<string, any> = {};
  const outline = record?.courseOutline || {};

  fields.forEach((f) => {
    if (f.special === "curriculum") {
      values[f.name] = curriculumToText(outline.curriculum);
      return;
    }

    const raw = record ? record[f.name] : undefined;
    if (f.type === "checkbox") {
      values[f.name] = raw ?? f.default ?? false;
    } else {
      values[f.name] = raw ?? f.default ?? "";
    }
  });
  return values;
}

export default function EntityForm({ entity, record, onSubmit, onCancel }: Props) {
  const [values, setValues] = useState<Record<string, any>>(() => initialValues(entity.fields, record));

  // Only needed for course-select fields (Success Stories linking to a Course).
  const { db } = useData();
  const courses = (db.courses as any) || [];

  function setField(name: string, value: any) {
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const data: Record<string, any> = {};
    const hasCurriculumField = entity.fields.some((f) => f.special === "curriculum");

    entity.fields.forEach((f) => {
      if (f.special === "curriculum") return; // handled separately below

      if (f.special === "course-select") {
        const v = values[f.name];
        data[f.name] = v === "" || v === null || v === undefined ? null : Number(v);
        return;
      }

      if (f.type === "number") {
        const v = values[f.name];
        data[f.name] = v === "" || v === null || v === undefined ? null : Number(v);
      } else {
        data[f.name] = values[f.name];
      }
    });

    if (hasCurriculumField) {
      const curriculumFieldName = entity.fields.find((f) => f.special === "curriculum")!.name;
      data.courseOutline = {
        curriculum: textToCurriculum(values[curriculumFieldName] || ""),
      };
    }

    onSubmit(data);
  }

  return (
    <form onSubmit={handleSubmit}>
      {entity.fields.map((f) => (
        <FieldInput
          key={f.name}
          field={f}
          value={values[f.name]}
          onChange={(v) => setField(f.name, v)}
          courses={courses}
        />
      ))}
      <div className="modal-actions">
        <button type="button" className="btn btn-outline" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn btn-primary">{record ? "Save changes" : "Create"}</button>
      </div>
    </form>
  );
}

function FieldInput({
  field,
  value,
  onChange,
  courses,
}: {
  field: FieldConfig;
  value: any;
  onChange: (v: any) => void;
  courses: { id: number; title: string }[];
}) {
  if (field.special === "course-select") {
    return (
      <div className="field">
        <label>{field.label}</label>
        <select value={value ?? ""} onChange={(e) => onChange(e.target.value)}>
          <option value="">— None —</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>{c.title}</option>
          ))}
        </select>
        {field.hint && <small className="field-hint">{field.hint}</small>}
      </div>
    );
  }

  if (field.type === "checkbox" || field.name === "isActive" || field.name === "is_active" || field.name === "active") {
    return (
      <div className="field">
        <label>{field.label}</label>
        <select
          value={value ? "true" : "false"}
          onChange={(e) => onChange(e.target.value === "true")}
        >
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
      </div>
    );
  }

  if (field.type === "textarea") {
    return (
      <div className="field">
        <label>
          {field.label}
          {field.required ? " *" : ""}
        </label>
        <textarea
          rows={field.rows || 3}
          required={field.required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.hint}
        />
        {field.hint && <small className="field-hint">{field.hint}</small>}
      </div>
    );
  }

  if (field.type === "select") {
    return (
      <div className="field">
        <label>{field.label}</label>
        <select value={value} onChange={(e) => onChange(e.target.value)}>
          {(field.options || []).map((opt: string) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
    );
  }

  if (field.type === "file") {
    return <FileField field={field} value={value} onChange={onChange} />;
  }

  return (
    <div className="field">
      <label>
        {field.label}
        {field.required ? " *" : ""}
      </label>
      <input
        type={field.type}
        step={field.step}
        required={field.required}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.hint}
      />
    </div>
  );
}