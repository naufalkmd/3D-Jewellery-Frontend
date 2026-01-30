import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "3D Jewellery Virtual Try-On",
  description: "Try on jewellery virtually in stunning 3D",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
