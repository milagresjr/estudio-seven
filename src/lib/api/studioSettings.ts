// lib/api/studioSettings.ts
import { api } from './config';
import type {
  StudioSettings,
  CreateStudioSettingsRequest,
} from './types';

export const studioSettingsApi = {
  // Public endpoint
  get: async (): Promise<StudioSettings> => {
    const { data } = await api.get<StudioSettings>(
      '/studio-settings'
    );
    return data;
  },

  // Protected endpoint
  save: async (
    payload: CreateStudioSettingsRequest
  ): Promise<StudioSettings> => {
    const { data } = await api.post<StudioSettings>(
      '/studio-settings',
      payload
    );
    return data;
  },
};
