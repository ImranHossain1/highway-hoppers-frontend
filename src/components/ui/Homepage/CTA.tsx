import React from "react";
import Link from "next/link";
import { Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import styles from "./home.module.css";

const CTA = () => (
  <section className="hh-section">
    <div className="hh-container">
      <div className={styles.cta}>
        <div className={styles.ctaInner}>
          <h2>Ready to hit the road?</h2>
          <p>
            Book your next journey in under a minute and travel with comfort,
            safety and the best fares in the country.
          </p>
          <Link href="/book-now">
            <Button
              size="large"
              style={{
                background: "#e9c46a",
                borderColor: "#e9c46a",
                color: "#0d3b39",
                fontWeight: 700,
              }}
            >
              Book your ticket now <ArrowRightOutlined />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default CTA;
