// lib/api/userRoles.ts
import { api } from './config';
import type {
  UserRole,
  CreateUserRoleRequest,
  UpdateUserRoleRequest,
  PaginatedResponse,
} from './types';

export const userRolesApi = {
  getAll: async (params?: {
    page?: number;
    per_page?: number;
  }): Promise<PaginatedResponse<UserRole>> => {
    const { data } = await api.get<
      PaginatedResponse<UserRole>
    >('/user-roles', { params });

    return data;
  },

  create: async (
    payload: CreateUserRoleRequest
  ): Promise<UserRole> => {
    const { data } = await api.post<UserRole>(
      '/user-roles',
      payload
    );
    return data;
  },

  update: async (
    id: number,
    payload: UpdateUserRoleRequest
  ): Promise<UserRole> => {
    const { data } = await api.put<UserRole>(
      `/user-roles/${id}`,
      payload
    );
    return data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/user-roles/${id}`);
  },
};
