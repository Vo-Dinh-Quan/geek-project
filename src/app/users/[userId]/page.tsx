"use client";

import React from "react";
import { Card, Space, Breadcrumb, Table, Image as AntImage, Spin } from "antd";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeftOutlined,
  EyeOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import { useUser } from "@/queries/useUsers";
import { useAlbums } from "@/queries/useAlbums";
import { getAvatarUrl } from "@/queries/useAvatarUrl";

const UserDetail: React.FC = () => {
  const params = useParams();
  const userId = parseInt(params.userId as string); // Ép kiểu userId thành số nguyên

  // Fetch thông tin user
  const { data: userData, isLoading: userLoading } = useUser(userId);

  // Fetch danh sách albums của user
  const { data: albums, isLoading: albumsLoading } = useAlbums(1, 100);

  // Lọc albums thuộc về user
  const userAlbums = albums?.filter((album: any) => album.userId === userId);

  // Hiển thị trạng thái loading
  if (userLoading || albumsLoading) {
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
  // Hiển thị lỗi nếu không tìm thấy user hoặc albums
  if (!userData) {
    return <div>User không tồn tại.</div>;
  }

  // Cấu hình các cột cho bảng albums
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Link href={`/albums/${record.id}`}>
            <button className="flex items-center gap-1 text-black border border-[#d9d9d9] px-[10px] rounded-sm transition-all duration-200 hover:text-[#4096FF] hover:border-[#4096FF] hover:focus hover:cursor-pointer">
              <EyeOutlined />
              Show
            </button>
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <div>
      {/* Thanh điều hướng Breadcrumb */}
      <Breadcrumb
        items={[
          {
            title: (
              <div className="flex gap-1">
                <IdcardOutlined />
                <Link href="/users">Users</Link>
              </div>
            ),
          },
          {
            title: "Show",
          },
        ]}
      />
      {/* Nút điều hướng và tiêu đề */}
      <div className=" flex items-center gap-0 h-10">
        <Link href="/users">
          <button className="flex items-center justify-center w-8 h-8 rounded-md transition-all duration-200 hover:bg-[#E7E7E7]">
            <ArrowLeftOutlined style={{ color: "black" }} />
          </button>
        </Link>
        <h2 className="text-xl font-medium ml-4">Show User</h2>
      </div>
      {/* Card chứa thông tin user */}
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
                <span className=" block font-[16px] h-[25px] mb-2 w-full">
                  {userData.name}
                </span>
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
              width: "100%",
            }}>
            <div>
              <h3 className="text-xl font-semibold pb-[10px]">Albums</h3>
              {/* Bảng hiển thị danh sách albums */}
              <Table
                columns={columns}
                dataSource={userAlbums}
                rowKey="id"
                pagination={false} // Không sử dụng pagination
                style={{ width: "100%" }} // Đảm bảo bảng chiếm toàn bộ chiều rộng
              />
            </div>
          </Space>
        </Card>
      </div>
    </div>
  );
};

export default UserDetail;
