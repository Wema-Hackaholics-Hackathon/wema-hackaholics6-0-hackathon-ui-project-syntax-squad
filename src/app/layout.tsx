import { ReactNode } from "react";
import ThemeClientProvider from "../components/ThemeClientProvider";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spendlens",
  description: "A simple Spendlens banking mock",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeClientProvider>
          {children}
        </ThemeClientProvider>
      </body>
    </html>
  );
}
