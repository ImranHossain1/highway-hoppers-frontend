"use client";
import UMBreadCrumb from "@/components/ui/HHBreadCrumb";
import { App, Button, Col, Row } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import { departmentSchema } from "@/schemas/department";
import { useRouter } from "next/navigation";
import { useCreateBusMutation } from "@/redux/api/busApi";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import { busTypeOption } from "@/constants/global";

const CreateBus = () => {
  const { message } = App.useApp();
  const [createBus] = useCreateBusMutation();
  const router = useRouter();
  const onSubmit = async (data: any) => {
    data.totalSit = parseInt(data?.totalSit);
    try {
      const res = await createBus({ ...data }).unwrap();
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
  const base = "admin";
  return (
    <div>
      <UMBreadCrumb
        items={[
          { label: `${base}`, link: `/${base}` },
          { label: "bus-list", link: `/${base}/all-bus` },
        ]}
      />
      <h1>Create Bus</h1>
      <Form submitHandler={onSubmit}>
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
          add
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

export default CreateBus;
