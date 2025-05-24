import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Syntegra Psikotes - Sistem Psikotes Digital Terdepan",
  description:
    "Platform psikotes digital dengan analitik mendalam untuk proses rekrutmen yang lebih efisien dan akurat. Dikembangkan oleh Oknum Studio untuk Syntegra Services.",
  keywords:
    "psikotes, rekrutmen, HR, tes psikologi, digital assessment, Syntegra Services",
  authors: [{ name: "Oknum Studio", url: "https://oknum.studio" }],
  creator: "Oknum Studio",
  publisher: "Syntegra Services",
  openGraph: {
    title: "Syntegra Psikotes - Sistem Psikotes Digital",
    description:
      "Revolusi proses rekrutmen dengan platform psikotes digital yang dilengkapi analitik mendalam dan monitoring real-time.",
    url: "https://syntegra-services.com",
    siteName: "Syntegra Psikotes",
    locale: "id_ID",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
