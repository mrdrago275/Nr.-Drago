"use client";
import React, { useEffect, useRef, useState } from "react";
import WallpaperCard from "./WallpaperCard";

type Wallpaper = {
  id: string;
  title: string;
  slug: string;
  category: string;
  variants: { quality: string; url: string }[];
  width: number;
  height: number;
  likes: number;
};

export default function Gallery() {
  const [items, setItems] = useState<Wallpaper[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    loadPage(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  async function loadPage(p: number) {
    setLoading(true);
    try {
      const res = await fetch(`/api/wallpapers?page=${p}&limit=8`);
      const json = await res.json();
      setItems((s) => [...s, ...json.results]);
      setHasMore(Boolean(json.hasMore));
    } catch (err) {
      console.error("Failed to load wallpapers", err);
    } finally {
      setLoading(false);
    }
  }

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (!observerRef.current) return;
    const el = observerRef.current;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !loading && hasMore) {
            setPage((p) => p + 1);
          }
        });
      },
      { root: null, rootMargin: "200px", threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [loading, hasMore]);

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-white">Wallpapers</h2>
        <div className="w-64">
          <input
            aria-label="Search wallpapers"
            placeholder="Search"
            className="w-full rounded-md bg-[#0b0b0b] border border-[rgba(255,255,255,0.04)] px-3 py-2 text-sm text-neutral-200"
          />
        </div>
      </div>

      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {items.map((w) => (
          <div key={w.id} className="break-inside-avoid">
            <WallpaperCard wallpaper={w} />
          </div>
        ))}
      </div>

      <div ref={observerRef} className="h-8" />

      {loading && <div className="mt-6 text-center text-neutral-400">Loading...</div>}
      {!hasMore && <div className="mt-6 text-center text-neutral-500">You reached the end.</div>}
    </section>
  );
}
