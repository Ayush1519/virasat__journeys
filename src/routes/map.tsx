import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { sites } from "@/data/sites";
import { useState } from "react";
import { MapPin } from "lucide-react";

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "Heritage Map — Virasat" },
      { name: "description", content: "Explore India's heritage on an interactive map." },
    ],
  }),
  component: MapPage,
});

// Approximate lat/lng → % position on a stylized India silhouette
function project(lat: number, lng: number) {
  const minLat = 8, maxLat = 35;
  const minLng = 68, maxLng = 97;
  const x = ((lng - minLng) / (maxLng - minLng)) * 100;
  const y = ((maxLat - lat) / (maxLat - minLat)) * 100;
  return { x, y };
}

function MapPage() {
  const [active, setActive] = useState(sites[0].id);
  const activeSite = sites.find((s) => s.id === active)!;

  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="text-center mb-10">
          <div className="text-xs uppercase tracking-[0.3em] text-primary font-semibold mb-3">Interactive Map</div>
          <h1 className="font-display font-bold text-5xl md:text-6xl text-gradient-hero mb-4">India, mapped by memory</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">Tap a marker to explore a heritage site.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 relative glass rounded-3xl p-6 shadow-card aspect-[4/5] overflow-hidden">
            <div className="absolute inset-0 mandala-bg opacity-30" />
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full p-4" preserveAspectRatio="none">
              <defs>
                <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="oklch(0.74 0.18 55)" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="oklch(0.28 0.14 275)" stopOpacity="0.25" />
                </linearGradient>
              </defs>
              {/* Simplified India outline */}
              <path
                d="M30,15 Q45,10 55,15 Q70,18 75,28 Q82,38 78,48 Q72,60 65,70 Q58,82 50,92 Q42,85 35,75 Q28,62 22,50 Q18,38 22,28 Q25,20 30,15 Z"
                fill="url(#g)"
                stroke="oklch(0.28 0.14 275)"
                strokeWidth="0.4"
                strokeDasharray="1 1"
              />
            </svg>
            {sites.map((s) => {
              const { x, y } = project(s.coords.lat, s.coords.lng);
              const isActive = s.id === active;
              return (
                <button
                  key={s.id}
                  onClick={() => setActive(s.id)}
                  style={{ left: `${x}%`, top: `${y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-full group"
                >
                  <div className={`relative transition-all ${isActive ? "scale-125" : "hover:scale-110"}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-deep ${isActive ? "gradient-hero" : "gradient-saffron"}`}>
                      <MapPin className="w-4 h-4 text-ivory" />
                    </div>
                    {isActive && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-2 h-2 rotate-45 gradient-hero" />
                    )}
                  </div>
                  <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 glass rounded-lg px-2 py-1 text-[10px] font-semibold whitespace-nowrap ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"} transition-opacity`}>
                    {s.name}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="glass rounded-3xl overflow-hidden shadow-card">
            <img src={activeSite.image} alt={activeSite.name} className="w-full h-48 object-cover" />
            <div className="p-6">
              <div className="text-xs text-muted-foreground">{activeSite.location}</div>
              <h3 className="font-display font-bold text-2xl mb-2">{activeSite.name}</h3>
              <p className="text-sm text-foreground/80 mb-4 italic">"{activeSite.tagline}"</p>
              <Link
                to="/site/$siteId"
                params={{ siteId: activeSite.id }}
                className="inline-block gradient-hero text-ivory font-semibold text-sm px-5 py-2.5 rounded-xl hover:scale-105 transition-transform"
              >
                Explore site →
              </Link>
            </div>
            <div className="border-t border-border p-4 space-y-1">
              {sites.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActive(s.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${s.id === active ? "bg-primary/10 font-semibold" : "hover:bg-primary/5"}`}
                >
                  {s.name} <span className="text-xs text-muted-foreground">· {s.state}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
