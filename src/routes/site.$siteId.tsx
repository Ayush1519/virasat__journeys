import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { getSite, sites } from "@/data/sites";
import { useState } from "react";
import { MapPin, Sparkles, Volume2, Pause, Heart, ArrowLeft, UtensilsCrossed, Shirt, Music2, Lightbulb, BookOpen } from "lucide-react";
import { speak, stopSpeak } from "@/lib/tts";

export const Route = createFileRoute("/site/$siteId")({
  head: ({ params }) => {
    const s = getSite(params.siteId);
    return {
      meta: [
        { title: s ? `${s.name} — Virasat` : "Heritage Site — Virasat" },
        { name: "description", content: s?.tagline ?? "Discover India's heritage." },
        { property: "og:title", content: s ? `${s.name} — Virasat` : "Virasat" },
        { property: "og:description", content: s?.tagline ?? "" },
        ...(s ? [{ property: "og:image", content: s.image } as const] : []),
      ],
    };
  },
  loader: ({ params }) => {
    const s = getSite(params.siteId);
    if (!s) throw notFound();
    return { site: s };
  },
  component: SitePage,
  notFoundComponent: () => (
    <Layout>
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="font-display text-4xl font-bold mb-4">Site not found</h1>
        <Link to="/explore" className="text-primary font-semibold">← Back to Explore</Link>
      </div>
    </Layout>
  ),
});

const tabs = [
  { id: "history", label: "History", icon: BookOpen },
  { id: "food", label: "Food", icon: UtensilsCrossed },
  { id: "clothing", label: "Clothing", icon: Shirt },
  { id: "music", label: "Music", icon: Music2 },
  { id: "facts", label: "Fun Facts", icon: Lightbulb },
] as const;

