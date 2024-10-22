import localFont from "next/font/local";
import { Toaster } from "sonner";

import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/providers";
import MarqueeText from "./_components/marquee-text";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const town70 = localFont({
  src: "./fonts/town-70-accent-regular-1.ttf",
  variable: "--font-town-70",
  weight: "100 900",
});
const Merriweather = localFont({
  src: "./fonts/Merriweather-Regular.ttf",
  variable: "--font-merriweather-regular",
  weight: "100 900",
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
        className={`${geistSans.variable} ${geistMono.variable} ${Merriweather.variable} ${town70.variable} antialiased h-[100dvh] bg-color1`}
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
