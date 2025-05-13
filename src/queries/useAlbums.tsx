// queries/useAlbums.tsx
import { useQuery } from "@tanstack/react-query";
import api from "../lib/api";

export interface Album {
  userId: number;
  id: number;
  title: string;
}

const fetchAlbums = async (
  page: number,
  pageSize: number
): Promise<Album[]> => {
  const response = await api.get<Album[]>("/albums", {
    params: {
      _page: page,
      _limit: pageSize,
    },
  });
  return response.data;
};

export const useAlbums = (page: number, pageSize: number) => {
  return useQuery({
    queryKey: ["albums", page, pageSize],
    queryFn: () => fetchAlbums(page, pageSize),
    // keepPreviousData: true, // Giữ dữ liệu trước khi tải lại
  });
};
