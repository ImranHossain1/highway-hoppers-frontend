"use client";
import Loading from "@/app/loading";
import {
  useAvailableSitsQuery,
  useSingleScheduleQuery,
} from "@/redux/api/scheduleApi";
import { useMyProfileQuery } from "@/redux/api/userApi";
import { isLoggedIn } from "@/services/auth.service";
import { App, Button } from "antd";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useMemo, useState } from "react";
import { useGetSingleBusQuery } from "@/redux/api/busApi";
import {
  ArrowRightOutlined,
  BookOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  DollarCircleOutlined,
  IdcardOutlined,
  MailOutlined,
  PhoneOutlined,
  StarFilled,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useAddBookingMutation } from "@/redux/api/bookingApi";
import styles from "./book.module.css";

type IDProps = {
  params: Promise<{ id: string }>;
};

const BookReservation = ({ params }: IDProps) => {
  const { id } = use(params);
  const userLoggedIn = isLoggedIn();
  const router = useRouter();
  const { message } = App.useApp();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedSeats, setSelectedSeats] = useState<
    Array<{ bus_SitId: string; sitNumber: string }>
  >([]);

  const {
    data,
    isLoading: scheduleLoading,
  } = useSingleScheduleQuery(id);
  const {
    data: availableSit,
    isError: availableSitError,
  } = useAvailableSitsQuery(id);
  const { data: bus } = useGetSingleBusQuery(data?.data?.busId);
  const { data: userData } = useMyProfileQuery({});

  const schedule = data?.data;
  const busFare = schedule?.busFare ?? 0;

  useEffect(() => {
    if (userLoggedIn) {
      setIsLoading(!!availableSitError);
    } else {
      router.push("/login");
    }
  }, [router, userLoggedIn, availableSit, availableSitError]);

  // Fast lookup of which seat numbers are still available
  const availableNumbers = useMemo(
    () =>
      new Set((availableSit?.data || []).map((s: any) => s.sitNumber)),
    [availableSit]
  );

  const isSelected = (sitId: string) =>
    selectedSeats.some((s) => s.bus_SitId === sitId);

  const toggleSeat = (sitId: string, sitNumber: string) => {
    setSelectedSeats((prev) =>
      prev.some((s) => s.bus_SitId === sitId)
        ? prev.filter((s) => s.bus_SitId !== sitId)
        : [...prev, { bus_SitId: sitId, sitNumber }]
    );
  };

  const seatCount = selectedSeats.length;
  const totalPrice = seatCount * busFare;

  function renderStars(rating: number) {
    const value = Number.isFinite(rating) ? rating : 0;
    return (
      <span className={styles.stars}>
        {Array.from({ length: 5 }).map((_, i) => (
          <StarFilled
            key={i}
            style={{ color: i < Math.round(value) ? "#e9c46a" : "#d5dbdc" }}
          />
        ))}
      </span>
    );
  }

  const [addBooking] = useAddBookingMutation();

  const makeBooking = async () => {
    try {
      const res = await addBooking({
        sits: selectedSeats.map(({ bus_SitId }) => ({ bus_SitId })),
        busScheduleId: schedule?.id,
      }).unwrap();
      if (res.statusCode == 200) {
        message.success(res.message);
        router.push("/user/my-pending-bookings");
      }
    } catch (error: any) {
      message.error(error?.data?.message || "Booking failed");
    }
  };

  if (isLoading || scheduleLoading) {
    return <Loading />;
  }

  return (
    <div className={styles.page}>
      {/* Route header */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.badge}>
            <BookOutlined /> Reserve your seats
          </span>
          <div className={styles.route}>
            <h1>
              {schedule?.startingPoint}
              <ArrowRightOutlined className={styles.arrow} />
              {schedule?.endPoint}
            </h1>
          </div>
          <div className={styles.heroMeta}>
            <span className={styles.metaChip}>
              <CalendarOutlined /> {schedule?.dayOfWeek} · {schedule?.startDate}
            </span>
            <span className={styles.metaChip}>
              <ClockCircleOutlined /> {schedule?.startTime} – {schedule?.endTime}
            </span>
            <span className={styles.metaChip}>
              <DollarCircleOutlined /> ৳{busFare} / seat
            </span>
            {bus?.data?.busNumber && (
              <span className={styles.metaChip}>
                <IdcardOutlined /> {bus?.data?.busNumber}
              </span>
            )}
          </div>
        </div>
      </section>

      <div className={styles.wrap}>
        {/* Left column */}
        <div>
          {/* Seat map */}
          <div className={styles.card}>
            <div className={styles.cardHead}>
              <BookOutlined className={styles.ic} />
              <h2>Choose your seats</h2>
            </div>
            <div className={styles.legend}>
              <span className={styles.legendItem}>
                <span className={`${styles.swatch} ${styles.free}`} /> Available
              </span>
              <span className={styles.legendItem}>
                <span className={`${styles.swatch} ${styles.sel}`} /> Selected
              </span>
              <span className={styles.legendItem}>
                <span className={`${styles.swatch} ${styles.taken}`} /> Booked
              </span>
            </div>
            <div className={styles.deck}>
              {bus?.data?.bus_Sits?.map((sit: any) => {
                const taken = !availableNumbers.has(sit.sitNumber);
                const selected = isSelected(sit.id);
                return (
                  <button
                    key={sit.id}
                    type="button"
                    disabled={taken}
                    onClick={() => toggleSeat(sit.id, sit.sitNumber)}
                    className={`${styles.seat} ${
                      selected ? styles.seatSelected : ""
                    } ${taken ? styles.seatTaken : ""}`}
                  >
                    {sit.sitNumber}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Passenger info */}
          <div className={styles.card}>
            <div className={styles.cardHead}>
              <UserOutlined className={styles.ic} />
              <h2>Passenger information</h2>
            </div>
            <div className={styles.pax}>
              <span className={styles.paxRow}>
                <UserOutlined className={styles.ic} /> Name:&nbsp;
                <b>{userData?.data?.name || "—"}</b>
              </span>
              <span className={styles.paxRow}>
                <MailOutlined className={styles.ic} /> Email:&nbsp;
                <b>{userData?.data?.email || "—"}</b>
              </span>
              <span className={styles.paxRow}>
                <PhoneOutlined className={styles.ic} /> Contact:&nbsp;
                <b>{userData?.data?.contactNo || "—"}</b>
              </span>
            </div>
          </div>

          {/* Trip details */}
          <div className={styles.card}>
            <div className={styles.cardHead}>
              <CheckCircleOutlined className={styles.ic} />
              <h2>Trip details</h2>
            </div>
            <div className={styles.detailGrid}>
              <div className={styles.detail}>
                <span className={styles.label}>Journey date</span>
                <span className={styles.value}>{schedule?.startDate}</span>
              </div>
              <div className={styles.detail}>
                <span className={styles.label}>Valid until</span>
                <span className={styles.value}>{schedule?.endDate}</span>
              </div>
              <div className={styles.detail}>
                <span className={styles.label}>Day of journey</span>
                <span className={styles.value}>{schedule?.dayOfWeek}</span>
              </div>
              <div className={styles.detail}>
                <span className={styles.label}>Seat fare</span>
                <span className={styles.value}>৳{busFare}</span>
              </div>
              <div className={styles.detail}>
                <span className={styles.label}>Departure</span>
                <span className={styles.value}>{schedule?.startTime}</span>
              </div>
              <div className={styles.detail}>
                <span className={styles.label}>Arrival</span>
                <span className={styles.value}>{schedule?.endTime}</span>
              </div>
              <div className={styles.detail}>
                <span className={styles.label}>From</span>
                <span className={styles.value}>{schedule?.startingPoint}</span>
              </div>
              <div className={styles.detail}>
                <span className={styles.label}>To</span>
                <span className={styles.value}>{schedule?.endPoint}</span>
              </div>
            </div>
          </div>

          {/* Driver details */}
          <div className={styles.card}>
            <div className={styles.cardHead}>
              <TeamOutlined className={styles.ic} />
              <h2>Driver details</h2>
            </div>
            <div className={styles.detailGrid}>
              <div className={styles.detail}>
                <span className={styles.label}>Driver name</span>
                <span className={styles.value}>
                  {schedule?.driver?.user?.name || "—"}
                </span>
              </div>
              <div className={styles.detail}>
                <span className={styles.label}>Gender</span>
                <span className={styles.value}>
                  {schedule?.driver?.user?.gender || "—"}
                </span>
              </div>
              <div className={styles.detail}>
                <span className={styles.label}>Date of birth</span>
                <span className={styles.value}>
                  {schedule?.driver?.user?.DOB || "—"}
                </span>
              </div>
              <div className={styles.detail}>
                <span className={styles.label}>Rating</span>
                <span className={styles.value}>
                  {renderStars(schedule?.driver?.rating)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right column — sticky summary */}
        <div className={styles.summary}>
          <div className={styles.card}>
            <div className={styles.cardHead}>
              <BookOutlined className={styles.ic} />
              <h2>Your booking</h2>
            </div>
            <div className={styles.sumRow}>
              <span>Fare per seat</span>
              <b>৳{busFare}</b>
            </div>
            <div className={styles.sumRow}>
              <span>Seats selected</span>
              <b>{seatCount}</b>
            </div>

            {seatCount > 0 ? (
              <div className={styles.chips}>
                {selectedSeats.map((s) => (
                  <span key={s.bus_SitId} className={styles.seatChip}>
                    {s.sitNumber}
                  </span>
                ))}
              </div>
            ) : (
              <p className={styles.empty}>Tap a seat above to select it.</p>
            )}

            <div className={styles.divider} />
            <div className={styles.total}>
              <span className={styles.k}>Total</span>
              <span className={styles.v}>৳{totalPrice}</span>
            </div>

            <Button
              type="primary"
              className={styles.cta}
              onClick={makeBooking}
              disabled={seatCount === 0}
            >
              Book {seatCount > 0 ? `${seatCount} seat${seatCount > 1 ? "s" : ""}` : "your seats"} now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookReservation;
