import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import ProjectModal from "../portfolio/ProjectModal";
import { useProjects } from "@/hooks/useProjects";
import { Project } from "../../lib/api/types"; // Importe a interface definida acima
import { UrlBase } from "@/lib/api";

export default function PortfolioSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const { data: projectsData, isLoading } = useProjects();

  const projects: Project[] = useMemo(() => {
    return projectsData?.data.filter((p) => {
      return p.is_published === 1;
    }) || [];
  }, [projectsData]);

  // 1. Gera categorias dinamicamente baseadas nos dados do backend
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(projects.map((p) => p.category.toLowerCase()))
    );
    return ["all", ...uniqueCategories];
  }, [projects]);

  // 2. Filtra os projetos
  const filteredProjects = projects.filter((p) => {
    if (filter === "all") return true;
    return p.category.toLowerCase() === filter;
  });

  if (isLoading) return <div className="text-center py-20">Carregando projetos...</div>;

  return (
    <>
      <section id="portfolio" className="section-padding">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary text-sm font-medium tracking-widest uppercase mb-4 block">
              Portfólio
            </span>
            <h2 className="heading-section mb-6">
              Trabalhos <span className="">Selecionados</span>
            </h2>
          </motion.div>

          {/* Tabs de Filtro Dinâmicas */}
          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 text-sm font-medium rounded-full transition-all duration-300 capitalize ${filter === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
              >
                {cat === "all" ? "Todos" : cat}
              </button>
            ))}
          </div>

          {/* Grid de Projetos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => setSelectedProject(project)}
                className="portfolio-item group cursor-pointer relative overflow-hidden rounded-xl bg-secondary"
              >
                <img
                  src={`${UrlBase}${project.thumbnail_url}`}
                  alt={project.title}
                  className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 bg-gradient-to-t from-background/90 via-background/20 to-transparent">
                  <span className="text-primary text-xs font-medium tracking-widest uppercase mb-2 block"> {project.category} </span>
                  <h3 className="text-2xl font-display font-bold mb-2 text-white">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <span>{project.partner}</span>
                    <ArrowUpRight className="w-4 h-4 text-primary" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ProjectModal
        project={selectedProject}
        allProjects={projects} // Nova prop
        onClose={() => setSelectedProject(null)}
        onSelectProject={setSelectedProject} // Para permitir navegar entre eles
      />
    </>
  );
}