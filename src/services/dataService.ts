import mockTransactions from '../mocks/mock-transactions.json'
import mockUserData from '../mocks/mock-user-data.json'
import mockAlerts from '../mocks/mock-alerts.json'

export interface Transaction {
  id: string
  date: string
  timestamp: string
  description: string
  amount: number
  currency: string
  type: 'debit' | 'credit'
  category: string
  subcategory: string
  merchant: string
  location: string
  paymentMethod: string
  status: string
  balance: number
  microAction?: {
    enabled: boolean
    type: string
    amount: number
    description: string
  }
}

export interface User {
  id: string
  name: string
  email: string
  avatar: string
  isPremium: boolean
  level: number
  xp: number
  title: string
  joinDate: string
}

export interface Account {
  id: string
  name: string
  type: string
  balance: number
  currency: string
  accountNumber: string
  isDefault: boolean
  status: string
}

export interface SavingsGoal {
  id: string
  name: string
  targetAmount: number
  currentAmount: number
  progress: number
  deadline: string
  category: string
  color: string
}

export interface MicroAction {
  id: string
  name: string
  type: string
  isActive: boolean
  totalSaved: number
  description: string
}

export interface Alert {
  id: number
  type: string
  title: string
  description: string
  amount: number
  timestamp: string
  date: string
}

class DataService {
  // User data methods
  getUser(): User {
    return mockUserData.user
  }

  getAccounts(): Account[] {
    return mockUserData.accounts
  }

  getSavingsGoals(): SavingsGoal[] {
    return mockUserData.savingsGoals
  }

  getMicroActions(): MicroAction[] {
    return mockUserData.microActions
  }

  // Transaction methods
  getTransactions(): Transaction[] {
    return mockTransactions.transactions as Transaction[]
  }

  getTransactionsSummary() {
    return mockTransactions.summary
  }

  getRecentTransactions(limit: number = 5): Transaction[] {
    return this.getTransactions().slice(0, limit)
  }

  getTransactionsByCategory(category: string): Transaction[] {
    return this.getTransactions().filter(t => t.category === category)
  }

  getTransactionsByDateRange(startDate: string, endDate: string): Transaction[] {
    return this.getTransactions().filter(t => {
      return t.date >= startDate && t.date <= endDate
    })
  }

  // Alert methods
  getAlerts(): Alert[] {
    return mockAlerts.alerts
  }

  getRecentAlerts(limit: number = 5): Alert[] {
    return this.getAlerts().slice(0, limit)
  }

  // Financial insights
  getSpendingByCategory() {
    const transactions = this.getTransactions()
    const categories: Record<string, number> = {}
    
    transactions.forEach(t => {
      if (t.type === 'debit') {
        categories[t.category] = (categories[t.category] || 0) + Math.abs(t.amount)
      }
    })
    
    return Object.entries(categories).map(([category, amount]) => ({
      category,
      amount,
      percentage: (amount / Object.values(categories).reduce((a, b) => a + b, 0)) * 100
    }))
  }

  getMonthlySpending() {
    const transactions = this.getTransactions()
    const monthly: Record<string, number> = {}
    
    transactions.forEach(t => {
      if (t.type === 'debit') {
        const month = t.date.substring(0, 7) // YYYY-MM
        monthly[month] = (monthly[month] || 0) + Math.abs(t.amount)
      }
    })
    
    return monthly
  }

  getTotalBalance(): number {
    return this.getAccounts().reduce((total, account) => total + account.balance, 0)
  }

  getTotalSavingsProgress(): number {
    const goals = this.getSavingsGoals()
    const totalTarget = goals.reduce((sum, goal) => sum + goal.targetAmount, 0)
    const totalCurrent = goals.reduce((sum, goal) => sum + goal.currentAmount, 0)
    return totalTarget > 0 ? (totalCurrent / totalTarget) * 100 : 0
  }

  // Simulation methods for interactive features
  addTransaction(transaction: Omit<Transaction, 'id' | 'timestamp' | 'balance'>): Transaction {
    const newTransaction: Transaction = {
      ...transaction,
      id: `txn_${Date.now()}`,
      timestamp: new Date().toISOString(),
      balance: this.getTotalBalance() + transaction.amount
    }
    
    // In a real app, this would persist to a database
    console.log('New transaction added:', newTransaction)
    return newTransaction
  }

  updateSavingsGoal(goalId: string, amount: number): SavingsGoal | null {
    const goals = this.getSavingsGoals()
    const goal = goals.find(g => g.id === goalId)
    
    if (goal) {
      goal.currentAmount += amount
      goal.progress = (goal.currentAmount / goal.targetAmount) * 100
      console.log('Savings goal updated:', goal)
      return goal
    }
    
    return null
  }

  toggleMicroAction(actionId: string): MicroAction | null {
    const actions = this.getMicroActions()
    const action = actions.find(a => a.id === actionId)
    
    if (action) {
      action.isActive = !action.isActive
      console.log('Micro action toggled:', action)
      return action
    }
    
    return null
  }
}

export const dataService = new DataService()
export default dataService