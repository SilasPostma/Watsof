import type { NextConfig } from "next";

// Served from the watsof.net custom domain root (see CNAME), so no basePath is needed.
const nextConfig: NextConfig = {
  output: "export",
};

export default nextConfig;