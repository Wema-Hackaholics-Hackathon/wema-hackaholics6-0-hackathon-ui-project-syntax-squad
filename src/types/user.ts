export interface User {
  id: string
  accountNumber: string
  email: string
  phoneNumber: string
  firstName: string
  lastName: string
  middleName?: string
  dateOfBirth: string
  avatar?: string
  isVerified: boolean
  createdAt: string
  updatedAt: string
}

export interface UserProfile extends User {
  bvn: string
  address: UserAddress
  preferences: UserPreferences
  securitySettings: SecuritySettings
  kycStatus: KYCStatus
}

export interface UserAddress {
  street: string
  city: string
  state: string
  country: string
  postalCode: string
}

export interface UserPreferences {
  currency: string
  language: string
  timezone: string
  notifications: NotificationPreferences
  theme: 'light' | 'dark' | 'auto'
  biometricEnabled: boolean
}

export interface NotificationPreferences {
  pushNotifications: boolean
  emailNotifications: boolean
  smsNotifications: boolean
  transactionAlerts: boolean
  marketingEmails: boolean
  securityAlerts: boolean
}

export interface SecuritySettings {
  twoFactorEnabled: boolean
  biometricEnabled: boolean
  sessionTimeout: number
  lastPasswordChange: string
  trustedDevices: TrustedDevice[]
}

export interface TrustedDevice {
  id: string
  deviceName: string
  deviceType: 'mobile' | 'desktop' | 'tablet'
  lastUsed: string
  isActive: boolean
}

export interface KYCStatus {
  level: 1 | 2 | 3
  status: 'pending' | 'approved' | 'rejected' | 'expired'
  documents: KYCDocument[]
  lastUpdated: string
}

export interface KYCDocument {
  id: string
  type: 'passport' | 'drivers_license' | 'national_id' | 'utility_bill'
  status: 'pending' | 'approved' | 'rejected'
  uploadedAt: string
  expiryDate?: string
}

export interface AuthSession {
  userId: string
  sessionId: string
  accessToken: string
  refreshToken: string
  expiresAt: string
  isActive: boolean
  deviceInfo: DeviceInfo
}

export interface DeviceInfo {
  userAgent: string
  platform: string
  ipAddress: string
  location?: {
    country: string
    city: string
    coordinates?: {
      lat: number
      lng: number
    }
  }
}

export interface LoginAttempt {
  id: string
  accountNumber: string
  timestamp: string
  success: boolean
  ipAddress: string
  deviceInfo: DeviceInfo
  failureReason?: string
}