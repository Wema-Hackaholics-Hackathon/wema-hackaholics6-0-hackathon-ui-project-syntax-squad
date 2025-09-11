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
import { useTheme } from "@mui/material/styles";

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

const getInsightColor = (type: string, theme: any) => {
  switch (type) {
    case 'optimization':
      return {
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.light
      }
    case 'trend':
      return {
        color: theme.palette.secondary.main,
        backgroundColor: theme.palette.secondary.light
      }
    case 'opportunity':
      return {
        color: theme.palette.success.main,
        backgroundColor: theme.palette.success.light
      }
    default:
      return {
        color: theme.palette.text.secondary,
        backgroundColor: theme.palette.background.default
      }
  }
}

const getPriorityColor = (priority: string, theme: any) => {
  switch (priority) {
    case 'high':
      return {
        backgroundColor: theme.palette.error.light,
        color: theme.palette.error.dark
      }
    case 'medium':
      return {
        backgroundColor: theme.palette.warning.light,
        color: theme.palette.warning.dark
      }
    case 'low':
      return {
        backgroundColor: theme.palette.success.light,
        color: theme.palette.success.dark
      }
    default:
      return {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.secondary
      }
  }
}

interface DashboardInsightsProps {
  onViewAll: () => void
}

export function DashboardInsights({ onViewAll }: DashboardInsightsProps) {
  const theme = useTheme();
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg" style={{ backgroundColor: theme.palette.primary.light }}>
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
                  <div className="p-1.5 rounded-lg" style={getInsightColor(insight.type, theme)}>
                    {getInsightIcon(insight.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm">{insight.title}</h4>
                      <Badge variant="secondary" style={getPriorityColor(insight.priority, theme)}>
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