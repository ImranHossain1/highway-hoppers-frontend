"use client";

import { Button } from "antd";
import Link from "next/link";
import { StepForwardOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { useState } from "react";
import UMTable from "@/components/ui/UMTable";
import styles from "../ui/Homepage/home.module.css";
import { useSchedulesQuery } from "@/redux/api/scheduleApi";

type SearchOptions = {
  startingPoint?: string;
  endPoint?: string;
  startDate?: string;
};

const TableRow = ({ searchParams }: { searchParams?: SearchOptions }) => {
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  let startingPoint = "";
  let startDate = "";
  let endPoint = "";

  if (searchParams) {
    if (searchParams.startingPoint) {
      startingPoint = searchParams.startingPoint;
    }

    if (searchParams.startDate) {
      startDate = searchParams.startDate;
    }

    if (searchParams.endPoint) {
      endPoint = searchParams.endPoint;
    }
  }

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  query["status"] = "Upcoming";
  if (startDate) {
    query["startDate"] = startDate;
  }

  if (endPoint) {
    query["endPoint"] = endPoint;
  }

  if (startingPoint) {
    query["startingPoint"] = startingPoint;
  }

  const { data, isLoading } = useSchedulesQuery({ ...query });
  const schedules = data?.schedules ?? [];
  const total = data?.meta?.total ?? 0;
  const columns = [
    {
      title: "Start Point",
      dataIndex: "startingPoint",
    },
    {
      title: "End Point",
      dataIndex: "endPoint",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
    },
    {
      title: "End Time",
      dataIndex: "endTime",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
    },
    {
      title: "Available Sit",
      render: function (data: any) {
        return data && data.bus.totalSit - data.PendingSit;
      },
    },
    {
      title: "Bus Fare",
      dataIndex: "busFare",
      sorter: true,
    },
    {
      title: "Action",
      dataIndex: "id",
      render: function (data: any) {
        return (
          <Link href={`/book-now/${data}`}>
            <Button type="primary">
              Select <StepForwardOutlined />
            </Button>
          </Link>
        );
      },
    },
  ];
  const onPaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setSize(pageSize);
  };
  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    setSortBy(field as string);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };

  return (
    <div className={styles.panel}>
      <div className={styles.panelHead}>
        <span className={styles.pIcon}>
          <UnorderedListOutlined />
        </span>
        <div>
          <h2>Available journeys</h2>
          <p style={{ margin: 0, color: "var(--muted)", fontSize: "0.9rem" }}>
            {total ? `${total} trips found` : "Browse upcoming trips"}
          </p>
        </div>
      </div>

      <UMTable
        loading={isLoading}
        columns={columns}
        dataSource={schedules}
        pageSize={size}
        total={total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />
    </div>
  );
};

export default TableRow;
