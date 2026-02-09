import { motion } from "framer-motion";
import { Instagram, Linkedin, Youtube, Dribbble, Facebook } from "lucide-react";

const socialLinks = [
  { icon: Instagram, href: "https://www.instagram.com/estudiosevenao/", label: "Instagram" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/est%C3%BAdio-seven/", label: "LinkedIn" },
  { icon: Youtube, href: "https://www.youtube.com/channel/UCS46zDrG2KnP3zUsNmSxP2A", label: "YouTube" },
  { icon: Facebook, href: "https://www.facebook.com/share/17oLn6EiiP/", label: "Facebook" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <motion.a
            href="#"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            <span className="font-display font-semibold text-lg tracking-tight w-32">
              <a href="/#">
                <img src="./Ativo 28w.png" alt="logo do estudo seven" />
              </a>
            </span>
          </motion.a>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-4"
          >
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary/80 transition-colors"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </motion.div>

          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm text-muted-foreground"
          >
            © 2026 EstudioSeven. Todos os direitos reservados.
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
