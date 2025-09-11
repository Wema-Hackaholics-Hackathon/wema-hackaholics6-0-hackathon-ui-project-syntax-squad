import { 
  ArrowRight,
  Zap,
  Trophy
} from "lucide-react"
import Grid2 from "@mui/material/Grid2"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { LinearProgress } from "@mui/material"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import { useState } from "react"

interface SimpleInsight {
  id: string
  title: string
  description: string
  emoji: string
  color: string
  actionText: string
}

const sparkInsights: SimpleInsight[] = [
  {
    id: "1",
    title: "Save on Food Delivery 🍕",
    description: "Cook 2 more meals at home this week to save ₦3,500",
    emoji: "🍳",
    color: "#AE328E",
    actionText: "Start Cooking Challenge"
  },
  {
    id: "2", 
    title: "Subscription Detective 🔍",
    description: "Found 2 unused subscriptions worth ₦4,200/month",
    emoji: "💰",
    color: "#425563",
    actionText: "Cancel Subscriptions"
  },
  {
    id: "3",
    title: "Weekend Warrior 🎉",
    description: "You spend 40% more on weekends. Set a limit?",
    emoji: "🎯",
    color: "#AE328E",
    actionText: "Set Weekend Budget"
  }
]

const spendingCategories = [
  { name: "Food & Drinks 🍔", amount: "₦25,400", percentage: 35, color: "#AE328E" },
  { name: "Transport 🚗", amount: "₦18,200", percentage: 25, color: "#425563" },
  { name: "Entertainment 🎬", amount: "₦14,600", percentage: 20, color: "#AE328E" },
  { name: "Shopping 🛍️", amount: "₦10,950", percentage: 15, color: "#425563" },
  { name: "Other 📦", amount: "₦3,650", percentage: 5, color: "#425563" }
]

