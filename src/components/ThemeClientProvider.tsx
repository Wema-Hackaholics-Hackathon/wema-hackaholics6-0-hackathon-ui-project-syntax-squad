"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { light, dark } from "@/theme";

function MuiThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState(light);

  useEffect(() => {
    // Listen for theme changes
    const handleThemeChange = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setCurrentTheme(isDark ? dark : light);
    };

    // Initial check
    handleThemeChange();

    // Watch for class changes on html element
    const observer = new MutationObserver(handleThemeChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default function ThemeClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
    >
      <MuiThemeProvider>
        {children}
      </MuiThemeProvider>
    </NextThemesProvider>
  );
}
