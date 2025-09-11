import { Brain, CreditCard, Home, Users, Target, Building2, Receipt, TrendingUp, X } from "lucide-react";
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
import Button from "@mui/material/Button";
import Image from "next/image";

interface SidebarProps {
  activeView?: string;
  onViewChange?: (view: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const coreNavigation = [
  { name: 'Dashboard', icon: Home, id: 'dashboard' },
  { name: 'Transactions', icon: Receipt, id: 'transactions' },
  { name: 'Payment Intelligence', icon: Brain, id: 'intelligence' },
  { name: 'Micro-Actions', icon: Target, id: 'micro-actions' },
  { name: 'Social Payments', icon: Users, id: 'social' },
];

const advancedNavigation = [
  { name: 'Business Hub', icon: Building2, id: 'business' },
  { name: 'Bank Connections', icon: CreditCard, id: 'banking' },
  { name: 'Transaction Analytics', icon: TrendingUp, id: 'transaction-analytics' },
];

export function Sidebar({ activeView = 'dashboard', onViewChange, isOpen = false, onClose }: SidebarProps) {
  const handleItemClick = (id: string) => {
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
      px: 2, 
      py: 2,
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
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3, px: 1 }}>
        <Box sx={{ 
          width: 44, 
          height: 44, 
          borderRadius: 2.5, 
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
            width={36}
            height={36}
            style={{ objectFit: 'contain' }}
            priority
          />
        </Box>
        <Box>
          <Typography 
            variant="subtitle1" 
            fontWeight={700}
            sx={{
              background: 'linear-gradient(135deg, #AE328E 0%, #c13a9e 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            ALAT Spark
          </Typography>
          <Typography 
            variant="caption" 
            sx={{ 
              color: '#425563',
              fontWeight: 500,
              fontSize: '0.75rem'
            }}
          >
            Financial Intelligence
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ mb: 2 }} />
      {/* Core Features */}
      <Typography 
        variant="overline" 
        sx={{ 
          pl: 1, 
          mb: 1, 
          color: '#425563',
          fontWeight: 600,
          fontSize: '0.7rem',
          letterSpacing: '0.05em'
        }}
      >
        Core Features
      </Typography>
      <List sx={{ '& .MuiListItemButton-root': { borderRadius: 2, mb: 0.5 } }}>
        {coreNavigation.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton 
              selected={activeView === item.id} 
              onClick={() => handleItemClick(item.id)}
              sx={{
                '&.Mui-selected': {
                  background: 'linear-gradient(135deg, #AE328E 0%, #c13a9e 100%)',
                  color: 'white',
                  boxShadow: '0 4px 12px rgba(174, 50, 142, 0.25)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #c13a9e 0%, #d44fb0 100%)',
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'white'
                  }
                },
                '&:hover': {
                  background: 'linear-gradient(135deg, rgba(174, 50, 142, 0.05) 0%, rgba(193, 58, 158, 0.05) 100%)',
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <item.icon size={20} color={activeView === item.id ? 'white' : '#425563'} />
              </ListItemIcon>
              <ListItemText>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: activeView === item.id ? 600 : 500,
                    fontSize: '0.875rem',
                    color: activeView === item.id ? 'white' : '#425563'
                  }}
                >
                  {item.name}
                </Typography>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ my: 2 }} />
      {/* Advanced Features */}
      <Typography 
        variant="overline" 
        sx={{ 
          pl: 1, 
          mb: 1, 
          color: '#425563',
          fontWeight: 600,
          fontSize: '0.7rem',
          letterSpacing: '0.05em'
        }}
      >
        Advanced
      </Typography>
      <List sx={{ '& .MuiListItemButton-root': { borderRadius: 2, mb: 0.5 } }}>
        {advancedNavigation.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton 
              selected={activeView === item.id} 
              onClick={() => handleItemClick(item.id)}
              sx={{
                '&.Mui-selected': {
                  background: 'linear-gradient(135deg, #AE328E 0%, #c13a9e 100%)',
                  color: 'white',
                  boxShadow: '0 4px 12px rgba(174, 50, 142, 0.25)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #c13a9e 0%, #d44fb0 100%)',
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'white'
                  }
                },
                '&:hover': {
                  background: 'linear-gradient(135deg, rgba(174, 50, 142, 0.05) 0%, rgba(193, 58, 158, 0.05) 100%)',
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <item.icon size={20} color={activeView === item.id ? 'white' : '#425563'} />
              </ListItemIcon>
              <ListItemText>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: activeView === item.id ? 600 : 500,
                    fontSize: '0.875rem',
                    color: activeView === item.id ? 'white' : '#425563'
                  }}
                >
                  {item.name}
                </Typography>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ my: 2 }} />
      {/* Quick Actions */}
      <Typography 
        variant="overline" 
        sx={{ 
          pl: 1, 
          mb: 1, 
          color: '#425563',
          fontWeight: 600,
          fontSize: '0.7rem',
          letterSpacing: '0.05em'
        }}
      >
        Quick Actions
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Button 
          variant="outlined" 
          size="small" 
          onClick={() => handleItemClick('banking')} 
          sx={{ 
            justifyContent: 'flex-start',
            borderColor: 'rgba(174, 50, 142, 0.3)',
            color: '#425563',
            borderRadius: 2,
            '&:hover': {
              borderColor: '#AE328E',
              background: 'linear-gradient(135deg, rgba(174, 50, 142, 0.05) 0%, rgba(193, 58, 158, 0.05) 100%)',
            }
          }}
        >
          Link ALAT Account
        </Button>
        <Button 
          variant="outlined" 
          size="small" 
          onClick={() => handleItemClick('micro-actions')} 
          sx={{ 
            justifyContent: 'flex-start',
            borderColor: 'rgba(174, 50, 142, 0.3)',
            color: '#425563',
            borderRadius: 2,
            '&:hover': {
              borderColor: '#AE328E',
              background: 'linear-gradient(135deg, rgba(174, 50, 142, 0.05) 0%, rgba(193, 58, 158, 0.05) 100%)',
            }
          }}
        >
          Create Savings Goal
        </Button>
        <Button 
          variant="contained" 
          size="small" 
          onClick={() => handleItemClick('social')} 
          sx={{ 
            justifyContent: 'flex-start',
            background: 'linear-gradient(135deg, #AE328E 0%, #c13a9e 100%)',
            color: 'white',
            borderRadius: 2,
            boxShadow: '0 4px 12px rgba(174, 50, 142, 0.25)',
            '&:hover': {
              background: 'linear-gradient(135deg, #c13a9e 0%, #d44fb0 100%)',
              boxShadow: '0 6px 16px rgba(174, 50, 142, 0.3)',
            }
          }}
        >
          Split Bill
        </Button>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
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
            width: 280,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(254,249,252,0.98) 100%)',
            backdropFilter: 'blur(20px)',
            borderRight: '1px solid rgba(174, 50, 142, 0.1)'
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
            width: 280, 
            boxSizing: 'border-box',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(254,249,252,0.98) 100%)',
            backdropFilter: 'blur(20px)',
            borderRight: '1px solid rgba(174, 50, 142, 0.1)'
          } 
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}
