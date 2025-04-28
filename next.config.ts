import { NextConfig } from "next";

/**
 * @type {import('next').NextConfig}
 */
const nextConfig: NextConfig = {
    experimental:{
        turbo: {
            rules: {
                '*.svg': {
                  loaders: ['@svgr/webpack'],
                  as: '*.js',
                },
              },
        }
    },
    env: {
        "NEXT_PUBLIC_API_URL": process.env.NEXT_PUBLIC_API_URL,
    },

    async redirects() {
        return [
          {
            source: '/about',
            destination: '/',
            permanent: false,
          },
        ]
    },
    eslint: {
      ignoreDuringBuilds: true,
    },

}
   
module.exports = nextConfig;