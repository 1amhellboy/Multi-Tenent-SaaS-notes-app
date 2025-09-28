import axios from "axios";
import type { ApiUser, ApiNote } from "./type";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const api = axios.create({
  baseURL: API_URL,
});

// Attach token + log requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  console.log(
    "➡️ API Request:",
    (config.method || "GET").toUpperCase(),
    `${config.baseURL ?? ""}${config.url ?? ""}`,
    config.data || ""
  );

  return config;
});


// Auth

export const login = async (
  email: string,
  password: string
): Promise<string> => {
  const res = await api.post<{ token: string }>("/auth/login", { email, password });
  const token = res.data.token;
  if (token) {
    localStorage.setItem("token", token);
  }
  return token;
};


export const logout = async () => {
  await api.post("/auth/logout");
  localStorage.removeItem("token"); // optional safety
  return true;
};



// Users

export const getCurrentUser = async (): Promise<{ user: ApiUser }> => {
  const res = await api.get<{ user: ApiUser }>("/users/me");
  return res.data;
};

// Notes CRUD

export const getNotes = async (): Promise<ApiNote[]> => {
  const res = await api.get<ApiNote[]>("/notes");
  return res.data;
};

export const getNoteById = async (id: string): Promise<ApiNote> => {
  const res = await api.get<ApiNote>(`/notes/${id}`);
  return res.data;
};

export const createNote = async (
  title: string,
  content: string
): Promise<ApiNote> => {
  const res = await api.post<ApiNote>("/notes", { title, content });
  return res.data;
};

export const updateNote = async (
  id: string,
  title: string,
  content: string
): Promise<ApiNote> => {
  const res = await api.put<ApiNote>(`/notes/${id}`, { title, content });
  return res.data;
};

export const deleteNote = async (id: string): Promise<boolean> => {
  await api.delete(`/notes/${id}`);
  return true;
};


// Tenants

export const upgradeTenant = async (
  slug: string
): Promise<{ message: string; tenant: any }> => {
  const res = await api.post<{ message: string; tenant: any }>(
    `/tenants/${slug}/upgrade`
  );
  return res.data;
};


// Health

export const healthCheck = async (): Promise<{ status: string }> => {
  const res = await api.get<{ status: string }>("/health");
  return res.data;
};

export default {
  login,
  getCurrentUser,
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
  upgradeTenant,
  healthCheck,
};
