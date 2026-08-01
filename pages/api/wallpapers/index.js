// Dev API: returns paginated wallpaper list. Uses the uploaded background asset as sample data.
export default function handler(req, res) {
  const page = parseInt(req.query.page || "1", 10);
  const limit = parseInt(req.query.limit || "8", 10);

  // Create seeded items
  const total = 24;
  const start = (page - 1) * limit;
  const end = Math.min(start + limit, total);

  const results = [];
  for (let i = start; i < end; i++) {
    const id = `wallpaper-${i + 1}`;
    results.push({
      id,
      title: `Crimson Dragon ${i + 1}`,
      slug: `crimson-dragon-${i + 1}`,
      category: "Dragon",
      width: 7680,
      height: 4320,
      likes: Math.floor(Math.random() * 5000),
      variants: [
        { quality: "8k", url: "/assets/optimized/8k.avif" },
        { quality: "4k", url: "/assets/optimized/4k.avif" },
        { quality: "2k", url: "/assets/optimized/2k.avif" }
      ]
    });
  }

  const hasMore = end < total;

  res.status(200).json({ results, page, limit, hasMore });
}
