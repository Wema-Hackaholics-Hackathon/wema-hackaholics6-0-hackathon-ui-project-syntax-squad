'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { IconButton, Tooltip } from '@mui/material'
import { Sun, Moon, Monitor } from 'lucide-react'

interface ThemeSwitcherProps {
  size?: 'small' | 'medium' | 'large'
}

export function ThemeSwitcher({ size = 'medium' }: ThemeSwitcherProps) {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <IconButton color="inherit" size={size}>
        <Monitor size={20} />
      </IconButton>
    )
  }

  const handleThemeToggle = () => {
    const themes = ['system', 'light', 'dark']
    const currentIndex = themes.indexOf(theme || 'system')
    const nextTheme = themes[(currentIndex + 1) % themes.length]
    setTheme(nextTheme)
  }

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun size={20} />
      case 'dark':
        return <Moon size={20} />
      default:
        return <Monitor size={20} />
    }
  }

  const getTooltip = () => {
    switch (theme) {
      case 'light':
        return 'Switch to dark theme'
      case 'dark':
        return 'Switch to system theme'
      default:
        return 'Switch to light theme'
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
            transform: 'scale(1.05)',
          }
        }}
      >
        {getIcon()}
      </IconButton>
    </Tooltip>
  )
}