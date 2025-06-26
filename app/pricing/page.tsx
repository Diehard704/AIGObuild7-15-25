'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Star, Zap, Crown, Users, Rocket } from 'lucide-react'

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
}

export default function PricingPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedTier, setSelectedTier] = useState<string | null>(null)

  const pricingTiers: PricingTier[] = [
    {
      name: "Starter Pack",
      credits: 5,
      price: 9,
      originalPrice: 15,
      features: [
        "5 AI App Generations",
        "Next.js & React Templates",
        "Basic E2B Deployment",
        "Community Support",
        "Standard Response Time"
      ],
      tokensPerCredit: 4000,
      icon: <Zap className="w-6 h-6" />,
      color: "from-blue-500 to-blue-600"
    },
    {
      name: "Developer Pro",
      credits: 15,
      price: 24,
      originalPrice: 40,
      popular: true,
      features: [
        "15 AI App Generations",
        "All Premium Templates",
        "Advanced E2B Deployment",
        "Priority Support",
        "Custom Frameworks",
        "Faster Response Time",
        "Team Collaboration"
      ],
      tokensPerCredit: 4000,
      icon: <Crown className="w-6 h-6" />,
      color: "from-purple-500 to-purple-600"
    },
    {
      name: "Agency Scale",
      credits: 50,
      price: 69,
      originalPrice: 120,
      features: [
        "50 AI App Generations",
        "Unlimited Templates",
        "Professional E2B Hosting",
        "Dedicated Support",
        "Team Collaboration",
        "Custom Integrations",
        "Priority Queue",
        "Advanced Analytics"
      ],
      tokensPerCredit: 4000,
      icon: <Rocket className="w-6 h-6" />,
      color: "from-green-500 to-green-600"
    }
  ]

  const handlePurchase = async (tier: PricingTier) => {
    setIsLoading(true)
    setSelectedTier(tier.name)

    try {
      const response = await fetch('/api/stripe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create-checkout',
          amount: tier.price,
          credits: tier.credits,
          userID: 'anonymous'
        })
      })

      const { url } = await response.json()
      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error('Purchase failed:', error)
    } finally {
      setIsLoading(false)
      setSelectedTier(null)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-gray-800 p-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-blue-400 mb-4"
          >
            Choose Your Plan
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Start building amazing applications with AI. Choose the plan that fits your needs.
          </motion.p>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-gray-900 rounded-2xl border p-8 ${tier.popular
                ? 'border-purple-500 scale-105 shadow-2xl shadow-purple-500/20'
                : 'border-gray-700 hover:border-gray-600'
                } transition-all duration-300 hover:scale-105`}
            >
              {tier.popular && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                >
                  <span className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    Most Popular
                  </span>
                </motion.div>
              )}

              <div className="text-center mb-8">
                <div className={`w-16 h-16 bg-gradient-to-r ${tier.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  {tier.icon}
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">
                  {tier.name}
                </h3>

                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">${tier.price}</span>
                  {tier.originalPrice && (
                    <span className="text-xl text-gray-500 line-through ml-2">
                      ${tier.originalPrice}
                    </span>
                  )}
                </div>

                <p className="text-gray-400 mb-2">
                  {tier.credits} App Generations
                </p>
                <p className="text-sm text-gray-500">
                  {tier.tokensPerCredit.toLocaleString()} tokens per generation
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <motion.li
                    key={featureIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + featureIndex * 0.05 }}
                    className="flex items-center"
                  >
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handlePurchase(tier)}
                disabled={isLoading}
                className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 ${tier.popular
                  ? 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-lg shadow-purple-500/25'
                  : 'bg-gray-700 hover:bg-gray-600 text-white'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isLoading && selectedTier === tier.name ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </div>
                ) : (
                  'Get Started'
                )}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gray-900 rounded-2xl p-8 border border-gray-700 mb-16"
        >
          <h3 className="text-2xl font-bold text-blue-400 mb-8 text-center">
            Feature Comparison
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-4 px-4 text-gray-400">Feature</th>
                  <th className="text-center py-4 px-4 text-gray-400">Starter</th>
                  <th className="text-center py-4 px-4 text-gray-400">Pro</th>
                  <th className="text-center py-4 px-4 text-gray-400">Agency</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-800">
                  <td className="py-4 px-4 text-white">App Generations</td>
                  <td className="text-center py-4 px-4 text-gray-300">5</td>
                  <td className="text-center py-4 px-4 text-gray-300">15</td>
                  <td className="text-center py-4 px-4 text-gray-300">50</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-4 px-4 text-white">Templates</td>
                  <td className="text-center py-4 px-4 text-gray-300">Basic</td>
                  <td className="text-center py-4 px-4 text-gray-300">All</td>
                  <td className="text-center py-4 px-4 text-gray-300">Unlimited</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-4 px-4 text-white">Support</td>
                  <td className="text-center py-4 px-4 text-gray-300">Community</td>
                  <td className="text-center py-4 px-4 text-gray-300">Priority</td>
                  <td className="text-center py-4 px-4 text-gray-300">Dedicated</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-4 px-4 text-white">Team Features</td>
                  <td className="text-center py-4 px-4 text-gray-300">-</td>
                  <td className="text-center py-4 px-4 text-gray-300">✓</td>
                  <td className="text-center py-4 px-4 text-gray-300">✓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gray-900 rounded-2xl p-8 border border-gray-700 mb-16"
        >
          <h3 className="text-2xl font-bold text-blue-400 mb-8 text-center">
            Why Choose FragmentsPro?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">4,000</div>
              <p className="text-gray-400">Tokens per Generation</p>
              <p className="text-sm text-gray-500 mt-2">
                Optimized for comprehensive app creation
              </p>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">5+</div>
              <p className="text-gray-400">Framework Templates</p>
              <p className="text-sm text-gray-500 mt-2">
                Next.js, Vue, Streamlit, Python & more
              </p>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">60%</div>
              <p className="text-gray-400">Cost Savings vs Competitors</p>
              <p className="text-sm text-gray-500 mt-2">
                Premium features at startup-friendly pricing
              </p>
            </div>
          </div>
        </motion.div>

        {/* Back to App */}
        <div className="text-center mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/'}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold transition-colors"
          >
            Back to App Builder
          </motion.button>
        </div>
      </div>
    </div>
  )
}