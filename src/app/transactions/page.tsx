'use client';

import React from 'react';
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import { 
  Search, 
  ArrowRight, 
  History, 
  ShoppingCart, 
  Car, 
  Smartphone, 
  Fuel, 
  Zap,
  TrendingUp,
  Calendar,
  Filter,
  BarChart3,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownLeft
} from "lucide-react";

interface TransactionItem {
  id: number;
  type: 'income' | 'expense';
  title: string;
  category: string;
  amount: number;
  merchant: string;
  date: string;
  time: string;
  status: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  autoSave?: boolean;
  note?: string;
}

export default function TransactionsPage(): React.JSX.Element {
  const theme = useTheme();

  const transactions: TransactionItem[] = [
    {
      id: 1,
      type: 'income',
      title: 'ALAT Transfer - Salary',
      category: 'Salary',
      amount: 450000.00,
      merchant: 'Acme Corp Ltd',
      date: 'Dec 8',
      time: '09:15 AM',
      status: 'completed',
      icon: <TrendingUp size={20} />,
      color: theme.palette.success.main,
      bgColor: theme.palette.success.light + '33',
      note: 'Monthly salary received on schedule'
    },
    {
      id: 2,
      type: 'expense',
      title: 'Shoprite - Groceries',
      category: 'Groceries',
      amount: 28500.00,
      merchant: 'Shoprite',
      date: 'Dec 7',
      time: '06:30 PM',
      status: 'completed',
      icon: <ShoppingCart size={20} />,
      color: theme.palette.info.main,
      bgColor: theme.palette.info.light + '33',
      autoSave: true,
      note: '15% above average grocery spending'
    },
    {
      id: 3,
      type: 'expense',
      title: 'Uber Ride',
      category: 'Transportation',
      amount: 3200.00,
      merchant: 'Uber Nigeria',
      date: 'Dec 7',
      time: '08:15 AM',
      status: 'completed',
      icon: <Car size={20} />,
      color: theme.palette.warning.main,
      bgColor: theme.palette.warning.light + '33',
      autoSave: true
    },
    {
      id: 4,
      type: 'expense',
      title: 'Netflix Subscription',
      category: 'Entertainment',
      amount: 4400.00,
      merchant: 'Netflix',
      date: 'Dec 6',
      time: '12:00 PM',
      status: 'completed',
      icon: <Smartphone size={20} />,
      color: theme.palette.error.main,
      bgColor: theme.palette.error.light + '33'
    },
    {
      id: 5,
      type: 'expense',
      title: 'Fuel - Total Station',
      category: 'Transportation',
      amount: 12000.00,
      merchant: 'Total Energies',
      date: 'Dec 5',
      time: '07:45 AM',
      status: 'completed',
      icon: <Fuel size={20} />,
      color: theme.palette.secondary.main,
      bgColor: theme.palette.secondary.light + '33',
      autoSave: true,
      note: 'Efficient fuel spending this week'
    },
    {
      id: 6,
      type: 'expense',
      title: 'MTN Nigeria',
      category: 'Utilities',
      amount: 5000.00,
      merchant: 'MTN Nigeria',
      date: 'Dec 2',
      time: '06:00 PM',
      status: 'completed',
      icon: <Smartphone size={20} />,
      color: theme.palette.primary.main,
      bgColor: theme.palette.primary.light + '33'
    },
    {
      id: 7,
      type: 'expense',
      title: 'Konga - Online Shopping',
      category: 'Shopping',
      amount: 24000.00,
      merchant: 'Konga',
      date: 'Dec 1',
      time: '03:20 PM',
      status: 'completed',
      icon: <ShoppingCart size={20} />,
      color: theme.palette.info.main,
      bgColor: theme.palette.info.light + '33',
      note: 'New category: Consider setting spending limit'
    }
  ];

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2
    }).format(amount).replace('NGN', '₦');
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      {/* Header Card */}
      <Card sx={{ mb: 3, p: 3, borderRadius: 3, background: theme.custom?.gradients.primary }}>
        <CardContent>
          <Typography variant="h5" color={theme.palette.common.white} fontWeight="bold" gutterBottom>
            Transaction History
          </Typography>
          <Typography color={theme.palette.common.white} sx={{ opacity: 0.9 }}>
            Complete overview of your financial activity
          </Typography>
        </CardContent>
      </Card>

      {/* Search and Filter Section */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12}>
          <Card sx={{ p: 2 }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                <History size={18} color={theme.palette.primary.main} />
                <Typography variant="subtitle1" fontWeight={700}>Transaction History</Typography>
              </Stack>
              <Typography variant="body2" color="primary.main" sx={{ mb: 3 }}>
                Track all your financial activities with smart categorization
              </Typography>

              {/* Search Bar */}
              <TextField
                fullWidth
                placeholder="Search transactions..."
                variant="outlined"
                sx={{ mb: 2 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search size={20} color={theme.palette.text.secondary} />
                    </InputAdornment>
                  ),
                }}
              />

              {/* Filter Controls */}
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center">
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel>All Types</InputLabel>
                  <Select
                    defaultValue=""
                    label="All Types"
                  >
                    <MenuItem value="">All Types</MenuItem>
                    <MenuItem value="income">Income</MenuItem>
                    <MenuItem value="expense">Expense</MenuItem>
                  </Select>
                </FormControl>

                <FormControl size="small" sx={{ minWidth: 140 }}>
                  <InputLabel>All Categories</InputLabel>
                  <Select
                    defaultValue=""
                    label="All Categories"
                  >
                    <MenuItem value="">All Categories</MenuItem>
                    <MenuItem value="groceries">Groceries</MenuItem>
                    <MenuItem value="transportation">Transportation</MenuItem>
                    <MenuItem value="entertainment">Entertainment</MenuItem>
                    <MenuItem value="utilities">Utilities</MenuItem>
                  </Select>
                </FormControl>

                <IconButton>
                  <Filter size={20} />
                </IconButton>

                <IconButton>
                  <Calendar size={20} />
                </IconButton>

                <IconButton>
                  <BarChart3 size={20} />
                </IconButton>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Transactions List */}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card sx={{ p: 2 }}>
            <CardContent>
              <Stack spacing={2}>
                {transactions.map((transaction: TransactionItem, index: number) => (
                  <Box key={transaction.id}>
                    <Card variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={8}>
                          <Stack direction="row" spacing={2}>
                            {/* Icon */}
                            <Box sx={{ 
                              width: 40, 
                              height: 40, 
                              borderRadius: '50%', 
                              bgcolor: transaction.bgColor, 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'center',
                              color: transaction.color
                            }}>
                              {transaction.icon}
                            </Box>

                            <Box sx={{ flex: 1 }}>
                              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
                                <Typography fontWeight={700}>{transaction.title}</Typography>
                                <Chip 
                                  label="completed" 
                                  size="small" 
                                  color="success"
                                  variant="outlined"
                                />
                                {transaction.autoSave && (
                                  <Chip 
                                    label="Auto-Save" 
                                    size="small" 
                                    sx={{ 
                                      bgcolor: theme.palette.secondary.light + '22',
                                      color: theme.palette.secondary.main
                                    }} 
                                  />
                                )}
                              </Stack>
                              
                              <Stack direction="row" spacing={2} sx={{ mb: 1 }}>
                                <Typography variant="caption" color="text.secondary">
                                  {transaction.date} • {transaction.time}
                                </Typography>
                              </Stack>

                              {transaction.note && (
                                <Box sx={{ 
                                  p: 1, 
                                  bgcolor: theme.palette.info.light + '15', 
                                  borderRadius: 1,
                                  mb: 1
                                }}>
                                  <Typography variant="caption" color="primary.main">
                                    💡 {transaction.note}
                                  </Typography>
                                </Box>
                              )}

                              <Stack direction="row" spacing={2} alignItems="center">
                                <Typography 
                                  variant="h6" 
                                  fontWeight={700}
                                  color={transaction.type === 'income' ? 'success.main' : 'error.main'}
                                  sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                                >
                                  {transaction.type === 'income' ? (
                                    <ArrowDownLeft size={16} />
                                  ) : (
                                    <ArrowUpRight size={16} />
                                  )}
                                  {transaction.type === 'income' ? '+' : ''}{formatCurrency(transaction.amount)}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {transaction.merchant}
                                </Typography>
                              </Stack>
                            </Box>
                          </Stack>
                        </Grid>
                        
                        <Grid item xs={12} md={4} sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: { xs: 'flex-start', md: 'flex-end' } 
                        }}>
                          <IconButton>
                            <MoreHorizontal size={20} />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Card>
                    {index < transactions.length - 1 && <Divider sx={{ my: 1 }} />}
                  </Box>
                ))}
              </Stack>

              <Divider sx={{ my: 3 }} />
              
              <Button 
                component={Link} 
                href="/" 
                variant="outlined" 
                endIcon={<ArrowRight size={16} />}
              >
                Back to Home
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}