import React from "react";
import styles from "./home.module.css";

const stats = [
  { num: "2,000+", label: "Travel destinations" },
  { num: "60+", label: "Districts covered" },
  { num: "500+", label: "Daily departures" },
  { num: "4.8/5", label: "Traveller rating" },
];

const Stats = () => (
  <div className="hh-container">
    <div className={styles.stats}>
      {stats.map((s) => (
        <div key={s.label} className={styles.statCard}>
          <div className={styles.statNum}>{s.num}</div>
          <div className={styles.statLabel}>{s.label}</div>
        </div>
      ))}
    </div>
  </div>
);

export default Stats;
