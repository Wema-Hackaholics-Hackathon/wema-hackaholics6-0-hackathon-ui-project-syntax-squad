'use client'
import { useState, useEffect } from "react"
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
import { AuthOverlay } from "./AuthOverlay"
import { authService } from "../services/authService"
import { User } from "../types"

type ActiveView = 'dashboard' | 'intelligence' | 'micro-actions' | 'social' | 'business' | 'banking' | 'analytics' | 'transactions' | 'transaction-analytics' | 'settings' | 'help'

export function ALATLensApp() {
  const [activeView, setActiveView] = useState<ActiveView>('dashboard')
  const [sidebarExpanded, setSidebarExpanded] = useState(true)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  // Check for existing session on app load
  useEffect(() => {
    const checkSession = async () => {
      try {
        const user = await authService.checkSession()
        setCurrentUser(user)
      } catch (error) {
        console.error('Session check failed:', error)
      } finally {
        setIsLoading(false)
      }
    }

    checkSession()
  }, [])

  const handleNavigation = (view: string) => {
    setActiveView(view as ActiveView)
  }

  const handleAuthSuccess = (user: User) => {
    setCurrentUser(user)
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
    <Box sx={{
      minHeight: '100vh',
      background: theme.palette.mode === 'dark'
        ? 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 50%, rgba(42,42,42,0.9) 100%)'
        : 'linear-gradient(135deg, #ffffff 0%, #fef9fc 50%, rgba(245,230,241,0.3) 100%)',
    }}>
      {/* Authentication Overlay */}
      {!currentUser && !isLoading && (
        <AuthOverlay onAuthSuccess={handleAuthSuccess} />
      )}

      {/* Main App Content */}
      {currentUser && (
        <>
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
                    gap: { xs: 4, md: 6 }
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
        </>
      )}

      {/* Loading State */}
      {isLoading && (
        <Box 
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: theme.palette.mode === 'dark' 
              ? 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 50%, rgba(42,42,42,0.9) 100%)'
              : 'linear-gradient(135deg, #ffffff 0%, #fef9fc 50%, rgba(245,230,241,0.3) 100%)',
            zIndex: 9998
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <Box 
              component="img"
              src="/logo.webp"
              alt="ALAT Logo"
              sx={{
                width: 80,
                height: 80,
                mx: 'auto',
                mb: 2,
                filter: 'drop-shadow(0 8px 20px rgba(174, 50, 142, 0.3))',
                animation: 'pulse 2s ease-in-out infinite'
              }}
            />
            <Box sx={{ 
              color: theme.palette.primary.main, 
              fontWeight: 600, 
              fontSize: '1.1rem' 
            }}>
              Loading ALAT Spark...
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  )
}