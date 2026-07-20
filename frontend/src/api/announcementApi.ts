import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const API = axios.create({
  baseURL: `${API_BASE}/api`,
  withCredentials: true,
});

// Public — active announcements only, within their date window.
export async function getPublicAnnouncements() {
  const res = await API.get("/announcements");
  return res.data;
}

// Admin — every announcement, regardless of status/date.
export async function getAllAnnouncementsAdmin() {
  const res = await API.get("/admin/announcements");
  return res.data;
}

export async function createAnnouncement(data: Record<string, any>) {
  const res = await API.post("/admin/announcements", data);
  return res.data;
}

export async function updateAnnouncement(id: number, updates: Record<string, any>) {
  const res = await API.put(`/admin/announcements/${id}`, updates);
  return res.data;
}

export async function deleteAnnouncement(id: number) {
  await API.delete(`/admin/announcements/${id}`);
}
