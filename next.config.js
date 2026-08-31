/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true,
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
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
