'use client'
import { useState } from "react"
import { Box, useMediaQuery, useTheme } from "@mui/material"
import { Header } from "./Header"
import { ExpandableSidebar } from "./ExpandableSidebar" 
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
  const [sidebarExpanded, setSidebarExpanded] = useState(true)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const handleNavigation = (view: string) => {
    setActiveView(view as ActiveView)
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

  const sidebarWidth = sidebarExpanded ? 240 : 64

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #ffffff 0%, #fef9fc 50%, rgba(245,230,241,0.3) 100%)',
    }}>
      {/* Header - Fixed at top */}
      <Header 
        onNavigate={handleNavigation}
      />
      
      <Box sx={{ display: 'flex', height: 'calc(100vh - 64px)', overflow: 'hidden' }}>
        {/* Expandable Sidebar - Hidden on mobile */}
        {!isMobile && (
          <ExpandableSidebar 
            activeView={activeView} 
            onViewChange={handleNavigation}
            isExpanded={sidebarExpanded}
            onToggle={() => setSidebarExpanded(!sidebarExpanded)}
          />
        )}
        
        {/* Main Content Area */}
        <Box 
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            marginLeft: isMobile ? 0 : `${sidebarWidth}px`,
            transition: 'margin-left 300ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <Box 
            component="main" 
            sx={{
              flexGrow: 1,
              overflow: 'auto',
              px: { xs: 2, md: 4 },
              py: { xs: 2, md: 3 },
              pb: { xs: 10, md: 3 }, // Extra bottom padding on mobile for bottom bar
            }}
          >
            <Box sx={{ 
              height: '100%', 
              maxWidth: '1400px', 
              mx: 'auto',
            }}>
              <Box sx={{ 
                display: 'flex',
                flexDirection: 'column',
                gap: { xs: 2, md: 3 }
              }}>
                {renderActiveView()}
              </Box>
            </Box>
          </Box>
          
          {/* Mobile Bottom Bar - Only shown on mobile */}
          {isMobile && (
            <MobileBottomBar 
              activeView={activeView}
              onNavigate={handleNavigation}
            />
          )}
        </Box>
      </Box>
    </Box>
  )
}