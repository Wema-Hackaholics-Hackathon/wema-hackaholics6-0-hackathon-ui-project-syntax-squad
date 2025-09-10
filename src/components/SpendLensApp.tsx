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

  const renderMainContent = () => {
    switch (activeView) {
      case 'intelligence':
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gradient-orange mb-2">Payment Intelligence</h1>
              <p className="text-orange-600">AI-powered insights and smart financial analysis</p>
            </div>
            <PaymentIntelligence />
          </div>
        )
      case 'micro-actions':
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gradient-orange mb-2">Micro-Action Triggers</h1>
              <p className="text-orange-600">Automated savings and smart financial actions</p>
            </div>
            <MicroActions />
          </div>
        )
      case 'social':
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gradient-orange mb-2">Social Payments</h1>
              <p className="text-orange-600">Collaborative spending and bill splitting made easy</p>
            </div>
            <SocialPayments />
          </div>
        )
      case 'banking':
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gradient-orange mb-2">Bank Connections</h1>
              <p className="text-orange-600">Connect your ALAT/Wema Bank accounts securely</p>
            </div>
            <BankingIntegration />
          </div>
        )
      case 'transactions':
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gradient-orange mb-2">Transaction History</h1>
              <p className="text-orange-600">Complete overview of your financial activity</p>
            </div>
            <TransactionHistory isCompact={false} showFilters={true} />
          </div>
        )
      case 'transaction-analytics':
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gradient-orange mb-2">Transaction Analytics</h1>  
              <p className="text-orange-600">Deep insights into your spending patterns</p>
            </div>
            <TransactionAnalytics />
          </div>
        )
      case 'business':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl mb-6">Business Hub</h1>
            <div className="p-8 text-center rounded-lg border bg-card">
              <h3 className="text-lg mb-2">Business Dashboard</h3>
              <p className="text-muted-foreground mb-4">
                Coming in Phase 2: Advanced business analytics, revenue tracking, and customer insights
              </p>
              <div className="text-sm text-muted-foreground">
                Features include: Cash flow predictions, Customer frequency analysis, Peak hour identification
              </div>
            </div>
          </div>
        )
      case 'analytics':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl mb-6">Advanced Analytics</h1>
            <div className="p-8 text-center rounded-lg border bg-card">
              <h3 className="text-lg mb-2">Predictive Analytics</h3>
              <p className="text-muted-foreground mb-4">
                Coming in Phase 3: Advanced pattern recognition and predictive financial insights
              </p>
              <div className="text-sm text-muted-foreground">
                Features include: Spending forecasts, Risk analysis, Opportunity detection
              </div>
            </div>
          </div>
        )
      case 'settings':
        return (
          <SettingsPage onBack={() => setActiveView('dashboard')} />
        )
      case 'help':
        return (
          <HelpCenter onBack={() => setActiveView('dashboard')} />
        )
      default:
        return <DashboardOverview onNavigate={setActiveView} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50/50 via-white to-pink-100/30">
      <Header onMenuClick={() => setSidebarOpen(true)} onNavigate={setActiveView} />
      <div className="flex">
        <Sidebar 
          activeView={activeView} 
          onViewChange={setActiveView}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <main className="flex-1 p-3 md:p-6 space-y-4 md:space-y-6 w-full overflow-x-hidden pb-20 md:pb-6 relative">
          {renderMainContent()}
        </main>
      </div>
      
      {/* Mobile Bottom Bar */}
      <MobileBottomBar 
        activeView={activeView}
        onViewChange={setActiveView}
      />
    </div>
  )
}