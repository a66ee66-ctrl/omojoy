"use client";

import { useSyncExternalStore } from "react";

import { isLookSlug } from "@/content/portfolio";

/**
 * A visitor's saved looks, kept in localStorage so they persist between visits
 * and stay in sync across tabs. No account or server storage is involved.
 */
const KEY = "ja-moodboard";
const EMPTY: string[] = [];
const listeners = new Set<() => void>();
let cache: string[] | null = null;

function read(): string[] {
  if (cache) return cache;
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    cache = Array.isArray(parsed) ? parsed.filter((s): s is string => typeof s === "string" && isLookSlug(s)) : [];
  } catch {
    cache = [];
  }
  return cache;
}

function write(next: string[]) {
  cache = [...new Set(next)].filter(isLookSlug).slice(0, 60);
  try {
    localStorage.setItem(KEY, JSON.stringify(cache));
  } catch {
    // Storage may be unavailable (private mode); keep the in-memory copy.
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key !== KEY) return;
    cache = null;
    listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export const moodboard = {
  toggle: (slug: string) => {
    const current = read();
    write(current.includes(slug) ? current.filter((s) => s !== slug) : [slug, ...current]);
  },
  add: (slugs: string[]) => write([...slugs, ...read()]),
  remove: (slug: string) => write(read().filter((s) => s !== slug)),
  clear: () => write([]),
};

export function useMoodboard() {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}
