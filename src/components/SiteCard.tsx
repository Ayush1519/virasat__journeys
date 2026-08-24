import { Link } from "@tanstack/react-router";
import { MapPin, Sparkles } from "lucide-react";
import type { HeritageSite } from "@/data/sites";

export function SiteCard({ site, featured = false }: { site: HeritageSite; featured?: boolean }) {
  return (
    <Link
      to="/site/$siteId"
      params={{ siteId: site.id }}
      className={`group relative block overflow-hidden rounded-3xl hover-lift shadow-card ${
        featured ? "md:col-span-2 md:row-span-2" : ""
      }`}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={site.image}
          alt={site.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/95 via-secondary/30 to-transparent" />

        {site.unesco && (
          <div className="absolute top-4 left-4 glass rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-primary" />
            UNESCO
          </div>
        )}
        <div className="absolute top-4 right-4 glass rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
          {site.category}
        </div>

        <div className="absolute inset-x-0 bottom-0 p-5 text-ivory">
          <div className="flex items-center gap-1.5 text-xs opacity-80 mb-1.5">
            <MapPin className="w-3.5 h-3.5" />
            {site.location}
          </div>
          <h3 className="font-display font-bold text-2xl leading-tight mb-1">{site.name}</h3>
          <p className="text-xs opacity-75 mb-2">{site.nameHi} · {site.era}</p>
          <p className="text-sm opacity-90 line-clamp-2 italic font-light">"{site.tagline}"</p>
          <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-gold group-hover:gap-2 transition-all">
            Discover the story
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
