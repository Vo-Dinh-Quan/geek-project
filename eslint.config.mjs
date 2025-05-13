import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:@tanstack/query/recommended"
  ),
  {
    rules: {
      // Tắt cảnh báo biến hoặc import không dùng
      "no-unused-vars": "off",
      // Tắt cảnh báo sử dụng `any`
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];

export default eslintConfig;
