import { useState } from "react"
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  ChevronRight,
  Save,
  Camera
} from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Switch } from "./ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Avatar } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Separator } from "./ui/separator"

interface SettingsPageProps {
  onBack?: () => void
}

export function SettingsPage({ onBack }: SettingsPageProps) {
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState({
    transactions: true,
    insights: true,
    goals: true,
    social: false,
    marketing: false
  })
  const [showBalance, setShowBalance] = useState(true)

  const profileData = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+234 801 234 5678",
    avatar: ""
  }

  return (
    <div>
      {/* Header */}
      <div>
        <div>
          {onBack && (
            <Button variant="ghost" size="icon" onClick={onBack} className="h-8 w-8">
              <ChevronRight className="h-4 w-4 rotate-180" />
            </Button>
          )}
          <h1 className="text-2xl font-bold text-gradient-alat">Settings</h1>
        </div>
        <p className="text-[#AE328E]">Manage your account preferences and security</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-pink-50 border border-pink-200">
          <TabsTrigger value="profile" className="data-[state=active]:bg-gradient-alat data-[state=active]:text-white">
            Profile
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-gradient-alat data-[state=active]:text-white">
            Security
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-gradient-alat data-[state=active]:text-white">
            Notifications
          </TabsTrigger>
          <TabsTrigger value="preferences" className="data-[state=active]:bg-gradient-alat data-[state=active]:text-white">
            Preferences
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card className="shadow-purple border-purple-200/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-900">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Section */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  <Avatar className="h-20 w-20 ring-4 ring-orange-200 shadow-orange-sm">
{!profileData.avatar ? (
                      <span className="bg-gradient-orange text-white text-xl flex items-center justify-center w-full h-full">
                        {profileData.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    ) : null}
                  </Avatar>
                  <Button 
                    size="icon" 
                    className="absolute -bottom-2 -right-2 h-8 w-8 bg-gradient-orange shadow-orange-sm"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <div>
                  <h3 className="font-semibold text-orange-900">{profileData.name}</h3>
                  <p className="text-orange-600">Premium Member</p>
                  <Badge variant="secondary" className="mt-1 bg-orange-100 text-orange-700">
                    Verified Account
                  </Badge>
                </div>
              </div>

              <Separator className="bg-orange-200" />

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-orange-900">Full Name</Label>
                  <Input 
                    id="name" 
                    defaultValue={profileData.name}
                    className="border-orange-200 focus:border-orange-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-orange-900">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    defaultValue={profileData.email}
                    className="border-orange-200 focus:border-orange-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-orange-900">Phone Number</Label>
                  <Input 
                    id="phone" 
                    defaultValue={profileData.phone}
                    className="border-orange-200 focus:border-orange-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-orange-900">Location</Label>
                  <Select defaultValue="nigeria">
                    <SelectTrigger className="border-orange-200 focus:border-orange-400 hover:border-orange-300 transition-colors">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="z-[1600]">
                      <SelectItem value="nigeria">Nigeria</SelectItem>
                      <SelectItem value="ghana">Ghana</SelectItem>
                      <SelectItem value="kenya">Kenya</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button className="bg-gradient-orange hover:shadow-orange-md transition-all duration-300">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card className="shadow-orange border-orange-200/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-900">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Password Section */}
              <div className="space-y-4">
                <h4 className="font-medium text-orange-900">Change Password</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password" className="text-orange-900">Current Password</Label>
                    <Input 
                      id="current-password" 
                      type="password"
                      className="border-orange-200 focus:border-orange-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password" className="text-orange-900">New Password</Label>
                    <Input 
                      id="new-password" 
                      type="password"
                      className="border-orange-200 focus:border-orange-400"
                    />
                  </div>
                </div>
              </div>

              <Separator className="bg-orange-200" />

              {/* Two-Factor Authentication */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-orange-900">Two-Factor Authentication</h4>
                    <p className="text-sm text-orange-600">Add an extra layer of security to your account</p>
                  </div>
                  <Switch />
                </div>
              </div>

              <Separator className="bg-orange-200" />

              {/* Banking Security */}
              <div className="space-y-4">
                <h4 className="font-medium text-orange-900">Banking Security</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-orange-800">Transaction PIN</p>
                      <p className="text-sm text-orange-600">Required for transactions above ₦50,000</p>
                    </div>
                    <Button variant="outline" size="sm" className="border-orange-200 text-orange-700">
                      Change PIN
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-orange-800">Biometric Login</p>
                      <p className="text-sm text-orange-600">Use fingerprint or face recognition</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="shadow-orange border-orange-200/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-900">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-orange-800">Transaction Alerts</p>
                    <p className="text-sm text-orange-600">Get notified of all transactions</p>
                  </div>
                  <Switch 
                    checked={notifications.transactions}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, transactions: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-orange-800">AI Insights</p>
                    <p className="text-sm text-orange-600">Spending insights and recommendations</p>
                  </div>
                  <Switch 
                    checked={notifications.insights}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, insights: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-orange-800">Goal Reminders</p>
                    <p className="text-sm text-orange-600">Updates on savings goals and targets</p>
                  </div>
                  <Switch 
                    checked={notifications.goals}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, goals: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-orange-800">Social Payments</p>
                    <p className="text-sm text-orange-600">Bill splits and payment requests</p>
                  </div>
                  <Switch 
                    checked={notifications.social}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, social: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-orange-800">Marketing Updates</p>
                    <p className="text-sm text-orange-600">Product updates and promotions</p>
                  </div>
                  <Switch 
                    checked={notifications.marketing}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, marketing: checked }))
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences" className="space-y-6">
          <Card className="shadow-orange border-orange-200/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-900">
                <Palette className="h-5 w-5" />
                App Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-orange-800">Dark Mode</p>
                    <p className="text-sm text-orange-600">Switch to dark theme</p>
                  </div>
                  <Switch 
                    checked={darkMode}
                    onCheckedChange={setDarkMode}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-orange-800">Show Balance</p>
                    <p className="text-sm text-orange-600">Display account balance on dashboard</p>
                  </div>
                  <Switch 
                    checked={showBalance}
                    onCheckedChange={setShowBalance}
                  />
                </div>
                <div>
                  <Label htmlFor="currency" className="text-orange-900 font-medium">Default Currency</Label>
                  <Select defaultValue="ngn">
                    <SelectTrigger className="border-orange-200 focus:border-orange-400 hover:border-orange-300 transition-colors mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="z-[1600]">
                      <SelectItem value="ngn">Nigerian Naira (₦)</SelectItem>
                      <SelectItem value="usd">US Dollar ($)</SelectItem>
                      <SelectItem value="eur">Euro (€)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="language" className="text-orange-900 font-medium">Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger className="border-orange-200 focus:border-orange-400 hover:border-orange-300 transition-colors mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="z-[1600]">
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="ha">Hausa</SelectItem>
                      <SelectItem value="yo">Yoruba</SelectItem>
                      <SelectItem value="ig">Igbo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="shadow-orange border-red-200/50">
            <CardHeader>
              <CardTitle className="text-red-700">Danger Zone</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-red-800">Delete Account</p>
                  <p className="text-sm text-red-600">Permanently delete your account and all data</p>
                </div>
                <Button variant="destructive" size="sm">
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}