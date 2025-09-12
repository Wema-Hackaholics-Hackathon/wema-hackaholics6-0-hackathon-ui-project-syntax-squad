// Re-export all types for easy importing
export * from './user'
export * from './transaction'
export * from './banking'
export * from './social'
export * from './analytics'
export * from './notification'
export * from './ui'

// Common utility types
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
  timestamp: string
}

export interface PaginatedResponse<T = unknown> extends ApiResponse<T[]> {
  pagination: {
    page: number
    pageSize: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrevious: boolean
  }
}

export interface DatabaseDocument {
  id: string
  createdAt: string
  updatedAt: string
  _rev?: string // RxDB revision
}

export interface DatabaseConfig {
  name: string
  version: number
  multiInstance: boolean
  ignoreDuplicate: boolean
}

export interface SyncOptions {
  remote: string
  direction: 'pull' | 'push' | 'both'
  options: {
    live: boolean
    retry: boolean
    back_off_function?: (delay: number) => number
    timeout?: number
  }
}

// Common enum-like types
export const CURRENCIES = ['NGN', 'USD', 'EUR', 'GBP'] as const
export type Currency = typeof CURRENCIES[number]

export const COUNTRIES = ['NG', 'US', 'GB', 'CA'] as const
export type Country = typeof COUNTRIES[number]

export const LANGUAGES = ['en', 'ha', 'ig', 'yo'] as const
export type Language = typeof LANGUAGES[number]

export const TIMEZONES = ['Africa/Lagos', 'UTC', 'America/New_York', 'Europe/London'] as const
export type Timezone = typeof TIMEZONES[number]

// API endpoint types
export interface ApiEndpoints {
  auth: {
    login: '/api/auth/login'
    logout: '/api/auth/logout'
    refresh: '/api/auth/refresh'
    verify: '/api/auth/verify'
  }
  users: {
    profile: '/api/users/profile'
    preferences: '/api/users/preferences'
    security: '/api/users/security'
  }
  transactions: {
    list: '/api/transactions'
    create: '/api/transactions'
    details: '/api/transactions/:id'
  }
  banking: {
    accounts: '/api/banking/accounts'
    balance: '/api/banking/balance'
    transfer: '/api/banking/transfer'
  }
  social: {
    connections: '/api/social/connections'
    payments: '/api/social/payments'
    groups: '/api/social/groups'
  }
  analytics: {
    spending: '/api/analytics/spending'
    insights: '/api/analytics/insights'
    goals: '/api/analytics/goals'
  }
  notifications: {
    list: '/api/notifications'
    mark_read: '/api/notifications/:id/read'
    preferences: '/api/notifications/preferences'
  }
}