function SitePage() {
  const { site } = Route.useLoaderData() as { site: import("@/data/sites").HeritageSite };
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("history");
  const [kidsMode, setKidsMode] = useState(true);
  const [speaking, setSpeaking] = useState(false);
  const [playingMusic, setPlayingMusic] = useState<number | null>(null);

  const toggleSpeak = (text: string) => {
    if (speaking) { stopSpeak(); setSpeaking(false); return; }
    speak(text);
    setSpeaking(true);
    setTimeout(() => setSpeaking(false), text.length * 70);
  };

  const related = sites.filter((s) => s.id !== site.id).slice(0, 3);

  return (
    <Layout>
      {/* HERO */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden -mt-24">
        <img src={site.image} alt={site.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/60 to-secondary/20" />
        <div className="relative h-full mx-auto max-w-7xl px-4 flex flex-col justify-end pb-16 pt-32">
          <Link to="/explore" className="inline-flex items-center gap-1.5 text-ivory/80 hover:text-gold text-sm mb-6 w-fit">
            <ArrowLeft className="w-4 h-4" /> All sites
          </Link>
          <div className="flex flex-wrap gap-2 mb-4">
            {site.unesco && (
              <span className="glass rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider flex items-center gap-1 text-ivory">
                <Sparkles className="w-3 h-3 text-gold" /> UNESCO
              </span>
            )}
            <span className="glass rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider text-ivory">{site.category}</span>
            <span className="glass rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider text-ivory">{site.era}</span>
          </div>
          <h1 className="font-display font-bold text-5xl md:text-7xl text-ivory leading-none mb-3">{site.name}</h1>
          <p className="font-display italic text-2xl text-gold mb-4">{site.nameHi}</p>
          <div className="flex items-center gap-2 text-ivory/90 mb-3">
            <MapPin className="w-4 h-4" /> {site.location}
          </div>
          <p className="italic text-ivory/90 text-lg md:text-xl max-w-2xl font-light">"{site.tagline}"</p>
        </div>
      </section>

      {/* STICKY TAB NAV */}
      <div className="sticky top-24 z-40 mx-auto max-w-7xl px-4 -mt-6">
        <div className="glass rounded-2xl p-2 shadow-card flex gap-1 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                tab === t.id ? "gradient-hero text-ivory shadow-glow" : "hover:bg-primary/10"
              }`}
            >
              <t.icon className="w-4 h-4" />
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* HISTORY */}
        {tab === "history" && (
          <div className="grid lg:grid-cols-3 gap-8 animate-[fade-in_0.4s]">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => setKidsMode(true)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold ${kidsMode ? "gradient-saffron text-ivory" : "glass"}`}
                  >
                    👧 Kids
                  </button>
                  <button
                    onClick={() => setKidsMode(false)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold ${!kidsMode ? "gradient-hero text-ivory" : "glass"}`}
                  >
                    🎓 Detailed
                  </button>
                </div>
                <button
                  onClick={() => toggleSpeak(kidsMode ? site.historyKids : site.historyDetailed)}
                  className="glass px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-primary/10"
                >
                  {speaking ? <Pause className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  {speaking ? "Stop" : "Listen"}
                </button>
              </div>

              <div className="glass rounded-3xl p-8 shadow-card">
                <h2 className="font-display font-bold text-3xl mb-4 text-gradient-hero">The Story</h2>
                <p className="text-lg leading-relaxed text-foreground/90">
                  {kidsMode ? site.historyKids : site.historyDetailed}
                </p>
              </div>

              <div className="glass rounded-3xl p-8 shadow-card">
                <h3 className="font-display font-bold text-2xl mb-6">Timeline</h3>
                <div className="relative pl-6 space-y-5 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:gradient-hero">
                  {site.timeline.map((t, i) => (
                    <div key={i} className="relative animate-[slide-up_0.5s_ease-out]" style={{ animationDelay: `${i * 0.1}s` }}>
                      <div className="absolute -left-6 top-1.5 w-4 h-4 rounded-full gradient-saffron shadow-glow" />
                      <div className="font-display font-bold text-primary">{t.year}</div>
                      <div className="text-sm text-foreground/80">{t.event}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl gradient-royal p-8 text-ivory shadow-deep">
                <h3 className="font-display font-bold text-2xl mb-3">Cultural importance</h3>
                <p className="text-ivory/90 leading-relaxed">{site.culturalImportance}</p>
              </div>
            </div>

            <aside className="space-y-4">
              <div className="glass rounded-3xl p-6 shadow-card">
                <h4 className="font-display font-bold text-lg mb-3">Location</h4>
                <div className="aspect-video rounded-xl gradient-royal relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 mandala-bg opacity-20" />
                  <MapPin className="w-10 h-10 text-gold animate-[float_3s_ease-in-out_infinite]" />
                </div>
                <div className="mt-3 text-sm">
                  <div className="font-semibold">{site.state}</div>
                  <div className="text-muted-foreground text-xs">{site.coords.lat.toFixed(2)}°N, {site.coords.lng.toFixed(2)}°E</div>
                </div>
              </div>
              <Link
                to="/memories"
                className="block gradient-saffron text-ivory rounded-3xl p-6 shadow-glow hover-lift"
              >
                <Heart className="w-8 h-8 mb-2" />
                <div className="font-display font-bold text-xl mb-1">Save a memory</div>
                <div className="text-sm opacity-90">Been here? Add your photos & story.</div>
              </Link>
            </aside>
          </div>
        )}

        {/* FOOD */}
        {tab === "food" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 animate-[fade-in_0.4s]">
            {site.food.map((f, i) => (
              <div key={i} className="glass rounded-3xl p-6 shadow-card hover-lift">
                <div className="w-14 h-14 rounded-2xl gradient-saffron flex items-center justify-center text-2xl mb-4">🍛</div>
                <h3 className="font-display font-bold text-xl mb-2">{f.name}</h3>
                <p className="text-sm text-foreground/80 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        )}

        {/* CLOTHING */}
        {tab === "clothing" && (
          <div className="max-w-3xl mx-auto animate-[fade-in_0.4s]">
            <div className="glass rounded-3xl p-10 shadow-card">
              <div className="w-16 h-16 rounded-2xl gradient-royal flex items-center justify-center text-3xl mb-6 text-ivory">👗</div>
              <h3 className="font-display font-bold text-3xl mb-4 text-gradient-hero">{site.clothing.name}</h3>
              <p className="text-lg text-foreground/85 leading-relaxed">{site.clothing.desc}</p>
            </div>
          </div>
        )}

        {/* MUSIC */}
        {tab === "music" && (
          <div className="max-w-3xl mx-auto space-y-4 animate-[fade-in_0.4s]">
            {site.music.map((m, i) => (
              <div key={i} className="glass rounded-3xl p-6 shadow-card">
                <div className="flex items-center gap-5">
                  <button
                    onClick={() => setPlayingMusic(playingMusic === i ? null : i)}
                    className="w-14 h-14 rounded-full gradient-hero text-ivory flex items-center justify-center shadow-glow hover:scale-110 transition-transform flex-shrink-0"
                  >
                    {playingMusic === i ? <Pause className="w-5 h-5" /> : <Music2 className="w-5 h-5" />}
                  </button>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display font-bold text-lg">{m.title}</h4>
                    <p className="text-sm text-muted-foreground">{m.desc}</p>
                    <div className="mt-3 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className={`h-full gradient-saffron rounded-full transition-all duration-1000 ${playingMusic === i ? "w-full" : "w-0"}`} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <p className="text-xs text-center text-muted-foreground italic">Audio samples are simulated in this preview.</p>
          </div>
        )}

        {/* FACTS */}
        {tab === "facts" && (
          <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto animate-[fade-in_0.4s]">
            {site.funFacts.map((f, i) => (
              <div key={i} className="relative glass rounded-3xl p-6 shadow-card overflow-hidden">
                <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full gradient-saffron opacity-20 blur-2xl" />
                <div className="relative flex gap-4">
                  <div className="font-display font-bold text-5xl text-gradient-saffron leading-none">{i + 1}</div>
                  <p className="text-foreground/90 leading-relaxed pt-1">{f}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RELATED */}
      <section className="mx-auto max-w-7xl px-4 py-10">
        <h2 className="font-display font-bold text-3xl mb-6">Continue your journey</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {related.map((s) => (
            <Link
              key={s.id}
              to="/site/$siteId"
              params={{ siteId: s.id }}
              className="group flex gap-4 glass rounded-2xl p-4 shadow-soft hover-lift"
            >
              <img src={s.image} alt="" className="w-24 h-24 rounded-xl object-cover" />
              <div>
                <div className="text-xs text-muted-foreground">{s.location}</div>
                <div className="font-display font-bold text-lg group-hover:text-primary transition-colors">{s.name}</div>
                <div className="text-xs text-primary mt-2">Explore →</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}
