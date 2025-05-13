// src/lib/avatarApi.ts

/**
 * Generate avatar URL using ui-avatars.com
 * @param name Tên hiển thị trên avatar (ví dụ: "John Doe")
 * @param background Màu nền (mặc định: random)
 * @param color Màu chữ (mặc định: auto đen/trắng)
 * @returns URL string
 */
export const generateAvatarUrl = ({
  name,
  background = "random",
  color,
}: {
  name: string;
  background?: string;
  color?: string;
}) => {
  const baseUrl = "https://ui-avatars.com/api/";
  const params = new URLSearchParams({ name, background });

  if (color) {
    params.append("color", color);
  }

  return `${baseUrl}?${params.toString()}`;
};
