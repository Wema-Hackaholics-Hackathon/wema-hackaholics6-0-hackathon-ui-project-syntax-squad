import { 
  HelpCircle, 
  MessageCircle, 
  Phone, 
  Mail, 
  Search, 
  ChevronRight,
  ExternalLink,
  BookOpen,
  Video,
  FileText
} from "lucide-react"
import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Badge } from "./ui/badge"
import { Separator } from "./ui/separator"

interface HelpCenterProps {
  onBack?: () => void
}

const helpCategories = [
  {
    title: "Getting Started",
    icon: BookOpen,
    articles: [
      "Setting up your Alat spark account",
      "Connecting your ALAT bank account",
      "Understanding your dashboard",
      "First transaction insights"
    ]
  },
  {
    title: "Payment Intelligence",
    icon: HelpCircle,
    articles: [
      "How AI categorizes your transactions",
      "Understanding spending insights",
      "Setting up smart alerts",
      "Reading your financial health score"
    ]
  },
  {
    title: "Micro-Actions",
    icon: Video,
    articles: [
      "Setting up automatic savings",
      "Round-up transactions",
      "Creating savings goals",
      "Managing automated actions"
    ]
  },
  {
    title: "Social Payments",
    icon: FileText,
    articles: [
      "Splitting bills with friends",
      "Sending payment requests",
      "Managing group expenses",
      "Social payment privacy"
    ]
  }
]

const faqItems = [
  {
    question: "How secure is my banking information?",
    answer: "We use bank-grade encryption and never store your login credentials. All data is encrypted in transit and at rest."
  },
  {
    question: "Can I disconnect my bank account anytime?",
    answer: "Yes, you can disconnect your accounts at any time from the Banking section in Settings."
  },
  {
    question: "How accurate are the AI insights?",
    answer: "Our AI achieves 95%+ accuracy in categorization and continuously learns from your spending patterns."
  },
  {
    question: "Is there a fee for using Alat spark?",
    answer: "Basic features are free. Premium features require a subscription starting at ₦2,500/month."
  }
]

export function HelpCenter({ onBack }: HelpCenterProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const filteredFaqs = faqItems.filter(item => 
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          {onBack && (
            <Button variant="ghost" size="icon" onClick={onBack} className="h-8 w-8">
              <ChevronRight className="h-4 w-4 rotate-180" />
            </Button>
          )}
          <h1 className="text-2xl font-bold text-gradient-orange">Help Center</h1>
        </div>
        <p className="text-orange-600">Get help and find answers to your questions</p>
      </div>

      {/* Search */}
      <Card className="shadow-orange border-orange-200/50">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-orange-500" />
            <Input
              placeholder="Search for help articles, FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-base border-orange-200 focus:border-orange-400"
            />
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover-lift shadow-orange border-orange-200/50 cursor-pointer">
          <CardContent className="p-6 text-center">
            <div className="p-3 rounded-full bg-gradient-orange w-fit mx-auto mb-4">
              <MessageCircle className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold text-orange-900 mb-2">Live Chat</h3>
            <p className="text-sm text-orange-600 mb-4">Chat with our support team</p>
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              Available 24/7
            </Badge>
          </CardContent>
        </Card>

        <Card className="hover-lift shadow-orange border-orange-200/50 cursor-pointer">
          <CardContent className="p-6 text-center">
            <div className="p-3 rounded-full bg-gradient-orange-secondary w-fit mx-auto mb-4">
              <Phone className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold text-orange-900 mb-2">Phone Support</h3>
            <p className="text-sm text-orange-600 mb-4">Call us for urgent issues</p>
            <Badge variant="secondary" className="bg-orange-100 text-orange-700">
              +234 800 SPEND
            </Badge>
          </CardContent>
        </Card>

        <Card className="hover-lift shadow-orange border-orange-200/50 cursor-pointer">
          <CardContent className="p-6 text-center">
            <div className="p-3 rounded-full bg-gradient-orange-soft w-fit mx-auto mb-4">
              <Mail className="h-6 w-6 text-orange-700" />
            </div>
            <h3 className="font-semibold text-orange-900 mb-2">Email Support</h3>
            <p className="text-sm text-orange-600 mb-4">Send us a detailed message</p>
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              Response in 2hrs
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Help Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {helpCategories.map((category, index) => {
          const IconComponent = category.icon
          return (
            <Card key={index} className="shadow-orange border-orange-200/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-orange-900">
                  <div className="p-2 rounded-lg bg-orange-100">
                    <IconComponent className="h-5 w-5 text-orange-600" />
                  </div>
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {category.articles.map((article, articleIndex) => (
                  <div 
                    key={articleIndex}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-orange-50 cursor-pointer transition-colors"
                  >
                    <p className="text-sm text-orange-700">{article}</p>
                    <ChevronRight className="h-4 w-4 text-orange-400" />
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full mt-3 border-orange-200 text-orange-700">
                  View All Articles
                  <ExternalLink className="ml-2 h-3 w-3" />
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* FAQ Section */}
      <Card className="shadow-orange border-orange-200/50">
        <CardHeader>
          <CardTitle className="text-orange-900">Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <div key={index} className="border border-orange-200 rounded-lg">
              <button
                className="w-full p-4 text-left hover:bg-orange-50 transition-colors"
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-orange-900">{faq.question}</h4>
                  <ChevronRight 
                    className={`h-4 w-4 text-orange-400 transition-transform ${
                      expandedFaq === index ? 'rotate-90' : ''
                    }`} 
                  />
                </div>
              </button>
              {expandedFaq === index && (
                <div className="px-4 pb-4">
                  <Separator className="mb-3 bg-orange-200" />
                  <p className="text-sm text-orange-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Contact Section */}
      <Card className="shadow-orange border-orange-200/50 bg-gradient-to-r from-orange-50 to-orange-100/50">
        <CardContent className="p-6 text-center">
          <h3 className="font-semibold text-orange-900 mb-2">Still need help?</h3>
          <p className="text-orange-600 mb-4">Our support team is here to assist you</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button className="bg-gradient-orange hover:shadow-orange-md">
              <MessageCircle className="mr-2 h-4 w-4" />
              Start Live Chat
            </Button>
            <Button variant="outline" className="border-orange-200 text-orange-700">
              <Mail className="mr-2 h-4 w-4" />
              Send Email
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}