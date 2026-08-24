import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { SiteCard } from "@/components/SiteCard";
import { sites } from "@/data/sites";
import { useState } from "react";
import { Search } from "lucide-react";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explore Heritage Sites — Virasat" },
      { name: "description", content: "Browse India's most iconic heritage sites — temples, forts, palaces and monuments." },
    ],
  }),
  component: Explore,
});

const filters = ["All", "Monument", "Temple", "Fort", "Palace"] as const;

function Explore() {
  const [cat, setCat] = useState<(typeof filters)[number]>("All");
  const [q, setQ] = useState("");

  const list = sites.filter((s) => {
    if (cat !== "All" && s.category !== cat) return false;
    if (q && !s.name.toLowerCase().includes(q.toLowerCase()) && !s.state.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="text-center mb-10">
          <div className="text-xs uppercase tracking-[0.3em] text-primary font-semibold mb-3">Explore</div>
          <h1 className="font-display font-bold text-5xl md:text-6xl text-gradient-hero mb-4">
            Every stone tells a story
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">Wander through India's most treasured heritage — each site a window into a different century.</p>
        </div>

        <div className="glass rounded-2xl p-3 flex items-center gap-2 shadow-soft mb-6 max-w-2xl mx-auto">
          <Search className="w-5 h-5 ml-2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name or state..."
            className="flex-1 bg-transparent py-2 outline-none text-sm"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setCat(f)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                cat === f ? "gradient-hero text-ivory shadow-glow" : "glass hover:bg-primary/10"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {list.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">No sites match your search.</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {list.map((s) => <SiteCard key={s.id} site={s} />)}
          </div>
        )}
      </section>
    </Layout>
  );
}
