// Dev stub: returns a short-lived URL to a static optimized asset.
// Replace with real signed URL logic for production (S3/Cloudinary etc).
export default function handler(req, res) {
  const { id } = req.query;
  // Validate id & auth in production
  const { res: quality } = req.query; // use ?res=4k or 8k
  const prefer = req.query.res || "4k";
  // Map to our sample optimized files (dev)
  const map = {
    "8k": "/assets/optimized/8k.avif",
    "4k": "/assets/optimized/4k.avif",
    "2k": "/assets/optimized/2k.avif"
  };
  const file = map[prefer] || map["4k"];
  // In production, generate signed URL with short expiry.
  const signedUrl = `${process.env.BASE_URL || ""}${file}`;
  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({ signedUrl, expiresIn: 60 });
}
