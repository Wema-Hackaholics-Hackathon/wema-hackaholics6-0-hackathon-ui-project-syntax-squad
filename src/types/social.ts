export interface SocialConnection {
  id: string
  userId: string
  connectedUserId: string
  connectionType: 'friend' | 'family' | 'colleague' | 'business'
  status: 'pending' | 'accepted' | 'blocked' | 'declined'
  permissions: SocialPermission[]
  createdAt: string
  acceptedAt?: string
}

export interface SocialPermission {
  type: 'view_transactions' | 'send_money' | 'request_money' | 'split_bills'
  granted: boolean
  grantedAt?: string
}

export interface SocialPayment {
  id: string
  fromUserId: string
  toUserId: string
  amount: number
  currency: string
  description: string
  type: 'send' | 'request' | 'split'
  status: SocialPaymentStatus
  metadata: SocialPaymentMetadata
  transactionId?: string
  createdAt: string
  completedAt?: string
}

export type SocialPaymentStatus = 
  | 'pending' 
  | 'accepted' 
  | 'completed' 
  | 'declined' 
  | 'expired' 
  | 'cancelled'

export interface SocialPaymentMetadata {
  qrCode?: string
  shareLink?: string
  message?: string
  emoji?: string
  isPrivate: boolean
  expiresAt?: string
  reminderSent: boolean
}

export interface Group {
  id: string
  name: string
  description?: string
  avatar?: string
  createdBy: string
  members: GroupMember[]
  type: 'family' | 'friends' | 'colleagues' | 'custom'
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface GroupMember {
  userId: string
  role: 'admin' | 'member'
  permissions: GroupPermission[]
  joinedAt: string
  invitedBy: string
}

export interface GroupPermission {
  type: 'create_expense' | 'approve_expense' | 'invite_members' | 'manage_group'
  granted: boolean
}

export interface GroupExpense {
  id: string
  groupId: string
  createdBy: string
  title: string
  description?: string
  totalAmount: number
  currency: string
  category: string
  receipt?: string
  splitMethod: SplitMethod
  participants: ExpenseParticipant[]
  status: 'pending' | 'partially_paid' | 'fully_paid' | 'cancelled'
  dueDate?: string
  createdAt: string
  settledAt?: string
}

export type SplitMethod = 'equal' | 'percentage' | 'exact_amounts' | 'shares'

export interface ExpenseParticipant {
  userId: string
  shareAmount: number
  sharePercentage?: number
  shares?: number
  isPaid: boolean
  paidAmount: number
  paidAt?: string
  transactionId?: string
}

export interface SocialActivity {
  id: string
  userId: string
  type: SocialActivityType
  targetUserId?: string
  groupId?: string
  paymentId?: string
  expenseId?: string
  amount?: number
  currency?: string
  message?: string
  isPublic: boolean
  createdAt: string
}

export type SocialActivityType = 
  | 'payment_sent' 
  | 'payment_received' 
  | 'payment_requested' 
  | 'expense_created' 
  | 'expense_settled' 
  | 'group_joined' 
  | 'connection_added'

export interface ContactInfo {
  id: string
  userId: string
  phoneNumber?: string
  email?: string
  accountNumber?: string
  displayName: string
  avatar?: string
  isVerified: boolean
  isFavorite: boolean
  lastInteraction?: string
  addedAt: string
}

export interface SocialNotification {
  id: string
  userId: string
  type: SocialNotificationType
  title: string
  message: string
  data: Record<string, any>
  isRead: boolean
  createdAt: string
  readAt?: string
}

export type SocialNotificationType = 
  | 'payment_request' 
  | 'payment_received' 
  | 'connection_request' 
  | 'group_invitation' 
  | 'expense_reminder' 
  | 'settlement_reminder'