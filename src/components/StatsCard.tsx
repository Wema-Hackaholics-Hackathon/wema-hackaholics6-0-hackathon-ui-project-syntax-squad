import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  icon: LucideIcon;
}

export function StatsCard({ title, value, change, changeType, icon: Icon }: StatsCardProps) {
  return (
    <Card sx={{ p: 2, position: 'relative', overflow: 'hidden', background: (theme) => theme.custom?.gradients.soft }}>
      <CardContent sx={{ p: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="subtitle2" color="text.secondary" noWrap fontWeight={500}>
            {title}
          </Typography>
          <Box sx={{ p: 1, borderRadius: '50%', bgcolor: 'primary.main', boxShadow: 1 }}>
            <Icon size={16} color="#fff" />
          </Box>
        </Box>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 0.5, color: 'primary.main' }}>
          {value}
        </Typography>
        <Typography
          variant="caption"
          fontWeight={500}
          color={changeType === 'positive' ? 'success.main' : 'error.main'}
        >
          {change} from last month
        </Typography>
      </CardContent>
    </Card>
  );
}
