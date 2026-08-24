import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useState } from "react";
import {
  destinations,
  distanceKm,
  getDestination,
  travelHours,
  type Nearby,
} from "@/data/destinations";
import { inr } from "@/lib/journey";
import {
  MapPin,
  Clock,
  Ticket,
  CalendarDays,
  Wallet,
  Utensils,
  BedDouble,
  Bus,
  Map as MapIcon,
  LayoutGrid,
  ExternalLink,
} from "lucide-react";

export const Route = createFileRoute("/place/$placeId")({
  loader: ({ params }) => {
    const place = getDestination(params.placeId);
    if (!place) throw notFound();
    return { place };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Place not found — Virasat" }, { name: "robots", content: "noindex" }],
      };
    }
    const p = loaderData.place;
    const title = `${p.name}, ${p.city} — Travel Guide | Virasat`;
    return {
      meta: [
        { title },
        { name: "description", content: p.description.slice(0, 155) },
        { property: "og:title", content: title },
        { property: "og:description", content: p.tagline },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: PlacePage,
});

const bookings = (q: string) => [
  { label: "Flights", href: `https://www.google.com/travel/flights?q=${encodeURIComponent("flights to " + q)}` },
  { label: "Trains", href: `https://www.google.com/search?q=${encodeURIComponent("trains to " + q + " IRCTC")}` },
  { label: "Hotels", href: `https://www.google.com/travel/search?q=${encodeURIComponent("hotels in " + q)}` },
  { label: "Directions", href: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(q)}` },
];

function PlacePage() {
  const { place } = Route.useLoaderData();
  const [view, setView] = useState<"cards" | "map">("cards");
  const [type, setType] = useState<string>("All");

  const types = ["All", ...Array.from(new Set(place.nearby.map((x) => x.type)))];
  const nearbyList = place.nearby.filter((x) => type === "All" || x.type === type);

  const otherDestinations = destinations
    .filter((d) => d.id !== place.id)
    .map((d) => ({ d, km: distanceKm(place.coords, d.coords) }))
    .sort((a, b) => a.km - b.km)
    .slice(0, 4);

  return (
    <Layout>
      <section className="relative h-[52vh] min-h-[360px] overflow-hidden">
        <img src={place.image} alt={place.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/95 via-secondary/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 pb-8 text-ivory">
          <div className="flex items-center gap-1.5 text-xs opacity-85 mb-2">
            <MapPin className="w-3.5 h-3.5" />
            {place.city}, {place.state}
          </div>
          <h1 className="font-display font-bold text-4xl md:text-6xl mb-2">{place.name}</h1>
          <p className="italic font-light opacity-90 max-w-2xl">"{place.tagline}"</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="glass-dark rounded-full px-3 py-1 text-xs font-semibold">{place.category}</span>
            {place.heritageSiteId && (
              <Link
                to="/site/$siteId"
                params={{ siteId: place.heritageSiteId }}
                className="rounded-full gradient-saffron px-4 py-1.5 text-xs font-bold text-secondary"
              >
                Read the heritage story →
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 space-y-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Stat icon={<CalendarDays className="w-4 h-4" />} label="Best time" value={place.bestTime} />
          <Stat icon={<Clock className="w-4 h-4" />} label="Time needed" value={`${place.suggestedHours} hrs`} />
          <Stat icon={<Ticket className="w-4 h-4" />} label="Entry" value={place.entryFee} />
          <Stat icon={<Wallet className="w-4 h-4" />} label="Avg / day" value={inr(place.avgCostPerDay)} />
        </div>

        <div className="glass rounded-3xl p-6 shadow-soft">
          <h2 className="font-display font-bold text-2xl mb-3">About this place</h2>
          <p className="text-muted-foreground leading-relaxed">{place.description}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-4">
          <Panel icon={<Utensils className="w-4 h-4" />} title="What to eat">
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              {place.food.map((f) => (
                <li key={f}>• {f}</li>
              ))}
            </ul>
          </Panel>
          <Panel icon={<BedDouble className="w-4 h-4" />} title="Where to stay">
            <ul className="space-y-2 text-sm">
              {place.stays.map((s) => (
                <li key={s.name} className="flex justify-between gap-2">
                  <span>
                    {s.name} <span className="text-muted-foreground text-xs">· {s.type}</span>
                  </span>
                  <span className="font-semibold text-primary whitespace-nowrap">{s.price}</span>
                </li>
              ))}
            </ul>
          </Panel>
          <Panel icon={<Bus className="w-4 h-4" />} title="Getting around">
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              {place.transport.map((t) => (
                <li key={t}>• {t}</li>
              ))}
            </ul>
          </Panel>
        </div>

        <div className="glass rounded-3xl p-6 shadow-soft">
          <h2 className="font-display font-bold text-2xl mb-4">Travel assistance</h2>
          <div className="flex flex-wrap gap-2">
            {bookings(`${place.name}, ${place.city}`).map((b) => (
              <a
                key={b.label}
                href={b.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full glass px-4 py-2 text-sm font-semibold hover:bg-primary/10 transition-colors"
              >
                {b.label}
                <ExternalLink className="w-3.5 h-3.5 text-primary" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <h2 className="font-display font-bold text-3xl text-gradient-hero">Explore nearby</h2>
            <div className="glass rounded-full p-1 flex">
              <ViewBtn active={view === "cards"} onClick={() => setView("cards")} icon={<LayoutGrid className="w-4 h-4" />} label="Cards" />
              <ViewBtn active={view === "map"} onClick={() => setView("map")} icon={<MapIcon className="w-4 h-4" />} label="Map" />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  type === t ? "gradient-hero text-ivory shadow-glow" : "glass hover:bg-primary/10"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {view === "cards" ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {nearbyList.map((x) => (
                <NearbyCard key={x.name} item={x} origin={`${place.name}, ${place.city}`} />
              ))}
            </div>
          ) : (
            <NearbyMap center={place.name} items={nearbyList} />
          )}
        </div>

        <div>
          <h2 className="font-display font-bold text-3xl text-gradient-hero mb-5">Next stops on your route</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherDestinations.map(({ d, km }) => (
              <Link
                key={d.id}
                to="/place/$placeId"
                params={{ placeId: d.id }}
                className="group rounded-3xl overflow-hidden shadow-card hover-lift relative aspect-[4/3]"
              >
                <img src={d.image} alt={d.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/95 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-ivory">
                  <div className="font-display font-bold text-lg leading-tight">{d.name}</div>
                  <div className="text-[11px] opacity-80">
                    {km} km · ~{travelHours(km)} hrs by road
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="glass rounded-2xl p-4 shadow-soft">
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1.5">
        <span className="text-primary">{icon}</span>
        {label}
      </div>
      <div className="font-semibold text-sm">{value}</div>
    </div>
  );
}

function Panel({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="glass rounded-3xl p-6 shadow-soft">
      <h3 className="font-display font-bold text-xl mb-3 flex items-center gap-2">
        <span className="text-primary">{icon}</span>
        {title}
      </h3>
      {children}
    </div>
  );
}

function ViewBtn({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all ${
        active ? "gradient-hero text-ivory" : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function NearbyCard({ item, origin }: { item: Nearby; origin: string }) {
  return (
    <div className="glass rounded-3xl p-5 shadow-soft hover-lift">
      <div className="flex items-center justify-between mb-2">
        <span className="rounded-full bg-primary/10 text-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
          {item.type}
        </span>
        <span className="text-xs font-semibold text-muted-foreground">{item.distanceKm} km</span>
      </div>
      <h3 className="font-display font-bold text-lg mb-1">{item.name}</h3>
      <p className="text-sm text-muted-foreground mb-3">{item.desc}</p>
      <a
        href={`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(item.name)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs font-bold text-primary inline-flex items-center gap-1"
      >
        Get directions <ExternalLink className="w-3 h-3" />
      </a>
    </div>
  );
}

