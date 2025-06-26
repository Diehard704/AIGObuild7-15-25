'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const suggestions = [
  "Build a modern e-commerce platform...",
  "Create a social media dashboard...",
  "Design a portfolio website...",
  "Develop a task management app...",
  "Make a weather application...",
  "Build a real estate platform...",
  "Create a fitness tracking app...",
  "Design a restaurant menu system...",
  "Build a project management tool...",
  "Create a music streaming interface..."
]

interface TypewriterChatProps {
  onGenerate: (prompt: string) => void
}

export function TypewriterChat({ onGenerate }: TypewriterChatProps) {
  const [currentText, setCurrentText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [input, setInput] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [showParticles, setShowParticles] = useState(false)

  useEffect(() => {
    const suggestion = suggestions[currentIndex]
    let charIndex = 0
    setIsTyping(true)

    const timer = setInterval(() => {
      if (charIndex < suggestion.length) {
        setCurrentText(suggestion.slice(0, charIndex + 1))
        charIndex++
      } else {
        setIsTyping(false)
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % suggestions.length)
          setCurrentText('')
        }, 2000)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [currentIndex])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      setShowParticles(true)
      setTimeout(() => {
        onGenerate(input.trim())
        setShowParticles(false)
      }, 500)
    }
  }

  return (
    <div className="relative w-full max-w-4xl">
      {/* Particle Effects */}
      <AnimatePresence>
        {showParticles && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none"
          >
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: Math.random() * 800 - 400,
                  y: Math.random() * 600 - 300,
                  scale: 0,
                  opacity: 1
                }}
                animate={{
                  x: Math.random() * 1600 - 800,
                  y: Math.random() * 1200 - 600,
                  scale: [0, 1, 0],
                  opacity: [1, 1, 0]
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  ease: "easeOut"
                }}
                className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="w-full">
        <motion.div
          className={`
            relative group
            ${isFocused ? 'scale-[1.02]' : 'scale-100'}
            transition-all duration-500
          `}
          whileHover={{ scale: 1.01 }}
        >
          {/* Enhanced Candlelight glow effect */}
          <motion.div
            className={`
              absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30
              rounded-3xl blur-3xl transform scale-110 transition-all duration-500
              ${isFocused ? 'opacity-100 scale-125' : 'opacity-60'}
            `}
            animate={isFocused ? {
              background: [
                "linear-gradient(45deg, rgba(59,130,246,0.3), rgba(147,51,234,0.3))",
                "linear-gradient(45deg, rgba(147,51,234,0.3), rgba(236,72,153,0.3))",
                "linear-gradient(45deg, rgba(236,72,153,0.3), rgba(59,130,246,0.3))"
              ]
            } : {}}
            transition={{ duration: 3, repeat: Infinity }}
          />

          {/* Floating Elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
            <motion.div
              className="absolute top-4 left-4 w-2 h-2 bg-blue-400 rounded-full"
              animate={{
                y: [0, -10, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute top-8 right-8 w-1 h-1 bg-purple-400 rounded-full"
              animate={{
                y: [0, -8, 0],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
            <motion.div
              className="absolute bottom-6 left-1/2 w-1.5 h-1.5 bg-pink-400 rounded-full"
              animate={{
                y: [0, -12, 0],
                opacity: [0.4, 1, 0.4]
              }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
          </div>

          {/* Main input container - the "candle" */}
          <div className={`
            relative bg-black/60 rounded-3xl p-8
            backdrop-blur-xl border border-blue-500/20
            transition-all duration-500
            ${isFocused ? 'shadow-[0_0_80px_-12px_rgba(59,130,246,0.6)] border-blue-400/30' : 'shadow-[0_0_40px_-12px_rgba(59,130,246,0.3)]'}
          `}>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={currentText}
              rows={1}
              className="w-full bg-transparent text-blue-100 placeholder-blue-300/60 text-xl outline-none resize-none font-light relative z-10"
              style={{ overflow: 'hidden' }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSubmit(e)
                }
              }}
            />

            {/* Typewriter Cursor */}
            <AnimatePresence>
              {isTyping && !input && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute left-8 top-8 text-blue-300 typewriter-cursor"
                  style={{ left: `${currentText.length * 0.6}em` }}
                >
                  |
                </motion.span>
              )}
            </AnimatePresence>

            {/* Submit button that appears when typing */}
            <AnimatePresence>
              {input.trim() && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.8 }}
                  className="flex justify-end mt-6"
                >
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative px-8 py-3 rounded-full overflow-hidden bg-gradient-to-r from-blue-500/30 to-purple-500/30 text-blue-300 border border-blue-400/30 group ripple"
                  >
                    <span className="relative z-10 font-medium flex items-center gap-2">
                      Create
                      <motion.span
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        🚀
                      </motion.span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-lg" />
                    <div className="absolute inset-0 shimmer" />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </form>

      {/* Quick Suggestions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="mt-8 flex flex-wrap gap-3 justify-center"
      >
        {suggestions.slice(0, 4).map((suggestion, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setInput(suggestion)}
            className="px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-full text-sm text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-300 hover-lift"
          >
            {suggestion.split('...')[0]}
          </motion.button>
        ))}
      </motion.div>
    </div>
  )
}
