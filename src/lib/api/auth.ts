// lib/api/auth.ts
import { api } from './config';
import type { LoginRequest, LoginResponse, User } from './types';

const TOKEN_KEY = 'token';

export const authApi = {
  // Login with email and password
  login: async (
    credentials: LoginRequest
  ): Promise<LoginResponse> => {
    const { data } = await api.post<LoginResponse>(
      '/login',
      credentials
    );

    if (data.token) {
      localStorage.setItem(TOKEN_KEY, data.token);
      api.defaults.headers.common.Authorization = `Bearer ${data.token}`;
    }

    return data;
  },

  // Logout current user
  logout: async (): Promise<void> => {
    try {
      await api.post('/logout');
    } finally {
      localStorage.removeItem(TOKEN_KEY);
      delete api.defaults.headers.common.Authorization;
    }
  },

  // Get current authenticated user
  getCurrentUser: async (): Promise<User> => {
    const { data } = await api.get<User>('/user');
    return data;
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return Boolean(localStorage.getItem(TOKEN_KEY));
  },
};
