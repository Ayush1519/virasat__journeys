import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Heart, BookOpen, Globe, Sparkles } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Virasat" },
      { name: "description", content: "Virasat's mission: making India's heritage accessible, beautiful, and meaningful for young minds." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <Layout>
      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="text-center mb-12">
          <div className="text-xs uppercase tracking-[0.3em] text-primary font-semibold mb-3">Our Mission</div>
          <h1 className="font-display font-bold text-5xl md:text-6xl text-gradient-hero mb-6">Why Virasat?</h1>
          <p className="text-xl text-foreground/80 leading-relaxed font-light max-w-2xl mx-auto">
            Virasat (विरासत) means <em>heritage</em>. We believe every child deserves to grow up feeling rooted — to know the stories behind the stones, the songs behind the silences.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 mb-12">
          {[
            { icon: BookOpen, title: "Stories that stick", desc: "Timelines, tales and trivia — crafted for curious minds of every age." },
            { icon: Heart, title: "Memories that matter", desc: "Save your own visit photos and stories, no account needed." },
            { icon: Globe, title: "Multilingual by design", desc: "English, Hindi and more — heritage should speak your language." },
            { icon: Sparkles, title: "Immersive by default", desc: "Voice narration, music, and 3D — experience, don't just read." },
          ].map((f) => (
            <div key={f.title} className="glass rounded-3xl p-6 shadow-card hover-lift">
              <div className="w-12 h-12 rounded-2xl gradient-saffron flex items-center justify-center mb-4">
                <f.icon className="w-6 h-6 text-ivory" />
              </div>
              <h3 className="font-display font-bold text-xl mb-2">{f.title}</h3>
              <p className="text-sm text-foreground/80">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="gradient-royal rounded-3xl p-10 text-ivory shadow-deep text-center relative overflow-hidden">
          <div className="absolute inset-0 mandala-bg opacity-10" />
          <div className="relative">
            <h2 className="font-display font-bold text-3xl mb-3">For every curious wanderer</h2>
            <p className="text-ivory/85 max-w-xl mx-auto">Built with love by a team that believes India's greatest wealth is its memory — and that memory belongs to everyone.</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
