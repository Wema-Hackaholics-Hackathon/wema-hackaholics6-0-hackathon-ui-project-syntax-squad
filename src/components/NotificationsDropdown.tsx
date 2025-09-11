'use client'

import { Bell, Check, AlertTriangle, Info, DollarSign, Users, Target } from "lucide-react"
import { useState } from "react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Dropdown, DropdownContent, DropdownItem, DropdownSeparator, DropdownHeader } from "./ui/dropdown"

interface NotificationsDropdownProps {
  trigger: React.ReactElement
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

interface Notification {
  id: string
  type: 'alert' | 'info' | 'success' | 'transaction'
  title: string
  message: string
  time: string
  read: boolean
  icon: React.ComponentType<{ className?: string }>
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

export function NotificationsDropdown({ trigger, isOpen, onOpenChange }: NotificationsDropdownProps) {
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

  const getNotificationIcon = (type: string) => {
    const iconClasses = {
      alert: 'text-red-600 bg-red-50',
      success: 'text-green-600 bg-green-50',
      transaction: 'text-[#AE328E] bg-pink-50',
      info: 'text-blue-600 bg-blue-50'
    }
    return iconClasses[type as keyof typeof iconClasses] || iconClasses.info
  }

  return (
    <Dropdown
      trigger={trigger}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      align="right"
      className="w-96"
    >
      <DropdownContent className="p-0">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#AE328E] to-[#c13a9e] text-white rounded-t-lg">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            <span className="font-semibold">Notifications</span>
            {unreadCount > 0 && (
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                {unreadCount}
              </Badge>
            )}
          </div>
        </div>

        {/* Mark all as read */}
        {unreadCount > 0 && (
          <div className="p-3 border-b border-gray-100">
            <Button
              variant="outline"
              size="sm"
              onClick={markAllAsRead}
              className="w-full text-xs border-gray-200 hover:bg-gray-50"
            >
              <Check className="mr-2 h-3 w-3" />
              Mark all as read
            </Button>
          </div>
        )}

        {/* Notifications List */}
        <div className="max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="text-center py-8 px-4">
              <Bell className="h-12 w-12 mx-auto text-gray-300 mb-3" />
              <p className="text-gray-600 font-medium">No notifications</p>
              <p className="text-gray-500 text-sm">You're all caught up!</p>
            </div>
          ) : (
            notifications.map((notification) => {
              const IconComponent = notification.icon
              return (
                <DropdownItem
                  key={notification.id}
                  onClick={() => markAsRead(notification.id)}
                  className={`p-4 cursor-pointer transition-colors ${
                    !notification.read 
                      ? 'bg-gradient-to-r from-pink-50/50 to-transparent border-l-2 border-l-[#AE328E]' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex gap-3 w-full">
                    <div className={`p-2 rounded-full flex-shrink-0 ${getNotificationIcon(notification.type)}`}>
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className={`text-sm font-medium truncate ${
                          !notification.read ? 'text-gray-900' : 'text-gray-700'
                        }`}>
                          {notification.title}
                        </h4>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-[#AE328E] rounded-full flex-shrink-0 ml-2"></div>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2 leading-relaxed">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                </DropdownItem>
              )
            })
          )}
        </div>
      </DropdownContent>
    </Dropdown>
  )
}