import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Admin instance — cookie-based JWT, so withCredentials is mandatory.
const adminApi = axios.create({
  baseURL: `${API_BASE}/api/admin/blog-posts`,
  withCredentials: true,
});

// Public instance — no auth, no cookies needed.
const publicApi = axios.create({
  baseURL: `${API_BASE}/api/blog-posts`,
});

// ----- Admin CRUD -----

export async function getAllBlogPostsAdmin() {
  const { data } = await adminApi.get('/');
  return data;
}

export async function getBlogPostByIdAdmin(id: number) {
  const { data } = await adminApi.get(`/${id}`);
  return data;
}

export async function createBlogPost(payload: Record<string, any>) {
  const { data } = await adminApi.post('/', payload);
  return data;
}

export async function updateBlogPost(id: number, payload: Record<string, any>) {
  const { data } = await adminApi.put(`/${id}`, payload);
  return data;
}

export async function deleteBlogPost(id: number) {
  await adminApi.delete(`/${id}`);
  return true;
}

// ----- Public reads -----

export async function getPublishedBlogPosts() {
  const { data } = await publicApi.get('/');
  return data;
}

export async function getPublishedBlogPostBySlug(slug: string) {
  const { data } = await publicApi.get(`/${slug}`);
  return data;
}