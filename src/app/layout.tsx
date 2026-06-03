import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ChatWidget from "@/components/ui/ChatWidget";
import "./globals.css";

// Configure Geist Sans (display)
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

// Configure Geist Mono (code)
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

import { metadata as sharedMetadata } from "./metadata";

// SEO configuration
export const metadata = sharedMetadata;


import LenisProvider from "@/components/layout/LenisProvider";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgressBar from "@/components/ui/ScrollProgressBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground flex flex-col relative">
        <ScrollProgressBar />
        <CustomCursor />

        <LenisProvider>
          {/* Fixed cinematic noise overlay texture covering all elements */}
          <div className="noise-overlay" />

          {/* Global sticky navigation bar */}
          <Header />

          {/* Primary page template content */}
          <main className="flex-grow flex flex-col">{children}</main>

          {/* Global branding footer */}
          <Footer />

          {/* Floating AI chat assistant */}
          <ChatWidget />
        </LenisProvider>
      </body>
    </html>
  );
}
