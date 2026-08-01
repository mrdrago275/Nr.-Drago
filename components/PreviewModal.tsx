"use client";
import Image from "next/image";
import React, { useState } from "react";

export default function PreviewModal({ wallpaper, onClose }: { wallpaper: any; onClose: () => void }) {
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selected, setSelected] = useState("4k");

  const best = wallpaper.variants?.find((v: any) => v.quality === selected) || wallpaper.variants?.[0];

  async function handleDownload() {
    try {
      setDownloading(true);
      const res = await fetch(`/api/wallpapers/${wallpaper.id}/download?res=${selected}`);
      const json = await res.json();
      const url = json.signedUrl;
      // Download with progress using XHR
      await downloadWithProgress(url, (p) => setProgress(p));
    } catch (err) {
      console.error(err);
      alert("Download failed");
    } finally {
      setDownloading(false);
    }
  }

  function downloadWithProgress(url: string, onProgress: (p: number) => void) {
    return new Promise<void>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.responseType = "blob";
      xhr.onprogress = (e) => {
        if (e.lengthComputable) {
          onProgress(Math.round((e.loaded / e.total) * 100));
        }
      };
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          const blob = xhr.response;
          const a = document.createElement("a");
          const objectUrl = URL.createObjectURL(blob);
          a.href = objectUrl;
          a.download = `${wallpaper.slug || wallpaper.id}.avif`;
          document.body.appendChild(a);
          a.click();
          a.remove();
          URL.revokeObjectURL(objectUrl);
          onProgress(100);
          resolve();
        } else {
          reject(new Error(`Download failed: ${xhr.status}`));
        }
      };
      xhr.onerror = () => reject(new Error("Network error"));
      xhr.send();
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="relative w-[90vw] max-w-5xl max-h-[90vh] rounded-xl overflow-hidden bg-[#070707]">
        <button onClick={onClose} className="absolute right-3 top-3 z-40 rounded-md bg-white/6 px-3 py-1">Close</button>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-2 relative h-[60vh] bg-black">
            <Image src={best?.url || "/assets/optimized/4k.avif"} alt={wallpaper.title} fill style={{ objectFit: "contain" }} />
          </div>
          <div className="p-4 flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-white">{wallpaper.title}</h3>
            <div className="text-sm text-neutral-300">Category: {wallpaper.category}</div>
            <div className="mt-2">
              <div className="text-sm text-neutral-300 mb-2">Resolution</div>
              <div className="flex gap-2">
                {wallpaper.variants?.map((v: any) => (
                  <button
                    key={v.quality}
                    onClick={() => setSelected(v.quality)}
                    className={`px-3 py-2 rounded-md border ${selected === v.quality ? "border-[#E60023]" : "border-[rgba(255,255,255,0.04)]"}`}
                  >
                    {v.quality.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <button
                disabled={downloading}
                onClick={handleDownload}
                className="bg-[#E60023] px-4 py-2 rounded-md text-white font-semibold"
              >
                {downloading ? `Downloading ${progress}%` : "Download"}
              </button>
              {downloading && (
                <div className="w-full bg-white/6 rounded mt-2 h-2">
                  <div style={{ width: `${progress}%` }} className="h-2 bg-[#E60023] rounded" />
                </div>
              )}
            </div>

            <div className="mt-auto text-sm text-neutral-400">High quality 4K & 8K downloads — secure & fast.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
