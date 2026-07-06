"use client";
import SearchField from "@/components/ui/SearchField";
import TableRow from "@/components/ui/TableRow";
import styles from "@/components/ui/Homepage/home.module.css";
import { EnvironmentOutlined } from "@ant-design/icons";
import React, { use } from "react";

const Book = (props: any) => {
  const searchParams = use<any>(props.searchParams);

  return (
    <>
      <section className={styles.pageHero}>
        <div className="hh-container">
          <div className={styles.pageHeroInner}>
            <span className={styles.pageHeroBadge}>
              <EnvironmentOutlined /> Plan your trip
            </span>
            <h1>Find & book your bus</h1>
            <p>
              Pick your route and travel date to see live departures, available
              seats and fares.
            </p>
          </div>
        </div>
      </section>

      <div className={`${styles.pullUp}`}>
        <div className="hh-container">
          <div className={styles.searchCard}>
            <div className={styles.searchHead}>
              <div>
                <h3>Search buses</h3>
                <p>Choose origin, destination and date.</p>
              </div>
            </div>
            <SearchField searchParams={searchParams} compact />
          </div>
        </div>
      </div>

      <section className="hh-section">
        <div className="hh-container">
          <TableRow searchParams={searchParams} />
        </div>
      </section>
    </>
  );
};

export default Book;
