import { ArrowRight, TrendingUp, Target, Users, CreditCard } from "lucide-react"
import { StatsCard } from "./StatsCard"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"

interface DashboardOverviewProps {
  onNavigate: (view: string) => void
}

const quickStats = [
  {
    title: "Smart Savings",
    value: "₦127,340",
    change: "+28.5%",
    changeType: "positive" as const,
    icon: Target
  },
  {
    title: "This Month",
    value: "₦45,230",
    change: "-12.3%",
    changeType: "negative" as const,
    icon: TrendingUp
  }
]

const recentInsights = [
  {
    title: "Spending Pattern Alert",
    description: "You've spent 23% more on food delivery this week",
    action: "View Intelligence",
    view: "intelligence"
  },
  {
    title: "Savings Opportunity",
    description: "Round up ₦2,340 from recent transactions",
    action: "Create Action",
    view: "micro-actions"
  },
  {
    title: "Bill Reminder",
    description: "Split electricity bill with 3 roommates",
    action: "Split Bill",
    view: "social"
  }
]

export function DashboardOverview({ onNavigate }: DashboardOverviewProps) {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="relative p-6 rounded-2xl bg-gradient-alat overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/10 pointer-events-none"></div>
        <div className="relative z-10">
          <h1 className="text-2xl font-bold text-white mb-2">Welcome back!</h1>
          <p className="text-white/90">
            Here's your financial overview and latest insights
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
        {quickStats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
        
        {/* Quick Action Card */}
        <Card className="cursor-pointer hover-lift shadow-alat border-0 bg-gradient-alat-secondary overflow-hidden relative" onClick={() => onNavigate('banking')}>
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none"></div>
          <CardContent className="p-4 text-center relative z-10">
            <div className="p-3 rounded-full bg-[#AE328E]/20 backdrop-blur-sm w-fit mx-auto mb-3">
              <CreditCard className="h-6 w-6 text-[#AE328E]" />
            </div>
            <p className="text-sm font-medium text-[#425563]">Connect Bank</p>
          </CardContent>
        </Card>
      </div>

      {/* Key Insights & Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
        {recentInsights.map((insight, index) => (
          <Card key={index} className="hover-lift shadow-alat border-pink-200/50 bg-gradient-to-br from-white via-pink-50/50 to-pink-100/30">
            <CardContent className="p-5">
              <h3 className="font-semibold mb-2 text-[#425563]">{insight.title}</h3>
              <p className="text-sm text-[#AE328E] mb-4">{insight.description}</p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onNavigate(insight.view)}
                className="w-full bg-gradient-alat text-white border-0 hover:shadow-alat-md transition-all duration-300"
              >
                {insight.action}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <Card className="cursor-pointer hover-lift shadow-orange-lg border-0 bg-gradient-to-br from-orange-50 via-white to-orange-100/50 overflow-hidden relative" onClick={() => onNavigate('transactions')}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-orange opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
          <CardHeader className="pb-3 relative z-10">
            <CardTitle className="flex items-center justify-between text-orange-900">
              Transaction History
              <div className="p-2 rounded-full bg-gradient-orange shadow-orange-sm">
                <ArrowRight className="h-4 w-4 text-white" />
              </div>
            </CardTitle>
            <CardDescription className="text-orange-700">
              View all your transactions and spending patterns
            </CardDescription>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-2xl font-bold text-gradient-orange">₦234,560</div>
            <p className="text-sm text-orange-600">Total this month</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover-lift shadow-orange-lg border-0 bg-gradient-to-br from-orange-50 via-white to-orange-100/50 overflow-hidden relative" onClick={() => onNavigate('transaction-analytics')}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-orange opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
          <CardHeader className="pb-3 relative z-10">
            <CardTitle className="flex items-center justify-between text-orange-900">
              Analytics & Insights
              <div className="p-2 rounded-full bg-gradient-orange shadow-orange-sm">
                <ArrowRight className="h-4 w-4 text-white" />
              </div>
            </CardTitle>
            <CardDescription className="text-orange-700">
              Deep dive into your financial analytics
            </CardDescription>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-2xl font-bold text-gradient-orange">94.2%</div>
            <p className="text-sm text-orange-600">Intelligence score</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}