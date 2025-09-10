import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Progress } from "./ui/progress"
import { Switch } from "./ui/switch"
import { 
  Target, 
  PiggyBank, 
  Zap, 
  TrendingUp,
  Coffee,
  ShoppingCart,
  Fuel,
  Plus,
  CheckCircle,
  Clock
} from "lucide-react"

interface MicroAction {
  id: string
  name: string
  description: string
  trigger: string
  action: string
  isActive: boolean
  totalSaved: number
  icon: any
  category: string
}

interface SavingsGoal {
  id: string
  name: string
  target: number
  current: number
  deadline: string
  linkedActions: number
  icon: any
}

const microActions: MicroAction[] = [
  {
    id: "1",
    name: "Coffee Round-Up",
    description: "Round up coffee purchases to the nearest ₦100 and save the difference",
    trigger: "Coffee/Restaurant purchases",
    action: "Round up + save difference",
    isActive: true,
    totalSaved: 2450,
    icon: Coffee,
    category: "Round-Up Savings"
  },
  {
    id: "2", 
    name: "Fuel Efficiency Bonus",
    description: "Save ₦200 every time you spend less than ₦15,000 on fuel",
    trigger: "Fuel purchase < ₦15,000",
    action: "Save ₦200 bonus",
    isActive: true,
    totalSaved: 1800,
    icon: Fuel,
    category: "Bonus Savings"
  },
  {
    id: "3",
    name: "Shopping Limit Reward",
    description: "Save 5% when grocery spending stays under ₦25,000/week",
    trigger: "Weekly grocery < ₦25,000",
    action: "Save 5% of purchase",
    isActive: false,
    totalSaved: 0,
    icon: ShoppingCart,
    category: "Goal-Based"
  },
  {
    id: "4",
    name: "Weekend Surplus",
    description: "Transfer any unspent weekend budget to savings on Monday",
    trigger: "Monday morning",
    action: "Save weekend surplus",
    isActive: true,
    totalSaved: 5200,
    icon: PiggyBank,
    category: "Budget-Based"
  }
]

const savingsGoals: SavingsGoal[] = [
  {
    id: "1",
    name: "Emergency Fund",
    target: 500000,
    current: 125000,
    deadline: "Dec 2025",
    linkedActions: 3,
    icon: Target
  },
  {
    id: "2",
    name: "New Laptop",
    target: 850000,
    current: 340000,
    deadline: "Mar 2025",
    linkedActions: 2,
    icon: Zap
  },
  {
    id: "3",
    name: "Vacation Fund",
    target: 300000,
    current: 89000,
    deadline: "Jun 2025",
    linkedActions: 1,
    icon: TrendingUp
  }
]

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN'
  }).format(amount)
}

export function MicroActions() {
  return (
    <div className="space-y-6">
      {/* Active Micro-Actions */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Micro-Action Triggers
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Automatic savings based on your spending patterns
            </p>
          </div>
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-1" />
            New Rule
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {microActions.map((action) => (
              <div key={action.id} className="flex items-center justify-between p-4 rounded-lg border bg-card">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${
                    action.isActive ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                  }`}>
                    <action.icon className="h-4 w-4" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm">{action.name}</h4>
                      <Badge variant="secondary" className="text-xs">
                        {action.category}
                      </Badge>
                      {action.isActive && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Active
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{action.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>Trigger: {action.trigger}</span>
                      <span>•</span>
                      <span>Total saved: {formatCurrency(action.totalSaved)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Switch checked={action.isActive} />
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Savings Goals */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Linked Savings Goals
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Goals connected to your micro-actions
            </p>
          </div>
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-1" />
            New Goal
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {savingsGoals.map((goal) => (
              <div key={goal.id} className="p-4 rounded-lg border bg-card">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <goal.icon className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">{goal.name}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>Target: {goal.deadline}</span>
                        <span>•</span>
                        <span>{goal.linkedActions} micro-actions linked</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatCurrency(goal.current)}</p>
                    <p className="text-sm text-muted-foreground">of {formatCurrency(goal.target)}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Progress 
                    value={(goal.current / goal.target) * 100} 
                    className="h-2" 
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{Math.round((goal.current / goal.target) * 100)}% complete</span>
                    <span>{formatCurrency(goal.target - goal.current)} remaining</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PiggyBank className="h-5 w-5" />
            Micro-Actions Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 rounded-lg bg-green-50 border border-green-200">
              <p className="text-2xl font-medium text-green-600">₦9,450</p>
              <p className="text-sm text-muted-foreground">Total Saved</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-blue-50 border border-blue-200">
              <p className="text-2xl font-medium text-blue-600">47</p>
              <p className="text-sm text-muted-foreground">Actions This Month</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-purple-50 border border-purple-200">
              <p className="text-2xl font-medium text-purple-600">₦1,890</p>
              <p className="text-sm text-muted-foreground">Avg. Monthly</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}