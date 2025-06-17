'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'

interface PaymentResult {
  success: boolean
  credits: number
  userID: string
}

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [paymentResult, setPaymentResult] = useState<PaymentResult | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (sessionId) {
      verifyPayment(sessionId)
    }
  }, [sessionId])

  const verifyPayment = async (sessionId: string) => {
    try {
      const response = await fetch('/api/stripe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'verify-session',
          sessionId
        })
      })

      const result = await response.json()
      setPaymentResult(result)
    } catch (error) {
      console.error('Payment verification failed:', error)
      setPaymentResult({ success: false, credits: 0, userID: '' })
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-blue-400 text-lg">Verifying Payment...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-8">
      <div className="max-w-2xl w-full">
        {paymentResult?.success ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            {/* Success Animation */}
            <div className="relative mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="absolute inset-0 bg-green-500/20 rounded-full blur-3xl scale-150"
              />
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-bold text-green-400 mb-4"
            >
              Payment Successful! 🎉
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-300 mb-8"
            >
              Your credits have been successfully added to your account.
            </motion.p>

            {/* Credits Display */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gray-900 rounded-2xl p-8 border border-green-500/20 mb-8"
            >
              <h3 className="text-2xl font-semibold text-blue-400 mb-4">
                Credits Added
              </h3>
              
              <div className="text-center">
                <div className="text-5xl font-bold text-green-400 mb-2">
                  {paymentResult.credits}
                </div>
                <p className="text-gray-400">
                  App Generation Credits
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Each credit = 4,000 AI tokens for comprehensive app creation
                </p>
              </div>
            </motion.div>

            {/* Next Steps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-semibold text-blue-400 mb-4">
                Ready to Build? 🚀
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.location.href = '/'}
                  className="px-8 py-4 bg-blue-500 hover:bg-blue-600 rounded-xl font-semibold transition-colors"
                >
                  Start Building Apps
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.location.href = '/dashboard'}
                  className="px-8 py-4 bg-gray-700 hover:bg-gray-600 rounded-xl font-semibold transition-colors"
                >
                  View Dashboard
                </motion.button>
              </div>
            </motion.div>

          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>

            <h1 className="text-4xl font-bold text-red-400 mb-4">
              Payment Failed
            </h1>
            
            <p className="text-xl text-gray-300 mb-8">
              There was an issue processing your payment.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/pricing'}
              className="px-8 py-4 bg-blue-500 hover:bg-blue-600 rounded-xl font-semibold transition-colors"
            >
              Try Again
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  )
}