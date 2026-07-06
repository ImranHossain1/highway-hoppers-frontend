"use client";
import "@ant-design/v5-patch-for-react-19";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import StyledComponentsRegistry from "./AntdRegistry";
import { App, ConfigProvider, theme as antdTheme } from "antd";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <ConfigProvider
        theme={{
          algorithm: antdTheme.defaultAlgorithm,
          token: {
            colorPrimary: "#218380",
            colorInfo: "#218380",
            colorBgLayout: "#218380",
            colorLink: "#1c716e",
            colorLinkHover: "#218380",
            fontFamily:
              "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            borderRadius: 10,
            controlHeight: 40,
            fontSize: 15,
            colorText: "#12332f",
            colorTextSecondary: "#6b807d",
          },
          components: {
            Button: {
              controlHeight: 44,
              fontWeight: 600,
              primaryShadow: "0 8px 18px rgba(33,131,128,0.24)",
            },
            Card: {
              borderRadiusLG: 16,
            },
            Input: { controlHeight: 44 },
            Select: { controlHeight: 44 },
            DatePicker: { controlHeight: 44 },
          },
        }}
      >
        <StyledComponentsRegistry>
          <App>{children}</App>
        </StyledComponentsRegistry>
      </ConfigProvider>
    </Provider>
  );
};

export default Providers;