function NearbyMap({ center, items }: { center: string; items: Nearby[] }) {
  const max = Math.max(10, ...items.map((i) => i.distanceKm));
  return (
    <div className="glass rounded-3xl p-6 shadow-soft">
      <div className="relative mx-auto aspect-square max-w-2xl rounded-full border border-border/60">
        {[0.33, 0.66, 1].map((r) => (
          <div
            key={r}
            className="absolute rounded-full border border-dashed border-primary/25"
            style={{ inset: `${(1 - r) * 50}%` }}
          />
        ))}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="w-14 h-14 rounded-full gradient-hero shadow-glow flex items-center justify-center">
            <MapPin className="w-6 h-6 text-ivory" />
          </div>
          <div className="mt-1 text-[10px] font-bold max-w-[100px]">{center}</div>
        </div>
        {items.map((item, i) => {
          const angle = (i / Math.max(1, items.length)) * Math.PI * 2 - Math.PI / 2;
          const radius = 12 + (item.distanceKm / max) * 36;
          const left = 50 + Math.cos(angle) * radius;
          const top = 50 + Math.sin(angle) * radius;
          return (
            <div
              key={item.name}
              className="absolute -translate-x-1/2 -translate-y-1/2 group"
              style={{ left: `${left}%`, top: `${top}%` }}
            >
              <div className="w-3 h-3 rounded-full bg-secondary ring-4 ring-primary/25 group-hover:scale-125 transition-transform" />
              <div className="absolute left-1/2 -translate-x-1/2 mt-1.5 whitespace-nowrap glass rounded-full px-2 py-0.5 text-[9px] font-semibold">
                {item.name} · {item.distanceKm}km
              </div>
            </div>
          );
        })}
      </div>
      <p className="text-center text-xs text-muted-foreground mt-4">
        Distance rings — inner circle is closest to {center}.
      </p>
    </div>
  );
}
