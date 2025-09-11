import { useState } from "react"
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Progress } from "./ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Target,
  Calendar,
  PieChart,
  BarChart3,
  Zap,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowUpRight,
  ArrowDownLeft,
  ArrowRight,
  Lightbulb,
  Shield,
  TrendingFlat
} from "lucide-react"
import { LineChart, Line, Area, AreaChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from 'recharts'

const monthlyData = [
  { month: 'Jul', income: 425000, expenses: 295000, savings: 130000, netWorth: 2150000 },
  { month: 'Aug', income: 445000, expenses: 312000, savings: 133000, netWorth: 2283000 },
  { month: 'Sep', income: 460000, expenses: 298000, savings: 162000, netWorth: 2445000 },
  { month: 'Oct', income: 450000, expenses: 285000, savings: 165000, netWorth: 2610000 },
  { month: 'Nov', income: 475000, expenses: 320000, savings: 155000, netWorth: 2765000 },
  { month: 'Dec', income: 450000, expenses: 298000, savings: 152000, netWorth: 2917000 },
]

const weeklyData = [
  { week: 'Week 1', spending: 68500, budget: 75000 },
  { week: 'Week 2', spending: 72300, budget: 75000 },
  { week: 'Week 3', spending: 65200, budget: 75000 },
  { week: 'Week 4', spending: 58900, budget: 75000 },
]

const goalProgress = [
  {
    name: "Emergency Fund",
    target: 2700000, // 6 months of expenses
    current: 1890000,
    percentage: 70,
    monthlyContribution: 45000,
    estimatedCompletion: "18 months",
    priority: "high",
    onTrack: true
  },
  {
    name: "New Laptop Fund",
    target: 850000,
    current: 340000,
    percentage: 40,
    monthlyContribution: 25000,
    estimatedCompletion: "20 months",
    priority: "medium",
    onTrack: true
  },
  {
    name: "Investment Portfolio",
    target: 5000000,
    current: 750000,
    percentage: 15,
    monthlyContribution: 85000,
    estimatedCompletion: "50 months",
    priority: "low",
    onTrack: false
  }
]

const spendingInsights = [
  {
    type: "warning",
    icon: AlertTriangle,
    title: "Budget Alert: Food & Groceries",
    description: "You've exceeded your grocery budget by ₦14,500 this month",
    impact: "₦14,500 over budget",
    action: "Review grocery spending",
    priority: "high"
  },
  {
    type: "success",
    icon: CheckCircle,
    title: "Great Progress on Transportation",
    description: "You've saved ₦12,800 on transportation this month",
    impact: "₦12,800 saved",
    action: "Keep up the good work",
    priority: "low"
  },
  {
    type: "info",
    icon: Lightbulb,
    title: "Smart Savings Opportunity",
    description: "You could save an additional ₦8,200 by optimizing subscription services",
    impact: "₦8,200 potential savings",
    action: "Review subscriptions",
    priority: "medium"
  },
  {
    type: "neutral",
    icon: Zap,
    title: "Auto-Save Working Well",
    description: "Your micro-actions have automatically saved ₦24,500 this month",
    impact: "₦24,500 auto-saved",
    action: "Consider increasing triggers",
    priority: "low"
  }
]

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN'
  }).format(amount)
}

const formatLargeNumber = (num: number) => {
  if (num >= 1000000) {
    return `₦${(num / 1000000).toFixed(1)}M`
  }
  if (num >= 1000) {
    return `₦${(num / 1000).toFixed(0)}K`
  }
  return formatCurrency(num)
}

