import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  Target,
  Brain,
  Zap,
  CreditCard,
  ArrowUpRight,
  ArrowDownLeft,
  DollarSign,
  ShoppingCart,
  Car,
  Home,
  Coffee,
  Smartphone
} from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from 'recharts'

const monthlyData = [
  { month: 'Oct', income: 450000, expenses: 285000, savings: 165000 },
  { month: 'Nov', income: 475000, expenses: 320000, savings: 155000 },
  { month: 'Dec', income: 450000, expenses: 298000, savings: 152000 },
]

const categoryData = [
  { name: 'Food & Groceries', amount: 89500, percentage: 30, color: '#FF6B6B', icon: ShoppingCart },
  { name: 'Transportation', amount: 67200, percentage: 22.5, color: '#4ECDC4', icon: Car },
  { name: 'Entertainment', amount: 45000, percentage: 15, color: '#45B7D1', icon: Smartphone },
  { name: 'Utilities', amount: 38500, percentage: 13, color: '#96CEB4', icon: Home },
  { name: 'Shopping', amount: 32000, percentage: 10.5, color: '#FFEAA7', icon: ShoppingCart },
  { name: 'Others', amount: 25800, percentage: 9, color: '#DDA0DD', icon: Coffee },
]

const dailySpendingData = [
  { day: 'Mon', amount: 12500 },
  { day: 'Tue', amount: 8900 },
  { day: 'Wed', amount: 15600 },
  { day: 'Thu', amount: 22300 },
  { day: 'Fri', amount: 18700 },
  { day: 'Sat', amount: 35400 },
  { day: 'Sun', amount: 14200 },
]

const spendingTrends = [
  { period: 'Week 1', amount: 68500, trend: 'up' },
  { period: 'Week 2', amount: 72300, trend: 'up' },
  { period: 'Week 3', amount: 65200, trend: 'down' },
  { period: 'Week 4', amount: 58900, trend: 'down' },
]

const smartInsights = [
  {
    type: 'warning',
    title: 'Food spending above average',
    description: 'You spent 15% more on food this month compared to your 3-month average',
    impact: 'High',
    suggestion: 'Consider meal planning to reduce grocery costs'
  },
  {
    type: 'success',
    title: 'Great transportation savings',
    description: 'Your ride-sharing costs decreased by 23% this month',
    impact: 'Medium',
    suggestion: 'Keep using public transport when possible'
  },
  {
    type: 'info',
    title: 'New spending pattern detected',
    description: 'Increased entertainment spending on weekends',
    impact: 'Low',
    suggestion: 'Set weekend entertainment budget limits'
  },
  {
    type: 'success',
    title: 'Micro-actions working well',
    description: 'Auto-save triggered 12 times, saving ₦24,500 this month',
    impact: 'High',
    suggestion: 'Consider increasing auto-save amounts'
  }
]

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN'
  }).format(amount)
}

export function TransactionAnalytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl flex items-center gap-2 mb-2">
            <BarChart3 className="h-6 w-6" />
            Transaction Analytics
          </h1>
          <p className="text-muted-foreground">
            AI-powered insights into your spending patterns and financial behavior
          </p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="month">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Calendar className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <Card>
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm text-muted-foreground">Total Income</p>
                <p className="text-lg md:text-2xl font-medium text-green-600">₦450,000</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +5.6% from last month
                </p>
              </div>
              <div className="p-1.5 md:p-2 bg-green-100 rounded-lg">
                <ArrowUpRight className="h-4 w-4 md:h-5 md:w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm text-muted-foreground">Total Expenses</p>
                <p className="text-lg md:text-2xl font-medium text-red-600">₦298,000</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <TrendingDown className="h-3 w-3" />
                  -7.2% from last month
                </p>
              </div>
              <div className="p-1.5 md:p-2 bg-red-100 rounded-lg">
                <ArrowDownLeft className="h-4 w-4 md:h-5 md:w-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm text-muted-foreground">Net Savings</p>
                <p className="text-lg md:text-2xl font-medium text-blue-600">₦152,000</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Target className="h-3 w-3" />
                  33.8% of income
                </p>
              </div>
              <div className="p-1.5 md:p-2 bg-blue-100 rounded-lg">
                <DollarSign className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm text-muted-foreground">Auto-Saves</p>
                <p className="text-lg md:text-2xl font-medium text-purple-600">₦24,500</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Zap className="h-3 w-3" />
                  12 triggers this month
                </p>
              </div>
              <div className="p-1.5 md:p-2 bg-purple-100 rounded-lg">
                <Zap className="h-4 w-4 md:h-5 md:w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Monthly Financial Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `₦${(value / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Bar dataKey="income" fill="#22C55E" name="Income" />
                <Bar dataKey="expenses" fill="#EF4444" name="Expenses" />
                <Bar dataKey="savings" fill="#3B82F6" name="Savings" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Spending by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="amount"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              </RechartsPieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {categoryData.map((category, index) => {
                const IconComponent = category.icon
                return (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: category.color }}
                      />
                      <IconComponent className="h-4 w-4" />
                      <span className="text-sm">{category.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{formatCurrency(category.amount)}</p>
                      <p className="text-xs text-muted-foreground">{category.percentage}%</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Daily Spending Pattern */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Daily Spending Pattern (This Week)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={dailySpendingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis tickFormatter={(value) => `₦${(value / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI-Powered Financial Insights
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Smart analysis of your spending patterns and personalized recommendations
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {smartInsights.map((insight, index) => (
              <div key={index} className="p-4 rounded-lg border bg-card">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`p-1 rounded-full ${
                      insight.type === 'success' ? 'bg-green-100' :
                      insight.type === 'warning' ? 'bg-yellow-100' :
                      'bg-blue-100'
                    }`}>
                      <Brain className={`h-3 w-3 ${
                        insight.type === 'success' ? 'text-green-600' :
                        insight.type === 'warning' ? 'text-yellow-600' :
                        'text-blue-600'
                      }`} />
                    </div>
                    <h4 className="font-medium">{insight.title}</h4>
                  </div>
                  <Badge variant={
                    insight.impact === 'High' ? 'destructive' :
                    insight.impact === 'Medium' ? 'default' :
                    'secondary'
                  }>
                    {insight.impact} Impact
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{insight.description}</p>
                <p className="text-sm text-blue-600">💡 {insight.suggestion}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Spending Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Weekly Spending Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {spendingTrends.map((trend, index) => (
              <div key={index} className="p-3 rounded-lg border bg-card">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium">{trend.period}</p>
                  {trend.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 text-red-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-green-500" />
                  )}
                </div>
                <p className="text-base md:text-lg font-medium">{formatCurrency(trend.amount)}</p>
                <p className={`text-xs ${
                  trend.trend === 'up' ? 'text-red-500' : 'text-green-500'
                }`}>
                  {trend.trend === 'up' ? '↗' : '↘'} vs previous week
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}