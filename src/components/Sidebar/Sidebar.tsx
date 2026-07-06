"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { onSidebarClose } from "@/redux/slices/sidebarSlice";
import { useMyProfileQuery } from "@/redux/api/userApi";
import { Drawer, Layout, Menu } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import styles from "./Sidebar.module.css";
const { Content, Sider } = Layout;

const initials = (name?: string) =>
  (name || "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join("") || "?";

const Sidebar = ({
  children,
  items,
}: {
  children: React.ReactNode;
  items: { key: string; label: string; href: string }[];
}) => {
  const open = useAppSelector((state) => state.sidebar.open);
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const { data: profileData } = useMyProfileQuery({});
  const profile = profileData?.data || {};
  const avatar = profile.profileImg || profile.profileImage;

  const getSelectedKey = () => {
    return items.find((item) => item.href === pathname)?.key || "";
  };

  const menuItems = items?.map((item) => ({
    key: item.key,
    label: <Link href={item.href}>{item.label}</Link>,
  }));

  const profileHeader = (
    <div className={styles.profileHeader}>
      {avatar ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className={styles.avatar} src={avatar} alt={profile.name || "Profile"} />
      ) : (
        <div className={styles.avatarFallback}>{initials(profile.name)}</div>
      )}
      <div className={styles.pName}>{profile.name || "My account"}</div>
      {profile.role && <div className={styles.pRole}>{profile.role}</div>}
    </div>
  );

  return (
    <Layout>
      <Content>
        <Layout>
          <div className={styles.sidebar}>
            <Sider
              width={250}
              style={{ minHeight: "100vh", background: "#e5e5e5" }}
            >
              {profileHeader}
              <Menu
                style={{
                  height: "100%",
                  padding: "8px",
                  background: "transparent",
                }}
                mode="inline"
                defaultSelectedKeys={[getSelectedKey()]}
                selectedKeys={[getSelectedKey()]}
                items={menuItems}
              />
            </Sider>
          </div>
          <Content style={{ background: "#ffffff", padding: "16px" }}>
            {children}
          </Content>
        </Layout>
        <div className={styles.hamburger}>
          <Layout>
            <Drawer
              title="Dashboard"
              placement="left"
              onClose={() => {
                dispatch(onSidebarClose());
              }}
              open={open}
            >
              {profileHeader}
              <Menu
                style={{ height: "100%", padding: "8px" }}
                mode="inline"
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                items={menuItems}
              />
            </Drawer>
          </Layout>
        </div>
      </Content>
    </Layout>
  );
};

export default Sidebar;

{
  /* */
}
