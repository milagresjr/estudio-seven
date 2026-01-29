// lib/api/config.ts
import axios, { AxiosError } from 'axios';

export const api = axios.create({
  baseURL: 'https://api.softseven.ao/api/', // ou process.env
  withCredentials: true, // se usar cookies / sessão
  headers: {
    Accept: 'application/json',
  },
});

export const UrlBase = 'https://api.softseven.ao';

// Interceptor de request (ex: token)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Interceptor de response (padronizar erro)
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<any>) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'Erro inesperado';

    return Promise.reject(new Error(message));
  }
);
