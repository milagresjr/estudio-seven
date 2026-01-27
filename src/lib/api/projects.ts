// lib/api/projects.ts
import { api } from './config';
import type {
  Project,
  ProjectMedia,
  CreateProjectRequest,
  UpdateProjectRequest,
  PaginatedResponse,
} from './types';

export const projectsApi = {
  // Public endpoints
  getAll: async (params?: {
    page?: number;
    per_page?: number;
  }): Promise<PaginatedResponse<Project>> => {
    const { data } = await api.get('/projects', { params });
    return data;
  },

  getById: async (id: number): Promise<Project> => {
    const { data } = await api.get(`/projects/${id}`);
    return data;
  },

  getMedia: async (projectId: number): Promise<ProjectMedia[]> => {
    const { data } = await api.get(`/projects/${projectId}/media`);
    return data;
  },

  // Protected endpoints
  create(data: FormData) {
  return api.post('/projects', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
,

  update: async (
    id: number,
    payload: FormData | UpdateProjectRequest
  ): Promise<Project> => {
    const { data } = await api.put(`/projects/${id}`, payload);
    return data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/projects/${id}`);
  },

  // Update display order for multiple projects
  updateOrder: async (
    projects: { id: number; display_order: number }[]
  ): Promise<void> => {
    await Promise.all(
      projects.map(({ id, display_order }) =>
        api.put(`/projects/${id}`, { display_order })
      )
    );
  },

  // Media management
  uploadMedia: async (
    projectId: number,
    file: File,
    meta?: { title?: string; description?: string }
  ): Promise<ProjectMedia> => {
    const formData = new FormData();
    formData.append('file', file);

    if (meta?.title) formData.append('title', meta.title);
    if (meta?.description) formData.append('description', meta.description);

    const { data } = await api.post(
      `/projects/${projectId}/media`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return data;
  },

  updateMedia: async (
    mediaId: number,
    payload: Partial<ProjectMedia>
  ): Promise<ProjectMedia> => {
    const { data } = await api.put(
      `/project-media/${mediaId}`,
      payload
    );
    return data;
  },

  deleteMedia: async (mediaId: number): Promise<void> => {
    await api.delete(`/project-media/${mediaId}`);
  },
};
