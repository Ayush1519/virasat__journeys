import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useState } from "react";
import { Calculator, MapPin, Compass, Globe, Map } from "lucide-react";
import { BudgetCalculator } from "@/components/travel/BudgetCalculator";
import { TravelExplorer } from "@/components/travel/TravelExplorer";
import { NearbyPlaces } from "@/components/travel/NearbyPlaces";
import { BookingLinks } from "@/components/travel/BookingLinks";
import { TravelMap } from "@/components/travel/TravelMap";
import type { Destination } from "@/data/destinations";

export const Route = createFileRoute("/travel-guide")({
  head: () => ({
    meta: [
      { title: "Travel Guide — Virasat" },
      { name: "description", content: "Plan trips across India — budget calculator, destination explorer, nearby places, booking links and an interactive map." },
    ],
  }),
  component: TravelGuidePage,
});

const TABS = [
  { id: "budget",   label: "Budget Calculator", icon: Calculator },
  { id: "explorer", label: "Travel Explorer",   icon: Compass },
  { id: "nearby",   label: "Nearby Places",     icon: MapPin },
  { id: "booking",  label: "Booking Links",     icon: Globe },
  { id: "map",      label: "Map",               icon: Map },
] as const;

type TabId = (typeof TABS)[number]["id"];

function TravelGuidePage() {
  const [tab, setTab] = useState<TabId>("budget");
  const [selectedDest, setSelectedDest] = useState<Destination | undefined>(undefined);

  function handleDestSelect(d: Destination) {
    setSelectedDest(d);
  }

  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-4 py-10">
        {/* Page header */}
        <div className="mb-10">
          <div className="text-xs uppercase tracking-[0.3em] text-primary font-semibold mb-3">
            Travel Guide
          </div>
          <h1 className="font-display font-bold text-5xl md:text-6xl text-gradient-hero mb-4">
            India Travel Guide
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Plan your journey anywhere in India — calculate budgets, explore destinations, discover nearby places, and book with the best platforms.
          </p>
        </div>

        {/* Tab bar */}
        <div className="glass rounded-2xl p-1.5 flex flex-wrap gap-1 mb-8 shadow-soft">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                tab === id
                  ? "gradient-hero text-ivory shadow-glow"
                  : "text-muted-foreground hover:text-foreground hover:bg-primary/5"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">{label}</span>
              <span className="sm:hidden">{label.split(" ")[0]}</span>
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="animate-[fade-in_0.3s_ease-out]" key={tab}>
          {tab === "budget"   && <BudgetCalculator />}
          {tab === "explorer" && <TravelExplorer onDestinationSelect={handleDestSelect} />}
          {tab === "nearby"   && <NearbyPlaces selected={selectedDest} />}
          {tab === "booking"  && <BookingLinks />}
          {tab === "map"      && <TravelMap />}
        </div>
      </div>
    </Layout>
  );
}
