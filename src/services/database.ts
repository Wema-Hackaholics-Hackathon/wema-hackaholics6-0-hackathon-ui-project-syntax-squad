import { 
  User, 
  Transaction, 
  Account, 
  SocialConnection, 
  Notification, 
  SpendingAnalytics 
} from '../types'

// Simple reactive local storage implementation without external dependencies
class LocalDatabase {
  private listeners: { [key: string]: Array<(data: unknown) => void> } = {}
  private isClient: boolean

  constructor() {
    this.isClient = typeof window !== 'undefined'
    
    if (this.isClient) {
      // Initialize empty arrays if not exist
      if (!localStorage.getItem('alat-users')) {
        localStorage.setItem('alat-users', '[]')
      }
      if (!localStorage.getItem('alat-transactions')) {
        localStorage.setItem('alat-transactions', '[]')
      }
      if (!localStorage.getItem('alat-accounts')) {
        localStorage.setItem('alat-accounts', '[]')
      }
      if (!localStorage.getItem('alat-social-connections')) {
        localStorage.setItem('alat-social-connections', '[]')
      }
      if (!localStorage.getItem('alat-notifications')) {
        localStorage.setItem('alat-notifications', '[]')
      }
      if (!localStorage.getItem('alat-analytics')) {
        localStorage.setItem('alat-analytics', '[]')
      }
    }
  }

