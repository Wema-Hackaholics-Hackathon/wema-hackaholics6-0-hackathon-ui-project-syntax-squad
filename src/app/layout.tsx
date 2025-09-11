import { ReactNode } from "react";
import "@/styles/globals.css";
import ThemeClientProvider from "../components/ThemeClientProvider";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import EmotionCacheProvider from "@/components/EmotionCacheProvider";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alat Spark",
  description: "Alat, with a spark for Gen Z",
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
