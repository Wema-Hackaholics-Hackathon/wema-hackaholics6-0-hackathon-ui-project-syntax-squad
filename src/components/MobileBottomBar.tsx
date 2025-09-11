import { Home, Receipt, Brain, Target } from "lucide-react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import { useState } from "react";

interface MobileBottomBarProps {
  activeView?: string;
  onNavigate?: (view: string) => void;
}

const bottomNavItems = [
  { name: 'Home', icon: Home, id: 'dashboard' },
  { name: 'Transactions', icon: Receipt, id: 'transactions' },
  { name: 'Intelligence', icon: Brain, id: 'intelligence' },
  { name: 'Actions', icon: Target, id: 'micro-actions' },
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
        background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(254,249,252,0.95) 100%)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(174, 50, 142, 0.1)',
      }}
      elevation={0}
    >
      <BottomNavigation
        value={value}
        onChange={handleChange}
        showLabels
        sx={{
          background: 'transparent',
          '& .MuiBottomNavigationAction-root': {
            color: '#425563',
            '&.Mui-selected': {
              color: '#AE328E',
            },
            '& .MuiBottomNavigationAction-label': {
              fontSize: '0.75rem',
              fontWeight: 500
            }
          }
        }}
      >
        {bottomNavItems.map((item) => (
          <BottomNavigationAction
            key={item.id}
            label={item.name}
            value={item.id}
            icon={<item.icon size={22} color={value === item.id ? '#AE328E' : '#425563'} />}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
}
