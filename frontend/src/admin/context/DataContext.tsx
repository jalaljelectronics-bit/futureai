import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import type { DB, ManagedTable, AnyRecord } from "../types";
import { seedDB } from "../data/seed";
import { getCourses, createCourse, updateCourse, deleteCourse } from "../../api/courseApi";

/* ============================================================
   DATA CONTEXT
   Holds the mock DB in React state for most tables, but the
   `courses` table is wired to the real backend via courseApi.
   As other tables get real endpoints, add a similar special
   case for each.
   ============================================================ */

interface DataContextValue {
  db: DB;
  addRecord: (table: ManagedTable, record: Record<string, any>) => Promise<AnyRecord>;
  updateRecord: (table: ManagedTable, id: number, updates: Record<string, any>) => Promise<AnyRecord | null>;
  deleteRecord: (table: ManagedTable, id: number) => Promise<void>;
  getRecord: (table: ManagedTable, id: number) => AnyRecord | null;
}

const DataContext = createContext<DataContextValue | undefined>(undefined);

function nextId(rows: { id: number }[]): number {
  return rows.reduce((max, r) => Math.max(max, r.id || 0), 0) + 1;
}

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [db, setDb] = useState<DB>(seedDB);

  // Load real courses from the backend on mount, replacing the seed data for that table.
  useEffect(() => {
    getCourses()
      .then((courses) => {
        setDb((prev) => ({ ...prev, courses: courses as any }));
      })
      .catch((err) => {
        console.error("Failed to load courses from backend:", err);
      });
  }, []);

  const addRecord = useCallback(async (table: ManagedTable, record: Record<string, any>) => {
    if (table === "courses") {
      const created = await createCourse(record);
      setDb((prev) => ({ ...prev, courses: [...(prev.courses as any), created] }));
      return created;
    }

    let created!: AnyRecord;
    setDb((prev) => {
      const rows = prev[table] as unknown as AnyRecord[];
      created = { ...record, id: nextId(rows) } as AnyRecord;
      return { ...prev, [table]: [...rows, created] };
    });
    return created;
  }, []);

  const updateRecord = useCallback(async (table: ManagedTable, id: number, updates: Record<string, any>) => {
    if (table === "courses") {
      const updated = await updateCourse(id, updates);
      setDb((prev) => ({
        ...prev,
        courses: (prev.courses as any).map((r: AnyRecord) => (r.id === id ? updated : r)),
      }));
      return updated;
    }

    let updated: AnyRecord | null = null;
    setDb((prev) => {
      const rows = prev[table] as unknown as AnyRecord[];
      const next = rows.map((r) => {
        if (r.id === id) {
          updated = { ...r, ...updates };
          return updated;
        }
        return r;
      });
      return { ...prev, [table]: next };
    });
    return updated;
  }, []);

  const deleteRecord = useCallback(async (table: ManagedTable, id: number) => {
    if (table === "courses") {
      await deleteCourse(id);
      setDb((prev) => ({
        ...prev,
        courses: (prev.courses as any).filter((r: AnyRecord) => r.id !== id),
      }));
      return;
    }

    setDb((prev) => {
      const rows = prev[table] as unknown as AnyRecord[];
      return { ...prev, [table]: rows.filter((r) => r.id !== id) };
    });
  }, []);

  const getRecord = useCallback(
    (table: ManagedTable, id: number) => {
      const rows = db[table] as unknown as AnyRecord[];
      return rows.find((r) => r.id === id) || null;
    },
    [db]
  );

  return (
    <DataContext.Provider value={{ db, addRecord, updateRecord, deleteRecord, getRecord }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used inside DataProvider");
  return ctx;
}