import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Progress } from "./ui/progress"
import { 
  Users, 
  Plus, 
  Split,
  Trophy,
  Target,
  Share,
  Clock,
  CheckCircle,
  AlertCircle,
  Zap
} from "lucide-react"

interface BillSplit {
  id: string
  title: string
  total: number
  participants: number
  yourShare: number
  status: 'pending' | 'partial' | 'completed'
  createdBy: string
  dueDate: string
}

interface GroupChallenge {
  id: string
  name: string
  description: string
  participants: number
  target: number
  current: number
  endDate: string
  yourContribution: number
  reward: string
}

interface SharedExpense {
  id: string
  description: string
  amount: number
  paidBy: string
  participants: string[]
  category: string
  date: string
  settled: boolean
}

const billSplits: BillSplit[] = [
  {
    id: "1",
    title: "Team Lunch at Ocean Basket",
    total: 45000,
    participants: 4,
    yourShare: 11250,
    status: "pending",
    createdBy: "Sarah Chen",
    dueDate: "Dec 10, 2024"
  },
  {
    id: "2",
    title: "Office WiFi - December",
    total: 25000,
    participants: 8,
    yourShare: 3125,
    status: "partial",
    createdBy: "Mike Wilson",
    dueDate: "Dec 15, 2024"
  },
  {
    id: "3",
    title: "Uber to Conference",
    total: 8500,
    participants: 3,
    yourShare: 2833,
    status: "completed",
    createdBy: "You",
    dueDate: "Dec 5, 2024"
  }
]

const groupChallenges: GroupChallenge[] = [
  {
    id: "1",
    name: "Team Holiday Fund",
    description: "Save together for end-of-year team trip",
    participants: 12,
    target: 500000,
    current: 320000,
    endDate: "Dec 20, 2024",
    yourContribution: 25000,
    reward: "3-day team retreat"
  },
  {
    id: "2",
    name: "Office Equipment Fund",
    description: "Upgrade our shared workspace",
    participants: 8,
    target: 150000,
    current: 89000,
    endDate: "Jan 31, 2025",
    yourContribution: 12000,
    reward: "New coffee machine & furniture"
  }
]

const sharedExpenses: SharedExpense[] = [
  {
    id: "1",
    description: "Project celebration dinner",
    amount: 28000,
    paidBy: "Alex Johnson",
    participants: ["You", "Sarah C.", "Mike W.", "Emma D."],
    category: "Food & Dining",
    date: "Dec 6, 2024",
    settled: false
  },
  {
    id: "2",
    description: "Shared taxi to airport",
    amount: 12000,
    paidBy: "You",
    participants: ["You", "John D.", "Lisa M."],
    category: "Transportation",
    date: "Dec 4, 2024",
    settled: true
  }
]

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN'
  }).format(amount)
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800'
    case 'partial':
      return 'bg-yellow-100 text-yellow-800'
    case 'pending':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return <CheckCircle className="h-4 w-4" />
    case 'partial':
      return <Clock className="h-4 w-4" />
    case 'pending':
      return <AlertCircle className="h-4 w-4" />
    default:
      return null
  }
}

export function SocialPayments() {
  return (
    <div className="space-y-6">
      {/* Bill Splitting */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Split className="h-5 w-5" />
              Bill Splitting
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Split expenses with friends and colleagues
            </p>
          </div>
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Split Bill
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {billSplits.map((split) => (
              <div key={split.id} className="flex items-center justify-between p-4 rounded-lg border bg-card">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Split className="h-4 w-4 text-blue-600" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm">{split.title}</h4>
                      <Badge variant="secondary" className={getStatusColor(split.status)}>
                        {getStatusIcon(split.status)}
                        <span className="ml-1 capitalize">{split.status}</span>
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{formatCurrency(split.total)} • {split.participants} people</span>
                      <span>•</span>
                      <span>Created by {split.createdBy}</span>
                      <span>•</span>
                      <span>Due {split.dueDate}</span>
                    </div>
                    <p className="text-sm font-medium text-blue-600 mt-1">
                      Your share: {formatCurrency(split.yourShare)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {split.status !== 'completed' && (
                    <Button variant="outline" size="sm">
                      {split.status === 'pending' ? 'Pay Share' : 'View Details'}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Group Savings Challenges */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Group Savings Challenges
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Save together and achieve common goals
            </p>
          </div>
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Create Challenge
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {groupChallenges.map((challenge) => (
              <div key={challenge.id} className="p-4 rounded-lg border bg-card">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Target className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">{challenge.name}</h4>
                      <p className="text-sm text-muted-foreground">{challenge.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatCurrency(challenge.current)}</p>
                    <p className="text-sm text-muted-foreground">of {formatCurrency(challenge.target)}</p>
                  </div>
                </div>
                
                <div className="space-y-2 mb-3">
                  <Progress 
                    value={(challenge.current / challenge.target) * 100} 
                    className="h-2" 
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{challenge.participants} participants • {Math.round((challenge.current / challenge.target) * 100)}% complete</span>
                    <span>Ends {challenge.endDate}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Your contribution: </span>
                    <span className="font-medium text-green-600">{formatCurrency(challenge.yourContribution)}</span>
                  </div>
                  <Button variant="outline" size="sm">
                    Contribute
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Shared Expenses */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share className="h-5 w-5" />
            Recent Shared Expenses
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Track expenses paid by you or others
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sharedExpenses.map((expense) => (
              <div key={expense.id} className="flex items-center justify-between p-3 rounded-lg border bg-card">
                <div className="flex items-center gap-4">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {expense.paidBy === 'You' ? 'Y' : expense.paidBy.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm">{expense.description}</h4>
                      {expense.settled ? (
                        <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Settled
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          Pending
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Paid by {expense.paidBy}</span>
                      <span>•</span>
                      <span>{expense.participants.length} people</span>
                      <span>•</span>
                      <span>{expense.date}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="font-medium">{formatCurrency(expense.amount)}</p>
                  {!expense.settled && (
                    <Button variant="ghost" size="sm" className="text-xs">
                      Settle Up
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Social Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Social Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 rounded-lg bg-blue-50 border border-blue-200">
              <p className="text-2xl font-medium text-blue-600">15</p>
              <p className="text-sm text-muted-foreground">Bills Split</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-purple-50 border border-purple-200">
              <p className="text-2xl font-medium text-purple-600">₦37K</p>
              <p className="text-sm text-muted-foreground">Group Savings</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-green-50 border border-green-200">
              <p className="text-2xl font-medium text-green-600">8</p>
              <p className="text-sm text-muted-foreground">Active Friends</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}