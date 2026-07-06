"use client";
import { App, Button, Checkbox } from "antd";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { SubmitHandler } from "react-hook-form";
import { useUserSignUpMutation } from "@/redux/api/authApi";
import { storeUserInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  ArrowRightOutlined,
  SafetyCertificateOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import styles from "../ui/auth.module.css";

type FormValues = {
  name: string;
  email: string;
  password: string;
};

const perks = [
  "Free account, ready in under a minute",
  "Save routes and travellers for faster booking",
  "Get exclusive fares and travel alerts",
];

const SignUpPage = () => {
  const { message } = App.useApp();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [agree, setAgree] = useState(true);
  const [userSignUp] = useUserSignUpMutation();

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    if (!agree) {
      message.warning("Please accept the terms to continue.");
      return;
    }
    setLoading(true);
    try {
      const res = await userSignUp({ ...data }).unwrap();
      if (res?.success === true) {
        message.success(res?.message);
        storeUserInfo({ accessToken: res?.data?.accessToken });
        router.push("/");
      } else {
        message.error(res?.message);
      }
    } catch (err: any) {
      message.error(err?.data?.message || "Sign up failed. Please try again.");
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
          <h2>Start your journey with us.</h2>
          <p>
            Create a free account and book comfortable, affordable bus travel
            across the country in just a few taps.
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
          <span className={styles.eyebrow}>Sign up</span>
          <h1>Create your account</h1>
          <p className={styles.sub}>Join Highway Hoppers — it&apos;s free.</p>

          <Form submitHandler={onSubmit}>
            <div className={styles.field}>
              <div className={styles.fieldLabel}>
                <UserOutlined /> Full name
              </div>
              <FormInput
                name="name"
                type="text"
                size="large"
                placeholder="Your full name"
                prefix={<UserOutlined style={{ color: "#9db3b0" }} />}
              />
            </div>

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
                placeholder="Create a strong password"
                prefix={<LockOutlined style={{ color: "#9db3b0" }} />}
              />
            </div>

            <div className={styles.rowBetween}>
              <Checkbox
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
              >
                I agree to the terms & privacy
              </Checkbox>
            </div>

            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={loading}
              className={styles.submit}
            >
              Create account <ArrowRightOutlined />
            </Button>
          </Form>

          <p className={styles.footNote}>
            Already have an account?{" "}
            <Link href="/login" className={styles.link}>
              Sign in
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
};

export default SignUpPage;
