import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "antd";
import { ArrowRightOutlined, CheckOutlined } from "@ant-design/icons";
import styles from "./home.module.css";

const points = [
  "Live map of every route and stop nationwide",
  "Real-time seat availability before you pay",
  "Transparent fares with no hidden charges",
];

const Discover = () => (
  <section className="hh-section">
    <div className="hh-container">
      <div className={styles.split}>
        <div className={styles.splitImg}>
          <Image
            src="/assets/map.jpeg"
            alt="Route map of Bangladesh"
            fill
            sizes="(max-width: 992px) 100vw, 600px"
          />
        </div>
        <div>
          <span className="hh-eyebrow">Discover destinations</span>
          <h2 className="hh-h2">Every corner of the country, one map</h2>
          <p className="hh-lead">
            Explore over 2,000 travel destinations across 60+ districts and plan
            the perfect route in just a few taps.
          </p>
          <ul className={styles.checkList}>
            {points.map((p) => (
              <li key={p}>
                <span className={styles.tick}>
                  <CheckOutlined />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <Link href="/book-now">
            <Button type="primary" size="large">
              Explore the map <ArrowRightOutlined />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default Discover;
