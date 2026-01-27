import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Lock, Globe, Bell, Save, Loader2 } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useStudioSettings, useSaveStudioSettings } from "@/hooks/useStudioSettings";

const Settings = () => {
  const { data: studioSettings, isLoading } = useStudioSettings();
  const saveSettings = useSaveStudioSettings();

  const [settings, setSettings] = useState({
    studio_name: "",
    contact_email: "",
    phone: "",
    address: "",
    bio: "",
    instagram: "",
    behance: "",
    linkedin: "",
    youtube: "",
    vimeo: "",
    email_notifications: true,
    new_message_alert: true,
    weekly_report: false,
  });

  // Load settings from API
  useEffect(() => {
    if (studioSettings) {
      setSettings({
        studio_name: studioSettings.studio_name || "",
        contact_email: studioSettings.contact_email || "",
        phone: studioSettings.phone || "",
        address: studioSettings.address || "",
        bio: studioSettings.bio || "",
        instagram: studioSettings.instagram || "",
        behance: studioSettings.behance || "",
        linkedin: studioSettings.linkedin || "",
        youtube: studioSettings.youtube || "",
        vimeo: studioSettings.vimeo || "",
        email_notifications: studioSettings.email_notifications ?? true,
        new_message_alert: studioSettings.new_message_alert ?? true,
        weekly_report: studioSettings.weekly_report ?? false,
      });
    }
  }, [studioSettings]);

  const handleSave = async () => {
    await saveSettings.mutateAsync(settings);
  };

  if (isLoading) {
    return (
      <AdminLayout title="Configurações" subtitle="Gerencie as configurações do seu estúdio">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Configurações" subtitle="Gerencie as configurações do seu estúdio">
      <div className="max-w-3xl space-y-8">
        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Perfil do Estúdio</h2>
              <p className="text-sm text-muted-foreground">Informações exibidas no site</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="studio_name">Nome do Estúdio</Label>
                <Input
                  id="studio_name"
                  value={settings.studio_name}
                  onChange={(e) => setSettings({ ...settings, studio_name: e.target.value })}
                  className="bg-background border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email de Contato</Label>
                <Input
                  id="email"
                  type="email"
                  value={settings.contact_email}
                  onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
                  className="bg-background border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  value={settings.phone}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  className="bg-background border-border"
                />
              </div>
              <div className="space-y-2"> 
                <Label htmlFor="address">Localização</Label>
                <Input
                  id="address"
                  value={settings.address}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  className="bg-background border-border"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Sobre o Estúdio</Label>
              <Textarea
                id="bio"
                value={settings.bio}
                onChange={(e) => setSettings({ ...settings, bio: e.target.value })}
                className="bg-background border-border min-h-[100px]"
              />
            </div>
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Globe className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Redes Sociais</h2>
              <p className="text-sm text-muted-foreground">Links para suas redes sociais</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="instagram">Instagram</Label>
              <Input
                id="instagram"
                value={settings.instagram}
                onChange={(e) => setSettings({ ...settings, instagram: e.target.value })}
                placeholder="@seuusuario"
                className="bg-background border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="behance">Behance</Label>
              <Input
                id="behance"
                value={settings.behance}
                onChange={(e) => setSettings({ ...settings, behance: e.target.value })}
                placeholder="seuusuario"
                className="bg-background border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input
                id="linkedin"
                value={settings.linkedin}
                onChange={(e) => setSettings({ ...settings, linkedin: e.target.value })}
                placeholder="seuusuario"
                className="bg-background border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="youtube">YouTube</Label>
              <Input
                id="youtube"
                value={settings.youtube}
                onChange={(e) => setSettings({ ...settings, youtube: e.target.value })}
                placeholder="@seucanal"
                className="bg-background border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vimeo">Vimeo</Label>
              <Input
                id="vimeo"
                value={settings.vimeo}
                onChange={(e) => setSettings({ ...settings, vimeo: e.target.value })}
                placeholder="seuusuario"
                className="bg-background border-border"
              />
            </div>
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Bell className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Notificações</h2>
              <p className="text-sm text-muted-foreground">Configure suas preferências</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
              <div>
                <p className="font-medium text-foreground">Notificações por Email</p>
                <p className="text-sm text-muted-foreground">Receba atualizações por email</p>
              </div>
              <Switch
                checked={settings.email_notifications}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, email_notifications: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
              <div>
                <p className="font-medium text-foreground">Alerta de Nova Mensagem</p>
                <p className="text-sm text-muted-foreground">
                  Seja notificado quando receber mensagens
                </p>
              </div>
              <Switch
                checked={settings.new_message_alert}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, new_message_alert: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
              <div>
                <p className="font-medium text-foreground">Relatório Semanal</p>
                <p className="text-sm text-muted-foreground">Receba um resumo semanal de atividades</p>
              </div>
              <Switch
                checked={settings.weekly_report}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, weekly_report: checked })
                }
              />
            </div>
          </div>
        </motion.div>

        {/* Security */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Lock className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Segurança</h2>
              <p className="text-sm text-muted-foreground">Gerencie sua senha e acesso</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Senha Atual</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  placeholder="••••••••"
                  className="bg-background border-border"
                />
              </div>
              <div></div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">Nova Senha</Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="••••••••"
                  className="bg-background border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  className="bg-background border-border"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleSave}
            disabled={saveSettings.isPending}
            className="bg-primary hover:bg-primary/90"
          >
            {saveSettings.isPending ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            Salvar Configurações
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Settings;
