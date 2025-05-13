"use client";
import React from "react";
import { Layout } from "antd";

const { Header } = Layout;

const HeaderBar: React.FC = () => {
  return (
    <Header
      style={{
        position: "fixed", // Cố định HeaderBar
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10, // Đảm bảo HeaderBar ở trên tất cả
        height: "64px", // Chiều cao của header bar (thường là 64px)
        backgroundColor: "#fff", // Màu nền của header bar
      }}></Header>
  );
};

export default HeaderBar;
