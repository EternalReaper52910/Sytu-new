import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "SYTU | Premium Professional Networking & Portfolio Platform",
  description: "Join the exclusive network of students, developers, designers, freelancers, and entrepreneurs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans bg-background text-text`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
