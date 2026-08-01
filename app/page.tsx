import Hero from "../components/Hero";
import Footer from "../components/Footer";

export default function Page() {
  return (
    <main>
      <Hero />
      {/* Placeholder: add below-the-fold sections (featured, trending, gallery preview) */}
      <section className="bg-[#000] py-20 text-center text-neutral-300">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white">Featured Collections</h2>
          <p className="mt-4">Curated premium AI wallpapers. Explore collections and subscribe for high-resolution downloads.</p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
