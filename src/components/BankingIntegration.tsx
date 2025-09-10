import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { 
  CreditCard, 
  Plus, 
  CheckCircle, 
  AlertCircle, 
  Star,
  Shield,
  Zap,
  Building2
} from "lucide-react"

interface BankConnection {
  id: string
  name: string
  logo: string
  status: 'connected' | 'pending' | 'error'
  accountType: string
  lastSync: string
  balance?: string
  isPriority?: boolean
}

const bankConnections: BankConnection[] = [
  {
    id: "wema",
    name: "ALAT by Wema",
    logo: "🏦",
    status: "connected",
    accountType: "Savings Account",
    lastSync: "2 min ago",
    balance: "₦125,450.00",
    isPriority: true
  },
  {
    id: "gtb",
    name: "GTBank",
    logo: "🏛️",
    status: "pending",
    accountType: "Current Account",
    lastSync: "Pending connection",
  },
  {
    id: "access",
    name: "Access Bank",
    logo: "🏢",
    status: "error",
    accountType: "Savings Account",
    lastSync: "Connection failed",
  }
]

const availableBanks = [
  { name: "First Bank", logo: "🏦", supported: true },
  { name: "UBA", logo: "🏛️", supported: true },
  { name: "Zenith Bank", logo: "🏢", supported: true },
  { name: "Fidelity Bank", logo: "🏦", supported: false },
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'connected':
      return <CheckCircle className="h-4 w-4 text-green-600" />
    case 'pending':
      return <AlertCircle className="h-4 w-4 text-yellow-600" />
    case 'error':
      return <AlertCircle className="h-4 w-4 text-red-600" />
    default:
      return null
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'connected':
      return 'bg-green-100 text-green-800'
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'error':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export function BankingIntegration() {
  return (
    <div className="space-y-6">
      {/* Connected Banks */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Connected Banks
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Manage your bank account connections
            </p>
          </div>
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Add Bank
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {bankConnections.map((bank) => (
              <div key={bank.id} className="flex items-center justify-between p-4 rounded-lg border bg-card">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="text-2xl">{bank.logo}</div>
                    {bank.isPriority && (
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{bank.name}</h4>
                      {bank.isPriority && (
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 text-xs">
                          Priority Partner
                        </Badge>
                      )}
                      <Badge variant="secondary" className={getStatusColor(bank.status)}>
                        {getStatusIcon(bank.status)}
                        <span className="ml-1 capitalize">{bank.status}</span>
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{bank.accountType}</span>
                      <span>•</span>
                      <span>Last sync: {bank.lastSync}</span>
                    </div>
                    {bank.balance && (
                      <p className="text-sm font-medium text-green-600 mt-1">
                        Balance: {bank.balance}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {bank.status === 'connected' && (
                    <Button variant="ghost" size="sm">
                      <Zap className="h-4 w-4 mr-1" />
                      Sync
                    </Button>
                  )}
                  {bank.status === 'error' && (
                    <Button variant="outline" size="sm">
                      Retry
                    </Button>
                  )}
                  {bank.status === 'pending' && (
                    <Button variant="outline" size="sm">
                      Complete
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ALAT Priority Integration */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-800">
            <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
            ALAT Premium Integration
          </CardTitle>
          <p className="text-sm text-yellow-700">
            Enhanced features available with ALAT by Wema Bank
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Shield className="h-4 w-4 text-green-600" />
              <span>Real-time transaction categorization</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Zap className="h-4 w-4 text-green-600" />
              <span>Instant micro-savings automation</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Building2 className="h-4 w-4 text-green-600" />
              <span>Advanced business analytics</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>Priority customer support</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Banks */}
      <Card>
        <CardHeader>
          <CardTitle>Available Banks</CardTitle>
          <p className="text-sm text-muted-foreground">
            Connect with more financial institutions
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {availableBanks.map((bank, index) => (
              <div 
                key={index} 
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  bank.supported 
                    ? 'bg-card hover:bg-accent/50 cursor-pointer' 
                    : 'bg-muted cursor-not-allowed opacity-60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{bank.logo}</span>
                  <span className="font-medium text-sm">{bank.name}</span>
                </div>
                {bank.supported ? (
                  <Button variant="ghost" size="sm">
                    Connect
                  </Button>
                ) : (
                  <span className="text-xs text-muted-foreground">Coming Soon</span>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}