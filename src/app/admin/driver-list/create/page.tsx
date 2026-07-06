"use client";

import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import UMBreadCrumb from "@/components/ui/HHBreadCrumb";
import { genderOptions } from "@/constants/global";
import { useCreateDriverMutation } from "@/redux/api/driverApi";
import { App, Button, Col, Row } from "antd";
import { useRouter } from "next/navigation";

const CreateDriver = () => {
  const { message } = App.useApp();
  const [createDriver] = useCreateDriverMutation();
  const router = useRouter();
  const onSubmit = async (data: any) => {
    data.salary = parseInt(data?.salary);
    try {
      const res = await createDriver({ ...data }).unwrap();
      if (res?.success === true) {
        message.success(res?.message);
        router.push("/admin/driver-list");
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
    <>
      <UMBreadCrumb
        items={[
          { label: `${base}`, link: `/${base}` },
          { label: "driver-list", link: `/${base}/driver-list` },
        ]}
      />
      <h1 style={{ margin: "15px 0" }}>Create Driver</h1>
      <Form submitHandler={onSubmit}>
        {/* faculty information */}
        <div
          style={{
            border: "1px solid #d9d9d9",
            borderRadius: "5px",
            padding: "15px",
            marginBottom: "10px",
          }}
        >
          <p style={{ fontSize: "18px", fontWeight: "500", margin: "5px 0px" }}>
            Basic information
          </p>
          <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
            <Col span={8} style={{ margin: "10px 0" }}>
              <FormInput name="user.name" label="Full name" size="large" />
            </Col>

            <Col span={8} style={{ margin: "10px 0" }}>
              <FormInput
                type="email"
                name="user.email"
                label="Email address"
                size="large"
              />
            </Col>

            <Col span={8} style={{ margin: "10px 0" }}>
              <FormInput
                type="password"
                name="user.password"
                label="Password"
                size="large"
              />
            </Col>

            <Col span={8} style={{ margin: "10px 0" }}>
              <FormSelectField
                name="user.gender"
                label="Gender"
                options={genderOptions}
              />
            </Col>
            <Col span={8} style={{ margin: "10px 0" }}>
              <FormDatePicker name="user.DOB" label="Date of birth" />
            </Col>
            <Col span={8} style={{ margin: "10px 0" }}>
              <FormInput
                name="user.contactNo"
                label="Contact no."
                size="large"
              />
            </Col>
            <Col span={12} style={{ margin: "10px 0" }}>
              <FormTextArea name="user.address" label="Address" rows={4} />
            </Col>
          </Row>
        </div>
        {/* basic information  */}
        <div
          style={{
            border: "1px solid #d9d9d9",
            borderRadius: "5px",
            padding: "15px",
            marginBottom: "10px",
          }}
        >
          <p style={{ fontSize: "18px", fontWeight: "500", margin: "5px 0px" }}>
            Driver information
          </p>
          <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
            <Col span={8} style={{ margin: "10px 0" }}>
              <FormInput
                type="number"
                name="salary"
                label="Driver Salary"
                size="large"
              />
            </Col>
          </Row>
        </div>
        <Button htmlType="submit" type="primary">
          submit
        </Button>
        <Button
          style={{ backgroundColor: "#218380", marginLeft: "10px" }}
          onClick={handleBack}
        >
          Back
        </Button>
      </Form>
    </>
  );
};

export default CreateDriver;
