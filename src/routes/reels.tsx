import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useMemo, useState } from "react";
import {
  CATEGORIES,
  citiesOf,
  getDestination,
  states,
} from "@/data/destinations";
import { reels, type Reel } from "@/data/reels";
import { useSocial } from "@/lib/journey";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MapPin,
  Music2,
  Play,
  X,
  Filter,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/reels")({
  head: () => ({
    meta: [
      { title: "India Travel Reels — Short Videos from Every State | Virasat" },
      {
        name: "description",
        content:
          "Scroll a vertical feed of India travel shorts. Filter by state, city and category, then jump straight into the full destination guide.",
      },
      { property: "og:title", content: "India Travel Reels — Virasat" },
      {
        property: "og:description",
        content: "Bite-sized travel stories from across India, filtered by state, city and theme.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ReelsPage,
});

const fmt = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : `${n}`);

function ReelsPage() {
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [cat, setCat] = useState("");
  const [openComments, setOpenComments] = useState<Reel | null>(null);
  const [showFilters, setShowFilters] = useState(true);

  const list = useMemo(
    () =>
      reels.filter(
        (r) =>
          (!state || r.state === state) &&
          (!city || r.city === city) &&
          (!cat || r.category === cat),
      ),
    [state, city, cat],
  );

  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="text-center mb-8">
          <div className="text-xs uppercase tracking-[0.3em] text-primary font-semibold mb-3">
            Reels & Shorts
          </div>
          <h1 className="font-display font-bold text-4xl md:text-6xl text-gradient-hero mb-3">
            India, thirty seconds at a time
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Swipe through short travel stories from every corner of the country — then tap
            “Explore place” to read the full guide.
          </p>
        </div>

        <div className="glass rounded-2xl p-4 shadow-soft mb-8">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-sm font-semibold mb-3"
          >
            <Filter className="w-4 h-4 text-primary" />
            Filters
            <span className="text-muted-foreground font-normal">
              ({list.length} reels)
            </span>
          </button>
          {showFilters && (
            <div className="grid sm:grid-cols-3 gap-3">
              <Select
                label="State"
                value={state}
                onChange={(v) => {
                  setState(v);
                  setCity("");
                }}
                options={states}
                allLabel="All states"
              />
              <Select
                label="City"
                value={city}
                onChange={setCity}
                options={citiesOf(state)}
                allLabel="All cities"
              />
              <Select
                label="Category"
                value={cat}
                onChange={setCat}
                options={[...CATEGORIES]}
                allLabel="All categories"
              />
            </div>
          )}
        </div>

        {list.length === 0 ? (
          <div className="glass rounded-3xl p-12 text-center">
            <p className="font-display text-2xl mb-2">No reels here yet</p>
            <p className="text-sm text-muted-foreground">
              Try a wider filter — every state has a story.
            </p>
          </div>
        ) : (
          <div className="h-[78vh] overflow-y-auto snap-y snap-mandatory rounded-3xl scroll-smooth">
            <div className="grid lg:grid-cols-2 gap-6">
              {list.map((r) => (
                <ReelCard key={r.id} reel={r} onComments={() => setOpenComments(r)} />
              ))}
            </div>
          </div>
        )}
      </section>

      {openComments && (
        <CommentsSheet reel={openComments} onClose={() => setOpenComments(null)} />
      )}
    </Layout>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
  allLabel,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
  allLabel: string;
}) {
  return (
    <label className="block">
      <span className="block text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1.5">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl bg-background/70 border border-border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
      >
        <option value="">{allLabel}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

function ReelCard({ reel, onComments }: { reel: Reel; onComments: () => void }) {
  const { likes, saves, comments, toggleLike, toggleSave } = useSocial();
  const liked = likes.includes(reel.id);
  const saved = saves.includes(reel.id);
  const commentCount = reel.comments + (comments[reel.id]?.length ?? 0);
  const dest = getDestination(reel.destinationId);

  const share = async () => {
    const url = `${window.location.origin}/place/${reel.destinationId}`;
    try {
      if (navigator.share) await navigator.share({ title: reel.title, url });
      else {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard");
      }
    } catch {
      /* dismissed */
    }
  };

  return (
    <article className="snap-start relative rounded-3xl overflow-hidden shadow-card group aspect-[9/13] sm:aspect-[9/11]">
      <img
        src={reel.image}
        alt={`${reel.title} — ${reel.city}, ${reel.state}`}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[6s] group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-secondary/95 via-secondary/25 to-secondary/40" />

      <div className="absolute top-4 left-4 flex items-center gap-2">
        <span className="glass rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
          {reel.category}
        </span>
        <span className="glass rounded-full px-3 py-1 text-[10px] font-bold flex items-center gap-1">
          <Play className="w-3 h-3 text-primary" />
          0:{String(reel.durationSec).padStart(2, "0")}
        </span>
      </div>

      <div className="absolute right-3 bottom-28 flex flex-col items-center gap-4 text-ivory">
        <Action
          icon={<Heart className={`w-6 h-6 ${liked ? "fill-primary text-primary" : ""}`} />}
          label={fmt(reel.likes + (liked ? 1 : 0))}
          onClick={() => toggleLike(reel.id)}
          aria="Like reel"
        />
        <Action
          icon={<MessageCircle className="w-6 h-6" />}
          label={fmt(commentCount)}
          onClick={onComments}
          aria="Comments"
        />
        <Action
          icon={<Share2 className="w-6 h-6" />}
          label={fmt(reel.shares)}
          onClick={share}
          aria="Share reel"
        />
        <Action
          icon={<Bookmark className={`w-6 h-6 ${saved ? "fill-gold text-gold" : ""}`} />}
          label={saved ? "Saved" : "Save"}
          onClick={() => toggleSave(reel.id)}
          aria="Save reel"
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-5 pr-20 text-ivory">
        <div className="flex items-center gap-1.5 text-xs opacity-85 mb-1.5">
          <MapPin className="w-3.5 h-3.5" />
          {reel.city}, {reel.state}
        </div>
        <h2 className="font-display font-bold text-2xl leading-tight mb-1">{reel.title}</h2>
        <p className="text-sm opacity-90 line-clamp-2 mb-2">{reel.caption}</p>
        <div className="flex items-center gap-2 text-[11px] opacity-80 mb-3">
          <span className="font-semibold">{reel.creator}</span>
          <span className="flex items-center gap-1">
            <Music2 className="w-3 h-3" />
            {reel.music}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            to="/place/$placeId"
            params={{ placeId: reel.destinationId }}
            className="inline-flex items-center gap-1.5 rounded-full gradient-saffron px-4 py-2 text-xs font-bold text-secondary shadow-glow"
          >
            Explore place →
          </Link>
          {dest?.heritageSiteId && (
            <Link
              to="/site/$siteId"
              params={{ siteId: dest.heritageSiteId }}
              className="inline-flex items-center gap-1.5 rounded-full glass px-4 py-2 text-xs font-bold"
            >
              Heritage story
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

function Action({
  icon,
  label,
  onClick,
  aria,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  aria: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={aria}
      className="flex flex-col items-center gap-1 transition-transform hover:scale-110 active:scale-95"
    >
      <span className="glass-dark rounded-full p-3">{icon}</span>
      <span className="text-[10px] font-semibold">{label}</span>
    </button>
  );
}

function CommentsSheet({ reel, onClose }: { reel: Reel; onClose: () => void }) {
  const { comments, addComment } = useSocial();
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const list = comments[reel.id] ?? [];

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-secondary/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="glass rounded-3xl w-full max-w-lg p-6 shadow-deep max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-display font-bold text-xl">{reel.title}</h3>
            <p className="text-xs text-muted-foreground">{list.length} of your comments</p>
          </div>
          <button onClick={onClose} aria-label="Close comments" className="p-2 rounded-lg hover:bg-primary/10">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!text.trim()) return;
            addComment(reel.id, name.trim(), text.trim());
            setText("");
            toast.success("Comment added");
          }}
          className="space-y-2 mb-5"
        >
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name (optional)"
            className="w-full rounded-xl bg-background/70 border border-border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Share a tip or a memory…"
            rows={3}
            className="w-full rounded-xl bg-background/70 border border-border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          <button className="w-full rounded-xl gradient-hero text-ivory py-2.5 text-sm font-bold shadow-glow">
            Post comment
          </button>
        </form>

        <div className="space-y-3">
          {list.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">
              Be the first to say something about this place.
            </p>
          )}
          {list.map((c) => (
            <div key={c.id} className="rounded-2xl bg-background/60 border border-border p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold">{c.name}</span>
                <span className="text-[10px] text-muted-foreground">
                  {new Date(c.at).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
