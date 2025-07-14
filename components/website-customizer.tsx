'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { M3Button } from '@/components/ui/m3-button'
import { M3Card, M3CardContent, M3CardHeader, M3CardTitle } from '@/components/ui/m3-card'
import {
  Edit3,
  Palette,
  Type,
  Layout,
  Image,
  Sparkles,
  Zap,
  Crown,
  Lock,
  Star,
  ArrowRight,
  Wand2,
  Rocket,
  Eye,
  Code,
  Settings,
  Sparkles as Magic,
  Brush,
  MousePointer,
  Target,
  Layers,
  Grid,
  AlignLeft,
  Camera
} from 'lucide-react'

interface WebsiteCustomizerProps {
  websiteData: {
    id: string
    name: string
    template: string
    sections: WebsiteSection[]
  }
  userTier: 'free' | 'pro' | 'enterprise'
  onUpgrade: () => void
  onCustomize: (section: string, changes: any) => void
}

interface WebsiteSection {
  id: string
  type: 'header' | 'hero' | 'features' | 'pricing' | 'footer'
  title: string
  content: any
  customizable: boolean
  premium?: boolean
}

interface CustomizationOption {
  id: string
  name: string
  description: string
  icon: any
  premium: boolean
  category: 'content' | 'design' | 'layout' | 'advanced'
  price?: number
}

