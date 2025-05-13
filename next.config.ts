import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["ui-avatars.com", "randomuser.me", "via.placeholder.com", "images.unsplash.com"], // Sử dụng 'domains' thay vì 'remotePatterns' nếu cần,

    remotePatterns: [
      {
        protocol: "https",
        hostname: "ui-avatars.com",
        pathname: "/api/*", // Chỉ các URL API từ ui-avatars.com được phép tải
      },
    ],
  },
  /* Các cấu hình khác nếu có */
};

export default nextConfig;
