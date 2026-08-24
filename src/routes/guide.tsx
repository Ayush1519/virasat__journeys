import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useEffect, useMemo, useState } from "react";
import {
  INTERESTS,
  destinations,
  distanceKm,
  getDestination,
  trails,
  travelHours,
  type Interest,
} from "@/data/destinations";
import { deleteTrip, getTrips, inr, saveTrip, type SavedTrip } from "@/lib/journey";
import { toast } from "sonner";
import {
  CalendarDays,
  Wallet,
  Users,
  Sparkles,
  Route as RouteIcon,
  Trash2,
  ExternalLink,
  Compass,
} from "lucide-react";

export const Route = createFileRoute("/guide")({
  head: () => ({
    meta: [
      { title: "Plan My Journey — India Travel Guide & Trip Planner | Virasat" },
      {
        name: "description",
        content:
          "Build a day-by-day India itinerary from your dates, budget and interests, browse nine classic travel trails, and estimate costs instantly.",
      },
      { property: "og:title", content: "Plan My Journey — India Travel Guide | Virasat" },
      {
        property: "og:description",
        content: "Dynamic itineraries, classic trails and a budget calculator for travelling India.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GuidePage,
});

type Day = {
  day: number;
  date: string;
  destId?: string;
  title: string;
  travel?: string;
  morning: string;
  afternoon: string;
  evening: string;
  cost: number;
};

const addDays = (iso: string, n: number) => {
  const d = new Date(iso || Date.now());
  d.setDate(d.getDate() + n);
  return d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
};

function buildItinerary(opts: {
  startDate: string;
  days: number;
  budget: number;
  travellers: number;
  interests: Interest[];
  startFrom: string;
}): { days: Day[]; stops: string[]; total: number } {
  const perPersonBudget = opts.budget / Math.max(1, opts.travellers);
  const scored = destinations
    .map((d) => ({
      d,
      score:
        d.interests.filter((i) => opts.interests.includes(i)).length * 10 -
        d.avgCostPerDay / 1000,
    }))
    .sort((a, b) => b.score - a.score);

  const seed = getDestination(opts.startFrom) ?? scored[0].d;
  const picked = [seed];
  const pool = scored.map((s) => s.d).filter((d) => d.id !== seed.id);

  const maxStops = Math.max(1, Math.ceil(opts.days / 2));
  while (picked.length < maxStops && pool.length) {
    const last = picked[picked.length - 1];
    // prefer high-interest destinations that are reasonably close
    let best = pool[0];
    let bestVal = -Infinity;
    for (const cand of pool) {
      const km = distanceKm(last.coords, cand.coords);
      const interestHits = cand.interests.filter((i) => opts.interests.includes(i)).length;
      const val = interestHits * 12 - km / 120 - cand.avgCostPerDay / 1500;
      if (val > bestVal) {
        bestVal = val;
        best = cand;
      }
    }
    picked.push(best);
    pool.splice(pool.indexOf(best), 1);
  }

  const days: Day[] = [];
  let idx = 0;
  for (let i = 0; i < opts.days; i++) {
    const dest = picked[Math.min(idx, picked.length - 1)];
    const isArrival = i === 0 || dest !== picked[Math.min(idx - 1, picked.length - 1)];
    const prev = idx > 0 ? picked[idx - 1] : undefined;
    const km = prev ? distanceKm(prev.coords, dest.coords) : 0;
    days.push({
      day: i + 1,
      date: addDays(opts.startDate, i),
      destId: dest.id,
      title: isArrival ? `Arrive in ${dest.city} — ${dest.name}` : `${dest.city} at your own pace`,
      travel: prev && isArrival ? `${km} km from ${prev.city} · ~${travelHours(km)} hrs` : undefined,
      morning: isArrival
        ? `Travel & check in. First look at ${dest.name} (${dest.suggestedHours} hrs suggested).`
        : `Slow morning walk, local market and photography around ${dest.city}.`,
      afternoon: isArrival
        ? `${dest.nearby[0]?.name ?? dest.name} — ${dest.nearby[0]?.desc ?? dest.tagline}`
        : `${dest.nearby[1]?.name ?? dest.name} — ${dest.nearby[1]?.desc ?? "explore at leisure"}`,
      evening: `Dinner: ${dest.food[i % dest.food.length]}. Stay at ${dest.stays[0]?.name}.`,
      cost: dest.avgCostPerDay,
    });
    if ((i + 1) % 2 === 0) idx = Math.min(idx + 1, picked.length - 1);
  }

  const total = days.reduce((s, d) => s + d.cost, 0) * Math.max(1, opts.travellers);
  return { days, stops: picked.map((p) => p.id), total: Math.round(total) };
}

function GuidePage() {
  const today = new Date().toISOString().slice(0, 10);
  const [startDate, setStartDate] = useState(today);
  const [days, setDays] = useState(6);
  const [budget, setBudget] = useState(40000);
  const [travellers, setTravellers] = useState(2);
  const [interests, setInterests] = useState<Interest[]>(["Heritage", "Food"]);
  const [startFrom, setStartFrom] = useState("");
  const [plan, setPlan] = useState<ReturnType<typeof buildItinerary> | null>(null);
  const [trips, setTrips] = useState<SavedTrip[]>([]);

  useEffect(() => setTrips(getTrips()), []);

  const toggleInterest = (i: Interest) =>
    setInterests((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));

  const generate = () => {
    if (interests.length === 0) {
      toast.error("Pick at least one interest");
      return;
    }
    const p = buildItinerary({ startDate, days, budget, travellers, interests, startFrom });
    setPlan(p);
    toast.success("Your journey is ready");
    setTimeout(() => document.getElementById("itinerary")?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const matchingTrails = useMemo(
    () =>
      [...trails].sort(
        (a, b) =>
          b.interests.filter((i) => interests.includes(i)).length -
          a.interests.filter((i) => interests.includes(i)).length,
      ),
    [interests],
  );

  const perPerson = plan ? plan.total / Math.max(1, travellers) : 0;
  const overBudget = plan ? plan.total - budget : 0;

  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-4 py-10 space-y-14">
        <header className="text-center">
          <div className="text-xs uppercase tracking-[0.3em] text-primary font-semibold mb-3">
            Travel Guide
          </div>
          <h1 className="font-display font-bold text-4xl md:text-6xl text-gradient-hero mb-3">
            Plan my journey
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tell us when you're free, what you love and what you can spend — we'll shape a
            day-by-day route across India, with trails, costs and booking links.
          </p>
        </header>

        {/* Planner */}
        <div className="glass rounded-3xl p-6 md:p-8 shadow-card">
          <h2 className="font-display font-bold text-2xl mb-6 flex items-center gap-2">
            <Compass className="w-5 h-5 text-primary" />
            Your trip
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Field label="Start date" icon={<CalendarDays className="w-3.5 h-3.5" />}>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="input-base"
              />
            </Field>
            <Field label={`Duration · ${days} days`} icon={<RouteIcon className="w-3.5 h-3.5" />}>
              <input
                type="range"
                min={2}
                max={21}
                value={days}
                onChange={(e) => setDays(+e.target.value)}
                className="w-full accent-[var(--primary)]"
              />
            </Field>
            <Field label="Total budget (₹)" icon={<Wallet className="w-3.5 h-3.5" />}>
              <input
                type="number"
                min={2000}
                step={1000}
                value={budget}
                onChange={(e) => setBudget(+e.target.value)}
                className="input-base"
              />
            </Field>
            <Field label="Travellers" icon={<Users className="w-3.5 h-3.5" />}>
              <input
                type="number"
                min={1}
                max={12}
                value={travellers}
                onChange={(e) => setTravellers(+e.target.value)}
                className="input-base"
              />
            </Field>
          </div>

          <Field label="Start from (optional)" icon={<Compass className="w-3.5 h-3.5" />}>
            <select
              value={startFrom}
              onChange={(e) => setStartFrom(e.target.value)}
              className="input-base"
            >
              <option value="">Surprise me</option>
              {destinations.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} — {d.city}
                </option>
              ))}
            </select>
          </Field>

          <div className="mt-6">
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
              Interests
            </div>
            <div className="flex flex-wrap gap-2">
              {INTERESTS.map((i) => (
                <button
                  key={i}
                  onClick={() => toggleInterest(i)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    interests.includes(i)
                      ? "gradient-hero text-ivory shadow-glow"
                      : "glass hover:bg-primary/10"
                  }`}
                >
                  {i}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={generate}
            className="mt-7 w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl gradient-hero text-ivory px-8 py-3.5 font-bold shadow-glow hover:opacity-95 transition-opacity"
          >
            <Sparkles className="w-4 h-4" />
            Generate my itinerary
          </button>
        </div>

        {/* Itinerary */}
        {plan && (
          <div id="itinerary" className="space-y-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Metric label="Days" value={`${days}`} />
              <Metric label="Stops" value={`${plan.stops.length}`} />
              <Metric label="Estimated total" value={inr(plan.total)} />
              <Metric
                label={overBudget > 0 ? "Over budget by" : "Left in budget"}
                value={inr(Math.abs(overBudget))}
                tone={overBudget > 0 ? "warn" : "good"}
              />
            </div>

            <div className="glass rounded-3xl p-6 shadow-soft">
              <h2 className="font-display font-bold text-2xl mb-1">Budget calculator</h2>
              <p className="text-sm text-muted-foreground mb-5">
                Rough split for {travellers} traveller{travellers > 1 ? "s" : ""} · {inr(perPerson)} per person.
              </p>
              <div className="space-y-3">
                {[
                  ["Stay", 0.38],
                  ["Food", 0.22],
                  ["Travel & transport", 0.27],
                  ["Tickets & experiences", 0.13],
                ].map(([label, share]) => (
                  <div key={label as string}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{label as string}</span>
                      <span className="font-semibold">{inr(plan.total * (share as number))}</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full gradient-saffron rounded-full"
                        style={{ width: `${(share as number) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {plan.days.map((d) => {
                const dest = d.destId ? getDestination(d.destId) : undefined;
                return (
                  <div key={d.day} className="glass rounded-3xl p-6 shadow-soft hover-lift">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold">
                          Day {d.day} · {d.date}
                        </div>
                        <h3 className="font-display font-bold text-xl">{d.title}</h3>
                        {d.travel && (
                          <div className="text-xs text-muted-foreground mt-1">🚌 {d.travel}</div>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                          Day cost / person
                        </div>
                        <div className="font-bold text-primary">{inr(d.cost)}</div>
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-3 text-sm">
                      <Slot label="Morning" text={d.morning} />
                      <Slot label="Afternoon" text={d.afternoon} />
                      <Slot label="Evening" text={d.evening} />
                    </div>
                    {dest && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Link
                          to="/place/$placeId"
                          params={{ placeId: dest.id }}
                          className="rounded-full glass px-4 py-1.5 text-xs font-bold hover:bg-primary/10"
                        >
                          Explore {dest.name} →
                        </Link>
                        <a
                          href={`https://www.google.com/travel/search?q=${encodeURIComponent("hotels in " + dest.city)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full glass px-4 py-1.5 text-xs font-bold hover:bg-primary/10 inline-flex items-center gap-1"
                        >
                          Book stay <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => {
                saveTrip({
                  title: `${days}-day journey from ${getDestination(plan.stops[0])?.city}`,
                  startDate,
                  days,
                  budget,
                  travellers,
                  interests,
                  stops: plan.stops,
                });
                setTrips(getTrips());
                toast.success("Trip saved to this device");
              }}
              className="rounded-2xl gradient-saffron text-secondary px-8 py-3 font-bold shadow-glow"
            >
              Save this journey
            </button>
          </div>
        )}

        {/* Saved trips */}
        {trips.length > 0 && (
          <div>
            <h2 className="font-display font-bold text-3xl text-gradient-hero mb-5">Saved journeys</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {trips.map((t) => (
                <div key={t.id} className="glass rounded-3xl p-5 shadow-soft">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-display font-bold text-lg">{t.title}</h3>
                    <button
                      aria-label="Delete trip"
                      onClick={() => {
                        deleteTrip(t.id);
                        setTrips(getTrips());
                      }}
                      className="p-1.5 rounded-lg hover:bg-destructive/10 text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">
                    {t.startDate} · {t.days} days · {t.travellers} traveller
                    {t.travellers > 1 ? "s" : ""} · {inr(t.budget)}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {t.stops.map((s) => (
                      <Link
                        key={s}
                        to="/place/$placeId"
                        params={{ placeId: s }}
                        className="rounded-full bg-primary/10 text-primary px-3 py-1 text-[10px] font-bold"
                      >
                        {getDestination(s)?.name ?? s}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Trails */}
        <div>
          <h2 className="font-display font-bold text-3xl text-gradient-hero mb-2">
            India travel trails
          </h2>
          <p className="text-muted-foreground mb-6">
            Nine time-tested routes, sorted by how well they match your interests.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {matchingTrails.map((t) => (
              <div key={t.id} className="glass rounded-3xl p-6 shadow-soft hover-lift flex flex-col">
                <h3 className="font-display font-bold text-xl mb-1">{t.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{t.subtitle}</p>
                <dl className="text-xs space-y-1.5 mb-4">
                  <Row k="Duration" v={`${t.days} days`} />
                  <Row k="Transport" v={t.transport} />
                  <Row k="Stay" v={t.stay} />
                  <Row k="From" v={`${inr(t.estCostPerPerson)} / person`} />
                </dl>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {t.stops.map((s) => (
                    <Link
                      key={s}
                      to="/place/$placeId"
                      params={{ placeId: s }}
                      className="rounded-full bg-primary/10 text-primary px-3 py-1 text-[10px] font-bold hover:bg-primary/20"
                    >
                      {getDestination(s)?.name ?? s}
                    </Link>
                  ))}
                  {t.extraStops?.map((s) => (
                    <span key={s} className="rounded-full bg-muted px-3 py-1 text-[10px] font-semibold text-muted-foreground">
                      {s}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => {
                    setDays(t.days);
                    setInterests([...t.interests]);
                    setStartFrom(t.stops[0] ?? "");
                    setBudget(t.estCostPerPerson * travellers);
                    toast.success(`${t.name} loaded into the planner`);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="mt-auto rounded-2xl gradient-hero text-ivory py-2.5 text-sm font-bold shadow-glow"
                >
                  Use this trail
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

function Field({ label, icon, children }: { label: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1.5">
        <span className="text-primary">{icon}</span>
        {label}
      </span>
      {children}
    </label>
  );
}

function Metric({ label, value, tone }: { label: string; value: string; tone?: "warn" | "good" }) {
  return (
    <div className="glass rounded-2xl p-4 shadow-soft">
      <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">{label}</div>
      <div
        className={`font-display font-bold text-2xl ${
          tone === "warn" ? "text-destructive" : tone === "good" ? "text-primary" : ""
        }`}
      >
        {value}
      </div>
    </div>
  );
}

function Slot({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-2xl bg-background/60 border border-border p-3">
      <div className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold mb-1">{label}</div>
      <p className="text-muted-foreground">{text}</p>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-2">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="font-semibold text-right">{v}</dd>
    </div>
  );
}
