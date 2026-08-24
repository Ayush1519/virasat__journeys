import { Link } from "@tanstack/react-router";
import { Instagram, Twitter, Youtube, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-border/50">
      <div className="absolute inset-0 mandala-bg pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4 py-14">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center">
                <span className="text-ivory font-display font-bold">व</span>
              </div>
              <div>
                <div className="font-display font-bold text-lg text-gradient-hero">VIRASAT</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Heritage · विरासत
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              A living museum in your pocket — bringing India's timeless stories, flavors, and art to curious young minds.
            </p>
            <div className="flex gap-3 mt-5">
              {[Instagram, Twitter, Youtube, Mail].map((Icon, i) => (
                <button
                  key={i}
                  className="w-9 h-9 rounded-lg glass hover:gradient-saffron hover:text-ivory transition-all flex items-center justify-center"
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="font-semibold mb-3 text-sm">Discover</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/explore" className="hover:text-primary">Explore Sites</Link></li>
              <li><Link to="/map" className="hover:text-primary">Heritage Map</Link></li>
              <li><Link to="/travel-guide" className="hover:text-primary">Travel Guide</Link></li>
              <li><Link to="/quiz" className="hover:text-primary">Knowledge Quiz</Link></li>
              <li><Link to="/memories" className="hover:text-primary">My Memories</Link></li>
            </ul>
          </div>

          <div>
            <div className="font-semibold mb-3 text-sm">Company</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-primary">About</Link></li>
              <li><Link to="/help" className="hover:text-primary">Help & FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
              <li><span className="hover:text-primary cursor-pointer">Privacy Policy</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Virasat. Crafted with love for India's heritage.</p>
          <p>Made in 🇮🇳 with saffron, ink & memory.</p>
        </div>
      </div>
    </footer>
  );
}
