import { useState } from "react";
import { destinations, type Destination } from "@/data/destinations";
import { MapPin, Clock, IndianRupee, ExternalLink, Navigation } from "lucide-react";
import { Link } from "@tanstack/react-router";

// Same projection as /map page
function project(lat: number, lng: number) {
  const minLat = 8, maxLat = 37;
  const minLng = 68, maxLng = 97;
  const x = ((lng - minLng) / (maxLng - minLng)) * 100;
  const y = ((maxLat - lat) / (maxLat - minLat)) * 100;
  return { x: Math.min(95, Math.max(5, x)), y: Math.min(95, Math.max(5, y)) };
}

const CATEGORY_COLORS: Record<string, string> = {
  "Heritage & Monuments": "#c2410c",
  "Temples & Monasteries": "#b45309",
  "Culture & Festivals": "#7c3aed",
  "Nature & Wildlife": "#15803d",
  "Beaches": "#0369a1",
  "Mountains": "#374151",
  "Historical Places": "#92400e",
  "Hidden Gems": "#be185d",
  "Food": "#dc2626",
  "Local Experiences": "#0891b2",
};

export function TravelMap() {
  const [active, setActive] = useState<string>(destinations[0].id);
  const [hovering, setHovering] = useState<string | null>(null);

  const activeDest = destinations.find((d) => d.id === active)!;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${activeDest.coords.lat},${activeDest.coords.lng}`;

  const uniqueCategories = Array.from(new Set(destinations.map((d) => d.category)));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center shadow-glow">
          <MapPin className="w-5 h-5 text-ivory" />
        </div>
        <div>
          <h2 className="font-display font-bold text-2xl">India Travel Map</h2>
          <p className="text-sm text-muted-foreground">Tap a pin to explore a destination</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Map canvas */}
        <div className="lg:col-span-2 relative glass rounded-3xl p-2 shadow-card overflow-hidden" style={{ minHeight: 520 }}>
          {/* Subtle mandala bg */}
          <div className="absolute inset-0 mandala-bg opacity-20 pointer-events-none" />

          {/* India SVG outline */}
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full p-4" preserveAspectRatio="none">
            <defs>
              <linearGradient id="tg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="oklch(0.74 0.18 55)" stopOpacity="0.10" />
                <stop offset="100%" stopColor="oklch(0.28 0.14 275)" stopOpacity="0.18" />
              </linearGradient>
            </defs>
            {/* Approximate India outline */}
            <path
              d="M30,8 Q38,5 46,7 Q57,8 65,13 Q74,18 78,26 Q84,36 82,46 Q79,55 74,63 Q68,72 62,80 Q57,86 52,93 Q48,88 43,82 Q36,72 30,62 Q22,50 20,38 Q18,27 22,18 Q25,12 30,8 Z"
              fill="url(#tg)"
              stroke="oklch(0.28 0.14 275)"
              strokeWidth="0.3"
              strokeDasharray="1.5 1"
            />
            {/* Sri Lanka outline simplified */}
            <ellipse cx="57" cy="96" rx="2" ry="3" fill="url(#tg)" stroke="oklch(0.28 0.14 275)" strokeWidth="0.2" />
          </svg>

          {/* Destination pins */}
          {destinations.map((d) => {
            const { x, y } = project(d.coords.lat, d.coords.lng);
            const isActive = d.id === active;
            const isHover = d.id === hovering;
            const pinColor = CATEGORY_COLORS[d.category] ?? "#c2410c";
            return (
              <button
                key={d.id}
                onClick={() => setActive(d.id)}
                onMouseEnter={() => setHovering(d.id)}
                onMouseLeave={() => setHovering(null)}
                style={{ left: `${x}%`, top: `${y}%` }}
                className="absolute -translate-x-1/2 -translate-y-full group z-10"
                aria-label={d.name}
              >
                {/* Pin marker */}
                <div className={`relative transition-all duration-200 ${isActive ? "scale-150" : isHover ? "scale-125" : "hover:scale-110"}`}>
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center shadow-md border-2 border-white"
                    style={{ backgroundColor: pinColor }}
                  >
                    <div className="w-2 h-2 rounded-full bg-white opacity-80" />
                  </div>
                  {/* Active pulse */}
                  {isActive && (
                    <div
                      className="absolute inset-0 rounded-full animate-ping opacity-30"
                      style={{ backgroundColor: pinColor }}
                    />
                  )}
                </div>
                {/* Hover tooltip */}
                <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 glass rounded-lg px-2 py-1 text-[10px] font-semibold whitespace-nowrap shadow-card transition-opacity ${isActive || isHover ? "opacity-100" : "opacity-0"}`}>
                  {d.name}
                  <div className="text-[9px] text-muted-foreground">{d.city}</div>
                </div>
              </button>
            );
          })}

          {/* Legend */}
          <div className="absolute bottom-3 left-3 glass rounded-xl p-2 space-y-1 max-h-40 overflow-y-auto">
            {uniqueCategories.slice(0, 6).map((cat) => (
              <div key={cat} className="flex items-center gap-1.5 text-[10px] font-medium">
                <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: CATEGORY_COLORS[cat] ?? "#999" }} />
                <span className="text-foreground/80">{cat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Side panel */}
        <div className="flex flex-col gap-4">
          {/* Active destination card */}
          <div className="glass rounded-3xl overflow-hidden shadow-card">
            <div className="relative h-48 overflow-hidden">
              <img src={activeDest.image} alt={activeDest.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4">
                <div className="text-xs text-ivory/80">{activeDest.category}</div>
                <h3 className="font-display font-bold text-xl text-ivory leading-tight">{activeDest.name}</h3>
              </div>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="w-3.5 h-3.5" />
                {activeDest.city}, {activeDest.state}
              </div>
              <p className="text-sm text-foreground/80 italic">"{activeDest.tagline}"</p>
              <div className="flex gap-3 text-xs">
                <span className="flex items-center gap-1 text-primary font-semibold">
                  <IndianRupee className="w-3 h-3" />
                  {activeDest.avgCostPerDay.toLocaleString("en-IN")}/day
                </span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {activeDest.suggestedHours}h suggested
                </span>
              </div>
              <div className="flex gap-2">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-sm font-semibold gradient-hero text-ivory shadow-glow"
                >
                  <Navigation className="w-3.5 h-3.5" /> Directions
                </a>
                {activeDest.heritageSiteId && (
                  <Link
                    to="/site/$siteId"
                    params={{ siteId: activeDest.heritageSiteId }}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-sm font-semibold bg-secondary/10 text-secondary hover:bg-secondary/20 transition-colors"
                  >
                    Explore →
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Destination list scroller */}
          <div className="glass rounded-2xl overflow-hidden shadow-card">
            <div className="p-3 border-b border-border text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              All Destinations ({destinations.length})
            </div>
            <div className="overflow-y-auto max-h-64">
              {destinations.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setActive(d.id)}
                  className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 transition-colors ${
                    d.id === active ? "bg-primary/10 font-semibold" : "hover:bg-primary/5"
                  }`}
                >
                  <div
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: CATEGORY_COLORS[d.category] ?? "#999" }}
                  />
                  <div className="min-w-0">
                    <div className="truncate">{d.name}</div>
                    <div className="text-[10px] text-muted-foreground truncate">{d.city}, {d.state}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
