import { 
  Target, 
  CheckCircle,
  Plus
} from "lucide-react"
import Grid2 from "@mui/material/Grid2"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Switch from "@mui/material/Switch"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import { useState } from "react"

interface MicroAction {
  id: string
  name: string
  description: string
  isActive: boolean
  totalSaved: number
  emoji: string
  color: string
}

const microActions: MicroAction[] = [
  {
    id: "1",
    name: "Round Up Savings",
    description: "Round up purchases to the nearest ₦100",
    isActive: true,
    totalSaved: 2340,
    emoji: "🔄",
    color: "#AE328E"
  },
  {
    id: "2", 
    name: "Coffee Challenge",
    description: "Skip 1 coffee per week, save ₦500",
    isActive: false,
    totalSaved: 0,
    emoji: "☕",
    color: "#425563"
  },
  {
    id: "3",
    name: "Smart Subscriptions",
    description: "Auto-cancel unused subscriptions",
    isActive: true,
    totalSaved: 4200,
    emoji: "🎯",
    color: "#AE328E"
  }
]

export function MicroActions() {
  const [actions, setActions] = useState(microActions)

  const toggleAction = (actionId: string) => {
    setActions(actions.map(action => 
      action.id === actionId 
        ? { ...action, isActive: !action.isActive }
        : action
    ))
  }

  const totalSavings = actions
    .filter(action => action.isActive)
    .reduce((sum, action) => sum + action.totalSaved, 0)

  return (
    <div>
      {/* Header */}
      <Card sx={{ 
        p: { xs: 2, md: 3 }, 
        borderRadius: 4, 
        background: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)',
        boxShadow: '0 12px 40px rgba(139, 92, 246, 0.3)',
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
          <Typography variant="h4" color="white" fontWeight={800} gutterBottom sx={{ 
            fontSize: { xs: '1.5rem', md: '2rem' },
            fontFamily: '"Inter", sans-serif'
          }}>
            Micro Actions ⚡
          </Typography>
          <Typography color="white" sx={{ opacity: 0.9, fontWeight: 500, fontSize: { xs: '0.9rem', md: '1rem' } }}>
            Small actions, big savings! Set it and forget it.
          </Typography>
        </CardContent>
      </Card>

      {/* Total Savings */}
      <Card sx={{ 
        p: { xs: 2, md: 3 },
        borderRadius: 4,
        background: 'linear-gradient(135deg, #AE328E15 0%, #AE328E25 100%)',
        border: '1px solid #AE328E30',
        backdropFilter: 'blur(20px)',
      }}>
        <CardContent sx={{ p: 0, textAlign: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 2 }}>
            <CheckCircle size={24} color="#AE328E" />
            <Typography variant="h6" fontWeight={700} sx={{ color: '#AE328E' }}>
              Total Saved This Month
            </Typography>
          </Box>
          <Typography variant="h3" fontWeight={800} sx={{ color: '#AE328E', mb: 1 }}>
            ₦{totalSavings.toLocaleString()}
          </Typography>
          <Typography variant="body2" sx={{ color: '#425563' }}>
            From {actions.filter(a => a.isActive).length} active micro actions
          </Typography>
        </CardContent>
      </Card>

      {/* Micro Actions List */}
      <Box>
        <Typography variant="h6" fontWeight={700} sx={{ mb: 3, color: '#425563' }}>
          Your Micro Actions 🎯
        </Typography>
        <Grid2 container spacing={{ xs: 2, md: 3 }}>
          {actions.map((action) => (
            <Grid2 size={{ xs: 12, md: 6 }} key={action.id}>
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
                  top: -15, 
                  right: -15, 
                  fontSize: { xs: '60px', md: '80px' }, 
                  opacity: 0.1 
                }}>
                  {action.emoji}
                </Box>
                <CardContent sx={{ position: 'relative', zIndex: 1, p: 0 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ 
                        width: 40, 
                        height: 40, 
                        borderRadius: 2, 
                        background: `${action.color}15`,
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        border: `1px solid ${action.color}30`,
                      }}>
                        <Typography sx={{ fontSize: '18px' }}>{action.emoji}</Typography>
                      </Box>
                      <Typography variant="h6" fontWeight={700} sx={{ 
                        color: action.color,
                        fontSize: { xs: '1rem', md: '1.1rem' }
                      }}>
                        {action.name}
                      </Typography>
                    </Box>
                    <Switch
                      checked={action.isActive}
                      onChange={() => toggleAction(action.id)}
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                          color: action.color,
                        },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                          backgroundColor: action.color,
                        },
                      }}
                    />
                  </Box>
                  <Typography variant="body2" sx={{ 
                    color: '#425563', 
                    fontWeight: 500, 
                    mb: 2,
                    fontSize: { xs: '0.85rem', md: '0.9rem' }
                  }}>
                    {action.description}
                  </Typography>
                  {action.isActive && (
                    <Box sx={{ 
                      background: `${action.color}10`,
                      borderRadius: 2,
                      p: 1.5,
                      border: `1px solid ${action.color}20`
                    }}>
                      <Typography variant="subtitle2" fontWeight={600} sx={{ color: action.color }}>
                        💰 Saved: ₦{action.totalSaved.toLocaleString()}
                      </Typography>
                    </Box>
                  )}
                  {!action.isActive && (
                    <Button
                      fullWidth
                      onClick={() => toggleAction(action.id)}
                      startIcon={<Plus size={16} />}
                      sx={{
                        background: `linear-gradient(135deg, ${action.color} 0%, ${action.color}dd 100%)`,
                        color: 'white',
                        borderRadius: 3,
                        fontWeight: 700,
                        py: 1,
                        '&:hover': {
                          background: `linear-gradient(135deg, ${action.color}dd 0%, ${action.color}bb 100%)`,
                        }
                      }}
                    >
                      Activate
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      </Box>

      {/* Suggestions */}
      <Card sx={{ 
        p: { xs: 2, md: 3 },
        borderRadius: 4,
        background: 'linear-gradient(135deg, #06b6d415 0%, #06b6d425 100%)',
        border: '1px solid #06b6d430',
      }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Target size={24} color="#06b6d4" />
            <Typography variant="h6" fontWeight={700} sx={{ color: '#06b6d4' }}>
              Suggested Actions 💡
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: '#425563', mb: 3 }}>
            Based on your spending patterns, here are some actions that could save you money:
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {['Weekend Spending Limit', 'Fuel Tracker', 'Subscription Monitor'].map((suggestion, index) => (
              <Box key={index} sx={{ 
                background: '#06b6d415',
                border: '1px solid #06b6d430',
                borderRadius: 2,
                px: 2,
                py: 1,
                fontSize: '0.85rem',
                color: '#06b6d4',
                fontWeight: 600
              }}>
                {suggestion}
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </div>
  )
}