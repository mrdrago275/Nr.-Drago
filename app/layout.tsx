import "./globals.css";
import Head from "next/head";

export const metadata = {
  title: "MR. DRAGO",
  description: "Discover Stunning AI Wallpapers in 4K & 8K Ultra HD."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head>
        {/* Preload likely LCP variant (4k). Adjust if you choose 8k */}
        <link rel="preload" as="image" href="/assets/optimized/4k.avif" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body>{children}</body>
    </html>
  );
}
