export async function loadParticles() {
  if (typeof window === "undefined") return;
  try {
    const ts = await import("tsparticles");
    const { tsParticles } = ts;
    tsParticles.load("particles", {
      fpsLimit: 60,
      particles: {
        number: { value: 14, density: { enable: true, area: 800 } },
        color: { value: "#E60023" },
        opacity: { value: 0.06 },
        size: { value: { min: 1, max: 3 } },
        move: { enable: true, speed: 0.4 },
        links: { enable: false }
      },
      detectRetina: true
    });
  } catch (err) {
    // fail silently - particles are decorative
    console.warn("Particles failed to load:", err);
  }
}
