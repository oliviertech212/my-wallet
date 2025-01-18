import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";



const inter = Inter({ subsets: ["latin"], display: "swap" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ backgroundColor: "#FFFFFF" }}>
       
        {children}

        <Toaster
          duration={10000}
          closeButton={true}
          position="top-right"
          className=""
          richColors
        />
      </body>
    </html>
  );
}
