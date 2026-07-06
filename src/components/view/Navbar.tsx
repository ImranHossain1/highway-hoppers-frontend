"use client";
import React, { useState, useEffect } from "react";
import { Button, Drawer, Menu } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { Layout, Typography, theme } from "antd";
import Link from "next/link";
import { MenuOutlined } from "@ant-design/icons";
import { isLoggedIn, removeUserInfo } from "@/services/auth.service";
import { authKey } from "@/constants/storageKey";
import dynamic from "next/dynamic";
import { showSidebarDrawer } from "@/redux/slices/sidebarSlice";
import { useAppDispatch } from "@/redux/hooks";
const { Header, Content } = Layout;
const { Title } = Typography;
import styles from "./navbar.module.css";

const Login = dynamic(() => import("./Buttons/LoginButton"), { ssr: false });
const Logout = dynamic(() => import("./Buttons/LogoutButton"), { ssr: false });
const Dashboard = dynamic(() => import("./Buttons/DashboardButton"), {
  ssr: false,
});
const Signup = dynamic(() => import("./Buttons/SignupButton"), { ssr: false });

const Navbar = ({
  items,
  hasSider,
}: {
  items: { key: string; label: string; href: string }[];
  hasSider?: boolean;
}) => {
  const [userLoggedIn, setUserLoggedIn] = useState(isLoggedIn()); // Initialize userLoggedIn state
  const dispatch = useAppDispatch();
  const {
    token: { colorBgLayout },
  } = theme.useToken();
  const router = useRouter();
  const pathname = usePathname();
  const [showFullHeader, setShowFullHeader] = useState(true); // Initially, show the full header
  const [open, setOpen] = useState(false);

  const logout = () => {
    removeUserInfo(authKey);
    setUserLoggedIn(false);
    router.push("/login");
  };

  const menuItems = [
    ...(items?.map((item) => ({
      key: item.href,
      label: <Link href={item.href}>{item.label}</Link>,
    })) ?? []),
    ...(userLoggedIn
      ? [
          { key: "/dashboard", label: <Dashboard /> },
          { key: "/logout", label: <Logout onLogout={logout} /> },
        ]
      : [
          { key: "/login", label: <Login /> },
          { key: "/signup", label: <Signup /> },
        ]),
  ];

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Check the screen size and update the showFullHeader state
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        // Adjust this breakpoint as needed
        setShowFullHeader(false);
      } else {
        setShowFullHeader(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Layout className="layout" style={{ background: colorBgLayout }}>
      <div className={styles.navbar}>
        <Header
          style={{
            display: "flex",
            alignItems: "center",
            background: colorBgLayout,
          }}
        >
          <Content>
            <Link href="/home">
              <Title level={3} style={{ color: "white", marginBottom: 0 }}>
                Highway Hoppers
              </Title>
            </Link>
          </Content>

          <Menu
            disabledOverflow
            theme="dark"
            mode="horizontal"
            selectedKeys={[pathname]}
            style={{ display: "block", background: colorBgLayout }}
            items={menuItems}
          />
        </Header>
      </div>
      <div className={styles.navbar2}>
        <Header
          style={{
            display: "flex",
            alignItems: "center",
            background: colorBgLayout,
          }}
        >
          {hasSider && (
            <Button
              type="primary"
              onClick={() => {
                dispatch(showSidebarDrawer());
              }}
              style={{ marginRight: "10px " }}
            >
              <MenuOutlined />
            </Button>
          )}
          <Content>
            <Link href="/home">
              <Title level={3} style={{ color: "white", marginBottom: 0 }}>
                HH
              </Title>
            </Link>
          </Content>
          <Button type="primary" onClick={showDrawer}>
            <MenuOutlined />
          </Button>
          <Drawer
            title="Menu"
            placement="right"
            onClose={onClose}
            open={open}
          >
            <Menu
              mode="vertical"
              selectedKeys={[pathname]}
              style={{ borderRight: 0 }}
              items={menuItems}
            />
          </Drawer>
        </Header>
      </div>
    </Layout>
  );
};

export default Navbar;
{
  /* <>

</> */
}
