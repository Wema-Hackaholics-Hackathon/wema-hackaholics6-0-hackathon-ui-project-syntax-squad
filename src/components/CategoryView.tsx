import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Progress } from "./ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { 
  PieChart, 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Target,
  ShoppingCart,
  Car,
  Home,
  CreditCard,
  Smartphone,
  Coffee,
  Plus,
  Settings,
  Eye,
  Edit,
  ArrowRight,
  DollarSign
} from "lucide-react"
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

interface CategoryData {
  id: string
  name: string
  amount: number
  budget?: number
  percentage: number
  transactionCount: number
  trend: 'up' | 'down' | 'stable'
  trendPercentage: number
  color: string
  icon: any
  subcategories: SubcategoryData[]
}

interface SubcategoryData {
  name: string
  amount: number
  percentage: number
  transactionCount: number
}

const categoryData: CategoryData[] = [
  {
    id: "food",
    name: "Food & Groceries",
    amount: 89500,
    budget: 75000,
    percentage: 30,
    transactionCount: 24,
    trend: "up",
    trendPercentage: 15.3,
    color: "#FF6B6B",
    icon: ShoppingCart,
    subcategories: [
      { name: "Groceries", amount: 52000, percentage: 58.1, transactionCount: 12 },
      { name: "Restaurants", amount: 24500, percentage: 27.4, transactionCount: 8 },
      { name: "Coffee & Snacks", amount: 13000, percentage: 14.5, transactionCount: 4 }
    ]
  },
  {
    id: "transportation",
    name: "Transportation",
    amount: 67200,
    budget: 80000,
    percentage: 22.5,
    transactionCount: 18,
    trend: "down",
    trendPercentage: 8.7,
    color: "#4ECDC4",
    icon: Car,
    subcategories: [
      { name: "Ride Sharing", amount: 32400, percentage: 48.2, transactionCount: 10 },
      { name: "Fuel", amount: 24000, percentage: 35.7, transactionCount: 6 },
      { name: "Public Transport", amount: 10800, percentage: 16.1, transactionCount: 2 }
    ]
  },
  {
    id: "entertainment",
    name: "Entertainment",
    amount: 45000,
    budget: 50000,
    percentage: 15,
    transactionCount: 12,
    trend: "stable",
    trendPercentage: 2.1,
    color: "#45B7D1",
    icon: Smartphone,
    subcategories: [
      { name: "Streaming Services", amount: 18000, percentage: 40, transactionCount: 4 },
      { name: "Movies & Events", amount: 16500, percentage: 36.7, transactionCount: 5 },
      { name: "Gaming", amount: 10500, percentage: 23.3, transactionCount: 3 }
    ]
  },
  {
    id: "utilities",
    name: "Utilities",
    amount: 38500,
    budget: 40000,
    percentage: 13,
    transactionCount: 8,
    trend: "stable",
    trendPercentage: 1.2,
    color: "#96CEB4",
    icon: Home,
    subcategories: [
      { name: "Electricity", amount: 18500, percentage: 48.1, transactionCount: 2 },
      { name: "Internet", amount: 12000, percentage: 31.2, transactionCount: 2 },
      { name: "Water", amount: 8000, percentage: 20.8, transactionCount: 4 }
    ]
  },
  {
    id: "shopping",
    name: "Shopping",
    amount: 32000,
    budget: 45000,
    percentage: 10.5,
    transactionCount: 9,
    trend: "up",
    trendPercentage: 12.8,
    color: "#FFEAA7",
    icon: ShoppingCart,
    subcategories: [
      { name: "Clothing", amount: 18000, percentage: 56.3, transactionCount: 4 },
      { name: "Electronics", amount: 10000, percentage: 31.3, transactionCount: 3 },
      { name: "Home & Garden", amount: 4000, percentage: 12.5, transactionCount: 2 }
    ]
  },
  {
    id: "bills",
    name: "Bills & Subscriptions",
    amount: 25800,
    budget: 30000,
    percentage: 9,
    transactionCount: 6,
    trend: "stable",
    trendPercentage: 0.5,
    color: "#DDA0DD",
    icon: CreditCard,
    subcategories: [
      { name: "Phone Bill", amount: 12000, percentage: 46.5, transactionCount: 2 },
      { name: "Insurance", amount: 8500, percentage: 32.9, transactionCount: 2 },
      { name: "Other Subscriptions", amount: 5300, percentage: 20.5, transactionCount: 2 }
    ]
  }
]

