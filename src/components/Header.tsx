'use client'
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from './ui/dropdown-menu';
import { ThemeSwitcher } from "./ThemeSwitcher";
import { styled } from "@mui/material/styles";
import Image from "next/image";

interface HeaderProps {
  onNavigate?: (view: string) => void;
}

const Search = styled('form')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius * 1.5,
  background: 'hsl(var(--input))',
  border: '1px solid hsl(var(--border))',
  backdropFilter: 'blur(10px)',
  '&:hover': {
    background: 'hsl(var(--accent))',
    border: '1px solid hsl(var(--border))',
  },
  '&:focus-within': {
    border: '1px solid hsl(var(--ring))',
    boxShadow: '0 0 0 2px hsl(var(--ring))',
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
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export function Header({ onNavigate }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const unreadNotifications = 3;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
    }
  };

  const profileData = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "",
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <AppBar 
      position="sticky" 
      color="default" 
      elevation={0}
      sx={{ 
        zIndex: 1201,
        background: 'hsl(var(--background))',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid hsl(var(--border))',
        boxShadow: '0 1px 3px rgba(174, 50, 142, 0.1)'
      }}
    >
      <Toolbar>
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
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
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
                color: 'hsl(var(--muted-foreground))',
                fontWeight: 500,
                fontSize: '0.75rem',
                display: { xs: 'none', sm: 'block' }
              }}
            >
              Alat, with a spark for Gen Z
            </Typography>
          </Box>
        </Box>

        {/* Search (hidden on xs) */}
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
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

        {/* Spacer to push actions to the right */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Search Icon (Mobile) */}
          <IconButton color="inherit" sx={{ display: { sm: 'none' } }}>
            <SearchIcon />
          </IconButton>

          {/* Notifications */}
          <IconButton color="inherit" onClick={() => onNavigate?.('notifications')}>
            <Badge badgeContent={unreadNotifications} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          {/* Theme Switcher (Desktop) */}
          <ThemeSwitcher />

          

           {/* Account Dropdown */}

<DropdownMenu>
  <DropdownMenuTrigger>
    <IconButton sx={{ p: 0 }}>
      <Avatar
        src={profileData.avatar}
        alt={profileData.name}
        sx={{ 
          width: 36, 
          height: 36, 
          bgcolor: '#AE328E', 
          color: 'white', 
          fontWeight: 'bold',
          fontSize: '0.875rem'
        }}
      >
        {!profileData.avatar ? getInitials(profileData.name) : null}
      </Avatar>
    </IconButton>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuItem onClick={() => onNavigate?.('settings')}>Settings</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem onClick={() => {/* TODO: implement logout */}}>Log out</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}