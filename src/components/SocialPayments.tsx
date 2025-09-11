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
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import { SelectChangeEvent } from "@mui/material/Select";

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
    color: "#AE328E",
    actionText: "Split Now"
  },
  {
    id: "2",
    title: "Group Challenge 🎯",
    description: "Save together, achieve together!",
    emoji: "🏆",
    color: "#425563",
    actionText: "Join Challenge"
  },
  {
    id: "3",
    title: "Send Money 💫",
    description: "Quick payments to friends",
    emoji: "💳",
    color: "#AE328E",
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
    color: "#AE328E"
  },
  {
    id: "2", 
    name: "Mike",
    action: "requested split for uber",
    amount: "₦1,200",
    emoji: "🚗",
    color: "#425563"
  },
  {
    id: "3",
    name: "Team Lunch",
    action: "group expense added",
    amount: "₦8,500",
    emoji: "🍽️",
    color: "#AE328E"
  }
]

const groupGoals = [
  { name: "Weekend Trip Fund 🏖️", progress: 65, current: "₦45,000", target: "₦70,000", members: 4 },
  { name: "Office Pizza Party 🍕", progress: 80, current: "₦12,000", target: "₦15,000", members: 8 },
]

const friends: string[] = ["Sarah", "Mike", "Alex", "Emma", "John"];

const challenges = [
  { id: "1", name: "Weekend Trip Fund 🏖️", author: "Sarah" },
  { id: "2", name: "Office Pizza Party 🍕", author: "Mike" },
];

export function SocialPayments() {
  const [sharedAchievement, setSharedAchievement] = useState(false);
  const [activeActions, setActiveActions] = useState<string[]>([]);
  const [splitBillOpen, setSplitBillOpen] = useState(false);
  const [billName, setBillName] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const [sendPaymentOpen, setSendPaymentOpen] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState('');
  const [sendAmount, setSendAmount] = useState('');
  const [joinChallengeOpen, setJoinChallengeOpen] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState('');

  const handleActionClick = (actionId: string) => {
    if (actionId === "1") {
      setSplitBillOpen(true);
      return;
    }
    if (actionId === "3") {
      setSendPaymentOpen(true);
      return;
    }
    if (actionId === "2") {
      setJoinChallengeOpen(true);
      return;
    }
    if (!activeActions.includes(actionId)) {
      setActiveActions([...activeActions, actionId]);
      // Simulate loading state
      setTimeout(() => {
        // Action completed
      }, 1000);
    }
  };

  const handleShareAchievement = () => {
    setSharedAchievement(true);
    setTimeout(() => setSharedAchievement(false), 2000);
  };

  const handleFriendsChange = (event: SelectChangeEvent<typeof selectedFriends>) => {
    const { value } = event.target;
    setSelectedFriends(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleSplitSubmit = () => {
    console.log({ billName, amount, selectedFriends });
    setSplitBillOpen(false);
  };

  const handleSendSubmit = () => {
    console.log({ selectedFriend, sendAmount });
    setSendPaymentOpen(false);
  };

  const handleJoinSubmit = () => {
    console.log({ selectedChallenge });
    setJoinChallengeOpen(false);
  };

  return (
    <div>
      {/* Connect Header */}
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
                    onClick={() => handleActionClick(action.id)}
                    endIcon={<Plus size={16} />}
                    sx={{
                      background: activeActions.includes(action.id)
                        ? 'linear-gradient(135deg, #AE328E 0%, #c13a9e 100%)'
                        : `linear-gradient(135deg, ${action.color} 0%, ${action.color}dd 100%)`,
                      color: 'white',
                      borderRadius: 3,
                      fontWeight: 700,
                      py: 1.2,
                      boxShadow: `0 8px 24px ${action.color}30`,
                      '&:hover': {
                        background: activeActions.includes(action.id)
                          ? 'linear-gradient(135deg, #AE328E 0%, #c13a9e 100%)'
                          : `linear-gradient(135deg, ${action.color}dd 0%, ${action.color}bb 100%)`,
                        boxShadow: `0 12px 32px ${action.color}40`,
                        transform: 'translateY(-2px)',
                      }
                    }}
                  >
                    {activeActions.includes(action.id) ? '✅ Started!' : action.actionText}
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
            <Heart size={24} color="#AE328E" fill="#AE328E" />
            <Typography variant="h6" fontWeight={700} sx={{ 
              color: '#AE328E',
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
            onClick={handleShareAchievement}
            startIcon={<Share size={18} />}
            sx={{
              background: sharedAchievement 
                ? 'linear-gradient(135deg, #AE328E 0%, #c13a9e 100%)'
                : 'linear-gradient(135deg, #AE328E 0%, #c13a9e 100%)',
              color: 'white',
              borderRadius: 3,
              fontWeight: 700,
              px: 3,
              py: 1,
              boxShadow: '0 6px 20px #AE328E30',
              '&:hover': {
                background: sharedAchievement 
                  ? 'linear-gradient(135deg, #AE328E 0%, #c13a9e 100%)'
                  : 'linear-gradient(135deg, #AE328E 0%, #c13a9e 100%)',
                boxShadow: '0 8px 24px #AE328E40',
                transform: 'translateY(-1px)',
              }
            }}
          >
            {sharedAchievement ? '✅ Shared!' : 'Share Achievement'}
          </Button>
        </CardContent>
      </Card>
      <Dialog open={splitBillOpen} onClose={() => setSplitBillOpen(false)}>
        <DialogTitle>Split a Bill</DialogTitle>
        <DialogContent>
          <TextField
            label="Bill Name"
            value={billName}
            onChange={(e) => setBillName(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Amount (₦)"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Select Friends</InputLabel>
            <Select
              multiple
              value={selectedFriends}
              onChange={handleFriendsChange}
              renderValue={(selected) => selected.join(', ')}
            >
              {friends.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={selectedFriends.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button onClick={handleSplitSubmit} variant="contained" fullWidth>
            Submit
          </Button>
        </DialogContent>
      </Dialog>
      <Dialog open={sendPaymentOpen} onClose={() => setSendPaymentOpen(false)}>
        <DialogTitle>Send Payment</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Select Friend</InputLabel>
            <Select
              value={selectedFriend}
              onChange={(e) => setSelectedFriend(e.target.value as string)}
            >
              {friends.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Amount (₦)"
            type="number"
            value={sendAmount}
            onChange={(e) => setSendAmount(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button onClick={handleSendSubmit} variant="contained" fullWidth>
            Submit
          </Button>
        </DialogContent>
      </Dialog>
      <Dialog open={joinChallengeOpen} onClose={() => setJoinChallengeOpen(false)}>
        <DialogTitle>Join Challenge</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Select Challenge</InputLabel>
            <Select
              value={selectedChallenge}
              onChange={(e) => setSelectedChallenge(e.target.value as string)}
              renderValue={(selected) => challenges.find(c => c.id === selected)?.name || ''}
            >
              {challenges.map((challenge) => (
                <MenuItem key={challenge.id} value={challenge.id}>
                  <Box>
                    <Typography>{challenge.name}</Typography>
                    <Typography variant="caption">by {challenge.author}</Typography>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button onClick={handleJoinSubmit} variant="contained" fullWidth>
            Submit
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}