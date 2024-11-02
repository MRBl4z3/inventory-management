import "./globals.css";
import "react-toastify/dist/ReactToastify.css"
import type { Metadata } from "next";
import ToastProvider from "@/components/ToastProvider";

export const metadata: Metadata = {
  title: "Inventaris",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>

    </html>
  );
}