// src/queries/avatarApi.ts (hoặc src/queries/useAvatarUrl.tsx)
import { generateAvatarUrl } from "../lib/avatarApi";

/**
 * Hàm tạo URL avatar dựa trên tên người dùng
 * @param name tên người dùng (bắt buộc)
 * @param background màu nền (tùy chọn)
 * @param color màu chữ (tùy chọn)
 */
export const getAvatarUrl = (name: string, background?: string) => {
  return generateAvatarUrl({ name, background });
};
