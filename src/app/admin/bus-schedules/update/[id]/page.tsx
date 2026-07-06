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
import {
  useAddScheduleMutation,
  useSchedulesQuery,
  useSingleScheduleQuery,
  useUpdateScheduleMutation,
} from "@/redux/api/scheduleApi";
import { App, Button, Col, Row } from "antd";
import { useRouter } from "next/navigation";
import { DatePicker, Space } from "antd";
import FormDayPicker from "@/components/Forms/FormDayPicker";
import DriverField from "@/components/Forms/DriverField";
import BusField from "@/components/Forms/BusField";
import { use } from "react";
type IDProps = {
  params: Promise<{ id: string }>;
};
const UpdateSchedule = ({ params }: IDProps) => {
  const { message } = App.useApp();
  const { id } = use(params);
  const router = useRouter();
  const { data, isLoading } = useSingleScheduleQuery(id);
  const scheduleData = data?.data;

  const [updateSchedule] = useUpdateScheduleMutation();
  const handleBack = () => {
    router.back();
  };
  const onSubmit = async (data: any) => {
    data.busFare = parseInt(data?.busFare);

    message.success("Updating...");
    try {
      const res = await updateSchedule({
        ...data,
        id: scheduleData.id,
      }).unwrap();
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

  const defaultValues: {
    startTime: string;
    endTime: string;
    startDate: string;
    endDate: string;
    startingPoint: string;
    endPoint: string;
    dayOfWeek: string;
    busFare: string;
    driverId: string;
    busId: string;
  } = {
    startTime: scheduleData?.startTime,
    endTime: scheduleData?.endTime,
    startDate: scheduleData?.startDate,
    endDate: scheduleData?.endDate,
    startingPoint: scheduleData?.startingPoint,
    endPoint: scheduleData?.endPoint,
    dayOfWeek: scheduleData?.dayOfWeek,
    busFare: scheduleData?.busFare,
    driverId: scheduleData?.driverId,
    busId: scheduleData?.busId,
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
      <h1 style={{ margin: "15px 0" }}>Update Bus Schedules</h1>
      <Form submitHandler={onSubmit} defaultValues={defaultValues}>
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
              <FormDatePicker name="startDate" label="Staring Date" />
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
            <Col span={6} style={{ margin: "10px 0" }}>
              <FormSelectField
                name="dayOfWeek"
                size="large"
                options={daysOptions}
                label="Day of journey"
                placeholder="Select"
              />{" "}
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

export default UpdateSchedule;
