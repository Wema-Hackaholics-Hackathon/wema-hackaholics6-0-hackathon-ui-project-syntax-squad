'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Box, 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  Typography, 
  CircularProgress, 
  Alert,
  Stepper,
  Step,
  StepLabel
} from '@mui/material'
import { CheckCircle, ArrowLeft } from 'lucide-react'
import { authService } from '../services/authService'
import { User } from '../types'

interface AuthOverlayProps {
  onAuthSuccess: (user: User) => void
}

type AuthStep = 'account' | 'verification' | 'otp'

export function AuthOverlay({ onAuthSuccess }: AuthOverlayProps) {
  const [step, setStep] = useState<AuthStep>('account')
  const [accountNumber, setAccountNumber] = useState('')
  const [maskedEmail, setMaskedEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const steps = ['Account Number', 'Verification', 'Enter OTP']

  const handleAccountSubmit = async () => {
    if (accountNumber.length !== 10) {
      setError('Please enter a valid 10-digit account number')
      return
    }

    setLoading(true)
    setError('')

    try {
      const result = await authService.verifyAccountNumber(accountNumber)
      
      if (result.exists && result.email) {
        setMaskedEmail(result.email)
        setStep('verification')
      } else {
        setError('Account number not found. Please check and try again.')
      }
    } catch (error) {
      setError('Unable to verify account. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSendOTP = async () => {
    setLoading(true)
    setError('')

    try {
      await authService.sendOTP(accountNumber, maskedEmail)
      setStep('otp')
    } catch (error) {
      setError('Failed to send OTP. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleOTPSubmit = async () => {
    if (otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP')
      return
    }

    setLoading(true)
    setError('')

    try {
      const result = await authService.verifyOTP(accountNumber, otp)
      
      if (result.success && result.user) {
        onAuthSuccess(result.user)
      } else {
        setError('Invalid OTP. Please check and try again.')
      }
    } catch (error) {
      setError('OTP verification failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {
    setError('')
    if (step === 'verification') {
      setStep('account')
      setMaskedEmail('')
    } else if (step === 'otp') {
      setStep('verification')
      setOtp('')
    }
  }

  const getStepIndex = () => {
    switch (step) {
      case 'account': return 0
      case 'verification': return 1
      case 'otp': return 2
      default: return 0
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] grid place-items-center p-4 bg-background/80 dark:bg-slate-900/90 backdrop-blur-xl"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <Card 
          sx={{
            maxWidth: { xs: 340, sm: 500 },
            width: { xs: '90%', sm: '100%' },
            background: 'hsl(var(--card))',
            backdropFilter: 'blur(20px)',
            boxShadow: `
              0 32px 64px rgba(174, 50, 142, 0.15),
              0 16px 32px rgba(174, 50, 142, 0.1),
              0 8px 16px rgba(174, 50, 142, 0.05),
              inset 0 1px 0 rgba(255, 255, 255, 0.8)
            `,
            borderRadius: 4,
            border: '1px solid hsl(var(--border))'
          }}
        >
          <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
            {/* Header */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              >
                <Box 
                  component="img"
                  src="/logo.webp"
                  alt="ALAT Logo"
                  sx={{
                    width: 64,
                    height: 64,
                    filter: 'drop-shadow(0 4px 8px rgba(174, 50, 142, 0.3))',
                    mb: 2
                  }}
                />
              </motion.div>
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #AE328E 0%, #c13a9e 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 2px 4px rgba(174, 50, 142, 0.1)'
                }}
              >
                ALAT Spark
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                Alat, with a spark for Gen Z
              </Typography>
            </Box>

            {/* Stepper */}
            <Stepper 
              activeStep={getStepIndex()} 
              sx={{ 
                mb: 4,
                '& .MuiStepIcon-root': {
                  filter: 'drop-shadow(0 2px 4px rgba(174, 50, 142, 0.2))'
                }
              }}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {/* Error Alert */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <Alert 
                    severity="error" 
                    sx={{ 
                      mb: 3,
                      boxShadow: '0 4px 12px rgba(211, 47, 47, 0.15)'
                    }}
                  >
                    {error}
                  </Alert>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step Content */}
            <AnimatePresence mode="wait">
              {step === 'account' && (
                <motion.div
                  key="account"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Enter your ALAT account number
                  </Typography>
                  <TextField
                    fullWidth
                    label="Account Number"
                    value={accountNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 10)
                      setAccountNumber(value)
                      setError('')
                    }}
                    placeholder="0123456789"
                    variant="outlined"
                    inputProps={{ 
                      maxLength: 10,
                      style: { 
                        fontSize: '1.1rem',
                        letterSpacing: '0.1em',
                        textAlign: 'center'
                      }
                    }}
                    sx={{
                      mb: 3,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        boxShadow: '0 4px 12px rgba(174, 50, 142, 0.1)',
                        '&:hover': {
                          boxShadow: '0 6px 16px rgba(174, 50, 142, 0.15)'
                        },
                        '&.Mui-focused': {
                          boxShadow: '0 8px 20px rgba(174, 50, 142, 0.2)'
                        }
                      }
                    }}
                  />
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={handleAccountSubmit}
                    disabled={loading || accountNumber.length !== 10}
                    sx={{
                      py: 1.5,
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, #AE328E 0%, #c13a9e 100%)',
                      boxShadow: '0 8px 20px rgba(174, 50, 142, 0.3)',
                      '&:hover': {
                        boxShadow: '0 12px 24px rgba(174, 50, 142, 0.4)',
                        transform: 'translateY(-2px)'
                      },
                      '&:disabled': {
                        background: '#ccc',
                        boxShadow: 'none'
                      }
                    }}
                  >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Verify Account'}
                  </Button>
                </motion.div>
              )}

              {step === 'verification' && (
                <motion.div
                  key="verification"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <Button
                    startIcon={<ArrowLeft />}
                    onClick={handleBack}
                    sx={{ mb: 2, color: '#AE328E' }}
                  >
                    Back
                  </Button>
                  
                  <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <CheckCircle 
                      size={48} 
                      style={{ 
                        color: '#4CAF50',
                        filter: 'drop-shadow(0 4px 8px rgba(76, 175, 80, 0.3))'
                      }} 
                    />
                    <Typography variant="h6" sx={{ mt: 2, fontWeight: 600 }}>
                      Account Verified!
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      We&apos;ll send an OTP to your registered email:
                    </Typography>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        mt: 1, 
                        fontWeight: 600,
                        color: '#AE328E',
                        background: 'rgba(174, 50, 142, 0.1)',
                        px: 2,
                        py: 1,
                        borderRadius: 1,
                        display: 'inline-block'
                      }}
                    >
                      {maskedEmail}
                    </Typography>
                  </Box>
                  
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={handleSendOTP}
                    disabled={loading}
                    sx={{
                      py: 1.5,
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, #AE328E 0%, #c13a9e 100%)',
                      boxShadow: '0 8px 20px rgba(174, 50, 142, 0.3)',
                      '&:hover': {
                        boxShadow: '0 12px 24px rgba(174, 50, 142, 0.4)',
                        transform: 'translateY(-2px)'
                      }
                    }}
                  >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Send OTP'}
                  </Button>
                </motion.div>
              )}

              {step === 'otp' && (
                <motion.div
                  key="otp"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <Button
                    startIcon={<ArrowLeft />}
                    onClick={handleBack}
                    sx={{ mb: 2, color: '#AE328E' }}
                  >
                    Back
                  </Button>
                  
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Enter the 6-digit OTP
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    We&apos;ve sent a verification code to {maskedEmail}
                  </Typography>
                  
                  <TextField
                    fullWidth
                    label="OTP Code"
                    value={otp}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 6)
                      setOtp(value)
                      setError('')
                    }}
                    placeholder="123456"
                    variant="outlined"
                    inputProps={{ 
                      maxLength: 6,
                      style: { 
                        fontSize: '1.5rem',
                        letterSpacing: '0.3em',
                        textAlign: 'center'
                      }
                    }}
                    sx={{
                      mb: 3,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        boxShadow: '0 4px 12px rgba(174, 50, 142, 0.1)',
                        '&:hover': {
                          boxShadow: '0 6px 16px rgba(174, 50, 142, 0.15)'
                        },
                        '&.Mui-focused': {
                          boxShadow: '0 8px 20px rgba(174, 50, 142, 0.2)'
                        }
                      }
                    }}
                  />
                  
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={handleOTPSubmit}
                    disabled={loading || otp.length !== 6}
                    sx={{
                      py: 1.5,
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, #AE328E 0%, #c13a9e 100%)',
                      boxShadow: '0 8px 20px rgba(174, 50, 142, 0.3)',
                      '&:hover': {
                        boxShadow: '0 12px 24px rgba(174, 50, 142, 0.4)',
                        transform: 'translateY(-2px)'
                      },
                      '&:disabled': {
                        background: '#ccc',
                        boxShadow: 'none'
                      }
                    }}
                  >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Verify & Continue'}
                  </Button>
                  
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ mt: 2, textAlign: 'center' }}
                  >
                    For demo purposes, any 6-digit code will work
                  </Typography>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}