import type { NextConfig } from "next";

const isGithubPages = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  basePath: isGithubPages ? "/Watsof" : "",
  assetPrefix: isGithubPages ? "/Watsof/" : "",
};

export default nextConfig;