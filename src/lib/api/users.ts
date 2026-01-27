// lib/api/users.ts
import { api } from './config';
import type {
  User,
  CreateUserRequest,
  UpdateUserRequest,
  PaginatedResponse,
} from './types';

export const usersApi = {
  getAll: async (params?: {
    page?: number;
    per_page?: number;
  }): Promise<PaginatedResponse<User>> => {
    const { data } = await api.get<
      PaginatedResponse<User>
    >('/users', { params });

    return data;
  },

  getById: async (id: number): Promise<User> => {
    const { data } = await api.get<User>(`/users/${id}`);
    return data;
  },

  create: async (
    payload: CreateUserRequest
  ): Promise<User> => {
    const { data } = await api.post<User>(
      '/users',
      payload
    );
    return data;
  },

  update: async (
    id: number,
    payload: UpdateUserRequest
  ): Promise<User> => {
    const { data } = await api.put<User>(
      `/users/${id}`,
      payload
    );
    return data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/users/${id}`);
  },
};
