"use client";
import TableRow from "@/components/ui/TableRow";
import { useGetUserConfirmedBookingsQuery } from "@/redux/api/bookingApi";
import React, { useState } from "react";
import dayjs from "dayjs";
import UMTable from "@/components/ui/UMTable";
import UMBreadCrumb from "@/components/ui/HHBreadCrumb";
import ActionBar from "@/components/ui/ActionBar";
import { Input } from "antd";
import { useDebounced } from "@/redux/hooks";
import Link from "next/link";
const MyBookings = () => {
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);

  query["limit"] = size;
  query["page"] = page;
  const { data, isLoading } = useGetUserConfirmedBookingsQuery({});
  const all_bookings = data?.data;
  console.log(all_bookings);

  const columns = [
    {
      title: "Sit Number",
      dataIndex: "Bus_Sit",
      render: function (data: any) {
        return data && data.sitNumber;
      },
      sorter: true,
    },
    {
      title: "Start Time",
      dataIndex: "bus_Schedule",
      render: function (data: any) {
        return data && data.startTime;
      },
      sorter: true,
    },
    {
      title: "Journey Date",
      dataIndex: "bus_Schedule",
      render: function (data: any) {
        return data && data.startDate;
      },
      sorter: true,
    },
    {
      title: "Booking Status",
      dataIndex: "bookingStatus",
      sorter: true,
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
    },
  ];
  return (
    <div>
      <UMBreadCrumb
        items={[
          {
            label: "User",
            link: "/user",
          },
        ]}
      />

      {!data?.success ? (
        <p style={{ marginTop: "10px", fontWeight: "700", color: "red" }}>
          {data?.message}
        </p>
      ) : (
        <UMTable
          loading={isLoading}
          columns={columns}
          dataSource={all_bookings}
          pageSize={size}
          showSizeChanger={true}
          showPagination={true}
        />
      )}
    </div>
  );
};

export default MyBookings;
