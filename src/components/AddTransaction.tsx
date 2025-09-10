import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Textarea } from "./ui/textarea"
import { Switch } from "./ui/switch"
import { Badge } from "./ui/badge"
import { 
  Plus, 
  CreditCard, 
  Smartphone, 
  Building2,
  Receipt,
  Brain,
  Zap,
  Calendar,
  MapPin,
  Tag
} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"

interface NewTransaction {
  description: string
  amount: string
  type: 'income' | 'expense'
  category: string
  subcategory: string
  paymentMethod: string
  merchant?: string
  location?: string
  notes?: string
  enableMicroAction: boolean
}

const categories = {
  expense: [
    { id: 'food', name: 'Food & Groceries', subcategories: ['Groceries', 'Restaurants', 'Coffee', 'Delivery'] },
    { id: 'transport', name: 'Transportation', subcategories: ['Fuel', 'Ride Sharing', 'Public Transport', 'Parking'] },
    { id: 'entertainment', name: 'Entertainment', subcategories: ['Streaming', 'Movies', 'Games', 'Events'] },
    { id: 'utilities', name: 'Utilities', subcategories: ['Electricity', 'Water', 'Internet', 'Gas'] },
    { id: 'bills', name: 'Bills', subcategories: ['Airtime', 'Data', 'Subscriptions', 'Insurance'] },
    { id: 'shopping', name: 'Shopping', subcategories: ['Clothing', 'Electronics', 'Home', 'Personal Care'] },
    { id: 'health', name: 'Health & Fitness', subcategories: ['Medical', 'Pharmacy', 'Gym', 'Wellness'] },
    { id: 'education', name: 'Education', subcategories: ['Courses', 'Books', 'Training', 'Certification'] }
  ],
  income: [
    { id: 'salary', name: 'Income', subcategories: ['Salary', 'Freelance', 'Bonus', 'Commission'] },
    { id: 'business', name: 'Business', subcategories: ['Sales', 'Services', 'Consulting', 'Products'] },
    { id: 'investment', name: 'Investment', subcategories: ['Dividends', 'Interest', 'Capital Gains', 'Rental'] },
    { id: 'other', name: 'Other Income', subcategories: ['Gifts', 'Refunds', 'Cashback', 'Rewards'] }
  ]
}

const paymentMethods = [
  'ALAT Card',
  'ALAT Transfer',
  'ALAT USSD',
  'ALAT Auto-Pay',
  'Bank Transfer',
  'Cash',
  'Other Card',
  'Mobile Money'
]

const commonMerchants = {
  food: ['Shoprite', 'KFC', 'Dominos', 'Starbucks', 'Mr. Biggs', 'Chicken Republic'],
  transport: ['Uber Nigeria', 'Bolt', 'Total Energies', 'Mobil', 'Oando', 'NIPCO'],
  entertainment: ['Netflix', 'Spotify', 'DSTV', 'Showmax', 'Apple Music', 'YouTube Premium'],
  shopping: ['Jumia', 'Konga', 'Slot', 'H&M', 'Zara', 'Game Stores'],
  utilities: ['EKEDC', 'IKEDC', 'AEDC', 'Airtel', 'MTN', 'Glo', '9mobile']
}

