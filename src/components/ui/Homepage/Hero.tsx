import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "antd";
import {
  ArrowRightOutlined,
  CheckCircleFilled,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import styles from "./home.module.css";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroBg}>
        <Image
          src="/assets/bus-1.jpg"
          alt="Highway Hoppers coach on the road"
          fill
          priority
          sizes="100vw"
        />
      </div>
      <div className={styles.heroOverlay} />

      <div className="hh-container">
        <div className={styles.heroInner}>
          <span className={styles.heroBadge}>
            <SafetyCertificateOutlined /> Bangladesh&apos;s trusted bus network
          </span>

          <h1 className={styles.heroTitle}>
            Travel smarter. <span>Book your bus</span> in seconds.
          </h1>

          <p className={styles.heroSub}>
            Compare routes across 60+ districts, pick your seat and pay
            securely — comfortable journeys start with Highway Hoppers.
          </p>

          <div className={styles.heroCtas}>
            <Link href="/book-now">
              <Button type="primary" size="large">
                Book a ticket <ArrowRightOutlined />
              </Button>
            </Link>
            <Link href="#routes">
              <Button
                size="large"
                ghost
                style={{ borderColor: "rgba(255,255,255,0.6)", color: "#fff" }}
              >
                Explore routes
              </Button>
            </Link>
          </div>

          <div className={styles.trustRow}>
            <span>
              <CheckCircleFilled style={{ color: "#e9c46a" }} /> Free seat
              selection
            </span>
            <span>
              <CheckCircleFilled style={{ color: "#e9c46a" }} /> Instant
              e-tickets
            </span>
            <span>
              <CheckCircleFilled style={{ color: "#e9c46a" }} /> 24/7 support
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
