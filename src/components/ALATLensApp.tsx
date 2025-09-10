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
    <div className="min-h-screen bg-gradient-to-br from-pink-50/50 via-white to-pink-100/30">
      <div className="flex h-screen overflow-hidden">
        <Sidebar 
          activeView={activeView} 
          onViewChange={handleNavigation}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header 
            onMenuClick={() => setSidebarOpen(true)}
            onNavigate={handleNavigation}
          />
          
          <main className="flex-1 overflow-y-auto bg-transparent">
            <div className="h-full">
              {renderActiveView()}
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