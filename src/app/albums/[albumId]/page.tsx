"use client";

import React from "react";
import { Card, Space, Breadcrumb, Image as AntImage, Spin } from "antd";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeftOutlined, ProfileOutlined } from "@ant-design/icons";
import { useAlbums } from "@/queries/useAlbums";
import { useUser } from "@/queries/useUsers";
import { getAvatarUrl } from "@/queries/useAvatarUrl";

const photos = [
  {
    thumbnailUrl:
      "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=150&h=66&fit=crop",
  },
  {
    thumbnailUrl:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=150&h=66&fit=crop",
  },
  {
    thumbnailUrl:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=150&h=66&fit=crop",
  },
  {
    thumbnailUrl:
      "https://images.unsplash.com/photo-1534081333815-ae5019106621?w=150&h=66&fit=crop",
  },
  {
    thumbnailUrl:
      "https://images.unsplash.com/photo-1564866657310-64001f12b1ec?w=150&h=66&fit=crop",
  },
  {
    thumbnailUrl:
      "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=150&h=66&fit=crop",
  },
  {
    thumbnailUrl:
      "https://images.unsplash.com/photo-1508923567004-3a6b8004f3d3?w=150&h=66&fit=crop",
  },
  {
    thumbnailUrl:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?w=150&h=66&fit=crop",
  },
  {
    thumbnailUrl:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=150&h=66&fit=crop",
  },
  {
    thumbnailUrl:
      "https://images.unsplash.com/photo-1502767089025-6572583495b0?w=150&h=66&fit=crop",
  },
];

const AlbumDetail: React.FC = () => {
  const params = useParams();
  const albumId = parseInt(params.albumId as string); // Ép kiểu albumId thành số nguyên
  // console.log("Album ID:", albumId);

  // Fetch danh sách albums
  const { data: albums, isLoading: albumsLoading } = useAlbums(1, 100);

  // Lọc album dựa trên albumId
  const albumData = albums?.find((album: any) => album.id === albumId);

  // Fetch thông tin user dựa trên userId từ albumData
  const userId = albumData?.userId ?? 0; // Đảm bảo userId luôn có giá trị hợp lệ

  const { data: userData, isLoading: userLoading } = useUser(userId, {
    queryKey: ["user", userId], // Add queryKey to match the expected type
    enabled: !!userId, // Chỉ fetch user khi userId tồn tại
  });

  if (albumsLoading || userLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", // Chiều cao toàn màn hình
        }}>
        <Spin size="large" tip="Loading..." />
      </div>
    );
  }

  // Hiển thị lỗi nếu không tìm thấy album hoặc user
  if (!albumData || !userData) {
    return <div>Album hoặc User không tồn tại.</div>;
  }

  return (
    <div>
      {/* Thanh điều hướng Breadcrumb */}
      <Breadcrumb
        items={[
          {
            title: (
              <div className="flex gap-2">
                <ProfileOutlined />
                <Link href="/albums">Albums</Link>
              </div>
            ),
          },
          {
            title: "Show",
          },
        ]}
      />
      {/* Nút điều hướng và tiêu đề */}
      <div className="mx-1 flex items-center gap-0 h-10">
        <Link href="/albums">
          <button className="flex items-center justify-center w-8 h-8 rounded-md transition-all duration-200 hover:bg-[#E7E7E7]">
            <ArrowLeftOutlined style={{ color: "black" }} />
          </button>
        </Link>
        <h2 className="text-xl font-medium ml-4">Show Album</h2>
      </div>
      {/* Card chứa thông tin album */}
      <div className="p-6 mt-[12px] bg-white rounded-md">
        <Card
          title={
            <div className="h-[55px] flex align-items-start">
              <div className="h-full pr-4">
                <AntImage
                  src={getAvatarUrl(userData.name)}
                  alt="User Avatar"
                  style={{ borderRadius: "50%" }}
                  width={30}
                  height={30}
                />
              </div>
              <div>
                <Link
                  href={`/users/${userData.id}`}
                  className="text-[#1677ff] block font-[16px] h-[25px] mb-2 w-full">
                  {userData.name}
                </Link>
                <Link
                  href={`mailto:${userData.email}`}
                  className="text-[#1677ff] font-normal block text-sm w-full">
                  {userData.email}
                </Link>
              </div>
            </div>
          }
          style={{ width: "100%", padding: "24px" }}>
          <Space
            direction="vertical"
            size={16}
            style={{
              display: "flex",
              alignItems: "flex-start",
            }}>
            <div>
              <h3 className="text-lg font-semibold pb-[10px]">
                {albumData?.title}
              </h3>
              <div className="flex gap-2 flex-wrap">
                {photos?.map((photo: any, index: number) => (
                  <div
                    key={index}
                    style={{
                      width: "150px",
                      height: "66px",
                      overflow: "hidden",
                      cursor: "pointer",
                    }}>
                    <AntImage
                      alt="Thumbnail"
                      src={photo.thumbnailUrl}
                      width={150}
                      height={66}
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </Space>
        </Card>
      </div>
    </div>
  );
};

export default AlbumDetail;
