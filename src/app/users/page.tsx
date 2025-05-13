"use client";

import React from "react";
import { Table, Space } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import { useUsers } from "@/queries/useUsers"; // Import custom hook useUsers
import { getAvatarUrl } from "@/queries/useAvatarUrl"; // Import hàm lấy avatar

const UsersPage: React.FC = () => {
  // Fetch danh sách người dùng từ API
  const { data: users, isLoading, error } = useUsers();


  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Cấu hình các cột cho bảng
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Avatar",
      dataIndex: "name",
      key: "avatar",
      render: (name: string) => {
        const avatarUrl = getAvatarUrl(name); // Lấy URL avatar từ tên
        return (
          <Image
            src={avatarUrl}
            alt="Avatar"
            width={30}
            height={30}
            style={{ borderRadius: "50%" }}
            unoptimized
          />
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (email: string) => (
        <Link href={`mailto:${email}`}>
          <span style={{ color: "#4096FF", cursor: "pointer" }}>{email}</span>
        </Link>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (phone: string) => (
        <Link href={`tel:${phone}`}>
          <span style={{ color: "#4096FF", cursor: "pointer" }}>{phone}</span>
        </Link>
      ),
    },
    {
      title: "Website",
      dataIndex: "website",
      key: "website",
      render: (website: string) => (
        <a
          href={`https://${website}`}
          target="_blank"
          rel="noopener noreferrer">
          {website}
        </a>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Link href={`/users/${record.id}`}>
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
      <h2 className="text-xl font-medium">Users</h2>
      <div style={{ borderRadius: 8 }}>
        <Table
          columns={columns}
          dataSource={users}
          rowKey="id"
          pagination={false} // Không sử dụng pagination
          style={{ marginTop: 16 }}
          loading={isLoading} // Hiển thị loading khi đang tải dữ liệu
        />
      </div>
    </div>
  );
};

export default UsersPage;
