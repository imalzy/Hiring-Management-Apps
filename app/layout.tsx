import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";

import { ToastProvider } from "@/providers/toast-provider";
import Navbar from "@/components/navbar";

import "./globals.css";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hiring Management Web App",
  description: "Clean, modular, and functional Next.js web app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunitoSans.variable} ${nunitoSans.variable} antialiased`}
      >
        <ToastProvider />
        <div className="flex flex-col h-screen">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
