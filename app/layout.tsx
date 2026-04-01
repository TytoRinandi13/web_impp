import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Website Resmi IMPP",
  description: "Sistem Informasi Organisasi IMPP",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      {/* Tambahkan suppressHydrationWarning di sini */}
      <body suppressHydrationWarning className={`${geist.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}