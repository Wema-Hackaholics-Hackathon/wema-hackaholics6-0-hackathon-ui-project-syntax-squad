import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Progress } from "./ui/progress"
import { Button } from "./ui/button"
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  Target, 
  Lightbulb,
  Shield,
  Clock,
  ArrowRight,
  CheckCircle,
  XCircle
} from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip"

interface Insight {
  id: string
  type: 'optimization' | 'risk' | 'trend' | 'prediction'
  title: string
  description: string
  impact: 'high' | 'medium' | 'low'
  confidence: number
  actionable: boolean
}

interface SpendingPattern {
  category: string
  amount: number
  trend: 'increasing' | 'decreasing' | 'stable'
  percentage: number
  prediction: number
}

const insights: Insight[] = [
  {
    id: "1",
    type: "optimization",
    title: "Optimize Software Subscriptions",
    description: "You have 3 overlapping design tools. Consolidating could save $180/month.",
    impact: "high",
    confidence: 92,
    actionable: true
  },
  {
    id: "2",
    type: "risk",
    title: "Unusual Spending Pattern Detected",
    description: "Marketing expenses are 340% above normal for this time of month.",
    impact: "medium",
    confidence: 87,
    actionable: true
  },
  {
    id: "3",
    type: "trend",
    title: "Project Revenue Trending Up",
    description: "Client payments have increased 45% over the last quarter.",
    impact: "high",
    confidence: 95,
    actionable: false
  },
  {
    id: "4",
    type: "prediction",
    title: "Cash Flow Projection",
    description: "Based on current patterns, expect $12K surplus by month-end.",
    impact: "medium",
    confidence: 78,
    actionable: false
  }
]

const spendingPatterns: SpendingPattern[] = [
  {
    category: "Software & Tools",
    amount: 850,
    trend: "increasing",
    percentage: 15,
    prediction: 920
  },
  {
    category: "Marketing",
    amount: 2500,
    trend: "increasing",
    percentage: 45,
    prediction: 2800
  },
  {
    category: "Office Expenses",
    amount: 320,
    trend: "stable",
    percentage: 5,
    prediction: 315
  },
  {
    category: "Professional Services",
    amount: 1200,
    trend: "decreasing",
    percentage: -12,
    prediction: 1050
  }
]

const getInsightIcon = (type: string) => {
  switch (type) {
    case 'optimization':
      return <Target className="h-4 w-4" />
    case 'risk':
      return <AlertTriangle className="h-4 w-4" />
    case 'trend':
      return <TrendingUp className="h-4 w-4" />
    case 'prediction':
      return <Brain className="h-4 w-4" />
    default:
      return <Lightbulb className="h-4 w-4" />
  }
}

const getInsightColor = (type: string) => {
  switch (type) {
    case 'optimization':
      return 'text-blue-600 bg-blue-100'
    case 'risk':
      return 'text-red-600 bg-red-100'
    case 'trend':
      return 'text-green-600 bg-green-100'
    case 'prediction':
      return 'text-[#AE328E] bg-pink-100'
    default:
      return 'text-[#425563] bg-gray-100'
  }
}

const getImpactColor = (impact: string) => {
  switch (impact) {
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

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case 'increasing':
      return <TrendingUp className="h-3 w-3 text-red-600" />
    case 'decreasing':
      return <TrendingUp className="h-3 w-3 text-green-600 rotate-180" />
    default:
      return <div className="h-3 w-3 rounded-full bg-gray-400" />
  }
}

export function PaymentIntelligence() {
  return (
    <div className="space-y-6">
      {/* AI Insights Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-pink-100 rounded-lg">
              <Brain className="h-5 w-5 text-[#AE328E]" />
            </div>
            <div>
              <CardTitle>AI Payment Insights</CardTitle>
              <p className="text-sm text-muted-foreground">Smart analysis of your financial patterns</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            <Shield className="h-3 w-3 mr-1" />
            Active
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {insights.map((insight) => (
              <div key={insight.id} className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${getInsightColor(insight.type)}`}>
                      {getInsightIcon(insight.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-sm">{insight.title}</h4>
                        <Badge variant="secondary" className={getImpactColor(insight.impact)}>
                          {insight.impact} impact
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{insight.description}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-4">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Brain className="h-3 w-3" />
                            <span>{insight.confidence}% confidence</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>AI confidence level for this insight</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>Updated 2h ago</span>
                    </div>
                  </div>
                  
                  {insight.actionable && (
                    <Button variant="outline" size="sm" className="text-xs">
                      Take Action
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Smart Spending Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Smart Spending Analysis
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            AI-powered category analysis with predictions
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {spendingPatterns.map((pattern, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{pattern.category}</span>
                    {getTrendIcon(pattern.trend)}
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">${pattern.amount.toLocaleString()}</p>
                    <p className={`text-xs ${
                      pattern.percentage > 0 ? 'text-red-600' : 
                      pattern.percentage < 0 ? 'text-green-600' : 'text-gray-600'
                    }`}>
                      {pattern.percentage > 0 ? '+' : ''}{pattern.percentage}%
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Progress 
                    value={Math.abs(pattern.percentage)} 
                    className="h-2" 
                  />
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Current: ${pattern.amount}</span>
                    <span>Predicted: ${pattern.prediction}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Smart Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg border bg-green-50 border-green-200">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-sm">Set up automatic savings</p>
                  <p className="text-xs text-muted-foreground">Save $500/month based on surplus prediction</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Enable
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-lg border bg-blue-50 border-blue-200">
              <div className="flex items-center gap-3">
                <Target className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium text-sm">Optimize payment timing</p>
                  <p className="text-xs text-muted-foreground">Schedule payments to improve cash flow</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Setup
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-lg border bg-orange-50 border-orange-200">
              <div className="flex items-center gap-3">
                <XCircle className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="font-medium text-sm">Review duplicate subscriptions</p>
                  <p className="text-xs text-muted-foreground">3 potential duplicates found</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Review
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}