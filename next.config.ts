import type { NextConfig } from "next";

// Served from the watsof.net custom domain root (see CNAME), so no basePath is needed.
// trailingSlash ensures multi-page routes export as e.g. work/index.html rather than
// work.html, which resolves reliably on GitHub Pages for both /work and /work/.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
};

export default nextConfig;