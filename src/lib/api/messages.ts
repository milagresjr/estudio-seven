// lib/api/messages.ts
import { api } from './config';
import type {
  Message,
  CreateMessageRequest,
  UpdateMessageRequest,
  PaginatedResponse,
} from './types';

export const messagesApi = {
  // Public endpoint - Submit contact form
  create: async (
    payload: CreateMessageRequest
  ): Promise<Message> => {
    const { data } = await api.post<Message>(
      '/messages',
      payload
    );
    return data;
  },

  // Protected endpoints
  getAll: async (params?: {
    page?: number;
    per_page?: number;
    is_read?: boolean;
    is_starred?: boolean;
  }): Promise<PaginatedResponse<Message>> => {
    const { data } = await api.get<
      PaginatedResponse<Message>
    >('/messages', { params });
    return data;
  },

  update: async (
    
    id: number,
    payload: UpdateMessageRequest
  ): Promise<Message> => {
    const { data } = await api.put<Message>(
      `/messages/${id}`,
      payload
    );
    console.log("Resposta da atualização da mensagem:", data);
    return data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/messages/${id}`);
  },

  // Helper methods
  markAsRead: async (id: number): Promise<Message> => {
    return messagesApi.update(id, { is_read: true });
  },

  markAsUnread: async (id: number): Promise<Message> => {
    return messagesApi.update(id, { is_read: false });
  },

  toggleStar: async (
    id: number,
    isStarred: boolean
  ): Promise<Message> => {
    return messagesApi.update(id, {
      is_starred: isStarred,
    });
  },

  markAsReplied: async (id: number): Promise<Message> => {
    return messagesApi.update(id, {
      replied_at: new Date().toISOString(),
    });
  },
};
