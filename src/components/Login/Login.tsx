"use client";
import { Button, Col, Divider, Row, message } from "antd";
import loginImage from "../../assets/login-image.png";
import Image from "next/image";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { SubmitHandler } from "react-hook-form";
import { useUserLoginMutation } from "@/redux/api/authApi";
import { storeUserInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "../ui/Homepage/homepage.module.css";
type FormValues = {
  id: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();

  const [userLogin] = useUserLoginMutation();

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
      const res = await userLogin({ ...data }).unwrap();
      if (res?.success === true) {
        message.success(res?.message);
        storeUserInfo({ accessToken: res?.data?.accessToken });
        router.push("/");
      } else {
        message.error(res?.message);
      }
    } catch (err: any) {
      console.log(err);
      message.error(err);
    }
  };

  return (
    <div className={styles.loginPage}>
      <div style={{ padding: "15px" }}>
        <Image
          className={styles.responsiveImage}
          src={loginImage}
          width={500}
          height={500}
          alt="login image"
        />
      </div>
      <div style={{ padding: "15px" }}>
        <h1
          style={{
            margin: "15px 0px",
          }}
        >
          First login your account
        </h1>
        <div>
          <Form submitHandler={onSubmit}>
            <div>
              <FormInput
                name="email"
                type="email"
                size="large"
                label="User Email"
              />
            </div>
            <div
              style={{
                margin: "15px 0px",
              }}
            >
              <FormInput
                name="password"
                type="password"
                size="large"
                label="User Password"
              />
            </div>
            <div style={{ textAlign: "center" }}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%", color: "black" }}
              >
                Login
              </Button>
              <Divider plain>Do not have any account? </Divider>
              <Link href="/sign-up" style={{ marginTop: "10px" }}>
                <Button
                  type="default"
                  htmlType="submit"
                  style={{
                    width: "100%",
                    backgroundColor: "#2a9d8f",
                    color: "white",
                  }}
                >
                  Sign up
                </Button>
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
