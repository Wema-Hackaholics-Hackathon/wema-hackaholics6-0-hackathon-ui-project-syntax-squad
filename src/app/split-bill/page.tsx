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
import { Users, Plus, Receipt, CheckCircle2, Clock, ArrowRight } from "lucide-react";

export default function SplitBillPage() {
  const theme = useTheme();

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Card sx={{ mb: 3, p: 3, borderRadius: 3, background: theme.custom?.gradients.primary }}>
        <CardContent>
          <Typography variant="h5" color={theme.palette.common.white} fontWeight="bold" gutterBottom>
            Social Payments
          </Typography>
          <Typography color={theme.palette.common.white} sx={{ opacity: 0.9 }}>
            Collaborative spending and bill splitting made easy
          </Typography>
        </CardContent>
      </Card>

      {/* Bill Splitting section */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12}>
          <Card sx={{ p: 2 }}>
            <CardContent>
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Users size={18} color={theme.palette.primary.main} />
                  <Box>
                    <Typography variant="subtitle1" fontWeight={700}>Bill Splitting</Typography>
                    <Typography variant="body2" color="primary.main">Split expenses with friends and colleagues</Typography>
                  </Box>
                </Stack>
                <Button startIcon={<Plus size={16} />} variant="outlined">Split Bill</Button>
              </Stack>

              <Stack spacing={2}>
                {/* Team Lunch */}
                <Card variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={8}>
                      <Stack direction="row" spacing={2}>
                        <Box sx={{ width: 36, height: 36, borderRadius: '50%', bgcolor: theme.palette.info.light + '33', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Receipt size={18} color={theme.palette.info.main} />
                        </Box>
                        <Box>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Typography fontWeight={700}>Team Lunch at Ocean Basket</Typography>
                            <Chip label="Pending" size="small" sx={{ bgcolor: theme.palette.error.light + '22' }} />
                          </Stack>
                          <Stack direction="row" spacing={2} sx={{ mt: 0.5 }}>
                            <Typography variant="caption" color="text.secondary">₦45,000.00</Typography>
                            <Typography variant="caption" color="text.secondary">• 4 people</Typography>
                            <Typography variant="caption" color="text.secondary">• Created by Sarah Chen</Typography>
                            <Typography variant="caption" color="text.secondary">• Due Dec 10, 2024</Typography>
                          </Stack>
                          <Typography variant="body2" color="primary.main" sx={{ mt: 1 }}>Your share: ₦11,250.00</Typography>
                        </Box>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                      <Button variant="outlined">Pay Share</Button>
                    </Grid>
                  </Grid>
                </Card>

                {/* Office WiFi */}
                <Card variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={8}>
                      <Stack direction="row" spacing={2}>
                        <Box sx={{ width: 36, height: 36, borderRadius: '50%', bgcolor: theme.palette.warning.light + '33', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Receipt size={18} color={theme.palette.warning.main} />
                        </Box>
                        <Box>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Typography fontWeight={700}>Office WiFi - December</Typography>
                            <Chip label="Partial" size="small" sx={{ bgcolor: theme.palette.warning.light + '22' }} />
                          </Stack>
                          <Stack direction="row" spacing={2} sx={{ mt: 0.5 }}>
                            <Typography variant="caption" color="text.secondary">₦25,000.00</Typography>
                            <Typography variant="caption" color="text.secondary">• 8 people</Typography>
                            <Typography variant="caption" color="text.secondary">• Created by Mike Wilson</Typography>
                            <Typography variant="caption" color="text.secondary">• Due Dec 15, 2024</Typography>
                          </Stack>
                          <Typography variant="body2" color="primary.main" sx={{ mt: 1 }}>Your share: ₦3,125.00</Typography>
                        </Box>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                      <Button variant="outlined">View Details</Button>
                    </Grid>
                  </Grid>
                </Card>

                {/* Uber to Conference */}
                <Card variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={8}>
                      <Stack direction="row" spacing={2}>
                        <Box sx={{ width: 36, height: 36, borderRadius: '50%', bgcolor: theme.palette.success.light + '33', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Receipt size={18} color={theme.palette.success.main} />
                        </Box>
                        <Box>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Typography fontWeight={700}>Uber to Conference</Typography>
                            <Chip label="Completed" size="small" color="success" variant="outlined" />
                          </Stack>
                          <Stack direction="row" spacing={2} sx={{ mt: 0.5 }}>
                            <Typography variant="caption" color="text.secondary">₦8,500.00</Typography>
                            <Typography variant="caption" color="text.secondary">• 3 people</Typography>
                            <Typography variant="caption" color="text.secondary">• Created by You</Typography>
                            <Typography variant="caption" color="text.secondary">• Due Dec 5, 2024</Typography>
                          </Stack>
                          <Typography variant="body2" color="primary.main" sx={{ mt: 1 }}>Your share: ₦2,833.00</Typography>
                        </Box>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                      <Button variant="outlined">View Details</Button>
                    </Grid>
                  </Grid>
                </Card>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Social Activity KPIs */}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card sx={{ p: 2 }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                <Users size={18} color={theme.palette.primary.main} />
                <Typography variant="subtitle1" fontWeight={700}>Social Activity</Typography>
              </Stack>
              <Grid container spacing={2}>
                {[{ label: 'Bills Split', value: '15' }, { label: 'Group Savings', value: '₦37K' }, { label: 'Active Friends', value: '8' }].map((kpi) => (
                  <Grid item xs={12} md={4} key={kpi.label}>
                    <Box sx={{ p: 2, borderRadius: 2, border: `1px solid ${theme.palette.divider}`, bgcolor: theme.palette.background.paper }}>
                      <Typography variant="h6" fontWeight={700}>{kpi.value}</Typography>
                      <Typography variant="body2" color="text.secondary">{kpi.label}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
              <Divider sx={{ my: 2 }} />
              <Button component={Link} href="/" variant="outlined" endIcon={<ArrowRight size={16} />}>Back to Home</Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}


