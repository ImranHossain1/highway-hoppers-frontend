"use client";
import React from "react";
import styles from "./homepage.module.css";
import { EuroOutlined } from "@ant-design/icons";
import { Divider } from "antd";

const Info = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        className={styles.rawStyle}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "20px ",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div>
            <EuroOutlined style={{ color: "#218380", fontSize: 25 }} />
          </div>
          <h2 style={{ margin: "10px 0 10px 5px", color: "#218380" }}>
            Get Cheap Bus Tickets Easily with Highway Hoppers!
          </h2>
        </div>
        <p>
          If you are looking to travel by bus in your country or even worldwide,
          Highway Hoppers has got you covered with our extensive bus routes!
          With over 400,000 routes worldwide, you can easily find the perfect
          option for your trip. Plus, our cheap bus tickets make it easy and
          affordable to get wherever you want to go, whether it is for work or
          play.
        </p>
        <Divider></Divider>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div>
            <EuroOutlined style={{ color: "#218380", fontSize: 25 }} />
          </div>
          <h2 style={{ margin: "10px 0 10px 5px", color: "#218380" }}>
            Bus Routes to Suit Your Schedule
          </h2>
        </div>

        <p>
          Traveling with Highway Hoppers is simple and hassle-free, thanks to
          our frequent bus connections, reliable schedules, and modern vehicles.
          With over 400,000 bus routes across the globe, including Europe and
          South America, you can easily find the perfect option for your trip.
          Additionally, Highway Hoppers offers train travel in Sweden and
          Germany with FlixTrain, providing even more travel options to suit
          your needs. Our extensive network spans 40+ countries and over 3,000
          destinations worldwide, making it easy to plan and book your trip
          online or through our user-friendly app. Plus, stay connected on the
          go with free WiFi on most of our buses and trains, and track your
          journey in real-time with our advanced tracking system.
        </p>
        <Divider></Divider>

        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div>
            <EuroOutlined style={{ color: "#218380", fontSize: 25 }} />
          </div>
          <h2 style={{ margin: "10px 0 10px 5px", color: "#218380" }}>
            Buying Your Bus Tickets is Easy with Highway Hoppers
          </h2>
        </div>
        <p>
          Our website and app make it easy to plan your journey, find the
          cheapest bus fares, and purchase your bus tickets securely. Whether
          you are planning or booking last-minute trip, Highway Hoppers makes
          buying bus tickets a breeze. Plus, with our convenient e-ticket
          system, you can board your bus without the hassle of paper tickets as
          your phone will serve as your ticket!
        </p>
        <Divider></Divider>

        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div>
            <EuroOutlined style={{ color: "#218380", fontSize: 25 }} />
          </div>
          <h2 style={{ margin: "10px 0 10px 5px", color: "#218380" }}>
            Discover the Best Destinations Highway Hoppers has to Offer
          </h2>
        </div>
        <p>
          Hop onboard a Highway Hoppers and visit some of the most popular
          cities across our global network. Whether you are exploring the
          history of Rome, enjoying the beaches of Lisbon, taking in the sights
          and sounds of Berlin or indulging in the local cuisine of Paris,
          Highway Hoppers has a route for you to experience the best that the
          world has to offer.
        </p>
        <Divider></Divider>

        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div>
            <EuroOutlined style={{ color: "#218380", fontSize: 25 }} />
          </div>
          <h2 style={{ margin: "10px 0 10px 5px", color: "#218380" }}>
            Travelling with Highway Hoppers is a more sustainable choice
          </h2>
        </div>
        <p>
          Traveling by bus is not just a convenient choice but also an
          environmentally responsible one, as bus travel reduces traffic and
          emissions compared to travelling by car. We’re working to make bus
          travel even greener with high environmental standards across our fleet
          of buses, the use of alternative drive and fuel technologies, and the
          option for all passengers to offset their carbon when buying their bus
          tickets. So, when you travel with Highway Hoppers you can know you’re
          making a responsible choice
        </p>
        <Divider></Divider>

        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div>
            <EuroOutlined style={{ color: "#218380", fontSize: 25 }} />
          </div>
          <h2 style={{ margin: "10px 0 10px 5px", color: "#218380" }}>
            Travel in Comfort and Style
          </h2>
        </div>
        <p>
          Highway Hoppers prioritizes comfort and convenience for your journey.
          With amenities like on-board WiFi, extra legroom, power outlets and
          toilets on board, we have thought of everything to make your trip as
          smooth as possible. Our easy-to-use app and simple booking platform
          make it effortless to plan your bus travel. Book your bus ticket with
          Highway Hoppers today
        </p>
      </div>
    </div>
  );
};

export default Info;
