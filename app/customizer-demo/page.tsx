'use client'

import { useState, useEffect } from 'react'
import { LoadingScreen } from '@/components/loading-screens'
import { WebsiteCustomizer } from '@/components/website-customizer'
import { M3Button } from '@/components/ui/m3-button'
import { M3Card, M3CardContent, M3CardHeader, M3CardTitle } from '@/components/ui/m3-card'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  Zap,
  Crown,
  Settings,
  Eye,
  Code,
  Palette,
  Layout,
  Wand2,
  Rocket,
  Star,
  ArrowRight,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react'

export default function CustomizerDemo() {
  const [showLoading, setShowLoading] = useState(false)
  const [loadingType, setLoadingType] = useState<'neural' | 'matrix' | 'ai-brain' | 'code-gen' | 'hologram' | 'particle'>('neural')
  const [userTier, setUserTier] = useState<'free' | 'pro' | 'enterprise'>('free')
  const [currentStep, setCurrentStep] = useState<'loading-demo' | 'customizer-demo'>('loading-demo')

  // Mock website data
  const mockWebsiteData = {
    id: 'demo-website',
    name: 'AI Business Solutions',
    template: 'business-pro',
    sections: [
      {
        id: 'header',
        type: 'header' as const,
        title: 'Header',
        content: {
          logo: 'AI Solutions',
          navigation: ['Home', 'About', 'Services', 'Contact']
        },
        customizable: true
      },
      {
        id: 'hero',
        type: 'hero' as const,
        title: 'Hero Section',
        content: {
          title: 'Transform Your Business with AI',
          subtitle: 'Powerful AI tools to automate workflows and boost productivity',
          cta: 'Get Started Free'
        },
        customizable: true
      },
      {
        id: 'features',
        type: 'features' as const,
        title: 'Features',
        content: {
          features: [
            { title: 'AI Automation', description: 'Automate repetitive tasks' },
            { title: 'Smart Analytics', description: 'Data-driven insights' },
            { title: 'Easy Integration', description: 'Seamless workflow integration' }
          ]
        },
        customizable: true
      },
      {
        id: 'pricing',
        type: 'pricing' as const,
        title: 'Pricing',
        content: {
          plans: [
            { name: 'Starter', price: '$29/mo', features: ['5 Projects', 'Basic Support'] },
            { name: 'Pro', price: '$99/mo', features: ['Unlimited Projects', 'Priority Support', 'Advanced Analytics'] },
            { name: 'Enterprise', price: '$299/mo', features: ['Everything', 'Custom Integration', 'Dedicated Manager'] }
          ]
        },
        customizable: true,
        premium: true
      },
      {
        id: 'footer',
        type: 'footer' as const,
        title: 'Footer',
        content: {
          company: 'AI Solutions Inc.',
          links: ['Privacy', 'Terms', 'Contact']
        },
        customizable: true
      }
    ]
  }

  const loadingTypes = [
    { id: 'neural', name: 'Neural Network', description: 'Animated neural connections' },
    { id: 'matrix', name: 'Matrix Code', description: 'Digital rain effect' },
    { id: 'ai-brain', name: 'AI Brain', description: '3D brain visualization' },
    { id: 'code-gen', name: 'Code Generation', description: 'Live code writing' },
    { id: 'hologram', name: 'Hologram', description: 'Sci-fi holographic effect' },
    { id: 'particle', name: 'Particle System', description: 'Floating particles' }
  ]

  const tierFeatures = {
    free: {
      customizations: 3,
      features: ['Basic customization', 'Limited AI suggestions', 'Standard templates'],
      price: 'Free'
    },
    pro: {
      customizations: 20,
      features: ['Advanced customization', 'AI copywriting', 'Premium templates', 'Color psychology'],
      price: '$29/month'
    },
    enterprise: {
      customizations: Infinity,
      features: ['Unlimited customization', 'AI designer', 'White-label', 'Priority support'],
      price: '$199/month'
    }
  }

  const handleLoadingComplete = () => {
    setShowLoading(false)
    setCurrentStep('customizer-demo')
  }

  const handleCustomize = (section: string, changes: any) => {
    console.log('Customizing section:', section, 'with changes:', changes)
    // In production, this would save to backend
  }

  const handleUpgrade = () => {
    if (userTier === 'free') {
      setUserTier('pro')
    } else if (userTier === 'pro') {
      setUserTier('enterprise')
    }
  }

  const stats = [
    { label: 'Websites Customized', value: '25,000+', icon: Code },
    { label: 'AI Suggestions Generated', value: '150,000+', icon: Sparkles },
    { label: 'User Satisfaction', value: '98%', icon: Star },
    { label: 'Conversion Improvement', value: '40%', icon: Zap }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Loading Screen Overlay */}
      <AnimatePresence>
        {showLoading && (
          <LoadingScreen 
            type={loadingType}
            onComplete={handleLoadingComplete}
            duration={4000}
          />
        )}
      </AnimatePresence>

      {/* Demo Navigation */}
      <div className="border-b border-border/50 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Customizer Demo</h1>
            <p className="text-muted-foreground">Experience loading screens and AI customization</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Tier:</span>
              <select
                value={userTier}
                onChange={(e) => setUserTier(e.target.value as any)}
                className="px-3 py-1 bg-surface-container rounded border border-border text-sm"
              >
                <option value="free">Free</option>
                <option value="pro">Pro</option>
                <option value="enterprise">Enterprise</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <M3Button
                variant={currentStep === 'loading-demo' ? 'filled' : 'outlined'}
                size="sm"
                onClick={() => setCurrentStep('loading-demo')}
              >
                Loading Demo
              </M3Button>
              <M3Button
                variant={currentStep === 'customizer-demo' ? 'filled' : 'outlined'}
                size="sm"
                onClick={() => setCurrentStep('customizer-demo')}
              >
                Customizer Demo
              </M3Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {currentStep === 'loading-demo' ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Loading Screen Demo */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                AI Loading Screen Gallery
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Choose from 6 different AI-themed loading screens that make your users excited 
                while your website loads. Each one tells a story about AI and technology.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <M3Card variant="elevated" className="text-center">
                      <M3CardContent className="p-6">
                        <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                        <div className="text-sm text-muted-foreground">{stat.label}</div>
                      </M3CardContent>
                    </M3Card>
                  </motion.div>
                )
              })}
            </div>

            {/* Loading Screen Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loadingTypes.map((type, index) => (
                <motion.div
                  key={type.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <M3Card 
                    variant="elevated" 
                    className="h-full cursor-pointer transition-all hover:shadow-lg"
                    onClick={() => {
                      setLoadingType(type.id as any)
                      setShowLoading(true)
                    }}
                  >
                    <M3CardHeader>
                      <M3CardTitle className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                          <Sparkles className="w-4 h-4 text-primary" />
                        </div>
                        {type.name}
                      </M3CardTitle>
                    </M3CardHeader>
                    <M3CardContent>
                      <p className="text-muted-foreground mb-4">{type.description}</p>
                      <M3Button
                        variant="outlined"
                        size="sm"
                        className="w-full group"
                        onClick={(e) => {
                          e.stopPropagation()
                          setLoadingType(type.id as any)
                          setShowLoading(true)
                        }}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Preview Loading
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </M3Button>
                    </M3CardContent>
                  </M3Card>
                </motion.div>
              ))}
            </div>

            {/* Implementation Guide */}
            <M3Card variant="filled" className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
              <M3CardHeader>
                <M3CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5 text-primary" />
                  Easy Implementation
                </M3CardTitle>
              </M3CardHeader>
              <M3CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Add any of these loading screens to your website with just a few lines of code:
                  </p>
                  <div className="bg-surface-container p-4 rounded-lg font-mono text-sm">
                    <div className="text-blue-400">import</div>
                    <div className="text-slate-300 ml-2">{'{ LoadingScreen }'} from '@/components/loading-screens'</div>
                    <br />
                    <div className="text-purple-400">{'<LoadingScreen'}</div>
                    <div className="text-slate-300 ml-2">type="neural"</div>
                    <div className="text-slate-300 ml-2">onComplete={() => console.log('Done!')}</div>
                    <div className="text-slate-300 ml-2">duration={3000}</div>
                    <div className="text-purple-400">{'/>'}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <M3Button
                      variant="filled"
                      size="sm"
                      onClick={() => setCurrentStep('customizer-demo')}
                    >
                      <Wand2 className="w-4 h-4 mr-2" />
                      Try Website Customizer
                    </M3Button>
                    <M3Button
                      variant="outlined"
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText('npm install @/components/loading-screens')
                        alert('Installation command copied!')
                      }}
                    >
                      <Code className="w-4 h-4 mr-2" />
                      Copy Install
                    </M3Button>
                  </div>
                </div>
              </M3CardContent>
            </M3Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Customizer Header */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                AI Website Customizer
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Like Rocket.new, but powered by AI. Click on any section to customize it 
                with AI-generated content, colors, layouts, and more. Upgrade for premium features.
              </p>
            </div>

            {/* Current Tier Benefits */}
            <M3Card variant="elevated" className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
              <M3CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                      {userTier === 'free' && <Code className="w-6 h-6 text-white" />}
                      {userTier === 'pro' && <Star className="w-6 h-6 text-white" />}
                      {userTier === 'enterprise' && <Crown className="w-6 h-6 text-white" />}
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground capitalize">{userTier} Plan</h3>
                      <p className="text-muted-foreground">{tierFeatures[userTier].price}</p>
                    </div>
                  </div>
                  
                  {userTier !== 'enterprise' && (
                    <M3Button
                      variant="filled"
                      size="sm"
                      onClick={handleUpgrade}
                      className="bg-gradient-to-r from-primary to-secondary"
                    >
                      <Crown className="w-4 h-4 mr-2" />
                      Upgrade
                    </M3Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {tierFeatures[userTier].features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-success rounded-full" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-3 bg-surface-container rounded-lg">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Customizations remaining:</span>
                    <span className="font-medium text-foreground">
                      {tierFeatures[userTier].customizations === Infinity 
                        ? 'Unlimited' 
                        : `${tierFeatures[userTier].customizations} left`
                      }
                    </span>
                  </div>
                </div>
              </M3CardContent>
            </M3Card>

            {/* Website Customizer */}
            <WebsiteCustomizer
              websiteData={mockWebsiteData}
              userTier={userTier}
              onUpgrade={handleUpgrade}
              onCustomize={handleCustomize}
            />
          </motion.div>
        )}
      </div>
    </div>
  )
}