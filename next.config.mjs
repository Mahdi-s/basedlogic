/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
     },
     transpilePackages: ['next-auth'],
};

export default nextConfig;
