/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['images.unsplash.com'],
    },
    experimental: {
        optimizePackageImports: ['lucide-react', 'framer-motion', 'posthog-js'],
    },
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
    },
}

export default nextConfig
