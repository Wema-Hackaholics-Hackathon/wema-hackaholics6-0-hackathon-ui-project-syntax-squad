import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { Badge } from "./ui/badge"

const activities = [
  {
    id: 1,
    user: "Alex Johnson",
    action: "completed task",
    target: "Update homepage design",
    time: "2 hours ago",
    status: "completed"
  },
  {
    id: 2,
    user: "Sarah Chen",
    action: "created",
    target: "New project proposal",
    time: "4 hours ago",
    status: "new"
  },
  {
    id: 3,
    user: "Mike Wilson",
    action: "reviewed",
    target: "Q4 Marketing Campaign",
    time: "6 hours ago",
    status: "in-review"
  },
  {
    id: 4,
    user: "Emma Davis",
    action: "updated",
    target: "Client requirements doc",
    time: "1 day ago",
    status: "updated"
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800'
    case 'new':
      return 'bg-blue-100 text-blue-800'
    case 'in-review':
      return 'bg-yellow-100 text-yellow-800'
    case 'updated':
      return 'bg-purple-100 text-purple-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-4">
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  {activity.user.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm">
                  <span>{activity.user}</span> {activity.action}{' '}
                  <span className="text-muted-foreground">{activity.target}</span>
                </p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
              <Badge variant="secondary" className={getStatusColor(activity.status)}>
                {activity.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}