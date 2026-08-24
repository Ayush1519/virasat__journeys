import { useState, useMemo } from "react";
import { Calculator, Users, Calendar, Plane, Train, Bus, Car, Hotel, Home, Utensils, Camera, TrendingUp, IndianRupee } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

type TransportMode = "flight" | "train" | "bus" | "cab";
type AccomType = "budget" | "homestay" | "hotel" | "resort";
type FoodStyle = "budget" | "mid" | "luxury";

const TRANSPORT_COST: Record<TransportMode, number> = {
  flight: 8000,
  train: 1500,
  bus: 600,
  cab: 3500,
};

const ACCOM_COST: Record<AccomType, number> = {
  budget: 700,
  homestay: 1500,
  hotel: 3500,
  resort: 7000,
};

const FOOD_COST: Record<FoodStyle, number> = {
  budget: 400,
  mid: 900,
  luxury: 2000,
};

const CATEGORY_COLORS = ["#c2410c", "#1d4ed8", "#15803d", "#b45309", "#6d28d9"];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass rounded-xl px-4 py-2 shadow-card text-sm">
        <div className="font-semibold">{label}</div>
        <div className="text-primary font-bold">₹{payload[0].value.toLocaleString("en-IN")}</div>
      </div>
    );
  }
  return null;
};