export function PaymentIntelligence() {
  const [completedActions, setCompletedActions] = useState<string[]>([]);
  
  const handleActionClick = (insightId: string) => {
    if (!completedActions.includes(insightId)) {
      setCompletedActions([...completedActions, insightId]);
      // Show a brief success state
      setTimeout(() => {
        // Could add more complex state management here
      }, 1000);
    }
  };
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Sparks Header */}
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
          ⚡
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
              <Zap size={20} color="white" />
              <Typography color="white" sx={{ fontWeight: 700, fontSize: '0.9rem' }}>
                AI Powered
              </Typography>
            </Box>
            <Box sx={{ 
              background: 'rgba(255,255,255,0.2)', 
              borderRadius: 2, 
              px: 1.5, 
              py: 0.5 
            }}>
              <Typography color="white" sx={{ fontWeight: 600, fontSize: '0.8rem' }}>
                95% Accuracy 🎯
              </Typography>
            </Box>
          </Box>
          <Typography variant="h4" color="white" fontWeight={800} gutterBottom sx={{ 
            fontSize: { xs: '1.5rem', md: '2rem' },
            fontFamily: '"Inter", sans-serif'
          }}>
            Your Money Sparks ⚡
          </Typography>
          <Typography color="white" sx={{ opacity: 0.9, fontWeight: 500, fontSize: { xs: '0.9rem', md: '1rem' } }}>
            Smart insights to level up your finances!
          </Typography>
        </CardContent>
      </Card>

      {/* Smart Insights */}
      <Box>
        <Typography variant="h6" fontWeight={700} sx={{ mb: 3, color: '#425563', fontSize: { xs: '1.1rem', md: '1.25rem' } }}>
          Your Power-Ups 🚀
        </Typography>
        <Grid2 container spacing={{ xs: 2, md: 3 }}>
          {sparkInsights.map((insight) => (
            <Grid2 size={{ xs: 12, md: 6, xl: 4 }} key={insight.id}>
              <Card sx={{ 
                p: { xs: 2, md: 3 },
                borderRadius: 4,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(254,249,252,0.95) 100%)',
                border: `1px solid ${insight.color}20`,
                backdropFilter: 'blur(20px)',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                  transform: 'translateY(-6px) scale(1.02)',
                  boxShadow: `0 20px 60px ${insight.color}25`,
                }
              }}>
                <Box sx={{ 
                  position: 'absolute', 
                  top: -15, 
                  right: -15, 
                  fontSize: { xs: '60px', md: '80px' }, 
                  opacity: 0.1 
                }}>
                  {insight.emoji}
                </Box>
                <CardContent sx={{ position: 'relative', zIndex: 1, p: 0 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ 
                      width: 40, 
                      height: 40, 
                      borderRadius: 2, 
                      background: `${insight.color}15`,
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      mr: 2,
                      border: `1px solid ${insight.color}30`,
                    }}>
                      <Typography sx={{ fontSize: '20px' }}>{insight.emoji}</Typography>
                    </Box>
                    <Typography variant="h6" fontWeight={700} sx={{ 
                      color: insight.color, 
                      fontSize: { xs: '1rem', md: '1.1rem' },
                      fontFamily: '"Inter", sans-serif'
                    }}>
                      {insight.title}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ 
                    color: '#425563', 
                    fontWeight: 500, 
                    mb: 3,
                    fontSize: { xs: '0.85rem', md: '0.9rem' }
                  }}>
                    {insight.description}
                  </Typography>
                  <Button
                    fullWidth
                    onClick={() => handleActionClick(insight.id)}
                    endIcon={<ArrowRight size={16} />}
                    sx={{
                      background: completedActions.includes(insight.id) 
                        ? 'linear-gradient(135deg, #AE328E 0%, #c13a9e 100%)'
                        : `linear-gradient(135deg, ${insight.color} 0%, ${insight.color}dd 100%)`,
                      color: 'white',
                      borderRadius: 3,
                      fontWeight: 700,
                      py: 1.2,
                      boxShadow: `0 8px 24px ${insight.color}30`,
                      '&:hover': {
                        background: completedActions.includes(insight.id) 
                          ? 'linear-gradient(135deg, #AE328E 0%, #c13a9e 100%)'
                          : `linear-gradient(135deg, ${insight.color}dd 0%, ${insight.color}bb 100%)`,
                        boxShadow: `0 12px 32px ${insight.color}40`,
                        transform: 'translateY(-2px)',
                      }
                    }}
                  >
                    {completedActions.includes(insight.id) ? '✅ Done!' : insight.actionText}
                  </Button>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      </Box>

      {/* Spending Breakdown */}
      <Box>
        <Typography variant="h6" fontWeight={700} sx={{ mb: 3, color: '#425563', fontSize: { xs: '1.1rem', md: '1.25rem' } }}>
          Where Your Money Goes 💸
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
              {spendingCategories.map((category, index) => (
                <Box key={index} sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="subtitle1" fontWeight={600} sx={{ 
                      color: category.color,
                      fontSize: { xs: '0.9rem', md: '1rem' }
                    }}>
                      {category.name}
                    </Typography>
                    <Typography variant="h6" fontWeight={700} sx={{ 
                      color: category.color,
                      fontSize: { xs: '1rem', md: '1.1rem' }
                    }}>
                      {category.amount}
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={category.percentage} 
                    sx={{ 
                      height: { xs: 8, md: 10 }, 
                      borderRadius: 5,
                      backgroundColor: `${category.color}15`,
                      '& .MuiLinearProgress-bar': {
                        background: `linear-gradient(90deg, ${category.color} 0%, ${category.color}dd 100%)`,
                        borderRadius: 5,
                      }
                    }} 
                  />
                  <Typography variant="caption" sx={{ 
                    color: category.color, 
                    fontWeight: 600, 
                    mt: 0.5, 
                    display: 'block',
                    fontSize: { xs: '0.7rem', md: '0.75rem' }
                  }}>
                    {category.percentage}% of total spending
                  </Typography>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Achievement Section */}
      <Card sx={{ 
        p: { xs: 2, md: 3 },
        borderRadius: 4,
        background: 'linear-gradient(135deg, #AE328E15 0%, #AE328E25 100%)',
        border: '1px solid #AE328E30',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <Box sx={{ 
          position: 'absolute', 
          top: -20, 
          right: -20, 
          fontSize: '100px', 
          opacity: 0.1,
          color: '#AE328E'
        }}>
          🏆
        </Box>
        <CardContent sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Trophy size={24} color="#AE328E" />
            <Typography variant="h6" fontWeight={700} sx={{ 
              color: '#AE328E',
              fontSize: { xs: '1.1rem', md: '1.25rem' }
            }}>
              This Week&apos;s Achievement 🎉
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
          <LinearProgress 
            variant="determinate" 
            value={85} 
            sx={{ 
              height: 12, 
              borderRadius: 6,
              backgroundColor: '#AE328E15',
              '& .MuiLinearProgress-bar': {
                background: 'linear-gradient(90deg, #AE328E 0%, #c13a9e 100%)',
                borderRadius: 6,
              }
            }} 
          />
          <Typography variant="caption" sx={{ 
            color: '#AE328E', 
            fontWeight: 600, 
            mt: 1, 
            display: 'block' 
          }}>
            85% to next level! 🚀
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}