import { Users, Plus, Share, Trophy, Heart } from "lucide-react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Grid2 from "@mui/material/Grid2";
import { LinearProgress } from "@mui/material";
import { useState } from "react";

interface QuickAction {
  id: string
  title: string
  description: string
  emoji: string
  color: string
  actionText: string
}

interface FriendActivity {
  id: string
  name: string
  action: string
  amount: string
  emoji: string
  color: string
}

const quickActions: QuickAction[] = [
  {
    id: "1",
    title: "Split a Bill 🧾",
    description: "Share expenses with friends instantly",
    emoji: "💸",
    color: "#10b981",
    actionText: "Split Now"
  },
  {
    id: "2",
    title: "Group Challenge 🎯",
    description: "Save together, achieve together!",
    emoji: "🏆",
    color: "#8b5cf6",
    actionText: "Join Challenge"
  },
  {
    id: "3",
    title: "Send Money 💫",
    description: "Quick payments to friends",
    emoji: "💳",
    color: "#06b6d4",
    actionText: "Send Payment"
  }
]

const friendActivities: FriendActivity[] = [
  {
    id: "1",
    name: "Sarah",
    action: "paid you for dinner",
    amount: "₦2,500",
    emoji: "🍕",
    color: "#10b981"
  },
  {
    id: "2", 
    name: "Mike",
    action: "requested split for uber",
    amount: "₦1,200",
    emoji: "🚗",
    color: "#f59e0b"
  },
  {
    id: "3",
    name: "Team Lunch",
    action: "group expense added",
    amount: "₦8,500",
    emoji: "🍽️",
    color: "#8b5cf6"
  }
]

const groupGoals = [
  { name: "Weekend Trip Fund 🏖️", progress: 65, current: "₦45,000", target: "₦70,000", members: 4 },
  { name: "Office Pizza Party 🍕", progress: 80, current: "₦12,000", target: "₦15,000", members: 8 },
]

