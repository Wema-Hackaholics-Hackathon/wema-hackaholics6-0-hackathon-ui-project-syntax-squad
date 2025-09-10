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
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "./ui/dropdown-menu"
import { Badge } from "./ui/badge"

interface ProfileDropdownProps {
  onNavigate?: (view: string) => void
}

export function ProfileDropdown({ onNavigate }: ProfileDropdownProps) {
  const profileData = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "",
    isPremium: true
  }

  const handleMenuAction = (action: string) => {
    switch (action) {
      case 'profile':
        onNavigate?.('settings')
        break
      case 'settings':
        onNavigate?.('settings')
        break
      case 'banking':
        onNavigate?.('banking')
        break
      case 'help':
        onNavigate?.('help')
        break
      case 'logout':
        // Handle logout
        break
      default:
        break
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 md:h-9 md:w-9 rounded-full hover:bg-pink-100">
          <Avatar className="h-8 w-8 md:h-9 md:w-9 ring-2 ring-pink-200 shadow-alat-sm">
            <AvatarImage src={profileData.avatar} alt={profileData.name} />
            <AvatarFallback className="bg-gradient-alat text-white">
              <User className="h-3 w-3 md:h-4 md:w-4" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-72 border-pink-200 shadow-alat-lg bg-white" 
        align="end" 
        forceMount
      >
        {/* Profile Header */}
        <DropdownMenuLabel className="font-normal p-0">
          <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-orange-50 to-orange-100/50">
            <Avatar className="h-12 w-12 ring-2 ring-orange-200 shadow-orange-sm">
              <AvatarImage src={profileData.avatar} alt={profileData.name} />
              <AvatarFallback className="bg-gradient-orange text-white">
                {profileData.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
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