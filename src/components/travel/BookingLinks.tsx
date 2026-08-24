import { useState } from "react";
import { ExternalLink, Plane, Train, Bus, Hotel, Globe, Search } from "lucide-react";
import { destinations } from "@/data/destinations";

type BookingCategory = "All" | "Flights" | "Trains" | "Buses" | "Hotels";

interface Platform {
  name: string;
  tagline: string;
  emoji: string;
  category: Exclude<BookingCategory, "All">;
  baseUrl: string;
  buildUrl: (city: string, state: string) => string;
  color: string;
}

const PLATFORMS: Platform[] = [
  {
    name: "MakeMyTrip",
    tagline: "Flights, hotels, trains & holiday packages",
    emoji: "✈️",
    category: "Flights",
    baseUrl: "https://www.makemytrip.com",
    buildUrl: (city) => `https://www.makemytrip.com/flights/`,
    color: "from-blue-500 to-blue-700",
  },
  {
    name: "IRCTC Rail Connect",
    tagline: "Official Indian Railways booking portal",
    emoji: "🚂",
    category: "Trains",
    baseUrl: "https://www.irctc.co.in",
    buildUrl: () => `https://www.irctc.co.in/nget/train-search`,
    color: "from-orange-500 to-orange-700",
  },
  {
    name: "RedBus",
    tagline: "India's largest bus ticketing platform",
    emoji: "🚌",
    category: "Buses",
    baseUrl: "https://www.redbus.in",
    buildUrl: (city) => `https://www.redbus.in/bus-tickets/${city.toLowerCase().replace(/\s+/g, "-")}-to-`,
    color: "from-red-500 to-red-700",
  },
  {
    name: "Booking.com",
    tagline: "Hotels, resorts, homestays & hostels",
    emoji: "🏨",
    category: "Hotels",
    baseUrl: "https://www.booking.com",
    buildUrl: (city, state) => `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(city + ", " + state + ", India")}`,
    color: "from-sky-500 to-sky-700",
  },
  {
    name: "Yatra",
    tagline: "Flights, hotels & holiday packages",
    emoji: "🌏",
    category: "Flights",
    baseUrl: "https://www.yatra.com",
    buildUrl: () => `https://www.yatra.com/flight/`,
    color: "from-emerald-500 to-emerald-700",
  },
  {
    name: "GoIbibo",
    tagline: "Cheap flights, hotels & train tickets",
    emoji: "🎫",
    category: "Flights",
    baseUrl: "https://www.goibibo.com",
    buildUrl: () => `https://www.goibibo.com/flights/`,
    color: "from-violet-500 to-violet-700",
  },
  {
    name: "Airbnb India",
    tagline: "Unique stays, villas & local homestays",
    emoji: "🏡",
    category: "Hotels",
    baseUrl: "https://www.airbnb.co.in",
    buildUrl: (city, state) => `https://www.airbnb.co.in/s/${encodeURIComponent(city + "--" + state + "--India")}/homes`,
    color: "from-rose-500 to-rose-700",
  },
  {
    name: "Agoda",
    tagline: "Hotels & resorts across India at great prices",
    emoji: "🌸",
    category: "Hotels",
    baseUrl: "https://www.agoda.com",
    buildUrl: (city, state) => `https://www.agoda.com/search?city=${encodeURIComponent(city)}&country=India`,
    color: "from-amber-500 to-amber-700",
  },
  {
    name: "AbhiBus",
    tagline: "Bus tickets for all major Indian routes",
    emoji: "🚍",
    category: "Buses",
    baseUrl: "https://www.abhibus.com",
    buildUrl: (city) => `https://www.abhibus.com/bus-tickets/${city.toLowerCase().replace(/\s+/g, "-")}`,
    color: "from-lime-500 to-lime-700",
  },
  {
    name: "Cleartrip",
    tagline: "Flights, hotels & local activities",
    emoji: "🗺️",
    category: "Flights",
    baseUrl: "https://www.cleartrip.com",
    buildUrl: () => `https://www.cleartrip.com/flights`,
    color: "from-indigo-500 to-indigo-700",
  },
  {
    name: "OYO Rooms",
    tagline: "Budget hotels & stays across India",
    emoji: "🛏️",
    category: "Hotels",
    baseUrl: "https://www.oyorooms.com",
    buildUrl: (city) => `https://www.oyorooms.com/search/?location=${encodeURIComponent(city)}`,
    color: "from-red-600 to-rose-800",
  },
  {
    name: "Ixigo Trains",
    tagline: "Train tickets, PNR status & live tracking",
    emoji: "🚄",
    category: "Trains",
    baseUrl: "https://www.ixigo.com",
    buildUrl: () => `https://www.ixigo.com/trains`,
    color: "from-teal-500 to-teal-700",
  },
];

