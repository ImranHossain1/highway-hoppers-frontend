"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import UMBreadCrumb from "@/components/ui/HHBreadCrumb";
import { busTypeOption } from "@/constants/global";
import { useGetSingleBusQuery, useUpdateBusMutation } from "@/redux/api/busApi";
import { App, Button, Col, Row } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
type IDProps = {
  params: Promise<{ id: string }>;
};
const UpdateBus = ({ params }: IDProps) => {
  const { message } = App.useApp();
  const { id } = React.use(params);
  const router = useRouter();
  const { data, isLoading } = useGetSingleBusQuery(id);
  const busData = data?.data;
  const [updateBus] = useUpdateBusMutation();
  const onSubmit = async (values: any) => {
    values.totalSit = parseInt(values?.totalSit);
    const updatedData = { ...busData, ...values };

    // Identify the changed fields
    const changedFields = Object.keys(values).filter(
      (key) => values[key] !== busData[key]
    );

    if (changedFields.length === 0) {
      message.error("No changes detected.");
      return;
    }

    try {
      // Only update the changed fields
      const res = await updateBus({
        id: busData.id, // Assuming there's an 'id' field in busData
        body: Object.fromEntries(
          changedFields.map((key) => [key, updatedData[key]])
        ),
      }).unwrap();

      if (res?.success === true) {
        message.success(res?.message);
        router.push("/admin/all-bus");
      } else {
        message.error(res?.message);
      }
    } catch (err: any) {
      console.log(err);
      message.error(err?.data?.message || "Something went wrong");
    }
  };
  const handleBack = () => {
    router.back();
  };

  const defaultValues: {
    busType: string;
    busNumber: string;
    totalSit: number;
  } = {
    busType: busData?.busType || "",
    busNumber: busData?.busNumber || "",
    totalSit: busData?.totalSit || "",
  };

  const base = "admin";
  return (
    <div>
      <UMBreadCrumb
        items={[
          { label: `${base}`, link: `/${base}` },
          { label: "bus-list", link: `/${base}/all-bus` },
        ]}
      />
      <h1>Update Bus</h1>
      <Form submitHandler={onSubmit} defaultValues={defaultValues}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormInput name="busNumber" label="Bus Number" />
          </Col>
        </Row>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormInput name="totalSit" label="Number of sits" />
          </Col>
        </Row>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormSelectField
              name="busType"
              label="Type of this Bus"
              options={busTypeOption}
            />
          </Col>
        </Row>
        <Button type="primary" htmlType="submit">
          Update
        </Button>

        <Button
          style={{ backgroundColor: "#218380", marginLeft: "10px" }}
          onClick={handleBack}
        >
          Back
        </Button>
      </Form>
    </div>
  );
};

export default UpdateBus;
