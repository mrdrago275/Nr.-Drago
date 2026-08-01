# MR. DRAGO — Starter Scaffold

This is a production-ready starter for the MR. DRAGO premium wallpaper site (Next.js + Tailwind + Framer Motion).

Quick start:
1. Copy this project into a new git repo.
2. Put your wallpaper (Image 1) at: `public/assets/background1.jpg`
3. Install:
   npm install
4. Generate optimized images (requires sharp):
   npm run optimize:images
   (Creates optimized AVIF/WebP in public/assets/optimized/)
5. Dev:
   npm run dev
6. Build:
   npm run build && npm start

Notes:
- The API endpoint `pages/api/wallpapers/[id]/download.js` is a development stub returning a static URL. Replace with signed URL logic (S3, Cloudinary) in production.
- Preload LCP image is configured in `app/layout.tsx`. Make sure `/public/assets/optimized/4k.avif` exists or adjust.
- Check image licensing before offering downloads.
- Deploy to Vercel for best integration with Next.js. Add environment variable BASE_URL (optional) for API URLs.

Recommended next steps:
- Implement Gallery (masonry) + filters + Algolia/Meilisearch integration.
- Implement authentication (NextAuth or Supabase).
- Implement payments/subscriptions with Stripe if offering premium downloads.
- Replace stubbed API with secure signed URLs for downloads.
- Run Lighthouse CI and tune bundle size and caching.

If you want, I can:
- Push this scaffold to a GitHub repo (you must provide owner/repo and confirm).
- Or generate a zip for download here.
- Or continue and add the Gallery, WallpaperCard, PreviewModal, and download progress components next.
