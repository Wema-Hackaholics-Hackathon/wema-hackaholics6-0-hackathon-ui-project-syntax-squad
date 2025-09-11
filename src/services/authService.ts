import database from './database'
import { User, AuthSession } from '../types'

export class AuthService {
  private currentUser: User | null = null
  private currentSession: AuthSession | null = null

  // Mock ALAT account verification
  async verifyAccountNumber(accountNumber: string): Promise<{ exists: boolean; email?: string }> {
    // Simulate API call delay
    await this.delay(2000)

    // Check if user exists in local database
    const existingUser = await database.findUserByAccountNumber(accountNumber)
    
    if (existingUser) {
      return {
        exists: true,
        email: this.maskEmail(existingUser.email)
      }
    }

    // For demo purposes, accept any 10-digit number
    if (accountNumber.length === 10 && /^\d+$/.test(accountNumber)) {
      const mockEmail = `user${accountNumber.slice(-4)}@email.com`
      return {
        exists: true,
        email: this.maskEmail(mockEmail)
      }
    }

    return { exists: false }
  }

  // Mock OTP sending
  async sendOTP(accountNumber: string, email: string): Promise<boolean> {
    // Simulate API call delay
    await this.delay(1500)
    
    console.log(`📧 Mock OTP sent to ${email} for account ${accountNumber}`)
    return true
  }

  // Mock OTP verification (accepts any 6-digit code)
  async verifyOTP(accountNumber: string, otp: string): Promise<{ success: boolean; user?: User }> {
    // Simulate API call delay
    await this.delay(1000)

    // Accept any 6-digit OTP
    if (otp.length === 6 && /^\d+$/.test(otp)) {
      let user = await database.findUserByAccountNumber(accountNumber)

      // Create new user if doesn't exist
      if (!user) {
        user = await this.createMockUser(accountNumber)
      }

      // Create session
      const session = this.createSession(user)
      this.currentUser = user
      this.currentSession = session

      // Store session in localStorage
      localStorage.setItem('alat-session', JSON.stringify(session))

      return { success: true, user }
    }

    return { success: false }
  }

  // Create mock user for demo
  private async createMockUser(accountNumber: string): Promise<User> {
    const mockUser = {
      accountNumber,
      email: `user${accountNumber.slice(-4)}@email.com`,
      phoneNumber: `+234${accountNumber}`,
      firstName: `User`,
      lastName: `${accountNumber.slice(-4)}`,
      dateOfBirth: '1990-01-01',
      isVerified: true
    }

    return await database.createUser(mockUser)
  }

  // Create session
  private createSession(user: User): AuthSession {
    return {
      userId: user.id,
      sessionId: this.generateId(),
      accessToken: this.generateToken(),
      refreshToken: this.generateToken(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
      isActive: true,
      deviceInfo: {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        ipAddress: '127.0.0.1' // Mock IP
      }
    }
  }

  // Check if user has valid session
  async checkSession(): Promise<User | null> {
    const savedSession = localStorage.getItem('alat-session')
    
    if (!savedSession) return null

    try {
      const session: AuthSession = JSON.parse(savedSession)
      
      // Check if session is expired
      if (new Date(session.expiresAt) < new Date()) {
        this.logout()
        return null
      }

      // Find user
      const user = await database.findUserByAccountNumber(session.userId)
      if (user) {
        this.currentUser = user
        this.currentSession = session
        return user
      }
    } catch (error) {
      console.error('Error checking session:', error)
    }

    return null
  }

  // Get current user
  getCurrentUser(): User | null {
    return this.currentUser
  }

  // Get current session
  getCurrentSession(): AuthSession | null {
    return this.currentSession
  }

  // Logout
  logout(): void {
    this.currentUser = null
    this.currentSession = null
    localStorage.removeItem('alat-session')
  }

  // Utility methods
  private maskEmail(email: string): string {
    const [username, domain] = email.split('@')
    const maskedUsername = username.slice(0, 2) + '*'.repeat(username.length - 4) + username.slice(-2)
    return `${maskedUsername}@${domain}`
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2)
  }

  private generateToken(): string {
    return Array.from({ length: 32 }, () => Math.random().toString(36)[2]).join('')
  }
}

// Export singleton instance
export const authService = new AuthService()
export default authService