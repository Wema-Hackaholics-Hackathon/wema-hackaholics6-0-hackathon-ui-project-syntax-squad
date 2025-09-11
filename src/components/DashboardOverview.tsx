import { ArrowRight, TrendingUp, Target, CreditCard } from "lucide-react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

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

const defaultQuickStats: QuickStatItem[] = [
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
    href: "/view-intelligence",
  },
  {
    title: "Savings Opportunity",
    description: "Round up ₦2,340 from recent transactions",
    action: "Create Action",
    href: "/create-action",
  },
  {
    title: "Bill Reminder",
    description: "Split electricity bill with 3 roommates",
    action: "Split Bill",
    href: "/split-bill",
  },
];

export function DashboardOverview({ onNavigate }: DashboardOverviewProps) {
  const theme = useTheme();
  const [quickStats, setQuickStats] = useState<QuickStatItem[]>(defaultQuickStats);

  const isBrowser = typeof window !== "undefined";

  const isReloadNavigation = useMemo(() => {
    if (!isBrowser || typeof performance === "undefined") return false;
    const entries = (performance.getEntriesByType("navigation") as PerformanceNavigationTiming[]) || [];
    return entries[0]?.type === "reload";
  }, [isBrowser]);

  useEffect(() => {
    if (!isBrowser) return;

    // Helper formatters
    const formatCurrency = (amount: number) => {
      if (Number.isNaN(amount)) return "₦0";
      return `₦${amount.toLocaleString("en-NG")}`;
    };

    const deriveChangeType = (change: string): ChangeType => {
      return change.trim().startsWith("-") ? "negative" : "positive";
    };

    // Load from localStorage first to populate UI immediately
    try {
      const cached = window.localStorage.getItem("dashboardBalance");
      if (cached) {
        const data = JSON.parse(cached) as {
          totalBalance: number;
          thisMonthSpending: number;
          savingDifference: string;
          spendingDifference: string;
        };
        setQuickStats([
          {
            title: "Smart Savings",
            value: formatCurrency(data.totalBalance),
            change: data.savingDifference,
            changeType: deriveChangeType(data.savingDifference),
            icon: Target,
          },
          {
            title: "This Month",
            value: formatCurrency(data.thisMonthSpending),
            change: data.spendingDifference,
            changeType: deriveChangeType(data.spendingDifference),
            icon: TrendingUp,
          },
        ]);
      }
    } catch {}

    // Only fetch after a full browser refresh
    if (!isReloadNavigation) return;

    const fetchAndStore = async () => {
      try {
        // const res = await fetch("http://localhost:3000/api/balance", { cache: "no-store" });
        const res = await fetch("https://alat-spark.vercel.app/api/balance", { cache: "no-store" }); 
        if (!res.ok) return;
        const json = (await res.json()) as {
          totalBalance: number;
          lastMonthSpending: number;
          thisMonthSpending: number;
          savingDifference: string;
          spendingDifference: string;
        };

        // Persist in localStorage
        window.localStorage.setItem("dashboardBalance", JSON.stringify(json));

        // Update UI
        setQuickStats([
          {
            title: "Smart Savings",
            value: formatCurrency(json.totalBalance),
            change: json.savingDifference,
            changeType: deriveChangeType(json.savingDifference),
            icon: Target,
          },
          {
            title: "This Month",
            value: formatCurrency(json.thisMonthSpending),
            change: json.spendingDifference,
            changeType: deriveChangeType(json.spendingDifference),
            icon: TrendingUp,
          },
        ]);
      } catch {
        // Fail silently for now
      }
    };

    fetchAndStore();
  }, [isBrowser, isReloadNavigation]);
  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      {/* Welcome Section */}
      <Card sx={{ mb: 3, p: 3, borderRadius: 3, background: theme.custom?.gradients.primary }}>
        <CardContent>
          <Typography variant="h5" color={theme.palette.common.white} fontWeight="bold" gutterBottom>
            Welcome back!
          </Typography>
          <Typography color={theme.palette.common.white} sx={{ opacity: 0.9 }}>
            Here's your financial overview and latest insights
          </Typography>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {quickStats.map((stat, index) => (
          <Grid item xs={6} md={4} key={index}>
            <Card sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Box sx={{ mb: 1 }}>
                <stat.icon size={28} color={theme.palette.primary.main} />
              </Box>
              <Typography variant="subtitle2" color="text.secondary">
                {stat.title}
              </Typography>
              <Typography variant="h6" fontWeight="bold">
                {stat.value}
              </Typography>
              <Typography variant="caption" color={stat.changeType === 'positive' ? theme.palette.success.main : theme.palette.error.main}>
                {stat.change}
              </Typography>
            </Card>
          </Grid>
        ))}
        {/* Quick Action Card */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{ p: 2, cursor: 'pointer', background: theme.custom?.gradients.secondary }}
            onClick={() => onNavigate('banking')}
          >
            <CardContent sx={{ textAlign: 'center' }}>
              <Box sx={{ p: 1, borderRadius: '50%', bgcolor: theme.palette.primary.light, width: 40, height: 40, mx: 'auto', mb: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CreditCard size={24} color={theme.palette.primary.main} />
              </Box>
              <Typography variant="body2" color="text.primary" fontWeight={500}>
                Connect Bank
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Key Insights & Actions */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {recentInsights.map((insight, index) => (
          <Grid xs={12} md={6} xl={4} key={index}>
            <Card sx={{ p: 2 }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                  {insight.title}
                </Typography>
                <Typography variant="body2" color="primary.main" gutterBottom>
                  {insight.description}
                </Typography>
                <Button
                  component={Link}
                  href={insight.href}
                  variant="contained"
                  color="primary"
                  fullWidth
                  endIcon={<ArrowRight size={18} />}
                >
                  {insight.action}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Navigation Cards */}
      <Grid container spacing={2}>
        <Grid xs={12} md={6}>
          <Card
            sx={{ p: 2, cursor: 'pointer', background: theme.custom?.gradients.secondary }}
            onClick={() => onNavigate('transactions')}
          >
            <CardHeader
              title={
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="subtitle1" fontWeight={700} color="orange">
                    Transaction History
                  </Typography>
                  <Box sx={{ p: 1, borderRadius: '50%', bgcolor: 'orange', boxShadow: 1 }}>
                    <ArrowRight size={18} color={theme.palette.common.white} />
                  </Box>
                </Box>
              }
              subheader={<Typography variant="body2" color="orange">View all your transactions and spending patterns</Typography>}
            />
            <CardContent>
              <Typography variant="h5" fontWeight={700} color="orange">
                ₦234,560
              </Typography>
              <Typography variant="caption" color="orange">
                Total this month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12} md={6}>
          <Card
            sx={{ p: 2, cursor: 'pointer', background: theme.custom?.gradients.secondary }}
            onClick={() => onNavigate('transaction-analytics')}
          >
            <CardHeader
              title={
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="subtitle1" fontWeight={700} color="orange">
                    Analytics & Insights
                  </Typography>
                  <Box sx={{ p: 1, borderRadius: '50%', bgcolor: 'orange', boxShadow: 1 }}>
                    <ArrowRight size={18} color={theme.palette.common.white} />
                  </Box>
                </Box>
              }
              subheader={<Typography variant="body2" color="orange">Deep dive into your financial analytics</Typography>}
            />
            <CardContent>
              <Typography variant="h5" fontWeight={700} color="orange">
                94.2%
              </Typography>
              <Typography variant="caption" color="orange">
                Intelligence score
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
