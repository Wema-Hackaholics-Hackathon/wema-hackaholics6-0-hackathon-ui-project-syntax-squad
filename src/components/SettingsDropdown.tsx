'use client'

import { 
  Settings, 
  Bell, 
  Moon, 
  Sun, 
  Globe, 
  Shield, 
  CreditCard, 
  Download,
  Trash2,
  HelpCircle
} from "lucide-react"
import { useState } from "react"
import { Dropdown, DropdownContent, DropdownItem, DropdownSeparator, DropdownHeader } from "./ui/dropdown"

interface SettingsDropdownProps {
  trigger: React.ReactElement
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onNavigate?: (view: string) => void
}

export function SettingsDropdown({ trigger, isOpen, onOpenChange, onNavigate }: SettingsDropdownProps) {
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)

  const handleSettingChange = (setting: string) => {
    switch (setting) {
      case 'darkMode':
        setDarkMode(!darkMode)
        break
      case 'notifications':
        setNotifications(!notifications)
        break
      case 'profile':
      case 'security':
      case 'billing':
      case 'help':
        onOpenChange(false)
        onNavigate?.(setting)
        break
    }
  }

  return (
    <Dropdown
      trigger={trigger}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      align="right"
      className="w-72"
    >
      <DropdownContent className="p-0">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-[#AE328E] to-[#c13a9e] text-white rounded-t-lg">
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            <span className="font-semibold">Settings</span>
          </div>
        </div>

        {/* Quick Settings */}
        <div className="p-2">
          <DropdownHeader>Quick Settings</DropdownHeader>
          
          <DropdownItem onClick={() => handleSettingChange('darkMode')}>
            <div className="flex items-center gap-3 w-full">
              {darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              <div className="flex-1">
                <div className="font-medium">Dark Mode</div>
                <div className="text-xs text-gray-500">Switch to {darkMode ? 'light' : 'dark'} theme</div>
              </div>
              <div className={`w-10 h-5 rounded-full transition-colors ${darkMode ? 'bg-[#AE328E]' : 'bg-gray-300'}`}>
                <div className={`w-4 h-4 rounded-full bg-white transition-transform mt-0.5 ${darkMode ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </div>
            </div>
          </DropdownItem>

          <DropdownItem onClick={() => handleSettingChange('notifications')}>
            <div className="flex items-center gap-3 w-full">
              <Bell className="h-4 w-4" />
              <div className="flex-1">
                <div className="font-medium">Notifications</div>
                <div className="text-xs text-gray-500">Push notifications and alerts</div>
              </div>
              <div className={`w-10 h-5 rounded-full transition-colors ${notifications ? 'bg-[#AE328E]' : 'bg-gray-300'}`}>
                <div className={`w-4 h-4 rounded-full bg-white transition-transform mt-0.5 ${notifications ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </div>
            </div>
          </DropdownItem>

          <DropdownItem>
            <Globe className="h-4 w-4" />
            <div className="flex-1">
              <div className="font-medium">Language</div>
              <div className="text-xs text-gray-500">English (US)</div>
            </div>
          </DropdownItem>
        </div>

        <DropdownSeparator />

        {/* Account Settings */}
        <div className="p-2">
          <DropdownHeader>Account</DropdownHeader>
          
          <DropdownItem onClick={() => handleSettingChange('profile')}>
            <Settings className="h-4 w-4" />
            <div>
              <div className="font-medium">Profile Settings</div>
              <div className="text-xs text-gray-500">Manage your account information</div>
            </div>
          </DropdownItem>

          <DropdownItem onClick={() => handleSettingChange('security')}>
            <Shield className="h-4 w-4" />
            <div>
              <div className="font-medium">Security & Privacy</div>
              <div className="text-xs text-gray-500">Password, 2FA, and privacy</div>
            </div>
          </DropdownItem>

          <DropdownItem onClick={() => handleSettingChange('billing')}>
            <CreditCard className="h-4 w-4" />
            <div>
              <div className="font-medium">Billing & Plans</div>
              <div className="text-xs text-gray-500">Manage subscription and payments</div>
            </div>
          </DropdownItem>
        </div>

        <DropdownSeparator />

        {/* Data & Support */}
        <div className="p-2">
          <DropdownHeader>Data & Support</DropdownHeader>
          
          <DropdownItem>
            <Download className="h-4 w-4" />
            <div>
              <div className="font-medium">Export Data</div>
              <div className="text-xs text-gray-500">Download your financial data</div>
            </div>
          </DropdownItem>

          <DropdownItem onClick={() => handleSettingChange('help')}>
            <HelpCircle className="h-4 w-4" />
            <div>
              <div className="font-medium">Help & Support</div>
              <div className="text-xs text-gray-500">Get help and contact us</div>
            </div>
          </DropdownItem>

          <DropdownItem variant="destructive">
            <Trash2 className="h-4 w-4" />
            <div>
              <div className="font-medium">Delete Account</div>
              <div className="text-xs text-red-500">Permanently delete your account</div>
            </div>
          </DropdownItem>
        </div>
      </DropdownContent>
    </Dropdown>
  )
}