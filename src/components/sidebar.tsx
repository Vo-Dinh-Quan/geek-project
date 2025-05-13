"use client";
import React from "react";
import Link from "next/link";
import { Menu, Drawer } from "antd";
import { IdcardOutlined, ProfileOutlined } from "@ant-design/icons";
import { usePathname } from "next/navigation";
import Image from "next/image";

interface SidebarProps {
  collapsed: boolean;
  isMobile: boolean;
  onClose: () => void;
}

const items = [
  { key: "/albums", icon: <ProfileOutlined />, label: "Albums" },
  { key: "/users", icon: <IdcardOutlined />, label: "Users" },
];

const Sidebar: React.FC<SidebarProps> = ({ collapsed, isMobile, onClose }) => {
  const path = usePathname();
  const selectedKey =
    items.find((item) => path.startsWith(item.key))?.key || "/albums";

  const menu = (
    <Menu
      mode="inline"
      theme="light"
      selectedKeys={[selectedKey]}
      className="h-full w-50"
      items={items.map((item) => ({
        key: item.key,
        icon: item.icon,
        label: <Link href={item.key}>{item.label}</Link>,
      }))}
    />
  );

  // Điều chỉnh khi ở trên mobile
  if (isMobile) {
    return (
      <Drawer
        open={!collapsed} // Điều khiển mở/đóng Drawer
        placement="left"
        onClose={onClose}
        width={200} // Chiều rộng của Drawer (sidebar mobile)
        styles={{
          header: { display: "none" }, // Ẩn tiêu đề của Drawer
          body: {
            padding: 0,
            color: "#000",
            overflow: "hidden",
          },
        }}>
        <div className="h-16 flex items-center justify-start px-4 mb-2">
          <Link href="/">
            <Image
              src="https://geekup.vn/Icons/geekup-logo-general.svg"
              alt="GEEK Up"
              width={100}
              height={26.67}
            />
          </Link>
        </div>
        {menu}
      </Drawer>
    );
  }

  return (
    <>
      <div
        className={`h-16 mb-2 flex items-center ${
          collapsed ? "px-8" : "px-4"
        } justify-start bg-white`}>
        <Link href="/">
          <Image
            src="https://geekup.vn/Icons/geekup-logo-general.svg"
            alt="GEEK Up"
            width={100}
            height={26.67}
            className="min-w-[100px] max-w-[100px] h-auto"
          />
        </Link>
      </div>
      {menu}
    </>
  );
};

export default Sidebar;
