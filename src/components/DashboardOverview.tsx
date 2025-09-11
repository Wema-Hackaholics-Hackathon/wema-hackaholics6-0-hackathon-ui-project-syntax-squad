import { ArrowRight, TrendingUp, Target, CreditCard } from "lucide-react";
import Grid2 from "@mui/material/Grid2";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface DashboardOverviewProps {
  onNavigate: (view: string) => void;
}

type ChangeType = "positive" | "negative";

interface QuickStatItem {
  title: string;
  value: string;
  change: string;
  changeType: ChangeType;
  icon: typeof Target;
}

const quickStats: QuickStatItem[] = [
  {
    title: "Smart Savings",
    value: "₦127,340",
    change: "+28.5%",
    changeType: "positive",
    icon: Target,
  },
  {
    title: "This Month",
    value: "₦45,230",
    change: "-12.3%",
    changeType: "negative",
    icon: TrendingUp,
  },
];

const recentInsights = [
  {
    title: "Spending Pattern Alert",
    description: "You've spent 23% more on food delivery this week",
    action: "View Intelligence",
    view: "intelligence",
  },
  {
    title: "Savings Opportunity",
    description: "Round up ₦2,340 from recent transactions",
    action: "Create Action",
    view: "micro-actions",
  },
  {
    title: "Bill Reminder",
    description: "Split electricity bill with 3 roommates",
    action: "Split Bill",
    view: "social",
  },
];