export function PersonalSpendingSummary() {
  const theme = useTheme();
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [viewType, setViewType] = useState("overview")

  const currentMonth = monthlyData[monthlyData.length - 1]
  const previousMonth = monthlyData[monthlyData.length - 2]
  
  const incomeChange = ((currentMonth.income - previousMonth.income) / previousMonth.income) * 100
  const expenseChange = ((currentMonth.expenses - previousMonth.expenses) / previousMonth.expenses) * 100
  const savingsChange = ((currentMonth.savings - previousMonth.savings) / previousMonth.savings) * 100
  
  const totalBudget = 320000
  const budgetUsed = (currentMonth.expenses / totalBudget) * 100

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl mb-2">Personal Spending Summary</h1>
          <p className="text-muted-foreground">
            Comprehensive overview of your financial health and spending patterns
          </p>
        </div>
        
        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
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
          
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Custom Range
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Income</p>
                <p className="text-2xl font-medium" style={{ color: theme.palette.success.main }}>{formatCurrency(currentMonth.income)}</p>
                <p className="text-xs flex items-center gap-1" style={{ color: incomeChange >= 0 ? theme.palette.success.main : theme.palette.error.main }}>
                  {incomeChange >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {Math.abs(incomeChange).toFixed(1)}% from last month
                </p>
              </div>
              <div className="p-2 rounded-lg" style={{ background: theme.palette.success.light }}>
                <ArrowUpRight className="h-5 w-5" style={{ color: theme.palette.success.main }} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Expenses</p>
                <p className="text-2xl font-medium" style={{ color: theme.palette.error.main }}>{formatCurrency(currentMonth.expenses)}</p>
                <p className="text-xs flex items-center gap-1" style={{ color: expenseChange <= 0 ? theme.palette.success.main : theme.palette.error.main }}>
                  {expenseChange <= 0 ? <TrendingDown className="h-3 w-3" /> : <TrendingUp className="h-3 w-3" />}
                  {Math.abs(expenseChange).toFixed(1)}% from last month
                </p>
              </div>
              <div className="p-2 rounded-lg" style={{ background: theme.palette.error.light }}>
                <ArrowDownLeft className="h-5 w-5" style={{ color: theme.palette.error.main }} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Net Savings</p>
                <p className="text-2xl font-medium" style={{ color: theme.palette.info.main }}>{formatCurrency(currentMonth.savings)}</p>
                <p className="text-xs flex items-center gap-1" style={{ color: savingsChange >= 0 ? theme.palette.success.main : theme.palette.error.main }}>
                  {savingsChange >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {Math.abs(savingsChange).toFixed(1)}% from last month
                </p>
              </div>
              <div className="p-2 rounded-lg" style={{ background: theme.palette.info.light }}>
                <DollarSign className="h-5 w-5" style={{ color: theme.palette.info.main }} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Budget Usage</p>
                <p className="text-2xl font-medium">{budgetUsed.toFixed(1)}%</p>
                <p className="text-xs text-muted-foreground">
                  {formatCurrency(totalBudget - currentMonth.expenses)} remaining
                </p>
              </div>
              <div className="p-2 rounded-lg" style={{ background: theme.palette.warning.light }}>
                <Target className="h-5 w-5" style={{ color: theme.palette.warning.main }} />
              </div>
            </div>
            <Progress value={budgetUsed} className="mt-2 h-2" />
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={viewType} onValueChange={setViewType} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Financial Trend */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5" />
                  6-Month Financial Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => formatLargeNumber(value)} />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Area
                      type="monotone"
                      dataKey="income"
                      stackId="1"
                      stroke={theme.palette.success.main}
                      fill={theme.palette.success.main}
                      fillOpacity={0.6}
                      name="Income"
                    />
                    <Area
                      type="monotone"
                      dataKey="expenses"
                      stackId="2"
                      stroke={theme.palette.error.main}
                      fill={theme.palette.error.main}
                      fillOpacity={0.6}
                      name="Expenses"
                    />
                    <Line
                      type="monotone"
                      dataKey="savings"
                      stroke={theme.palette.info.main}
                      strokeWidth={3}
                      name="Savings"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Weekly Budget Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Weekly Budget Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis tickFormatter={(value) => `₦${(value / 1000).toFixed(0)}k`} />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Bar dataKey="budget" fill={theme.palette.grey[200] || '#E5E7EB'} name="Budget" />
                    <Bar dataKey="spending" fill={theme.palette.info.main} name="Actual Spending" />
                  </BarChart>
                </ResponsiveContainer>
                
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="text-center p-3 rounded-lg" style={{ background: theme.palette.success.light }}>
                    <p className="text-sm text-muted-foreground">Avg. Under Budget</p>
                    <p className="text-lg font-medium" style={{ color: theme.palette.success.main }}>₦8,775</p>
                  </div>
                  <div className="text-center p-3 rounded-lg" style={{ background: theme.palette.info.light }}>
                    <p className="text-sm text-muted-foreground">Best Week</p>
                    <p className="text-lg font-medium" style={{ color: theme.palette.info.main }}>Week 4</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Financial Health Score */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Financial Health Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="relative w-24 h-24 mx-auto mb-3">
                    <div className="w-full h-full rounded-full flex items-center justify-center" style={{ background: theme.palette.success.light }}>
                      <span className="text-2xl font-bold" style={{ color: theme.palette.success.main }}>85</span>
                    </div>
                  </div>
                  <h3 className="font-medium mb-1">Overall Score</h3>
                  <p className="text-sm text-muted-foreground">Excellent financial health</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Savings Rate</span>
                      <span>33.8%</span>
                    </div>
                    <Progress value={67.6} className="h-2" />
                    <p className="text-xs mt-1" style={{ color: theme.palette.success.main }}>Above recommended 20%</p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Budget Adherence</span>
                      <span>93.1%</span>
                    </div>
                    <Progress value={93.1} className="h-2" />
                    <p className="text-xs mt-1" style={{ color: theme.palette.success.main }}>Excellent control</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Emergency Fund</span>
                      <span>4.2 months</span>
                    </div>
                    <Progress value={70} className="h-2" />
                    <p className="text-xs mt-1" style={{ color: theme.palette.warning.main }}>Target: 6 months</p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Goal Progress</span>
                      <span>76%</span>
                    </div>
                    <Progress value={76} className="h-2" />
                    <p className="text-xs mt-1" style={{ color: theme.palette.success.main }}>On track with goals</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4" style={{ color: theme.palette.success.main }} />
                    <span>Emergency fund building</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4" style={{ color: theme.palette.success.main }} />
                    <span>Consistent savings</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <AlertTriangle className="h-4 w-4" style={{ color: theme.palette.warning.main }} />
                    <span>High grocery spending</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4" style={{ color: theme.palette.success.main }} />
                    <span>Auto-save active</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Net Worth Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => formatLargeNumber(value)} />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Line
                      type="monotone"
                      dataKey="netWorth"
                      stroke={theme.palette.primary.main}
                      strokeWidth={3}
                      name="Net Worth"
                    />
                  </LineChart>
                </ResponsiveContainer>
                <div className="mt-4 text-center">
                  <p className="text-2xl font-bold" style={{ color: theme.palette.primary.main }}>{formatCurrency(currentMonth.netWorth)}</p>
                  <p className="text-sm text-muted-foreground">Current Net Worth</p>
                  <p className="text-sm text-green-600">+₦767,000 (35.6%) this year</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Spending Velocity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold">₦9,933</p>
                      <p className="text-sm text-muted-foreground">Daily Average</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">₦74,500</p>
                      <p className="text-sm text-muted-foreground">Weekly Average</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">₦298,000</p>
                      <p className="text-sm text-muted-foreground">Monthly Total</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mt-6">
<div className="flex justify-between items-center p-3 rounded-lg" style={{ background: theme.palette.success.light }}>
                       <span className="font-medium">Lowest Day</span>
                       <span style={{ color: theme.palette.success.main }}>₦2,800 (Sunday)</span>
                     </div>
                     <div className="flex justify-between items-center p-3 rounded-lg" style={{ background: theme.palette.error.light }}>
                       <span className="font-medium">Highest Day</span>
                       <span style={{ color: theme.palette.error.main }}>₦35,400 (Saturday)</span>
                     </div>
                     <div className="flex justify-between items-center p-3 rounded-lg" style={{ background: theme.palette.info.light }}>
                       <span className="font-medium">Most Active</span>
                       <span style={{ color: theme.palette.info.main }}>Weekends</span>
                     </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="goals" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {goalProgress.map((goal, index) => (
              <Card key={index} className={goal.onTrack ? '' : 'border-orange-200'}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{goal.name}</CardTitle>
                    <Badge variant={goal.priority === 'high' ? 'destructive' : goal.priority === 'medium' ? 'default' : 'secondary'}>
                      {goal.priority}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span>{goal.percentage}%</span>
                    </div>
                    <Progress value={goal.percentage} className="h-3" />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>{formatCurrency(goal.current)}</span>
                      <span>{formatCurrency(goal.target)}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Monthly</p>
                      <p className="font-medium">{formatCurrency(goal.monthlyContribution)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Completion</p>
                      <p className="font-medium">{goal.estimatedCompletion}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 p-2 rounded text-sm"
                      style={{ background: goal.onTrack ? theme.palette.success.light : theme.palette.warning.light, color: goal.onTrack ? theme.palette.success.main : theme.palette.warning.main }}>
                    {goal.onTrack ? (
                      <CheckCircle className="h-4 w-4" style={{ color: theme.palette.success.main }} />
                    ) : (
                      <Clock className="h-4 w-4" style={{ color: theme.palette.warning.main }} />
                    )}
                    <span>{goal.onTrack ? 'On track' : 'Behind schedule'}</span>
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full">
                    <ArrowRight className="h-3 w-3 mr-2" />
                    Adjust Goal
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {spendingInsights.map((insight, index) => {
              const IconComponent = insight.icon
              return (
                <Card key={index} className={`${
                  insight.type === 'warning' ? 'border-red-200 bg-red-50/50' :
                  insight.type === 'success' ? 'border-green-200 bg-green-50/50' :
                  insight.type === 'info' ? 'border-blue-200 bg-blue-50/50' :
                  'border-gray-200'
                }`}>
                  <CardHeader>
                    <div className="flex items-start gap-3">
<div className="p-2 rounded-lg" style={{
                         background: insight.type === 'warning' ? theme.palette.error.light :
                                    insight.type === 'success' ? theme.palette.success.light :
                                    insight.type === 'info' ? theme.palette.info.light :
                                    theme.palette.grey[100]
                       }}>
                         <IconComponent className="h-4 w-4" style={{
                           color: insight.type === 'warning' ? theme.palette.error.main :
                                  insight.type === 'success' ? theme.palette.success.main :
                                  insight.type === 'info' ? theme.palette.info.main :
                                  theme.palette.grey[600]
                         }} />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-base">{insight.title}</CardTitle>
                        <Badge variant="outline" className="mt-1">
                          {insight.priority} priority
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{insight.description}</p>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium">Impact:</span>
<span className="text-sm font-medium" style={{
                         color: insight.type === 'warning' ? theme.palette.error.main :
                                insight.type === 'success' ? theme.palette.success.main :
                                theme.palette.info.main
                       }}>
                         {insight.impact}
                       </span>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      {insight.action}
                      <ArrowRight className="h-3 w-3 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}