export function WebsiteCustomizer({ 
  websiteData, 
  userTier, 
  onUpgrade, 
  onCustomize 
}: WebsiteCustomizerProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [customizationHistory, setCustomizationHistory] = useState<any[]>([])
  const [previewMode, setPreviewMode] = useState(false)
  const [aiSuggestions, setAiSuggestions] = useState<any[]>([])

  const customizationOptions: CustomizationOption[] = [
    // Content Customization
    {
      id: 'text-editor',
      name: 'Smart Text Editor',
      description: 'AI-powered text editing with tone suggestions',
      icon: Edit3,
      premium: false,
      category: 'content'
    },
    {
      id: 'ai-copywriter',
      name: 'AI Copywriter',
      description: 'Generate compelling copy with AI',
      icon: Wand2,
      premium: true,
      category: 'content',
      price: 5
    },
    {
      id: 'tone-adjuster',
      name: 'Tone Adjuster',
      description: 'Adjust writing tone (professional, casual, etc.)',
      icon: Target,
      premium: true,
      category: 'content',
      price: 3
    },
    
    // Design Customization
    {
      id: 'color-palette',
      name: 'Color Palette',
      description: 'Choose from premium color schemes',
      icon: Palette,
      premium: false,
      category: 'design'
    },
    {
      id: 'ai-designer',
      name: 'AI Designer',
      description: 'AI generates custom design variations',
      icon: Brush,
      premium: true,
      category: 'design',
      price: 8
    },
    {
      id: 'brand-kit',
      name: 'Brand Kit Generator',
      description: 'Create consistent brand identity',
      icon: Crown,
      premium: true,
      category: 'design',
      price: 15
    },
    
    // Layout Customization
    {
      id: 'layout-grid',
      name: 'Layout Grid',
      description: 'Drag and drop layout builder',
      icon: Grid,
      premium: false,
      category: 'layout'
    },
    {
      id: 'responsive-optimizer',
      name: 'Responsive Optimizer',
      description: 'AI optimizes for all devices',
      icon: MousePointer,
      premium: true,
      category: 'layout',
      price: 10
    },
    {
      id: 'section-templates',
      name: 'Premium Sections',
      description: 'Access to 500+ premium sections',
      icon: Layers,
      premium: true,
      category: 'layout',
      price: 12
    },
    
    // Advanced Features
    {
      id: 'animation-studio',
      name: 'Animation Studio',
      description: 'Add professional animations',
      icon: Zap,
      premium: true,
      category: 'advanced',
      price: 20
    },
    {
      id: 'seo-optimizer',
      name: 'SEO Optimizer',
      description: 'AI-powered SEO optimization',
      icon: Rocket,
      premium: true,
      category: 'advanced',
      price: 18
    },
    {
      id: 'analytics-integration',
      name: 'Analytics Integration',
      description: 'Advanced tracking and insights',
      icon: Settings,
      premium: true,
      category: 'advanced',
      price: 25
    }
  ]

  const tierLimits = {
    free: {
      customizations: 3,
      aiSuggestions: 1,
      premiumFeatures: 0
    },
    pro: {
      customizations: 20,
      aiSuggestions: 10,
      premiumFeatures: 5
    },
    enterprise: {
      customizations: Infinity,
      aiSuggestions: Infinity,
      premiumFeatures: Infinity
    }
  }

  // Generate AI suggestions for improvements
  useEffect(() => {
    const generateAISuggestions = () => {
      const suggestions = [
        {
          id: 'hero-improvement',
          type: 'content',
          title: 'Improve Hero Section',
          description: 'Your hero section could be 40% more engaging with AI-generated copy',
          impact: 'High',
          effort: 'Low',
          price: 5,
          preview: 'Transform your bland headline into a conversion-focused message'
        },
        {
          id: 'color-harmony',
          type: 'design',
          title: 'Color Harmony Boost',
          description: 'AI detected color conflicts. Fix them for better user experience',
          impact: 'Medium',
          effort: 'Low',
          price: 3,
          preview: 'Harmonious colors increase user engagement by 23%'
        },
        {
          id: 'mobile-optimization',
          type: 'layout',
          title: 'Mobile Optimization',
          description: 'Your mobile layout needs improvement for better conversions',
          impact: 'High',
          effort: 'Medium',
          price: 10,
          preview: 'Mobile-optimized sites convert 65% better'
        }
      ]
      setAiSuggestions(suggestions)
    }

    generateAISuggestions()
  }, [websiteData])

  const handleCustomizationClick = (option: CustomizationOption) => {
    if (option.premium && userTier === 'free') {
      setShowUpgradeModal(true)
      return
    }

    if (option.premium && option.price) {
      // Handle premium feature purchase
      handlePremiumFeature(option)
    } else {
      // Handle free feature
      onCustomize(activeSection!, { type: option.id })
    }
  }

  const handlePremiumFeature = (option: CustomizationOption) => {
    // Show purchase modal or integrate with Stripe
    console.log('Premium feature:', option)
  }

  const CustomizationPanel = ({ section }: { section: WebsiteSection }) => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">
          Customize {section.title}
        </h3>
        <M3Button
          variant="text"
          size="sm"
          onClick={() => setActiveSection(null)}
        >
          Done
        </M3Button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <M3Button
          variant="outlined"
          size="sm"
          onClick={() => handleCustomizationClick(customizationOptions[0])}
        >
          <Edit3 className="w-4 h-4 mr-2" />
          Edit Text
        </M3Button>
        <M3Button
          variant="outlined"
          size="sm"
          onClick={() => handleCustomizationClick(customizationOptions[4])}
        >
          <Palette className="w-4 h-4 mr-2" />
          Change Colors
        </M3Button>
      </div>

      {/* Customization Categories */}
      {['content', 'design', 'layout', 'advanced'].map((category) => (
        <div key={category} className="space-y-3">
          <h4 className="font-medium text-foreground capitalize">
            {category} Options
          </h4>
          <div className="grid grid-cols-1 gap-3">
            {customizationOptions
              .filter(opt => opt.category === category)
              .map((option) => (
                <div
                  key={option.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    option.premium && userTier === 'free'
                      ? 'border-border/50 opacity-60'
                      : 'border-border hover:border-primary'
                  }`}
                  onClick={() => handleCustomizationClick(option)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      option.premium && userTier === 'free'
                        ? 'bg-muted/50'
                        : 'bg-primary/20'
                    }`}>
                      <option.icon className={`w-4 h-4 ${
                        option.premium && userTier === 'free'
                          ? 'text-muted-foreground'
                          : 'text-primary'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{option.name}</span>
                        {option.premium && (
                          <div className="flex items-center gap-1">
                            <Crown className="w-3 h-3 text-yellow-500" />
                            {option.price && (
                              <span className="text-xs text-muted-foreground">
                                ${option.price}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {option.description}
                      </p>
                    </div>
                    {option.premium && userTier === 'free' && (
                      <Lock className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </motion.div>
  )

  return (
    <div className="flex h-screen bg-background">
      {/* Website Preview */}
      <div className="flex-1 relative">
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
          <M3Button
            variant="filled"
            size="sm"
            onClick={() => setPreviewMode(!previewMode)}
          >
            <Eye className="w-4 h-4 mr-2" />
            {previewMode ? 'Edit Mode' : 'Preview Mode'}
          </M3Button>
        </div>

        {/* Website Sections */}
        <div className="h-full overflow-y-auto p-8 space-y-6">
          {websiteData.sections.map((section) => (
            <motion.div
              key={section.id}
              className={`relative group rounded-lg border-2 border-dashed transition-all ${
                activeSection === section.id
                  ? 'border-primary bg-primary/5'
                  : 'border-transparent hover:border-border'
              }`}
              whileHover={{ scale: 1.02 }}
              onClick={() => !previewMode && setActiveSection(section.id)}
            >
              {/* Section Content Mock */}
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <SectionPreview section={section} />
              </div>

              {/* Customization Overlay */}
              {!previewMode && (
                <motion.div
                  className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <M3Button
                    variant="filled"
                    size="sm"
                    onClick={() => setActiveSection(section.id)}
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    Customize {section.title}
                  </M3Button>
                </motion.div>
              )}

              {/* Premium Badge */}
              {section.premium && userTier === 'free' && (
                <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                  Premium
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Customization Sidebar */}
      <div className="w-80 bg-surface-container border-l border-border p-6 overflow-y-auto">
        <AnimatePresence mode="wait">
          {activeSection ? (
            <CustomizationPanel 
              section={websiteData.sections.find(s => s.id === activeSection)!} 
            />
          ) : (
            <motion.div
              key="main-panel"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Header */}
              <div>
                <h2 className="text-xl font-bold text-foreground mb-2">
                  Website Customizer
                </h2>
                <p className="text-sm text-muted-foreground">
                  Click on any section to customize it with AI
                </p>
              </div>

              {/* Current Plan */}
              <M3Card variant="filled" className="bg-gradient-to-r from-primary/10 to-secondary/10">
                <M3CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-foreground capitalize">
                      {userTier} Plan
                    </span>
                    {userTier === 'free' && (
                      <M3Button
                        variant="filled"
                        size="sm"
                        onClick={onUpgrade}
                        className="bg-gradient-to-r from-primary to-secondary"
                      >
                        Upgrade
                      </M3Button>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {tierLimits[userTier].customizations === Infinity
                      ? 'Unlimited'
                      : `${tierLimits[userTier].customizations} customizations`
                    } remaining
                  </div>
                </M3CardContent>
              </M3Card>

              {/* AI Suggestions */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <h3 className="font-medium text-foreground">AI Suggestions</h3>
                </div>
                
                {aiSuggestions.map((suggestion) => (
                  <M3Card key={suggestion.id} variant="outlined">
                    <M3CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-primary/20 rounded-lg">
                          <Magic className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">{suggestion.title}</span>
                            <span className={`px-2 py-1 rounded text-xs ${
                              suggestion.impact === 'High'
                                ? 'bg-error/20 text-error'
                                : suggestion.impact === 'Medium'
                                ? 'bg-warning/20 text-warning'
                                : 'bg-success/20 text-success'
                            }`}>
                              {suggestion.impact} Impact
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">
                            {suggestion.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-success">
                              ${suggestion.price}
                            </span>
                            <M3Button
                              variant="outlined"
                              size="sm"
                              onClick={() => handlePremiumFeature(suggestion)}
                            >
                              Apply
                            </M3Button>
                          </div>
                        </div>
                      </div>
                    </M3CardContent>
                  </M3Card>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="space-y-3">
                <h3 className="font-medium text-foreground">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <M3Button
                    variant="outlined"
                    size="sm"
                    onClick={() => {/* Handle AI redesign */}}
                  >
                    <Wand2 className="w-4 h-4 mr-2" />
                    AI Redesign
                  </M3Button>
                  <M3Button
                    variant="outlined"
                    size="sm"
                    onClick={() => {/* Handle color change */}}
                  >
                    <Palette className="w-4 h-4 mr-2" />
                    New Colors
                  </M3Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Upgrade Modal */}
      <AnimatePresence>
        {showUpgradeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowUpgradeModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-background rounded-lg p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Unlock Premium Features
                </h3>
                <p className="text-muted-foreground mb-6">
                  Upgrade to Pro for unlimited customizations and AI-powered features
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm">Unlimited AI customizations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wand2 className="w-4 h-4 text-purple-500" />
                    <span className="text-sm">AI copywriter & designer</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Rocket className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">Premium templates & sections</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <M3Button
                    variant="outlined"
                    size="sm"
                    onClick={() => setShowUpgradeModal(false)}
                    className="flex-1"
                  >
                    Maybe Later
                  </M3Button>
                  <M3Button
                    variant="filled"
                    size="sm"
                    onClick={onUpgrade}
                    className="flex-1 bg-gradient-to-r from-primary to-secondary"
                  >
                    Upgrade Now
                  </M3Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Section Preview Component
function SectionPreview({ section }: { section: WebsiteSection }) {
  switch (section.type) {
    case 'header':
      return (
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold">Your Logo</div>
          <div className="flex items-center gap-4">
            <span>Home</span>
            <span>About</span>
            <span>Contact</span>
          </div>
        </div>
      )
    
    case 'hero':
      return (
        <div className="text-center py-12">
          <h1 className="text-4xl font-bold mb-4">
            {section.content?.title || 'Build Amazing Websites'}
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            {section.content?.subtitle || 'Create stunning websites with AI-powered tools'}
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg">
              Get Started
            </button>
            <button className="border border-border px-6 py-3 rounded-lg">
              Learn More
            </button>
          </div>
        </div>
      )
    
    case 'features':
      return (
        <div className="py-12">
          <h2 className="text-2xl font-bold text-center mb-8">Features</h2>
          <div className="grid grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 bg-primary/20 rounded-lg mx-auto mb-4"></div>
                <h3 className="font-semibold mb-2">Feature {i}</h3>
                <p className="text-sm text-muted-foreground">
                  Description of feature {i}
                </p>
              </div>
            ))}
          </div>
        </div>
      )
    
    case 'pricing':
      return (
        <div className="py-12">
          <h2 className="text-2xl font-bold text-center mb-8">Pricing</h2>
          <div className="grid grid-cols-3 gap-6">
            {['Basic', 'Pro', 'Enterprise'].map((plan) => (
              <div key={plan} className="border border-border rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-2">{plan}</h3>
                <p className="text-2xl font-bold mb-4">$99/mo</p>
                <button className="w-full bg-primary text-primary-foreground py-2 rounded">
                  Choose Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      )
    
    case 'footer':
      return (
        <div className="py-8 border-t border-border">
          <div className="flex items-center justify-between">
            <div>© 2024 Your Company</div>
            <div className="flex items-center gap-4">
              <span>Privacy</span>
              <span>Terms</span>
              <span>Contact</span>
            </div>
          </div>
        </div>
      )
    
    default:
      return <div>Section Content</div>
  }
}