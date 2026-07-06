import "./globals.css";
import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import Providers from "@/lib/Providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Highway Hoppers — Book Bus Tickets Across Bangladesh",
  description:
    "Book affordable bus tickets across Bangladesh with Highway Hoppers. Compare routes, pick your seat and travel in comfort.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