const monthlyTrendData = [
  { month: 'Oct', food: 75000, transport: 72000, entertainment: 42000, utilities: 39000 },
  { month: 'Nov', food: 82000, transport: 68000, entertainment: 46000, utilities: 37500 },
  { month: 'Dec', food: 89500, transport: 67200, entertainment: 45000, utilities: 38500 },
]

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN'
  }).format(amount)
}

export function CategoryView() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [viewMode, setViewMode] = useState("overview")

  const totalSpending = categoryData.reduce((sum, cat) => sum + cat.amount, 0)
  const totalBudget = categoryData.reduce((sum, cat) => sum + (cat.budget || 0), 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl mb-2">Spending by Category</h1>
          <p className="text-muted-foreground">
            Analyze your spending patterns across different categories with AI-powered insights
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
          
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Spending</p>
                <p className="text-2xl font-medium">{formatCurrency(totalSpending)}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +8.3% from last month
                </p>
              </div>
              <DollarSign className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Budget</p>
                <p className="text-2xl font-medium">{formatCurrency(totalBudget)}</p>
                <p className="text-xs text-green-600">
                  {formatCurrency(totalBudget - totalSpending)} remaining
                </p>
              </div>
              <Target className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Categories</p>
                <p className="text-2xl font-medium">{categoryData.length}</p>
                <p className="text-xs text-muted-foreground">Active categories</p>
              </div>
              <PieChart className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Budget Usage</p>
                <p className="text-2xl font-medium">{Math.round((totalSpending / totalBudget) * 100)}%</p>
                <p className="text-xs text-muted-foreground">Of total budget</p>
              </div>
              <BarChart3 className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={viewMode} onValueChange={setViewMode} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Category Overview</TabsTrigger>
          <TabsTrigger value="details">Detailed View</TabsTrigger>
          <TabsTrigger value="trends">Spending Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pie Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Spending Distribution
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
              </CardContent>
            </Card>

            {/* Category List */}
            <Card>
              <CardHeader>
                <CardTitle>Category Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categoryData.map((category) => {
                    const IconComponent = category.icon
                    const budgetPercentage = category.budget ? (category.amount / category.budget) * 100 : 0
                    
                    return (
                      <div key={category.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: category.color }}
                            />
                            <IconComponent className="h-4 w-4" />
                            <span className="font-medium">{category.name}</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{formatCurrency(category.amount)}</span>
                            <div className={`flex items-center gap-1 ${
                              category.trend === 'up' ? 'text-red-500' : 
                              category.trend === 'down' ? 'text-green-500' : 'text-gray-500'
                            }`}>
                              {category.trend === 'up' ? (
                                <TrendingUp className="h-3 w-3" />
                              ) : category.trend === 'down' ? (
                                <TrendingDown className="h-3 w-3" />
                              ) : null}
                              <span className="text-xs">{category.trendPercentage}%</span>
                            </div>
                          </div>
                        </div>
                        
                        {category.budget && (
                          <div className="space-y-1">
                            <Progress value={budgetPercentage} className="h-2" />
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>{category.transactionCount} transactions</span>
                              <span>
                                {formatCurrency(category.budget - category.amount)} left of {formatCurrency(category.budget)}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="details" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {categoryData.map((category) => {
              const IconComponent = category.icon
              const budgetPercentage = category.budget ? (category.amount / category.budget) * 100 : 0
              const isOverBudget = category.budget && category.amount > category.budget
              
              return (
                <Card key={category.id} className={isOverBudget ? 'border-red-200' : ''}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-lg" style={{ backgroundColor: `${category.color}20` }}>
                          <IconComponent className="h-4 w-4" style={{ color: category.color }} />
                        </div>
                        <CardTitle className="text-base">{category.name}</CardTitle>
                      </div>
                      
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Eye className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex items-baseline justify-between mb-1">
                        <span className="text-2xl font-medium">{formatCurrency(category.amount)}</span>
                        <div className={`flex items-center gap-1 text-sm ${
                          category.trend === 'up' ? 'text-red-500' : 
                          category.trend === 'down' ? 'text-green-500' : 'text-gray-500'
                        }`}>
                          {category.trend === 'up' ? (
                            <TrendingUp className="h-3 w-3" />
                          ) : category.trend === 'down' ? (
                            <TrendingDown className="h-3 w-3" />
                          ) : null}
                          <span>{category.trendPercentage}%</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">
                        {category.percentage}% of total spending • {category.transactionCount} transactions
                      </p>
                      
                      {category.budget && (
                        <div className="mt-3 space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Budget Progress</span>
                            <span className={isOverBudget ? 'text-red-600' : ''}>
                              {Math.round(budgetPercentage)}%
                            </span>
                          </div>
                          <Progress 
                            value={Math.min(budgetPercentage, 100)} 
                            className={`h-2 ${isOverBudget ? 'bg-red-100' : ''}`}
                          />
                          <p className="text-xs text-muted-foreground">
                            {isOverBudget ? (
                              <span className="text-red-600">
                                {formatCurrency(category.amount - category.budget)} over budget
                              </span>
                            ) : (
                              <span>
                                {formatCurrency(category.budget - category.amount)} remaining
                              </span>
                            )}
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Subcategories</h4>
                      {category.subcategories.map((sub, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{sub.name}</span>
                          <div className="text-right">
                            <span className="font-medium">{formatCurrency(sub.amount)}</span>
                            <span className="text-muted-foreground ml-2">({sub.percentage}%)</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit Budget
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <ArrowRight className="h-3 w-3 mr-1" />
                        View Transactions
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Monthly Spending Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={monthlyTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `₦${(value / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Bar dataKey="food" fill="#FF6B6B" name="Food & Groceries" />
                  <Bar dataKey="transport" fill="#4ECDC4" name="Transportation" />
                  <Bar dataKey="entertainment" fill="#45B7D1" name="Entertainment" />
                  <Bar dataKey="utilities" fill="#96CEB4" name="Utilities" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Growing Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {categoryData
                    .filter(cat => cat.trend === 'up')
                    .sort((a, b) => b.trendPercentage - a.trendPercentage)
                    .map((category, index) => {
                      const IconComponent = category.icon
                      return (
                        <div key={category.id} className="flex items-center justify-between p-3 rounded-lg bg-red-50 border border-red-100">
                          <div className="flex items-center gap-3">
                            <IconComponent className="h-4 w-4 text-red-600" />
                            <span className="font-medium">{category.name}</span>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-red-600">+{category.trendPercentage}%</p>
                            <p className="text-xs text-muted-foreground">{formatCurrency(category.amount)}</p>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Categories Under Control</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {categoryData
                    .filter(cat => cat.trend === 'down')
                    .sort((a, b) => b.trendPercentage - a.trendPercentage)
                    .map((category, index) => {
                      const IconComponent = category.icon
                      return (
                        <div key={category.id} className="flex items-center justify-between p-3 rounded-lg bg-green-50 border border-green-100">
                          <div className="flex items-center gap-3">
                            <IconComponent className="h-4 w-4 text-green-600" />
                            <span className="font-medium">{category.name}</span>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-green-600">-{category.trendPercentage}%</p>
                            <p className="text-xs text-muted-foreground">{formatCurrency(category.amount)}</p>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}