import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const API = axios.create({
  baseURL: `${API_BASE}/api`,
  withCredentials: true,
});

export async function getCourses() {
  const res = await API.get("/courses");
  return res.data;
}

export async function getCourseBySlug(slug: string) {
  const res = await API.get(`/courses/${slug}`);
  return res.data;
}

function toFormData(payload: Record<string, any>) {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (value === null || value === undefined) return;
    if (value instanceof File) {
      formData.append(key, value);
    } else if (typeof value === "object") {
      formData.append(key, JSON.stringify(value)); // e.g. courseOutline
    } else {
      formData.append(key, String(value));
    }
  });
  return formData;
}

function hasFile(payload: Record<string, any>) {
  return Object.values(payload).some((v) => v instanceof File);
}

export const createCourse = async (course: any) => {
  if (hasFile(course)) {
    const res = await API.post("/admin/courses", toFormData(course), {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  }
  const res = await API.post("/admin/courses", course);
  return res.data;
};

export const updateCourse = async (id: number, course: any) => {
  if (hasFile(course)) {
    const res = await API.put(`/admin/courses/${id}`, toFormData(course), {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  }
  const res = await API.put(`/admin/courses/${id}`, course);
  return res.data;
};

export const deleteCourse = async (id: number) => {
  await API.delete(`/admin/courses/${id}`);
};
