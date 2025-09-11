'use client'

import { Wallet, Zap, Users, User, LogOut, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

interface ExpandableSidebarProps {
  activeView?: string
  onViewChange?: (view: string) => void
  isExpanded: boolean
  onToggle: () => void
}

const navigation = [
  { name: 'Stash', icon: Wallet, id: 'dashboard' },
  { name: 'Sparks', icon: Zap, id: 'intelligence' },
  { name: 'Connect', icon: Users, id: 'social' },
]

const bottomActions = [
  { name: 'Profile', icon: User, id: 'profile' },
  { name: 'Log Out', icon: LogOut, id: 'logout' },
]

export function ExpandableSidebar({ 
  activeView = 'dashboard', 
  onViewChange, 
  isExpanded,
  onToggle 
}: ExpandableSidebarProps) {
  const handleItemClick = (id: string) => {
    if (id === 'logout') {
      console.log('Logout clicked')
      return
    }
    onViewChange?.(id)
  }

  return (
    <div 
      className={`
        fixed left-0 top-0 h-full z-50
        transition-all duration-300 ease-in-out
        ${isExpanded ? 'w-64' : 'w-16'}
        bg-gradient-to-b from-white/95 via-[#fef9fc]/95 to-[#f5e6f1]/30
        backdrop-blur-xl border-r border-[#AE328E]/10
        shadow-[4px_0_24px_rgba(174,50,142,0.08)]
      `}
    >
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className={`
          absolute top-6 -right-3 w-6 h-6 
          bg-white border border-[#AE328E]/20 rounded-full
          flex items-center justify-center
          shadow-md hover:shadow-lg transition-all duration-200
          hover:bg-[#AE328E] hover:text-white
          z-10
        `}
      >
        {isExpanded ? (
          <ChevronLeft className="w-3 h-3" />
        ) : (
          <ChevronRight className="w-3 h-3" />
        )}
      </button>

      <div className="flex flex-col h-full p-4">
        {/* Logo and Title */}
        <div className={`flex items-center mb-8 ${isExpanded ? 'gap-3' : 'justify-center'}`}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#AE328E] to-[#c13a9e] flex items-center justify-center shadow-lg">
            <Image
              src="/logo.webp"
              alt="ALAT Logo"
              width={20}
              height={20}
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
          {isExpanded && (
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-[#AE328E] to-[#c13a9e] bg-clip-text text-transparent">
                ALAT Spark
              </h1>
              <p className="text-xs text-gray-600">Money made fun 💫</p>
            </div>
          )}
        </div>

        {/* Main Navigation */}
        <nav className="flex-1">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const isActive = activeView === item.id
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleItemClick(item.id)}
                    className={`
                      w-full flex items-center rounded-lg p-3 transition-all duration-200
                      ${isExpanded ? 'gap-3' : 'justify-center'}
                      ${isActive 
                        ? 'bg-gradient-to-r from-[#AE328E] to-[#c13a9e] text-white shadow-lg transform translate-y-[-1px]' 
                        : 'text-gray-700 hover:bg-[#AE328E]/5 hover:text-[#AE328E] hover:translate-y-[-1px]'
                      }
                    `}
                    title={!isExpanded ? item.name : undefined}
                  >
                    <item.icon 
                      className={`w-5 h-5 ${isActive ? 'text-white' : ''}`} 
                      strokeWidth={2.5}
                    />
                    {isExpanded && (
                      <span className="font-medium text-sm">{item.name}</span>
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Bottom Actions */}
        <div className="border-t border-gray-200/50 pt-4">
          <ul className="space-y-1">
            {bottomActions.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleItemClick(item.id)}
                  className={`
                    w-full flex items-center rounded-lg p-2.5 transition-all duration-200
                    ${isExpanded ? 'gap-3' : 'justify-center'}
                    text-gray-600 hover:bg-gray-100 hover:text-gray-900
                    ${item.id === 'logout' ? 'hover:bg-red-50 hover:text-red-600' : ''}
                  `}
                  title={!isExpanded ? item.name : undefined}
                >
                  <item.icon className="w-4 h-4" strokeWidth={2} />
                  {isExpanded && (
                    <span className="font-medium text-sm">{item.name}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}