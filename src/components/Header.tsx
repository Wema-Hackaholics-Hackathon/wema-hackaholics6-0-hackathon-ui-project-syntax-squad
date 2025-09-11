'use client'
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import { styled } from "@mui/material/styles";
import { NotificationsPanel } from "./NotificationsPanel";
import { ProfileDropdown } from "./ProfileDropdown";
import Image from "next/image";

interface HeaderProps {
  onMenuClick?: () => void;
  onNavigate?: (view: string) => void;
}

const Search = styled('form')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius * 1.5,
  background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(254,249,252,0.9) 100%)',
  border: '1px solid rgba(174, 50, 142, 0.1)',
  backdropFilter: 'blur(10px)',
  '&:hover': {
    background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(254,249,252,0.95) 100%)',
    border: '1px solid rgba(174, 50, 142, 0.2)',
  },
  '&:focus-within': {
    border: '1px solid rgba(174, 50, 142, 0.4)',
    boxShadow: '0 0 0 2px rgba(174, 50, 142, 0.1)',
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export function Header({ onMenuClick, onNavigate }: HeaderProps) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const unreadNotifications = 3;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Handle search logic here
      console.log("Searching for:", searchQuery);
    }
  };

  return (
    <>
      <AppBar 
        position="sticky" 
        color="default" 
        elevation={0}
        sx={{ 
          zIndex: 1201,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(254,249,252,0.95) 100%)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(174, 50, 142, 0.1)',
          boxShadow: '0 1px 3px rgba(174, 50, 142, 0.1)'
        }}
      >
        <Toolbar>
          {/* Menu Button (Mobile) */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={onMenuClick}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo and Title */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mr: 2 }}>
            <Box sx={{ 
              width: 40, 
              height: 40, 
              borderRadius: 2, 
              overflow: 'hidden',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #AE328E 0%, #c13a9e 100%)',
              boxShadow: '0 4px 12px rgba(174, 50, 142, 0.25)',
              position: 'relative'
            }}>
              <Image
                src="/logo.webp"
                alt="ALAT Logo"
                width={32}
                height={32}
                style={{ objectFit: 'contain' }}
                priority
              />
            </Box>
            <Box>
              <Typography 
                variant="h6" 
                noWrap 
                component="div" 
                sx={{ 
                  fontWeight: 700, 
                  background: 'linear-gradient(135deg, #AE328E 0%, #c13a9e 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: '1.25rem',
                  lineHeight: 1.2
                }}
              >
                ALAT Spark
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  color: '#425563',
                  fontWeight: 500,
                  fontSize: '0.75rem',
                  display: { xs: 'none', sm: 'block' }
                }}
              >
                Financial Intelligence
              </Typography>
            </Box>
          </Box>

          {/* Search (hidden on xs) */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
            <Search onSubmit={handleSearch}>
              <SearchIconWrapper>
                <SearchIcon color="primary" />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search transactions, insights..."
                inputProps={{ 'aria-label': 'search' }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Search>
          </Box>

          {/* Actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Search Icon (Mobile) */}
            <IconButton color="inherit" sx={{ display: { sm: 'none' } }}>
              <SearchIcon />
            </IconButton>

            {/* Notifications */}
            <IconButton color="inherit" onClick={() => setNotificationsOpen(true)}>
              <Badge badgeContent={unreadNotifications} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            {/* Settings (Desktop) */}
            <IconButton color="inherit" sx={{ display: { xs: 'none', md: 'flex' } }} onClick={() => onNavigate?.('settings')}>
              <SettingsIcon />
            </IconButton>

            {/* Profile Dropdown */}
            <ProfileDropdown onNavigate={onNavigate} />
          </Box>
        </Toolbar>
      </AppBar>

      <NotificationsPanel
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      />
    </>
  );
}
