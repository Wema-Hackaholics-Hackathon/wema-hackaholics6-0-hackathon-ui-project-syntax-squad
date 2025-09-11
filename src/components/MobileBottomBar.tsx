import { Home, Receipt, Brain, Target, Users } from "lucide-react";
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
  { name: 'Social', icon: Users, id: 'social' },
];

export function MobileBottomBar({ activeView = 'dashboard', onNavigate }: MobileBottomBarProps) {
  const [value, setValue] = useState(activeView);

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    onNavigate?.(newValue);
  };

  return (
    <Paper
      sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 40, display: { xs: 'block', md: 'none' } }}
      elevation={3}
    >
      <BottomNavigation
        value={value}
        onChange={handleChange}
        showLabels
        sx={{
          bgcolor: 'background.paper',
          borderTop: 1,
          borderColor: 'divider',
        }}
      >
        {bottomNavItems.map((item) => (
          <BottomNavigationAction
            key={item.id}
            label={item.name}
            value={item.id}
            icon={<item.icon size={22} />}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
}
