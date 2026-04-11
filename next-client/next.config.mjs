/** @type {import('next').NextConfig} */
function apiOriginForCsp() {
  const raw = process.env.NEXT_PUBLIC_API_URL
  if (!raw) return ""
  try {
    return new URL(raw).origin
  } catch {
    return ""
  }
}

const connectSrcExtra = [
  "http://localhost:5000",
  "https://emmasdale-render-production.onrender.com",
  "https://emmasdale-backend.onrender.com",
  apiOriginForCsp(),
].filter(Boolean)

const connectSrc = ["'self'", ...new Set(connectSrcExtra)].join(" ")

const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline';
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    font-src 'self' https://fonts.gstatic.com;
    img-src 'self' blob: data: https://res.cloudinary.com https://www.adventist.org https://images.unsplash.com;
    connect-src ${connectSrc};
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-src 'self' https://www.google.com https://maps.google.com;
    frame-ancestors 'none';
    upgrade-insecure-requests;
`

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'www.adventist.org',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\n/g, ''),
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ]
  },
};

export default nextConfig;
