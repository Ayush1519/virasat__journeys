import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Help & FAQ — Virasat" },
      { name: "description", content: "Frequently asked questions and guides for using Virasat." },
    ],
  }),
  component: Help,
});

const faqs = [
  { q: "Do I need an account to save memories?", a: "No — Virasat works without any login. Your memories are saved privately on your device." },
  { q: "Can I use Virasat in my language?", a: "Yes. We support English and Hindi today, with more languages coming soon via our dynamic translation layer." },
  { q: "How do I listen to a story?", a: "Every heritage page has a 'Listen' button that reads the story aloud using your device's voice." },
  { q: "Are the music samples real?", a: "In this preview, music playback is visual. Full audio libraries for each site arrive in the next release." },
  { q: "How do I delete a memory?", a: "Go to 'My Memories', hover a card and click the trash icon, or open it and choose Delete." },
  { q: "Can I share a memory?", a: "Sharing as an image or link is coming in the next version — your memories stay private until then." },
];

function Help() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Layout>
      <section className="mx-auto max-w-3xl px-4 py-12">
        <div className="text-center mb-10">
          <div className="text-xs uppercase tracking-[0.3em] text-primary font-semibold mb-3">Help Center</div>
          <h1 className="font-display font-bold text-5xl md:text-6xl text-gradient-hero">How can we help?</h1>
        </div>

        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="glass rounded-2xl shadow-soft overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-display font-semibold text-lg">{f.q}</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && (
                <div className="px-5 pb-5 text-foreground/80 leading-relaxed animate-[fade-in_0.3s]">{f.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
