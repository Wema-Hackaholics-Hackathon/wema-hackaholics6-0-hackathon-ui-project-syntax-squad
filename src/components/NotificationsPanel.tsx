import { Bell, X, Check, AlertTriangle, Info, DollarSign, Users, Target } from "lucide-react"
import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { ScrollArea } from "./ui/scroll-area"

interface NotificationsPanelProps {
  isOpen: boolean
  onClose: () => void
}

interface Notification {
  id: string
  type: 'alert' | 'info' | 'success' | 'transaction'
  title: string
  message: string
  time: string
  read: boolean
  icon: any
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'alert',
    title: 'High Spending Alert',
    message: 'You\'ve spent 85% of your monthly food budget',
    time: '2 min ago',
    read: false,
    icon: AlertTriangle
  },
  {
    id: '2',
    type: 'success',
    title: 'Savings Goal Achieved',
    message: 'Congratulations! You\'ve reached your ₦50,000 emergency fund goal',
    time: '1 hour ago',
    read: false,
    icon: Target
  },
  {
    id: '3',
    type: 'transaction',
    title: 'Payment Received',
    message: 'John Doe sent you ₦15,000 for dinner split',
    time: '3 hours ago',
    read: true,
    icon: DollarSign
  },
  {
    id: '4',
    type: 'info',
    title: 'New Micro-Action Available',
    message: 'Round up spare change from 3 recent transactions (₦120 total)',
    time: '1 day ago',
    read: true,
    icon: Info
  },
  {
    id: '5',
    type: 'info',
    title: 'Bill Split Reminder',
    message: 'Electric bill due in 3 days - split with 2 roommates',
    time: '2 days ago',
    read: true,
    icon: Users
  }
]

export function NotificationsPanel({ isOpen, onClose }: NotificationsPanelProps) {
  const [notifications, setNotifications] = useState(mockNotifications)
  
  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'alert': return 'border-red-200 bg-red-50 text-red-800'
      case 'success': return 'border-green-200 bg-green-50 text-green-800'
      case 'transaction': return 'border-pink-200 bg-pink-50 text-[#AE328E]'
      default: return 'border-blue-200 bg-blue-50 text-blue-800'
    }
  }

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/20 z-[1300] md:hidden"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className="fixed top-0 right-0 h-full w-full md:w-96 bg-white border-l border-pink-200 shadow-alat-xl z-[1400] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-pink-200 bg-gradient-alat">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-white" />
              <h2 className="font-semibold text-white">Notifications</h2>
              {unreadCount > 0 && (
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  {unreadCount}
                </Badge>
              )}
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="h-8 w-8 text-white hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Actions */}
        <div className="p-4 border-b border-pink-200 bg-pink-50/30">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={markAllAsRead}
            className="w-full border-pink-200 text-[#425563] hover:bg-pink-100"
            disabled={unreadCount === 0}
          >
            <Check className="mr-2 h-4 w-4" />
            Mark all as read
          </Button>
        </div>

        {/* Notifications List */}
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-3">
            {notifications.length === 0 ? (
              <div className="text-center py-8">
                <Bell className="h-12 w-12 mx-auto text-pink-300 mb-3" />
                <p className="text-[#AE328E] font-medium">No notifications</p>
                <p className="text-[#425563] text-sm">You're all caught up!</p>
              </div>
            ) : (
              notifications.map((notification) => {
                const IconComponent = notification.icon
                return (
                  <Card 
                    key={notification.id}
                    className={`hover-lift cursor-pointer transition-all duration-200 ${
                      !notification.read ? 'border-pink-300 bg-pink-50/50' : 'border-pink-200/50'
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex gap-3">
                        <div className={`p-2 rounded-full ${getNotificationColor(notification.type)}`}>
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-1">
                            <h4 className={`text-sm font-medium truncate ${
                              !notification.read ? 'text-[#425563]' : 'text-[#425563]/80'
                            }`}>
                              {notification.title}
                            </h4>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-gradient-alat rounded-full flex-shrink-0 ml-2"></div>
                            )}
                          </div>
                          <p className="text-sm text-[#AE328E] mb-2 line-clamp-2">
                            {notification.message}
                          </p>
                          <p className="text-xs text-[#425563]/70">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })
            )}
          </div>
        </ScrollArea>
      </div>
    </>
  )
}