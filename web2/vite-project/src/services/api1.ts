import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export interface User {
  id: string;
  email: string;
  name: string;
  plan: 'free' | 'pro';
  role: 'admin' | 'member';
  tenantSlug: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

const api = axios.create({
  baseURL: API_URL,
});

// Attach token automatically
api.interceptors.request.use((config: any) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const login = (email: string, password: string) =>
  api.post("/auth/login", { email, password });

// Users
export const getCurrentUser = (): Promise<{ data: User }> => api.get("/users/me");

// Notes CRUD
export const getNotes = (): Promise<{ data: Note[] }> => api.get("/notes");

export const getNoteById = (id: string): Promise<{ data: Note }> => api.get(`/notes/${id}`);

export const createNote = (title: string, content: string): Promise<{ data: Note }> =>
  api.post("/notes", { title, content });

export const updateNote = (id: string, title: string, content: string): Promise<{ data: Note }> =>
  api.put(`/notes/${id}`, { title, content });

export const deleteNote = (id: string): Promise<{ data: { success: boolean } }> => api.delete(`/notes/${id}`);

// Tenants
export const upgradeTenant = (slug: string): Promise<{ data: { success: boolean } }> =>
  api.post(`/tenants/${slug}/upgrade`);

// Health
export const healthCheck = (): Promise<{ data: { status: string } }> => api.get("/health");

export default api;
