'use client'
import { Brain, CreditCard, Home, Users, Target, Building2, Receipt, TrendingUp, X } from "lucide-react"
import { cn } from "./ui/utils"
import { Button } from "./ui/button"

interface SidebarProps {
  activeView?: string
  onViewChange?: (view: string) => void
  isOpen?: boolean
  onClose?: () => void
}

// Core navigation items optimized for desktop
const coreNavigation = [
  { name: 'Dashboard', icon: Home, id: 'dashboard' },
  { name: 'Transactions', icon: Receipt, id: 'transactions' },
  { name: 'Payment Intelligence', icon: Brain, id: 'intelligence' },
  { name: 'Micro-Actions', icon: Target, id: 'micro-actions' },
  { name: 'Social Payments', icon: Users, id: 'social' },
]

// Advanced features section
const advancedNavigation = [
  { name: 'Business Hub', icon: Building2, id: 'business' },
  { name: 'Bank Connections', icon: CreditCard, id: 'banking' },
  { name: 'Transaction Analytics', icon: TrendingUp, id: 'transaction-analytics' },
]

export function Sidebar({ activeView = 'dashboard', onViewChange, isOpen = false, onClose }: SidebarProps) {
  const handleItemClick = (id: string) => {
    onViewChange?.(id)
    if (window.innerWidth < 768) {
      onClose?.()
    }
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        "fixed md:sticky top-0 left-0 z-50 h-screen w-64 bg-gradient-to-b from-white via-pink-50/30 to-pink-100/50 border-r border-pink-200/50 shadow-alat-lg transform transition-transform duration-200 ease-in-out backdrop-blur-xl",
        "md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-full flex-col px-3 py-4">
          {/* Mobile Close Button */}
          <div className="flex justify-end mb-2 md:hidden">
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 hover:bg-pink-100 text-[#425563]">
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="mb-6 md:mb-8 px-3">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-8 w-8 bg-gradient-alat rounded-xl flex items-center justify-center shadow-alat-sm">
                <span className="text-white font-bold text-sm">AL</span>
              </div>
              <div>
                <h2 className="text-base md:text-lg font-bold text-gradient-alat">ALAT Lens</h2>
                <p className="text-xs md:text-sm text-[#AE328E]">Financial Intelligence</p>
              </div>
            </div>
          </div>
          
          <nav className="flex-1 space-y-6 overflow-y-auto">
            {/* Core Features */}
            <div className="space-y-1">
              <div className="px-3 mb-2">
                <h3 className="text-xs text-[#AE328E] uppercase tracking-wider font-semibold">
                  Core Features
                </h3>
              </div>
              {coreNavigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleItemClick(item.id)}
                  className={cn(
                    activeView === item.id
                      ? 'bg-gradient-alat text-white shadow-alat-sm'
                      : 'text-[#425563] hover:bg-pink-100/70 hover:text-[#AE328E]',
                    'group flex items-center px-3 py-2.5 md:py-2 rounded-xl transition-all duration-200 w-full text-left text-sm font-medium'
                  )}
                >
                  <item.icon
                    className="mr-3 h-4 w-4 md:h-5 md:w-5 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span className="truncate">{item.name}</span>
                </button>
              ))}
            </div>

            {/* Advanced Features */}
            <div className="space-y-1">
              <div className="px-3 mb-2">
                <h3 className="text-xs text-[#AE328E] uppercase tracking-wider font-semibold">
                  Advanced
                </h3>
              </div>
              {advancedNavigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleItemClick(item.id)}
                  className={cn(
                    activeView === item.id
                      ? 'bg-gradient-alat text-white shadow-alat-sm'
                      : 'text-[#425563] hover:bg-pink-100/70 hover:text-[#AE328E]',
                    'group flex items-center px-3 py-2.5 md:py-2 rounded-xl transition-all duration-200 w-full text-left text-sm font-medium'
                  )}
                >
                  <item.icon
                    className="mr-3 h-4 w-4 md:h-5 md:w-5 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span className="truncate">{item.name}</span>
                </button>
              ))}
            </div>
          </nav>
          
          <div className="mt-6 pt-6 border-t border-pink-200/50">
            <div className="px-3">
              <p className="text-xs text-[#AE328E] uppercase tracking-wider font-semibold">
                Quick Actions
              </p>
              <div className="mt-3 space-y-2">
                <button 
                  onClick={() => handleItemClick('banking')}
                  className="block text-xs md:text-sm text-[#425563] hover:text-[#AE328E] hover:bg-pink-100/50 px-2 py-1 rounded-lg transition-all duration-200 w-full text-left font-medium"
                >
                  Link ALAT Account
                </button>
                <button 
                  onClick={() => handleItemClick('micro-actions')}
                  className="block text-xs md:text-sm text-[#425563] hover:text-[#AE328E] hover:bg-pink-100/50 px-2 py-1 rounded-lg transition-all duration-200 w-full text-left font-medium"
                >
                  Create Savings Goal
                </button>
                <button 
                  onClick={() => handleItemClick('social')}
                  className="block text-xs md:text-sm text-orange-700 hover:text-orange-900 hover:bg-orange-100/50 px-2 py-1 rounded-lg transition-all duration-200 w-full text-left font-medium"
                >
                  Split Bill
                </button>
              </div>
            </div>
          </div>
          
          {/* Mobile bottom spacing */}
          <div className="h-20 md:hidden" />
        </div>
      </aside>
    </>
  )
}