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
import { useState } from "react"

interface Transaction {
  id: string
  description: string
  amount: number
  type: 'income' | 'expense'
  category: string
  date: string
  emoji: string
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    description: "Salary Payment",
    amount: 120000,
    type: 'income',
    category: 'Salary',
    date: '2024-01-15',
    emoji: '💰'
  },
  {
    id: "2", 
    description: "Uber Ride",
    amount: -2500,
    type: 'expense',
    category: 'Transport',
    date: '2024-01-14',
    emoji: '🚗'
  },
  {
    id: "3",
    description: "Grocery Shopping",
    amount: -8500,
    type: 'expense', 
    category: 'Food',
    date: '2024-01-14',
    emoji: '🛒'
  },
  {
    id: "4",
    description: "Netflix Subscription",
    amount: -2900,
    type: 'expense',
    category: 'Entertainment',
    date: '2024-01-13',
    emoji: '🎬'
  },
  {
    id: "5",
    description: "Freelance Work",
    amount: 25000,
    type: 'income',
    category: 'Freelance',
    date: '2024-01-12',
    emoji: '💻'
  }
]

export function TransactionHistory() {
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddTransaction, setShowAddTransaction] = useState(false)

  const filteredTransactions = mockTransactions.filter(transaction => 
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalIncome = mockTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpense = mockTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0)

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <Card sx={{ 
        p: { xs: 2, md: 3 }, 
        borderRadius: 4, 
        background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
        boxShadow: '0 12px 40px rgba(245, 158, 11, 0.3)',
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
              onClick={() => setShowAddTransaction(!showAddTransaction)}
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
            background: 'linear-gradient(135deg, #10b98115 0%, #10b98125 100%)',
            border: '1px solid #10b98130',
            backdropFilter: 'blur(20px)',
          }}>
            <CardContent sx={{ p: 0, textAlign: 'center' }}>
              <Box sx={{ 
                width: 48, 
                height: 48, 
                borderRadius: 3, 
                background: '#10b98115',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                mx: 'auto',
                mb: 2,
                border: '2px solid #10b98130',
              }}>
                <ArrowUpRight size={24} color="#10b981" strokeWidth={2.5} />
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
                      background: transaction.type === 'income' ? '#10b98115' : '#ef444415',
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      border: transaction.type === 'income' ? '1px solid #10b98130' : '1px solid #ef444430',
                    }}>
                      <Typography sx={{ fontSize: '20px' }}>{transaction.emoji}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" fontWeight={600} sx={{ color: '#425563' }}>
                        {transaction.description}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#6b7280' }}>
                        {transaction.category} • {new Date(transaction.date).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="h6" fontWeight={700} sx={{ 
                    color: transaction.type === 'income' ? '#10b981' : '#ef4444'
                  }}>
                    {transaction.type === 'income' ? '+' : ''}₦{Math.abs(transaction.amount).toLocaleString()}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      {/* Add Transaction Demo */}
      {showAddTransaction && (
        <Card sx={{ 
          p: { xs: 2, md: 3 },
          borderRadius: 4,
          background: 'linear-gradient(135deg, #06b6d415 0%, #06b6d425 100%)',
          border: '1px solid #06b6d430',
        }}>
          <CardContent>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 2, color: '#06b6d4' }}>
              Quick Add Transaction 💫
            </Typography>
            <Typography variant="body2" sx={{ color: '#425563', mb: 2 }}>
              This is a demo! In a real app, you'd have a form here to add new transactions.
            </Typography>
            <Button
              onClick={() => setShowAddTransaction(false)}
              sx={{
                background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
                color: 'white',
                borderRadius: 2,
                fontWeight: 700,
              }}
            >
              Close Demo
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}