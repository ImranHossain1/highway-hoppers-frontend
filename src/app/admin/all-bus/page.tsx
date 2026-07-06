"use client";
import UMBreadCrumb from "@/components/ui/HHBreadCrumb";
import UMTable from "@/components/ui/UMTable";

import { App, Button, Input, Radio, RadioChangeEvent, Select } from "antd";
import Link from "next/link";
import { useState } from "react";
import dayjs from "dayjs";
import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import ActionBar from "@/components/ui/ActionBar";
import { useDebounced } from "@/redux/hooks";
import { useBusListQuery } from "@/redux/api/busApi";
import { Option } from "antd/es/mentions";
const AllBus = () => {
  const { message } = App.useApp();
  const query: Record<string, any> = {};
  const [size, setSize] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [value, setValue] = useState("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  if (value !== "") {
    query["busType"] = value;
  }
  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });
  if (!!debouncedTerm) {
    query["searchTerm"] = searchTerm;
  }
  const { data, isLoading } = useBusListQuery({ ...query });
  const buses = data?.buses;
  const meta = data?.meta;

  const BusTypeChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };
  const columns = [
    {
      title: "Bus Number",
      dataIndex: "busNumber",
    },
    {
      title: "Bus Type",
      dataIndex: "busType",
    },
    {
      title: "Total Sit",
      dataIndex: "totalSit",
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      render: function (date: any) {
        return date && dayjs(date).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
      // sorter: (a: any, b: any) => b.age - a.age,
    },
    {
      title: "Action",
      render: function (data: any) {
        return (
          <>
            <Link href={`/admin/all-bus/update/${data?.id}`}>
              <Button type="primary" style={{ margin: "0 5px" }}>
                <EditOutlined />
              </Button>
            </Link>
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
    setValue("");
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

      <ActionBar title="Bus List">
        <Input
          type="text"
          size="large"
          placeholder="Search Bus Number...."
          style={{ width: "20%" }}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        ></Input>
        <div>
          <Radio.Group
            onChange={BusTypeChange}
            value={value}
            style={{ margin: "0 5px" }}
          >
            <Radio value="AC" style={{ fontWeight: "bold" }}>
              AC
            </Radio>
            <Radio value="Non_AC" style={{ fontWeight: "bold" }}>
              NON AC
            </Radio>
          </Radio.Group>

          <Link href="/admin/all-bus/create">
            <Button type="primary">Create New Bus</Button>
          </Link>

          {(!!sortBy || !!sortOrder || !!searchTerm || !!value) && (
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
        dataSource={buses}
        pageSize={size}
        total={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      ></UMTable>
    </div>
  );
};

export default AllBus;
