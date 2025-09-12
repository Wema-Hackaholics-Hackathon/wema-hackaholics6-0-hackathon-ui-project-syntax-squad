export interface SpendingAnalytics {
  id: string
  userId: string
  period: AnalyticsPeriod
  startDate: string
  endDate: string
  totalSpent: number
  totalEarned: number
  netCashFlow: number
  currency: string
  categoryBreakdown: CategorySpending[]
  monthlyTrends: MonthlyTrend[]
  insights: SpendingInsight[]
  goals: SpendingGoal[]
  generatedAt: string
}

export interface AnalyticsPeriod {
  type: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly' | 'custom'
  value: number
  unit: 'days' | 'weeks' | 'months' | 'quarters' | 'years'
}

export interface CategorySpending {
  categoryId: string
  categoryName: string
  totalSpent: number
  transactionCount: number
  percentage: number
  trend: TrendDirection
  previousPeriodComparison: number
  subcategories: SubcategorySpending[]
}

export interface SubcategorySpending {
  name: string
  amount: number
  percentage: number
  transactionCount: number
}

export type TrendDirection = 'up' | 'down' | 'stable'

export interface MonthlyTrend {
  month: string
  year: number
  totalSpent: number
  totalEarned: number
  netFlow: number
  transactionCount: number
  averageTransactionSize: number
}

export interface SpendingInsight {
  id: string
  type: InsightType
  title: string
  description: string
  impact: InsightImpact
  recommendation?: string
  data: Record<string, unknown>
  confidence: number
  createdAt: string
}

export type InsightType = 
  | 'unusual_spending' 
  | 'budget_alert' 
  | 'savings_opportunity' 
  | 'recurring_payment' 
  | 'merchant_analysis' 
  | 'spending_pattern'

export type InsightImpact = 'high' | 'medium' | 'low'

export interface SpendingGoal {
  id: string
  userId: string
  title: string
  description?: string
  targetAmount: number
  currentAmount: number
  currency: string
  category?: string
  period: GoalPeriod
  startDate: string
  endDate: string
  status: GoalStatus
  progress: number
  isRecurring: boolean
  notifications: GoalNotification[]
  createdAt: string
  updatedAt: string
}

export interface GoalPeriod {
  type: 'daily' | 'weekly' | 'monthly' | 'yearly'
  duration: number
}

export type GoalStatus = 'active' | 'achieved' | 'failed' | 'paused' | 'cancelled'

export interface GoalNotification {
  type: 'milestone' | 'warning' | 'achievement' | 'deadline'
  threshold: number
  enabled: boolean
  message: string
}

export interface BudgetPlan {
  id: string
  userId: string
  name: string
  description?: string
  totalBudget: number
  currency: string
  period: AnalyticsPeriod
  categories: BudgetCategory[]
  status: 'draft' | 'active' | 'completed' | 'archived'
  autoAdjust: boolean
  startDate: string
  endDate: string
  createdAt: string
  updatedAt: string
}

export interface BudgetCategory {
  categoryId: string
  allocatedAmount: number
  spentAmount: number
  remainingAmount: number
  percentage: number
  isOverBudget: boolean
  alerts: BudgetAlert[]
}

export interface BudgetAlert {
  threshold: number
  triggered: boolean
  triggeredAt?: string
  message: string
}

export interface FinancialForecast {
  id: string
  userId: string
  forecastType: 'spending' | 'income' | 'balance'
  period: number
  unit: 'days' | 'weeks' | 'months'
  predictions: ForecastPrediction[]
  confidence: number
  modelVersion: string
  basedOnTransactions: number
  generatedAt: string
}

export interface ForecastPrediction {
  date: string
  predictedValue: number
  confidenceInterval: {
    lower: number
    upper: number
  }
  factors: ForecastFactor[]
}

export interface ForecastFactor {
  name: string
  impact: number
  description: string
}

export interface PerformanceMetrics {
  userId: string
  period: AnalyticsPeriod
  savings: {
    rate: number
    amount: number
    trend: TrendDirection
  }
  spending: {
    efficiency: number
    variance: number
    consistency: number
  }
  goals: {
    achieved: number
    total: number
    successRate: number
  }
  budgets: {
    adherence: number
    overruns: number
    accuracy: number
  }
  calculatedAt: string
}