"use client";

import Form from "@/components/Forms/Form";
import { Button, Col, Row } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import styles from "../ui/Homepage/homepage.module.css";
import FormSelectField from "../Forms/FormSelectField";
import FormDatePicker from "../Forms/FormDatePicker";
import { useRouter } from "next/navigation";
import { pointsOption } from "@/constants/global";

type SearchOptions = {
  startingPoint?: string;
  endPoint?: string;
  startDate?: string;
};

const SearchField = ({
  searchParams,
  compact = false,
}: {
  searchParams: SearchOptions;
  compact?: boolean;
}) => {
  const router = useRouter();

  const defaultValues = {
    startingPoint: searchParams?.startingPoint || null,
    endPoint: searchParams?.endPoint || null,
    startDate: searchParams?.startDate || null,
  };

  const onSubmit = async (data: SearchOptions) => {
    const queryParams: SearchOptions = {};

    if (data.startDate) queryParams.startDate = data.startDate;
    if (data.startingPoint) queryParams.startingPoint = data.startingPoint;
    if (data.endPoint) queryParams.endPoint = data.endPoint;

    const queryString = new URLSearchParams(queryParams).toString();
    const destination = queryString ? `book-now?${queryString}` : "book-now";

    router.push(destination);
  };

  const fields = (
    <Form submitHandler={onSubmit} defaultValues={defaultValues}>
      <Row gutter={[16, 12]} align="bottom">
        <Col xs={24} md={compact ? 7 : 8}>
          <FormSelectField
            name="startingPoint"
            size="large"
            options={pointsOption}
            label="From"
            placeholder="Select origin"
          />
        </Col>
        <Col xs={24} md={compact ? 7 : 8}>
          <FormSelectField
            name="endPoint"
            size="large"
            options={pointsOption}
            label="To"
            placeholder="Select destination"
          />
        </Col>
        <Col xs={24} md={compact ? 6 : 8}>
          <FormDatePicker name="startDate" size="large" label="Travel date" />
        </Col>
        {compact ? (
          <Col xs={24} md={4}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              icon={<SearchOutlined />}
              block
            >
              Search
            </Button>
          </Col>
        ) : (
          <Col xs={24}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 8,
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                icon={<SearchOutlined />}
              >
                Find buses
              </Button>
            </div>
          </Col>
        )}
      </Row>
    </Form>
  );

  if (compact) return fields;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px 0",
      }}
    >
      <h1 style={{ textAlign: "center", margin: "20px 0" }}>
        Find your next destination
      </h1>
      <div className={styles.rawStyle} style={{ padding: "20px" }}>
        {fields}
      </div>
    </div>
  );
};

export default SearchField;
