import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/barnsanger",
        destination: "/barnvisor",
        permanent: true,
      },
      {
        source: "/sockerbagaren",
        destination: "/en-sockerbagare",
        permanent: true,
      },
      {
        source: "/du-kara-lille-snickerbo",
        destination: "/du-kare-lille-snickerbo",
        permanent: true,
      },
      {
        source: "/appelmelodi",
        destination: "/appelmelodin",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
