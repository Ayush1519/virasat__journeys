import { Link } from "@tanstack/react-router";
import { Reel } from "@/data/reels";
import { Heart, MessageCircle, Share2, Bookmark, MapPin } from "lucide-react";

export function ReelCard({ r }: { r: Reel }) {
  return (
    <div className="w-full max-w-md mx-auto rounded-2xl overflow-hidden shadow-card glass text-foreground">
      <div className="relative aspect-[9/16] overflow-hidden bg-black">
        <img src={r.image} alt={r.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
        
        {/* Creator & music badge */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs text-white/90">
          <span className="font-semibold">{r.creator}</span>
          <span className="glass rounded-full px-2 py-0.5 text-[10px]">{r.category}</span>
        </div>

        {/* Caption & info overlay */}
        <div className="absolute bottom-4 left-4 right-4 text-white space-y-2">
          <div className="font-display font-bold text-lg leading-tight">{r.title}</div>
          <p className="text-xs text-white/80 line-clamp-2">{r.caption}</p>
          <div className="text-[11px] text-white/70 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-primary" /> {r.city}, {r.state}
          </div>
          <div className="text-[10px] text-white/60 italic">🎵 {r.music}</div>
        </div>
      </div>

      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <button className="flex items-center gap-1.5 hover:text-primary transition-colors">
              <Heart className="w-4 h-4" /> {r.likes.toLocaleString("en-IN")}
            </button>
            <button className="flex items-center gap-1.5 hover:text-primary transition-colors">
              <MessageCircle className="w-4 h-4" /> {r.comments}
            </button>
            <button className="flex items-center gap-1.5 hover:text-primary transition-colors">
              <Share2 className="w-4 h-4" /> {r.shares}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button className="glass rounded-lg p-2 hover:text-primary">
              <Bookmark className="w-4 h-4" />
            </button>
            <Link
              to="/site/$siteId"
              params={{ siteId: r.destinationId }}
              className="inline-flex items-center gap-1 rounded-xl px-3 py-1.5 gradient-hero text-ivory text-xs font-semibold shadow-glow"
            >
              Explore Place →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