export function AddTransaction() {
  const [isOpen, setIsOpen] = useState(false)
  const [transaction, setTransaction] = useState<NewTransaction>({
    description: '',
    amount: '',
    type: 'expense',
    category: '',
    subcategory: '',
    paymentMethod: 'ALAT Card',
    merchant: '',
    location: '',
    notes: '',
    enableMicroAction: true
  })

  const [aiSuggestions, setAiSuggestions] = useState<{
    category?: string
    merchant?: string
    microAction?: string
  }>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here would be the logic to save the transaction
    console.log('New transaction:', transaction)
    setIsOpen(false)
    // Reset form
    setTransaction({
      description: '',
      amount: '',
      type: 'expense',
      category: '',
      subcategory: '',
      paymentMethod: 'ALAT Card',
      merchant: '',
      location: '',
      notes: '',
      enableMicroAction: true
    })
  }

  const handleDescriptionChange = (value: string) => {
    setTransaction(prev => ({ ...prev, description: value }))
    
    // AI-powered suggestions based on description
    const lowerDesc = value.toLowerCase()
    if (lowerDesc.includes('uber') || lowerDesc.includes('bolt')) {
      setAiSuggestions({
        category: 'transportation',
        merchant: 'Uber Nigeria',
        microAction: 'Save ₦500 for next ride'
      })
    } else if (lowerDesc.includes('shoprite') || lowerDesc.includes('grocery')) {
      setAiSuggestions({
        category: 'food',
        merchant: 'Shoprite',
        microAction: 'Round up to nearest ₦100'
      })
    } else if (lowerDesc.includes('netflix') || lowerDesc.includes('subscription')) {
      setAiSuggestions({
        category: 'entertainment',
        merchant: 'Netflix',
        microAction: 'Save equivalent amount monthly'
      })
    }
  }

  const applySuggestion = (field: string, value: string) => {
    if (field === 'category') {
      const categoryData = categories[transaction.type].find(cat => cat.id === value)
      setTransaction(prev => ({ 
        ...prev, 
        category: value,
        subcategory: categoryData?.subcategories[0] || ''
      }))
    } else {
      setTransaction(prev => ({ ...prev, [field]: value }))
    }
  }

  const selectedCategory = categories[transaction.type].find(cat => cat.id === transaction.category)
  const availableMerchants = transaction.category ? commonMerchants[transaction.category] || [] : []

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Transaction
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base md:text-lg">
            <Receipt className="h-5 w-5" />
            Add New Transaction
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={transaction.description}
                onChange={(e) => handleDescriptionChange(e.target.value)}
                placeholder="e.g., Uber ride to office"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (₦)</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={transaction.amount}
                onChange={(e) => setTransaction(prev => ({ ...prev, amount: e.target.value }))}
                placeholder="0.00"
                required
              />
            </div>
          </div>

          {/* AI Suggestions */}
          {Object.keys(aiSuggestions).length > 0 && (
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  AI Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-2">
                  {aiSuggestions.category && (
                    <Badge 
                      variant="secondary" 
                      className="cursor-pointer bg-blue-100 hover:bg-blue-200"
                      onClick={() => applySuggestion('category', aiSuggestions.category!)}
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {categories[transaction.type].find(c => c.id === aiSuggestions.category)?.name}
                    </Badge>
                  )}
                  {aiSuggestions.merchant && (
                    <Badge 
                      variant="secondary" 
                      className="cursor-pointer bg-green-100 hover:bg-green-200"
                      onClick={() => applySuggestion('merchant', aiSuggestions.merchant!)}
                    >
                      <Building2 className="h-3 w-3 mr-1" />
                      {aiSuggestions.merchant}
                    </Badge>
                  )}
                  {aiSuggestions.microAction && (
                    <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                      <Zap className="h-3 w-3 mr-1" />
                      {aiSuggestions.microAction}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Type and Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select 
                value={transaction.type} 
                onValueChange={(value: 'income' | 'expense') => setTransaction(prev => ({ 
                  ...prev, 
                  type: value, 
                  category: '', 
                  subcategory: '' 
                }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="expense">Expense</SelectItem>
                  <SelectItem value="income">Income</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select 
                value={transaction.category} 
                onValueChange={(value) => setTransaction(prev => ({ 
                  ...prev, 
                  category: value, 
                  subcategory: categories[transaction.type].find(cat => cat.id === value)?.subcategories[0] || '' 
                }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories[transaction.type].map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Subcategory and Payment Method */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="subcategory">Subcategory</Label>
              <Select 
                value={transaction.subcategory} 
                onValueChange={(value) => setTransaction(prev => ({ ...prev, subcategory: value }))}
                disabled={!selectedCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select subcategory" />
                </SelectTrigger>
                <SelectContent>
                  {selectedCategory?.subcategories.map(sub => (
                    <SelectItem key={sub} value={sub.toLowerCase()}>
                      {sub}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Payment Method</Label>
              <Select 
                value={transaction.paymentMethod} 
                onValueChange={(value) => setTransaction(prev => ({ ...prev, paymentMethod: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {paymentMethods.map(method => (
                    <SelectItem key={method} value={method}>
                      <div className="flex items-center gap-2">
                        {method.includes('ALAT') ? (
                          <CreditCard className="h-4 w-4 text-blue-600" />
                        ) : (
                          <Smartphone className="h-4 w-4" />
                        )}
                        {method}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Merchant and Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="merchant">Merchant (Optional)</Label>
              <Select 
                value={transaction.merchant} 
                onValueChange={(value) => setTransaction(prev => ({ ...prev, merchant: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select or type merchant" />
                </SelectTrigger>
                <SelectContent>
                  {availableMerchants.map(merchant => (
                    <SelectItem key={merchant} value={merchant}>
                      {merchant}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location (Optional)</Label>
              <Input
                id="location"
                value={transaction.location}
                onChange={(e) => setTransaction(prev => ({ ...prev, location: e.target.value }))}
                placeholder="e.g., Victoria Island, Lagos"
              />
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={transaction.notes}
              onChange={(e) => setTransaction(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Add any additional notes about this transaction..."
              rows={3}
            />
          </div>

          {/* Micro-Action Settings */}
          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-purple-600" />
                    <Label htmlFor="enableMicroAction">Enable Micro-Actions</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Automatically trigger savings rules for this transaction
                  </p>
                </div>
                <Switch
                  id="enableMicroAction"
                  checked={transaction.enableMicroAction}
                  onCheckedChange={(checked) => setTransaction(prev => ({ ...prev, enableMicroAction: checked }))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="w-full md:w-auto">
              Cancel
            </Button>
            <Button type="submit" className="flex items-center justify-center gap-2 w-full md:w-auto">
              <Plus className="h-4 w-4" />
              Add Transaction
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}