export function SocialPayments() {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Connect Header */}
      <Card sx={{ 
        p: { xs: 2, md: 3 }, 
        borderRadius: 4, 
        background: 'linear-gradient(135deg, #06b6d4 0%, #38bdf8 100%)',
        boxShadow: '0 12px 40px rgba(6, 182, 212, 0.3)',
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
          🤝
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
              <Users size={20} color="white" />
              <Typography color="white" sx={{ fontWeight: 700, fontSize: '0.9rem' }}>
                Social Pay
              </Typography>
            </Box>
            <Box sx={{ 
              background: 'rgba(255,255,255,0.2)', 
              borderRadius: 2, 
              px: 1.5, 
              py: 0.5 
            }}>
              <Typography color="white" sx={{ fontWeight: 600, fontSize: '0.8rem' }}>
                12 Friends 💫
              </Typography>
            </Box>
          </Box>
          <Typography variant="h4" color="white" fontWeight={800} gutterBottom sx={{ 
            fontSize: { xs: '1.5rem', md: '2rem' },
            fontFamily: '"Inter", sans-serif'
          }}>
            Connect & Share 🤝
          </Typography>
          <Typography color="white" sx={{ opacity: 0.9, fontWeight: 500, fontSize: { xs: '0.9rem', md: '1rem' } }}>
            Split bills, save together, win together!
          </Typography>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Box>
        <Typography variant="h6" fontWeight={700} sx={{ mb: 3, color: '#425563', fontSize: { xs: '1.1rem', md: '1.25rem' } }}>
          Quick Actions 🚀
        </Typography>
        <Grid2 container spacing={{ xs: 2, md: 3 }}>
          {quickActions.map((action) => (
            <Grid2 size={{ xs: 12, md: 6, xl: 4 }} key={action.id}>
              <Card sx={{ 
                p: { xs: 2, md: 3 },
                borderRadius: 4,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(254,249,252,0.95) 100%)',
                border: `1px solid ${action.color}20`,
                backdropFilter: 'blur(20px)',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-6px) scale(1.02)',
                  boxShadow: `0 20px 60px ${action.color}25`,
                }
              }}>
                <Box sx={{ 
                  position: 'absolute', 
                  top: -15, 
                  right: -15, 
                  fontSize: { xs: '60px', md: '80px' }, 
                  opacity: 0.1 
                }}>
                  {action.emoji}
                </Box>
                <CardContent sx={{ position: 'relative', zIndex: 1, p: 0 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ 
                      width: 44, 
                      height: 44, 
                      borderRadius: 2.5, 
                      background: `${action.color}15`,
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      mr: 2,
                      border: `1px solid ${action.color}30`,
                    }}>
                      <Typography sx={{ fontSize: '22px' }}>{action.emoji}</Typography>
                    </Box>
                    <Typography variant="h6" fontWeight={700} sx={{ 
                      color: action.color, 
                      fontSize: { xs: '1rem', md: '1.1rem' },
                      fontFamily: '"Inter", sans-serif'
                    }}>
                      {action.title}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ 
                    color: '#425563', 
                    fontWeight: 500, 
                    mb: 3,
                    fontSize: { xs: '0.85rem', md: '0.9rem' }
                  }}>
                    {action.description}
                  </Typography>
                  <Button
                    fullWidth
                    endIcon={<Plus size={16} />}
                    sx={{
                      background: `linear-gradient(135deg, ${action.color} 0%, ${action.color}dd 100%)`,
                      color: 'white',
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
                    {action.actionText}
                  </Button>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      </Box>

      {/* Friend Activity */}
      <Box>
        <Typography variant="h6" fontWeight={700} sx={{ mb: 3, color: '#425563', fontSize: { xs: '1.1rem', md: '1.25rem' } }}>
          Recent Activity 📱
        </Typography>
        <Card sx={{ 
          p: { xs: 2, md: 3 },
          borderRadius: 4,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(254,249,252,0.95) 100%)',
          border: '1px solid rgba(174, 50, 142, 0.1)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 8px 32px rgba(174, 50, 142, 0.1)',
        }}>
          <CardContent sx={{ p: 0 }}>
            <Box sx={{ space: 3 }}>
              {friendActivities.map((activity, index) => (
                <Box key={activity.id} sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  p: 2, 
                  borderRadius: 3,
                  mb: index < friendActivities.length - 1 ? 2 : 0,
                  background: `${activity.color}08`,
                  border: `1px solid ${activity.color}15`,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    background: `${activity.color}12`,
                    transform: 'translateY(-1px)',
                  }
                }}>
                  <Avatar sx={{ 
                    width: 44, 
                    height: 44, 
                    mr: 2,
                    background: `linear-gradient(135deg, ${activity.color} 0%, ${activity.color}dd 100%)`,
                    fontSize: '18px'
                  }}>
                    {activity.emoji}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1" fontWeight={600} sx={{ 
                      color: '#425563',
                      fontSize: { xs: '0.9rem', md: '1rem' }
                    }}>
                      {activity.name}
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      color: '#6b7280', 
                      fontSize: { xs: '0.8rem', md: '0.85rem' }
                    }}>
                      {activity.action}
                    </Typography>
                  </Box>
                  <Typography variant="h6" fontWeight={700} sx={{ 
                    color: activity.color,
                    fontSize: { xs: '1rem', md: '1.1rem' }
                  }}>
                    {activity.amount}
                  </Typography>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Group Goals */}
      <Box>
        <Typography variant="h6" fontWeight={700} sx={{ mb: 3, color: '#425563', fontSize: { xs: '1.1rem', md: '1.25rem' } }}>
          Group Goals 🎯
        </Typography>
        <Grid2 container spacing={{ xs: 2, md: 3 }}>
          {groupGoals.map((goal, index) => (
            <Grid2 size={{ xs: 12, md: 6 }} key={index}>
              <Card sx={{ 
                p: { xs: 2, md: 3 },
                borderRadius: 4,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(254,249,252,0.95) 100%)',
                border: '1px solid #8b5cf620',
                backdropFilter: 'blur(20px)',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 16px 48px #8b5cf620',
                }
              }}>
                <Box sx={{ 
                  position: 'absolute', 
                  top: -15, 
                  right: -15, 
                  fontSize: { xs: '50px', md: '60px' }, 
                  opacity: 0.1 
                }}>
                  🎯
                </Box>
                <CardContent sx={{ position: 'relative', zIndex: 1, p: 0 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Trophy size={20} color="#8b5cf6" />
                    <Typography variant="h6" fontWeight={700} sx={{ 
                      color: '#8b5cf6', 
                      ml: 1,
                      fontSize: { xs: '0.95rem', md: '1.1rem' }
                    }}>
                      {goal.name}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" fontWeight={600} sx={{ color: '#425563', fontSize: { xs: '0.8rem', md: '0.85rem' } }}>
                      {goal.current} / {goal.target}
                    </Typography>
                    <Typography variant="caption" sx={{ 
                      color: '#8b5cf6', 
                      fontWeight: 600,
                      background: '#8b5cf615',
                      px: 1,
                      py: 0.5,
                      borderRadius: 2,
                      fontSize: { xs: '0.7rem', md: '0.75rem' }
                    }}>
                      {goal.members} members
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={goal.progress} 
                    sx={{ 
                      height: { xs: 8, md: 10 }, 
                      borderRadius: 5,
                      backgroundColor: '#8b5cf615',
                      '& .MuiLinearProgress-bar': {
                        background: 'linear-gradient(90deg, #8b5cf6 0%, #a78bfa 100%)',
                        borderRadius: 5,
                      }
                    }} 
                  />
                  <Typography variant="caption" sx={{ 
                    color: '#8b5cf6', 
                    fontWeight: 600, 
                    mt: 1, 
                    display: 'block',
                    fontSize: { xs: '0.7rem', md: '0.75rem' }
                  }}>
                    {goal.progress}% complete 🚀
                  </Typography>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      </Box>

      {/* Achievement */}
      <Card sx={{ 
        p: { xs: 2, md: 3 },
        borderRadius: 4,
        background: 'linear-gradient(135deg, #f59e0b15 0%, #f59e0b25 100%)',
        border: '1px solid #f59e0b30',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <Box sx={{ 
          position: 'absolute', 
          top: -20, 
          right: -20, 
          fontSize: '100px', 
          opacity: 0.1,
          color: '#f59e0b'
        }}>
          🏆
        </Box>
        <CardContent sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Heart size={24} color="#f59e0b" fill="#f59e0b" />
            <Typography variant="h6" fontWeight={700} sx={{ 
              color: '#f59e0b',
              fontSize: { xs: '1.1rem', md: '1.25rem' }
            }}>
              Social Superstar! 🌟
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ 
            color: '#425563', 
            fontWeight: 500, 
            mb: 2,
            fontSize: { xs: '0.9rem', md: '1rem' }
          }}>
            You&apos;ve helped friends save ₦25,000 this month through smart splits! 💰
          </Typography>
          <Button
            startIcon={<Share size={18} />}
            sx={{
              background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
              color: 'white',
              borderRadius: 3,
              fontWeight: 700,
              px: 3,
              py: 1,
              boxShadow: '0 6px 20px #f59e0b30',
              '&:hover': {
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                boxShadow: '0 8px 24px #f59e0b40',
                transform: 'translateY(-1px)',
              }
            }}
          >
            Share Achievement
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}