import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const API = axios.create({
  baseURL: `${API_BASE}/api`,
  withCredentials: true,
});

// Public — no auth needed, but withCredentials is harmless here too.
export async function submitContactForm(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) {
  const res = await API.post("/contact", data);
  return res.data;
}

// Admin — requires the admin cookie.
export async function getContactSubmissionsAdmin() {
  const res = await API.get("/admin/contact-submissions");
  return res.data;
}

export async function updateContactSubmission(id: number, updates: { isRead?: boolean }) {
  const res = await API.put(`/admin/contact-submissions/${id}`, updates);
  return res.data;
}

export async function deleteContactSubmission(id: number) {
  await API.delete(`/admin/contact-submissions/${id}`);
}
