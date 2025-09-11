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

export function ProfileDropdown({ onNavigate }: ProfileDropdownProps) {
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
          sx={{ width: 36, height: 36, bgcolor: 'primary.main', color: 'white', fontWeight: 'bold' }}
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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, bgcolor: 'orange.50' }}>
          <Avatar sx={{ width: 48, height: 48, bgcolor: 'orange.400', color: 'white', fontWeight: 'bold' }}>
            {profileData.name.split(' ').map(n => n[0]).join('')}
          </Avatar>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <Typography fontWeight={600} color="orange" noWrap>
                {profileData.name}
              </Typography>
              {profileData.isPremium && (
                <Chip icon={<Star size={14} />} label="Pro" size="small" sx={{ bgcolor: 'orange.400', color: 'white', fontWeight: 500, ml: 1 }} />
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
          <Chip label="Secure" size="small" sx={{ bgcolor: 'green.100', color: 'green.700', fontSize: 12 }} />
        </MenuItem>
        <MenuItem onClick={() => handleMenuAction('help')}>
          <ListItemIcon><HelpCircle size={18} /></ListItemIcon>
          <ListItemText primary="Help & Support" secondary="Get help and contact us" />
          <ChevronRight size={16} color="#FFA726" />
        </MenuItem>
        <Divider />
        {/* Quick Actions */}
        <Box sx={{ p: 2, bgcolor: 'orange.50' }}>
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
        <MenuItem onClick={() => handleMenuAction('logout')} sx={{ color: 'red' }}>
          <ListItemIcon><LogOut size={18} color="#E53935" /></ListItemIcon>
          <ListItemText primary="Sign Out" secondary="Log out of your account" />
        </MenuItem>
      </Menu>
    </>
  );
}

        className="w-72 border-pink-200 shadow-alat-lg bg-white" 
        align="end" 
        forceMount
      >
        {/* Profile Header */}
        <DropdownMenuLabel className="font-normal p-0">
          <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-orange-50 to-orange-100/50">
            <Avatar className="h-12 w-12 ring-2 ring-orange-200 shadow-orange-sm">
{!profileData.avatar ? (
                <span className="bg-gradient-orange text-white flex items-center justify-center w-full h-full">
                  {profileData.name.split(' ').map(n => n[0]).join('')}
                </span>
              ) : null}
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-semibold text-orange-900 truncate">
                  {profileData.name}
                </p>
                {profileData.isPremium && (
                  <Badge variant="secondary" className="bg-gradient-orange text-white text-xs">
                    <Star className="w-3 h-3 mr-1" />
                    Pro
                  </Badge>
                )}
              </div>
              <p className="text-sm text-orange-600 truncate">
                {profileData.email}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator className="bg-orange-200/50" />

        {/* Account Section */}
        <DropdownMenuGroup>
          <DropdownMenuItem 
            className="flex items-center gap-3 px-4 py-3 cursor-pointer text-orange-700 hover:bg-orange-50 hover:text-orange-900 transition-colors"
            onClick={() => handleMenuAction('profile')}
          >
            <User className="h-4 w-4" />
            <div className="flex-1">
              <p className="font-medium">My Profile</p>
              <p className="text-xs text-orange-500">Manage your account information</p>
            </div>
            <ChevronRight className="h-4 w-4 text-orange-400" />
          </DropdownMenuItem>
          
          <DropdownMenuItem 
            className="flex items-center gap-3 px-4 py-3 cursor-pointer text-orange-700 hover:bg-orange-50 hover:text-orange-900 transition-colors"
            onClick={() => handleMenuAction('banking')}
          >
            <CreditCard className="h-4 w-4" />
            <div className="flex-1">
              <p className="font-medium">Connected Accounts</p>
              <p className="text-xs text-orange-500">Manage bank connections</p>
            </div>
            <Badge variant="outline" className="border-orange-200 text-orange-600 text-xs">
              2 linked
            </Badge>
          </DropdownMenuItem>

          <DropdownMenuItem 
            className="flex items-center gap-3 px-4 py-3 cursor-pointer text-orange-700 hover:bg-orange-50 hover:text-orange-900 transition-colors"
            onClick={() => handleMenuAction('settings')}
          >
            <Settings className="h-4 w-4" />
            <div className="flex-1">
              <p className="font-medium">Settings</p>
              <p className="text-xs text-orange-500">Preferences and privacy</p>
            </div>
            <ChevronRight className="h-4 w-4 text-orange-400" />
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="bg-orange-200/50" />

        {/* Security & Support */}
        <DropdownMenuGroup>
          <DropdownMenuItem 
            className="flex items-center gap-3 px-4 py-3 cursor-pointer text-orange-700 hover:bg-orange-50 hover:text-orange-900 transition-colors"
          >
            <Shield className="h-4 w-4" />
            <div className="flex-1">
              <p className="font-medium">Security Center</p>
              <p className="text-xs text-orange-500">2FA, privacy settings</p>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
              Secure
            </Badge>
          </DropdownMenuItem>

          <DropdownMenuItem 
            className="flex items-center gap-3 px-4 py-3 cursor-pointer text-orange-700 hover:bg-orange-50 hover:text-orange-900 transition-colors"
            onClick={() => handleMenuAction('help')}
          >
            <HelpCircle className="h-4 w-4" />
            <div className="flex-1">
              <p className="font-medium">Help & Support</p>
              <p className="text-xs text-orange-500">Get help and contact us</p>
            </div>
            <ChevronRight className="h-4 w-4 text-orange-400" />
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="bg-orange-200/50" />

        {/* Quick Actions */}
        <div className="p-3 bg-orange-50/50">
          <p className="text-xs font-medium text-orange-600 mb-2 uppercase tracking-wider">Quick Actions</p>
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 text-xs border-orange-200 text-orange-700 hover:bg-orange-100"
            >
              <Palette className="w-3 h-3 mr-1" />
              Theme
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 text-xs border-orange-200 text-orange-700 hover:bg-orange-100"
            >
              <Bell className="w-3 h-3 mr-1" />
              Alerts
            </Button>
          </div>
        </div>

        <DropdownMenuSeparator className="bg-orange-200/50" />

        {/* Logout */}
        <DropdownMenuItem 
          className="flex items-center gap-3 px-4 py-3 cursor-pointer text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
          onClick={() => handleMenuAction('logout')}
        >
          <LogOut className="h-4 w-4" />
          <div className="flex-1">
            <p className="font-medium">Sign Out</p>
            <p className="text-xs text-red-500">Log out of your account</p>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}