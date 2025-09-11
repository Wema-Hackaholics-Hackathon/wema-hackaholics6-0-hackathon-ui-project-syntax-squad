import { ArrowRight, TrendingUp, Wallet, Trophy } from "lucide-react";
import Grid2 from "@mui/material/Grid2";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { LinearProgress } from "@mui/material";
import { useState, useEffect } from "react";
import { dataService, User } from "../services/dataService";

interface DashboardOverviewProps {
  onNavigate: (view: string) => void;
}

type ChangeType = "positive" | "negative";

interface QuickStatItem {
  title: string;
  value: string;
  change: string;
  changeType: ChangeType;
  icon: typeof Wallet;
  color: string;
}

export function DashboardOverview({ onNavigate }: DashboardOverviewProps) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [userData, setUserData] = useState<User | null>(null);
  const [totalBalance, setTotalBalance] = useState(0);
  const [weeklySpending, setWeeklySpending] = useState(0);

  useEffect(() => {
    // Load user data and financial stats
    const user = dataService.getUser();
    const balance = dataService.getTotalBalance();
    const transactions = dataService.getTransactions();
    
    // Calculate this week's spending (last 7 days)
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const weeklyTransactions = transactions.filter(t => 
      t.type === 'debit' && new Date(t.date) >= oneWeekAgo
    );
    const weeklyTotal = weeklyTransactions.reduce((sum, t) => sum + Math.abs(t.amount), 0);
    
    setUserData(user);
    setTotalBalance(balance);
    setWeeklySpending(weeklyTotal);
  }, []);

  const quickStats: QuickStatItem[] = [
    {
      title: "Your Balance 💰",
      value: `₦${totalBalance.toLocaleString()}`,
      change: "+15.2%",
      changeType: "positive",
      icon: Wallet,
      color: "#AE328E",
    },
    {
      title: "This Week 🔥",
      value: `₦${weeklySpending.toLocaleString()}`,
      change: "+8.1%",
      changeType: "positive",
      icon: TrendingUp,
      color: "#425563",
    },
  ];

  const gamifiedActions = [
    {
      title: "Level Up Your Savings! 🚀",
      description: "Save ₦5,000 more to unlock Premium features",
      progress: 75,
      action: "Boost Stash",
      view: "dashboard",
      emoji: "🎯",
      color: "#AE328E",
      actionType: "savings"
    },
    {
      title: "Weekly Challenge 💪",
      description: `Spend less than ₦15,000 this week (Current: ₦${weeklySpending.toLocaleString()})`,
      progress: Math.max(0, 100 - (weeklySpending / 15000) * 100),
      action: "View Progress",
      view: "intelligence",
      emoji: "⚡",
      color: "#AE328E",
      actionType: "challenge"
    },
    {
      title: "Squad Goals 👥",
      description: "Split 3 bills with friends this month",
      progress: 33,
      action: "Find Friends",
      view: "social",
      emoji: "🤝",
      color: "#425563",
      actionType: "social"
    },
  ];

  const handleActionClick = (actionType: string, view: string) => {
    switch (actionType) {
      case 'savings':
        // Simulate adding to savings
        const savingsGoals = dataService.getSavingsGoals();
        if (savingsGoals.length > 0) {
          dataService.updateSavingsGoal(savingsGoals[0].id, 1000);
          setShowSuccess(true);
          setTimeout(() => setShowSuccess(false), 3000);
        }
        break;
      case 'challenge':
      case 'social':
        onNavigate(view);
        break;
      default:
        onNavigate(view);
    }
  };

  const toggleBalance = () => {
    setBalanceVisible(!balanceVisible);
  };

  if (!userData) {
    return (
      <div className="flex items-center justify-center h-64">
        <Typography variant="h6" color="text.secondary">Loading dashboard...</Typography>
      </div>
    );
  }
  return (
    <div>
      {/* Welcome Section with Level */}
      <Card className="p-6 rounded-2xl bg-gradient-to-br from-primary to-purple-600 shadow-xl border-none relative overflow-hidden"
        sx={{ 
          boxShadow: '0 12px 40px rgba(174, 50, 142, 0.3)',
        }}>
        <Box sx={{ 
          position: 'absolute', 
          top: -20, 
          right: -20, 
          fontSize: '120px', 
          opacity: 0.1,
          color: 'var(--foreground)',
          pointerEvents: 'none'
        }}>
          🚀
        </Box>
        <CardContent sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Box sx={{ 
              background: 'var(--muted)', 
              borderRadius: 2, 
              p: 1, 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1 
            }}>
              <Trophy size={20} color="white" />
              <Typography color="white" sx={{ fontWeight: 700, fontSize: '0.9rem' }}>
                Level 3 Saver
              </Typography>
            </Box>
            <Box sx={{ 
              background: 'var(--muted)', 
              borderRadius: 2, 
              px: 1.5, 
              py: 0.5 
            }}>
              <Typography color="white" sx={{ fontWeight: 600, fontSize: '0.8rem' }}>
                850 XP ⭐
              </Typography>
            </Box>
          </Box>
          <Typography variant="h4" color="white" fontWeight={800} gutterBottom sx={{ 
            fontSize: { xs: '1.5rem', md: '2rem' },
            fontFamily: '"Inter", sans-serif'
          }}>
            Hey there, Money Master! 👋
          </Typography>
          <Typography color="white" sx={{ opacity: 0.9, fontWeight: 500, fontSize: { xs: '0.9rem', md: '1rem' } }}>
            You&apos;re crushing your financial goals! Keep it up 💪
          </Typography>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Box sx={{ mt: { xs: 4, md: 6 } }}>
        <Grid2 container spacing={{ xs: 2, md: 3 }}>
        {quickStats.map((stat, index) => (
          <Grid2 size={{ xs: 6, md: 6 }} key={index}>
            <Card 
              onClick={toggleBalance}
              sx={{ 
                p: { xs: 2, md: 3 }, 
                borderRadius: 4,
                background: 'var(--card)',
                border: '1px solid rgba(174, 50, 142, 0.1)',
                backdropFilter: 'blur(20px)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-4px) scale(1.02)',
                  boxShadow: '0 16px 48px rgba(174, 50, 142, 0.2)',
                }
              }}>
              <Box sx={{ textAlign: 'center' }}>
                <Box sx={{ 
                  width: 48, 
                  height: 48, 
                  borderRadius: 3, 
                  background: `linear-gradient(135deg, ${stat.color}15 0%, ${stat.color}25 100%)`,
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2,
                  border: `2px solid ${stat.color}30`,
                }}>
                  <stat.icon size={24} color={stat.color} strokeWidth={2.5} />
                </Box>
                <Typography variant="subtitle2" color="var(--foreground)" fontWeight={600} sx={{ mb: 1, fontSize: { xs: '0.8rem', md: '0.9rem' } }}>
                  {stat.title}
                </Typography>
                <Typography variant="h5" fontWeight={800} sx={{ color: 'var(--primary)', mb: 1, fontSize: { xs: '1.3rem', md: '1.5rem' } }}>
                  {balanceVisible ? stat.value : '••••••'}
                </Typography>
                <Typography variant="caption" className="text-sm font-medium px-2 py-1 rounded-lg" sx={{ 
                  color: stat.changeType === 'positive' ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))',
                  backgroundColor: stat.changeType === 'positive' ? 'hsl(var(--primary)/.1)' : 'hsl(var(--muted)/.3)',
                  fontSize: { xs: '0.8rem', md: '0.9rem' },
                }}>
                  {balanceVisible ? stat.change : '•••'}
                </Typography>
              </Box>
            </Card>
          </Grid2>
        ))}
      </Grid2>
      </Box>

      {/* Gamified Actions */}
      <Box sx={{ mt: { xs: 4, md: 6 } }}>
        <Typography variant="h6" fontWeight={700} className="text-foreground" sx={{ mb: 3, fontSize: { xs: '1.1rem', md: '1.25rem' } }}>
          Your Missions 🎮
        </Typography>
        <Grid2 container spacing={{ xs: 2, md: 3 }}>
          {gamifiedActions.map((action, index) => (
            <Grid2 size={{ xs: 12, md: 6, xl: 4 }} key={index}>
              <Card className="p-6 rounded-2xl border border-border bg-card/80 backdrop-blur-lg hover:scale-[1.02] transition-all duration-300 relative overflow-hidden shadow-lg hover:shadow-xl"
                sx={{ 
                  border: `1px solid ${action.color}20`,
                  '&:hover': {
                    boxShadow: `0 16px 48px ${action.color}20`,
                  }
                }}>
                <Box sx={{ 
                  position: 'absolute', 
                  top: -10, 
                  right: -10, 
                  fontSize: { xs: '40px', md: '50px' }, 
                  opacity: 0.1 
                }}>
                  {action.emoji}
                </Box>
                <CardContent sx={{ position: 'relative', zIndex: 1, p: 0 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ 
                      width: 36, 
                      height: 36, 
                      borderRadius: 2, 
                      background: 'var(--muted)',
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      mr: 2,
                      border: `1px solid ${action.color}30`,
                    }}>
                      <Typography sx={{ fontSize: '18px' }}>{action.emoji}</Typography>
                    </Box>
                    <Typography variant="subtitle1" fontWeight={700} sx={{ 
                      color: 'var(--primary)', 
                      fontSize: { xs: '0.9rem', md: '1rem' } 
                    }}>
                      {action.title}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ 
                    color: 'var(--foreground)', 
                    fontWeight: 500, 
                    mb: 2,
                    fontSize: { xs: '0.8rem', md: '0.875rem' }
                  }}>
                    {action.description}
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <LinearProgress 
                      variant="determinate" 
                      value={action.progress} 
                      sx={{ 
                        height: 8, 
                        borderRadius: 4,
                        backgroundColor: `${action.color}15`,
                        '& .MuiLinearProgress-bar': {
                          background: 'var(--primary)',
                          borderRadius: 4,
                        }
                      }} 
                    />
                    <Typography variant="caption" sx={{ 
                      color: 'var(--primary)', 
                      fontWeight: 600, 
                      mt: 0.5, 
                      display: 'block' 
                    }}>
                      {action.progress}% Complete 🎯
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => handleActionClick(action.actionType, action.view)}
                    endIcon={<ArrowRight size={16} />}
                    sx={{
                      background: showSuccess && action.actionType === 'savings' 
                        ? 'linear-gradient(135deg, #AE328E 0%, #c13a9e 100%)'
                        : `linear-gradient(135deg, ${action.color} 0%, ${action.color}dd 100%)`,
                      color: 'var(--foreground)',
                      borderRadius: 3,
                      fontWeight: 700,
                      py: 1.2,
                      boxShadow: `0 8px 24px ${action.color}30`,
                      '&:hover': {
                        background: `linear-gradient(135deg, ${action.color}dd 0%, ${action.color}bb 100%)`,
                        boxShadow: `0 12px 32px ${action.color}40`,
                        transform: 'translateY(-2px)',
                      }
                    }}
                  >
                    {showSuccess && action.actionType === 'savings' ? '✅ Boosted!' : action.action}
                  </Button>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      </Box>

      {/* Quick Access */}
      <Box>
        <Typography variant="h6" fontWeight={700} sx={{ mb: 3, color: 'var(--foreground)', fontSize: { xs: '1.1rem', md: '1.25rem' } }}>
          Quick Access 🚀
        </Typography>
        <Grid2 container spacing={{ xs: 2, md: 3 }}>
          <Grid2 size={{ xs: 6, md: 4 }}>
            <Card
              sx={{ 
                p: { xs: 2, md: 3 }, 
                cursor: 'pointer', 
                borderRadius: 4,
                background: 'var(--muted)',
                border: '1px solid #AE328E30',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px) scale(1.02)',
                  boxShadow: '0 16px 48px #AE328E20',
                }
              }}
              onClick={() => onNavigate('dashboard')}
            >
              <Box sx={{ textAlign: 'center' }}>
                <Box sx={{ fontSize: { xs: '32px', md: '40px' }, mb: 1 }}>💰</Box>
                <Typography variant="subtitle2" fontWeight={700} sx={{ 
                  color: 'var(--primary)', 
                  fontSize: { xs: '0.8rem', md: '0.9rem' } 
                }}>
                  My Stash
                </Typography>
              </Box>
            </Card>
          </Grid2>
          <Grid2 size={{ xs: 6, md: 4 }}>
            <Card
              sx={{ 
                p: { xs: 2, md: 3 }, 
                cursor: 'pointer', 
                borderRadius: 4,
                background: 'var(--muted)',
                border: '1px solid #42556330',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px) scale(1.02)',
                  boxShadow: '0 16px 48px #42556320',
                }
              }}
              onClick={() => onNavigate('intelligence')}
            >
              <Box sx={{ textAlign: 'center' }}>
                <Box sx={{ fontSize: { xs: '32px', md: '40px' }, mb: 1 }}>⚡</Box>
                <Typography variant="subtitle2" fontWeight={700} sx={{ 
                  color: 'var(--foreground)', 
                  fontSize: { xs: '0.8rem', md: '0.9rem' } 
                }}>
                  Sparks
                </Typography>
              </Box>
            </Card>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 4 }}>
            <Card
              sx={{ 
                p: { xs: 2, md: 3 }, 
                cursor: 'pointer', 
                borderRadius: 4,
                background: 'var(--muted)',
                border: '1px solid #AE328E30',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px) scale(1.02)',
                  boxShadow: '0 16px 48px #AE328E20',
                }
              }}
              onClick={() => onNavigate('social')}
            >
              <Box sx={{ textAlign: 'center' }}>
                <Box sx={{ fontSize: { xs: '32px', md: '40px' }, mb: 1 }}>🤝</Box>
                <Typography variant="subtitle2" fontWeight={700} sx={{ 
                  color: 'var(--primary)', 
                  fontSize: { xs: '0.8rem', md: '0.9rem' } 
                }}>
                  Connect
                </Typography>
              </Box>
            </Card>
          </Grid2>
        </Grid2>
      </Box>
    </div>
  );
}