  private getData<T>(key: string): T[] {
    if (!this.isClient) return []
    
    try {
      return JSON.parse(localStorage.getItem(key) || '[]')
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error)
      return []
    }
  }

  private setData<T>(key: string, data: T[]): void {
    if (!this.isClient) return
    
    try {
      localStorage.setItem(key, JSON.stringify(data))
      this.notifyListeners(key, data)
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error)
    }
  }

  private notifyListeners(key: string, data: unknown): void {
    if (this.listeners[key]) {
      this.listeners[key].forEach(callback => callback(data))
    }
  }

  // Subscribe to data changes
  subscribe<T>(key: string, callback: (data: T[]) => void): () => void {
    if (!this.listeners[key]) {
      this.listeners[key] = [];
    }
    // Wrap the callback to cast unknown to T[] safely
    const wrappedCallback = (data: unknown) => {
      if (Array.isArray(data)) {
        callback(data as T[]);
      }
    };
    this.listeners[key].push(wrappedCallback);

    // Return unsubscribe function
    return () => {
      this.listeners[key] = this.listeners[key].filter(cb => cb !== wrappedCallback);
    };
  }

  // Users collection
  getUsers(): User[] {
    return this.getData<User>('alat-users')
  }

  async createUser(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const newUser: User = {
      ...user,
      id: this.generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    const currentUsers = this.getUsers()
    const updatedUsers = [...currentUsers, newUser]
    this.setData('alat-users', updatedUsers)
    
    return newUser
  }

  async findUserByAccountNumber(accountNumber: string): Promise<User | null> {
    const users = this.getUsers()
    return users.find(user => user.accountNumber === accountNumber) || null
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | null> {
    const currentUsers = this.getUsers()
    const userIndex = currentUsers.findIndex(user => user.id === id)
    
    if (userIndex === -1) return null

    const updatedUser = {
      ...currentUsers[userIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    }

    const updatedUsers = [...currentUsers]
    updatedUsers[userIndex] = updatedUser
    
    this.setData('alat-users', updatedUsers)
    
    return updatedUser
  }

  // Transactions collection
  getTransactions(): Transaction[] {
    return this.getData<Transaction>('alat-transactions')
  }

  async createTransaction(transaction: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>): Promise<Transaction> {
    const newTransaction: Transaction = {
      ...transaction,
      id: this.generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    const currentTransactions = this.getTransactions()
    const updatedTransactions = [...currentTransactions, newTransaction]
    this.setData('alat-transactions', updatedTransactions)
    
    return newTransaction
  }

  async findTransactionsByUser(userId: string): Promise<Transaction[]> {
    const transactions = this.getTransactions()
    return transactions.filter(transaction => transaction.userId === userId)
  }

  // Accounts collection
  getAccounts(): Account[] {
    return this.getData<Account>('alat-accounts')
  }

  async createAccount(account: Omit<Account, 'id' | 'createdAt' | 'updatedAt'>): Promise<Account> {
    const newAccount: Account = {
      ...account,
      id: this.generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    const currentAccounts = this.getAccounts()
    const updatedAccounts = [...currentAccounts, newAccount]
    this.setData('alat-accounts', updatedAccounts)
    
    return newAccount
  }

  async findAccountsByUser(userId: string): Promise<Account[]> {
    const accounts = this.getAccounts()
    return accounts.filter(account => account.userId === userId)
  }

  // Notifications collection
  getNotifications(): Notification[] {
    return this.getData<Notification>('alat-notifications')
  }

  async createNotification(notification: Omit<Notification, 'id' | 'createdAt'>): Promise<Notification> {
    const newNotification: Notification = {
      ...notification,
      id: this.generateId(),
      createdAt: new Date().toISOString()
    }

    const currentNotifications = this.getNotifications()
    const updatedNotifications = [...currentNotifications, newNotification]
    this.setData('alat-notifications', updatedNotifications)
    
    return newNotification
  }

  async findNotificationsByUser(userId: string): Promise<Notification[]> {
    const notifications = this.getNotifications()
    return notifications.filter(notification => notification.userId === userId)
  }

  async markNotificationAsRead(id: string): Promise<boolean> {
    const currentNotifications = this.getNotifications()
    const notificationIndex = currentNotifications.findIndex(notification => notification.id === id)
    
    if (notificationIndex === -1) return false

    const updatedNotifications = [...currentNotifications]
    updatedNotifications[notificationIndex] = {
      ...updatedNotifications[notificationIndex],
      status: 'read',
      readAt: new Date().toISOString()
    }
    
    this.setData('alat-notifications', updatedNotifications)
    
    return true
  }

  // Analytics collection
  getAnalytics(): SpendingAnalytics[] {
    return this.getData<SpendingAnalytics>('alat-analytics')
  }

  async createAnalytics(analytics: Omit<SpendingAnalytics, 'id'>): Promise<SpendingAnalytics> {
    const newAnalytics: SpendingAnalytics = {
      ...analytics,
      id: this.generateId()
    }

    const currentAnalytics = this.getAnalytics()
    const updatedAnalytics = [...currentAnalytics, newAnalytics]
    this.setData('alat-analytics', updatedAnalytics)
    
    return newAnalytics
  }

  async findAnalyticsByUser(userId: string): Promise<SpendingAnalytics[]> {
    const analytics = this.getAnalytics()
    return analytics.filter(analytic => analytic.userId === userId)
  }

  // Social connections
  getSocialConnections(): SocialConnection[] {
    return this.getData<SocialConnection>('alat-social-connections')
  }

  async createSocialConnection(connection: Omit<SocialConnection, 'id' | 'createdAt'>): Promise<SocialConnection> {
    const newConnection: SocialConnection = {
      ...connection,
      id: this.generateId(),
      createdAt: new Date().toISOString()
    }

    const currentConnections = this.getSocialConnections()
    const updatedConnections = [...currentConnections, newConnection]
    this.setData('alat-social-connections', updatedConnections)
    
    return newConnection
  }

  async findConnectionsByUser(userId: string): Promise<SocialConnection[]> {
    const connections = this.getSocialConnections()
    return connections.filter(connection => connection.userId === userId)
  }

  // Utility methods
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2)
  }

  // Clear all data (for development/testing)
  async clearAllData(): Promise<void> {
    if (!this.isClient) return

    localStorage.removeItem('alat-users')
    localStorage.removeItem('alat-transactions')
    localStorage.removeItem('alat-accounts')
    localStorage.removeItem('alat-social-connections')
    localStorage.removeItem('alat-notifications')
    localStorage.removeItem('alat-analytics')

    // Reinitialize
    localStorage.setItem('alat-users', '[]')
    localStorage.setItem('alat-transactions', '[]')
    localStorage.setItem('alat-accounts', '[]')
    localStorage.setItem('alat-social-connections', '[]')
    localStorage.setItem('alat-notifications', '[]')
    localStorage.setItem('alat-analytics', '[]')

    // Notify listeners
    this.notifyListeners('alat-users', [])
    this.notifyListeners('alat-transactions', [])
    this.notifyListeners('alat-accounts', [])
    this.notifyListeners('alat-social-connections', [])
    this.notifyListeners('alat-notifications', [])
    this.notifyListeners('alat-analytics', [])
  }
}

// Export singleton instance
export const database = new LocalDatabase()
export default database