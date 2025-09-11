'use client'
import { useState } from "react"
import { Header } from "./Header"
import { Sidebar } from "./Sidebar" 
import { MobileBottomBar } from "./MobileBottomBar"
import { DashboardOverview } from "./DashboardOverview"
import { TransactionHistory } from "./TransactionHistory"
import { TransactionAnalytics } from "./TransactionAnalytics"
import { PaymentIntelligence } from "./PaymentIntelligence"
import { BankingIntegration } from "./BankingIntegration"
import { MicroActions } from "./MicroActions"
import { SocialPayments } from "./SocialPayments"
import { SettingsPage } from "./SettingsPage"
import { HelpCenter } from "./HelpCenter"



type ActiveView = 'dashboard' | 'intelligence' | 'micro-actions' | 'social' | 'business' | 'banking' | 'analytics' | 'transactions' | 'transaction-analytics' | 'settings' | 'help'

export function ALATLensApp() {
  const [activeView, setActiveView] = useState<ActiveView>('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleNavigation = (view: string) => {
    setActiveView(view as ActiveView)
    setSidebarOpen(false) // Close sidebar on mobile after navigation
  }

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardOverview onNavigate={handleNavigation} />
      case 'transactions':
        return <TransactionHistory />
      case 'analytics':
      case 'transaction-analytics':
        return <TransactionAnalytics />
      case 'intelligence':
        return <PaymentIntelligence />
      case 'banking':
        return <BankingIntegration />
      case 'micro-actions':
        return <MicroActions />
      case 'social':
        return <SocialPayments />
      case 'settings':
        return <SettingsPage />
      case 'help':
        return <HelpCenter />
      default:
        return <DashboardOverview onNavigate={handleNavigation} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#fef9fc] to-[#f5e6f1]/30">
      <div className="flex h-screen overflow-hidden">
        <Sidebar 
          activeView={activeView} 
          onViewChange={handleNavigation}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        
        <div className="flex-1 flex flex-col overflow-hidden md:ml-[300px]">
          <Header 
            onMenuClick={() => setSidebarOpen(true)}
            onNavigate={handleNavigation}
          />
          
          <main className="flex-1 overflow-y-auto px-4 py-4 md:px-8 md:py-6 pb-20 md:pb-6" style={{
            background: 'transparent'
          }}>
            <div className="h-full max-w-7xl mx-auto">
              <div className="space-y-4 md:space-y-6">
                {renderActiveView()}
              </div>
            </div>
          </main>
          
          <MobileBottomBar 
            activeView={activeView}
            onNavigate={handleNavigation}
          />
        </div>
      </div>
    </div>
  )
}