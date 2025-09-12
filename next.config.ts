import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimisations pour réduire les Fast Refresh
  experimental: {
    optimizePackageImports: ['@apollo/client', 'next-auth'],
  },
  webpack: (config, { isServer }) => {
    // Ignorer les modules RxJS internes qui causent des 404
    config.resolve.fallback = {
      ...config.resolve.fallback,
      "rxjs": false,
      "rxjs/operators": false,
    };
    
    return config;
  },
};

export default nextConfig;
