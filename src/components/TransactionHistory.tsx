import { 
  ArrowUpRight, 
  ArrowDownLeft,
  Plus,
  Search
} from "lucide-react"
import Grid2 from "@mui/material/Grid2"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import { useState, useEffect } from "react"
import { dataService, Transaction } from "../services/dataService"
import { AddTransaction } from "./AddTransaction"

const getCategoryEmoji = (category: string): string => {
  const emojiMap: Record<string, string> = {
    food: '🍽️',
    transport: '🚗',
    entertainment: '🎬',
    utilities: '⚡',
    bills: '📱',
    shopping: '🛒',
    health: '⚕️',
    education: '📚',
    salary: '💰',
    business: '💼',
    investment: '📈',
    other: '💫'
  }
  return emojiMap[category] || '💳'
}

export function TransactionHistory() {
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddTransaction, setShowAddTransaction] = useState(false)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading delay for better UX
    setTimeout(() => {
      setTransactions(dataService.getTransactions())
      setLoading(false)
    }, 500)
  }, [])

  const filteredTransactions = transactions.filter(transaction => 
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.merchant.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalIncome = transactions
    .filter(t => t.type === 'credit')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpense = transactions
    .filter(t => t.type === 'debit')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0)

  const handleAddTransaction = () => {
    setShowAddTransaction(!showAddTransaction)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Typography variant="h6" color="#425563">Loading transactions...</Typography>
      </div>
    )
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <Card sx={{ 
        p: { xs: 2, md: 3 }, 
        borderRadius: 4, 
        background: 'linear-gradient(135deg, #AE328E 0%, #c13a9e 100%)',
        boxShadow: '0 12px 40px rgba(174, 50, 142, 0.3)',
        border: 'none',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <Box sx={{ 
          position: 'absolute', 
          top: -20, 
          right: -20, 
          fontSize: '120px', 
          opacity: 0.1,
          color: 'white',
          pointerEvents: 'none'
        }}>
          📊
        </Box>
        <CardContent sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Box>
              <Typography variant="h4" color="white" fontWeight={800} gutterBottom sx={{ 
                fontSize: { xs: '1.5rem', md: '2rem' },
                fontFamily: '"Inter", sans-serif'
              }}>
                Your Transactions 📊
              </Typography>
              <Typography color="white" sx={{ opacity: 0.9, fontWeight: 500, fontSize: { xs: '0.9rem', md: '1rem' } }}>
                Track every naira, win every goal!
              </Typography>
            </Box>
            <Button
              onClick={handleAddTransaction}
              sx={{
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                borderRadius: 2,
                fontWeight: 700,
                px: 2,
                py: 1,
                '&:hover': {
                  background: 'rgba(255,255,255,0.3)',
                }
              }}
              startIcon={<Plus size={18} />}
            >
              Add
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <Grid2 container spacing={{ xs: 2, md: 3 }}>
        <Grid2 size={{ xs: 6, md: 4 }}>
          <Card sx={{ 
            p: { xs: 2, md: 3 }, 
            borderRadius: 4,
            background: 'linear-gradient(135deg, #AE328E15 0%, #AE328E25 100%)',
            border: '1px solid #AE328E30',
            backdropFilter: 'blur(20px)',
          }}>
            <CardContent sx={{ p: 0, textAlign: 'center' }}>
              <Box sx={{ 
                width: 48, 
                height: 48, 
                borderRadius: 3, 
                background: '#AE328E15',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                mx: 'auto',
                mb: 2,
                border: '2px solid #AE328E30',
              }}>
                <ArrowUpRight size={24} color="#AE328E" strokeWidth={2.5} />
              </Box>
              <Typography variant="subtitle2" color="#425563" fontWeight={600} sx={{ mb: 1 }}>
                Income
              </Typography>
              <Typography variant="h5" fontWeight={800} sx={{ color: '#10b981' }}>
                ₦{totalIncome.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 size={{ xs: 6, md: 4 }}>
          <Card sx={{ 
            p: { xs: 2, md: 3 }, 
            borderRadius: 4,
            background: 'linear-gradient(135deg, #ef444415 0%, #ef444425 100%)',
            border: '1px solid #ef444430',
            backdropFilter: 'blur(20px)',
          }}>
            <CardContent sx={{ p: 0, textAlign: 'center' }}>
              <Box sx={{ 
                width: 48, 
                height: 48, 
                borderRadius: 3, 
                background: '#ef444415',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                mx: 'auto',
                mb: 2,
                border: '2px solid #ef444430',
              }}>
                <ArrowDownLeft size={24} color="#ef4444" strokeWidth={2.5} />
              </Box>
              <Typography variant="subtitle2" color="#425563" fontWeight={600} sx={{ mb: 1 }}>
                Expenses
              </Typography>
              <Typography variant="h5" fontWeight={800} sx={{ color: '#ef4444' }}>
                ₦{totalExpense.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <Card sx={{ 
            p: { xs: 2, md: 3 }, 
            borderRadius: 4,
            background: 'linear-gradient(135deg, #8b5cf615 0%, #8b5cf625 100%)',
            border: '1px solid #8b5cf630',
            backdropFilter: 'blur(20px)',
          }}>
            <CardContent sx={{ p: 0, textAlign: 'center' }}>
              <Box sx={{ 
                width: 48, 
                height: 48, 
                borderRadius: 3, 
                background: '#8b5cf615',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                mx: 'auto',
                mb: 2,
                border: '2px solid #8b5cf630',
              }}>
                <Typography sx={{ fontSize: '24px' }}>💰</Typography>
              </Box>
              <Typography variant="subtitle2" color="#425563" fontWeight={600} sx={{ mb: 1 }}>
                Balance
              </Typography>
              <Typography variant="h5" fontWeight={800} sx={{ color: '#8b5cf6' }}>
                ₦{(totalIncome - totalExpense).toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>

      {/* Search */}
      <Card sx={{ 
        p: { xs: 2, md: 3 },
        borderRadius: 4,
        background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(254,249,252,0.95) 100%)',
        border: '1px solid rgba(174, 50, 142, 0.1)',
        backdropFilter: 'blur(20px)',
      }}>
        <CardContent sx={{ p: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Search size={20} color="#6b7280" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 0',
                border: 'none',
                outline: 'none',
                background: 'transparent',
                fontSize: '16px',
                color: '#425563'
              }}
            />
          </Box>
        </CardContent>
      </Card>

      {/* Add Transaction Component */}
      {showAddTransaction && <AddTransaction />}

      {/* Transactions List */}
      <Box>
        <Typography variant="h6" fontWeight={700} sx={{ mb: 3, color: '#425563' }}>
          Recent Transactions ({filteredTransactions.length})
        </Typography>
        <Box sx={{ space: 2 }}>
          {filteredTransactions.map((transaction) => (
            <Card key={transaction.id} sx={{ 
              p: { xs: 2, md: 3 },
              mb: 2,
              borderRadius: 4,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(254,249,252,0.95) 100%)',
              border: '1px solid rgba(174, 50, 142, 0.1)',
              backdropFilter: 'blur(20px)',
              transition: 'all 0.2s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 32px rgba(174, 50, 142, 0.15)',
              }
            }}>
              <CardContent sx={{ p: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ 
                      width: 48, 
                      height: 48, 
                      borderRadius: 3, 
                      background: transaction.type === 'credit' ? '#10b98115' : '#ef444415',
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      border: transaction.type === 'credit' ? '1px solid #10b98130' : '1px solid #ef444430',
                    }}>
                      <Typography sx={{ fontSize: '20px' }}>{getCategoryEmoji(transaction.category)}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" fontWeight={600} sx={{ color: '#425563' }}>
                        {transaction.description}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#6b7280' }}>
                        {transaction.merchant} • {new Date(transaction.date).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="h6" fontWeight={700} sx={{ 
                      color: transaction.type === 'credit' ? '#10b981' : '#ef4444'
                    }}>
                      {transaction.type === 'credit' ? '+' : '-'}₦{Math.abs(transaction.amount).toLocaleString()}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#6b7280' }}>
                      {transaction.paymentMethod}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </div>
  )
}