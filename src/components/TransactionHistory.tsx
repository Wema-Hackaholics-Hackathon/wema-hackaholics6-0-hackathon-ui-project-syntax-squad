import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { AddTransaction } from "./AddTransaction"
import { 
  ArrowDownLeft, 
  ArrowUpRight, 
  MoreHorizontal, 
  Search, 
  Filter,
  Download,
  RefreshCw,
  Calendar,
  CreditCard,
  Smartphone,
  ShoppingCart,
  Car,
  Coffee,
  Home,
  Zap,
  Plus,
  BarChart3
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

interface Transaction {
  id: string
  description: string
  amount: number
  date: string
  time: string
  type: 'income' | 'expense'
  status: 'completed' | 'pending' | 'failed'
  category: string
  subcategory: string
  paymentMethod: string
  location?: string
  merchant?: string
  aiInsight?: string
  microActionTriggered?: boolean
}

const transactions: Transaction[] = [
  {
    id: "1",
    description: "ALAT Transfer - Salary",
    amount: 450000,
    date: "2024-12-08",
    time: "09:15 AM",
    type: "income",
    status: "completed",
    category: "Income",
    subcategory: "Salary",
    paymentMethod: "ALAT Transfer",
    merchant: "Acme Corp Ltd",
    aiInsight: "Monthly salary received on schedule"
  },
  {
    id: "2",
    description: "Shoprite - Groceries",
    amount: 28500,
    date: "2024-12-07",
    time: "06:30 PM",
    type: "expense",
    status: "completed",
    category: "Food & Groceries",
    subcategory: "Groceries",
    paymentMethod: "ALAT Card",
    location: "Victoria Island, Lagos",
    merchant: "Shoprite",
    aiInsight: "15% above average grocery spending",
    microActionTriggered: true
  },
  {
    id: "3",
    description: "Uber Ride",
    amount: 3200,
    date: "2024-12-07",
    time: "08:15 AM",
    type: "expense",
    status: "completed",
    category: "Transportation",
    subcategory: "Ride Sharing",
    paymentMethod: "ALAT Card",
    location: "Lekki to VI",
    merchant: "Uber Nigeria",
    microActionTriggered: true
  },
  {
    id: "4",
    description: "Netflix Subscription",
    amount: 4400,
    date: "2024-12-06",
    time: "12:00 PM",
    type: "expense",
    status: "completed",
    category: "Entertainment",
    subcategory: "Streaming",
    paymentMethod: "ALAT Auto-Pay",
    merchant: "Netflix"
  },
  {
    id: "5",
    description: "Fuel - Total Station",
    amount: 12000,
    date: "2024-12-05",
    time: "07:45 AM",
    type: "expense",
    status: "completed",
    category: "Transportation",
    subcategory: "Fuel",
    paymentMethod: "ALAT Card",
    location: "Ajah, Lagos",
    merchant: "Total Energies",
    aiInsight: "Efficient fuel spending this week",
    microActionTriggered: true
  },
  {
    id: "6",
    description: "Freelance Project Payment",
    amount: 85000,
    date: "2024-12-04",
    time: "02:30 PM",
    type: "income",
    status: "pending",
    category: "Income",
    subcategory: "Freelance",
    paymentMethod: "Bank Transfer",
    merchant: "Tech Solutions Ltd"
  },
  {
    id: "7",
    description: "Starbucks Coffee",
    amount: 2800,
    date: "2024-12-04",
    time: "10:15 AM",
    type: "expense",
    status: "completed",
    category: "Food & Groceries",
    subcategory: "Coffee",
    paymentMethod: "ALAT Card",
    location: "Lekki Phase 1",
    merchant: "Starbucks",
    microActionTriggered: true
  },
  {
    id: "8",
    description: "Electricity Bill",
    amount: 18500,
    date: "2024-12-03",
    time: "11:30 AM",
    type: "expense",
    status: "completed",
    category: "Utilities",
    subcategory: "Electricity",
    paymentMethod: "ALAT Transfer",
    merchant: "EKEDC"
  },
  {
    id: "9",
    description: "MTN Airtime",
    amount: 5000,
    date: "2024-12-02",
    time: "06:00 PM",
    type: "expense",
    status: "completed",
    category: "Bills",
    subcategory: "Airtime",
    paymentMethod: "ALAT USSD",
    merchant: "MTN Nigeria"
  },
  {
    id: "10",
    description: "Konga - Online Shopping",
    amount: 24000,
    date: "2024-12-01",
    time: "03:20 PM",
    type: "expense",
    status: "completed",
    category: "Shopping",
    subcategory: "Electronics",
    paymentMethod: "ALAT Card",
    merchant: "Konga",
    aiInsight: "New category: Consider setting spending limit"
  }
]

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN'
  }).format(amount)
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  })
}

const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'food & groceries':
      return ShoppingCart
    case 'transportation':
      return Car
    case 'entertainment':
      return Smartphone
    case 'utilities':
      return Home
    case 'bills':
      return CreditCard
    case 'shopping':
      return ShoppingCart
    case 'income':
      return ArrowUpRight
    default:
      return CreditCard
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800'
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'failed':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

interface TransactionHistoryProps {
  isCompact?: boolean
  showFilters?: boolean
  limit?: number
}

