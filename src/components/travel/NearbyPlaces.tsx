import { useState, useMemo } from "react";
import { destinations, type Destination, type NearbyType } from "@/data/destinations";
import { MapPin, Leaf, Search } from "lucide-react";

const TYPE_META: Record<NearbyType, { label: string; emoji: string; color: string }> = {
  Heritage:    { label: "Heritage",    emoji: "🏛️", color: "bg-amber-100 text-amber-800" },
  Temple:      { label: "Temple",      emoji: "🛕", color: "bg-orange-100 text-orange-800" },
  Monastery:   { label: "Monastery",   emoji: "☸️", color: "bg-yellow-100 text-yellow-800" },
  Museum:      { label: "Museum",      emoji: "🖼️", color: "bg-blue-100 text-blue-800" },
  Nature:      { label: "Nature",      emoji: "🌿", color: "bg-green-100 text-green-800" },
  Waterfall:   { label: "Waterfall",   emoji: "💧", color: "bg-cyan-100 text-cyan-800" },
  Lake:        { label: "Lake",        emoji: "🌊", color: "bg-sky-100 text-sky-800" },
  Beach:       { label: "Beach",       emoji: "🏖️", color: "bg-teal-100 text-teal-800" },
  Viewpoint:   { label: "Viewpoint",   emoji: "🔭", color: "bg-indigo-100 text-indigo-800" },
  Village:     { label: "Village",     emoji: "🪔", color: "bg-lime-100 text-lime-800" },
  Restaurant:  { label: "Restaurant",  emoji: "🍛", color: "bg-rose-100 text-rose-800" },
  Hotel:       { label: "Hotel",       emoji: "🏨", color: "bg-violet-100 text-violet-800" },
  Homestay:    { label: "Homestay",    emoji: "🏡", color: "bg-purple-100 text-purple-800" },
  Experience:  { label: "Experience",  emoji: "✨", color: "bg-pink-100 text-pink-800" },
};

function DistanceBadge({ km }: { km: number }) {
  return (
    <span className="text-[10px] font-semibold glass rounded-full px-2 py-0.5 flex items-center gap-1">
      <MapPin className="w-2.5 h-2.5" />{km} km
    </span>
  );
}

export function NearbyPlaces({ selected }: { selected?: Destination }) {
  const [selDest, setSelDest] = useState<string>(selected?.id ?? destinations[0].id);
  const [activeType, setActiveType] = useState<NearbyType | "All">("All");
  const [q, setQ] = useState("");

  const dest = destinations.find((d) => d.id === selDest) ?? destinations[0];

  const types = useMemo(() => {
    const seen = new Set<NearbyType>();
    dest.nearby.forEach((n) => seen.add(n.type));
    return Array.from(seen);
  }, [dest]);

  const nearby = useMemo(() =>
    dest.nearby.filter((n) => {
      if (activeType !== "All" && n.type !== activeType) return false;
      if (q && !n.name.toLowerCase().includes(q.toLowerCase()) && !n.desc.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    }),
    [dest, activeType, q]
  );

  // Group by type for display
  const grouped = useMemo(() => {
    const map: Record<string, typeof nearby> = {};
    nearby.forEach((n) => {
      if (!map[n.type]) map[n.type] = [];
      map[n.type].push(n);
    });
    return map;
  }, [nearby]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center shadow-glow">
          <Leaf className="w-5 h-5 text-ivory" />
        </div>
        <div>
          <h2 className="font-display font-bold text-2xl">Nearby Places</h2>
          <p className="text-sm text-muted-foreground">Attractions, food, stays & more near any destination</p>
        </div>
      </div>

      {/* Destination selector */}
      <div className="glass rounded-2xl p-4 space-y-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Choose a Destination</div>
        <select
          value={selDest}
          onChange={(e) => { setSelDest(e.target.value); setActiveType("All"); setQ(""); }}
          className="input w-full"
        >
          {destinations.map((d) => (
            <option key={d.id} value={d.id}>{d.name} — {d.city}, {d.state}</option>
          ))}
        </select>

        {/* Selected destination mini card */}
        <div className="flex items-center gap-3 mt-2">
          <img src={dest.image} alt={dest.name} className="w-14 h-14 rounded-xl object-cover" />
          <div>
            <div className="font-display font-bold text-lg leading-tight">{dest.name}</div>
            <div className="text-xs text-muted-foreground flex items-center gap-1">
              <MapPin className="w-3 h-3" />{dest.city}, {dest.state}
            </div>
            <div className="text-xs text-muted-foreground mt-0.5">{dest.nearby.length} nearby places</div>
          </div>
        </div>
      </div>

      {/* Search nearby */}
      <div className="glass rounded-2xl p-3 flex items-center gap-2 shadow-soft">
        <Search className="w-4 h-4 ml-2 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search nearby places…"
          className="flex-1 bg-transparent py-1.5 outline-none text-sm"
        />
      </div>

      {/* Type filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveType("All")}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
            activeType === "All" ? "gradient-hero text-ivory shadow-glow" : "glass hover:bg-primary/10"
          }`}
        >
          All
        </button>
        {types.map((t) => {
          const meta = TYPE_META[t];
          return (
            <button
              key={t}
              onClick={() => setActiveType(t)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeType === t ? "gradient-hero text-ivory shadow-glow" : "glass hover:bg-primary/10"
              }`}
            >
              {meta.emoji} {meta.label}
            </button>
          );
        })}
      </div>

      {/* Results */}
      {nearby.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">No nearby places match your search.</div>
      ) : activeType === "All" ? (
        /* Grouped view */
        <div className="space-y-6">
          {Object.entries(grouped).map(([type, places]) => {
            const meta = TYPE_META[type as NearbyType];
            return (
              <div key={type}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">{meta.emoji}</span>
                  <h3 className="font-display font-bold text-lg">{meta.label}s</h3>
                  <span className="text-xs glass rounded-full px-2 py-0.5 text-muted-foreground">{places.length}</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {places.map((p) => (
                    <NearbyCard key={p.name} place={p} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Flat view for single type */
        <div className="grid sm:grid-cols-2 gap-3">
          {nearby.map((p) => (
            <NearbyCard key={p.name} place={p} />
          ))}
        </div>
      )}
    </div>
  );
}

function NearbyCard({ place }: { place: { name: string; type: NearbyType; distanceKm: number; desc: string } }) {
  const meta = TYPE_META[place.type];
  return (
    <div className="glass rounded-2xl p-4 shadow-card hover-lift">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl gradient-saffron flex items-center justify-center text-lg shrink-0">
            {meta.emoji}
          </div>
          <div>
            <div className="font-semibold text-sm leading-snug">{place.name}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{place.desc}</div>
          </div>
        </div>
        <DistanceBadge km={place.distanceKm} />
      </div>
      <div className="mt-2 ml-12">
        <span className={`text-[10px] font-semibold rounded-full px-2 py-0.5 ${meta.color}`}>
          {meta.label}
        </span>
      </div>
    </div>
  );
}
