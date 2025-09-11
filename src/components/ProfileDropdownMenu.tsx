'use client'

import { 
  User, 
  Settings, 
  CreditCard, 
  Shield, 
  HelpCircle, 
  LogOut, 
  Star,
  ChevronRight,
  Palette,
  Bell
} from "lucide-react"
import { Dropdown, DropdownContent, DropdownItem, DropdownSeparator, DropdownHeader } from "./ui/dropdown"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"

interface ProfileDropdownMenuProps {
  trigger: React.ReactElement
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onNavigate?: (view: string) => void
}

const profileData = {
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "",
  isPremium: true
}

export function ProfileDropdownMenu({ trigger, isOpen, onOpenChange, onNavigate }: ProfileDropdownMenuProps) {
  const handleMenuAction = (action: string) => {
    onOpenChange(false)
    switch (action) {
      case 'profile':
      case 'settings':
      case 'banking':
      case 'security':
      case 'help':
        onNavigate?.(action)
        break
      case 'logout':
        // Handle logout
        break
    }
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  return (
    <Dropdown
      trigger={trigger}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      align="right"
      className="w-80"
    >
      <DropdownContent className="p-0">
        {/* Profile Header */}
        <div className="p-4 bg-gradient-to-r from-[#AE328E] to-[#c13a9e] text-white rounded-t-lg">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-lg">
              {getInitials(profileData.name)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-white truncate">
                  {profileData.name}
                </span>
                {profileData.isPremium && (
                  <Badge className="bg-white/20 text-white border-white/30 text-xs">
                    <Star className="h-3 w-3 mr-1" />
                    Pro
                  </Badge>
                )}
              </div>
              <p className="text-white/80 text-sm truncate">
                {profileData.email}
              </p>
            </div>
          </div>
        </div>

        {/* Account Section */}
        <div className="p-2">
          <DropdownHeader>Account</DropdownHeader>
          
          <DropdownItem onClick={() => handleMenuAction('profile')}>
            <User className="h-4 w-4" />
            <div className="flex-1">
              <div className="font-medium">My Profile</div>
              <div className="text-xs text-gray-500">Manage your account information</div>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </DropdownItem>

          <DropdownItem onClick={() => handleMenuAction('banking')}>
            <CreditCard className="h-4 w-4" />
            <div className="flex-1">
              <div className="font-medium">Connected Accounts</div>
              <div className="text-xs text-gray-500">Manage bank connections</div>
            </div>
            <Badge variant="outline" className="text-xs border-[#AE328E] text-[#AE328E]">
              2 linked
            </Badge>
          </DropdownItem>

          <DropdownItem onClick={() => handleMenuAction('settings')}>
            <Settings className="h-4 w-4" />
            <div className="flex-1">
              <div className="font-medium">Settings</div>
              <div className="text-xs text-gray-500">Preferences and privacy</div>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </DropdownItem>
        </div>

        <DropdownSeparator />

        {/* Security & Support */}
        <div className="p-2">
          <DropdownHeader>Security & Support</DropdownHeader>
          
          <DropdownItem onClick={() => handleMenuAction('security')}>
            <Shield className="h-4 w-4" />
            <div className="flex-1">
              <div className="font-medium">Security Center</div>
              <div className="text-xs text-gray-500">2FA, privacy settings</div>
            </div>
            <Badge variant="outline" className="text-xs border-green-500 text-green-600">
              Secure
            </Badge>
          </DropdownItem>

          <DropdownItem onClick={() => handleMenuAction('help')}>
            <HelpCircle className="h-4 w-4" />
            <div className="flex-1">
              <div className="font-medium">Help & Support</div>
              <div className="text-xs text-gray-500">Get help and contact us</div>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </DropdownItem>
        </div>

        <DropdownSeparator />

        {/* Quick Actions */}
        <div className="p-3 bg-gray-50/50">
          <DropdownHeader className="text-gray-600 mb-2">Quick Actions</DropdownHeader>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1 h-8 text-xs border-gray-200">
              <Palette className="h-3 w-3 mr-1" />
              Theme
            </Button>
            <Button variant="outline" size="sm" className="flex-1 h-8 text-xs border-gray-200">
              <Bell className="h-3 w-3 mr-1" />
              Alerts
            </Button>
          </div>
        </div>

        <DropdownSeparator />

        {/* Sign Out */}
        <div className="p-2">
          <DropdownItem 
            onClick={() => handleMenuAction('logout')}
            variant="destructive"
          >
            <LogOut className="h-4 w-4" />
            <div className="flex-1">
              <div className="font-medium">Sign Out</div>
              <div className="text-xs text-red-500">Log out of your account</div>
            </div>
          </DropdownItem>
        </div>
      </DropdownContent>
    </Dropdown>
  )
}