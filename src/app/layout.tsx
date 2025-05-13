"use client";

import { ReactNode, useState, useEffect } from "react";
import { Layout, Grid } from "antd";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import AppProvider from "@/components/app-provider";
import Sidebar from "@/components/sidebar";
import HeaderBar from "@/components/header-bar";

const { Sider, Content } = Layout;
const { useBreakpoint } = Grid;

export default function RootLayout({ children }: { children: ReactNode }) {
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const [collapsed, setCollapsed] = useState(isMobile); // Giữ collapsed là true trên mobile

  // Khi thay đổi kích thước màn hình, cập nhật trạng thái collapsed
  useEffect(() => {
    if (isMobile) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [isMobile]);

  return (
    <html lang="en">
      <body>
        <AppProvider>
          <AntdRegistry>
            <Layout style={{ minHeight: "100vh" }}>
              {/* Sidebar */}
              <Sider
                collapsible
                collapsed={isMobile || collapsed} // Nếu là mobile thì luôn thu gọn
                onCollapse={setCollapsed} // Khi click sẽ đổi trạng thái collapsed
                breakpoint="md"
                style={{
                  backgroundColor: "white",
                  color: "#000",
                  borderRight: "none",
                  position: "fixed", // Cố định Sider
                  top: 0,
                  left: 0,
                  marginRight: "200px",
                  height: "100vh",
                  zIndex: 20,
                }}
                collapsedWidth={isMobile ? 0 : 80}>
                {!isMobile && (
                  <Sidebar
                    collapsed={collapsed}
                    isMobile={isMobile}
                    onClose={() => setCollapsed(true)}
                  />
                )}
              </Sider>
              {isMobile && (
                <Sidebar
                  collapsed={collapsed}
                  isMobile={isMobile}
                  onClose={() => setCollapsed(true)}
                />
              )}
              <Layout>
                <HeaderBar />
                <Content
                  style={{
                    marginLeft: 24,
                    marginRight: 24,
                    marginBottom: 24,
                    marginTop: "90px", // Bù cho HeaderBar
                    borderTopLeftRadius: "8px",
                    borderTopRightRadius: "8px",
                    background: "transparent",
                    ...(!isMobile ? { marginLeft: "224px" } : {}),
                  }}>
                  {children}
                </Content>
              </Layout>
            </Layout>
          </AntdRegistry>
        </AppProvider>
      </body>
    </html>
  );
}
