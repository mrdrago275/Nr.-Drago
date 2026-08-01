export default function Footer() {
  return (
    <footer className="bg-[#050505] text-neutral-400 py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src="/assets/logo-metallic.svg" alt="MR. DRAGO" className="h-8" />
          <span className="text-white font-semibold">MR. DRAGO</span>
        </div>
        <nav className="flex gap-4">
          <a href="/privacy" className="hover:text-white">Privacy</a>
          <a href="/terms" className="hover:text-white">Terms</a>
          <a href="/contact" className="hover:text-white">Contact</a>
        </nav>
        <div className="text-sm">© {new Date().getFullYear()} MR. DRAGO. All rights reserved.</div>
      </div>
    </footer>
  );
}
