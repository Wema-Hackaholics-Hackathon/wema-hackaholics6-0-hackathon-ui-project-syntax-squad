import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import { Users, Plus, Split, Trophy, Target, Share, Clock, CheckCircle, AlertCircle } from "lucide-react";


interface BillSplit {
  id: string
  title: string
  total: number
  participants: number
  yourShare: number
  status: 'pending' | 'partial' | 'completed'
  createdBy: string
  dueDate: string
}

interface GroupChallenge {
  id: string
  name: string
  description: string
  participants: number
  target: number
  current: number
  endDate: string
  yourContribution: number
  reward: string
}

interface SharedExpense {
  id: string
  description: string
  amount: number
  paidBy: string
  participants: string[]
  category: string
  date: string
  settled: boolean
}

const billSplits: BillSplit[] = [
  {
    id: "1",
    title: "Team Lunch at Ocean Basket",
    total: 45000,
    participants: 4,
    yourShare: 11250,
    status: "pending",
    createdBy: "Sarah Chen",
    dueDate: "Dec 10, 2024"
  },
  {
    id: "2",
    title: "Office WiFi - December",
    total: 25000,
    participants: 8,
    yourShare: 3125,
    status: "partial",
    createdBy: "Mike Wilson",
    dueDate: "Dec 15, 2024"
  },
  {
    id: "3",
    title: "Uber to Conference",
    total: 8500,
    participants: 3,
    yourShare: 2833,
    status: "completed",
    createdBy: "You",
    dueDate: "Dec 5, 2024"
  }
]

const groupChallenges: GroupChallenge[] = [
  {
    id: "1",
    name: "Team Holiday Fund",
    description: "Save together for end-of-year team trip",
    participants: 12,
    target: 500000,
    current: 320000,
    endDate: "Dec 20, 2024",
    yourContribution: 25000,
    reward: "3-day team retreat"
  },
  {
    id: "2",
    name: "Office Equipment Fund",
    description: "Upgrade our shared workspace",
    participants: 8,
    target: 150000,
    current: 89000,
    endDate: "Jan 31, 2025",
    yourContribution: 12000,
    reward: "New coffee machine & furniture"
  }
]

const sharedExpenses: SharedExpense[] = [
  {
    id: "1",
    description: "Project celebration dinner",
    amount: 28000,
    paidBy: "Alex Johnson",
    participants: ["You", "Sarah C.", "Mike W.", "Emma D."],
    category: "Food & Dining",
    date: "Dec 6, 2024",
    settled: false
  },
  {
    id: "2",
    description: "Shared taxi to airport",
    amount: 12000,
    paidBy: "You",
    participants: ["You", "John D.", "Lisa M."],
    category: "Transportation",
    date: "Dec 4, 2024",
    settled: true
  }
]

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN'
  }).format(amount)
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800'
    case 'partial':
      return 'bg-yellow-100 text-yellow-800'
    case 'pending':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return <CheckCircle className="h-4 w-4" />
    case 'partial':
      return <Clock className="h-4 w-4" />
    case 'pending':
      return <AlertCircle className="h-4 w-4" />
    default:
      return null
  }
}

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";

// ...keep all the data and helper functions as before...

