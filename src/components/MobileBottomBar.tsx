'use client'
import { Home, Receipt, Brain, Target, Users } from "lucide-react"
import { cn } from "./ui/utils"

interface MobileBottomBarProps {
  activeView?: string
  onNavigate?: (view: string) => void
}

const bottomNavItems = [
  { name: 'Home', icon: Home, id: 'dashboard' },
  { name: 'Transactions', icon: Receipt, id: 'transactions' },
  { name: 'Intelligence', icon: Brain, id: 'intelligence' },
  { name: 'Actions', icon: Target, id: 'micro-actions' },
  { name: 'Social', icon: Users, id: 'social' },
]

export function MobileBottomBar({ activeView = 'dashboard', onNavigate }: MobileBottomBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-gradient-to-t from-white via-pink-50/50 to-white backdrop-blur-xl border-t border-pink-200/50 shadow-alat-lg">
      <div className="flex items-center justify-around px-2 py-2 safe-bottom">
        {bottomNavItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate?.(item.id)}
            className={cn(
              "flex flex-col items-center justify-center px-3 py-2 rounded-xl transition-all duration-200 min-w-0 flex-1 font-medium",
              activeView === item.id
                ? "text-white bg-gradient-alat shadow-alat-sm"
                : "text-[#425563] hover:text-[#AE328E] hover:bg-pink-100/50"
            )}
          >
            <item.icon className="h-5 w-5 mb-1 flex-shrink-0" />
            <span className="text-xs truncate max-w-full">{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}