/** @type {import('next').NextConfig} */
const removeImports = require("next-remove-imports")();
module.exports = removeImports({
  reactStrictMode: true,
  images: {
    domains: [process.env.NEXT_PUBLIC_AWS_BUCKET_URL],
  },
});
