"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { light, dark } from "@/theme";

export default function ThemeClientProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState(light);

  useEffect(() => {
    // Listen for theme changes from ThemeSwitcher
    const handleThemeChange = (event: CustomEvent) => {
      const { activeTheme } = event.detail;
      setCurrentTheme(activeTheme === 'dark' ? dark : light);
    };

    window.addEventListener('theme-change', handleThemeChange as EventListener);

    // Check initial theme from localStorage and system preference
    const savedMode = localStorage.getItem('theme-mode') || 'system';
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    let initialTheme = light;
    if (savedMode === 'dark' || (savedMode === 'system' && systemDark)) {
      initialTheme = dark;
    }
    
    setCurrentTheme(initialTheme);

    return () => {
      window.removeEventListener('theme-change', handleThemeChange as EventListener);
    };
  }, []);

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
