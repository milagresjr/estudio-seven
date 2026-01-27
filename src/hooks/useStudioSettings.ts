import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { studioSettingsApi, type CreateStudioSettingsRequest } from '@/lib/api';
import { toast } from 'sonner';

export const useStudioSettings = () => {
  return useQuery({
    queryKey: ['studio-settings'],
    queryFn: () => studioSettingsApi.get(),
  });
};

export const useSaveStudioSettings = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateStudioSettingsRequest) => studioSettingsApi.save(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['studio-settings'] });
      toast.success('Configurações salvas com sucesso!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erro ao salvar configurações');
    },
  });
};
