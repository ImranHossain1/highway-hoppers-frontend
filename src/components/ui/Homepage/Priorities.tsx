import React from "react";
import styles from "./home.module.css";
import {
  SafetyOutlined,
  WifiOutlined,
  GlobalOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";

const features = [
  {
    icon: <SafetyOutlined />,
    title: "Health & safety first",
    text: "Sanitised coaches and trained crews keep every journey safe and worry-free.",
  },
  {
    icon: <WifiOutlined />,
    title: "Comfort on board",
    text: "Reclining seats, free Wi-Fi, power outlets and on-board washrooms as standard.",
  },
  {
    icon: <GlobalOutlined />,
    title: "Largest network",
    text: "Thousands of routes connecting cities and towns across all 60+ districts.",
  },
  {
    icon: <ThunderboltOutlined />,
    title: "Instant booking",
    text: "Search, pick a seat and get your e-ticket in under a minute — no paperwork.",
  },
];

const Priorities = () => (
  <section className="hh-section">
    <div className="hh-container">
      <div className={styles.secHead}>
        <span className="hh-eyebrow">Why Highway Hoppers</span>
        <h2 className="hh-h2">Built for a better journey</h2>
        <p className="hh-lead">
          Everything you need for a smooth ride, from booking to arrival.
        </p>
      </div>
      <div className={styles.grid4}>
        {features.map((f) => (
          <div key={f.title} className={styles.featureCard}>
            <div className={styles.iconChip}>{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Priorities;
