import { motion } from "framer-motion";
import { Award, Users, Film, Camera } from "lucide-react"; 
import { useStudioSettings} from "@/hooks/useStudioSettings";
import { useEffect, useState } from "react";

const stats = [
  { icon: Film, value: "150+", label: "Projectos Entregues" },
  { icon: Users, value: "80+", label: "Clientes Globais" },
  { icon: Award, value: "25", label: "Prêmios" },
  { icon: Camera, value: "3", label: "Anos de Experiência" },
];

export default function AboutSection() {

  const { data: studioSettings, isLoading } = useStudioSettings();
  
    const [settings, setSettings] = useState({
      studio_name : "",
      contact_email: "",
      phone: "",
      bio: "",
  
    });

    // Load settings from API
      useEffect(() => {
        if (studioSettings) {
          setSettings({
            studio_name: studioSettings.studio_name || "",
            contact_email: studioSettings.contact_email || "",
            phone: studioSettings.phone || "",
            bio: studioSettings.bio || "",
          });
        }
      }, [studioSettings]);

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
              Sobre o Estúdio Seven
            </span>
            <h2 className="heading-section mb-8">
              Onde a Visão Encontra o Movimento
            </h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              {settings.bio || "O Estúdio Seven é um estúdio de produção de motion design e animação dedicado a transformar ideias em narrativas visuais impactantes. Com uma equipe apaixonada e experiente, oferecemos serviços de produção de motion design e animação para empresas, marcas e criadores de conteúdo. Nossa missão é criar vídeos que não apenas informem, mas também inspirem e envolvam o público, ajudando nossos clientes a contar suas histórias de maneira única e memorável."}
            </p>
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
