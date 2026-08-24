import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Globe } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/explore", label: "Explore" },
  { to: "/map", label: "Map" },
  { to: "/reels", label: "Shorts" },
  { to: "/travel-guide", label: "Travel Guide" },
  { to: "/quiz", label: "Quiz" },
  { to: "/memories", label: "Memories" },
  { to: "/about", label: "About" },
  { to: "/help", label: "Help" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<"EN" | "HI">("EN");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4">
        <nav
          className={`glass rounded-2xl px-5 py-3 flex items-center justify-between shadow-soft transition-all ${
            scrolled ? "shadow-card" : ""
          }`}
        >
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative w-10 h-10 rounded-xl gradient-hero flex items-center justify-center shadow-glow">
              <span className="text-ivory font-display font-bold text-lg">व</span>
            </div>
            <div className="leading-tight">
              <div className="font-display font-bold text-lg tracking-tight text-gradient-hero">
                VIRASAT
              </div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Heritage · विरासत
              </div>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                activeProps={{
                  className:
                    "text-foreground bg-primary/10 font-semibold",
                }}
                inactiveProps={{ className: "text-muted-foreground hover:text-foreground" }}
                className="px-3 py-2 rounded-lg text-sm transition-colors hover:bg-primary/5"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang(lang === "EN" ? "HI" : "EN")}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-secondary/10 hover:bg-secondary/20 text-secondary transition-colors"
              aria-label="Switch language"
            >
              <Globe className="w-3.5 h-3.5" />
              {lang}
            </button>
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-primary/10"
              onClick={() => setOpen(!open)}
              aria-label="Menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {open && (
          <div className="lg:hidden mt-2 glass rounded-2xl p-4 shadow-card animate-[fade-in_0.3s_ease-out]">
            <div className="grid grid-cols-2 gap-2">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm hover:bg-primary/10"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
