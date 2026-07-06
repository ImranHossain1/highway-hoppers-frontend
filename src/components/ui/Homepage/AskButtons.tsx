import React from "react";
import Link from "next/link";
import {
  FieldTimeOutlined,
  ScheduleOutlined,
  CustomerServiceOutlined,
  RightOutlined,
} from "@ant-design/icons";
import styles from "./home.module.css";

const actions = [
  {
    icon: <FieldTimeOutlined />,
    title: "Bus tracker",
    text: "Follow your coach in real time.",
    href: "/book-now",
  },
  {
    icon: <ScheduleOutlined />,
    title: "Manage booking",
    text: "View, change or cancel a trip.",
    href: "/user/my-bookings",
  },
  {
    icon: <CustomerServiceOutlined />,
    title: "Help & support",
    text: "We're here for you 24/7.",
    href: "/about-us",
  },
];

const AskButtons = () => (
  <section className="hh-section">
    <div className="hh-container">
      <div className={styles.grid3}>
        {actions.map((a) => (
          <Link key={a.title} href={a.href} className={styles.actionCard}>
            <span className={styles.aIcon}>{a.icon}</span>
            <div style={{ flex: 1 }}>
              <h4>{a.title}</h4>
              <p>{a.text}</p>
            </div>
            <RightOutlined style={{ color: "var(--muted)" }} />
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default AskButtons;