export function DashboardOverview({ onNavigate }: DashboardOverviewProps) {
  return (
    <>
      {/* Welcome Section */}
      <Card sx={{ 
        mb: 3, 
        p: 3, 
        borderRadius: 3, 
        background: 'linear-gradient(135deg, #AE328E 0%, #c13a9e 100%)',
        boxShadow: '0 8px 32px rgba(174, 50, 142, 0.25)',
        border: 'none'
      }}>
        <CardContent>
          <Typography variant="h5" color="white" fontWeight={700} gutterBottom>
            Welcome back!
          </Typography>
          <Typography color="white" sx={{ opacity: 0.9, fontWeight: 500 }}>
            Here&apos;s your financial overview and latest insights
          </Typography>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Grid2 container spacing={2} sx={{ mb: 3 }}>
        {quickStats.map((stat, index) => (
          <Grid2 size={{ xs: 6, md: 4 }} key={index}>
            <Card sx={{ 
              p: 2, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(254,249,252,0.9) 100%)',
              border: '1px solid rgba(174, 50, 142, 0.1)',
              borderRadius: 3,
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 30px rgba(174, 50, 142, 0.15)',
              }
            }}>
              <Box sx={{ mb: 1 }}>
                <stat.icon size={28} color="#AE328E" />
              </Box>
              <Typography variant="subtitle2" color="#425563" fontWeight={600}>
                {stat.title}
              </Typography>
              <Typography variant="h6" fontWeight={700} sx={{ color: '#AE328E' }}>
                {stat.value}
              </Typography>
              <Typography variant="caption" sx={{ 
                color: stat.changeType === 'positive' ? '#10b981' : '#ef4444',
                fontWeight: 500 
              }}>
                {stat.change}
              </Typography>
            </Card>
          </Grid2>
        ))}
        {/* Quick Action Card */}
        <Grid2 size={{ xs: 12, md: 4 }}>
          <Card
            sx={{ 
              p: 2, 
              cursor: 'pointer', 
              background: 'linear-gradient(135deg, rgba(174, 50, 142, 0.05) 0%, rgba(193, 58, 158, 0.05) 100%)',
              border: '1px solid rgba(174, 50, 142, 0.2)',
              borderRadius: 3,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                background: 'linear-gradient(135deg, rgba(174, 50, 142, 0.1) 0%, rgba(193, 58, 158, 0.1) 100%)',
                boxShadow: '0 8px 30px rgba(174, 50, 142, 0.15)',
              }
            }}
            onClick={() => onNavigate('banking')}
          >
            <CardContent sx={{ textAlign: 'center' }}>
              <Box sx={{ 
                p: 1.5, 
                borderRadius: 2, 
                background: 'linear-gradient(135deg, #AE328E 0%, #c13a9e 100%)', 
                width: 48, 
                height: 48, 
                mx: 'auto', 
                mb: 1, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(174, 50, 142, 0.25)'
              }}>
                <CreditCard size={24} color="white" />
              </Box>
              <Typography variant="body2" color="#425563" fontWeight={600}>
                Connect Bank
              </Typography>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>

      {/* Key Insights & Actions */}
      <Grid2 container spacing={2} sx={{ mb: 3 }}>
        {recentInsights.map((insight, index) => (
          <Grid2 size={{ xs: 12, md: 6, xl: 4 }} key={index}>
            <Card sx={{ 
              p: 2,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(254,249,252,0.9) 100%)',
              border: '1px solid rgba(174, 50, 142, 0.1)',
              borderRadius: 3,
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 30px rgba(174, 50, 142, 0.15)',
              }
            }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom sx={{ color: '#425563' }}>
                  {insight.title}
                </Typography>
                <Typography variant="body2" sx={{ color: '#AE328E', fontWeight: 500 }} gutterBottom>
                  {insight.description}
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => onNavigate(insight.view)}
                  endIcon={<ArrowRight size={18} />}
                  sx={{
                    background: 'linear-gradient(135deg, #AE328E 0%, #c13a9e 100%)',
                    color: 'white',
                    borderRadius: 2,
                    boxShadow: '0 4px 12px rgba(174, 50, 142, 0.25)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #c13a9e 0%, #d44fb0 100%)',
                      boxShadow: '0 6px 16px rgba(174, 50, 142, 0.3)',
                    }
                  }}
                >
                  {insight.action}
                </Button>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>

      {/* Navigation Cards */}
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Card
            sx={{ 
              p: 2, 
              cursor: 'pointer', 
              background: 'linear-gradient(135deg, rgba(255, 165, 0, 0.05) 0%, rgba(255, 140, 0, 0.05) 100%)',
              border: '1px solid rgba(255, 165, 0, 0.2)',
              borderRadius: 3,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                background: 'linear-gradient(135deg, rgba(255, 165, 0, 0.1) 0%, rgba(255, 140, 0, 0.1) 100%)',
                boxShadow: '0 8px 30px rgba(255, 165, 0, 0.15)',
              }
            }}
            onClick={() => onNavigate('transactions')}
          >
            <CardHeader
              title={
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="subtitle1" fontWeight={700} sx={{ color: '#ff8c00' }}>
                    Transaction History
                  </Typography>
                  <Box sx={{ 
                    p: 1.5, 
                    borderRadius: 2, 
                    background: 'linear-gradient(135deg, #ff8c00 0%, #ffa500 100%)', 
                    boxShadow: '0 4px 12px rgba(255, 140, 0, 0.25)'
                  }}>
                    <ArrowRight size={18} color="white" />
                  </Box>
                </Box>
              }
              subheader={<Typography variant="body2" sx={{ color: '#ff8c00', fontWeight: 500 }}>View all your transactions and spending patterns</Typography>}
            />
            <CardContent>
              <Typography variant="h5" fontWeight={700} sx={{ color: '#ff8c00' }}>
                ₦234,560
              </Typography>
              <Typography variant="caption" sx={{ color: '#ff8c00', fontWeight: 500 }}>
                Total this month
              </Typography>
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Card
            sx={{ 
              p: 2, 
              cursor: 'pointer', 
              background: 'linear-gradient(135deg, rgba(174, 50, 142, 0.05) 0%, rgba(193, 58, 158, 0.05) 100%)',
              border: '1px solid rgba(174, 50, 142, 0.2)',
              borderRadius: 3,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                background: 'linear-gradient(135deg, rgba(174, 50, 142, 0.1) 0%, rgba(193, 58, 158, 0.1) 100%)',
                boxShadow: '0 8px 30px rgba(174, 50, 142, 0.15)',
              }
            }}
            onClick={() => onNavigate('intelligence')}
          >
            <CardHeader
              title={
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="subtitle1" fontWeight={700} sx={{ color: '#AE328E' }}>
                    Analytics & Insights
                  </Typography>
                  <Box sx={{ 
                    p: 1.5, 
                    borderRadius: 2, 
                    background: 'linear-gradient(135deg, #AE328E 0%, #c13a9e 100%)', 
                    boxShadow: '0 4px 12px rgba(174, 50, 142, 0.25)'
                  }}>
                    <ArrowRight size={18} color="white" />
                  </Box>
                </Box>
              }
              subheader={<Typography variant="body2" sx={{ color: '#AE328E', fontWeight: 500 }}>Deep dive into your financial analytics</Typography>}
            />
            <CardContent>
              <Typography variant="h5" fontWeight={700} sx={{ color: '#AE328E' }}>
                94.2%
              </Typography>
              <Typography variant="caption" sx={{ color: '#AE328E', fontWeight: 500 }}>
                Intelligence score
              </Typography>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
    </>
  );
}