import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { api } from "@/services/api";
import { useStudioSettings } from "@/hooks/useStudioSettings";
import { useEffect } from "react";

const UrlBase = api.defaults.baseURL || "https://api.softseven.ao/api";



export default function ContactSection() {

  const { data: studioSettings, isLoading } = useStudioSettings();

  const [settings, setSettings] = useState({
    studio_name: "",
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
  console.log("Studio Settings from hook:", studioSettings);
  console.log("Setting email:", settings.contact_email);
  console.log("Setting phone:", settings.phone);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await api.post("/contact", {
        name: formData.name,
        email: formData.email,
        company: formData.company,
        message: formData.message,
      });

      toast.success("Mensagem enviada com sucesso! Entraremos em contacto em breve.");
      setFormData({ name: "", email: "", company: "", message: "" });
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Erro ao enviar mensagem"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };


  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-secondary/30 via-background to-background" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Column - Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary text-sm font-medium tracking-widest uppercase mb-4 block">
              Contacto
            </span>
            <h2 className="heading-section mb-6">
              Vamos Criar <span className="">Juntos</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              Pronto para transformar sua visão em realidade? Entre em contacto e
              vamos discutir como podemos elevar seu próximo projecto.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <span className="text-sm text-muted-foreground block">Email</span>
                  {studioSettings && (
                    <a href={`mailto:${studioSettings.contact_email}`}>
                      {studioSettings.contact_email}
                    </a>
                  )}

                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <span className="text-sm text-muted-foreground block">Telefone</span>
                  {studioSettings && (
                    <a href={`tel:${studioSettings.phone}`}>
                      {studioSettings.phone}
                    </a>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <span className="text-sm text-muted-foreground block">Localização</span>
                  <span className="text-foreground">Luanda - Angola</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="card-premium p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="text-sm font-medium mb-2 block">
                    Nome
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
                    placeholder="Seu nome"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-medium mb-2 block">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="company" className="text-sm font-medium mb-2 block">
                  Empresa
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
                  placeholder="Nome da empresa (opcional)"
                />
              </div>

              <div>
                <label htmlFor="message" className="text-sm font-medium mb-2 block">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-lg focus:outline-none focus:border-primary transition-colors resize-none"
                  placeholder="Conte-nos sobre seu projecto..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Enviando...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Enviar Mensagem
                    <Send className="w-4 h-4" />
                  </span>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
