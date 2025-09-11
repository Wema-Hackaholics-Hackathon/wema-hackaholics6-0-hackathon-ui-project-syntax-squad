export interface Transaction {
  id: string
  userId: string
  type: TransactionType
  status: TransactionStatus
  amount: number
  currency: string
  description: string
  reference: string
  category: TransactionCategory
  subcategory?: string
  merchant?: MerchantInfo
  location?: TransactionLocation
  metadata: TransactionMetadata
  timestamp: string
  completedAt?: string
  failedAt?: string
  createdAt: string
  updatedAt: string
}

export type TransactionType = 
  | 'debit' 
  | 'credit' 
  | 'transfer' 
  | 'payment' 
  | 'withdrawal' 
  | 'deposit' 
  | 'refund' 
  | 'reversal'
  | 'fee'
  | 'interest'

export type TransactionStatus = 
  | 'pending' 
  | 'processing' 
  | 'completed' 
  | 'failed' 
  | 'cancelled' 
  | 'reversed'

export interface TransactionCategory {
  id: string
  name: string
  icon: string
  color: string
  parentId?: string
  isCustom: boolean
}

export interface MerchantInfo {
  id: string
  name: string
  category: string
  logo?: string
  website?: string
  phone?: string
  address?: string
  mcc?: string // Merchant Category Code
}

export interface TransactionLocation {
  country: string
  city: string
  coordinates?: {
    lat: number
    lng: number
  }
  address?: string
}

export interface TransactionMetadata {
  channel: 'mobile' | 'web' | 'ussd' | 'atm' | 'pos' | 'api'
  deviceId?: string
  sessionId?: string
  ipAddress?: string
  userAgent?: string
  qrCode?: string
  receipt?: TransactionReceipt
  fees?: TransactionFee[]
  tags?: string[]
  notes?: string
}

export interface TransactionReceipt {
  id: string
  qrCode: string
  downloadUrl?: string
  emailSent: boolean
  smsSent: boolean
  createdAt: string
}

export interface TransactionFee {
  type: 'processing' | 'transaction' | 'service' | 'stamp_duty' | 'vat'
  amount: number
  currency: string
  description: string
}

export interface TransferRequest {
  recipientAccountNumber: string
  recipientBankCode?: string
  amount: number
  currency: string
  description: string
  reference?: string
  scheduled?: {
    date: string
    recurring?: RecurringSchedule
  }
  qrCode?: string
}

export interface RecurringSchedule {
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly'
  interval: number
  endDate?: string
  maxOccurrences?: number
}

export interface PaymentRequest {
  id: string
  fromUserId: string
  toUserId: string
  amount: number
  currency: string
  description: string
  dueDate?: string
  qrCode: string
  status: 'pending' | 'paid' | 'expired' | 'cancelled'
  createdAt: string
  expiresAt: string
}

export interface BulkTransfer {
  id: string
  userId: string
  name: string
  totalAmount: number
  currency: string
  transfers: BulkTransferItem[]
  status: 'draft' | 'processing' | 'completed' | 'failed' | 'partial'
  scheduledFor?: string
  processedAt?: string
  createdAt: string
}

export interface BulkTransferItem {
  recipientAccountNumber: string
  recipientName: string
  amount: number
  description: string
  reference: string
  status: TransactionStatus
  transactionId?: string
}