import { Home, Receipt, Brain, Target, Users } from "lucide-react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

interface MobileBottomBarProps {
  activeView?: string;
}

const bottomNavItems = [
  { name: "Home", icon: Home, id: "dashboard", path: "/" },
  { name: "Transactions", icon: Receipt, id: "transactions", path: "/transactions" },
  { name: "Intelligence", icon: Brain, id: "intelligence", path: "/view-intelligence" },
  { name: "Actions", icon: Target, id: "micro-actions", path: "/create-action" },
  { name: "Social", icon: Users, id: "social", path: "/split-bill" },
];

export function MobileBottomBar({ activeView = "dashboard" }: MobileBottomBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [value, setValue] = useState(activeView);

  // keep selected tab in sync with URL
  useEffect(() => {
    const current = bottomNavItems.find((item) => item.path === pathname);
    if (current) {
      setValue(current.id);
    }
  }, [pathname]);

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    const selectedItem = bottomNavItems.find((item) => item.id === newValue);
    if (selectedItem) {
      router.push(selectedItem.path);
    }
  };

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        display: { xs: "block", md: "none" },
      }}
      elevation={3}
    >
      <BottomNavigation
        value={value}
        onChange={handleChange}
        showLabels
        sx={{
          bgcolor: "background.paper",
          borderTop: 1,
          borderColor: "divider",
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
