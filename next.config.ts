import type { NextConfig } from "next";

// Served from the watsof.net custom domain root (see CNAME), so no basePath is needed.
// trailingSlash ensures any future route exports as route/index.html rather than
// route.html, which resolves reliably on GitHub Pages for both /route and /route/.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
};

export default nextConfig;