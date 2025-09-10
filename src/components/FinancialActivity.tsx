import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { 
  ArrowDownLeft, 
  ArrowUpRight, 
  CreditCard,
  Smartphone,
  Users,
  Target,
  Brain,
  Zap
} from "lucide-react"

const financialActivities = [
  {
    id: 1,
    type: "micro_action",
    description: "Auto-saved ₦2,500 from coffee purchase",
    amount: 2500,
    time: "15 mins ago",
    status: "completed",
    icon: Target
  },
  {
    id: 2,
    type: "insight",
    description: "AI detected subscription optimization opportunity",
    time: "2 hours ago", 
    status: "actionable",
    icon: Brain
  },
  {
    id: 3,
    type: "payment",
    description: "Received payment from Client Project",
    amount: 125000,
    time: "4 hours ago",
    status: "income",
    icon: ArrowDownLeft
  },
  {
    id: 4,
    type: "split",
    description: "Bill split created for Team Lunch",
    amount: 8500,
    time: "6 hours ago",
    status: "pending",
    icon: Users
  },
  {
    id: 5,
    type: "payment",
    description: "Netflix subscription renewal",
    amount: 3500,
    time: "1 day ago",
    status: "expense",
    icon: ArrowUpRight
  }
]

const getActivityColor = (status: string, type: string) => {
  if (type === "payment") {
    return status === "income" 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800'
  }
  
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800'
    case 'actionable':
      return 'bg-blue-100 text-blue-800'
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getActivityIcon = (activity: typeof financialActivities[0]) => {
  const IconComponent = activity.icon
  const iconColor = activity.type === "payment" 
    ? (activity.status === "income" ? "text-green-600" : "text-red-600")
    : "text-blue-600"
  
  return <IconComponent className={`h-4 w-4 ${iconColor}`} />
}

const formatAmount = (amount?: number) => {
  if (!amount) return ""
  return `₦${amount.toLocaleString()}`
}

export function FinancialActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Recent Financial Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {financialActivities.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-3">
              <div className="p-2 bg-muted rounded-lg">
                {getActivityIcon(activity)}
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm">
                  {activity.description}
                  {activity.amount && (
                    <span className={`ml-2 font-medium ${
                      activity.status === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {formatAmount(activity.amount)}
                    </span>
                  )}
                </p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
              <Badge variant="secondary" className={getActivityColor(activity.status, activity.type)}>
                {activity.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}