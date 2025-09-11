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
    <Card sx={{ 
      p: 2, 
      position: 'relative', 
      overflow: 'hidden', 
      background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(254,249,252,0.9) 100%)',
      border: '1px solid rgba(174, 50, 142, 0.1)',
      borderRadius: 3,
      backdropFilter: 'blur(10px)',
      boxShadow: '0 4px 20px rgba(174, 50, 142, 0.08)',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 30px rgba(174, 50, 142, 0.15)',
        border: '1px solid rgba(174, 50, 142, 0.2)',
      }
    }}>
      <CardContent sx={{ p: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography 
            variant="subtitle2" 
            sx={{ 
              color: '#425563', 
              fontWeight: 600,
              fontSize: '0.875rem',
              letterSpacing: '0.02em'
            }}
            noWrap
          >
            {title}
          </Typography>
          <Box sx={{ 
            p: 1.5, 
            borderRadius: 2, 
            background: 'linear-gradient(135deg, #AE328E 0%, #c13a9e 100%)', 
            boxShadow: '0 4px 12px rgba(174, 50, 142, 0.25)'
          }}>
            <Icon size={18} color="#ffffff" />
          </Box>
        </Box>
        <Typography 
          variant="h5" 
          fontWeight={700} 
          sx={{ 
            mb: 1,
            background: 'linear-gradient(135deg, #AE328E 0%, #c13a9e 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {value}
        </Typography>
        <Typography
          variant="body2"
          fontWeight={500}
          sx={{
            color: changeType === 'positive' ? '#10b981' : '#ef4444',
            fontSize: '0.8rem'
          }}
        >
          {change} from last month
        </Typography>
      </CardContent>
    </Card>
  );
}
