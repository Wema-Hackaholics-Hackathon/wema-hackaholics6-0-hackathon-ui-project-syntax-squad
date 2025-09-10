import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Calendar } from "./ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Checkbox } from "./ui/checkbox"
import { 
  Search, 
  Filter,
  Download,
  SortAsc,
  Calendar as CalendarIcon,
  MapPin,
  CreditCard,
  Smartphone,
  ShoppingCart,
  Car,
  Coffee,
  Home,
  Zap,
  ArrowUpRight,
  ArrowDownLeft,
  Edit,
  MoreHorizontal,
  Eye,
  Tag,
  Receipt,
  Flag
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { format } from "date-fns"

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
  tags?: string[]
  isRecurring?: boolean
}

const sampleTransactions: Transaction[] = [
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
    aiInsight: "Monthly salary received on schedule",
    tags: ["work", "monthly"],
    isRecurring: true
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
    microActionTriggered: true,
    tags: ["essential", "grocery"]
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
    microActionTriggered: true,
    tags: ["transport", "work"]
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
    merchant: "Netflix",
    isRecurring: true,
    tags: ["subscription", "entertainment"]
  },
  {
    id: "5",
    description: "Freelance Project Payment",
    amount: 85000,
    date: "2024-12-04",
    time: "02:30 PM",
    type: "income",
    status: "pending",
    category: "Income",
    subcategory: "Freelance",
    paymentMethod: "Bank Transfer",
    merchant: "Tech Solutions Ltd",
    tags: ["freelance", "side-hustle"]
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
    day: 'numeric',
    year: 'numeric'
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
      return 'bg-green-100 text-green-800 border-green-200'
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    case 'failed':
      return 'bg-red-100 text-red-800 border-red-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

export function PersonalTransactionList() {
  const [selectedTransactions, setSelectedTransactions] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [sortBy, setSortBy] = useState("date")
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({})

  const filteredTransactions = sampleTransactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transaction.merchant?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transaction.category.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesType = filterType === "all" || transaction.type === filterType
    const matchesCategory = filterCategory === "all" || transaction.category.toLowerCase().includes(filterCategory)
    const matchesStatus = filterStatus === "all" || transaction.status === filterStatus
    
    return matchesSearch && matchesType && matchesCategory && matchesStatus
  })

  const handleSelectTransaction = (transactionId: string) => {
    setSelectedTransactions(prev => 
      prev.includes(transactionId) 
        ? prev.filter(id => id !== transactionId)
        : [...prev, transactionId]
    )
  }

  const handleSelectAll = () => {
    setSelectedTransactions(
      selectedTransactions.length === filteredTransactions.length 
        ? [] 
        : filteredTransactions.map(t => t.id)
    )
  }

  const calculateTotals = () => {
    return filteredTransactions.reduce((acc, transaction) => {
      if (transaction.type === 'income') {
        acc.income += transaction.amount
      } else {
        acc.expenses += transaction.amount
      }
      return acc
    }, { income: 0, expenses: 0 })
  }

  const totals = calculateTotals()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl mb-2">Personal Transaction List</h1>
          <p className="text-muted-foreground">
            Manage and analyze all your financial transactions with advanced filtering and insights
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Transactions</p>
                  <p className="text-2xl font-medium">{filteredTransactions.length}</p>
                </div>
                <Receipt className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Income</p>
                  <p className="text-xl font-medium text-green-600">{formatCurrency(totals.income)}</p>
                </div>
                <ArrowUpRight className="h-5 w-5 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Expenses</p>
                  <p className="text-xl font-medium text-red-600">{formatCurrency(totals.expenses)}</p>
                </div>
                <ArrowDownLeft className="h-5 w-5 text-red-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Net Amount</p>
                  <p className={`text-xl font-medium ${totals.income - totals.expenses >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(totals.income - totals.expenses)}
                  </p>
                </div>
                <Tag className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4 space-y-4">
          {/* Search and Quick Actions */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Search transactions, merchants, or categories..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              
              {selectedTransactions.length > 0 && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      Actions ({selectedTransactions.length})
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Bulk Categorize</DropdownMenuItem>
                    <DropdownMenuItem>Add Tags</DropdownMenuItem>
                    <DropdownMenuItem>Export Selected</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">Delete Selected</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap gap-2">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expenses</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="food">Food & Groceries</SelectItem>
                <SelectItem value="transport">Transportation</SelectItem>
                <SelectItem value="entertainment">Entertainment</SelectItem>
                <SelectItem value="income">Income</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="amount">Amount</SelectItem>
                <SelectItem value="category">Category</SelectItem>
                <SelectItem value="merchant">Merchant</SelectItem>
              </SelectContent>
            </Select>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon">
                  <CalendarIcon className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={setDateRange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transaction List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Checkbox 
                checked={selectedTransactions.length === filteredTransactions.length}
                onCheckedChange={handleSelectAll}
              />
              Transactions ({filteredTransactions.length})
            </CardTitle>
            <Button variant="outline" size="sm">
              <SortAsc className="h-4 w-4 mr-2" />
              Sort
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-1">
            {filteredTransactions.map((transaction, index) => {
              const CategoryIcon = getCategoryIcon(transaction.category)
              const isSelected = selectedTransactions.includes(transaction.id)
              
              return (
                <div 
                  key={transaction.id} 
                  className={`flex items-center p-4 hover:bg-accent/50 transition-colors border-b last:border-b-0 ${
                    isSelected ? 'bg-accent/30' : ''
                  }`}
                >
                  <Checkbox 
                    checked={isSelected}
                    onCheckedChange={() => handleSelectTransaction(transaction.id)}
                    className="mr-4"
                  />
                  
                  <div className="flex items-center space-x-4 flex-1">
                    <div className={`p-2 rounded-full ${
                      transaction.type === 'income' 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-blue-100 text-blue-600'
                    }`}>
                      <CategoryIcon className="h-4 w-4" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium truncate">{transaction.description}</p>
                        
                        <div className="flex items-center gap-1 flex-wrap">
                          <Badge className={getStatusColor(transaction.status)}>
                            {transaction.status}
                          </Badge>
                          
                          {transaction.isRecurring && (
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              Recurring
                            </Badge>
                          )}
                          
                          {transaction.microActionTriggered && (
                            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                              <Zap className="h-3 w-3 mr-1" />
                              Auto-Save
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{formatDate(transaction.date)} • {transaction.time}</span>
                        <span className="hidden md:inline">{transaction.category}</span>
                        <span className="hidden lg:inline">{transaction.paymentMethod}</span>
                        {transaction.location && (
                          <span className="hidden xl:inline flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {transaction.location}
                          </span>
                        )}
                      </div>
                      
                      {transaction.tags && transaction.tags.length > 0 && (
                        <div className="flex gap-1 mt-2">
                          {transaction.tags.map((tag, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                      
                      {transaction.aiInsight && (
                        <div className="mt-2 p-2 bg-blue-50 rounded text-xs text-blue-700">
                          💡 {transaction.aiInsight}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className={`font-medium ${
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
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Transaction
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Tag className="h-4 w-4 mr-2" />
                          Add Tags
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Receipt className="h-4 w-4 mr-2" />
                          Download Receipt
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Flag className="h-4 w-4 mr-2" />
                          Report Issue
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}