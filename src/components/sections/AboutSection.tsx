import { motion } from "framer-motion";
import { Award, Users, Film, Camera } from "lucide-react";

const stats = [
  { icon: Film, value: "150+", label: "Projetos Entregues" },
  { icon: Users, value: "80+", label: "Clientes Globais" },
  { icon: Award, value: "25", label: "Prêmios" },
  { icon: Camera, value: "3", label: "Anos de Experiência" },
];

export default function AboutSection() {
  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary text-sm font-medium tracking-widest uppercase mb-4 block">
              Sobre o Estúdio
            </span>
            <h2 className="heading-section mb-8">
              Onde a Visão Encontra o Movimento
            </h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              Somos um estúdio criativo especializado em motion design e fotografia de alto padrão. 
              Nossa missão é transformar conceitos abstratos em experiências visuais memoráveis 
              que conectam marcas e audiências.
            </p>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Com uma equipe multidisciplinar de diretores de arte, animadores e fotógrafos, 
              entregamos projetos que transcendem expectativas e estabelecem novos padrões 
              de excelência visual.
            </p>
            <a href="#contact" className="btn-outline">
              Conheça Nossa Equipe
            </a>
          </motion.div>

          {/* Right Column - Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="card-premium p-8 text-center group hover:border-primary/50 transition-colors duration-300"
              >
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-4xl font-display font-bold  block mb-2">
                  {stat.value}
                </span>
                <span className="text-sm ">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
