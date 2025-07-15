'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import { M3Button } from '@/components/ui/m3-button'
import { M3Card, M3CardContent, M3CardHeader, M3CardTitle } from '@/components/ui/m3-card'
import {
  Check,
  Star,
  Zap,
  Sparkles,
  Rocket,
  Shield,
  Clock,
  Users,
  Globe,
  Award,
  TrendingUp,
  Crown,
  Gift,
  ArrowRight
} from 'lucide-react'

interface PricingTier {
  name: string
  credits: number
  price: number
  originalPrice?: number
  popular?: boolean
  features: string[]
  tokensPerCredit: number
  icon: React.ReactNode
  color: string
  badge?: string
}

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const pricingTiers: PricingTier[] = [
    {
      name: "Starter Pack",
      credits: 5,
      price: 9,
      originalPrice: 15,
      features: [
        "5 app generations",
        "4,000 tokens per generation",
        "All templates included",
        "Basic support",
        "Community access",
        "Export code"
      ],
      tokensPerCredit: 4000,
      icon: <Zap className="w-6 h-6" />,
      color: "from-primary to-secondary",
      badge: "Most Popular"
    },
    {
      name: "Developer Pro",
      credits: 15,
      price: 24,
      originalPrice: 40,
      popular: true,
      features: [
        "15 app generations",
        "4,000 tokens per generation",
        "Priority generation queue",
        "Advanced templates",
        "Email support",
        "API access",
        "Custom deployments",
        "Analytics dashboard"
      ],
      tokensPerCredit: 4000,
      icon: <Rocket className="w-6 h-6" />,
      color: "from-secondary to-tertiary"
    },
    {
      name: "Agency Scale",
      credits: 50,
      price: 69,
      originalPrice: 120,
      features: [
        "50 app generations",
        "4,000 tokens per generation",
        "Highest priority queue",
        "All premium templates",
        "Priority support",
        "Team collaboration",
        "Custom integrations",
        "White-label options",
        "Dedicated account manager"
      ],
      tokensPerCredit: 4000,
      icon: <Crown className="w-6 h-6" />,
      color: "from-tertiary to-warning"
    }
  ]

  const benefits = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure & Reliable",
      description: "Enterprise-grade security with 99.9% uptime guarantee"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Generate apps in under 30 seconds with our optimized AI"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community Driven",
      description: "Join thousands of developers building amazing apps"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Deployment",
      description: "Deploy your apps instantly to production environments"
    }
  ]

  const { data: session } = useSession()

  const handlePurchase = async (tier: PricingTier) => {
    if (!session) {
      window.location.href = '/auth/signin'
      return
    }

    setIsProcessing(true)
    setSelectedPlan(tier.name)

    try {
      const response = await fetch('/api/payments/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          featureId: tier.name.toLowerCase().replace(' ', '_'),
          amount: tier.price,
          credits: tier.credits
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
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="border-b border-border/50 p-6"
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            className="m3-headline-large font-bold text-foreground mb-4"
            whileHover={{ scale: 1.02 }}
          >
            Choose Your Plan
          </motion.h1>
          <p className="m3-body-large text-muted-foreground max-w-3xl mx-auto">
            Start building amazing applications with our AI-powered platform.
            Choose the plan that fits your development needs.
          </p>
        </div>
      </motion.div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-full flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    {tier.badge}
                  </span>
                </div>
              )}

              <M3Card
                variant={tier.popular ? "elevated" : "filled"}
                className={`h-full relative ${tier.popular ? 'ring-2 ring-primary' : ''}`}
              >
                <M3CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 bg-gradient-to-r ${tier.color} rounded-2xl flex items-center justify-center mx-auto mb-4 text-white`}>
                    {tier.icon}
                  </div>
                  <M3CardTitle className="m3-headline-medium font-bold text-foreground">
                    {tier.name}
                  </M3CardTitle>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="m3-display-small font-bold text-foreground">
                      ${tier.price}
                    </span>
                    {tier.originalPrice && (
                      <span className="m3-body-medium text-muted-foreground line-through">
                        ${tier.originalPrice}
                      </span>
                    )}
                  </div>
                  <p className="m3-body-small text-muted-foreground">
                    {tier.credits} credits • {tier.tokensPerCredit.toLocaleString()} tokens each
                  </p>
                </M3CardHeader>

                <M3CardContent className="space-y-6">
                  <div className="space-y-3">
                    {tier.features.map((feature, featureIndex) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (index * 0.1) + (featureIndex * 0.05) }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-5 h-5 bg-success/20 rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 text-success" />
                        </div>
                        <span className="m3-body-medium text-foreground">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  <M3Button
                    variant={tier.popular ? "filled" : "outlined"}
                    size="lg"
                    className="w-full group"
                    onClick={() => handlePurchase(tier)}
                    disabled={isProcessing && selectedPlan === tier.name}
                  >
                    {isProcessing && selectedPlan === tier.name ? (
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                    ) : (
                      <Sparkles className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                    )}
                    {isProcessing && selectedPlan === tier.name ? 'Processing...' : 'Get Started'}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </M3Button>
                </M3CardContent>
              </M3Card>
            </motion.div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="m3-headline-medium font-bold text-foreground text-center mb-12">
            Why Choose aiGo.build?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <M3Card variant="filled" className="h-full text-center">
                  <M3CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                      {benefit.icon}
                    </div>
                    <h3 className="m3-title-medium font-semibold text-foreground mb-2">
                      {benefit.title}
                    </h3>
                    <p className="m3-body-small text-muted-foreground">
                      {benefit.description}
                    </p>
                  </M3CardContent>
                </M3Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Comparison Section */}
        <div className="mb-16">
          <h2 className="m3-headline-medium font-bold text-foreground text-center mb-8">
            Compare with Competitors
          </h2>
          <M3Card variant="elevated">
            <M3CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <h3 className="m3-title-large font-semibold text-foreground mb-2">aiGo.build</h3>
                  <div className="text-2xl font-bold text-primary mb-2">$9</div>
                  <p className="m3-body-small text-muted-foreground mb-4">5 generations</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-center gap-2">
                      <Check className="w-4 h-4 text-success" />
                      <span>4,000 tokens per generation</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Check className="w-4 h-4 text-success" />
                      <span>All templates included</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Check className="w-4 h-4 text-success" />
                      <span>Real deployment</span>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="m3-title-large font-semibold text-foreground mb-2">Manus</h3>
                  <div className="text-2xl font-bold text-muted-foreground mb-2">$15</div>
                  <p className="m3-body-small text-muted-foreground mb-4">5 generations</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-center gap-2">
                      <Check className="w-4 h-4 text-success" />
                      <span>Limited tokens</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Check className="w-4 h-4 text-success" />
                      <span>Basic templates</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 text-muted-foreground">✕</div>
                      <span>Preview only</span>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="m3-title-large font-semibold text-foreground mb-2">Lovable</h3>
                  <div className="text-2xl font-bold text-muted-foreground mb-2">$20</div>
                  <p className="m3-body-small text-muted-foreground mb-4">5 generations</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-center gap-2">
                      <Check className="w-4 h-4 text-success" />
                      <span>Standard tokens</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Check className="w-4 h-4 text-success" />
                      <span>Good templates</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 text-muted-foreground">✕</div>
                      <span>No deployment</span>
                    </div>
                  </div>
                </div>
              </div>
            </M3CardContent>
          </M3Card>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="m3-headline-medium font-bold text-foreground text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <M3Card variant="filled">
              <M3CardContent className="p-6">
                <h3 className="m3-title-medium font-semibold text-foreground mb-2">
                  How many tokens do I get per generation?
                </h3>
                <p className="m3-body-small text-muted-foreground">
                  Each generation uses 4,000 tokens, which is optimized for comprehensive app creation with detailed features and functionality.
                </p>
              </M3CardContent>
            </M3Card>

            <M3Card variant="filled">
              <M3CardContent className="p-6">
                <h3 className="m3-title-medium font-semibold text-foreground mb-2">
                  Can I deploy my generated apps?
                </h3>
                <p className="m3-body-small text-muted-foreground">
                  Yes! All plans include E2B deployment capabilities, allowing you to deploy your apps to production environments instantly.
                </p>
              </M3CardContent>
            </M3Card>

            <M3Card variant="filled">
              <M3CardContent className="p-6">
                <h3 className="m3-title-medium font-semibold text-foreground mb-2">
                  What templates are available?
                </h3>
                <p className="m3-body-small text-muted-foreground">
                  We support Next.js, Vue.js, Streamlit, Gradio, and more. All templates are included with every plan.
                </p>
              </M3CardContent>
            </M3Card>

            <M3Card variant="filled">
              <M3CardContent className="p-6">
                <h3 className="m3-title-medium font-semibold text-foreground mb-2">
                  Is there a free trial?
                </h3>
                <p className="m3-body-small text-muted-foreground">
                  Yes! Start with our free tier to experience the platform, then upgrade when you&apos;re ready to build more.
                </p>
              </M3CardContent>
            </M3Card>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <M3Card variant="elevated" className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <M3CardContent className="p-8">
              <h2 className="m3-headline-medium font-bold text-foreground mb-4">
                Ready to Start Building? 🚀
              </h2>
              <p className="m3-body-large text-muted-foreground mb-6 max-w-2xl mx-auto">
                Join thousands of developers creating amazing applications with AI.
                Choose your plan and start building today!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <M3Button
                  variant="filled"
                  size="lg"
                  onClick={() => handlePurchase(pricingTiers[0])}
                  className="group"
                >
                  <Rocket className="w-4 h-4 mr-2" />
                  Start with Starter Pack
                  <Sparkles className="w-4 h-4 ml-2 group-hover:rotate-12 transition-transform" />
                </M3Button>

                <M3Button
                  variant="outlined"
                  size="lg"
                  onClick={() => window.location.href = '/build'}
                >
                  <Gift className="w-4 h-4 mr-2" />
                  Try for Free
                </M3Button>
              </div>
            </M3CardContent>
          </M3Card>
        </motion.div>
      </div>
    </div>
  )
}