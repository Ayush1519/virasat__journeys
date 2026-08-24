import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { SiteCard } from "@/components/SiteCard";
import { sites } from "@/data/sites";
import { Search, Sparkles, BookOpen, Music2, Shirt, Landmark, UtensilsCrossed } from "lucide-react";
import { useState } from "react";
import heroImg from "@/assets/site-amber.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const categories = [
  { icon: Landmark, label: "Monuments", color: "from-saffron to-saffron-deep" },
  { icon: UtensilsCrossed, label: "Food", color: "from-gold to-saffron" },
  { icon: Shirt, label: "Clothing", color: "from-indigo-royal to-saffron-deep" },
  { icon: Music2, label: "Music", color: "from-saffron to-indigo-royal" },
];

function Index() {
  const [q, setQ] = useState("");
  const filtered = q
    ? sites.filter((s) => s.name.toLowerCase().includes(q.toLowerCase()) || s.state.toLowerCase().includes(q.toLowerCase()))
    : sites;

  return (
    <Layout>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={heroImg} alt="" className="w-full h-full object-cover" width={1920} height={1280} />
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/80 via-secondary/60 to-saffron/40" />
          <div className="absolute inset-0 mandala-bg opacity-10" />
        </div>

        <div className="mx-auto max-w-7xl px-4 py-20 md:py-32 min-h-[85vh] flex flex-col justify-center">
          <div className="max-w-3xl animate-[slide-up_0.8s_ease-out]">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-wider text-ivory">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              India's heritage, for curious young minds
            </div>
            <h1 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl leading-[0.95] text-ivory mb-6">
              Explore India's
              <br />
              <span className="shimmer-text italic">Heritage</span>
              <br />
              in a fun way.
            </h1>
            <p className="text-lg md:text-xl text-ivory/80 max-w-xl leading-relaxed mb-8 font-light">
              Step into palaces, temples and forts. Hear the music, taste the stories, and save your own memories of the journey.
            </p>

            {/* Search */}
            <div className="relative max-w-xl">
              <div className="absolute inset-0 rounded-2xl gradient-saffron blur-xl opacity-50 -z-10" />
              <div className="glass rounded-2xl p-2 flex items-center gap-2 shadow-deep">
                <Search className="w-5 h-5 ml-3 text-muted-foreground" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search Taj Mahal, Hampi, Rajasthan..."
                  className="flex-1 bg-transparent py-3 outline-none text-foreground placeholder:text-muted-foreground text-sm"
                />
                <Link
                  to="/explore"
                  className="gradient-hero text-ivory font-semibold text-sm px-5 py-3 rounded-xl hover:scale-105 transition-transform"
                >
                  Explore
                </Link>
              </div>
              {q && (
                <div className="absolute top-full left-0 right-0 mt-2 glass rounded-2xl p-2 shadow-deep max-h-80 overflow-auto z-10">
                  {filtered.slice(0, 5).map((s) => (
                    <Link
                      key={s.id}
                      to="/site/$siteId"
                      params={{ siteId: s.id }}
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-primary/10"
                    >
                      <img src={s.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                      <div>
                        <div className="font-semibold text-sm">{s.name}</div>
                        <div className="text-xs text-muted-foreground">{s.location}</div>
                      </div>
                    </Link>
                  ))}
                  {filtered.length === 0 && (
                    <div className="p-4 text-sm text-muted-foreground">No sites found.</div>
                  )}
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-6 mt-10 text-ivory/90">
              {[
                { n: "5+", l: "Heritage sites" },
                { n: "20+", l: "Stories" },
                { n: "∞", l: "Memories" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display font-bold text-3xl text-gold">{s.n}</div>
                  <div className="text-xs uppercase tracking-wider opacity-80">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="text-center mb-12">
          <div className="text-xs uppercase tracking-[0.3em] text-primary font-semibold mb-3">Discover by theme</div>
          <h2 className="font-display font-bold text-4xl md:text-5xl">What calls to you?</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((c, i) => (
            <Link
              key={c.label}
              to="/explore"
              className="group relative overflow-hidden rounded-3xl aspect-square hover-lift"
              style={{ animation: `slide-up 0.5s ease-out ${i * 0.1}s both` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${c.color}`} />
              <div className="absolute inset-0 mandala-bg opacity-20" />
              <div className="relative h-full flex flex-col items-center justify-center p-6 text-ivory">
                <c.icon className="w-10 h-10 mb-3 opacity-90 group-hover:scale-110 transition-transform duration-500" />
                <div className="font-display font-bold text-xl">{c.label}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED SITES */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex items-end justify-between mb-10 gap-6 flex-wrap">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-primary font-semibold mb-3">Featured sites</div>
            <h2 className="font-display font-bold text-4xl md:text-5xl max-w-xl">Five stories carved in stone and song</h2>
          </div>
          <Link to="/explore" className="text-sm font-semibold text-primary hover:gap-2 inline-flex items-center gap-1 transition-all">
            View all sites →
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {sites.map((s) => <SiteCard key={s.id} site={s} />)}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="relative overflow-hidden rounded-[2rem] gradient-royal p-10 md:p-16 shadow-deep">
          <div className="absolute inset-0 mandala-bg opacity-10" />
          <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-saffron/30 blur-3xl" />
          <div className="relative flex flex-col md:flex-row md:items-center gap-8 justify-between">
            <div className="max-w-2xl">
              <BookOpen className="w-10 h-10 text-gold mb-4" />
              <h2 className="font-display font-bold text-4xl md:text-5xl text-ivory mb-4 leading-tight">
                Test your heritage knowledge
              </h2>
              <p className="text-ivory/80 text-lg font-light">Take a fun quiz, earn badges, and become a Virasat Explorer.</p>
            </div>
            <Link
              to="/quiz"
              className="inline-flex items-center gap-2 gradient-saffron text-ivory font-bold px-8 py-4 rounded-2xl shadow-glow hover:scale-105 transition-transform"
            >
              Start the Quiz
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
