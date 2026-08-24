import { useCallback, useEffect, useState } from "react";

export type ReelComment = { id: string; name: string; text: string; at: number };

type Social = {
  likes: string[];
  saves: string[];
  comments: Record<string, ReelComment[]>;
};

const KEY = "virasat-social";
const TRIP_KEY = "virasat-trips";

const empty: Social = { likes: [], saves: [], comments: {} };

const read = (): Social => {
  if (typeof window === "undefined") return empty;
  try {
    return { ...empty, ...JSON.parse(localStorage.getItem(KEY) || "{}") };
  } catch {
    return empty;
  }
};

const write = (s: Social) => {
  localStorage.setItem(KEY, JSON.stringify(s));
  window.dispatchEvent(new Event("virasat-social"));
};

export function useSocial() {
  const [state, setState] = useState<Social>(empty);

  useEffect(() => {
    const sync = () => setState(read());
    sync();
    window.addEventListener("virasat-social", sync);
    return () => window.removeEventListener("virasat-social", sync);
  }, []);

  const toggleLike = useCallback((id: string) => {
    const s = read();
    s.likes = s.likes.includes(id) ? s.likes.filter((x) => x !== id) : [...s.likes, id];
    write(s);
  }, []);

  const toggleSave = useCallback((id: string) => {
    const s = read();
    s.saves = s.saves.includes(id) ? s.saves.filter((x) => x !== id) : [...s.saves, id];
    write(s);
  }, []);

  const addComment = useCallback((id: string, name: string, text: string) => {
    const s = read();
    const list = s.comments[id] ?? [];
    s.comments[id] = [
      { id: crypto.randomUUID(), name: name || "Traveller", text, at: Date.now() },
      ...list,
    ];
    write(s);
  }, []);

  return { ...state, toggleLike, toggleSave, addComment };
}

export type SavedTrip = {
  id: string;
  title: string;
  startDate: string;
  days: number;
  budget: number;
  travellers: number;
  interests: string[];
  stops: string[];
  createdAt: number;
};

export const getTrips = (): SavedTrip[] => {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(TRIP_KEY) || "[]");
  } catch {
    return [];
  }
};

export const saveTrip = (t: Omit<SavedTrip, "id" | "createdAt">): SavedTrip => {
  const trip: SavedTrip = { ...t, id: crypto.randomUUID(), createdAt: Date.now() };
  const all = [trip, ...getTrips()];
  localStorage.setItem(TRIP_KEY, JSON.stringify(all));
  return trip;
};

export const deleteTrip = (id: string) => {
  localStorage.setItem(TRIP_KEY, JSON.stringify(getTrips().filter((t) => t.id !== id)));
};

export const inr = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;
