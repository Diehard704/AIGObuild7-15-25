'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { TypewriterChat } from '@/components/typewriter-chat'

export default function BuildPage() {
  const router = useRouter()
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerateApp = (prompt: string) => {
    setIsGenerating(true)
    // Navigate to the generation page with the prompt
    router.push(`/build/generate?prompt=${encodeURIComponent(prompt)}`)
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-800 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-blue-400">
                Generate Your App
              </h1>
              <p className="text-gray-400 mt-1">
                Describe your idea and watch AI build it for you
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/dashboard')}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-colors"
            >
              View Dashboard
            </motion.button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-4xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-4">
              What would you like to build today?
            </h2>
            <p className="text-gray-400 text-lg">
              Describe your app idea in natural language and our AI will generate it for you
            </p>
          </motion.div>

          <TypewriterChat onGenerate={handleGenerateApp} />

          {/* Loading State */}
          {isGenerating && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-8"
            >
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-blue-400">Preparing your app generation...</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}