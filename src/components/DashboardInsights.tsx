import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  Target,
  ArrowRight,
  Lightbulb
} from "lucide-react"

// Simplified insights for dashboard overview
const dashboardInsights = [
  {
    id: "1",
    type: "optimization" as const,
    title: "3 Subscription Overlaps Found",
    savings: "₦18,000/month",
    priority: "high" as const
  },
  {
    id: "2", 
    type: "trend" as const,
    title: "Spending Up 15% This Month",
    detail: "Mainly in entertainment category",
    priority: "medium" as const
  },
  {
    id: "3",
    type: "opportunity" as const,
    title: "Auto-Save Opportunity",
    savings: "₦45,000/month",
    priority: "high" as const
  }
]

const getInsightIcon = (type: string) => {
  switch (type) {
    case 'optimization':
      return <Target className="h-4 w-4" />
    case 'trend':
      return <TrendingUp className="h-4 w-4" />
    case 'opportunity':
      return <Lightbulb className="h-4 w-4" />
    default:
      return <Brain className="h-4 w-4" />
  }
}

const getInsightColor = (type: string) => {
  switch (type) {
    case 'optimization':
      return 'text-blue-600 bg-blue-100'
    case 'trend':
      return 'text-orange-600 bg-orange-100'
    case 'opportunity':
      return 'text-green-600 bg-green-100'
    default:
      return 'text-gray-600 bg-gray-100'
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-800'
    case 'medium':
      return 'bg-yellow-100 text-yellow-800'
    case 'low':
      return 'bg-green-100 text-green-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

interface DashboardInsightsProps {
  onViewAll: () => void
}

export function DashboardInsights({ onViewAll }: DashboardInsightsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Brain className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <CardTitle>Quick Insights</CardTitle>
            <p className="text-sm text-muted-foreground">Top AI recommendations</p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={onViewAll}>
          View All
          <ArrowRight className="h-3 w-3 ml-1" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {dashboardInsights.map((insight) => (
            <div key={insight.id} className="p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded-lg ${getInsightColor(insight.type)}`}>
                    {getInsightIcon(insight.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm">{insight.title}</h4>
                      <Badge variant="secondary" className={getPriorityColor(insight.priority)}>
                        {insight.priority}
                      </Badge>
                    </div>
                    {insight.savings && (
                      <p className="text-sm font-medium text-green-600">Save {insight.savings}</p>
                    )}
                    {insight.detail && (
                      <p className="text-sm text-muted-foreground">{insight.detail}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}