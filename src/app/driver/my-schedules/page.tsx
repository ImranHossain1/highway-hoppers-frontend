"use client";
import TableRow from "@/components/ui/TableRow";

import React, { useState } from "react";
import dayjs from "dayjs";
import UMTable from "@/components/ui/UMTable";
import UMBreadCrumb from "@/components/ui/HHBreadCrumb";
import ActionBar from "@/components/ui/ActionBar";
import { App, Button, Col, Input, Row, Select, Space } from "antd";
import { useDebounced } from "@/redux/hooks";
import Link from "next/link";
import {
  EditOutlined,
  ReloadOutlined,
  StepForwardOutlined,
} from "@ant-design/icons";
import {
  useDriverSchedulesQuery,
  useSchedulesQuery,
  useUpdateStatusMutation,
} from "@/redux/api/scheduleApi";
import { busScheduleStatus, pointsOption } from "@/constants/global";
import HHModal from "@/components/ui/HHModal";
const MySchedules = () => {
  const { message } = App.useApp();
  const query: Record<string, any> = {};
  const [size, setSize] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [status, setStatus] = useState<string>("Upcoming");
  const [startingPoint, setStartingPoint] = useState<string>("");

  //Modal
  const [open, setOpen] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>("");
  const [scheduleId, setScheduleId] = useState<string>("");
  const [journeyStatus, setJourneyStatus] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  query["status"] = status;
  /* if (startingPoint !== "") {
    query["startingPoint"] = startingPoint;
  } */
  if (!!startingPoint) {
    query["startingPoint"] = startingPoint;
  }
  const getNestedValue = (obj: any, path: any) => {
    const keys = path.split(".");
    return keys.reduce(
      (acc: any, key: any) =>
        acc && acc[key] !== undefined ? acc[key] : undefined,
      obj
    );
  };
  const handleChange = (value: string) => {
    setJourneyStatus(value);
  };
  const ScheduleStatusChange = (value: string) => {
    setStatus(value);
  };
  const ScheduleStartPointChange = (value: string) => {
    setStartingPoint(value);
  };
  const { data, isLoading, refetch } = useDriverSchedulesQuery({ ...query });
  const schedules = data?.schedules;
  const meta = data?.meta;
  const [updateStatus] = useUpdateStatusMutation();

  const updateScheduleStatus = async () => {
    const status = {
      status: journeyStatus,
    };
    message.success("Updating...");
    try {
      const res = await updateStatus({
        ...status,
        id: scheduleId,
      }).unwrap();
      if (res?.success === true) {
        message.success(res?.message);
        setScheduleId("");
        setJourneyStatus("");
        refetch();
        setOpen(false);
      } else {
        message.error(res?.message);
      }
    } catch (err: any) {
      message.error(err?.data?.message || "Something went wrong");
    }
  };
  const filteredSchedules = schedules?.filter((schedule: any) => {
    const searchFields = [
      "bus.busNumber",
      "bus.totalSit",
      "busFare",
      "startingPoint",
      "endPoint",
      "startTime",
      "startDate",
      "dayOfWeek",
      "status",
      "driver.user.name",
    ];

    // Check if the search term matches any of the specified fields
    return searchFields.some((field) =>
      String(getNestedValue(schedule, field))
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  });
  const columns = [
    {
      title: "Bus Number",
      dataIndex: "bus",
      render: function (data: any) {
        return data && data.busNumber;
      },
    },
    {
      title: "Total Sit",
      dataIndex: "bus",
      render: function (data: any) {
        return data && data.totalSit;
      },
    },
    {
      title: "Fare",
      dataIndex: "busFare",
    },
    {
      title: "Start Point",
      dataIndex: "startingPoint",
    },
    {
      title: "End Point",
      dataIndex: "endPoint",
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
    },
    {
      title: "Day of Week",
      dataIndex: "dayOfWeek",
    },
    {
      title: "Journey Status",
      dataIndex: "status",
    },
    {
      title: "Driver Name",
      dataIndex: "driver",
      render: function (data: any) {
        return data && data.user.name;
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
            {data.status !== "Arrived" && (
              <Button
                onClick={() => {
                  setOpen(true);
                  setScheduleId(data.id);
                  setModalTitle("Update your review");
                  setJourneyStatus(data.status);
                }}
                type="primary"
                style={{ margin: "0 5px", backgroundColor: "#218380" }}
              >
                <StepForwardOutlined />
              </Button>
            )}
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
    setStartingPoint("");
    setStatus("Upcoming");
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
        <Input
          type="text"
          size="large"
          placeholder="Search...."
          style={{ width: "20%" }}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        ></Input>

        <div>
          <Select
            defaultValue="Starting point"
            style={{ width: 120 }}
            onChange={ScheduleStartPointChange}
            options={pointsOption}
          />
          <Select
            value={status}
            style={{ width: 120, marginLeft: "10px" }}
            onChange={ScheduleStatusChange}
            options={busScheduleStatus}
          />

          <Link
            href="/admin/bus-schedules/create"
            style={{ marginLeft: "10px" }}
          >
            <Button type="primary">Create New Schedule</Button>
          </Link>

          {(!!sortBy ||
            !!sortOrder ||
            !!searchTerm ||
            !!startingPoint ||
            status !== "Upcoming") && (
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
        dataSource={filteredSchedules}
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
        handleOk={() => updateScheduleStatus()}
      >
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <Space wrap>
              <Select
                defaultValue={journeyStatus}
                style={{ width: 120 }}
                onChange={handleChange}
                options={busScheduleStatus}
              />
            </Space>
          </Col>
        </Row>
      </HHModal>
    </div>
  );
};

export default MySchedules;
