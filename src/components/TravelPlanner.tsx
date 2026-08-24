import { useMemo, useState } from "react";
import { destinations, Destination, INTERESTS } from "@/data/destinations";
import { Link } from "@tanstack/react-router";

type ItineraryDay = {
  day: number;
  places: Destination[];
  notes?: string;
};

export function TravelPlanner() {
  const [from, setFrom] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [travelers, setTravelers] = useState(2);
  const [budget, setBudget] = useState(0);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [itinerary, setItinerary] = useState<ItineraryDay[] | null>(null);

  const states = useMemo(() => Array.from(new Set(destinations.map((d) => d.state))).sort(), []);
  const cities = useMemo(() => {
    if (!state) return Array.from(new Set(destinations.map((d) => d.city))).sort();
    return Array.from(new Set(destinations.filter((d) => d.state === state).map((d) => d.city))).sort();
  }, [state]);

  function toggleInterest(i: string) {
    setSelectedInterests((s) => (s.includes(i) ? s.filter((x) => x !== i) : [...s, i]));
  }

  function generateItinerary() {
    const sd = startDate ? new Date(startDate) : new Date();
    const ed = endDate ? new Date(endDate) : new Date(sd.getTime() + 2 * 24 * 3600 * 1000);
    const days = Math.max(1, Math.ceil((ed.getTime() - sd.getTime()) / (24 * 3600 * 1000)) + 1);

    // pick matching destinations
    const pool = destinations.filter((d) => {
      if (state && d.state !== state) return false;
      if (city && d.city !== city) return false;
      if (selectedInterests.length && !selectedInterests.some((i) => d.interests.includes(i as any))) return false;
      return true;
    });
    const perDay = Math.max(1, Math.min(3, Math.ceil(pool.length / days) || 1));

    const plan: ItineraryDay[] = [];
    for (let i = 0; i < days; i++) {
      const dayPlaces = pool.slice(i * perDay, i * perDay + perDay);
      plan.push({ day: i + 1, places: dayPlaces.length ? dayPlaces : pool.slice(0, 1) });
    }

    setItinerary(plan);
  }

  function estimateBudget() {
    // rough estimate: sum avgCostPerDay * days * travelers
    const sd = startDate ? new Date(startDate) : new Date();
    const ed = endDate ? new Date(endDate) : new Date(sd.getTime() + 2 * 24 * 3600 * 1000);
    const days = Math.max(1, Math.ceil((ed.getTime() - sd.getTime()) / (24 * 3600 * 1000)) + 1);
    const avg = itinerary && itinerary.length ? itinerary.reduce((acc, d) => acc + d.places.reduce((s, p) => s + p.avgCostPerDay, 0), 0) / itinerary!.length : 2500;
    return Math.round(avg * days * travelers);
  }

  const trails = [
    { id: 'golden-triangle', name: 'Golden Triangle Trail', states: ['Delhi', 'Uttar Pradesh', 'Rajasthan'] },
    { id: 'buddhist-heritage', name: 'Buddhist Heritage Trail', states: ['Bihar', 'Uttar Pradesh', 'Maharashtra'] },
    { id: 'south-temple', name: 'South India Temple Trail', states: ['Tamil Nadu', 'Karnataka', 'Kerala'] },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input placeholder="Starting location (city or station)" value={from} onChange={(e) => setFrom(e.target.value)} className="input" />
        <select value={state} onChange={(e) => setState(e.target.value)} className="input">
          <option value="">Any State</option>
          {states.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={city} onChange={(e) => setCity(e.target.value)} className="input">
          <option value="">Any City</option>
          {cities.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <div className="flex gap-2">
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="input" />
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="input" />
        </div>
        <input type="number" min={1} value={travelers} onChange={(e) => setTravelers(Number(e.target.value))} className="input" />
        <input type="number" min={0} value={budget} onChange={(e) => setBudget(Number(e.target.value))} className="input" placeholder="Budget (INR)" />
      </div>

      <div className="mb-4">
        <div className="font-semibold mb-2">Interests</div>
        <div className="flex flex-wrap gap-2">
          {INTERESTS.map((i) => (
            <button key={i} onClick={() => toggleInterest(i)} className={`px-3 py-1 rounded-lg text-sm ${selectedInterests.includes(i) ? 'gradient-hero text-ivory' : 'glass'}`}>
              {i}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        <button onClick={generateItinerary} className="btn">Generate Itinerary</button>
        <button onClick={() => setItinerary(null)} className="btn outline">Clear</button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-display font-bold text-2xl mb-3">Suggested Itinerary</h3>
          {itinerary ? (
            itinerary.map((d) => (
              <div key={d.day} className="glass rounded-2xl p-4 mb-3">
                <div className="font-bold">Day {d.day}</div>
                <div className="mt-2 space-y-2">
                  {d.places.map((p) => (
                    <div key={p.id} className="flex items-start gap-3">
                      <img src={p.image} alt={p.name} className="w-20 h-14 rounded-md object-cover" />
                      <div>
                        <div className="font-semibold">{p.name}</div>
                        <div className="text-sm text-muted-foreground">{p.city}, {p.state}</div>
                        <div className="text-sm mt-1">{p.tagline}</div>
                        <div className="mt-2 flex gap-2">
                          <Link to="/site/$siteId" params={{ siteId: p.heritageSiteId ?? p.id }} className="text-primary text-sm">Explore →</Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-muted-foreground">No itinerary yet. Fill the form and click "Generate Itinerary".</div>
          )}
        </div>

        <aside>
          <div className="glass rounded-2xl p-4 mb-4">
            <div className="font-bold">Trip Budget Estimate</div>
            <div className="text-2xl font-display mt-2">₹{itinerary ? estimateBudget() : 0}</div>
            <div className="text-sm text-muted-foreground mt-1">Total for {travelers} travellers</div>
          </div>

          <div className="glass rounded-2xl p-4">
            <div className="font-bold mb-2">Popular Trails</div>
            <div className="space-y-2">
              {trails.map((t) => (
                <div key={t.id} className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-sm text-muted-foreground">{t.states.join(' · ')}</div>
                  </div>
                  <button className="btn small">Plan This Trail</button>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
