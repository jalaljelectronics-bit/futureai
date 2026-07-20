import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const API = axios.create({
  baseURL: `${API_BASE}/api`,
  withCredentials: true,
});
export default API;