const CAT_ICONS: Record<BookingCategory, React.ReactNode> = {
  All: <Globe className="w-4 h-4" />,
  Flights: <Plane className="w-4 h-4" />,
  Trains: <Train className="w-4 h-4" />,
  Buses: <Bus className="w-4 h-4" />,
  Hotels: <Hotel className="w-4 h-4" />,
};

export function BookingLinks() {
  const [category, setCategory] = useState<BookingCategory>("All");
  const [selDest, setSelDest] = useState(destinations[0].id);

  const dest = destinations.find((d) => d.id === selDest) ?? destinations[0];

  const filtered = PLATFORMS.filter((p) => category === "All" || p.category === category);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center shadow-glow">
          <Globe className="w-5 h-5 text-ivory" />
        </div>
        <div>
          <h2 className="font-display font-bold text-2xl">Travel Booking Links</h2>
          <p className="text-sm text-muted-foreground">Top platforms to book your India trip — opens in a new tab</p>
        </div>
      </div>

      {/* Destination context */}
      <div className="glass rounded-2xl p-4 space-y-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Booking for destination
        </div>
        <select
          value={selDest}
          onChange={(e) => setSelDest(e.target.value)}
          className="input w-full"
        >
          {destinations.map((d) => (
            <option key={d.id} value={d.id}>{d.name} — {d.city}, {d.state}</option>
          ))}
        </select>
        <div className="text-xs text-muted-foreground">
          Links below will pre-fill <span className="font-semibold text-foreground">{dest.city}, {dest.state}</span> where supported by each platform.
        </div>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        {(["All", "Flights", "Trains", "Buses", "Hotels"] as BookingCategory[]).map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              category === cat
                ? "gradient-hero text-ivory shadow-glow"
                : "glass hover:bg-primary/10"
            }`}
          >
            {CAT_ICONS[cat]}
            {cat}
          </button>
        ))}
      </div>

      {/* Platform cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((p) => (
          <a
            key={p.name}
            href={p.buildUrl(dest.city, dest.state)}
            target="_blank"
            rel="noopener noreferrer"
            className="group glass rounded-2xl p-5 shadow-card hover-lift flex flex-col gap-3 transition-all hover:border-primary/30"
          >
            {/* Top */}
            <div className="flex items-center justify-between">
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center text-2xl shadow-md`}>
                {p.emoji}
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>

            {/* Info */}
            <div>
              <div className="font-display font-bold text-base">{p.name}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{p.tagline}</div>
            </div>

            {/* Category badge */}
            <div>
              <span className={`inline-flex items-center gap-1 text-[10px] font-semibold rounded-full px-2 py-0.5 bg-primary/10 text-primary`}>
                {CAT_ICONS[p.category]}
                {p.category}
              </span>
            </div>

            {/* CTA */}
            <div className={`w-full text-center py-2 rounded-xl text-sm font-semibold text-ivory bg-gradient-to-r ${p.color} group-hover:opacity-90 transition-opacity`}>
              Book on {p.name.split(" ")[0]} →
            </div>
          </a>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="glass rounded-2xl p-4 text-xs text-muted-foreground space-y-1">
        <div className="font-semibold text-foreground mb-1">📌 Note</div>
        <p>All booking links open external websites in a new tab. Virasat is not affiliated with any of these platforms. Prices and availability are subject to change.</p>
        <p>For Indian Railways, always book via the <a href="https://www.irctc.co.in" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">official IRCTC website</a> for the safest experience.</p>
      </div>
    </div>
  );
}
