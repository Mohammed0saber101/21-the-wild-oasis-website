/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      new URL(
        "https://miwuzybcsivtglgxlbxj.supabase.co/storage/v1/object/public/cabin-images/**"
      ),
    ],
  },
};

export default nextConfig;
