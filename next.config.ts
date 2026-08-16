import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages deployment
  output: "export",
  
  // Use relative paths for GitHub Pages compatibility
  basePath: process.env.NODE_ENV === 'production' ? '/DemoSciCMP' : '',
  
  assetPrefix: process.env.NODE_ENV === 'production' ? '/DemoSciCMP/' : '',
  
  // TypeScript settings
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // React strict mode disabled for preview
  reactStrictMode: false,
  
  // Images configuration for static export
  images: {
    unoptimized: true, // Required for static export
  },
  
  // Trailing slash for GitHub Pages compatibility
  trailingSlash: true,
};

export default nextConfig;
