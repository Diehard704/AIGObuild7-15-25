'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface PricingTier {
  name: string
  credits: number
  price: number
  originalPrice?: number
  popular?: boolean
  features: string[]
  tokensPerCredit: number
}

export default function PricingPage() {
  const [isLoading, setIsLoading] = useState(false)
  
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
        "Community Support"
      ],
      tokensPerCredit: 4000
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
        "Custom Frameworks"
      ],
      tokensPerCredit: 4000
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
        "Custom Integrations"
      ],
      tokensPerCredit: 4000
    }
  ]

  const handlePurchase = async (tier: PricingTier) => {
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/stripe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create-checkout',
          amount: tier.price,
          credits: tier.credits,
          userID: 'anonymous' // In production, get from auth
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
            Strategic Pricing Architecture
          </motion.h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Powerful AI app generation with aggressive backend infrastructure. 
            More affordable than competitors, with comprehensive template support.
          </p>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-6xl mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-gray-900 rounded-2xl border p-8 ${
                tier.popular 
                  ? 'border-blue-500 scale-105' 
                  : 'border-gray-700'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-blue-400 mb-2">
                  {tier.name}
                </h3>
                
                <div className="mb-4">
                  <span className="text-4xl font-bold">${tier.price}</span>
                  {tier.originalPrice && (
                    <span className="text-xl text-gray-500 line-through ml-2">
                      ${tier.originalPrice}
                    </span>
                  )}
                </div>
                
                <p className="text-gray-400">
                  {tier.credits} App Generations
                </p>
                <p className="text-sm text-gray-500">
                  {tier.tokensPerCredit.toLocaleString()} tokens per generation
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePurchase(tier)}
                disabled={isLoading}
                className={`w-full py-4 rounded-xl font-semibold transition-colors ${
                  tier.popular
                    ? 'bg-blue-500 hover:bg-blue-600 text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-white'
                } disabled:opacity-50`}
              >
                {isLoading ? 'Processing...' : 'Get Started'}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Technical Details */}
        <div className="mt-16 bg-gray-900 rounded-2xl p-8 border border-gray-700">
          <h3 className="text-2xl font-bold text-blue-400 mb-6 text-center">
            Technical Infrastructure Specifications
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
        </div>

        {/* Back to App */}
        <div className="text-center mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/'}
            className="px-8 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-colors"
          >
            ← Back to App Generation
          </motion.button>
        </div>
      </div>
    </div>
  )
}