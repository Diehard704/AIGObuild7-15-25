'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { M3Button } from '@/components/ui/m3-button'
import { M3Card, M3CardContent, M3CardHeader, M3CardTitle } from '@/components/ui/m3-card'
import {
  Code,
  Zap,
  Shield,
  TrendingUp,
  CheckCircle,
  Star,
  Crown,
  Sparkles,
  Target,
  AlertCircle,
  Users,
  Building,
  CreditCard,
  Clock,
  Trophy,
  Gauge,
  Lock
} from 'lucide-react'

interface RefactorPricingProps {
  currentTier?: 'free' | 'pro' | 'enterprise'
  onSelectTier: (tier: 'free' | 'pro' | 'enterprise') => void
}

export function RefactorPricing({ currentTier = 'free', onSelectTier }: RefactorPricingProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')
  const [showComparison, setShowComparison] = useState(false)

  const pricingTiers = {
    free: {
      name: 'Free',
      price: { monthly: 0, yearly: 0 },
      description: 'Perfect for getting started with code refactoring',
      icon: Code,
      color: 'from-slate-500 to-slate-600',
      features: [
        { name: 'Code Formatting', included: true, icon: Code },
        { name: 'Basic Optimization', included: true, icon: Zap },
        { name: 'Variable Naming', included: true, icon: Target },
        { name: 'Security Scan', included: false, icon: Shield },
        { name: 'Performance Boost', included: false, icon: TrendingUp },
        { name: 'TypeScript Improvements', included: false, icon: CheckCircle },
        { name: 'Error Handling', included: false, icon: AlertCircle },
        { name: 'Code Splitting', included: false, icon: Sparkles }
      ],
      limits: {
        refactorings: '5 per month',
        codeSize: '1,000 lines max',
        support: 'Community support',
        features: '3 basic features'
      },
      cta: 'Start Free',
      popular: false
    },
    pro: {
      name: 'Pro',
      price: { monthly: 29, yearly: 290 },
      description: 'Advanced refactoring for professional developers',
      icon: Star,
      color: 'from-blue-500 to-blue-600',
      features: [
        { name: 'Everything in Free', included: true, icon: CheckCircle },
        { name: 'Security Scan', included: true, icon: Shield },
        { name: 'Performance Boost', included: true, icon: TrendingUp },
        { name: 'TypeScript Improvements', included: true, icon: CheckCircle },
        { name: 'Error Handling', included: true, icon: AlertCircle },
        { name: 'Code Splitting', included: true, icon: Sparkles },
        { name: 'Custom Rules', included: true, icon: Target },
        { name: 'Priority Support', included: true, icon: Clock }
      ],
      limits: {
        refactorings: 'Unlimited',
        codeSize: '10,000 lines max',
        support: 'Priority email support',
        features: '8 advanced features'
      },
      cta: 'Upgrade to Pro',
      popular: true,
      savings: billingCycle === 'yearly' ? 'Save $58/year' : undefined
    },
    enterprise: {
      name: 'Enterprise',
      price: { monthly: 199, yearly: 1990 },
      description: 'Complete solution for teams and organizations',
      icon: Crown,
      color: 'from-purple-500 to-purple-600',
      features: [
        { name: 'Everything in Pro', included: true, icon: CheckCircle },
        { name: 'Compliance Check', included: true, icon: Shield },
        { name: 'Architecture Review', included: true, icon: Trophy },
        { name: 'Documentation Gen', included: true, icon: Code },
        { name: 'Team Management', included: true, icon: Users },
        { name: 'Custom AI Training', included: true, icon: Gauge },
        { name: 'API Access', included: true, icon: Zap },
        { name: 'Dedicated Support', included: true, icon: Building }
      ],
      limits: {
        refactorings: 'Unlimited',
        codeSize: 'Unlimited',
        support: 'Dedicated account manager',
        features: 'All features + custom'
      },
      cta: 'Contact Sales',
      popular: false,
      savings: billingCycle === 'yearly' ? 'Save $398/year' : undefined
    }
  }

  const payPerUse = {
    free: { cost: 0, description: 'Free tier only' },
    pro: { cost: 0.10, description: 'Without subscription' },
    enterprise: { cost: 0.25, description: 'Without subscription' }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <motion.h2 
          className="m3-headline-large font-bold text-foreground mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Choose Your Refactoring Plan
        </motion.h2>
        <p className="m3-body-large text-muted-foreground max-w-2xl mx-auto">
          Unlock the full power of AI-driven code refactoring with advanced features, 
          unlimited usage, and priority support.
        </p>
      </div>

      {/* Billing Toggle */}
      <div className="flex items-center justify-center">
        <div className="flex items-center bg-surface-container rounded-lg p-1">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-2 rounded-md transition-all ${
              billingCycle === 'monthly' 
                ? 'bg-primary text-primary-foreground' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-4 py-2 rounded-md transition-all ${
              billingCycle === 'yearly' 
                ? 'bg-primary text-primary-foreground' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Yearly
            <span className="ml-2 px-2 py-1 bg-success/20 text-success text-xs rounded">
              Save 17%
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {Object.entries(pricingTiers).map(([tier, plan], index) => {
          const Icon = plan.icon
          const isCurrentTier = currentTier === tier
          const price = plan.price[billingCycle]
          
          return (
            <motion.div
              key={tier}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative ${plan.popular ? 'scale-105' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}
              
              <M3Card 
                variant={isCurrentTier ? "elevated" : "filled"}
                className={`h-full ${isCurrentTier ? 'ring-2 ring-primary' : ''} ${
                  plan.popular ? 'border-primary/50' : ''
                }`}
              >
                <M3CardHeader>
                  <div className="text-center">
                    <div className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <M3CardTitle className="text-2xl font-bold text-foreground">
                      {plan.name}
                    </M3CardTitle>
                    
                    <div className="mt-4">
                      <div className="flex items-baseline justify-center">
                        <span className="text-4xl font-bold text-foreground">
                          ${price}
                        </span>
                        {price > 0 && (
                          <span className="text-muted-foreground ml-2">
                            /{billingCycle === 'monthly' ? 'month' : 'year'}
                          </span>
                        )}
                      </div>
                      
                      {'savings' in plan && plan.savings && (
                        <p className="text-sm text-success mt-1">{plan.savings}</p>
                      )}
                    </div>
                    
                    <p className="m3-body-medium text-muted-foreground mt-4">
                      {plan.description}
                    </p>
                  </div>
                </M3CardHeader>
                
                <M3CardContent>
                  <div className="space-y-6">
                    {/* Features */}
                    <div className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-3">
                          <div className={`p-1 rounded ${
                            feature.included ? 'bg-success/20' : 'bg-muted/20'
                          }`}>
                            {feature.included ? (
                              <CheckCircle className="w-4 h-4 text-success" />
                            ) : (
                              <Lock className="w-4 h-4 text-muted-foreground" />
                            )}
                          </div>
                          <span className={`text-sm ${
                            feature.included ? 'text-foreground' : 'text-muted-foreground'
                          }`}>
                            {feature.name}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Limits */}
                    <div className="pt-4 border-t border-border/50">
                      <h4 className="m3-title-small font-semibold text-foreground mb-3">
                        Plan Limits
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Refactorings:</span>
                          <span className="text-foreground">{plan.limits.refactorings}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Code Size:</span>
                          <span className="text-foreground">{plan.limits.codeSize}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Support:</span>
                          <span className="text-foreground">{plan.limits.support}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Features:</span>
                          <span className="text-foreground">{plan.limits.features}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* CTA Button */}
                    <M3Button
                      variant={isCurrentTier ? "outlined" : (plan.popular ? "filled" : "outlined")}
                      size="lg"
                      className="w-full"
                      onClick={() => onSelectTier(tier as 'free' | 'pro' | 'enterprise')}
                      disabled={isCurrentTier}
                    >
                      {isCurrentTier ? 'Current Plan' : plan.cta}
                    </M3Button>
                  </div>
                </M3CardContent>
              </M3Card>
            </motion.div>
          )
        })}
      </div>

      {/* Pay-Per-Use Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <M3Card variant="filled" className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <M3CardHeader>
            <M3CardTitle className="text-center">
              <CreditCard className="w-6 h-6 mx-auto mb-2" />
              Pay-Per-Use Alternative
            </M3CardTitle>
          </M3CardHeader>
          <M3CardContent>
            <div className="text-center">
              <p className="m3-body-medium text-muted-foreground mb-4">
                Don&apos;t want a subscription? Pay only for what you use.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(payPerUse).map(([tier, info]) => (
                  <div key={tier} className="text-center">
                    <div className="text-2xl font-bold text-foreground">
                      ${info.cost.toFixed(2)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      per {tier} refactoring
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {info.description}
                    </div>
                  </div>
                ))}
              </div>
              
              <M3Button
                variant="outlined"
                size="sm"
                className="mt-4"
                onClick={() => {/* Handle pay-per-use */}}
              >
                Learn More About Credits
              </M3Button>
            </div>
          </M3CardContent>
        </M3Card>
      </motion.div>

      {/* Feature Comparison */}
      <div className="text-center">
        <M3Button
          variant="text"
          size="sm"
          onClick={() => setShowComparison(!showComparison)}
        >
          {showComparison ? 'Hide' : 'Show'} Detailed Feature Comparison
        </M3Button>
      </div>

      {showComparison && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <M3Card variant="elevated">
            <M3CardHeader>
              <M3CardTitle>Feature Comparison</M3CardTitle>
            </M3CardHeader>
            <M3CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-3">Feature</th>
                      <th className="text-center p-3">Free</th>
                      <th className="text-center p-3">Pro</th>
                      <th className="text-center p-3">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      'Code Formatting',
                      'Basic Optimization',
                      'Variable Naming',
                      'Security Scan',
                      'Performance Boost',
                      'TypeScript Improvements',
                      'Error Handling',
                      'Code Splitting',
                      'Compliance Check',
                      'Architecture Review',
                      'Team Management',
                      'API Access'
                    ].map((feature, index) => (
                      <tr key={index} className="border-b border-border/50">
                        <td className="p-3 font-medium">{feature}</td>
                        <td className="text-center p-3">
                          {index < 3 ? (
                            <CheckCircle className="w-5 h-5 text-success mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-muted-foreground mx-auto" />
                          )}
                        </td>
                        <td className="text-center p-3">
                          {index < 8 ? (
                            <CheckCircle className="w-5 h-5 text-success mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-muted-foreground mx-auto" />
                          )}
                        </td>
                        <td className="text-center p-3">
                          <CheckCircle className="w-5 h-5 text-success mx-auto" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </M3CardContent>
          </M3Card>
        </motion.div>
      )}
    </div>
  )
}

// Add missing X icon import
function X({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}