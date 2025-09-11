'use client'

import { useState, useEffect } from 'react'
import { IconButton, Tooltip } from '@mui/material'
import { LightMode, DarkMode, SettingsBrightness } from '@mui/icons-material'

type ThemeMode = 'system' | 'light' | 'dark'

interface ThemeSwitcherProps {
  size?: 'small' | 'medium' | 'large'
}

export function ThemeSwitcher({ size = 'medium' }: ThemeSwitcherProps) {
  const [themeMode, setThemeMode] = useState<ThemeMode>('system')
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    // Get saved theme from localStorage or default to system
    const savedTheme = localStorage.getItem('theme-mode') as ThemeMode
    if (savedTheme && ['system', 'light', 'dark'].includes(savedTheme)) {
      setThemeMode(savedTheme)
    }

    // Detect system theme preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setSystemTheme(mediaQuery.matches ? 'dark' : 'light')

    // Listen for system theme changes
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light')
      applyTheme(themeMode, e.matches ? 'dark' : 'light')
    }

    mediaQuery.addEventListener('change', handleSystemThemeChange)

    // Apply initial theme
    applyTheme(savedTheme || 'system', mediaQuery.matches ? 'dark' : 'light')

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange)
    }
  }, [])

  const applyTheme = (mode: ThemeMode, currentSystemTheme: 'light' | 'dark') => {
    const root = document.documentElement
    
    // Remove existing theme classes
    root.classList.remove('light', 'dark')
    
    // Apply theme based on mode
    if (mode === 'system') {
      root.classList.add(currentSystemTheme)
    } else {
      root.classList.add(mode)
    }

    // Dispatch custom event for theme providers to listen
    window.dispatchEvent(new CustomEvent('theme-change', { 
      detail: { 
        mode, 
        activeTheme: mode === 'system' ? currentSystemTheme : mode 
      } 
    }))
  }

  const handleThemeToggle = () => {
    const modes: ThemeMode[] = ['system', 'light', 'dark']
    const currentIndex = modes.indexOf(themeMode)
    const nextMode = modes[(currentIndex + 1) % modes.length]
    
    setThemeMode(nextMode)
    localStorage.setItem('theme-mode', nextMode)
    applyTheme(nextMode, systemTheme)
  }

  const getIcon = () => {
    switch (themeMode) {
      case 'system':
        return <SettingsBrightness />
      case 'light':
        return <LightMode />
      case 'dark':
        return <DarkMode />
      default:
        return <SettingsBrightness />
    }
  }

  const getTooltip = () => {
    switch (themeMode) {
      case 'system':
        return `System theme (currently ${systemTheme})`
      case 'light':
        return 'Light theme'
      case 'dark':
        return 'Dark theme'
      default:
        return 'Theme switcher'
    }
  }

  return (
    <Tooltip title={getTooltip()}>
      <IconButton
        color="inherit"
        onClick={handleThemeToggle}
        size={size}
        sx={{
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'scale(1.1)',
          }
        }}
      >
        {getIcon()}
      </IconButton>
    </Tooltip>
  )
}