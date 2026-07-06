"use client";
import { Table } from "antd";
import React from "react";

type UMTableProps = {
  columns: any;
  loading?: boolean;
  dataSource?: any;
  pageSize?: number;
  total?: number;
  showSizeChanger?: boolean;
  onPaginationChange?: (page: number, pageSize: number) => void;
  onTableChange?: (pagination: any, filter: any, sorter: any) => void;
  showPagination?: boolean;
};
const UMTable = ({
  columns,
  loading = false,
  dataSource,
  pageSize,
  total,
  showSizeChanger = true,
  onPaginationChange,
  onTableChange,
  showPagination = true,
}: UMTableProps) => {
  const paginationConfig = showPagination
    ? {
        pageSize: pageSize,
        total: total,
        pageSizeOptions: [5, 10, 20],
        showSizeChanger: showSizeChanger,
        onChange: onPaginationChange,
      }
    : false;

  return (
    <Table
      loading={loading}
      columns={columns}
      dataSource={dataSource}
      rowKey={(record: any) => record?.id ?? record?._id}
      pagination={paginationConfig}
      onChange={onTableChange}
    />
  );
};

export default UMTable;
