import { Wallet, Zap, Users } from "lucide-react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import { useState } from "react";

interface MobileBottomBarProps {
  activeView?: string;
  onNavigate?: (view: string) => void;
}

const bottomNavItems = [
  { name: 'Stash', icon: Wallet, id: 'dashboard' },
  { name: 'Sparks', icon: Zap, id: 'intelligence' },
  { name: 'Connect', icon: Users, id: 'social' },
];

export function MobileBottomBar({ activeView = 'dashboard', onNavigate }: MobileBottomBarProps) {
  const [value, setValue] = useState(activeView);

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    onNavigate?.(newValue);
  };

  return (
    <Paper
      sx={{ 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        right: 0, 
        zIndex: 40, 
        display: { xs: 'block', md: 'none' },
        background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(254,249,252,0.98) 100%)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(174, 50, 142, 0.1)',
        borderRadius: '24px 24px 0 0',
        boxShadow: '0 -8px 32px rgba(174, 50, 142, 0.15)',
        mx: 0,
        pb: 'env(safe-area-inset-bottom)',
      }}
      elevation={0}
    >
      <BottomNavigation
        value={value}
        onChange={handleChange}
        showLabels
        sx={{
          background: 'transparent',
          height: 72,
          px: 2,
          py: 1,
          '& .MuiBottomNavigationAction-root': {
            color: '#425563',
            borderRadius: 3,
            transition: 'all 0.2s ease-in-out',
            '&.Mui-selected': {
              color: '#AE328E',
              background: 'linear-gradient(135deg, rgba(174, 50, 142, 0.1) 0%, rgba(193, 58, 158, 0.1) 100%)',
              transform: 'scale(1.05)',
              boxShadow: '0 4px 16px rgba(174, 50, 142, 0.2)',
            },
            '& .MuiBottomNavigationAction-label': {
              fontSize: '0.8rem',
              fontWeight: 600,
              fontFamily: '"Inter", sans-serif',
            }
          }
        }}
      >
        {bottomNavItems.map((item) => (
          <BottomNavigationAction
            key={item.id}
            label={item.name}
            value={item.id}
            icon={<item.icon size={24} color={value === item.id ? '#AE328E' : '#425563'} strokeWidth={2.5} />}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
}