export function BudgetCalculator() {
  const [travelers, setTravelers] = useState(2);
  const [days, setDays] = useState(5);
  const [transport, setTransport] = useState<TransportMode>("train");
  const [accom, setAccom] = useState<AccomType>("hotel");
  const [food, setFood] = useState<FoodStyle>("mid");
  const [activitiesPerDay, setActivitiesPerDay] = useState(500);
  const [miscPercent, setMiscPercent] = useState(10);

  const breakdown = useMemo(() => {
    const transportTotal = TRANSPORT_COST[transport] * 2 * travelers; // return journey
    const accomTotal = ACCOM_COST[accom] * days * Math.ceil(travelers / 2); // rooms
    const foodTotal = FOOD_COST[food] * days * travelers;
    const activitiesTotal = activitiesPerDay * days * travelers;
    const subtotal = transportTotal + accomTotal + foodTotal + activitiesTotal;
    const misc = Math.round((subtotal * miscPercent) / 100);
    const total = subtotal + misc;
    const perPerson = Math.round(total / travelers);

    return {
      transport: transportTotal,
      accommodation: accomTotal,
      food: foodTotal,
      activities: activitiesTotal,
      misc,
      total,
      perPerson,
    };
  }, [travelers, days, transport, accom, food, activitiesPerDay, miscPercent]);

  const chartData = [
    { name: "Transport", value: breakdown.transport },
    { name: "Stay", value: breakdown.accommodation },
    { name: "Food", value: breakdown.food },
    { name: "Activities", value: breakdown.activities },
    { name: "Misc", value: breakdown.misc },
  ];

  function TransportBtn({ mode, icon: Icon, label }: { mode: TransportMode; icon: any; label: string }) {
    return (
      <button
        onClick={() => setTransport(mode)}
        className={`flex flex-col items-center gap-1 p-3 rounded-2xl border text-sm font-semibold transition-all ${
          transport === mode
            ? "gradient-hero text-ivory shadow-glow border-transparent"
            : "glass border-border hover:border-primary/40"
        }`}
      >
        <Icon className="w-5 h-5" />
        {label}
      </button>
    );
  }

  function AccomBtn({ mode, icon: Icon, label }: { mode: AccomType; icon: any; label: string }) {
    return (
      <button
        onClick={() => setAccom(mode)}
        className={`flex flex-col items-center gap-1 p-3 rounded-2xl border text-sm font-semibold transition-all ${
          accom === mode
            ? "gradient-hero text-ivory shadow-glow border-transparent"
            : "glass border-border hover:border-primary/40"
        }`}
      >
        <Icon className="w-5 h-5" />
        {label}
      </button>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center shadow-glow">
          <Calculator className="w-5 h-5 text-ivory" />
        </div>
        <div>
          <h2 className="font-display font-bold text-2xl">Trip Budget Calculator</h2>
          <p className="text-sm text-muted-foreground">Estimate your India travel costs instantly</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* ── LEFT: Inputs ── */}
        <div className="space-y-6">
          {/* Travelers & Days */}
          <div className="glass rounded-2xl p-5 space-y-4">
            <div className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Trip Basics</div>
            <div className="grid grid-cols-2 gap-4">
              <label className="space-y-1">
                <div className="flex items-center gap-1.5 text-sm font-semibold">
                  <Users className="w-4 h-4 text-primary" /> Travelers
                </div>
                <input
                  type="number"
                  min={1}
                  max={50}
                  value={travelers}
                  onChange={(e) => setTravelers(Math.max(1, Number(e.target.value)))}
                  className="input w-full"
                />
              </label>
              <label className="space-y-1">
                <div className="flex items-center gap-1.5 text-sm font-semibold">
                  <Calendar className="w-4 h-4 text-primary" /> Days
                </div>
                <input
                  type="number"
                  min={1}
                  max={90}
                  value={days}
                  onChange={(e) => setDays(Math.max(1, Number(e.target.value)))}
                  className="input w-full"
                />
              </label>
            </div>
          </div>

          {/* Transport */}
          <div className="glass rounded-2xl p-5 space-y-3">
            <div className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Mode of Transport</div>
            <div className="grid grid-cols-4 gap-2">
              <TransportBtn mode="flight" icon={Plane} label="Flight" />
              <TransportBtn mode="train" icon={Train} label="Train" />
              <TransportBtn mode="bus" icon={Bus} label="Bus" />
              <TransportBtn mode="cab" icon={Car} label="Cab" />
            </div>
            <div className="text-xs text-muted-foreground">
              ₹{TRANSPORT_COST[transport].toLocaleString("en-IN")} per person one-way (estimated)
            </div>
          </div>

          {/* Accommodation */}
          <div className="glass rounded-2xl p-5 space-y-3">
            <div className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Accommodation</div>
            <div className="grid grid-cols-4 gap-2">
              <AccomBtn mode="budget" icon={Home} label="Budget" />
              <AccomBtn mode="homestay" icon={Home} label="Homestay" />
              <AccomBtn mode="hotel" icon={Hotel} label="Hotel" />
              <AccomBtn mode="resort" icon={Hotel} label="Resort" />
            </div>
            <div className="text-xs text-muted-foreground">
              ₹{ACCOM_COST[accom].toLocaleString("en-IN")} per room/night (2 people/room)
            </div>
          </div>

          {/* Food style */}
          <div className="glass rounded-2xl p-5 space-y-3">
            <div className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Food Style</div>
            <div className="flex gap-2">
              {(["budget", "mid", "luxury"] as FoodStyle[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFood(f)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                    food === f
                      ? "gradient-hero text-ivory shadow-glow border-transparent"
                      : "glass border-border hover:border-primary/40"
                  }`}
                >
                  <Utensils className="w-4 h-4" />
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
            <div className="text-xs text-muted-foreground">
              ₹{FOOD_COST[food].toLocaleString("en-IN")} per person/day
            </div>
          </div>

          {/* Activities & Misc */}
          <div className="glass rounded-2xl p-5 space-y-4">
            <div className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Activities & Misc</div>
            <label className="space-y-1 block">
              <div className="flex items-center justify-between text-sm font-semibold">
                <span className="flex items-center gap-1.5"><Camera className="w-4 h-4 text-primary" />Activities budget/person/day</span>
                <span className="text-primary">₹{activitiesPerDay.toLocaleString("en-IN")}</span>
              </div>
              <input
                type="range"
                min={100}
                max={5000}
                step={100}
                value={activitiesPerDay}
                onChange={(e) => setActivitiesPerDay(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>₹100</span><span>₹5,000</span>
              </div>
            </label>
            <label className="space-y-1 block">
              <div className="flex items-center justify-between text-sm font-semibold">
                <span className="flex items-center gap-1.5"><TrendingUp className="w-4 h-4 text-primary" />Miscellaneous buffer</span>
                <span className="text-primary">{miscPercent}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={30}
                step={5}
                value={miscPercent}
                onChange={(e) => setMiscPercent(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </label>
          </div>
        </div>

        {/* ── RIGHT: Results ── */}
        <div className="space-y-5">
          {/* Total cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="glass rounded-2xl p-5 shadow-card">
              <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Total Trip Cost</div>
              <div className="flex items-end gap-1">
                <IndianRupee className="w-5 h-5 text-primary mb-0.5" />
                <div className="font-display font-bold text-3xl text-gradient-hero">
                  {breakdown.total.toLocaleString("en-IN")}
                </div>
              </div>
              <div className="text-xs text-muted-foreground mt-1">for {travelers} traveller{travelers > 1 ? "s" : ""}, {days} days</div>
            </div>
            <div className="glass rounded-2xl p-5 shadow-card">
              <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Per Person</div>
              <div className="flex items-end gap-1">
                <IndianRupee className="w-5 h-5 text-secondary mb-0.5" />
                <div className="font-display font-bold text-3xl" style={{ color: "var(--secondary)" }}>
                  {breakdown.perPerson.toLocaleString("en-IN")}
                </div>
              </div>
              <div className="text-xs text-muted-foreground mt-1">all-inclusive estimate</div>
            </div>
          </div>

          {/* Breakdown table */}
          <div className="glass rounded-2xl p-5 shadow-card">
            <div className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Cost Breakdown</div>
            <div className="space-y-3">
              {[
                { label: "Transport (return)", value: breakdown.transport, color: CATEGORY_COLORS[0] },
                { label: "Accommodation", value: breakdown.accommodation, color: CATEGORY_COLORS[1] },
                { label: "Food & Drinks", value: breakdown.food, color: CATEGORY_COLORS[2] },
                { label: "Activities & Entry", value: breakdown.activities, color: CATEGORY_COLORS[3] },
                { label: "Miscellaneous", value: breakdown.misc, color: CATEGORY_COLORS[4] },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{item.label}</span>
                    <span className="font-semibold">₹{item.value.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.round((item.value / breakdown.total) * 100)}%`,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-border flex justify-between font-bold">
              <span>Grand Total</span>
              <span className="text-primary">₹{breakdown.total.toLocaleString("en-IN")}</span>
            </div>
          </div>

          {/* Bar chart */}
          <div className="glass rounded-2xl p-5 shadow-card">
            <div className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Budget Split</div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={chartData} margin={{ top: 4, right: 4, left: 4, bottom: 4 }}>
                <XAxis dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {chartData.map((_, i) => (
                    <Cell key={i} fill={CATEGORY_COLORS[i]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Tips */}
          <div className="glass rounded-2xl p-5 space-y-2">
            <div className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3">Budget Tips</div>
            {[
              "Book trains 60–90 days ahead on IRCTC for the best fares.",
              "Hostels & homestays save 50–70% over hotels.",
              "Street food is safe, delicious and costs ₹30–100/meal.",
              "State-run buses (KSRTC, MSRTC etc.) are far cheaper than private.",
              "Many heritage sites have free/discounted entry for Indian citizens.",
            ].map((tip, i) => (
              <div key={i} className="flex gap-2 text-sm text-muted-foreground">
                <span className="text-primary font-bold shrink-0">✦</span>
                {tip}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
