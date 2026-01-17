import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SessionProvider from "@/components/providers/SessionProvider";

export const metadata: Metadata = {
  title: "SeriesHub - แพลตฟอร์มซีรี่ย์ออนไลน์",
  description: "ดูซีรี่ย์ออนไลน์คุณภาพสูง ครบทุกแนว อัพเดตตอนใหม่ทุกวัน",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-black text-white">
        <SessionProvider>
          <ThemeProvider attribute="class" defaultTheme="dark">
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
