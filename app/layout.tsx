import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CareerAtlas AI",
  description: "Experience careers before choosing your major."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
