import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useEffect, useState } from "react";
import { sites } from "@/data/sites";
import { getMemories, saveMemory, deleteMemory, fileToDataUrl, type Memory } from "@/lib/memories";
import { Plus, Trash2, Heart, Calendar, Camera, X } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/memories")({
  head: () => ({
    meta: [
      { title: "My Memories — Virasat" },
      { name: "description", content: "Save your personal heritage visit memories — photos, stories, moments." },
    ],
  }),
  component: MemoriesPage,
});

function MemoriesPage() {
  const [items, setItems] = useState<Memory[]>([]);
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState<Memory | null>(null);

  useEffect(() => { setItems(getMemories()); }, []);

  const refresh = () => setItems(getMemories());

  const remove = (id: string) => {
    deleteMemory(id);
    refresh();
    toast.success("Memory removed");
  };

  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-primary font-semibold mb-3">Your Scrapbook</div>
            <h1 className="font-display font-bold text-5xl md:text-6xl text-gradient-hero mb-2">My Memories</h1>
            <p className="text-muted-foreground max-w-lg">A scrapbook of your heritage journeys — stored safely on your device, no account needed.</p>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 gradient-hero text-ivory font-bold px-6 py-3 rounded-2xl shadow-glow hover:scale-105 transition-transform"
          >
            <Plus className="w-4 h-4" /> Add memory
          </button>
        </div>

        {items.length === 0 ? (
          <div className="glass rounded-3xl p-16 text-center shadow-card">
            <div className="w-20 h-20 rounded-full gradient-saffron mx-auto mb-6 flex items-center justify-center shadow-glow">
              <Heart className="w-10 h-10 text-ivory" />
            </div>
            <h3 className="font-display font-bold text-2xl mb-2">No memories yet</h3>
            <p className="text-muted-foreground mb-6">Start your scrapbook by adding your first heritage visit.</p>
            <button onClick={() => setOpen(true)} className="gradient-hero text-ivory font-semibold px-6 py-3 rounded-xl">
              Add your first memory
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {items.map((m, i) => (
              <div
                key={m.id}
                className="group relative rounded-3xl overflow-hidden shadow-card hover-lift cursor-pointer"
                onClick={() => setPreview(m)}
                style={{ animation: `slide-up 0.5s ease-out ${i * 0.05}s both` }}
              >
                <img src={m.image} alt={m.title} className="w-full aspect-[3/4] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/20 to-transparent" />
                <button
                  onClick={(e) => { e.stopPropagation(); remove(m.id); }}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-destructive/90 text-ivory flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="absolute inset-x-0 bottom-0 p-4 text-ivory">
                  <div className="text-[10px] uppercase tracking-wider opacity-80 mb-1">{m.siteName}</div>
                  <div className="font-display font-bold text-lg leading-tight line-clamp-2">{m.title}</div>
                  <div className="text-xs opacity-70 mt-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {m.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {open && <AddMemoryModal onClose={() => setOpen(false)} onSaved={() => { refresh(); setOpen(false); }} />}
      {preview && <PreviewModal memory={preview} onClose={() => setPreview(null)} onDelete={() => { remove(preview.id); setPreview(null); }} />}
    </Layout>
  );
}

function AddMemoryModal({ onClose, onSaved }: { onClose: () => void; onSaved: () => void }) {
  const [siteId, setSiteId] = useState(sites[0].id);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [image, setImage] = useState<string>("");

  const handleFile = async (f?: File) => {
    if (!f) return;
    if (f.size > 5 * 1024 * 1024) { toast.error("Image must be under 5MB"); return; }
    setImage(await fileToDataUrl(f));
  };

  const submit = () => {
    if (!title.trim() || !image) { toast.error("Please add a title and photo"); return; }
    const site = sites.find((s) => s.id === siteId)!;
    saveMemory({ siteId, siteName: site.name, title, description: desc, date, image });
    toast.success("Memory saved to your scrapbook!");
    onSaved();
  };

  return (
    <div className="fixed inset-0 z-[60] bg-secondary/60 backdrop-blur-md flex items-center justify-center p-4 animate-[fade-in_0.2s]">
      <div className="bg-background rounded-3xl w-full max-w-lg shadow-deep max-h-[90vh] overflow-auto">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="font-display font-bold text-2xl">New memory</h2>
          <button onClick={onClose} className="w-9 h-9 rounded-full hover:bg-muted flex items-center justify-center">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Photo</span>
            <div className="mt-2">
              {image ? (
                <div className="relative rounded-2xl overflow-hidden aspect-video">
                  <img src={image} alt="" className="w-full h-full object-cover" />
                  <button onClick={() => setImage("")} className="absolute top-2 right-2 w-8 h-8 rounded-full bg-destructive text-ivory flex items-center justify-center">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center aspect-video glass rounded-2xl cursor-pointer hover:bg-primary/5 border-2 border-dashed border-border">
                  <Camera className="w-8 h-8 text-muted-foreground mb-2" />
                  <span className="text-sm text-muted-foreground">Click to upload</span>
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />
                </label>
              )}
            </div>
          </label>

          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Heritage site</span>
            <select value={siteId} onChange={(e) => setSiteId(e.target.value)} className="w-full mt-2 px-4 py-3 rounded-xl glass outline-none">
              {sites.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Title</span>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="My family trip..." className="w-full mt-2 px-4 py-3 rounded-xl glass outline-none" />
          </label>
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Story</span>
            <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="What do you remember?" rows={4} className="w-full mt-2 px-4 py-3 rounded-xl glass outline-none resize-none" />
          </label>
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Date</span>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full mt-2 px-4 py-3 rounded-xl glass outline-none" />
          </label>

          <button onClick={submit} className="w-full gradient-hero text-ivory font-bold py-4 rounded-2xl shadow-glow hover:scale-[1.02] transition-transform">
            Save to scrapbook
          </button>
        </div>
      </div>
    </div>
  );
}

function PreviewModal({ memory, onClose, onDelete }: { memory: Memory; onClose: () => void; onDelete: () => void }) {
  return (
    <div className="fixed inset-0 z-[60] bg-secondary/70 backdrop-blur-md flex items-center justify-center p-4 animate-[fade-in_0.2s]" onClick={onClose}>
      <div className="bg-background rounded-3xl w-full max-w-2xl shadow-deep overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <img src={memory.image} alt={memory.title} className="w-full max-h-[50vh] object-cover" />
        <div className="p-6">
          <div className="text-xs uppercase tracking-wider text-primary font-semibold">{memory.siteName}</div>
          <h2 className="font-display font-bold text-3xl mt-1 mb-2">{memory.title}</h2>
          <div className="text-sm text-muted-foreground flex items-center gap-1 mb-4">
            <Calendar className="w-3.5 h-3.5" /> {memory.date}
          </div>
          {memory.description && <p className="text-foreground/85 leading-relaxed">{memory.description}</p>}
          <div className="flex gap-2 mt-6">
            <button onClick={onClose} className="flex-1 py-3 rounded-xl glass font-semibold">Close</button>
            <button onClick={onDelete} className="px-5 py-3 rounded-xl bg-destructive text-destructive-foreground font-semibold flex items-center gap-2">
              <Trash2 className="w-4 h-4" /> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
