"use client";

import React, { Suspense, useState, useEffect } from "react";
import { Table, Space, Pagination, Spin } from "antd";
import { useAlbums } from "@/queries/useAlbums";
import { useUser } from "@/queries/useUsers";
import { getAvatarUrl } from "@/queries/useAvatarUrl";
import { EyeOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation"; // Sử dụng next/navigation

const UserDisplay: React.FC<{ userId: number }> = ({ userId }) => {
  const { data: user, isLoading } = useUser(userId);

  if (isLoading) {
    return <Spin size="small" />;
  }

  if (!user) {
    return <div>No user found</div>;
  }

  const avatarUrl = getAvatarUrl(user.name);
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Image
        src={avatarUrl}
        alt={user.name}
        style={{ borderRadius: "50%", marginRight: 8 }}
        width={30}
        height={30}
        unoptimized
      />
      <Link href={`/users/${user.id}`}>
        <span style={{ color: "#4096FF", cursor: "pointer" }}>{user.name}</span>
      </Link>
    </div>
  );
};

const AlbumsPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Lấy các query params từ URL (pagination)
  const currentPage = searchParams.get("current")
    ? parseInt(searchParams.get("current") as string)
    : 1;
  const currentPageSize = searchParams.get("pageSize")
    ? parseInt(searchParams.get("pageSize") as string)
    : 10;

  const [current, setCurrent] = useState(currentPage);
  const [pageSize, setPageSize] = useState(currentPageSize);

  const { data: albums, isLoading: albumsLoading } = useAlbums(
    current,
    pageSize
  );

  useEffect(() => {
    // Cập nhật lại query params khi pagination thay đổi
    router.push(`/albums?current=${current}&pageSize=${pageSize}`);
  }, [current, pageSize, router]);

  const handlePageChange = (page: number, pageSize: number) => {
    setCurrent(page);
    setPageSize(pageSize);
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Title", dataIndex: "title", key: "title" },
    {
      title: "User",
      key: "user",
      render: (_: any, record: any) => {
        return <UserDisplay userId={record.userId} />;
      },
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
    <div style={{ borderRadius: 8 }}>
      <Table
        columns={columns}
        dataSource={albums}
        rowKey="id"
        pagination={false}
        loading={albumsLoading}
      />
      <div className="flex justify-end">
        <Pagination
          current={current}
          pageSize={pageSize}
          total={50}
          onChange={handlePageChange}
          showSizeChanger
          style={{
            marginTop: 16,
            marginBottom: 16,
            textAlign: "right",
            backgroundColor: "transparent",
          }}
        />
      </div>
    </div>
  );
};

const AlbumsPageWrapper: React.FC = () => {
  return (
    <Suspense
      fallback={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}>
          <Spin size="large" tip="Loading..." />
        </div>
      }>
      <AlbumsPage />
    </Suspense>
  );
};

export default AlbumsPageWrapper;
