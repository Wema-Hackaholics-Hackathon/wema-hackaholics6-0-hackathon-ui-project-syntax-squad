'use client'
import { Bell, Search, Settings, Menu } from "lucide-react"
import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { NotificationsPanel } from "./NotificationsPanel"
import { ProfileDropdown } from "./ProfileDropdown"
import { Badge } from "./ui/badge"

interface HeaderProps {
  onMenuClick?: () => void
  onNavigate?: (view: string) => void
}

export function Header({ onMenuClick, onNavigate }: HeaderProps) {
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  
  // Mock notification count
  const unreadNotifications = 3

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Handle search logic here
      console.log("Searching for:", searchQuery)
    }
  }

  return (
    <>
      <header className="border-b border-pink-200/50 bg-gradient-to-r from-white via-pink-50/30 to-white backdrop-blur-xl px-3 md:px-6 py-3 sticky top-0 z-50 shadow-alat-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-6">
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden h-8 w-8 hover:bg-pink-100 text-[#425563]"
              onClick={onMenuClick}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 md:h-8 md:w-8 bg-gradient-alat rounded-xl flex items-center justify-center shadow-alat-sm">
                <span className="text-white font-bold text-xs md:text-sm">AL</span>
              </div>
              <h1 className="text-base md:text-xl font-bold text-gradient-alat">
                ALAT Lens
              </h1>
            </div>
            <form onSubmit={handleSearch} className="relative w-32 md:w-80 hidden sm:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#AE328E]" />
              <Input
                placeholder="Search transactions, insights..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-8 md:h-10 text-sm border-pink-200 bg-white/50 backdrop-blur-sm focus:border-[#AE328E] focus:ring-[#AE328E]/30"
              />
            </form>
          </div>
          
          <div className="flex items-center gap-1 md:gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              className="sm:hidden h-8 w-8 hover:bg-pink-100 text-[#425563]"
            >
              <Search className="h-4 w-4" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 md:h-10 md:w-10 relative hover:bg-pink-100 text-[#425563]"
              onClick={() => setNotificationsOpen(true)}
            >
              <Bell className="h-4 w-4 md:h-5 md:w-5" />
              {unreadNotifications > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-gradient-to-r from-rose-400 to-rose-500 border-0"
                >
                  {unreadNotifications}
                </Badge>
              )}
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 md:h-10 md:w-10 hidden md:flex hover:bg-pink-100 text-[#425563]"
              onClick={() => onNavigate?.('settings')}
            >
              <Settings className="h-5 w-5" />
            </Button>
            
            <ProfileDropdown onNavigate={onNavigate} />
          </div>
        </div>
      </header>
      
      <NotificationsPanel 
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      />
    </>
  )
}