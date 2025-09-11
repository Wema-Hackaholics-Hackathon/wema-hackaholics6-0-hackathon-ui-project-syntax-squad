import { ReactNode } from "react";
import ThemeClientProvider from "../components/ThemeClientProvider";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alat Spark",
  description: "Alat with a Gen Z spark",
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
