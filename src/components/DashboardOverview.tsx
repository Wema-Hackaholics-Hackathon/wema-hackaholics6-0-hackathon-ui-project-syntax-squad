import { ArrowRight, TrendingUp, Wallet, Trophy, Target } from "lucide-react";
import Grid2 from "@mui/material/Grid2";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { LinearProgress } from "@mui/material";

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

const quickStats: QuickStatItem[] = [
  {
    title: "Your Stash 💰",
    value: "₦47,500",
    change: "+15.2%",
    changeType: "positive",
    icon: Wallet,
    color: "#10b981",
  },
  {
    title: "This Week 🔥",
    value: "₦12,300",
    change: "+8.1%",
    changeType: "positive",
    icon: TrendingUp,
    color: "#f59e0b",
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
  },
  {
    title: "Weekly Challenge 💪",
    description: "Spend less than ₦15,000 this week",
    progress: 60,
    action: "View Progress",
    view: "intelligence",
    emoji: "⚡",
    color: "#8b5cf6",
  },
  {
    title: "Squad Goals 👥",
    description: "Split 3 bills with friends this month",
    progress: 33,
    action: "Find Friends",
    view: "social",
    emoji: "🤝",
    color: "#06b6d4",
  },
];

export function DashboardOverview({ onNavigate }: DashboardOverviewProps) {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Welcome Section with Level */}
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
          🚀
        </Box>
        <CardContent sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Box sx={{ 
              background: 'rgba(255,255,255,0.2)', 
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
              background: 'rgba(255,255,255,0.2)', 
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
      <Grid2 container spacing={{ xs: 2, md: 3 }}>
        {quickStats.map((stat, index) => (
          <Grid2 size={{ xs: 6, md: 6 }} key={index}>
            <Card sx={{ 
              p: { xs: 2, md: 3 }, 
              borderRadius: 4,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(254,249,252,0.95) 100%)',
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
                <Typography variant="subtitle2" color="#425563" fontWeight={600} sx={{ mb: 1, fontSize: { xs: '0.8rem', md: '0.9rem' } }}>
                  {stat.title}
                </Typography>
                <Typography variant="h5" fontWeight={800} sx={{ color: stat.color, mb: 1, fontSize: { xs: '1.3rem', md: '1.5rem' } }}>
                  {stat.value}
                </Typography>
                <Typography variant="caption" sx={{ 
                  color: stat.changeType === 'positive' ? '#10b981' : '#ef4444',
                  fontWeight: 600,
                  background: stat.changeType === 'positive' ? '#10b98115' : '#ef444415',
                  px: 1,
                  py: 0.5,
                  borderRadius: 2,
                }}>
                  {stat.change}
                </Typography>
              </Box>
            </Card>
          </Grid2>
        ))}
      </Grid2>

      {/* Gamified Actions */}
      <Box>
        <Typography variant="h6" fontWeight={700} sx={{ mb: 3, color: '#425563', fontSize: { xs: '1.1rem', md: '1.25rem' } }}>
          Your Missions 🎮
        </Typography>
        <Grid2 container spacing={{ xs: 2, md: 3 }}>
          {gamifiedActions.map((action, index) => (
            <Grid2 size={{ xs: 12, md: 6, xl: 4 }} key={index}>
              <Card sx={{ 
                p: { xs: 2, md: 3 },
                borderRadius: 4,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(254,249,252,0.95) 100%)',
                border: `1px solid ${action.color}20`,
                backdropFilter: 'blur(20px)',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                  transform: 'translateY(-4px)',
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
                      background: `${action.color}15`,
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      mr: 2,
                      border: `1px solid ${action.color}30`,
                    }}>
                      <Typography sx={{ fontSize: '18px' }}>{action.emoji}</Typography>
                    </Box>
                    <Typography variant="subtitle1" fontWeight={700} sx={{ 
                      color: action.color, 
                      fontSize: { xs: '0.9rem', md: '1rem' } 
                    }}>
                      {action.title}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ 
                    color: '#425563', 
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
                          background: `linear-gradient(90deg, ${action.color} 0%, ${action.color}dd 100%)`,
                          borderRadius: 4,
                        }
                      }} 
                    />
                    <Typography variant="caption" sx={{ 
                      color: action.color, 
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
                    onClick={() => onNavigate(action.view)}
                    endIcon={<ArrowRight size={16} />}
                    sx={{
                      background: `linear-gradient(135deg, ${action.color} 0%, ${action.color}dd 100%)`,
                      color: 'white',
                      borderRadius: 3,
                      fontWeight: 700,
                      py: 1,
                      boxShadow: `0 6px 20px ${action.color}30`,
                      '&:hover': {
                        background: `linear-gradient(135deg, ${action.color}dd 0%, ${action.color}bb 100%)`,
                        boxShadow: `0 8px 24px ${action.color}40`,
                        transform: 'translateY(-1px)',
                      }
                    }}
                  >
                    {action.action}
                  </Button>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      </Box>

      {/* Quick Access */}
      <Box>
        <Typography variant="h6" fontWeight={700} sx={{ mb: 3, color: '#425563', fontSize: { xs: '1.1rem', md: '1.25rem' } }}>
          Quick Access 🚀
        </Typography>
        <Grid2 container spacing={{ xs: 2, md: 3 }}>
          <Grid2 size={{ xs: 6, md: 4 }}>
            <Card
              sx={{ 
                p: { xs: 2, md: 3 }, 
                cursor: 'pointer', 
                borderRadius: 4,
                background: 'linear-gradient(135deg, #10b98115 0%, #10b98125 100%)',
                border: '1px solid #10b98130',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px) scale(1.02)',
                  boxShadow: '0 16px 48px #10b98120',
                }
              }}
              onClick={() => onNavigate('dashboard')}
            >
              <Box sx={{ textAlign: 'center' }}>
                <Box sx={{ fontSize: { xs: '32px', md: '40px' }, mb: 1 }}>💰</Box>
                <Typography variant="subtitle2" fontWeight={700} sx={{ 
                  color: '#10b981', 
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
                background: 'linear-gradient(135deg, #8b5cf615 0%, #8b5cf625 100%)',
                border: '1px solid #8b5cf630',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px) scale(1.02)',
                  boxShadow: '0 16px 48px #8b5cf620',
                }
              }}
              onClick={() => onNavigate('intelligence')}
            >
              <Box sx={{ textAlign: 'center' }}>
                <Box sx={{ fontSize: { xs: '32px', md: '40px' }, mb: 1 }}>⚡</Box>
                <Typography variant="subtitle2" fontWeight={700} sx={{ 
                  color: '#8b5cf6', 
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
                background: 'linear-gradient(135deg, #06b6d415 0%, #06b6d425 100%)',
                border: '1px solid #06b6d430',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px) scale(1.02)',
                  boxShadow: '0 16px 48px #06b6d420',
                }
              }}
              onClick={() => onNavigate('social')}
            >
              <Box sx={{ textAlign: 'center' }}>
                <Box sx={{ fontSize: { xs: '32px', md: '40px' }, mb: 1 }}>🤝</Box>
                <Typography variant="subtitle2" fontWeight={700} sx={{ 
                  color: '#06b6d4', 
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