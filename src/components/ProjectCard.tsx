import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Progress } from "./ui/progress"
import { Calendar, Users } from "lucide-react"

interface ProjectCardProps {
  name: string
  description: string
  progress: number
  dueDate: string
  teamSize: number
  status: 'active' | 'completed' | 'on-hold'
}

const statusColors = {
  active: 'bg-green-100 text-green-800',
  completed: 'bg-blue-100 text-blue-800',
  'on-hold': 'bg-orange-100 text-orange-800'
}

export function ProjectCard({ name, description, progress, dueDate, teamSize, status }: ProjectCardProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{name}</CardTitle>
          <Badge variant="secondary" className={statusColors[status]}>
            {status}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{dueDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{teamSize} members</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}