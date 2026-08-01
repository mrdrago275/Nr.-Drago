"use client";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { loadParticles } from "../lib/loadParticles";

const slides = [
  { src: "/assets/optimized/4k.avif", alt: "MR. DRAGO — crimson metallic dragon wallpaper" },
  { src: "/assets/optimized/2k.avif", alt: "MR. DRAGO — dark cinematic dragon art" }
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    loadParticles(); // lazy load particles after paint
  }, []);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 10000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 18;
        const y = (e.clientY / window.innerHeight - 0.5) * 10;
        setMouse({ x, y });
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const slide = useMemo(() => slides[index], [index]);

  return (
    <header className="relative h-screen min-h-[640px] overflow-hidden bg-black">
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          transform: `translate3d(${mouse.x}px, ${mouse.y}px, 0) scale(1.02)`
        }}
      >
        <Image
          src={slide.src}
          alt={slide.alt}
          fill
          priority
          sizes="(max-width: 640px) 100vw, 100vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.08), rgba(0,0,0,0.6))", mixBlendMode: "multiply" }}
        />
      </div>

      <div id="particles" className="absolute inset-0 pointer-events-none" />

      <nav className="absolute top-6 left-1/2 z-30 w-[92%] max-w-[1300px] -translate-x-1/2">
        <div className="backdrop-blur-md rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/assets/logo-metallic.svg" alt="MR. DRAGO" className="h-8 w-auto" />
            <ul className="hidden md:flex items-center gap-6 text-neutral-200">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="/gallery" className="hover:text-white">Categories</a></li>
              <li><a href="/trending" className="hover:text-white">Trending</a></li>
              <li><a href="/collections" className="hover:text-white">Collections</a></li>
              <li><a href="/about" className="hover:text-white">About</a></li>
              <li><a href="/contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div className="flex items-center gap-3">
            <a href="/login" className="text-neutral-200 hidden md:inline">Sign in</a>
            <button className="ml-2 rounded-md bg-[rgba(255,255,255,0.04)] px-3 py-2 text-neutral-100">Get Premium</button>
            <button className="md:hidden ml-2 p-2 rounded-lg border border-[rgba(255,255,255,0.04)]">☰</button>
          </div>
        </div>
      </nav>

      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-[clamp(32px,6vw,96px)] font-display text-white drop-shadow-[0_8px_40px_rgba(0,0,0,0.8)]">MR. DRAGO</h1>
        <p className="mt-4 text-lg md:text-xl text-neutral-200 max-w-xl">
          Discover Stunning AI Wallpapers in 4K & 8K Ultra HD.
        </p>
        <div className="mt-8 flex gap-4 items-center">
          <a href="/gallery" className="inline-flex items-center gap-3 rounded-[10px] bg-[#E60023] px-6 py-3 text-white font-semibold shadow-md" style={{ boxShadow: "0 10px 40px rgba(230,0,35,0.16)" }}>
            Explore Wallpapers
          </a>
          <a href="/collections/trending" className="inline-flex items-center gap-3 rounded-[10px] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] px-5 py-3 text-neutral-200">
            Trending Collection
          </a>
        </div>
        <div className="absolute bottom-8 text-sm text-neutral-300">Scroll to explore</div>
      </div>
    </header>
  );
}
