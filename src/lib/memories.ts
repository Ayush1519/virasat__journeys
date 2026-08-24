export type Memory = {
  id: string;
  siteId: string;
  siteName: string;
  title: string;
  description: string;
  date: string;
  image: string; // data URL
  createdAt: number;
};

const KEY = "virasat-memories";

export const getMemories = (): Memory[] => {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
};

export const saveMemory = (m: Omit<Memory, "id" | "createdAt">): Memory => {
  const memory: Memory = { ...m, id: crypto.randomUUID(), createdAt: Date.now() };
  const all = getMemories();
  all.unshift(memory);
  localStorage.setItem(KEY, JSON.stringify(all));
  return memory;
};

export const deleteMemory = (id: string) => {
  const all = getMemories().filter((m) => m.id !== id);
  localStorage.setItem(KEY, JSON.stringify(all));
};

export const fileToDataUrl = (file: File): Promise<string> =>
  new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result as string);
    r.onerror = rej;
    r.readAsDataURL(file);
  });
