'use client'

import { Wallet, Zap, Users, LogOut, Settings, ChevronLeft, ChevronRight } from "lucide-react"
import { 
  Drawer, 
  Box, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Divider,
  IconButton,
  Tooltip
} from "@mui/material"

interface ExpandableSidebarProps {
  activeView?: string
  onViewChange?: (view: string) => void
  isExpanded: boolean
  onToggle: () => void
}

const navigation = [
  { name: 'Stash', icon: Wallet, id: 'dashboard' },
  { name: 'Sparks', icon: Zap, id: 'intelligence' },
  { name: 'Connect', icon: Users, id: 'social' },
]

const bottomActions = [
  { name: 'Settings', icon: Settings, id: 'settings' },
  { name: 'Log Out', icon: LogOut, id: 'logout' },
]

export function ExpandableSidebar({ 
  activeView = 'dashboard', 
  onViewChange, 
  isExpanded,
  onToggle 
}: ExpandableSidebarProps) {
  const handleItemClick = (id: string) => {
    if (id === 'logout') {
      console.log('Logout clicked')
      return
    }
    onViewChange?.(id)
  }

  const sidebarWidth = isExpanded ? 240 : 64

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: sidebarWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: sidebarWidth,
          boxSizing: 'border-box',
          background: 'hsl(var(--background))',
          backdropFilter: 'blur(20px)',
          borderRight: '1px solid hsl(var(--border))',
          boxShadow: '4px 0 24px rgba(174, 50, 142, 0.08)',
          transition: 'width 300ms cubic-bezier(0.4, 0, 0.2, 1)',
          overflowX: 'hidden',
          top: '64px',
          height: 'calc(100vh - 64px)',
        },
      }}
    >
      {/* Toggle Button */}
      <IconButton
        onClick={onToggle}
        sx={{
          position: 'absolute',
          top: 16,
          right: -12,
          width: 24,
          height: 24,
          bgcolor: 'hsl(var(--background))',
          border: '1px solid hsl(var(--border))',
          zIndex: 1,
          '&:hover': {
            bgcolor: '#AE328E',
            color: 'white',
          },
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        }}
      >
        {isExpanded ? <ChevronLeft size={12} /> : <ChevronRight size={12} />}
      </IconButton>

      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', p: 2 }}>
        {/* Main Navigation */}
        <Box sx={{ flexGrow: 1 }}>
          <List sx={{ p: 0 }}>
            {navigation.map((item) => {
              const isActive = activeView === item.id
              const IconComponent = item.icon
              
              return (
                <ListItem key={item.id} disablePadding sx={{ mb: 0.5 }}>
                  <Tooltip title={!isExpanded ? item.name : ''} placement="right">
                    <ListItemButton
                      onClick={() => handleItemClick(item.id)}
                      sx={{
                        borderRadius: 1.5,
                        minHeight: 48,
                        justifyContent: isExpanded ? 'initial' : 'center',
                        px: 2,
                        background: isActive 
                          ? 'linear-gradient(135deg, #AE328E 0%, #c13a9e 100%)'
                          : 'transparent',
                        color: isActive ? 'white' : 'hsl(var(--foreground))',
                        transform: isActive ? 'translateY(-1px)' : 'none',
                        boxShadow: isActive ? '0 4px 12px rgba(174, 50, 142, 0.3)' : 'none',
                        '&:hover': {
                          background: isActive 
                            ? 'linear-gradient(135deg, #AE328E 0%, #c13a9e 100%)'
                            : 'hsl(var(--accent))',
                          color: isActive ? 'white' : '#AE328E',
                          transform: 'translateY(-1px)',
                        },
                        transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                    >
                      <ListItemIcon sx={{
                        minWidth: 0,
                        mr: isExpanded ? 1.5 : 'auto',
                        justifyContent: 'center',
                        color: 'inherit',
                      }}>
                        <IconComponent size={20} strokeWidth={2.5} />
                      </ListItemIcon>
                      {isExpanded && (
                        <ListItemText 
                          primary={item.name} 
                          primaryTypographyProps={{
                            fontSize: '0.875rem',
                            fontWeight: 500,
                          }}
                        />
                      )}
                    </ListItemButton>
                  </Tooltip>
                </ListItem>
              )
            })}
          </List>
        </Box>

        {/* Bottom Actions */}
        <Box>
          <Divider sx={{ mb: 2, borderColor: 'hsl(var(--border))' }} />
          <List sx={{ p: 0 }}>
            {bottomActions.map((item) => {
              const IconComponent = item.icon
              
              return (
                <ListItem key={item.id} disablePadding sx={{ mb: 0.25 }}>
                  <Tooltip title={!isExpanded ? item.name : ''} placement="right">
                    <ListItemButton
                      onClick={() => handleItemClick(item.id)}
                      sx={{
                        borderRadius: 1.5,
                        minHeight: 40,
                        justifyContent: isExpanded ? 'initial' : 'center',
                        px: 2,
                        color: 'hsl(var(--muted-foreground))',
                        '&:hover': {
                          backgroundColor: item.id === 'logout' ? 'hsl(var(--destructive))' : 'hsl(var(--accent))',
                          color: item.id === 'logout' ? 'hsl(var(--destructive-foreground))' : 'hsl(var(--accent-foreground))',
                        },
                        transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                    >
                      <ListItemIcon sx={{
                        minWidth: 0,
                        mr: isExpanded ? 1.5 : 'auto',
                        justifyContent: 'center',
                        color: 'inherit',
                      }}>
                        <IconComponent size={16} strokeWidth={2} />
                      </ListItemIcon>
                      {isExpanded && (
                        <ListItemText 
                          primary={item.name} 
                          primaryTypographyProps={{
                            fontSize: '0.875rem',
                            fontWeight: 500,
                          }}
                        />
                      )}
                    </ListItemButton>
                  </Tooltip>
                </ListItem>
              )
            })}
          </List>
        </Box>
      </Box>
    </Drawer>
  )
}