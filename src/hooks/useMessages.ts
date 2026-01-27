import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { messagesApi, type CreateMessageRequest, type UpdateMessageRequest } from '@/lib/api';
import { toast } from 'sonner';

export const useMessages = (params?: { 
  page?: number; 
  per_page?: number;
  is_read?: boolean;
  is_starred?: boolean;
}) => {
  return useQuery({
    queryKey: ['messages', params],
    queryFn: () => messagesApi.getAll(params),
  });
};

export const useSendMessage = () => {
  return useMutation({
    mutationFn: (data: CreateMessageRequest) => messagesApi.create(data),
    onSuccess: () => {
      toast.success('Mensagem enviada com sucesso!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erro ao enviar mensagem');
    },
  });
};

export const useUpdateMessage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateMessageRequest }) => 
      messagesApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erro ao atualizar mensagem');
    },
  });
};

export const useDeleteMessage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => messagesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
      toast.success('Mensagem excluída com sucesso!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erro ao excluir mensagem');
    },
  });
};

export const useMarkMessageAsRead = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => messagesApi.markAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
  });
};

export const useToggleMessageStar = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, isStarred }: { id: number; isStarred: boolean }) => 
      messagesApi.toggleStar(id, isStarred),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
  });
};
