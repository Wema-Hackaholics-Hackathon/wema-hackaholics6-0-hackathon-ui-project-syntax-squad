import "./globals.css";
import { ReactNode } from "react";



export const metadata = {
  title: "Spendlens",
  description: "A simple Spendlens banking mock",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
