import "./globals.css";
import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/ui/BottomNav";

export const metadata = {
  title: "Spendlens",
  description: "A simple Spendlens banking mock",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <Navbar />
        <main className="p-4" style={{ paddingBottom: 84 }}>{children}</main>
        <BottomNav />
      </body>
    </html>
  );
}
