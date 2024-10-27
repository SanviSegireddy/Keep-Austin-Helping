import localFont from "next/font/local";
import { Toaster } from "sonner";

import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/providers";
import MarqueeText from "./_components/marquee-text";

const Merriweather = localFont({
  src: "./fonts/Merriweather-Regular.ttf",
  variable: "--font-merriweather-regular",
});

const MerriweatherBold = localFont({
  src: "./fonts/Merriweather-Bold.ttf",
  variable: "--font-merriweather-bold",
});

export const metadata: Metadata = {
  title: "Keep Austin Helping",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${Merriweather.variable} ${MerriweatherBold.variable} h-[100dvh] bg-color1 font-merriweather antialiased`}
      >
        <Providers>
          {children}
          <MarqueeText />

          <Toaster
            toastOptions={{
              duration: 2000,
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
