import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: [
    '@teknovo-asset-studio/ui',
    '@teknovo-asset-studio/core',
    '@teknovo-asset-studio/asset-engine',
    '@teknovo-asset-studio/r2',
    '@teknovo-asset-studio/preview'
  ]
};

export default nextConfig;
