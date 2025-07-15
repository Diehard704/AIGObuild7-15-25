'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { M3Button } from '@/components/ui/m3-button'
import { M3Card, M3CardContent } from '@/components/ui/m3-card'
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  Crown,
  Zap,
  Star,
  ArrowRight,
  Lightbulb,
  Target,
  Wand2,
  CreditCard,
  TrendingUp,
  Eye,
  Palette,
  Code,
  Rocket,
  Shield,
  Bot
} from 'lucide-react'

interface DeepSeekMessage {
  id: string
  type: 'user' | 'bot'
  content: string
  timestamp: Date
  upsellData?: {
    feature: string
    price: number
    savings?: string
    urgency?: string
    cta: string
  }
}

interface UpsellTrigger {
  context: string
  condition: (userMessage: string, appData?: any) => boolean
  response: (userMessage: string, appData?: any) => DeepSeekMessage
}

export function DeepSeekUpsellBot({ 
  generatedApp, 
  userTier = 'free',
  onUpgrade,
  isVisible = false,
  onToggle 
}: {
  generatedApp?: any
  userTier?: 'free' | 'pro' | 'enterprise'
  onUpgrade?: (feature: string, price: number) => void
  isVisible?: boolean
  onToggle?: () => void
}) {
  const [messages, setMessages] = useState<DeepSeekMessage[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const messagesRef = useRef<HTMLDivElement>(null)
  const [conversationContext, setConversationContext] = useState<string[]>([])

  // Smart upselling triggers based on user behavior
  const upsellTriggers: UpsellTrigger[] = [
    {
      context: 'design_help',
      condition: (msg) => msg.toLowerCase().includes('design') || msg.toLowerCase().includes('color') || msg.toLowerCase().includes('style'),
      response: (msg) => ({
        id: Date.now().toString(),
        type: 'bot',
        content: `I can help you with design! I noticed you're interested in styling. For just $8, I can generate 5 custom design variations using AI that would take hours to create manually. Want to see what I can do?`,
        timestamp: new Date(),
        upsellData: {
          feature: 'AI Design Generator',
          price: 8,
          savings: '3+ hours of design work',
          urgency: 'Limited time: 40% off',
          cta: 'Generate Designs Now'
        }
      })
    },
    {
      context: 'performance_concern',
      condition: (msg) => msg.toLowerCase().includes('slow') || msg.toLowerCase().includes('performance') || msg.toLowerCase().includes('speed'),
      response: (msg) => ({
        id: Date.now().toString(),
        type: 'bot',
        content: `Performance is crucial! I can run a comprehensive performance analysis and provide optimization recommendations for just $12. This typically improves load times by 60-80%. Your users will thank you!`,
        timestamp: new Date(),
        upsellData: {
          feature: 'Performance Optimizer',
          price: 12,
          savings: '60-80% faster load times',
          urgency: 'Today only: Free performance report included',
          cta: 'Optimize Now'
        }
      })
    },
    {
      context: 'mobile_responsive',
      condition: (msg) => msg.toLowerCase().includes('mobile') || msg.toLowerCase().includes('responsive') || msg.toLowerCase().includes('phone'),
      response: (msg) => ({
        id: Date.now().toString(),
        type: 'bot',
        content: `Mobile optimization is essential! 📱 I can create a perfect mobile experience with advanced responsive design for $15. This includes touch gestures, mobile-first layouts, and device-specific optimizations.`,
        timestamp: new Date(),
        upsellData: {
          feature: 'Mobile Optimizer Pro',
          price: 15,
          savings: 'Mobile conversions +65%',
          urgency: 'Flash sale: 50% off for next 2 hours',
          cta: 'Make It Mobile-Perfect'
        }
      })
    },
    {
      context: 'seo_help',
      condition: (msg) => msg.toLowerCase().includes('seo') || msg.toLowerCase().includes('search') || msg.toLowerCase().includes('google'),
      response: (msg) => ({
        id: Date.now().toString(),
        type: 'bot',
        content: `SEO is gold! 🏆 I can optimize your site for search engines with advanced meta tags, schema markup, and performance tweaks for just $18. This typically increases organic traffic by 3-5x within 60 days.`,
        timestamp: new Date(),
        upsellData: {
          feature: 'SEO Optimizer Suite',
          price: 18,
          savings: '3-5x more organic traffic',
          urgency: 'Exclusive: Free keyword research included',
          cta: 'Boost My Rankings'
        }
      })
    },
    {
      context: 'custom_feature',
      condition: (msg) => msg.toLowerCase().includes('custom') || msg.toLowerCase().includes('special') || msg.toLowerCase().includes('unique'),
      response: (msg) => ({
        id: Date.now().toString(),
        type: 'bot',
        content: `Custom features are my specialty! ✨ I can build any custom functionality you need for $25. From APIs to advanced animations, I'll make your vision reality. What specific feature did you have in mind?`,
        timestamp: new Date(),
        upsellData: {
          feature: 'Custom Feature Builder',
          price: 25,
          savings: 'Save 10+ hours of development',
          urgency: 'Premium support included',
          cta: 'Build Custom Feature'
        }
      })
    },
    {
      context: 'free_user_nudge',
      condition: (msg, appData) => userTier === 'free' && conversationContext.length > 2,
      response: (msg) => ({
        id: Date.now().toString(),
        type: 'bot',
        content: `I love helping you! 😊 Since you're getting great value, would you like to unlock my premium features? For just $29/month, you get unlimited customizations, priority support, and exclusive AI tools. First month is 50% off!`,
        timestamp: new Date(),
        upsellData: {
          feature: 'Premium Plan',
          price: 29,
          savings: 'First month: 50% off',
          urgency: 'Limited time offer',
          cta: 'Upgrade to Premium'
        }
      })
    }
  ]

  // Welcome message when bot appears
  useEffect(() => {
    if (isVisible && messages.length === 0) {
      const welcomeMessage: DeepSeekMessage = {
        id: 'welcome',
        type: 'bot',
        content: `Hey there! 👋 I'm your AI assistant powered by DeepSeek. I'm here to help you customize and optimize your website. What would you like to improve?`,
        timestamp: new Date()
      }
      setMessages([welcomeMessage])
    }
  }, [isVisible, messages.length])

  // Auto-scroll to bottom
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [messages])

  // Smart upselling based on context using DeepSeek API
  const generateUpsellResponse = async (userMessage: string): Promise<DeepSeekMessage> => {
    try {
      // Call DeepSeek API for intelligent upselling
      const response = await fetch('/api/deepseek', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          context: conversationContext,
          userTier,
          generatedApp
        })
      })

      if (!response.ok) {
        throw new Error('DeepSeek API failed')
      }

      const data = await response.json()
      
      return {
        id: Date.now().toString(),
        type: 'bot',
        content: data.response,
        timestamp: new Date(),
        upsellData: data.upsellData
      }
    } catch (error) {
      console.error('DeepSeek API error:', error)
      
      // Fallback to local upsell triggers
      for (const trigger of upsellTriggers) {
        if (trigger.condition(userMessage, generatedApp)) {
          return trigger.response(userMessage, generatedApp)
        }
      }

      // Default fallback
      return {
        id: Date.now().toString(),
        type: 'bot',
        content: `I can help with that! I have advanced AI capabilities that can analyze your code and suggest improvements. For premium features like custom design generation, would you like to see what's available?`,
        timestamp: new Date(),
        upsellData: {
          feature: 'AI Analysis Pro',
          price: 10,
          savings: 'Detailed insights + suggestions',
          cta: 'Try Premium Features'
        }
      }
    }
  }

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: DeepSeekMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setConversationContext(prev => [...prev, input])
    setInput('')
    setIsLoading(true)

    try {
      // Simulate AI processing delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const botResponse = await generateUpsellResponse(input)
      setMessages(prev => [...prev, botResponse])
    } catch (error) {
      console.error('Error generating response:', error)
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        type: 'bot',
        content: 'Sorry, I encountered an error. Please try again!',
        timestamp: new Date()
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpgrade = async (feature: string, price: number) => {
    try {
      const response = await fetch('/api/payments/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          featureId: feature.toLowerCase().replace(/\s+/g, '_'),
          amount: price
        })
      })

      const data = await response.json()

      if (data.success && data.checkoutUrl) {
        window.location.href = data.checkoutUrl
      } else {
        throw new Error(data.error || 'Payment failed')
      }
    } catch (error) {
      console.error('Payment error:', error)
      alert('Payment failed. Please try again.')
    }
    
    onUpgrade?.(feature, price)
  }

  const UpsellCard = ({ upsellData }: { upsellData: any }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-3 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20"
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
          <Crown className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-primary text-sm">{upsellData.feature}</span>
            <span className="text-xs bg-success/20 text-success px-2 py-1 rounded-full">
              ${upsellData.price}
            </span>
          </div>
          <div className="text-xs text-muted-foreground mb-2">
            💡 {upsellData.savings}
          </div>
          {upsellData.urgency && (
            <div className="text-xs text-warning font-medium mb-2">
              🔥 {upsellData.urgency}
            </div>
          )}
          <M3Button
            variant="filled"
            size="sm"
            onClick={() => handleUpgrade(upsellData.feature, upsellData.price)}
            className="w-full bg-gradient-to-r from-primary to-secondary"
          >
            <Sparkles className="w-3 h-3 mr-1" />
            {upsellData.cta}
          </M3Button>
        </div>
      </div>
    </motion.div>
  )

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-4 right-4 z-50"
    >
      <M3Card 
        variant="elevated" 
        className={`w-80 shadow-2xl transition-all duration-300 ${
          isMinimized ? 'h-14' : 'h-96'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
              <Bot className="w-3 h-3 text-white" />
            </div>
            <span className="font-medium text-sm">DeepSeek Assistant</span>
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 hover:bg-surface-container rounded"
            >
              {isMinimized ? (
                <ArrowRight className="w-3 h-3 rotate-90" />
              ) : (
                <ArrowRight className="w-3 h-3 -rotate-90" />
              )}
            </button>
            <button
              onClick={onToggle}
              className="p-1 hover:bg-surface-container rounded"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div
              ref={messagesRef}
              className="h-64 overflow-y-auto p-4 space-y-3"
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg text-sm ${
                      message.type === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-surface-container text-foreground'
                    }`}
                  >
                    {message.content}
                    {message.upsellData && (
                      <UpsellCard upsellData={message.upsellData} />
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-surface-container p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me anything..."
                  className="flex-1 px-3 py-2 bg-surface-container rounded-lg text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <M3Button
                  variant="filled"
                  size="sm"
                  onClick={handleSendMessage}
                  disabled={!input.trim() || isLoading}
                >
                  <Send className="w-3 h-3" />
                </M3Button>
              </div>
            </div>
          </>
        )}
      </M3Card>
    </motion.div>
  )
}

// Toggle button for the bot
export function DeepSeekBotToggle({ onClick, isVisible }: { onClick: () => void, isVisible: boolean }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`fixed bottom-4 right-4 z-40 w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full shadow-lg flex items-center justify-center text-white transition-all duration-300 ${
        isVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <MessageCircle className="w-6 h-6" />
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-error rounded-full animate-ping" />
    </motion.button>
  )
}