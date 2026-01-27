import { useState } from "react";
import { motion, Reorder } from "framer-motion";
import { GripVertical, Save, RotateCcw } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  thumbnail: string;
}

const initialItems: GalleryItem[] = [
  {
    id: 1,
    title: "Campanha Nike 2024",
    category: "Motion Design",
    thumbnail: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=200",
  },
  {
    id: 2,
    title: "Editorial Vogue",
    category: "Fotografia",
    thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200",
  },
  {
    id: 3,
    title: "Festival Lollapalooza",
    category: "Motion Design",
    thumbnail: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=200",
  },
  {
    id: 4,
    title: "Lookbook Inverno",
    category: "Fotografia",
    thumbnail: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=200",
  },
  {
    id: 5,
    title: "Comercial Adidas",
    category: "Motion Design",
    thumbnail: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=200",
  },
  {
    id: 6,
    title: "Ensaio Arquitetônico",
    category: "Fotografia",
    thumbnail: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=200",
  },
];

const GalleryOrder = () => {
  const [items, setItems] = useState(initialItems);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleReorder = (newOrder: GalleryItem[]) => {
    setItems(newOrder);
    setHasChanges(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulated save - will be replaced with actual API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    setHasChanges(false);
  };

  const handleReset = () => {
    setItems(initialItems);
    setHasChanges(false);
  };

  return (
    <AdminLayout
      title="Ordenar Galeria"
      subtitle="Arraste e solte para reorganizar a ordem de exibição dos projetos"
    >
      {/* Actions */}
      <div className="flex justify-end gap-3 mb-6">
        <Button
          variant="outline"
          onClick={handleReset}
          disabled={!hasChanges}
          className="border-border"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Resetar
        </Button>
        <Button
          onClick={handleSave}
          disabled={!hasChanges || isSaving}
          className="bg-primary hover:bg-primary/90"
        >
          {isSaving ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full mr-2"
            />
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          Salvar Ordem
        </Button>
      </div>

      {/* Info */}
      {hasChanges && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-primary/10 border border-primary/30 rounded-lg p-4 mb-6"
        >
          <p className="text-sm text-primary">
            Você tem alterações não salvas. Clique em "Salvar Ordem" para aplicar as mudanças.
          </p>
        </motion.div>
      )}

      {/* Sortable Grid */}
      <Reorder.Group
        axis="y"
        values={items}
        onReorder={handleReorder}
        className="space-y-3"
      >
        {items.map((item, index) => (
          <Reorder.Item
            key={item.id}
            value={item}
            className="cursor-grab active:cursor-grabbing"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:border-primary/30 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-sm font-medium text-muted-foreground">
                    {index + 1}
                  </span>
                  <GripVertical className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-20 h-14 rounded-lg object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.category}</p>
              </div>
              <div className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
                Posição {index + 1}
              </div>
            </motion.div>
          </Reorder.Item>
        ))}
      </Reorder.Group>

      {/* Preview Grid */}
      <div className="mt-12">
        <h2 className="text-xl font-display font-semibold text-foreground mb-4">
          Prévia da Galeria
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          Visualização de como os projetos aparecerão na página principal
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="relative aspect-video rounded-lg overflow-hidden group"
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <div>
                  <p className="text-white font-medium text-sm">{item.title}</p>
                  <p className="text-white/70 text-xs">{item.category}</p>
                </div>
              </div>
              <div className="absolute top-2 left-2 w-6 h-6 rounded bg-black/50 flex items-center justify-center">
                <span className="text-xs text-white font-medium">{index + 1}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default GalleryOrder;
