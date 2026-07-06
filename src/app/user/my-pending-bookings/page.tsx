"use client";
import {
  useCancelBookingMutation,
  useCancelSingleBookingMutation,
  useConfirmBookingMutation,
  useGetUserPendingBookingsQuery,
} from "@/redux/api/bookingApi";
import React, { useState } from "react";
import dayjs from "dayjs";
import UMTable from "@/components/ui/UMTable";
import UMBreadCrumb from "@/components/ui/HHBreadCrumb";
import { App, Button } from "antd";
import Link from "next/link";
import ActionBar from "@/components/ui/ActionBar";
import HHModal from "@/components/ui/HHModal";
import { DeleteColumnOutlined, DeleteOutlined } from "@ant-design/icons";

const MyPendingBookings = () => {
  const { message } = App.useApp();
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [open, setOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [modalTitle, setModalTitle] = useState<string>("");
  const [bookingId, setBookingId] = useState<string>("");
  const [actionType, setActionType] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  const { data, isLoading, error } = useGetUserPendingBookingsQuery({});
  const pendingData: any = data?.data?.data;
  const emptyMessage =
    (error as any)?.data?.message ||
    data?.message ||
    "You don't have any pending bookings.";
  const [confirmBooking] = useConfirmBookingMutation();
  const [cancelSingleBooking] = useCancelSingleBookingMutation();
  const [cancelBooking] = useCancelBookingMutation();

  const confirmPendingBooking = async () => {
    try {
      const res = await confirmBooking({}).unwrap();
      if (res) {
        message.success(res?.message);
      }
      setOpen(false);
    } catch (error: any) {
      message.error(error.message);
    }
  };
  const cancelAllPendingBooking = async () => {
    try {
      const res = await cancelBooking({}).unwrap();
      if (res) {
        message.success(res?.message);
      }
      setOpen(false);
    } catch (error: any) {
      message.error(error.message);
    }
  };
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
                setActionType("delete");
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
      <ActionBar title="Pending Booking">
        <div></div>
        <div>
          {!!data?.success && (
            <>
              <Button
                type="primary"
                style={{ margin: "0px 5px" }}
                onClick={() => {
                  setOpen(true);

                  setModalMessage(
                    "Are you sure you want to confirm your Booking?"
                  );
                  setModalTitle("Confirm Booking");
                  setActionType("confirm");
                }}
              >
                Confirm All Pending booking
              </Button>
              <Button
                onClick={() => {
                  setOpen(true);
                  setModalMessage(
                    "Are you sure you want to Cancel all your Pending Booking?"
                  );
                  setModalTitle("Cancel All Pending Booking");
                  setActionType("cancel");
                }}
                type="primary"
                danger
              >
                Cancel All Pending booking
              </Button>
            </>
          )}
        </div>
      </ActionBar>
      {!data?.success ? (
        <p style={{ marginTop: "10px", fontWeight: "700", color: "red" }}>
          {emptyMessage}
        </p>
      ) : (
        <>
          <UMTable
            loading={isLoading}
            columns={columns}
            dataSource={pendingData}
            pageSize={size}
            showSizeChanger={true}
            showPagination={true}
          />
          <HHModal
            title={modalTitle}
            isOpen={open}
            closeModal={() => setOpen(false)}
            handleOk={() => {
              if (actionType === "confirm") {
                confirmPendingBooking();
              } else if (actionType === "cancel") {
                cancelAllPendingBooking();
              } else if (actionType === "delete") {
                cancelSinglePendingBooking(bookingId);
              }
            }}
          >
            <p className="my-5">{modalMessage}</p>
          </HHModal>
        </>
      )}
    </div>
  );
};

export default MyPendingBookings;