export function TransactionHistory({ isCompact = false, showFilters = true, limit }: TransactionHistoryProps) {
  const displayTransactions = limit ? transactions.slice(0, limit) : transactions

  if (isCompact) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Transactions</CardTitle>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {displayTransactions.slice(0, 5).map((transaction) => {
              const CategoryIcon = getCategoryIcon(transaction.category)
              return (
                <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${
                      transaction.type === 'income' 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-blue-100 text-blue-600'
                    }`}>
                      <CategoryIcon className="h-4 w-4" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-sm">{transaction.description}</p>
                        {transaction.microActionTriggered && (
                          <Badge variant="secondary" className="bg-purple-100 text-purple-800 text-xs">
                            <Zap className="h-3 w-3 mr-1" />
                            Auto-Save
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{formatDate(transaction.date)}</span>
                        <span>{transaction.paymentMethod}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className={`font-medium ${
                      transaction.type === 'income' 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      {showFilters && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Transaction History
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Track all your financial activities with smart categorization
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search transactions..." className="pl-10" />
                </div>
                
                <div className="flex justify-center sm:justify-start">
                  <AddTransaction />
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-24 md:w-32">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="expense">Expenses</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select defaultValue="all">
                  <SelectTrigger className="w-32 md:w-40">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="food">Food & Groceries</SelectItem>
                    <SelectItem value="transport">Transportation</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="utilities">Utilities</SelectItem>
                    <SelectItem value="shopping">Shopping</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <Filter className="h-4 w-4" />
                </Button>
                
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <Calendar className="h-4 w-4" />
                </Button>
                
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <BarChart3 className="h-4 w-4" />
                </Button>
                
                <Button variant="outline" size="icon" className="h-9 w-9 hidden sm:flex">
                  <RefreshCw className="h-4 w-4" />
                </Button>
                
                <Button variant="outline" size="icon" className="h-9 w-9 hidden sm:flex">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Transaction List */}
      <Card>
        <CardContent className="p-0">
          <div className="space-y-1">
            {displayTransactions.map((transaction, index) => {
              const CategoryIcon = getCategoryIcon(transaction.category)
              return (
                <div key={transaction.id} className={`flex flex-col md:flex-row md:items-center justify-between p-3 md:p-4 hover:bg-accent/50 transition-colors ${index !== displayTransactions.length - 1 ? 'border-b' : ''}`}>
                  <div className="flex items-start md:items-center space-x-3 md:space-x-4 flex-1">
                    <div className={`p-2 rounded-full flex-shrink-0 ${
                      transaction.type === 'income' 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-blue-100 text-blue-600'
                    }`}>
                      <CategoryIcon className="h-4 w-4" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2 mb-1">
                        <p className="font-medium text-sm md:text-base truncate">{transaction.description}</p>
                        <div className="flex items-center gap-1 flex-wrap">
                          <Badge variant="secondary" className={`${getStatusColor(transaction.status)} text-xs`}>
                            {transaction.status}
                          </Badge>
                          {transaction.microActionTriggered && (
                            <Badge variant="secondary" className="bg-purple-100 text-purple-800 text-xs">
                              <Zap className="h-3 w-3 mr-1" />
                              Auto-Save
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 text-xs md:text-sm text-muted-foreground">
                        <span>{formatDate(transaction.date)} • {transaction.time}</span>
                        <span className="hidden md:inline">{transaction.category}</span>
                        <span className="hidden lg:inline">{transaction.paymentMethod}</span>
                        {transaction.location && (
                          <span className="hidden xl:inline">📍 {transaction.location}</span>
                        )}
                      </div>
                      
                      {transaction.aiInsight && (
                        <div className="mt-2 p-2 bg-blue-50 rounded text-xs text-blue-700">
                          💡 {transaction.aiInsight}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between md:justify-end gap-3 mt-2 md:mt-0">
                    <div className="text-left md:text-right">
                      <p className={`font-medium text-sm md:text-base ${
                        transaction.type === 'income' 
                          ? 'text-green-600' 
                          : 'text-red-600'
                      }`}>
                        {transaction.type === 'income' ? '+' : ''}{formatCurrency(transaction.amount)}
                      </p>
                      {transaction.merchant && (
                        <p className="text-xs text-muted-foreground">{transaction.merchant}</p>
                      )}
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Download Receipt</DropdownMenuItem>
                        <DropdownMenuItem>Categorize</DropdownMenuItem>
                        <DropdownMenuItem>Create Rule</DropdownMenuItem>
                        <DropdownMenuItem>Report Issue</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Transaction Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            <div className="text-center p-3 rounded-lg bg-green-50 border border-green-200">
              <p className="text-lg md:text-2xl font-medium text-green-600">
                {formatCurrency(transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0))}
              </p>
              <p className="text-xs md:text-sm text-muted-foreground">Total Income</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-red-50 border border-red-200">
              <p className="text-lg md:text-2xl font-medium text-red-600">
                {formatCurrency(transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0))}
              </p>
              <p className="text-xs md:text-sm text-muted-foreground">Total Expenses</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-blue-50 border border-blue-200">
              <p className="text-lg md:text-2xl font-medium text-blue-600">
                {transactions.filter(t => t.microActionTriggered).length}
              </p>
              <p className="text-xs md:text-sm text-muted-foreground">Auto-Save Triggers</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}