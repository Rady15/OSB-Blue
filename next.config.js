/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "sabbar.com" },
      { protocol: "https", hostname: "sabbar-prod-uploaded-files.s3.eu-west-1.amazonaws.com" },
      { protocol: "https", hostname: "www.alsaqrlaw.com" },
      { protocol: "https", hostname: "sadanykhalifa.com" },
      { protocol: "https", hostname: "mega-consultations.com" },
      { protocol: "https", hostname: "mbridges-sa.com" },
      { protocol: "https", hostname: "tanfeth.sa" },
    ],
  },
};

module.exports = nextConfig;
