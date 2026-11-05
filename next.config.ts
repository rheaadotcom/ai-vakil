import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Explicitly set the root for output file tracing to avoid workspace‑root confusion
  outputFileTracingRoot: path.join(__dirname),
  serverExternalPackages: [
    "pdf-parse",
    "pdfjs-dist",
    "@napi-rs/canvas",
    "mammoth",
    "yauzl",
  ],
  cacheMaxMemorySize: 50 * 1024 * 1024,
};

export default nextConfig;
