import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const adminApi = axios.create({
  baseURL: `${API_BASE}/api/admin/team-members`,
  withCredentials: true,
});

const publicApi = axios.create({
  baseURL: `${API_BASE}/api/team-members`,
});

function toFormData(payload: Record<string, any>) {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (value === null || value === undefined) return;
    if (value instanceof File) {
      formData.append(key, value);
    } else if (typeof value === 'object') {
      formData.append(key, JSON.stringify(value));
    } else {
      formData.append(key, String(value));
    }
  });
  return formData;
}

function hasFile(payload: Record<string, any>) {
  return Object.values(payload).some((v) => v instanceof File);
}

// ----- Admin CRUD -----

export async function getAllTeamMembersAdmin() {
  const { data } = await adminApi.get('/');
  return data;
}

export async function createTeamMember(payload: Record<string, any>) {
  if (hasFile(payload)) {
    const { data } = await adminApi.post('/', toFormData(payload), {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  }
  const { data } = await adminApi.post('/', payload);
  return data;
}

export async function updateTeamMember(id: number, payload: Record<string, any>) {
  if (hasFile(payload)) {
    const { data } = await adminApi.put(`/${id}`, toFormData(payload), {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  }
  const { data } = await adminApi.put(`/${id}`, payload);
  return data;
}

export async function deleteTeamMember(id: number) {
  await adminApi.delete(`/${id}`);
  return true;
}

// ----- Public read -----

export async function getPublicTeamMembers() {
  const { data } = await publicApi.get('/');
  return data;
}