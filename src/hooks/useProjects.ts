import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectsApi, type CreateProjectRequest, type UpdateProjectRequest } from '@/lib/api';
import { toast } from 'sonner';

export const useProjects = (params?: { page?: number; per_page?: number }) => {
  return useQuery({
    queryKey: ['projects', params],
    queryFn: () => projectsApi.getAll(params),
  });
};

export const useProject = (id: number) => {
  return useQuery({
    queryKey: ['project', id],
    queryFn: () => projectsApi.getById(id),
    enabled: !!id,
  });
};

export const useProjectMedia = (projectId: number) => {
  return useQuery({
    queryKey: ['project-media', projectId],
    queryFn: () => projectsApi.getMedia(projectId),
    enabled: !!projectId,
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FormData) => projectsApi.create(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Projeto criado com sucesso!');
    },

    onError: (error: any) => {
      console.error(error?.response?.data);
      toast.error('Erro ao criar projeto');
    },
  });
};


export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: FormData | UpdateProjectRequest }) => 
      projectsApi.update(id, data as UpdateProjectRequest),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Projeto atualizado com sucesso!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erro ao atualizar projeto');
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => projectsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Projeto excluído com sucesso!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erro ao excluir projeto');
    },
  });
};

export const useUpdateProjectOrder = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (projects: { id: number; display_order: number }[]) => 
      projectsApi.updateOrder(projects),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Ordem atualizada com sucesso!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erro ao atualizar ordem');
    },
  });
};

export const useUploadProjectMedia = () => {
  const queryClient = useQueryClient();

  
  return useMutation({
    mutationFn: ({ projectId, file, data }: { 
      projectId: number; 
      file: File; 
      data?: { title?: string; description?: string } 
    }) => projectsApi.uploadMedia(projectId, file, data),
    onSuccess: (_, variables) => {
    
      queryClient.invalidateQueries({ queryKey: ['project-media', variables.projectId] });
      toast.success('Mídia enviada com sucesso!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erro ao enviar mídia');
    },
  });
};

export const useDeleteProjectMedia = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (mediaId: number) => projectsApi.deleteMedia(mediaId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project-media'] });
      toast.success('Mídia excluída com sucesso!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erro ao excluir mídia');
    },
  });
};
