"use client";

import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import FormTimePicker from "@/components/Forms/FormTimePicker";
import UMBreadCrumb from "@/components/ui/HHBreadCrumb";
import {
  WeekDays,
  days,
  daysOptions,
  genderOptions,
  pointsOption,
} from "@/constants/global";
import { useAddScheduleMutation } from "@/redux/api/scheduleApi";
import { App, Button, Col, Row } from "antd";
import { useRouter } from "next/navigation";
import { DatePicker, Space } from "antd";
import FormDayPicker from "@/components/Forms/FormDayPicker";
import DriverField from "@/components/Forms/DriverField";
import BusField from "@/components/Forms/BusField";

const CreateSchedules = () => {
  const { message } = App.useApp();
  const [addSchedule] = useAddScheduleMutation();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    data.busFare = parseInt(data?.busFare);

    const startDateMatch = data.startDate.match(/^(\d{4}-\d{2}-\d{2}) (\w+)$/);

    if (!startDateMatch) {
      message.error("Invalid startDate format:", data.startDate);
      return;
    }

    const [, startDate, dayOfWeekAbbreviation] = startDateMatch;

    // Map the abbreviation to the full day name
    const dayOfWeek = WeekDays.find((day) =>
      day.toLowerCase().startsWith(dayOfWeekAbbreviation.toLowerCase())
    );

    if (!dayOfWeek) {
      message.error("Invalid dayOfWeek abbreviation:", dayOfWeekAbbreviation);
      return;
    }

    const transformedData = {
      ...data,
      startDate, // "2023-12-05"
      dayOfWeek, // "Tuesday"
    };
    message.success("Creating...");
    try {
      const res = await addSchedule({ ...transformedData }).unwrap();
      if (res?.success === true) {
        message.success(res?.message);
        router.push("/admin/bus-schedules");
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
          { label: "schedules", link: `/${base}/bus-schedules` },
        ]}
      />
      <h1 style={{ margin: "15px 0" }}>Create New Schedules</h1>
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
          <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
            <Col span={6} style={{ margin: "10px 0" }}>
              <FormDayPicker name="startDate" label="Staring Date" />
            </Col>
            <Col span={6} style={{ margin: "10px 0" }}>
              <FormDatePicker name="endDate" label="Ending Date" />
            </Col>
            <Col span={6} style={{ margin: "10px 0" }}>
              <FormTimePicker name={`startTime`} label="Start time" />
            </Col>
            <Col span={6} style={{ margin: "10px 0" }}>
              <FormTimePicker name={`endTime`} label="End time" />
            </Col>
            <Col span={12} style={{ margin: "10px 0" }}>
              <FormSelectField
                name="startingPoint"
                label="Start point"
                options={pointsOption}
              />
            </Col>
            <Col span={12} style={{ margin: "10px 0" }}>
              <FormSelectField
                name="endPoint"
                label="endPoint"
                options={pointsOption}
              />
            </Col>
            <Col span={12} style={{ margin: "10px 0" }}>
              <FormInput
                type="number"
                name="busFare"
                label="Travel Fare"
                size="large"
              />
            </Col>
            <Col span={12} style={{ margin: "10px 0" }}>
              <DriverField name="driverId" label="Driver" />
            </Col>
            <Col span={12} style={{ margin: "10px 0" }}>
              <BusField name="busId" label="Bus" />
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

export default CreateSchedules;
