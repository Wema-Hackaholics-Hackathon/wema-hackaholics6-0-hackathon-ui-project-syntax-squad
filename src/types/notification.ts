export interface Notification {
  id: string
  userId: string
  type: NotificationType
  title: string
  message: string
  data: NotificationData
  priority: NotificationPriority
  status: NotificationStatus
  channel: NotificationChannel[]
  scheduledFor?: string
  sentAt?: string
  readAt?: string
  expiresAt?: string
  createdAt: string
}

export type NotificationType = 
  | 'transaction' 
  | 'security' 
  | 'account' 
  | 'marketing' 
  | 'system' 
  | 'social' 
  | 'budget' 
  | 'goal' 
  | 'payment'

export type NotificationPriority = 'low' | 'medium' | 'high' | 'urgent'

export type NotificationStatus = 'pending' | 'sent' | 'delivered' | 'read' | 'failed' | 'expired'

export type NotificationChannel = 'push' | 'email' | 'sms' | 'in_app' | 'webhook'

export interface NotificationData {
  transactionId?: string
  amount?: number
  currency?: string
  accountNumber?: string
  reference?: string
  actionUrl?: string
  actionLabel?: string
  imageUrl?: string
  metadata?: Record<string, any>
}

export interface AlertRule {
  id: string
  userId: string
  name: string
  description?: string
  type: AlertType
  conditions: AlertCondition[]
  actions: AlertAction[]
  isActive: boolean
  frequency: AlertFrequency
  lastTriggered?: string
  triggerCount: number
  createdAt: string
  updatedAt: string
}

export type AlertType = 
  | 'transaction_amount' 
  | 'balance_threshold' 
  | 'spending_limit' 
  | 'unusual_activity' 
  | 'failed_transaction' 
  | 'security_event'

export interface AlertCondition {
  field: string
  operator: 'equals' | 'greater_than' | 'less_than' | 'contains' | 'not_equals'
  value: unknown
  logicalOperator?: 'AND' | 'OR'
}

export interface AlertAction {
  type: 'notification' | 'email' | 'sms' | 'block_account' | 'log_event'
  config: Record<string, any>
}

export interface AlertFrequency {
  type: 'immediate' | 'batched' | 'scheduled'
  interval?: number
  unit?: 'minutes' | 'hours' | 'days'
  time?: string
}

export interface PushSubscription {
  id: string
  userId: string
  deviceId: string
  endpoint: string
  keys: {
    p256dh: string
    auth: string
  }
  userAgent: string
  isActive: boolean
  createdAt: string
  lastUsed: string
}

export interface EmailTemplate {
  id: string
  name: string
  subject: string
  htmlContent: string
  textContent: string
  variables: TemplateVariable[]
  type: NotificationType
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface TemplateVariable {
  name: string
  type: 'string' | 'number' | 'date' | 'currency'
  required: boolean
  defaultValue?: any
  description?: string
}

export interface SMSTemplate {
  id: string
  name: string
  content: string
  variables: TemplateVariable[]
  type: NotificationType
  maxLength: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface NotificationPreference {
  userId: string
  type: NotificationType
  channels: NotificationChannelPreference[]
  frequency: PreferenceFrequency
  quietHours: QuietHours
  isEnabled: boolean
  updatedAt: string
}

export interface NotificationChannelPreference {
  channel: NotificationChannel
  enabled: boolean
  priority: NotificationPriority[]
}

export interface PreferenceFrequency {
  type: 'immediate' | 'hourly' | 'daily' | 'weekly'
  time?: string
  dayOfWeek?: number
}

export interface QuietHours {
  enabled: boolean
  startTime: string
  endTime: string
  timezone: string
  allowUrgent: boolean
}

export interface NotificationLog {
  id: string
  notificationId: string
  userId: string
  channel: NotificationChannel
  status: 'sent' | 'delivered' | 'failed' | 'bounced'
  response?: string
  error?: string
  timestamp: string
  deliveryTime?: number
}