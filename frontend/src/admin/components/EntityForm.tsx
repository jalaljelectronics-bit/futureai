import React, { useState } from "react";
import type { EntityConfig, FieldConfig } from "../config/entities";
import type { AnyRecord } from "../types";

interface Props {
  entity: EntityConfig;
  record: AnyRecord | null; // null = creating new
  onSubmit: (data: Record<string, any>) => void;
  onCancel: () => void;
}

// ---- generic line-based list helpers (used for outcomes / tools) ----
function listToText(list: string[] | undefined): string {
  return (list || []).join("\n");
}
function textToList(text: string): string[] {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
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
    if (f.special === "list") {
      // outcomes / tools live inside courseOutline on the real record
      values[f.name] = listToText(outline[f.name] ?? record?.[f.name]);
      return;
    }
    if (f.special === "curriculum") {
      values[f.name] = curriculumToText(outline.curriculum ?? record?.curriculum);
      return;
    }
    if (f.name === "instructor_name") {
      values[f.name] = outline.instructor?.name ?? "";
      return;
    }
    if (f.name === "instructor_role") {
      values[f.name] = outline.instructor?.role ?? "";
      return;
    }
    if (f.name === "instructor_bio") {
      values[f.name] = outline.instructor?.bio ?? "";
      return;
    }
    if (f.name === "intro" || f.name === "whoFor") {
      values[f.name] = outline[f.name] ?? record?.[f.name] ?? "";
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

  function setField(name: string, value: any) {
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const data: Record<string, any> = {};
    const outlineFieldNames = new Set([
      "intro",
      "outcomes",
      "tools",
      "whoFor",
      "instructor_name",
      "instructor_role",
      "instructor_bio",
      "curriculum",
    ]);
    const hasOutlineFields = entity.fields.some((f) => outlineFieldNames.has(f.name));

    entity.fields.forEach((f) => {
      if (outlineFieldNames.has(f.name)) return; // handled separately below
      if (f.type === "number") {
        const v = values[f.name];
        data[f.name] = v === "" || v === null || v === undefined ? null : Number(v);
      } else {
        data[f.name] = values[f.name];
      }
    });

    if (hasOutlineFields) {
      data.courseOutline = {
        intro: values.intro || "",
        outcomes: textToList(values.outcomes || ""),
        tools: textToList(values.tools || ""),
        whoFor: values.whoFor || "",
        instructor: {
          name: values.instructor_name || "",
          role: values.instructor_role || "",
          bio: values.instructor_bio || "",
        },
        curriculum: textToCurriculum(values.curriculum || ""),
      };
    }

    onSubmit(data);
  }

  return (
    <form onSubmit={handleSubmit}>
      {entity.fields.map((f) => (
        <FieldInput key={f.name} field={f} value={values[f.name]} onChange={(v) => setField(f.name, v)} />
      ))}
      <div className="modal-actions">
        <button type="button" className="btn btn-outline" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn btn-primary">{record ? "Save changes" : "Create"}</button>
      </div>
    </form>
  );
}

function FieldInput({ field, value, onChange }: { field: FieldConfig; value: any; onChange: (v: any) => void }) {
  if (field.type === "checkbox" || field.name === "is_active" || field.name === "active") {
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