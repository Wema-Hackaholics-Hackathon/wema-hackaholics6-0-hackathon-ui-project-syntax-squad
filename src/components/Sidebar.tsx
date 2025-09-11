import { Wallet, Zap, Users, User, LogOut, X } from "lucide-react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Image from "next/image";

interface SidebarProps {
  activeView?: string;
  onViewChange?: (view: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const navigation = [
  { name: 'Stash', icon: Wallet, id: 'dashboard' },
  { name: 'Sparks', icon: Zap, id: 'intelligence' },
  { name: 'Connect', icon: Users, id: 'social' },
];

const bottomActions = [
  { name: 'Profile', icon: User, id: 'profile' },
  { name: 'Log Out', icon: LogOut, id: 'logout' },
];

export function Sidebar({ activeView = 'dashboard', onViewChange, isOpen = false, onClose }: SidebarProps) {
  const handleItemClick = (id: string) => {
    if (id === 'logout') {
      // Handle logout logic here
      console.log('Logout clicked');
      return;
    }
    onViewChange?.(id);
    if (window.innerWidth < 768) {
      onClose?.();
    }
  };

  // Sidebar content
  const drawerContent = (
    <Box sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column', 
      px: 3, 
      py: 3,
      background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(254,249,252,0.98) 100%)',
      backdropFilter: 'blur(20px)'
    }}>
      {/* Mobile Close Button */}
      <Box sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'flex-end', mb: 1 }}>
        <IconButton onClick={onClose} size="small">
          <X size={20} />
        </IconButton>
      </Box>
      {/* Logo and Title */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4, px: 1 }}>
        <Box sx={{ 
          width: 48, 
          height: 48, 
          borderRadius: 3, 
          overflow: 'hidden',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #AE328E 0%, #c13a9e 100%)',
          boxShadow: '0 8px 24px rgba(174, 50, 142, 0.3)',
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
            fontWeight={800}
            sx={{
              background: 'linear-gradient(135deg, #AE328E 0%, #c13a9e 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: '"Inter", sans-serif',
            }}
          >
            ALAT Spark
          </Typography>
          <Typography 
            variant="caption" 
            sx={{ 
              color: '#425563',
              fontWeight: 600,
              fontSize: '0.75rem',
              fontFamily: '"Inter", sans-serif',
            }}
          >
            Money made fun 💫
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ mb: 3, opacity: 0.3 }} />
      {/* Main Navigation */}
      <List sx={{ '& .MuiListItemButton-root': { borderRadius: 3, mb: 1, py: 1.5 } }}>
        {navigation.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton 
              selected={activeView === item.id} 
              onClick={() => handleItemClick(item.id)}
              sx={{
                '&.Mui-selected': {
                  background: 'linear-gradient(135deg, #AE328E 0%, #c13a9e 100%)',
                  color: 'white',
                  boxShadow: '0 8px 24px rgba(174, 50, 142, 0.3)',
                  transform: 'translateY(-1px)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #c13a9e 0%, #d44fb0 100%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 32px rgba(174, 50, 142, 0.4)',
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'white'
                  }
                },
                '&:hover': {
                  background: 'linear-gradient(135deg, rgba(174, 50, 142, 0.08) 0%, rgba(193, 58, 158, 0.08) 100%)',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 4px 16px rgba(174, 50, 142, 0.15)',
                },
                transition: 'all 0.2s ease-in-out',
              }}
            >
              <ListItemIcon sx={{ minWidth: 44 }}>
                <item.icon size={22} color={activeView === item.id ? 'white' : '#425563'} strokeWidth={2.5} />
              </ListItemIcon>
              <ListItemText>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: activeView === item.id ? 700 : 600,
                    fontSize: '0.95rem',
                    color: activeView === item.id ? 'white' : '#425563',
                    fontFamily: '"Inter", sans-serif',
                  }}
                >
                  {item.name}
                </Typography>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ flexGrow: 1 }} />
      {/* Bottom Actions - Desktop Only */}
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <Divider sx={{ mb: 2, opacity: 0.3 }} />
        <List sx={{ '& .MuiListItemButton-root': { borderRadius: 3, mb: 0.5, py: 1 } }}>
          {bottomActions.map((item) => (
            <ListItem key={item.id} disablePadding>
              <ListItemButton 
                onClick={() => handleItemClick(item.id)}
                sx={{
                  '&:hover': {
                    background: item.id === 'logout' 
                      ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.08) 0%, rgba(220, 38, 38, 0.08) 100%)'
                      : 'linear-gradient(135deg, rgba(174, 50, 142, 0.08) 0%, rgba(193, 58, 158, 0.08) 100%)',
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <item.icon 
                    size={20} 
                    color={item.id === 'logout' ? '#425563' : '#425563'} 
                    strokeWidth={2}
                  />
                </ListItemIcon>
                <ListItemText>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      color: item.id === 'logout' ? '#425563' : '#425563',
                      fontFamily: '"Inter", sans-serif',
                    }}
                  >
                    {item.name}
                  </Typography>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      {/* Mobile bottom spacing */}
      <Box sx={{ height: 60, display: { xs: 'block', md: 'none' } }} />
    </Box>
  );

  return (
    <>
      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={onClose}
        variant="temporary"
        ModalProps={{ keepMounted: true }}
        sx={{ 
          display: { xs: 'block', md: 'none' }, 
          '& .MuiDrawer-paper': { 
            width: 300,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(254,249,252,0.98) 100%)',
            backdropFilter: 'blur(20px)',
            borderRight: '1px solid rgba(174, 50, 142, 0.1)',
            boxShadow: '8px 0 32px rgba(174, 50, 142, 0.1)',
          } 
        }}
      >
        {drawerContent}
      </Drawer>
      {/* Desktop Permanent Drawer */}
      <Drawer
        anchor="left"
        open
        variant="permanent"
        sx={{ 
          display: { xs: 'none', md: 'block' }, 
          '& .MuiDrawer-paper': { 
            width: 300, 
            boxSizing: 'border-box',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(254,249,252,0.98) 100%)',
            backdropFilter: 'blur(20px)',
            borderRight: '1px solid rgba(174, 50, 142, 0.1)',
            boxShadow: '8px 0 32px rgba(174, 50, 142, 0.1)',
            top: 64,
            height: 'calc(100vh - 64px)'
          } 
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}
