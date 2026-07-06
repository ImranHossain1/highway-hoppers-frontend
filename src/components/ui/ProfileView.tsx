"use client";
import React, { useState } from "react";
import {
  useMyProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/api/userApi";
import Loading from "@/app/loading";
import {
  CalendarOutlined,
  DollarCircleOutlined,
  EditOutlined,
  EnvironmentOutlined,
  LoadingOutlined,
  MailOutlined,
  ManOutlined,
  PhoneOutlined,
  PlusOutlined,
  SafetyCertificateOutlined,
  StarOutlined,
  UserOutlined,
  WomanOutlined,
} from "@ant-design/icons";
import {
  App,
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Rate,
  Select,
  Upload,
} from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import dayjs from "dayjs";
import { getBaseUrl } from "@/helpers/config/envConfig";
import { authKey } from "@/constants/storageKey";
import { getFromLocalStorage } from "@/utils/local-storage";
import styles from "./profile.module.css";

const initials = (name?: string) =>
  (name || "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join("") || "?";

const fmtDate = (d?: string) => {
  if (!d) return "—";
  const dt = new Date(d);
  return Number.isNaN(dt.getTime())
    ? d
    : dt.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
};

const ProfileView = () => {
  const { data, isLoading } = useMyProfileQuery({});
  const [updateProfile, { isLoading: saving }] = useUpdateProfileMutation();
  const { message } = App.useApp();
  const [editOpen, setEditOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>();
  const [uploading, setUploading] = useState(false);
  const [form] = Form.useForm();

  const profile = data?.data || {};

  const openEdit = () => {
    form.setFieldsValue({
      name: profile.name,
      gender: profile.gender,
      DOB: profile.DOB && dayjs(profile.DOB).isValid() ? dayjs(profile.DOB) : null,
      contactNo: profile.contactNo,
      address: profile.address,
    });
    setAvatarUrl(profile.profileImage || profile.profileImg);
    setEditOpen(true);
  };

  const onUploadChange = (info: UploadChangeParam) => {
    if (info.file.status === "uploading") {
      setUploading(true);
      return;
    }
    if (info.file.status === "done") {
      setUploading(false);
      const url = info.file.response?.url || info.file.response?.data?.url;
      if (url) {
        setAvatarUrl(url);
        message.success("Image uploaded");
      } else {
        message.error("Upload response missing URL");
      }
    }
    if (info.file.status === "error") {
      setUploading(false);
      message.error("Image upload failed");
    }
  };

  const onSave = async () => {
    try {
      const v = await form.validateFields();
      const payload = {
        name: v.name,
        gender: v.gender || undefined,
        DOB: v.DOB ? dayjs(v.DOB).format("YYYY-MM-DD") : undefined,
        contactNo: v.contactNo,
        address: v.address,
        profileImg: avatarUrl,
      };
      const res: any = await updateProfile(payload).unwrap();
      if (res?.success !== false) {
        message.success(res?.message || "Profile updated");
        setEditOpen(false);
      }
    } catch (err: any) {
      if (err?.errorFields) return; // form validation, keep modal open
      message.error(err?.data?.message || "Update failed");
    }
  };

  if (isLoading) return <Loading />;

  const p = profile;
  const avatar = p.profileImage || p.profileImg;
  const genderIcon =
    p.gender === "FEMALE" ? <WomanOutlined /> : <ManOutlined />;
  const isDriver = p.role === "DRIVER" && p.driver;

  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <div className={styles.banner}>
          {p.role && (
            <span className={styles.roleTag}>
              <SafetyCertificateOutlined /> {p.role}
            </span>
          )}
          <div className={styles.head}>
            {avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                className={styles.avatar}
                src={avatar}
                alt={p.name || "Profile"}
              />
            ) : (
              <div className={styles.avatarFallback}>{initials(p.name)}</div>
            )}
            <div className={styles.who}>
              <h1>{p.name || "Unnamed user"}</h1>
              <span className={styles.email}>
                <MailOutlined /> {p.email || "—"}
              </span>
            </div>
            <Button
              className={styles.editBtn}
              icon={<EditOutlined />}
              onClick={openEdit}
            >
              Edit profile
            </Button>
          </div>
        </div>

        <div className={styles.grid}>
          <div className={styles.item}>
            <span className={styles.itemIc}>
              <UserOutlined />
            </span>
            <div className={styles.itemBody}>
              <span className={styles.itemLabel}>Full name</span>
              <span className={styles.itemValue}>{p.name || "—"}</span>
            </div>
          </div>

          <div className={styles.item}>
            <span className={styles.itemIc}>{genderIcon}</span>
            <div className={styles.itemBody}>
              <span className={styles.itemLabel}>Gender</span>
              <span className={styles.itemValue}>{p.gender || "—"}</span>
            </div>
          </div>

          <div className={styles.item}>
            <span className={styles.itemIc}>
              <CalendarOutlined />
            </span>
            <div className={styles.itemBody}>
              <span className={styles.itemLabel}>Date of birth</span>
              <span className={styles.itemValue}>{fmtDate(p.DOB)}</span>
            </div>
          </div>

          <div className={styles.item}>
            <span className={styles.itemIc}>
              <PhoneOutlined />
            </span>
            <div className={styles.itemBody}>
              <span className={styles.itemLabel}>Contact number</span>
              <span className={styles.itemValue}>{p.contactNo || "—"}</span>
            </div>
          </div>

          <div className={`${styles.item} ${styles.full}`}>
            <span className={styles.itemIc}>
              <EnvironmentOutlined />
            </span>
            <div className={styles.itemBody}>
              <span className={styles.itemLabel}>Address</span>
              <span className={styles.itemValue}>{p.address || "—"}</span>
            </div>
          </div>

          {isDriver && (
            <div className={styles.item}>
              <span className={styles.itemIc}>
                <DollarCircleOutlined />
              </span>
              <div className={styles.itemBody}>
                <span className={styles.itemLabel}>Monthly salary</span>
                <span className={styles.itemValue}>
                  {p.driver.salary != null ? `৳${p.driver.salary}` : "—"}
                </span>
              </div>
            </div>
          )}

          {isDriver && (
            <div className={styles.item}>
              <span className={styles.itemIc}>
                <StarOutlined />
              </span>
              <div className={styles.itemBody}>
                <span className={styles.itemLabel}>Driver rating</span>
                <span className={styles.itemValue}>
                  <Rate
                    disabled
                    allowHalf
                    value={Number(p.driver.rating) || 0}
                  />
                </span>
              </div>
            </div>
          )}

          {p.createdAt && (
            <div className={`${styles.item} ${styles.full}`}>
              <span className={styles.itemIc}>
                <SafetyCertificateOutlined />
              </span>
              <div className={styles.itemBody}>
                <span className={styles.itemLabel}>Member since</span>
                <span className={styles.itemValue}>{fmtDate(p.createdAt)}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <Modal
        title="Edit profile"
        open={editOpen}
        onCancel={() => setEditOpen(false)}
        onOk={onSave}
        okText="Save changes"
        confirmLoading={saving}
        forceRender
      >
        <Form form={form} layout="vertical" requiredMark={false}>
          <Form.Item
            name="name"
            label="Full name"
            rules={[{ required: true, message: "Name is required" }]}
          >
            <Input placeholder="Your full name" />
          </Form.Item>
          <Form.Item name="gender" label="Gender">
            <Select
              allowClear
              placeholder="Select gender"
              options={[
                { label: "Male", value: "MALE" },
                { label: "Female", value: "FEMALE" },
              ]}
            />
          </Form.Item>
          <Form.Item name="DOB" label="Date of birth">
            <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item name="contactNo" label="Contact number">
            <Input placeholder="01XXXXXXXXX" />
          </Form.Item>
          <Form.Item name="address" label="Address">
            <Input.TextArea rows={2} placeholder="Your address" />
          </Form.Item>
          <Form.Item label="Profile photo">
            <Upload
              name="file"
              accept="image/*"
              listType="picture-card"
              showUploadList={false}
              action={`${getBaseUrl()}/upload`}
              headers={{ Authorization: getFromLocalStorage(authKey) || "" }}
              onChange={onUploadChange}
            >
              {avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={avatarUrl}
                  alt="avatar"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: 8,
                  }}
                />
              ) : (
                <div>
                  {uploading ? <LoadingOutlined /> : <PlusOutlined />}
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProfileView;
