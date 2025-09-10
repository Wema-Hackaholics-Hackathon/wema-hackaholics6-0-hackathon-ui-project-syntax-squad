"use client";
import * as React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { light } from "@/theme";

export default function ThemeClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={light}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
