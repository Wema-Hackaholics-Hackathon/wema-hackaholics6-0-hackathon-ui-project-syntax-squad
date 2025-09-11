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
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Switch from "@mui/material/Switch";
import { BadgeDollarSign, Bolt, CheckCircle2, Plus, Sparkles, Target } from "lucide-react";

export default function CreateActionPage() {
  const theme = useTheme();

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Card sx={{ mb: 3, p: 3, borderRadius: 3, background: theme.custom?.gradients.primary }}>
        <CardContent>
          <Typography variant="h5" color={theme.palette.common.white} fontWeight="bold" gutterBottom>
            Micro-Action Triggers
          </Typography>
          <Typography color={theme.palette.common.white} sx={{ opacity: 0.9 }}>
            Automated savings and smart financial actions
          </Typography>
        </CardContent>
      </Card>

      {/* Micro-Action Triggers header */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12}>
          <Card sx={{ p: 2 }}>
            <CardContent>
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Bolt size={18} color={theme.palette.primary.main} />
                  <Box>
                    <Typography variant="subtitle1" fontWeight={700}>Micro-Action Triggers</Typography>
                    <Typography variant="body2" color="primary.main">Automatic savings based on your spending patterns</Typography>
                  </Box>
                </Stack>
                <Button startIcon={<Plus size={16} />} variant="outlined">New Rule</Button>
              </Stack>

              {/* Trigger Cards */}
              <Stack spacing={2}>
                {/* Coffee Round-Up */}
                <Card variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={8}>
                      <Stack direction="row" spacing={2}>
                        <Box sx={{ width: 36, height: 36, borderRadius: '50%', bgcolor: theme.palette.success.light + '33', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <BadgeDollarSign size={18} color={theme.palette.success.main} />
                        </Box>
                        <Box>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Typography fontWeight={700}>Coffee Round-Up</Typography>
                            <Typography variant="caption" color="text.secondary">Round-Up Savings</Typography>
                            <Chip size="small" label="Active" color="success" variant="outlined" />
                          </Stack>
                          <Typography variant="body2" color="primary.main" sx={{ mt: 0.5 }}>
                            Round up coffee purchases to the nearest ₦100 and save the difference
                          </Typography>
                          <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                            <Typography variant="caption" color="text.secondary">Trigger: Coffee/Restaurant purchases</Typography>
                            <Typography variant="caption" color="text.secondary">Total saved: ₦2,450.00</Typography>
                          </Stack>
                        </Box>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                      <Button variant="outlined">Edit</Button>
                    </Grid>
                  </Grid>
                </Card>

                {/* Fuel Efficiency Bonus */}
                <Card variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={8}>
                      <Stack direction="row" spacing={2}>
                        <Box sx={{ width: 36, height: 36, borderRadius: '50%', bgcolor: theme.palette.info.light + '33', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Sparkles size={18} color={theme.palette.info.main} />
                        </Box>
                        <Box>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Typography fontWeight={700}>Fuel Efficiency Bonus</Typography>
                            <Typography variant="caption" color="text.secondary">Bonus Savings</Typography>
                            <Chip size="small" label="Active" color="success" variant="outlined" />
                          </Stack>
                          <Typography variant="body2" color="primary.main" sx={{ mt: 0.5 }}>
                            Save ₦200 every time you spend less than ₦15,000 on fuel
                          </Typography>
                          <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                            <Typography variant="caption" color="text.secondary">Trigger: Fuel purchase &lt; ₦15,000</Typography>
                            <Typography variant="caption" color="text.secondary">Total saved: ₦1,800.00</Typography>
                          </Stack>
                        </Box>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                      <Button variant="outlined">Edit</Button>
                    </Grid>
                  </Grid>
                </Card>

                {/* Shopping Limit Reward */}
                <Card variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={8}>
                      <Stack direction="row" spacing={2}>
                        <Box sx={{ width: 36, height: 36, borderRadius: '50%', bgcolor: theme.palette.grey[200], display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Target size={18} color={theme.palette.text.secondary} />
                        </Box>
                        <Box>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Typography fontWeight={700}>Shopping Limit Reward</Typography>
                            <Typography variant="caption" color="text.secondary">Goal-Based</Typography>
                          </Stack>
                          <Typography variant="body2" color="primary.main" sx={{ mt: 0.5 }}>
                            Save 5% when grocery spending stays under ₦25,000/week
                          </Typography>
                          <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                            <Typography variant="caption" color="text.secondary">Trigger: Weekly grocery &lt; ₦25,000</Typography>
                            <Typography variant="caption" color="text.secondary">Total saved: ₦0.00</Typography>
                          </Stack>
                        </Box>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'space-between', md: 'flex-end' }, gap: 1 }}>
                      <Switch color="primary" />
                      <Button variant="outlined">Edit</Button>
                    </Grid>
                  </Grid>
                </Card>

                {/* Weekend Surplus */}
                <Card variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={8}>
                      <Stack direction="row" spacing={2}>
                        <Box sx={{ width: 36, height: 36, borderRadius: '50%', bgcolor: theme.palette.success.light + '33', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <CheckCircle2 size={18} color={theme.palette.success.main} />
                        </Box>
                        <Box>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Typography fontWeight={700}>Weekend Surplus</Typography>
                            <Typography variant="caption" color="text.secondary">Budget-Based</Typography>
                            <Chip size="small" label="Active" color="success" variant="outlined" />
                          </Stack>
                          <Typography variant="body2" color="primary.main" sx={{ mt: 0.5 }}>
                            Transfer any unspent weekend budget to savings on Monday
                          </Typography>
                          <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                            <Typography variant="caption" color="text.secondary">Trigger: Monday morning</Typography>
                            <Typography variant="caption" color="text.secondary">Total saved: ₦5,200.00</Typography>
                          </Stack>
                        </Box>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                      <Button variant="outlined">Edit</Button>
                    </Grid>
                  </Grid>
                </Card>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Linked Savings Goals */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12}>
          <Card sx={{ p: 2 }}>
            <CardContent>
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Target size={18} color={theme.palette.primary.main} />
                  <Box>
                    <Typography variant="subtitle1" fontWeight={700}>Linked Savings Goals</Typography>
                    <Typography variant="body2" color="text.secondary">Goals connected to your micro-actions</Typography>
                  </Box>
                </Stack>
                <Button startIcon={<Plus size={16} />} variant="outlined">New Goal</Button>
              </Stack>

              {/* Goals list */}
              <Stack spacing={2}>
                <Card variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                  <Grid container>
                    <Grid item xs={12} md={8}>
                      <Typography fontWeight={700}>Emergency Fund</Typography>
                      <Stack direction="row" spacing={2} sx={{ mt: 0.5 }}>
                        <Typography variant="caption" color="text.secondary">Target: Dec 2025</Typography>
                        <Typography variant="caption" color="text.secondary">3 micro-actions linked</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ height: '100%' }}>
                        <Typography fontWeight={700}>₦125,000.00</Typography>
                        <Typography variant="body2" color="text.secondary">of ₦500,000.00</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>25% complete   ₦375,000.00 remaining</Typography>
                </Card>

                <Card variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                  <Grid container>
                    <Grid item xs={12} md={8}>
                      <Typography fontWeight={700}>New Laptop</Typography>
                      <Stack direction="row" spacing={2} sx={{ mt: 0.5 }}>
                        <Typography variant="caption" color="text.secondary">Target: Mar 2025</Typography>
                        <Typography variant="caption" color="text.secondary">2 micro-actions linked</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ height: '100%' }}>
                        <Typography fontWeight={700}>₦340,000.00</Typography>
                        <Typography variant="body2" color="text.secondary">of ₦850,000.00</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>40% complete   ₦510,000.00 remaining</Typography>
                </Card>

                <Card variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                  <Grid container>
                    <Grid item xs={12} md={8}>
                      <Typography fontWeight={700}>Vacation Fund</Typography>
                      <Stack direction="row" spacing={2} sx={{ mt: 0.5 }}>
                        <Typography variant="caption" color="text.secondary">Target: Jun 2025</Typography>
                        <Typography variant="caption" color="text.secondary">1 micro-action linked</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ height: '100%' }}>
                        <Typography fontWeight={700}>₦89,000.00</Typography>
                        <Typography variant="body2" color="text.secondary">of ₦300,000.00</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>30% complete   ₦211,000.00 remaining</Typography>
                </Card>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Performance */}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card sx={{ p: 2 }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                <Sparkles size={18} color={theme.palette.primary.main} />
                <Typography variant="subtitle1" fontWeight={700}>Micro-Actions Performance</Typography>
              </Stack>
              <Grid container spacing={2}>
                {[{ label: 'Total Saved', value: '₦9,450', color: theme.palette.success.light }, { label: 'Actions This Month', value: '47', color: theme.palette.info.light }, { label: 'Avg. Monthly', value: '₦1,890', color: theme.palette.secondary.light }].map((kpi) => (
                  <Grid item xs={12} md={4} key={kpi.label}>
                    <Box sx={{ p: 2, borderRadius: 2, border: `1px solid ${theme.palette.divider}`, bgcolor: kpi.color + '22' }}>
                      <Typography variant="h6" fontWeight={700}>{kpi.value}</Typography>
                      <Typography variant="body2" color="text.secondary">{kpi.label}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
              <Divider sx={{ my: 2 }} />
              <Button component={Link} href="/" variant="outlined">Back to Home</Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}


