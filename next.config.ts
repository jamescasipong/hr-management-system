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
        "NEXT_PUBLIC_API_URL": "http://localhost:3000",
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
}
   
module.exports = nextConfig;