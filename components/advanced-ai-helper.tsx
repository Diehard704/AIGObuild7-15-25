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
  Bot,
  Minimize2,
  Maximize2,
  Wand2 as Magic,
  Cpu,
  Layers,
  Globe,
  Coffee,
  Heart,
  Gift,
  Timer,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react'

interface AIMessage {
  id: string
  type: 'user' | 'ai' | 'system'
  content: string
  timestamp: Date
  suggestions?: AISuggestion[]
  upsellOffer?: UpsellOffer
  metadata?: {
    confidence?: number
    processingTime?: number
    context?: string
  }
}

interface AISuggestion {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  action: string
  isPremium?: boolean
  price?: number
  confidence: number
}

interface UpsellOffer {
  id: string
  title: string
  description: string
  features: string[]
  price: number
  originalPrice?: number
  savings?: string
  urgency?: string
  cta: string
  icon: React.ReactNode
  badges?: string[]
}

interface UserContext {
  tier: 'free' | 'pro' | 'enterprise'
  generatedApps: number
  credits: number
  lastActivity: Date
  preferences: string[]
  painPoints: string[]
  currentProject?: any
}

export function AdvancedAIHelper({ 
  userContext,
  generatedApp,
  onUpgrade,
  isVisible = false,
  onToggle 
}: {
  userContext: UserContext
  generatedApp?: any
  onUpgrade?: (offer: UpsellOffer) => void
  isVisible?: boolean
  onToggle?: () => void
}) {
  const [messages, setMessages] = useState<AIMessage[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesRef = useRef<HTMLDivElement>(null)
  const [activeUpsells, setActiveUpsells] = useState<UpsellOffer[]>([])
  const [userSession, setUserSession] = useState({
    messagesCount: 0,
    engagementScore: 0,
    frustrationLevel: 0,
    interestedFeatures: [] as string[]
  })

  // Initialize with welcome message
  useEffect(() => {
    if (isVisible && messages.length === 0) {
      const welcomeMessage: AIMessage = {
        id: 'welcome',
        type: 'ai',
        content: `👋 Hey there! I'm your AI assistant powered by Claude 4. I've analyzed your current project and I'm here to help you create something extraordinary. What would you like to improve or add to your app?`,
        timestamp: new Date(),
        suggestions: [
          {
            id: 'design',
            title: 'Enhance Design',
            description: 'Get instant design improvements',
            icon: <Palette className="w-4 h-4" />,
            action: 'design_help',
            confidence: 0.9
          },
          {
            id: 'performance',
            title: 'Optimize Performance',
            description: 'Speed up your app instantly',
            icon: <Zap className="w-4 h-4" />,
            action: 'performance_help',
            confidence: 0.85
          },
          {
            id: 'features',
            title: 'Add Features',
            description: 'Enhance functionality',
            icon: <Layers className="w-4 h-4" />,
            action: 'feature_help',
            confidence: 0.8
          },
          {
            id: 'mobile',
            title: 'Mobile Optimization',
            description: 'Perfect mobile experience',
            icon: <Globe className="w-4 h-4" />,
            action: 'mobile_help',
            isPremium: true,
            price: 15,
            confidence: 0.95
          }
        ],
        metadata: {
          confidence: 1.0,
          processingTime: 0,
          context: 'welcome'
        }
      }
      setMessages([welcomeMessage])
    }
  }, [isVisible, messages.length])

  // Smart upselling based on user behavior
  const generateSmartUpsell = (userMessage: string, context: string): UpsellOffer | null => {
    const messageWords = userMessage.toLowerCase()
    
    if (messageWords.includes('design') || messageWords.includes('beautiful') || messageWords.includes('color')) {
      return {
        id: 'design_pro',
        title: 'AI Design Studio Pro',
        description: 'Get 10 custom design variations, color palettes, and typography recommendations',
        features: [
          '10 AI-generated design variations',
          'Custom color palette generator',
          'Typography optimization',
          'Mobile-first responsive design',
          'Accessibility compliance check'
        ],
        price: 19,
        originalPrice: 35,
        savings: '45% off',
        urgency: 'Limited time offer - expires in 24 hours',
        cta: 'Upgrade My Design Now',
        icon: <Magic className="w-5 h-5" />,
        badges: ['Most Popular', 'Best Value']
      }
    }
    
    if (messageWords.includes('fast') || messageWords.includes('slow') || messageWords.includes('performance')) {
      return {
        id: 'performance_boost',
        title: 'Performance Rocket',
        description: 'Supercharge your app with advanced optimization and monitoring',
        features: [
          'Advanced performance analysis',
          'Code optimization suggestions',
          'Image and asset optimization',
          'CDN integration setup',
          'Real-time performance monitoring'
        ],
        price: 25,
        originalPrice: 45,
        savings: '44% off',
        urgency: 'Today only - Free performance audit included',
        cta: 'Boost Performance Now',
        icon: <Rocket className="w-5 h-5" />,
        badges: ['Premium', 'Results Guaranteed']
      }
    }
    
    if (messageWords.includes('feature') || messageWords.includes('add') || messageWords.includes('functionality')) {
      return {
        id: 'feature_factory',
        title: 'Feature Factory Unlimited',
        description: 'Add any feature you can imagine with AI-powered development',
        features: [
          'Custom feature development',
          'API integrations',
          'Database schema design',
          'Authentication systems',
          'Payment processing setup'
        ],
        price: 49,
        originalPrice: 89,
        savings: '45% off',
        urgency: 'Only 5 spots left today',
        cta: 'Build Features Now',
        icon: <Cpu className="w-5 h-5" />,
        badges: ['Enterprise Grade', 'Most Advanced']
      }
    }
    
    return null
  }

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return
    
    const userMessage: AIMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    setIsTyping(true)
    
    // Update user session
    setUserSession(prev => ({
      ...prev,
      messagesCount: prev.messagesCount + 1,
      engagementScore: prev.engagementScore + 1
    }))
    
    try {
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const aiResponse: AIMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAIResponse(message),
        timestamp: new Date(),
        suggestions: generateSuggestions(message),
        upsellOffer: generateSmartUpsell(message, 'conversation') || undefined,
        metadata: {
          confidence: 0.92,
          processingTime: 1.5,
          context: 'conversation'
        }
      }
      
      setMessages(prev => [...prev, aiResponse])
      
      // Update active upsells
      if (aiResponse.upsellOffer) {
        setActiveUpsells(prev => [...prev, aiResponse.upsellOffer!])
      }
      
    } catch (error) {
      console.error('AI Helper Error:', error)
      const errorMessage: AIMessage = {
        id: (Date.now() + 2).toString(),
        type: 'system',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
      setIsTyping(false)
    }
  }

  const generateAIResponse = (userMessage: string): string => {
    const messageWords = userMessage.toLowerCase()
    
    if (messageWords.includes('help') || messageWords.includes('how')) {
      return `I'd be happy to help! Based on your request, I can see you're looking to improve your app. Here are some specific recommendations I can provide instantly...`
    }
    
    if (messageWords.includes('design')) {
      return `Great question about design! I can see your app has potential for some beautiful improvements. I can help you with color schemes, layout optimization, and modern design patterns that will make your app stand out.`
    }
    
    if (messageWords.includes('performance')) {
      return `Performance is crucial for user experience! I can analyze your app's current performance and provide specific optimization strategies that typically improve load times by 60-80%. Let me show you what I can do...`
    }
    
    return `That's a great question! I can help you with that. Let me analyze your specific needs and provide you with the best recommendations tailored to your app.`
  }

  const generateSuggestions = (userMessage: string): AISuggestion[] => {
    const messageWords = userMessage.toLowerCase()
    
    if (messageWords.includes('design')) {
      return [
        {
          id: 'color_palette',
          title: 'Generate Color Palette',
          description: 'Get a custom color scheme',
          icon: <Palette className="w-4 h-4" />,
          action: 'generate_colors',
          confidence: 0.95
        },
        {
          id: 'layout_improve',
          title: 'Improve Layout',
          description: 'Optimize spacing and hierarchy',
          icon: <Layers className="w-4 h-4" />,
          action: 'improve_layout',
          confidence: 0.9
        },
        {
          id: 'design_system',
          title: 'Create Design System',
          description: 'Build consistent components',
          icon: <Shield className="w-4 h-4" />,
          action: 'design_system',
          isPremium: true,
          price: 19,
          confidence: 0.85
        }
      ]
    }
    
    return [
      {
        id: 'quick_fix',
        title: 'Quick Fix',
        description: 'Instant improvement',
        icon: <Zap className="w-4 h-4" />,
        action: 'quick_fix',
        confidence: 0.9
      },
      {
        id: 'deep_analysis',
        title: 'Deep Analysis',
        description: 'Comprehensive review',
        icon: <Eye className="w-4 h-4" />,
        action: 'deep_analysis',
        isPremium: true,
        price: 12,
        confidence: 0.95
      }
    ]
  }

  const handleSuggestionClick = (suggestion: AISuggestion) => {
    if (suggestion.isPremium && userContext.tier === 'free') {
      // Show premium upsell
      const premiumOffer: UpsellOffer = {
        id: suggestion.id + '_premium',
        title: `Premium: ${suggestion.title}`,
        description: suggestion.description,
        features: ['Advanced AI analysis', 'Instant results', 'Priority support'],
        price: suggestion.price || 15,
        cta: 'Upgrade & Use Now',
        icon: <Crown className="w-5 h-5" />,
        badges: ['Premium Only']
      }
      setActiveUpsells(prev => [...prev, premiumOffer])
    } else {
      handleSendMessage(suggestion.title)
    }
  }

  const handleUpgrade = (offer: UpsellOffer) => {
    onUpgrade?.(offer)
  }

  // Auto-scroll to bottom
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [messages])

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="fixed bottom-6 right-6 z-50"
      >
        <M3Card 
          variant="elevated" 
          className={`w-96 bg-surface-container border border-outline/20 shadow-2xl transition-all duration-300 ${
            isMinimized ? 'h-16' : 'h-[600px]'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-outline/10">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                </div>
              </div>
              <div>
                <h3 className="m3-title-small font-semibold text-foreground">AI Assistant</h3>
                <p className="m3-body-small text-muted-foreground">
                  {isTyping ? 'Thinking...' : 'Online'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-2 hover:bg-surface-container-highest rounded-full transition-colors"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={onToggle}
                className="p-2 hover:bg-surface-container-highest rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <M3CardContent className="p-0 h-full flex flex-col">
              {/* Messages */}
              <div 
                ref={messagesRef}
                className="flex-1 overflow-y-auto p-4 space-y-4"
              >
                {messages.map((message) => (
                  <div key={message.id} className="space-y-3">
                    <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] ${
                        message.type === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-surface-container-high text-foreground'
                      } rounded-lg p-3`}>
                        <p className="m3-body-small">{message.content}</p>
                        {message.metadata?.confidence && (
                          <div className="mt-2 text-xs opacity-70">
                            Confidence: {(message.metadata.confidence * 100).toFixed(0)}%
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Suggestions */}
                    {message.suggestions && message.suggestions.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {message.suggestions.map((suggestion) => (
                          <button
                            key={suggestion.id}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs transition-all ${
                              suggestion.isPremium 
                                ? 'bg-warning/20 text-warning border border-warning/30 hover:bg-warning/30' 
                                : 'bg-surface-container-high text-foreground hover:bg-surface-container-highest'
                            }`}
                          >
                            {suggestion.icon}
                            {suggestion.title}
                            {suggestion.isPremium && <Crown className="w-3 h-3" />}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Upsell Offers */}
                    {message.upsellOffer && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="border border-primary/20 rounded-lg p-4 bg-gradient-to-r from-primary/5 to-secondary/5"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                            {message.upsellOffer.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="m3-title-small font-semibold">{message.upsellOffer.title}</h4>
                              {message.upsellOffer.badges?.map((badge, index) => (
                                <span key={index} className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full">
                                  {badge}
                                </span>
                              ))}
                            </div>
                            <p className="m3-body-small text-muted-foreground mb-2">
                              {message.upsellOffer.description}
                            </p>
                            <div className="flex items-center gap-2 mb-3">
                              <span className="text-lg font-bold text-primary">
                                ${message.upsellOffer.price}
                              </span>
                              {message.upsellOffer.originalPrice && (
                                <span className="text-sm text-muted-foreground line-through">
                                  ${message.upsellOffer.originalPrice}
                                </span>
                              )}
                              {message.upsellOffer.savings && (
                                <span className="text-sm text-success font-medium">
                                  {message.upsellOffer.savings}
                                </span>
                              )}
                            </div>
                            <M3Button
                              onClick={() => handleUpgrade(message.upsellOffer!)}
                              className="w-full"
                              variant="filled"
                            >
                              {message.upsellOffer.cta}
                            </M3Button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-surface-container-high rounded-lg p-3">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-foreground/50 rounded-full animate-pulse" />
                        <div className="w-2 h-2 bg-foreground/50 rounded-full animate-pulse delay-100" />
                        <div className="w-2 h-2 bg-foreground/50 rounded-full animate-pulse delay-200" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-outline/10">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(input)}
                    placeholder="Ask me anything about your app..."
                    className="flex-1 px-4 py-2 bg-surface-container rounded-lg border border-outline focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    disabled={isLoading}
                  />
                  <M3Button
                    onClick={() => handleSendMessage(input)}
                    disabled={isLoading || !input.trim()}
                    variant="filled"
                    className="px-4"
                  >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  </M3Button>
                </div>
              </div>
            </M3CardContent>
          )}
        </M3Card>
      </motion.div>
    </AnimatePresence>
  )
}

export function AIHelperToggle({ 
  onClick, 
  isVisible 
}: { 
  onClick: () => void
  isVisible: boolean
}) {
  if (isVisible) return null

  return (
    <motion.button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1 }}
    >
      <Bot className="w-6 h-6 text-primary-foreground group-hover:animate-pulse" />
      <div className="absolute -top-2 -right-2 w-6 h-6 bg-success rounded-full flex items-center justify-center">
        <Sparkles className="w-3 h-3 text-white" />
      </div>
    </motion.button>
  )
}