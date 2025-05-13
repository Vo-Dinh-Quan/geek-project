import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import api from "../lib/api";

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

// Fetch danh sách người dùng
const fetchUsers = async (): Promise<User[]> => {
  const response = await api.get<User[]>("/users");
  return response.data;
};

// Fetch thông tin một người dùng cụ thể
const fetchUser = async (userId: number): Promise<User> => {
  const response = await api.get<User>(`/users/${userId}`);
  return response.data;
};

// Hook để fetch danh sách người dùng
export const useUsers = (
  options?: UseQueryOptions<User[], Error, User[], [string]>
) => {
  return useQuery<User[], Error, User[], [string]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
    ...options,
  });
};

// Hook để fetch thông tin một người dùng cụ thể
export const useUser = (
  userId: number,
  options?: UseQueryOptions<User, Error, User, [string, number]>
) => {
  return useQuery<User, Error, User, [string, number]>({
    queryKey: ["user", userId],
    queryFn: () => fetchUser(userId),
    enabled: !!userId, // Chỉ fetch khi userId hợp lệ
    ...options,
  });
};
