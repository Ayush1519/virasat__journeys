import { useMemo, useState } from "react";
import { reels } from "@/data/reels";
import { destinations, CATEGORIES } from "@/data/destinations";
import { ReelCard } from "./ReelCard";

export function ReelsFeed() {
  const [stateFilter, setStateFilter] = useState<string>("");
  const [cityFilter, setCityFilter] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [query, setQuery] = useState("");

  const states = useMemo(() => Array.from(new Set(destinations.map((d) => d.state))).sort(), []);
  const cities = useMemo(() => {
    if (!stateFilter) return Array.from(new Set(destinations.map((d) => d.city))).sort();
    return Array.from(new Set(destinations.filter((d) => d.state === stateFilter).map((d) => d.city))).sort();
  }, [stateFilter]);

  const filtered = useMemo(() => {
    return reels.filter((r) => {
      if (stateFilter && r.state !== stateFilter) return false;
      if (cityFilter && r.city !== cityFilter) return false;
      if (categoryFilter && r.category !== categoryFilter) return false;
      if (query && !`${r.title} ${r.caption} ${r.creator}`.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [stateFilter, cityFilter, categoryFilter, query]);

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <select value={stateFilter} onChange={(e) => { setStateFilter(e.target.value); setCityFilter(""); }} className="input">
          <option value="">All States</option>
          {states.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={cityFilter} onChange={(e) => setCityFilter(e.target.value)} className="input">
          <option value="">All Cities</option>
          {cities.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="input">
          <option value="">All Categories</option>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search reels" className="input" />
      </div>

      <div className="space-y-8">
        {filtered.map((r) => (
          <div key={r.id} className="animate-[fade-in_0.3s]">
            <ReelCard r={r} />
          </div>
        ))}
        {filtered.length === 0 && <div className="text-center text-muted-foreground py-8">No reels match your filters.</div>}
      </div>
    </div>
  );
}
