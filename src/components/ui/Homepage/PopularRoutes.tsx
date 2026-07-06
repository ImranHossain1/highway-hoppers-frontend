import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import styles from "./home.module.css";

const routes = [
  {
    from: "Dhaka",
    to: "Chattogram",
    img: "/assets/bus-1.jpg",
    duration: "~6h",
    price: "৳850",
    tag: "Most booked",
  },
  {
    from: "Dhaka",
    to: "Sylhet",
    img: "/assets/bus-2.jpg",
    duration: "~5h 30m",
    price: "৳780",
    tag: "Popular",
  },
  {
    from: "Dhaka",
    to: "Cox's Bazar",
    img: "/assets/map.jpeg",
    duration: "~9h",
    price: "৳1,250",
    tag: "Scenic",
  },
];

const PopularRoutes = () => (
  <section id="routes" className="hh-section">
    <div className="hh-container">
      <div className={styles.secHead}>
        <span className="hh-eyebrow">Popular routes</span>
        <h2 className="hh-h2">Trending journeys this week</h2>
        <p className="hh-lead">
          Hop on the routes travellers love most — book early for the best
          fares.
        </p>
      </div>

      <div className={styles.grid3}>
        {routes.map((r) => (
          <div key={`${r.from}-${r.to}`} className={styles.routeCard}>
            <div className={styles.routeImg}>
              <span className={styles.routeTag}>{r.tag}</span>
              <Image
                src={r.img}
                alt={`${r.from} to ${r.to}`}
                fill
                sizes="(max-width: 992px) 100vw, 380px"
              />
            </div>
            <div className={styles.routeBody}>
              <div className={styles.routePath}>
                {r.from} <span className={styles.arrow}>→</span> {r.to}
              </div>
              <p style={{ color: "var(--muted)", margin: "6px 0 0", fontSize: "0.9rem" }}>
                Daily departures · {r.duration}
              </p>
              <div className={styles.routeMeta}>
                <div className={styles.routePrice}>
                  {r.price} <small>/ seat</small>
                </div>
                <Link href="/book-now">
                  <Button type="primary">
                    Book <ArrowRightOutlined />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default PopularRoutes;
