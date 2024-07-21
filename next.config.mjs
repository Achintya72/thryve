import nextPwa from "next-pwa"

const withPWA = nextPwa({
  dest: 'public',
  register: true,
  skipWaiting: true,
  // disable: process.env.NODE_ENV == "production" ? false : true
  disable: true
})

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withPWA(nextConfig);
