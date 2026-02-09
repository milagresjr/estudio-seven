import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Edit2, Trash2, Eye, X, Upload, Image as ImageIcon, Loader2 } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ProjectModal from "@/components/portfolio/ProjectModal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useProjects, useCreateProject, useUpdateProject, useDeleteProject, useUploadProjectMedia } from "@/hooks/useProjects";
import type { Project } from "@/lib/api/types";
import { apiImage } from "@/services/api";

const UrlBase = apiImage.defaults.baseURL || "https://api.softseven.ao";

const Projects = () => {
  const { data: projectsData, isLoading } = useProjects();
  const createProject = useCreateProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();
  const uploadMedia = useUploadProjectMedia();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    partner: "",
    genre: "",
    format: "",
    description: "",
    status: "draft" as 'draft' | 'published' | 'archived',
    thumbnail_url: null as File | null,
    is_published: 0 as 0 | 1,
  });
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const projects = projectsData?.data || [];

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openModal = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title,
        category: project.category,
        partner: project.partner || "",
        genre: project.genre || "",
        format: project.format || "",
        description: project.description || "",
        status: project.status,
        thumbnail_url: null,
        is_published: project.is_published || 0,
      });
    } else {
      setEditingProject(null);
      setFormData({
        title: "",
        category: "",
        thumbnail_url: null,
        partner: "",
        genre: "",
        format: "",
        description: "",
        status: "draft",
        is_published: 0,
      });
    }
    setSelectedFiles([]);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
    setSelectedFiles([]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const files = Array.from(e.target.files);

    setSelectedFiles(files);

    // Thumbnail = primeiro ficheiro
    setFormData(prev => ({
      ...prev,
      thumbnail_url: files[0],
    }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    if (editingProject) {

      // ======================
      // UPDATE (SEM multipart)
      // ======================
      let thumbnailUrl = editingProject.thumbnail_url;

      if (formData.thumbnail_url instanceof File) {
        const uploaded = await uploadMedia.mutateAsync({
          projectId: editingProject.id,
          file: formData.thumbnail_url,
        });

        thumbnailUrl = uploaded.url;
      }

      await updateProject.mutateAsync({
        id: editingProject.id,
        data: {
          title: formData.title,
          category: formData.category,
          partner: formData.partner || null,
          genre: formData.genre || null,
          format: formData.format || null,
          description: formData.description || null,
          status: formData.status,
          thumbnail_url: thumbnailUrl,
          is_published: formData.is_published,
        },
      });

    } else {
      // ======================
      // CREATE (multipart)
      // ======================
      const form = new FormData();

      form.append('title', formData.title);
      form.append('category', formData.category);
      form.append('status', formData.status);

      if (formData.partner) form.append('partner', formData.partner);
      if (formData.genre) form.append('genre', formData.genre);
      if (formData.format) form.append('format', formData.format);
      if (formData.description) form.append('description', formData.description);

      if (!(formData.thumbnail_url instanceof File)) {
        throw new Error('Thumbnail obrigatória');
      }

      form.append('thumbnail_url', formData.thumbnail_url);

      await createProject.mutateAsync(form);
    }

    closeModal();
  } catch (error) {
    console.error('Error saving project:', error);
  }
};


  const handleDelete = async (id: number) => {
    if (confirm('Tem certeza que deseja excluir este projeto?')) {
      await deleteProject.mutateAsync(id);
    }
  };

  const isSubmitting = createProject.isPending || updateProject.isPending || uploadMedia.isPending;

  return (
    <AdminLayout title="Projetos" subtitle="Gerencie seus projetos do portfólio">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between mb-8">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Buscar projetos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card border-border"
          />
        </div>
        <Button onClick={() => openModal()} className="bg-primary hover:bg-primary/90">
          <Plus className="w-5 h-5 mr-2" />
          Novo Projeto
        </Button>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        /* Projects Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card border border-border rounded-xl overflow-hidden group"
            >
              <div className="relative aspect-video">
                <img
                  src={`${UrlBase}${project.thumbnail_url}`}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button
                    onClick={() => openModal(project)}
                    className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                  >
                    <Edit2 className="w-5 h-5 text-white" />
                  </button>
                  <button className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                   onClick={() => setSelectedProject(project)}
                  >
                  
                    <Eye className="w-5 h-5 text-white" />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    disabled={deleteProject.isPending}
                    className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/40 transition-colors disabled:opacity-50"
                  >
                    <Trash2 className="w-5 h-5 text-red-400" />
                  </button>
                </div>
                <div
                  className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${project.is_published == 1
                    ? "bg-green-500/20 text-green-400"
                    : project.status === "archived"
                      ? "bg-gray-500/20 text-gray-400"
                      : "bg-yellow-500/20 text-yellow-400"
                    }`}
                >
                  {project.is_published == 1 ? "Publicado" : project.status === "archived" ? "Arquivado" : "Rascunho"}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-foreground">{project.title}</h3>
                <p className="text-sm text-muted-foreground">{project.category}</p>
                <p className="text-xs text-muted-foreground mt-2">{project.partner}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Nenhum projeto encontrado</p>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border border-border rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h2 className="text-xl font-display font-semibold text-foreground">
                  {editingProject ? "Editar Projeto" : "Novo Projeto"}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              <form onSubmit={handleSubmit} encType="multipart/form-data" className="p-6 space-y-6">
                {/* Upload Area */}
                <label className="block border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-foreground font-medium">Arraste imagem de capa</p>
                  <p className="text-sm text-muted-foreground mt-1">ou clique para selecionar</p>
                  <p className="text-xs text-muted-foreground mt-3">
                    Suporta: JPG, PNG, MP4, MOV (máx. 100MB)
                  </p>
                </label>

                {/* Preview thumbnails */}
                {selectedFiles.length > 0 && (
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {selectedFiles.map((file, i) => (
                      <div
                        key={i}
                        className="w-20 h-20 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 relative overflow-hidden"
                      >
                        {file.type.startsWith('image/') ? (
                          <img
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <ImageIcon className="w-6 h-6 text-muted-foreground" />
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título do Projeto</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Ex: Campanha Nike 2024"
                      className="bg-background border-border"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Categoria</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger className="bg-background border-border">
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Motion Design">Motion Design</SelectItem>
                        <SelectItem value="Fotografia">Animação</SelectItem>
                        <SelectItem value="Vídeo">Vídeo</SelectItem>
                        <SelectItem value="Branding">Branding</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="partner">Parceiro/Cliente</Label>
                    <Input
                      id="partner"
                      value={formData.partner}
                      onChange={(e) => setFormData({ ...formData, partner: e.target.value })}
                      placeholder="Ex: Nike Brasil"
                      className="bg-background border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="genre">Gênero</Label>
                    <Select
                      value={formData.genre}
                      onValueChange={(value) => setFormData({ ...formData, genre: value })}
                    >
                      <SelectTrigger className="bg-background border-border">
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Comercial">Comercial</SelectItem>
                        <SelectItem value="Editorial">Editorial</SelectItem>
                        <SelectItem value="Institucional">Institucional</SelectItem>
                        <SelectItem value="Evento">Evento</SelectItem>
                        <SelectItem value="Artístico">Artístico</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="format">Formato</Label>
                    <Input
                      id="format"
                      value={formData.format}
                      onChange={(e) => setFormData({ ...formData, format: e.target.value })}
                      placeholder="Ex: 16:9 4K, Digital + Print"
                      className="bg-background border-border"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="description">Descrição / Histórico</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Conte a história por trás deste projeto..."
                      className="bg-background border-border min-h-[120px]"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={formData.is_published.toString()}
                      onValueChange={(value) => setFormData({ ...formData, is_published: Number(value) as 0 | 1 })}
                    >
                      <SelectTrigger className="bg-background border-border">
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Rascunho</SelectItem>
                        <SelectItem value="1">Publicado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-border">
                  <Button type="button" variant="outline" onClick={closeModal}>
                    Cancelar
                  </Button>
                  <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    {editingProject ? "Salvar Alterações" : "Criar Projeto"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <ProjectModal
              project={selectedProject}
              allProjects={projects} // Nova prop
              onClose={() => setSelectedProject(null)}
              onSelectProject={setSelectedProject} // Para permitir navegar entre eles
            />
    </AdminLayout>
  );
};

export default Projects;