export function SocialPayments() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Bill Splitting */}
      <Card>
        <CardHeader
          title={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Split size={22} />
              <Typography variant="h6">Bill Splitting</Typography>
            </Box>
          }
          subheader={<Typography variant="body2" color="text.secondary">Split expenses with friends and colleagues</Typography>}
          action={
            <Button variant="outlined" size="small" startIcon={<Plus size={16} />}>Split Bill</Button>
          }
        />
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {billSplits.map((split) => (
              <Box key={split.id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, borderRadius: 2, border: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ p: 1, bgcolor: 'blue.100', borderRadius: 1 }}>
                    <Split size={18} color="#1976d2" />
                  </Box>
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <Typography variant="subtitle2" fontWeight={500}>{split.title}</Typography>
                      <Chip
                        label={split.status.charAt(0).toUpperCase() + split.status.slice(1)}
                        size="small"
                        color={split.status === 'completed' ? 'success' : split.status === 'partial' ? 'warning' : 'error'}
                        icon={split.status === 'completed' ? <CheckCircle size={14} /> : split.status === 'partial' ? <Clock size={14} /> : <AlertCircle size={14} />}
                        sx={{ ml: 1 }}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {formatCurrency(split.total)} • {split.participants} people • Created by {split.createdBy} • Due {split.dueDate}
                    </Typography>
                    <Typography variant="body2" color="primary" fontWeight={600} sx={{ mt: 0.5 }}>
                      Your share: {formatCurrency(split.yourShare)}
                    </Typography>
                  </Box>
                </Box>
                {split.status !== 'completed' && (
                  <Button variant="outlined" size="small">
                    {split.status === 'pending' ? 'Pay Share' : 'View Details'}
                  </Button>
                )}
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Group Savings Challenges */}
      <Card>
        <CardHeader
          title={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Trophy size={22} />
              <Typography variant="h6">Group Savings Challenges</Typography>
            </Box>
          }
          subheader={<Typography variant="body2" color="text.secondary">Save together and achieve common goals</Typography>}
          action={
            <Button variant="outlined" size="small" startIcon={<Plus size={16} />}>Create Challenge</Button>
          }
        />
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {groupChallenges.map((challenge) => (
              <Box key={challenge.id} sx={{ p: 2, borderRadius: 2, border: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ p: 1, bgcolor: 'purple.100', borderRadius: 1 }}>
                      <Target size={18} color="#9c27b0" />
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" fontWeight={500}>{challenge.name}</Typography>
                      <Typography variant="body2" color="text.secondary">{challenge.description}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography fontWeight={600}>{formatCurrency(challenge.current)}</Typography>
                    <Typography variant="body2" color="text.secondary">of {formatCurrency(challenge.target)}</Typography>
                  </Box>
                </Box>
                <Box sx={{ mb: 1 }}>
                  <LinearProgress variant="determinate" value={(challenge.current / challenge.target) * 100} sx={{ height: 8, borderRadius: 4 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'text.secondary', mt: 0.5 }}>
                    <span>{challenge.participants} participants • {Math.round((challenge.current / challenge.target) * 100)}% complete</span>
                    <span>Ends {challenge.endDate}</span>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="body2">
                    <span style={{ color: '#757575' }}>Your contribution: </span>
                    <span style={{ color: '#2e7d32', fontWeight: 600 }}>{formatCurrency(challenge.yourContribution)}</span>
                  </Typography>
                  <Button variant="outlined" size="small">Contribute</Button>
                </Box>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Shared Expenses */}
      <Card>
        <CardHeader
          title={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Share size={22} />
              <Typography variant="h6">Recent Shared Expenses</Typography>
            </Box>
          }
          subheader={<Typography variant="body2" color="text.secondary">Track expenses paid by you or others</Typography>}
        />
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {sharedExpenses.map((expense) => (
              <Box key={expense.id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, borderRadius: 2, border: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.light', color: 'primary.main', fontWeight: 'bold' }}>
                    {expense.paidBy === 'You' ? 'Y' : expense.paidBy.substring(0, 2)}
                  </Avatar>
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <Typography variant="subtitle2" fontWeight={500}>{expense.description}</Typography>
                      <Chip
                        label={expense.settled ? 'Settled' : 'Pending'}
                        size="small"
                        color={expense.settled ? 'success' : 'warning'}
                        icon={expense.settled ? <CheckCircle size={14} /> : <Clock size={14} />}
                        sx={{ ml: 1 }}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      Paid by {expense.paidBy} • {expense.participants.length} people • {expense.date}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography fontWeight={600}>{formatCurrency(expense.amount)}</Typography>
                  {!expense.settled && (
                    <Button variant="text" size="small">Settle Up</Button>
                  )}
                </Box>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Social Stats */}
      <Card>
        <CardHeader
          title={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Users size={22} />
              <Typography variant="h6">Social Activity</Typography>
            </Box>
          }
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Box sx={{ textAlign: 'center', p: 2, borderRadius: 2, bgcolor: 'blue.50', border: 1, borderColor: 'blue.200' }}>
                <Typography variant="h4" color="primary.main">15</Typography>
                <Typography variant="body2" color="text.secondary">Bills Split</Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ textAlign: 'center', p: 2, borderRadius: 2, bgcolor: 'purple.50', border: 1, borderColor: 'purple.200' }}>
                <Typography variant="h4" sx={{ color: '#9c27b0' }}>₦37K</Typography>
                <Typography variant="body2" color="text.secondary">Group Savings</Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ textAlign: 'center', p: 2, borderRadius: 2, bgcolor: 'green.50', border: 1, borderColor: 'green.200' }}>
                <Typography variant="h4" sx={{ color: '#2e7d32' }}>8</Typography>
                <Typography variant="body2" color="text.secondary">Active Friends</Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
