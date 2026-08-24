import { useState, useMemo } from "react";
import { destinations, CATEGORIES, INTERESTS, type Destination } from "@/data/destinations";
import { Search, MapPin, Clock, IndianRupee, Calendar, ChevronDown, ChevronUp, Utensils, BedDouble, Bus, Star } from "lucide-react";


const categoryEmoji: Record<string, string> = {
  "Heritage & Monuments": "🏛️",
  "Temples & Monasteries": "🛕",
  "Culture & Festivals": "🎭",
  "Nature & Wildlife": "🌿",
  "Food": "🍛",
  "Beaches": "🏖️",
  "Mountains": "⛰️",
  "Historical Places": "🏰",
  "Hidden Gems": "💎",
  "Local Experiences": "🪔",
};

export function TravelExplorer({ onDestinationSelect }: { onDestinationSelect?: (d: Destination) => void }) {
  const [q, setQ] = useState("");
  const [selState, setSelState] = useState("");
  const [selCat, setSelCat] = useState("");
  const [selInterest, setSelInterest] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const allStates = useMemo(() => Array.from(new Set(destinations.map((d) => d.state))).sort(), []);

  const filtered = useMemo(() => {
    return destinations.filter((d) => {
      if (q && !d.name.toLowerCase().includes(q.toLowerCase()) && !d.city.toLowerCase().includes(q.toLowerCase()) && !d.state.toLowerCase().includes(q.toLowerCase())) return false;
      if (selState && d.state !== selState) return false;
      if (selCat && d.category !== selCat) return false;
      if (selInterest && !d.interests.includes(selInterest as any)) return false;
      return true;
    });
  }, [q, selState, selCat, selInterest]);

  function toggleExpand(id: string, d: Destination) {
    const next = expanded === id ? null : id;
    setExpanded(next);
    if (next && onDestinationSelect) onDestinationSelect(d);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center shadow-glow">
          <MapPin className="w-5 h-5 text-ivory" />
        </div>
        <div>
          <h2 className="font-display font-bold text-2xl">Travel Explorer</h2>
          <p className="text-sm text-muted-foreground">Discover destinations across all of India</p>
        </div>
      </div>

      {/* Search */}
      <div className="glass rounded-2xl p-3 flex items-center gap-2 shadow-soft">
        <Search className="w-5 h-5 ml-2 text-muted-foreground shrink-0" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by name, city or state…"
          className="flex-1 bg-transparent py-2 outline-none text-sm"
        />
      </div>

      {/* Filters */}
      <div className="grid sm:grid-cols-3 gap-3">
        <select
          value={selState}
          onChange={(e) => setSelState(e.target.value)}
          className="input"
        >
          <option value="">All States / UTs</option>
          {allStates.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <select
          value={selCat}
          onChange={(e) => setSelCat(e.target.value)}
          className="input"
        >
          <option value="">All Categories</option>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select
          value={selInterest}
          onChange={(e) => setSelInterest(e.target.value)}
          className="input"
        >
          <option value="">All Interests</option>
          {INTERESTS.map((i) => <option key={i} value={i}>{i}</option>)}
        </select>
      </div>

      {/* Result count */}
      <div className="text-sm text-muted-foreground">
        Showing <span className="font-semibold text-foreground">{filtered.length}</span> destinations
        {(selState || selCat || selInterest || q) && (
          <button
            onClick={() => { setQ(""); setSelState(""); setSelCat(""); setSelInterest(""); }}
            className="ml-3 text-primary text-xs font-semibold hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Cards */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">No destinations match your search.</div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((d) => {
            const isOpen = expanded === d.id;
            return (
              <div key={d.id} className="glass rounded-3xl overflow-hidden shadow-card hover-lift transition-all">
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  <img src={d.image} alt={d.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/70 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] glass rounded-full px-2 py-0.5 text-ivory font-semibold">
                        {categoryEmoji[d.category] || "📍"} {d.category}
                      </span>
                      <span className="text-[11px] glass rounded-full px-2 py-0.5 text-ivory font-semibold flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {d.suggestedHours}h
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div>
                      <h3 className="font-display font-bold text-lg leading-tight">{d.name}</h3>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                        <MapPin className="w-3 h-3" /> {d.city}, {d.state}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="flex items-center gap-0.5 text-primary font-bold text-sm">
                        <IndianRupee className="w-3 h-3" />{d.avgCostPerDay.toLocaleString("en-IN")}
                      </div>
                      <div className="text-[10px] text-muted-foreground">/person/day</div>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground italic mb-3 line-clamp-2">"{d.tagline}"</p>

                  {/* Quick info chips */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    <span className="text-[10px] bg-primary/10 text-primary rounded-full px-2 py-0.5 font-semibold flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {d.bestTime}
                    </span>
                    <span className="text-[10px] bg-secondary/10 text-secondary rounded-full px-2 py-0.5 font-semibold">
                      Entry: {d.entryFee}
                    </span>
                  </div>

                  {/* Expand toggle */}
                  <button
                    onClick={() => toggleExpand(d.id, d)}
                    className={`w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                      isOpen ? "gradient-hero text-ivory shadow-glow" : "bg-primary/10 text-primary hover:bg-primary/20"
                    }`}
                  >
                    {isOpen ? "Hide Details" : "View Details"}
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {/* Expanded details */}
                {isOpen && (
                  <div className="border-t border-border p-4 space-y-4 animate-[fade-in_0.3s_ease-out]">
                    <p className="text-sm text-foreground/80">{d.description}</p>

                    {/* Food */}
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                        <Utensils className="w-3 h-3" /> Local Food
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {d.food.map((f) => (
                          <span key={f} className="text-xs bg-accent/20 rounded-full px-2 py-0.5">{f}</span>
                        ))}
                      </div>
                    </div>

                    {/* Stays */}
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                        <BedDouble className="w-3 h-3" /> Where to Stay
                      </div>
                      <div className="space-y-1">
                        {d.stays.map((s) => (
                          <div key={s.name} className="flex justify-between text-xs">
                            <span className="font-medium">{s.name}</span>
                            <span className="text-primary font-semibold">{s.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Transport */}
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                        <Bus className="w-3 h-3" /> How to Reach
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {d.transport.map((t) => (
                          <span key={t} className="text-xs glass rounded-full px-2 py-0.5">{t}</span>
                        ))}
                      </div>
                    </div>

                    {/* Nearby count teaser */}
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Star className="w-3 h-3 text-primary" />
                      {d.nearby.length} nearby places — see the Nearby Places tab for details
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
