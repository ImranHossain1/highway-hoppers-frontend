"use client";
import { App, Button, Checkbox } from "antd";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { SubmitHandler } from "react-hook-form";
import { useUserLoginMutation } from "@/redux/api/authApi";
import { storeUserInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import {
  MailOutlined,
  LockOutlined,
  ArrowRightOutlined,
  SafetyCertificateOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import styles from "../ui/auth.module.css";

type FormValues = {
  email: string;
  password: string;
};

const perks = [
  "Book tickets across 60+ districts in seconds",
  "Pick your seat and pay securely",
  "Instant e-tickets and 24/7 support",
];

const LoginPage = () => {
  const { message } = App.useApp();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [userLogin] = useUserLoginMutation();

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    setLoading(true);
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
      message.error(err?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrap}>
      <aside className={styles.brand}>
        <div className={styles.brandTop}>
          <span className={styles.logo}>
            <SafetyCertificateOutlined />
            Highway <span>Hoppers</span>
          </span>
        </div>
        <div className={styles.brandMid}>
          <h2>Welcome back, traveller.</h2>
          <p>
            Sign in to manage your bookings, track your bus and pick up right
            where you left off.
          </p>
          <ul className={styles.brandList}>
            {perks.map((p) => (
              <li key={p}>
                <span className={styles.tick}>
                  <CheckOutlined />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.brandBottom}>
          © {new Date().getFullYear()} Highway Hoppers. All rights reserved.
        </div>
      </aside>

      <section className={styles.formSide}>
        <div className={styles.card}>
          <span className={styles.eyebrow}>Sign in</span>
          <h1>Login to your account</h1>
          <p className={styles.sub}>Enter your details to continue.</p>

          <Form submitHandler={onSubmit}>
            <div className={styles.field}>
              <div className={styles.fieldLabel}>
                <MailOutlined /> Email address
              </div>
              <FormInput
                name="email"
                type="email"
                size="large"
                placeholder="you@example.com"
                prefix={<MailOutlined style={{ color: "#9db3b0" }} />}
              />
            </div>

            <div className={styles.field}>
              <div className={styles.fieldLabel}>
                <LockOutlined /> Password
              </div>
              <FormInput
                name="password"
                type="password"
                size="large"
                placeholder="Enter your password"
                prefix={<LockOutlined style={{ color: "#9db3b0" }} />}
              />
            </div>

            <div className={styles.rowBetween}>
              <Checkbox>Remember me</Checkbox>
              <Link href="/login" className={styles.link}>
                Forgot password?
              </Link>
            </div>

            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={loading}
              className={styles.submit}
            >
              Sign in <ArrowRightOutlined />
            </Button>
          </Form>

          <p className={styles.footNote}>
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className={styles.link}>
              Create one
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
