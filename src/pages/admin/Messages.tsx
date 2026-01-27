import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Mail, MailOpen, Trash2, X, Reply, Star, Archive, Loader2 } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useMessages, useUpdateMessage, useDeleteMessage } from "@/hooks/useMessages";
import type { Message } from "@/lib/api/types";

type FilterType = "all" | "unread" | "starred";

const Messages = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyText, setReplyText] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");



  const { data: messagesData, isLoading } = useMessages({});

  const messages = messagesData || [];




  const filteredMessages = messages.filter((msg) => {
    // filtro de busca
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      msg.sender_name.toLowerCase().includes(searchLower) ||
      (msg.subject ?? "").toLowerCase().includes(searchLower) ||
      msg.sender_email.toLowerCase().includes(searchLower);

    // filtro de estado
    let matchesFilter = true;
    if (filter === "unread") matchesFilter = Number(msg.is_read) === 0;
    if (filter === "starred") matchesFilter = Number(msg.is_starred) === 1;

    return matchesSearch && matchesFilter;
  });


  const updateMessage = useUpdateMessage();
  const deleteMessage = useDeleteMessage();

  // Nota: Verificamos == 0 pois o backend retorna 0 ou 1
  const unreadCount = messages.filter((m) => Number(m.is_read) === 0).length;

  const openMessage = async (message: Message) => {

    if (!message.id) {
      console.error("Mensagem sem ID:", message.id);
      return;
    }
    
    setSelectedMessage(message);
  

  if (Number(message.is_read) === 0) {
    console.log("Marcando mensagem como lida:", message.is_read);
    message.is_read = true; // Atualiza localmente para evitar múltiplas requisições
    await updateMessage.mutateAsync({
      id: message.id,
      message // Enviando como booleano para o backend
    });
  }
};

const toggleStar = async (id: string, e: React.MouseEvent) => {
  e.stopPropagation();
  const message = messages.find(m => m.id === id);
  if (message) {
    const newStarredStatus = Number(message.is_starred) === 1 ? false : true;
    await updateMessage.mutateAsync({
      id,
      data: { is_starred: newStarredStatus }
    });

    // Atualiza o estado local se a mensagem estiver selecionada
    if (selectedMessage?.id === id) {
      setSelectedMessage({ ...selectedMessage, is_starred: newStarredStatus ? 1 : 0 });
    }
  }
};

const handleDelete = async (id: string) => {
  if (confirm("Deseja realmente excluir esta mensagem?")) {
    await deleteMessage.mutateAsync(id);
    if (selectedMessage?.id === id) setSelectedMessage(null);
  }
};

const handleReply = async () => {
  if (selectedMessage && replyText.trim()) {
    await updateMessage.mutateAsync({
      id: selectedMessage.id,
      data: { replied_at: new Date().toISOString() }
    });

    window.location.href = `mailto:${selectedMessage.sender_email}?subject=Re: ${selectedMessage.subject}&body=${encodeURIComponent(replyText)}`;
    setReplyText("");
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  } else if (diffDays === 1) {
    return "Ontem";
  } else {
    return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
  }
};

return (
  <AdminLayout title="Mensagens" subtitle={`${unreadCount} mensagens não lidas`}>
    <div className="flex gap-6 h-[calc(100vh-200px)]">

      {/* Coluna da Esquerda: Lista */}
      <div className="w-full lg:w-2/5 flex flex-col">
        <div className="space-y-4 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Buscar mensagens..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card border-border"
            />
          </div>
          <div className="flex gap-2">
            {[
              [
                { key: "all", label: "Todas" },
                { key: "unread", label: "Não lidas" },
                { key: "starred", label: "Favoritas" },
              ]
            ].map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key as typeof filter)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === f.key
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto space-y-2 pr-2">
            {filteredMessages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => openMessage(message)}
                className={`p-4 rounded-xl cursor-pointer transition-all border ${selectedMessage?.id === message.id
                  ? "bg-primary/10 border-primary/30 shadow-sm"
                  : "bg-card border-border hover:bg-muted/50"
                  } ${Number(message.is_read) === 0 ? "border-l-4 border-l-primary" : ""}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {Number(message.is_read) === 0 ? (
                        <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                      ) : (
                        <MailOpen className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      )}
                      <span className={`font-medium truncate ${Number(message.is_read) === 0 ? "text-foreground" : "text-muted-foreground"}`}>
                        {message.sender_name}
                      </span>
                    </div>
                    <p className={`text-sm truncate mt-1 ${Number(message.is_read) === 0 ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                      {message.subject}
                    </p>
                    <p className="text-xs text-muted-foreground truncate mt-1">
                      {message.content.substring(0, 70)}...
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {formatDate(message.created_at)}
                    </span>
                    <button
                      onClick={(e) => toggleStar(message.id, e)}
                      className="p-1 hover:bg-muted rounded transition-colors"
                    >
                      <Star
                        className={`w-4 h-4 ${Number(message.is_starred) === 1 ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                          }`}
                      />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}

            {!isLoading && filteredMessages.length === 0 && (
              <div className="text-center py-12 bg-muted/20 rounded-xl border border-dashed">
                <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                <p className="text-muted-foreground">Nenhuma mensagem encontrada</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Coluna da Direita: Detalhe */}
      <AnimatePresence mode="wait">
        {selectedMessage ? (
          <motion.div
            key={selectedMessage.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="hidden lg:flex flex-col flex-1 bg-card border border-border rounded-xl shadow-sm"
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="min-w-0">
                <h2 className="text-lg font-semibold text-foreground truncate">
                  {selectedMessage.subject}
                </h2>
                <p className="text-sm text-muted-foreground truncate">
                  De: <span className="font-medium text-foreground">{selectedMessage.sender_name}</span> ({selectedMessage.sender_email})
                </p>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" onClick={(e) => toggleStar(selectedMessage.id, e)}>
                  <Star className={`w-5 h-5 ${Number(selectedMessage.is_starred) === 1 ? "fill-yellow-400 text-yellow-400" : ""}`} />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(selectedMessage.id)} disabled={deleteMessage.isPending}>
                  <Trash2 className="w-5 h-5 text-destructive" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setSelectedMessage(null)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div className="flex-1 p-6 overflow-y-auto">
              <p className="text-xs text-muted-foreground mb-6 bg-muted/50 p-2 rounded w-fit">
                Recebido em: {new Date(selectedMessage.created_at).toLocaleString("pt-BR")}
              </p>
              <div className="text-foreground whitespace-pre-wrap leading-relaxed">
                {selectedMessage.content}
              </div>
            </div>

            <div className="p-6 border-t border-border bg-muted/10">
              <div className="flex flex-col gap-3">
                <Textarea
                  placeholder="Escreva sua resposta..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="bg-background border-border resize-none"
                  rows={3}
                />
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground italic">
                    A resposta será enviada via seu cliente de e-mail padrão.
                  </span>
                  <Button
                    onClick={handleReply}
                    disabled={!replyText.trim() || updateMessage.isPending}
                  >
                    {updateMessage.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Reply className="w-4 h-4 mr-2" />}
                    Responder
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div className="hidden lg:flex flex-1 items-center justify-center bg-card border border-border rounded-xl border-dashed">
            <div className="text-center opacity-40">
              <Mail className="w-16 h-16 mx-auto mb-4" />
              <p>Selecione uma mensagem para ler o conteúdo</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </AdminLayout>
);
};

export default Messages;