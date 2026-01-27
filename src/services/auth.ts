import { api } from "./api";

export async function login(email: string, password: string) {
  const response = await api.post("/auth/login", {
    email,
    password,
  });

  const { token, user } = response.data;

  localStorage.setItem("auth_token", token);
  api.defaults.headers.common.Authorization = `Bearer ${token}`;

  return user;
}

export async function logout() {
  await api.post("/auth/logout");
  localStorage.removeItem("auth_token");
}

export async function me() {
  const token = localStorage.getItem("auth_token");

  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    const response = await api.get("/auth/me");
    return response.data;
  }

  return null;
}
