'use client';

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { Activity, AlertTriangle, CheckCircle2, Clock, Sparkles, TrendingUp } from "lucide-react";

export default function ViewIntelligencePage() {
  const theme = useTheme();

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Card sx={{ mb: 3, p: 3, borderRadius: 3, background: theme.custom?.gradients.primary }}>
        <CardContent>
          <Typography variant="h5" color={theme.palette.common.white} fontWeight="bold" gutterBottom>
            Payment Intelligence
          </Typography>
          <Typography color={theme.palette.common.white} sx={{ opacity: 0.9 }}>
            AI-powered insights and smart financial analysis
          </Typography>
        </CardContent>
      </Card>

      {/* AI Payment Insights */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12}>
          <Card sx={{ p: 2 }}>
            <CardContent>
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Sparkles size={18} color={theme.palette.primary.main} />
                  <Box>
                    <Typography variant="subtitle1" fontWeight={700}>AI Payment Insights</Typography>
                    <Typography variant="body2" color="text.secondary">Smart analysis of your financial patterns</Typography>
                  </Box>
                </Stack>
                <Chip label="Active" color="success" size="small" variant="outlined" />
              </Stack>

              {/* Insight Cards */}
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Card variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                    <Stack direction="row" spacing={2} alignItems="flex-start" justifyContent="space-between">
                      <Stack direction="row" spacing={1} alignItems="flex-start">
                        <Activity size={18} color={theme.palette.success.main} />
                        <Box>
                          <Typography fontWeight={600}>Optimize Software Subscriptions</Typography>
                          <Chip size="small" label="high impact" sx={{ ml: 0, mt: 0.5, bgcolor: theme.palette.error.light + '22' }} />
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            You have 3 overlapping design tools. Consolidating could save $180/month.
                          </Typography>
                          <Stack direction="row" spacing={2} sx={{ mt: 1 }} alignItems="center">
                            <Typography variant="caption" color="text.secondary">92% confidence</Typography>
                            <Stack direction="row" spacing={0.5} alignItems="center">
                              <Clock size={14} />
                              <Typography variant="caption" color="text.secondary">Updated 2h ago</Typography>
                            </Stack>
                          </Stack>
                        </Box>
                      </Stack>
                      <Button variant="outlined" endIcon={<TrendingUp size={16} />}>Take Action</Button>
                    </Stack>
                  </Card>
                </Grid>

                <Grid item xs={12}>
                  <Card variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                    <Stack direction="row" spacing={2} alignItems="flex-start" justifyContent="space-between">
                      <Stack direction="row" spacing={1} alignItems="flex-start">
                        <AlertTriangle size={18} color={theme.palette.warning.main} />
                        <Box>
                          <Typography fontWeight={600}>Unusual Spending Pattern Detected</Typography>
                          <Chip size="small" label="medium impact" sx={{ ml: 0, mt: 0.5, bgcolor: theme.palette.warning.light + '22' }} />
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            Marketing expenses are 340% above normal for this time of month.
                          </Typography>
                          <Stack direction="row" spacing={2} sx={{ mt: 1 }} alignItems="center">
                            <Typography variant="caption" color="text.secondary">87% confidence</Typography>
                            <Stack direction="row" spacing={0.5} alignItems="center">
                              <Clock size={14} />
                              <Typography variant="caption" color="text.secondary">Updated 2h ago</Typography>
                            </Stack>
                          </Stack>
                        </Box>
                      </Stack>
                      <Button variant="outlined" endIcon={<TrendingUp size={16} />}>Take Action</Button>
                    </Stack>
                  </Card>
                </Grid>

                <Grid item xs={12}>
                  <Card variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                    <Stack direction="row" spacing={2} alignItems="flex-start" justifyContent="space-between">
                      <Stack direction="row" spacing={1} alignItems="flex-start">
                        <CheckCircle2 size={18} color={theme.palette.success.main} />
                        <Box>
                          <Typography fontWeight={600}>Project Revenue Trending Up</Typography>
                          <Chip size="small" label="high impact" sx={{ ml: 0, mt: 0.5, bgcolor: theme.palette.error.light + '22' }} />
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            Client payments have increased 45% over the last quarter.
                          </Typography>
                          <Stack direction="row" spacing={2} sx={{ mt: 1 }} alignItems="center">
                            <Typography variant="caption" color="text.secondary">95% confidence</Typography>
                            <Stack direction="row" spacing={0.5} alignItems="center">
                              <Clock size={14} />
                              <Typography variant="caption" color="text.secondary">Updated 2h ago</Typography>
                            </Stack>
                          </Stack>
                        </Box>
                      </Stack>
                      <Button variant="outlined" endIcon={<TrendingUp size={16} />}>Take Action</Button>
                    </Stack>
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Smart Spending Analysis */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12}>
          <Card sx={{ p: 2 }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                <TrendingUp size={18} color={theme.palette.primary.main} />
                <Typography variant="subtitle1" fontWeight={700}>Smart Spending Analysis</Typography>
              </Stack>
              <Typography variant="body2" color="primary.main" sx={{ mb: 2 }}>AI-powered category analysis with predictions</Typography>

              {/* Category rows */}
              <Stack spacing={2}>
                {[
                  { name: 'Software & Tools', current: 850, predicted: 920, change: '+15%' },
                  { name: 'Marketing', current: 2500, predicted: 2800, change: '+45%' },
                  { name: 'Office Expenses', current: 320, predicted: 315, change: '+5%' },
                  { name: 'Professional Services', current: 1200, predicted: 1050, change: '-12%' },
                ].map((row) => (
                  <Box key={row.name} sx={{ p: 2, borderRadius: 2, border: `1px solid ${theme.palette.divider}` }}>
                    <Grid container alignItems="center">
                      <Grid item xs={7}>
                        <Typography fontWeight={600}>{row.name}</Typography>
                        <Stack direction="row" spacing={3} sx={{ mt: 0.5 }}>
                          <Typography variant="caption" color="text.secondary">Current: ${row.current}</Typography>
                          <Typography variant="caption" color="text.secondary">Predicted: ${row.predicted}</Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={5}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Typography fontWeight={700}>${row.current.toLocaleString()}</Typography>
                          <Typography variant="body2" color={row.change.startsWith('-') ? theme.palette.success.main : theme.palette.error.main}>{row.change}</Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Smart Recommendations */}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card sx={{ p: 2 }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                <Sparkles size={18} color={theme.palette.primary.main} />
                <Typography variant="subtitle1" fontWeight={700}>Smart Recommendations</Typography>
              </Stack>

              <Stack spacing={2}>
                <Box sx={{ p: 2, borderRadius: 2, bgcolor: theme.palette.success.light + '22', border: `1px solid ${theme.palette.success.light}` }}>
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={8}>
                      <Typography fontWeight={600}>Set up automatic savings</Typography>
                      <Typography variant="body2" color="text.secondary">Save $500/month based on surplus prediction</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Button fullWidth variant="outlined" color="success">Enable</Button>
                    </Grid>
                  </Grid>
                </Box>

                <Box sx={{ p: 2, borderRadius: 2, bgcolor: theme.palette.info.light + '22', border: `1px solid ${theme.palette.info.light}` }}>
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={8}>
                      <Typography fontWeight={600}>Optimize payment timing</Typography>
                      <Typography variant="body2" color="text.secondary">Schedule payments to improve cash flow</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Button fullWidth variant="outlined">Setup</Button>
                    </Grid>
                  </Grid>
                </Box>

                <Box sx={{ p: 2, borderRadius: 2, bgcolor: theme.palette.warning.light + '22', border: `1px solid ${theme.palette.warning.light}` }}>
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={8}>
                      <Typography fontWeight={600}>Review duplicate subscriptions</Typography>
                      <Typography variant="body2" color="text.secondary">3 potential duplicates found</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Button fullWidth variant="outlined" color="warning">Review</Button>
                    </Grid>
                  </Grid>
                </Box>
              </Stack>

              <Divider sx={{ my: 2 }} />
              <Button component={Link} href="/" variant="outlined">Back to Home</Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}


