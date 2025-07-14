'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CodeRefactor } from '@/components/code-refactor'
import { RefactorPricing } from '@/components/refactor-pricing'
import { M3Button } from '@/components/ui/m3-button'
import { M3Card, M3CardContent, M3CardHeader, M3CardTitle } from '@/components/ui/m3-card'
import {
  Code,
  Zap,
  TrendingUp,
  Shield,
  Star,
  Users,
  Clock,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Trophy,
  Target,
  Gauge
} from 'lucide-react'

export default function RefactorDemoPage() {
  const [currentTier, setCurrentTier] = useState<'free' | 'pro' | 'enterprise'>('free')
  const [showPricing, setShowPricing] = useState(false)
  const [userCredits, setUserCredits] = useState(5)

  const tierBenefits = {
    free: {
      features: 3,
      refactorings: 5,
      support: 'Community',
      color: 'from-slate-500 to-slate-600'
    },
    pro: {
      features: 8,
      refactorings: 'Unlimited',
      support: 'Priority',
      color: 'from-blue-500 to-blue-600'
    },
    enterprise: {
      features: 'All',
      refactorings: 'Unlimited',
      support: 'Dedicated',
      color: 'from-purple-500 to-purple-600'
    }
  }

  const successStories = [
    {
      company: 'TechCorp',
      developer: 'Sarah Chen',
      role: 'Senior Developer',
      improvement: '40% faster code reviews',
      quote: 'The AI refactoring caught security issues I would have missed.',
      avatar: 'SC',
      tier: 'pro'
    },
    {
      company: 'StartupXYZ',
      developer: 'Mike Johnson',
      role: 'CTO',
      improvement: '60% reduction in bugs',
      quote: 'Our code quality improved dramatically after using this tool.',
      avatar: 'MJ',
      tier: 'enterprise'
    },
    {
      company: 'DevAgency',
      developer: 'Alex Rodriguez',
      role: 'Team Lead',
      improvement: '50% time savings',
      quote: 'Perfect for maintaining consistent code quality across our team.',
      avatar: 'AR',
      tier: 'pro'
    }
  ]

  const handleTierSelect = (tier: 'free' | 'pro' | 'enterprise') => {
    setCurrentTier(tier)
    setShowPricing(false)
    
    // Update user credits based on tier
    if (tier === 'free') {
      setUserCredits(5)
    } else if (tier === 'pro') {
      setUserCredits(1000)
    } else {
      setUserCredits(10000)
    }
  }

  const stats = [
    { label: 'Code Quality Improvement', value: '85%', icon: TrendingUp },
    { label: 'Security Issues Found', value: '12,000+', icon: Shield },
    { label: 'Developer Hours Saved', value: '50,000+', icon: Clock },
    { label: 'Active Users', value: '15,000+', icon: Users }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="border-b border-border/50 p-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <motion.h1
                className="m3-headline-large font-bold text-foreground mb-2"
                whileHover={{ scale: 1.02 }}
              >
                AI Code Refactoring Platform
              </motion.h1>
              <p className="m3-body-large text-muted-foreground flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Transform your code with AI-powered improvements
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="m3-body-small text-muted-foreground">Current Plan</p>
                <p className="m3-title-medium font-semibold text-foreground capitalize flex items-center gap-1">
                  {currentTier}
                  {currentTier === 'pro' && <Star className="w-4 h-4 text-yellow-500" />}
                  {currentTier === 'enterprise' && <Trophy className="w-4 h-4 text-purple-500" />}
                </p>
              </div>
              
              <M3Button
                variant="outlined"
                size="lg"
                onClick={() => setShowPricing(!showPricing)}
              >
                {showPricing ? 'Hide Pricing' : 'View Pricing'}
              </M3Button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Pricing Section */}
        {showPricing && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <RefactorPricing 
              currentTier={currentTier}
              onSelectTier={handleTierSelect}
            />
          </motion.section>
        )}

        {/* Stats Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <M3Card variant="elevated" className="h-full text-center">
                    <M3CardContent className="p-6">
                      <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="m3-headline-small font-bold text-foreground mb-1">
                        {stat.value}
                      </div>
                      <div className="m3-body-small text-muted-foreground">
                        {stat.label}
                      </div>
                    </M3CardContent>
                  </M3Card>
                </motion.div>
              )
            })}
          </div>
        </motion.section>

        {/* Current Tier Benefits */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <M3Card variant="elevated" className={`bg-gradient-to-r ${tierBenefits[currentTier].color}/10 border-primary/20`}>
            <M3CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="m3-title-large font-semibold text-foreground mb-2">
                    {currentTier.charAt(0).toUpperCase() + currentTier.slice(1)} Plan Benefits
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-primary" />
                      <span>{tierBenefits[currentTier].features} features</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-primary" />
                      <span>{tierBenefits[currentTier].refactorings} refactorings</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      <span>{tierBenefits[currentTier].support} support</span>
                    </div>
                  </div>
                </div>
                
                {currentTier === 'free' && (
                  <M3Button
                    variant="filled"
                    size="sm"
                    onClick={() => setShowPricing(true)}
                    className="bg-gradient-to-r from-primary to-secondary"
                  >
                    <Star className="w-4 h-4 mr-1" />
                    Upgrade Now
                  </M3Button>
                )}
              </div>
            </M3CardContent>
          </M3Card>
        </motion.section>

        {/* Main Refactoring Tool */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <CodeRefactor 
            userTier={currentTier}
            userCredits={userCredits}
            onUpgrade={() => setShowPricing(true)}
          />
        </motion.section>

        {/* Success Stories */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="m3-headline-large font-bold text-foreground mb-4">
              Success Stories
            </h2>
            <p className="m3-body-large text-muted-foreground max-w-2xl mx-auto">
              See how developers are using our AI refactoring tool to improve their code quality
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <M3Card variant="filled" className="h-full">
                  <M3CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4">
                        <span className="m3-title-medium font-bold text-primary-foreground">
                          {story.avatar}
                        </span>
                      </div>
                      <div>
                        <div className="m3-title-medium font-semibold text-foreground">
                          {story.developer}
                        </div>
                        <div className="m3-body-small text-muted-foreground">
                          {story.role} at {story.company}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="text-2xl font-bold text-success mb-1">
                        {story.improvement}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        improvement achieved
                      </div>
                    </div>
                    
                    <p className="m3-body-medium text-muted-foreground mb-4">
                      &quot;{story.quote}&quot;
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        story.tier === 'pro' ? 'bg-blue-100 text-blue-700' :
                        story.tier === 'enterprise' ? 'bg-purple-100 text-purple-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {story.tier.toUpperCase()} USER
                      </span>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </M3CardContent>
                </M3Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <M3Card variant="elevated" className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <M3CardContent className="p-8">
              <h2 className="m3-headline-medium font-bold text-foreground mb-4">
                Ready to Transform Your Code Quality?
              </h2>
              <p className="m3-body-large text-muted-foreground mb-6 max-w-2xl mx-auto">
                Join thousands of developers who are already using AI to write better, 
                safer, and more maintainable code.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <M3Button
                  variant="filled"
                  size="lg"
                  onClick={() => currentTier === 'free' ? setShowPricing(true) : undefined}
                  className="group"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  {currentTier === 'free' ? 'Upgrade Now' : 'Continue Refactoring'}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </M3Button>

                <M3Button
                  variant="outlined"
                  size="lg"
                  onClick={() => window.location.href = '/templates'}
                >
                  <Code className="w-4 h-4 mr-2" />
                  Explore Templates
                </M3Button>
              </div>
            </M3CardContent>
          </M3Card>
        </motion.section>
      </div>
    </div>
  )
}