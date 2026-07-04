import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
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

export const createCourse = async (course: any) => {
  const res = await API.post("/admin/courses", course);
  return res.data;
};

export const updateCourse = async (id: number, course: any) => {
  const res = await API.put(`/admin/courses/${id}`, course);
  return res.data;
};

export const deleteCourse = async (id: number) => {
  await API.delete(`/admin/courses/${id}`);
};