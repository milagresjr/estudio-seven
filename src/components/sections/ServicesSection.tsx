import { motion } from "framer-motion";
import { Clapperboard, ImageIcon, Sparkles, Palette, MonitorPlay, Camera } from "lucide-react";

const services = [
  {
    icon: Clapperboard,
    title: "Motion Design",
    description: "Animações 2D e 3D, aberturas cinematográficas, motion graphics para campanhas e branded content.",
  },
  {
    icon: Camera,
    title: "Fotografia",
    description: "Ensaios editoriais, campanhas publicitárias, produto e lifestyle com direção de arte integrada.",
  },
  {
    icon: MonitorPlay,
    title: "Produção de Vídeo",
    description: "Direção criativa, filmagem e pós-produção para comerciais, documentários e filmes institucionais.",
  },
  {
    icon: Sparkles,
    title: "VFX & Composição",
    description: "Efeitos visuais, composição digital, color grading e finishing para cinema e streaming.",
  },
  {
    icon: Palette,
    title: "Direção de Arte",
    description: "Conceituação visual, identidade de marca, storyboarding e supervisão criativa de projectos.",
  },
  {
    icon: ImageIcon,
    title: "CGI & 3D",
    description: "Modelagem, texturização, iluminação e renderização fotorealista para campanhas e produtos.",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="section-padding">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-widest uppercase mb-4 block">
            Serviços
          </span>
          <h2 className="heading-section mb-6">
            O Que <span className="">Fazemos</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Oferecemos uma gama completa de serviços criativos para dar vida às suas ideias.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-premium p-8 group hover:border-primary/50 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <service.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
