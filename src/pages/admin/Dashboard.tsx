import { motion } from "framer-motion";
import { FolderOpen, MessageSquare, Eye, TrendingUp } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";

const stats = [
  { icon: FolderOpen, label: "Projetos", value: "24", change: "+3 este mês" },
  { icon: MessageSquare, label: "Mensagens", value: "12", change: "5 não lidas" },
  { icon: Eye, label: "Visualizações", value: "2.4k", change: "+18% esta semana" },
  { icon: TrendingUp, label: "Engajamento", value: "89%", change: "+5% vs mês anterior" },
];

const recentProjects = [
  { id: 1, title: "Campanha Nike 2024", category: "Motion Design", date: "Há 2 dias" },
  { id: 2, title: "Editorial Vogue", category: "Fotografia", date: "Há 5 dias" },
  { id: 3, title: "Festival Lollapalooza", category: "Motion Design", date: "Há 1 semana" },
];

const recentMessages = [
  { id: 1, name: "Maria Silva", subject: "Orçamento para vídeo institucional", date: "Há 1 hora", unread: true },
  { id: 2, name: "João Santos", subject: "Parceria comercial", date: "Há 3 horas", unread: true },
  { id: 3, name: "Ana Costa", subject: "Re: Ensaio fotográfico", date: "Ontem", unread: false },
];

const Dashboard = () => {
  return (
    <AdminLayout title="Dashboard" subtitle="Visão geral do seu estúdio">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
            </div>
            <p className="text-3xl font-display font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            <p className="text-xs text-primary mt-2">{stat.change}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-display font-semibold text-foreground">Projetos Recentes</h2>
            <a href="/admin/projects" className="text-sm text-primary hover:underline">
              Ver todos
            </a>
          </div>
          <div className="space-y-4">
            {recentProjects.map((project) => (
              <div
                key={project.id}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div>
                  <p className="font-medium text-foreground">{project.title}</p>
                  <p className="text-sm text-muted-foreground">{project.category}</p>
                </div>
                <span className="text-xs text-muted-foreground">{project.date}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Messages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-display font-semibold text-foreground">Mensagens Recentes</h2>
            <a href="/admin/messages" className="text-sm text-primary hover:underline">
              Ver todas
            </a>
          </div>
          <div className="space-y-4">
            {recentMessages.map((message) => (
              <div
                key={message.id}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {message.unread && (
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  )}
                  <div>
                    <p className="font-medium text-foreground">{message.name}</p>
                    <p className="text-sm text-muted-foreground truncate max-w-[200px]">
                      {message.subject}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{message.date}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
