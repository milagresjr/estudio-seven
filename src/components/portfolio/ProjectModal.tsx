import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft, PlayCircle } from "lucide-react";
import { Project } from "../../lib/api/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { useState } from "react";


interface ProjectModalProps {
  project: Project | null;
  allProjects: Project[];
  onClose: () => void;
  onSelectProject: (p: Project) => void;
}

export default function ProjectModal({ project, onClose, allProjects, onSelectProject }: ProjectModalProps) {
  const [selectedImage, setSelectedImage] = useState(null);
  
  if (!project) return null;
  // Filtra o projeto atual da lista de sugestões
  const otherProjects = allProjects.filter(p => p.id !== project.id);


  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-background overflow-y-auto"
      >
        {/* Navigation Bar */}
        <div className="sticky top-0 z-50 flex justify-between items-center p-6 bg-background/80 backdrop-blur-md">
          <button onClick={onClose} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Voltar</span>
          </button>
          <button onClick={onClose} className="p-3 rounded-full bg-secondary hover:bg-secondary/80 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Hero Image */}
        <div className="relative h-[60vh] w-full">
          <img
            src={`http://localhost:8000${project.thumbnail_url}`}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-6 max-w-4xl -mt-20 relative z-10 pb-20">
          <span className="inline-block px-4 py-2 rounded-full border border-primary/30 text-primary text-xs font-medium tracking-widest uppercase mb-6 bg-background">
            {project.category}
          </span>

          <h1 className="text-4xl md:text-6xl font-display font-bold mb-8 leading-tight">
            {project.title}
          </h1>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-y border-border mb-12">
            <div>
              <span className="text-xs uppercase tracking-tighter text-muted-foreground block mb-1">Parceiro</span>
              <span className="text-lg font-medium">{project.partner}</span>
            </div>
            <div>
              <span className="text-xs uppercase tracking-tighter text-muted-foreground block mb-1">Gênero</span>
              <span className="text-lg font-medium">{project.genre}</span>
            </div>
            <div>
              <span className="text-xs uppercase tracking-tighter text-muted-foreground block mb-1">Formato</span>
              <span className="text-lg font-medium">{project.format}</span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-20">
            <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-4">Sobre o Projeto</h3>
            <p className="text-xl leading-relaxed text-foreground/80">{project.description}</p>
          </div>

          {/* Gallery Section */}
          <div className="space-y-12">
            <h3 className="text-sm uppercase tracking-widest text-muted-foreground">Galeria de Mídia</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.media?.sort((a, b) => a.display_order - b.display_order).map((item) => (
                <div key={item.id} className="group relative overflow-hidden rounded-xl bg-secondary">
                  {item.file_type === "video" ? (
                    <video
                      controls
                      className="w-full aspect-video rounded-xl"
                    >
                      <source
                        src={`http://localhost:8000${item.file_url}`}
                        type="video/mp4"
                      />
                      Seu navegador não suporta vídeo HTML5.
                    </video>
                  ) : (
                    <img
                      src={`http://localhost:8000${item.file_url}`}
                      alt={item.caption}
                      onClick={() => setSelectedImage(item)}
                      className="w-full h-full object-cover aspect-video cursor-pointer transition-transform duration-300 hover:scale-105"
                    />
                  )}
                  {item.caption && (
                    <div className="p-4 bg-secondary/50">
                      <p className="text-sm text-muted-foreground">{item.caption}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* --- NOVA SEÇÃO: CARROSSEL DE OUTROS PROJETOS --- */}
        <div className="container mx-auto px-6 max-w-6xl pb-20 border-t border-border pt-16">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-2">Explorar mais</h3>
              <h2 className="text-3xl font-display font-bold">Outros Projetos</h2>
            </div>
          </div>

          <Swiper
            slidesPerView={1.2}
            spaceBetween={20}
            freeMode={true}
            modules={[FreeMode, Pagination]}
            breakpoints={{
              640: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3.2 },
            }}
            className="pb-12"
          >
            {otherProjects.map((p) => (
              <SwiperSlide key={p.id}>
                <motion.div
                  onClick={() => {
                    onSelectProject(p);
                    // Scroll para o topo ao trocar de projeto
                    document.querySelector('.fixed.inset-0')?.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-video overflow-hidden rounded-xl mb-4">
                    <img
                      src={`http://localhost:8000${p.thumbnail_url}`}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                  </div>
                  <span className="text-primary text-[10px] uppercase tracking-widest font-bold">{p.category}</span>
                  <h4 className="text-lg font-bold group-hover:text-primary transition-colors">{p.title}</h4>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
          {selectedImage && (
            <div
              className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <div
                className="relative max-w-5xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={`http://localhost:8000${selectedImage.file_url}`}
                  alt={selectedImage.caption}
                  className="w-full max-h-[90vh] object-contain rounded-xl"
                />

                {selectedImage.caption && (
                  <p className="mt-4 text-center text-sm text-muted-foreground">
                    {selectedImage.caption}
                  </p>
                )}

                {/* Botão fechar */}
                <button
                  className="absolute top-2 right-2 text-white text-2xl"
                  onClick={() => setSelectedImage(null)}
                >
                  ✕
                </button>
              </div>
            </div>
          )}

        </div>
      </motion.div>
    </AnimatePresence>
  );
}