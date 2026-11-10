/** @type {import('next').NextConfig} */
const nextConfig = {
  // সম্পূর্ণ static HTML export — `npm run build` করলে `out/` ফোল্ডারে পুরো সাইট তৈরি হবে
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  reactStrictMode: true,
};

export default nextConfig;
