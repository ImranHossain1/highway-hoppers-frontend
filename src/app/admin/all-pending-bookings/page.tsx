"use client";
import TableRow from "@/components/ui/TableRow";
import {
  useCancelSingleBookingMutation,
  useGetAllPendingBookingsQuery,
} from "@/redux/api/bookingApi";
import React, { useState } from "react";
import dayjs from "dayjs";
import UMTable from "@/components/ui/UMTable";
import UMBreadCrumb from "@/components/ui/HHBreadCrumb";
import ActionBar from "@/components/ui/ActionBar";
import { App, Button, Input } from "antd";
import { useDebounced } from "@/redux/hooks";
import Link from "next/link";
import { DeleteOutlined, ReloadOutlined } from "@ant-design/icons";
import HHModal from "@/components/ui/HHModal";
const AllPendingBooking = () => {
  const { message } = App.useApp();
  const query: Record<string, any> = {};
  const [size, setSize] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [modalTitle, setModalTitle] = useState<string>("");
  const [bookingId, setBookingId] = useState<string>("");
  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });
  if (!!debouncedTerm) {
    query["searchTerm"] = searchTerm;
  }
  const { data, isLoading } = useGetAllPendingBookingsQuery({ ...query });
  const bookings = data?.bookings;
  const meta = data?.meta;
  const [cancelSingleBooking] = useCancelSingleBookingMutation();

  const cancelSinglePendingBooking = async (id: any) => {
    try {
      const res = await cancelSingleBooking(id).unwrap();
      if (res) {
        message.success(res?.message);
      }
      setOpen(false);
    } catch (error: any) {
      message.error(error.message);
    }
  };
  const columns = [
    {
      title: "Passenger Name",
      dataIndex: "user",
      render: function (data: any) {
        return data && data.name;
      },
    },
    {
      title: "Sit Number",
      dataIndex: "Bus_Sit",
      render: function (data: any) {
        return data && data.sitNumber;
      },
    },
    {
      title: "Start Time",
      dataIndex: "bus_Schedule",
      render: function (data: any) {
        return data && data.startTime;
      },
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
    },
    {
      title: "Driver Name",
      dataIndex: "bus_Schedule",
      render: function (data: any) {
        return data && data.driver.user.name;
      },
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
    },
    {
      title: "Action",
      render: function (data: any) {
        return (
          <>
            <Button
              onClick={() => {
                setOpen(true);
                setBookingId(data.id);
                setModalMessage(
                  "Are you sure you want to delete this Pending Booking?"
                );
                setModalTitle("Cancel Booking");
              }}
              type="primary"
              danger
            >
              <DeleteOutlined />
            </Button>
          </>
        );
      },
    },
  ];

  const onPaginationChange = (page: number, pageSize: number) => {
    console.log("page", page, "pageSize", pageSize);
    setPage(page);
    setSize(pageSize);
  };

  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    setSortBy(field as string);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };

  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
  };
  return (
    <div>
      <UMBreadCrumb
        items={[
          {
            label: "admin",
            link: "/admin",
          },
        ]}
      />
      <ActionBar title="All Booking List">
        <div>
          {(!!sortBy || !!sortOrder) && (
            <Button
              type="primary"
              style={{ margin: "0px 5px" }}
              onClick={resetFilters}
            >
              <ReloadOutlined />
            </Button>
          )}
        </div>
      </ActionBar>
      <UMTable
        columns={columns}
        loading={isLoading}
        dataSource={bookings}
        pageSize={size}
        total={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />
      <HHModal
        title={modalTitle}
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={() => cancelSinglePendingBooking(bookingId)}
      >
        <p className="my-5">{modalMessage}</p>
      </HHModal>
    </div>
  );
};

export default AllPendingBooking;
