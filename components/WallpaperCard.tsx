"use client";
import Image from "next/image";
import React, { useState } from "react";
import useFavorites from "../hooks/useFavorites";
import PreviewModal from "./PreviewModal";

export default function WallpaperCard({ wallpaper }: { wallpaper: any }) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const [previewOpen, setPreviewOpen] = useState(false);

  const src = wallpaper.variants?.[0]?.url || "/assets/optimized/4k.avif";

  return (
    <div className="relative group rounded-xl overflow-hidden bg-[#070707] border border-[rgba(255,255,255,0.02)]">
      <div className="relative w-full aspect-[3/4]">
        <Image src={src} alt={wallpaper.title} fill style={{ objectFit: "cover" }} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
          <div className="flex items-center justify-between">
            <div className="text-sm text-white font-semibold">{wallpaper.title}</div>
            <div className="flex items-center gap-2">
              <button
                aria-label="Like"
                className={`p-2 rounded-md ${isFavorite(wallpaper.id) ? "bg-[#E60023] text-white" : "bg-white/6 text-white"}`}
                onClick={() => toggleFavorite(wallpaper.id)}
              >
                ♥
              </button>
              <button
                aria-label="Preview"
                className="p-2 rounded-md bg-white/6 text-white"
                onClick={() => setPreviewOpen(true)}
              >
                Preview
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* subtle transform on hover */}
      <style jsx>{`
        .group:hover img { transform: scale(1.03); }
      `}</style>

      {previewOpen && (
        <PreviewModal wallpaper={wallpaper} onClose={() => setPreviewOpen(false)} />
      )}
    </div>
  );
}
