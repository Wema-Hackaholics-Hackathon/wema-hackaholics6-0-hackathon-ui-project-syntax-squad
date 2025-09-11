"use client";

import {
  Brain,
  CreditCard,
  Home,
  Users,
  Target,
  Building2,
  Receipt,
  TrendingUp,
  X,
} from "lucide-react";
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
import { useTheme } from "@mui/material/styles";
import { useRouter, usePathname } from "next/navigation";

interface SidebarProps {
  activeView?: string;
  onViewChange?: (view: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const coreNavigation = [
  { name: "Dashboard", icon: Home, id: "dashboard", path: "/" },
  { name: "Transactions", icon: Receipt, id: "transactions", path: "/transactions" },
  { name: "Payment Intelligence", icon: Brain, id: "intelligence", path: "/view-intelligence" },
  { name: "Micro-Actions", icon: Target, id: "micro-actions", path: "/create-action" },
  { name: "Social Payments", icon: Users, id: "social", path: "/split-bill" },
  { name: "Bank Connections", icon: CreditCard, id: "bank", path: "/not-found" },
];

// const advancedNavigation = [
//   { name: "Business Hub", icon: Building2, id: "business", path: "/business" },
//   { name: "Bank Connections", icon: CreditCard, id: "banking", path: "/banking" },
//   {
//     name: "Transaction Analytics",
//     icon: TrendingUp,
//     id: "transaction-analytics",
//     path: "/transactions",
//   },
// ];

export function Sidebar({
  activeView = "dashboard",
  onViewChange,
  isOpen = false,
  onClose,
}: SidebarProps) {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const handleItemClick = (id: string, path: string) => {
    onViewChange?.(id);
    router.push(path);
    if (window.innerWidth < 768) {
      onClose?.();
    }
  };

  // Sidebar content
  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        px: 2,
        py: 2,
      }}
    >
      {/* Mobile Close Button */}
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          justifyContent: "flex-end",
          mb: 1,
        }}
      >
        <IconButton onClick={onClose} size="small">
          <X size={20} />
        </IconButton>
      </Box>

      {/* Logo and Title */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          mb: 3,
          px: 1,
        }}
      >
        <Box
          sx={{
            width: 36,
            height: 36,
            bgcolor: "primary.main",
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: 1,
          }}
        >
          <Typography variant="subtitle2" color="white" fontWeight="bold">
            AL
          </Typography>
        </Box>
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            color="primary.main"
          >
            ALAT Spark
          </Typography>
          <Typography variant="caption" color="primary">
            Financial Intelligence
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Core Features */}
      <Typography variant="overline" color="primary" sx={{ pl: 1, mb: 1 }}>
        Core Features
      </Typography>
      <List>
        {coreNavigation.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton
              selected={pathname === item.path}
              onClick={() => handleItemClick(item.id, item.path)}
            >
              <ListItemIcon>
                <item.icon
                  size={20}
                  color={pathname === item.path ? "#AE328E" : undefined}
                />
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />

      {/* Advanced Features
      <Typography variant="overline" color="primary" sx={{ pl: 1, mb: 1 }}>
        Advanced
      </Typography>
      <List>
        {advancedNavigation.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton
              selected={pathname === item.path}
              onClick={() => handleItemClick(item.id, item.path)}
            >
              <ListItemIcon>
                <item.icon
                  size={20}
                  color={pathname === item.path ? "#AE328E" : undefined}
                />
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2 }} /> */}

      {/* Quick Actions */}
      {/* <Typography variant="overline" color="primary" sx={{ pl: 1, mb: 1 }}>
        Quick Actions
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Button
          variant="outlined"
          size="small"
          onClick={() => handleItemClick("banking", "/banking")}
          sx={{ justifyContent: "flex-start" }}
        >
          Link ALAT Account
        </Button>
        <Button
          variant="outlined"
          size="small"
          onClick={() => handleItemClick("micro-actions", "/micro-actions")}
          sx={{ justifyContent: "flex-start" }}
        >
          Create Savings Goal
        </Button>
        <Button
          variant="outlined"
          size="small"
          color="primary"
          onClick={() => handleItemClick("social", "/social")}
          sx={{ justifyContent: "flex-start" }}
        >
          Split Bill
        </Button>
      </Box>

      <Box sx={{ flexGrow: 1 }} /> */}

      {/* Mobile bottom spacing */}
      <Box sx={{ height: 60, display: { xs: "block", md: "none" } }} />
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
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { width: 260 },
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
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": { width: 260, boxSizing: "border-box" },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}
