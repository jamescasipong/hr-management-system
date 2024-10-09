/** @type {import('next').NextConfig} */
import withPWA from 'next-pwa';

const withPWAConfig = withPWA({
  dest: 'public',
  // Optional: Disable PWA in development mode
  // disable: process.env.NODE_ENV === 'development',
});

const nextConfig = {
  // Your existing config options
};

export default withPWAConfig(nextConfig);
