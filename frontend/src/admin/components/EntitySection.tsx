import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { useToast } from "../context/ToastContext";
import { ENTITIES, singularize } from "../config/entities";
import type { ManagedTable, AnyRecord } from "../types";
import DataTable from "../components/DataTable";
import Modal from "../components/Modal";
import EntityForm from "../components/EntityForm";

interface Props {
  section: ManagedTable;
}

export default function EntitySection({ section }: Props) {
  const { db, addRecord, updateRecord, deleteRecord } = useData();
  const { show } = useToast();
  const entity = ENTITIES[section];
  const rows = db[section] as unknown as AnyRecord[];

  const [editingId, setEditingId] = useState<number | null | "new">(null);

  const label = singularize(entity.label);

  function openNew() {
    setEditingId("new");
  }
  function openEdit(id: number) {
    setEditingId(id);
  }
  function closeForm() {
    setEditingId(null);
  }

  async function handleSubmit(data: Record<string, any>) {
    try {
      if (editingId === "new") {
        await addRecord(section, data);
        show(`${label} created.`);
      } else if (typeof editingId === "number") {
        await updateRecord(section, editingId, data);
        show(`${label} updated.`);
      }
      closeForm();
    } catch (err: any) {
      console.error(`Failed to save ${label}:`, err);
      const message = err?.response?.data?.message || `Failed to save ${label.toLowerCase()}.`;
      show(message);
    }
  }

  async function handleDelete(id: number) {
    if (!window.confirm(`Delete this ${label.toLowerCase()}? This can't be undone.`)) return;
    try {
      await deleteRecord(section, id);
      show(`${label} deleted.`);
    } catch (err: any) {
      console.error(`Failed to delete ${label}:`, err);
      const message = err?.response?.data?.message || `Failed to delete ${label.toLowerCase()}.`;
      show(message);
    }
  }

  async function handleToggleRead(row: AnyRecord) {
    await updateRecord(section, row.id, { is_read: !row.is_read });
    show("Submission updated.");
  }

  const editingRecord = editingId === "new" ? null : editingId !== null ? rows.find((r) => r.id === editingId) || null : undefined;

  return (
    <div className="panel">
      <div className="panel-head">
        <div>
          <h2>{entity.label}</h2>
          <p>{entity.description}</p>
        </div>
        {!entity.readOnly && (
          <button className="btn btn-primary" onClick={openNew}>
            + Add {label}
          </button>
        )}
      </div>

      {section === "contact_submissions" ? (
        <DataTable
          columns={entity.columns}
          rows={rows.slice().reverse()}
          renderRowActions={(row) => (
            <>
              <button className="btn btn-outline btn-sm" onClick={() => handleToggleRead(row)}>
                {row.is_read ? "Mark unread" : "Mark read"}
              </button>
              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(row.id)}>
                Delete
              </button>
            </>
          )}
        />
      ) : (
        <DataTable columns={entity.columns} rows={rows} onEdit={openEdit} onDelete={handleDelete} />
      )}

      {editingRecord !== undefined && (
        <Modal title={`${editingId === "new" ? "Add" : "Edit"} ${label}`} onClose={closeForm}>
          <EntityForm entity={entity} record={editingRecord} onSubmit={handleSubmit} onCancel={closeForm} />
        </Modal>
      )}
    </div>
  );
}