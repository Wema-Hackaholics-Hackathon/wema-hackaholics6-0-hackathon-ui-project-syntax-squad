import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { LucideIcon } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string
  change: string
  changeType: 'positive' | 'negative'
  icon: LucideIcon
}

export function StatsCard({ title, value, change, changeType, icon: Icon }: StatsCardProps) {
  return (
    <Card className="hover-lift shadow-alat border-0 bg-gradient-alat-soft overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none"></div>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
        <CardTitle className="text-xs md:text-sm truncate font-medium text-[#425563]">{title}</CardTitle>
        <div className="p-2 rounded-full bg-gradient-alat shadow-alat-sm">
          <Icon className="h-3 w-3 md:h-4 md:w-4 text-white flex-shrink-0" />
        </div>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="text-lg md:text-2xl font-bold text-gradient-alat mb-1">{value}</div>
        <p className={`text-xs font-medium ${
          changeType === 'positive' 
            ? 'text-emerald-600 dark:text-emerald-400' 
            : 'text-rose-600 dark:text-rose-400'
        }`}>
          {change} from last month
        </p>
      </CardContent>
    </Card>
  )
}