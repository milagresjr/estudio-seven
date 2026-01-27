// lib/api/profile.ts
import { api } from './config';
import type { Profile } from './types';

export interface CreateProfileRequest {
  avatar_url?: string;
  bio?: string;
  phone?: string;
  location?: string;
  website?: string;
  social_links?: Record<string, string>;
}

export interface UpdateProfileRequest
  extends Partial<CreateProfileRequest> {}

export const profileApi = {
  get: async (): Promise<Profile> => {
    const { data } = await api.get<Profile>('/profile');
    return data;
  },

  create: async (
    payload: CreateProfileRequest
  ): Promise<Profile> => {
    const { data } = await api.post<Profile>(
      '/profile',
      payload
    );
    return data;
  },

  update: async (
    payload: UpdateProfileRequest
  ): Promise<Profile> => {
    const { data } = await api.put<Profile>(
      '/profile',
      payload
    );
    return data;
  },

  delete: async (): Promise<void> => {
    await api.delete('/profile');
  },
};
