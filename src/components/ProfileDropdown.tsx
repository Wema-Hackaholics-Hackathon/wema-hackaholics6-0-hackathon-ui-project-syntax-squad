import { useState } from "react";
import {
  User,
  Settings,
  CreditCard,
  Shield,
  HelpCircle,
  LogOut,
  Palette,
  Bell,
  Star,
  ChevronRight
} from "lucide-react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";

interface ProfileDropdownProps {
  onNavigate?: (view: string) => void;
}

import { useTheme } from '@mui/material/styles';

export function ProfileDropdown({ onNavigate }: ProfileDropdownProps) {
  const theme = useTheme();
  const profileData = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "",
    isPremium: true
  };
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuAction = (action: string) => {
    setAnchorEl(null);
    switch (action) {
      case 'profile':
        onNavigate?.('settings');
        break;
      case 'settings':
        onNavigate?.('settings');
        break;
      case 'banking':
        onNavigate?.('banking');
        break;
      case 'help':
        onNavigate?.('help');
        break;
      case 'logout':
        // Handle logout
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Button
        variant="text"
        onClick={e => setAnchorEl(e.currentTarget)}
        sx={{ minWidth: 0, p: 0, borderRadius: '50%', width: 36, height: 36 }}
      >
        <Avatar
          src={profileData.avatar}
          alt={profileData.name}
          sx={{ width: 36, height: 36, bgcolor: theme.palette.primary.main, color: 'white', fontWeight: 'bold' }}
        >
          {!profileData.avatar ? profileData.name.split(' ').map(n => n[0]).join('') : null}
        </Avatar>
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        PaperProps={{ sx: { width: 320, borderRadius: 2, p: 0 } }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {/* Profile Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, bgcolor: theme.palette.primary.light }}>
          <Avatar sx={{ width: 48, height: 48, bgcolor: theme.palette.primary.main, color: 'white', fontWeight: 'bold' }}>
            {profileData.name.split(' ').map(n => n[0]).join('')}
          </Avatar>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <Typography fontWeight={600} color="orange" noWrap>
                {profileData.name}
              </Typography>
              {profileData.isPremium && (
                <Chip icon={<Star size={14} />} label="Pro" size="small" sx={{ bgcolor: theme.palette.primary.main, color: 'white', fontWeight: 500, ml: 1 }} />
              )}
            </Box>
            <Typography variant="body2" color="orange" noWrap>
              {profileData.email}
            </Typography>
          </Box>
        </Box>
        <Divider />
        {/* Account Section */}
        <MenuItem onClick={() => handleMenuAction('profile')}> 
          <ListItemIcon><User size={18} /></ListItemIcon>
          <ListItemText primary="My Profile" secondary="Manage your account information" />
          <ChevronRight size={16} color="#FFA726" />
        </MenuItem>
        <MenuItem onClick={() => handleMenuAction('banking')}>
          <ListItemIcon><CreditCard size={18} /></ListItemIcon>
          <ListItemText primary="Connected Accounts" secondary="Manage bank connections" />
          <Chip label="2 linked" size="small" sx={{ borderColor: 'orange.200', color: 'orange.600', fontSize: 12 }} variant="outlined" />
        </MenuItem>
        <MenuItem onClick={() => handleMenuAction('settings')}>
          <ListItemIcon><Settings size={18} /></ListItemIcon>
          <ListItemText primary="Settings" secondary="Preferences and privacy" />
          <ChevronRight size={16} color="#FFA726" />
        </MenuItem>
        <Divider />
        {/* Security & Support */}
        <MenuItem>
          <ListItemIcon><Shield size={18} /></ListItemIcon>
          <ListItemText primary="Security Center" secondary="2FA, privacy settings" />
          <Chip label="Secure" size="small" sx={{ bgcolor: theme.palette.secondary.light, color: theme.palette.secondary.main, fontSize: 12 }} />
        </MenuItem>
        <MenuItem onClick={() => handleMenuAction('help')}>
          <ListItemIcon><HelpCircle size={18} /></ListItemIcon>
          <ListItemText primary="Help & Support" secondary="Get help and contact us" />
          <ChevronRight size={16} color="#FFA726" />
        </MenuItem>
        <Divider />
        {/* Quick Actions */}
        <Box sx={{ p: 2, bgcolor: theme.palette.primary.light }}>
          <Typography variant="caption" color="orange" fontWeight={600} sx={{ mb: 1, textTransform: 'uppercase', letterSpacing: 1 }}>
            Quick Actions
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
            <Button variant="outlined" size="small" startIcon={<Palette size={14} />} sx={{ borderColor: 'orange.200', color: 'orange.700', fontSize: 12 }}>
              Theme
            </Button>
            <Button variant="outlined" size="small" startIcon={<Bell size={14} />} sx={{ borderColor: 'orange.200', color: 'orange.700', fontSize: 12 }}>
              Alerts
            </Button>
          </Box>
        </Box>
        <Divider />
        {/* Logout */}
        <MenuItem onClick={() => handleMenuAction('logout')} sx={{ color: theme.palette.primary.main }}>
          <ListItemIcon><LogOut size={18} color="#E53935" /></ListItemIcon>
          <ListItemText primary="Sign Out" secondary="Log out of your account" />
        </MenuItem>
      </Menu>
    </>
  );
}

