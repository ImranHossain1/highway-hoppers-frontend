"use client";
import TableRow from "@/components/ui/TableRow";

import React, { useState } from "react";
import dayjs from "dayjs";
import UMTable from "@/components/ui/UMTable";
import UMBreadCrumb from "@/components/ui/HHBreadCrumb";
import ActionBar from "@/components/ui/ActionBar";
import { App, Button, Col, Input, Row, Select, Space } from "antd";

import { ReloadOutlined } from "@ant-design/icons";

import { useGetAllReviewsQuery } from "@/redux/api/reviewApi";
import { useDriverListQuery } from "@/redux/api/driverApi";
const Reviews = () => {
  const { message } = App.useApp();
  const query: Record<string, any> = {};
  const [size, setSize] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [driverQuery, setDriverQuery] = useState<string>("");
  const [startingPoint, setStartingPoint] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

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

  const searchByDriver = (value: string) => {
    setDriverQuery(value); // Set the selected driver for future reference
  };

  const { data, isLoading, refetch } = useGetAllReviewsQuery({ ...query });
  const reviews = data?.reviews;
  const meta = data?.meta;

  const { data: driverList } = useDriverListQuery({ ...query });
  const drivers = driverList?.drivers;
  const driverOptions = drivers?.map((driver: any) => ({
    label: driver?.user.name, // Assuming the name is the property you want to use as the label
    value: driver?.user.name, // Assuming the driver ID is the property you want to use as the value
  }));

  const filteredReviews = reviews?.filter((schedule: any) => {
    const searchFields = [
      "user.name",
      "booking.bus_Schedule.driver.user.name",
      "rating",
    ];

    // Check if the search term matches any of the specified fields
    const searchTermMatches = searchFields.some((field) =>
      String(getNestedValue(schedule, field))
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

    // Check if the selected driver matches
    const driverMatches =
      !driverQuery || // If no driver is selected, don't filter by driver
      String(getNestedValue(schedule, "booking.bus_Schedule.driver.user.name"))
        .toLowerCase()
        .includes(driverQuery.toLowerCase());

    return searchTermMatches && driverMatches;
  });

  const columns = [
    {
      title: "Passenger Name",
      dataIndex: "user",
      render: function (data: any) {
        return data && data.name;
      },
    },
    {
      title: "Driver  Name",
      dataIndex: "booking",
      render: function (data: any) {
        return data && data.bus_Schedule.driver.user.name;
      },
    },
    {
      title: "Review",
      dataIndex: "review",
    },
    {
      title: "Rating",
      dataIndex: "rating",
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
    setDriverQuery("");
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
            placeholder="Search By Driver..."
            style={{ width: 240, marginLeft: "10px" }}
            onChange={searchByDriver}
            options={driverOptions}
          />
          {(!!sortBy ||
            !!sortOrder ||
            !!searchTerm ||
            !!startingPoint ||
            !!driverQuery) && (
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
        dataSource={filteredReviews}
        pageSize={size}
        total={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />
    </div>
  );
};

export default Reviews;
