import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useState } from "react";
import { Mail, Send, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Virasat" },
      { name: "description", content: "Get in touch with the Virasat team." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { toast.error("Please fill all fields"); return; }
    setSending(true);
    setTimeout(() => {
      toast.success("Thank you! We'll reply within 48 hours.");
      setForm({ name: "", email: "", message: "" });
      setSending(false);
    }, 900);
  };

  return (
    <Layout>
      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="text-center mb-10">
          <div className="text-xs uppercase tracking-[0.3em] text-primary font-semibold mb-3">Contact</div>
          <h1 className="font-display font-bold text-5xl md:text-6xl text-gradient-hero">Let's talk heritage</h1>
        </div>

        <div className="grid md:grid-cols-5 gap-6">
          <div className="md:col-span-2 space-y-3">
            {[
              { icon: Mail, label: "Email", value: "hello@virasat.app" },
              { icon: Phone, label: "Phone", value: "+91 98765 43210" },
              { icon: MapPin, label: "Studio", value: "Bengaluru, India" },
            ].map((c) => (
              <div key={c.label} className="glass rounded-2xl p-5 shadow-soft flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl gradient-saffron flex items-center justify-center flex-shrink-0">
                  <c.icon className="w-5 h-5 text-ivory" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{c.label}</div>
                  <div className="font-semibold">{c.value}</div>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={submit} className="md:col-span-3 glass rounded-3xl p-8 shadow-card space-y-4">
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Your name</span>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full mt-2 px-4 py-3 rounded-xl bg-background/70 border border-border outline-none focus:border-primary transition-colors" />
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</span>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full mt-2 px-4 py-3 rounded-xl bg-background/70 border border-border outline-none focus:border-primary transition-colors" />
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Message</span>
              <textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full mt-2 px-4 py-3 rounded-xl bg-background/70 border border-border outline-none focus:border-primary transition-colors resize-none" />
            </label>
            <button disabled={sending} type="submit" className="w-full gradient-hero text-ivory font-bold py-4 rounded-2xl shadow-glow hover:scale-[1.02] transition-transform inline-flex items-center justify-center gap-2 disabled:opacity-60">
              {sending ? "Sending..." : <><Send className="w-4 h-4" /> Send message</>}
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
}
