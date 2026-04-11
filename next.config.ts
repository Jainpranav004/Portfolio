import type { NextConfig } from "next";
import { SITE_URL } from "./lib/constants";

const hostname = SITE_URL ? new URL(SITE_URL).hostname : "";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  async redirects() {
    if (!SITE_URL) {
      return [];
    }

    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: `www.${hostname}` }],
        destination: `${SITE_URL}/:path*`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
