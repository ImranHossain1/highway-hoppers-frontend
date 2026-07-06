import React from "react";
import { PlusOutlined, ReadOutlined } from "@ant-design/icons";
import styles from "./home.module.css";

const items = [
  {
    q: "Get cheap bus tickets easily with Highway Hoppers",
    a: "Looking to travel across the country? Highway Hoppers covers thousands of routes so you can find the perfect option for your trip. Our low fares make it easy and affordable to get wherever you need to go, whether it's for work or play.",
  },
  {
    q: "Bus routes to suit your schedule",
    a: "Frequent connections, reliable schedules and modern vehicles make travelling simple and hassle-free. Plan and book your journey online in minutes, stay connected with free on-board Wi-Fi, and track your bus in real time.",
  },
  {
    q: "Buying your bus tickets is easy",
    a: "Our website makes it easy to plan your journey, find the cheapest fares and pay securely. With our convenient e-ticket system your phone is your ticket — no printing or paperwork required.",
  },
  {
    q: "Travel in comfort and style",
    a: "On-board Wi-Fi, extra legroom, power outlets and clean washrooms come as standard. We've thought of everything to make your trip as smooth and relaxing as possible.",
  },
  {
    q: "A more sustainable choice",
    a: "Travelling by bus reduces traffic and emissions compared with driving. We're making journeys greener with high environmental standards and efficient coaches across our growing fleet.",
  },
];

const Info = () => (
  <section className="hh-section">
    <div className="hh-container">
      <div className={styles.secHead}>
        <span className="hh-eyebrow">Good to know</span>
        <h2 className="hh-h2">Everything about travelling with us</h2>
        <p className="hh-lead">
          Answers to the questions travellers ask us most.
        </p>
      </div>

      <div className={styles.info}>
        {items.map((it, i) => (
          <details key={it.q} className={styles.infoItem} open={i === 0}>
            <summary>
              <span className={styles.infoDot}>
                <ReadOutlined />
              </span>
              {it.q}
              <PlusOutlined className={styles.plus} />
            </summary>
            <p>{it.a}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
);

export default Info;
