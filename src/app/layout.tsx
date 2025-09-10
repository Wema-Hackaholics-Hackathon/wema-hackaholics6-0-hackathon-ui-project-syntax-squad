import { ReactNode } from "react";
import "@/styles/globals.css";
import ThemeClientProvider from "../components/ThemeClientProvider";
import EmotionCacheProvider from "@/components/EmotionCacheProvider";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spendlens",
  description: "A simple Spendlens banking mock",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="emotion-insertion-point" content="" />
      </head>
      <body>
        <EmotionCacheProvider>
          <ThemeClientProvider>
            {children}
          </ThemeClientProvider>
        </EmotionCacheProvider>
      </body>
    </html>
  );
}
