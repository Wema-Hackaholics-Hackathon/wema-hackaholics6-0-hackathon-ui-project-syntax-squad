import { ReactNode } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { light } from "@/theme";

export const metadata = {
  title: "Spendlens",
  description: "A simple Spendlens banking mock",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={light}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
