export interface Account {
  id: string
  userId: string
  accountNumber: string
  accountName: string
  accountType: AccountType
  bankCode: string
  bankName: string
  currency: string
  balance: AccountBalance
  status: AccountStatus
  isDefault: boolean
  restrictions?: AccountRestriction[]
  createdAt: string
  updatedAt: string
}

export type AccountType = 
  | 'savings' 
  | 'current' 
  | 'fixed_deposit' 
  | 'domiciliary' 
  | 'loan' 
  | 'investment'

export type AccountStatus = 
  | 'active' 
  | 'inactive' 
  | 'frozen' 
  | 'closed' 
  | 'restricted'

export interface AccountBalance {
  available: number
  ledger: number
  pending: number
  currency: string
  lastUpdated: string
}

export interface AccountRestriction {
  type: 'debit' | 'credit' | 'transfer' | 'withdrawal'
  reason: string
  appliedAt: string
  expiresAt?: string
  appliedBy: string
}

export interface Bank {
  id: string
  name: string
  code: string
  country: string
  logo?: string
  isActive: boolean
  supportsTransfers: boolean
  processingTime: string
  fees: BankFee[]
}

export interface BankFee {
  type: 'transfer' | 'inquiry' | 'transaction'
  amount: number
  currency: string
  minAmount?: number
  maxAmount?: number
  percentage?: number
}

export interface BankingIntegration {
  id: string
  userId: string
  bankId: string
  accountId: string
  status: IntegrationStatus
  permissions: BankingPermission[]
  lastSync: string
  syncInterval: number
  autoSync: boolean
  webhookUrl?: string
  apiVersion: string
  createdAt: string
  updatedAt: string
}

export type IntegrationStatus = 
  | 'active' 
  | 'inactive' 
  | 'error' 
  | 'pending_auth' 
  | 'expired'

export interface BankingPermission {
  scope: 'read' | 'write' | 'transfer'
  resource: 'balance' | 'transactions' | 'account_info' | 'beneficiaries'
  grantedAt: string
  expiresAt?: string
}

export interface ExternalAccount {
  id: string
  userId: string
  bankId: string
  accountNumber: string
  accountName: string
  isVerified: boolean
  isFavorite: boolean
  lastUsed?: string
  addedAt: string
}

export interface AccountStatement {
  id: string
  accountId: string
  startDate: string
  endDate: string
  format: 'pdf' | 'excel' | 'csv'
  status: 'generating' | 'ready' | 'expired' | 'failed'
  downloadUrl?: string
  requestedAt: string
  expiresAt: string
}

export interface CardInfo {
  id: string
  accountId: string
  cardNumber: string // masked
  cardType: 'debit' | 'credit' | 'prepaid'
  brand: 'visa' | 'mastercard' | 'verve'
  status: 'active' | 'blocked' | 'expired' | 'damaged'
  expiryDate: string
  cvv?: string // encrypted
  isVirtual: boolean
  limits: CardLimits
  createdAt: string
}

export interface CardLimits {
  daily: {
    spending: number
    withdrawal: number
    transactions: number
  }
  monthly: {
    spending: number
    withdrawal: number
    transactions: number
  }
  perTransaction: {
    pos: number
    atm: number
    online: number
    international: number
  }
}