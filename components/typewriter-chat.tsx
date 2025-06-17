'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

const suggestions = [
  "Build a modern e-commerce platform...",
  "Create a social media dashboard...",
  "Design a portfolio website...",
  "Develop a task management app...",
  "Make a weather application...",
  "Build a real estate platform..."
]

export function TypewriterChat() {
  const [currentText, setCurrentText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [input, setInput] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const suggestion = suggestions[currentIndex]
    let charIndex = 0

    const timer = setInterval(() => {
      if (charIndex < suggestion.length) {
        setCurrentText(suggestion.slice(0, charIndex + 1))
        charIndex++
      } else {
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
      router.push(`/build?prompt=${encodeURIComponent(input)}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <motion.div 
        className={`
          relative group
          ${isFocused ? 'scale-[1.02]' : 'scale-100'}
          transition-all duration-500
        `}
        whileHover={{ scale: 1.01 }}
      >
        {/* Candlelight glow effect */}
        <div className={`
          absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20
          rounded-3xl blur-2xl transform scale-110 transition-all duration-500
          ${isFocused ? 'opacity-100 scale-125' : 'opacity-60'}
        `} />

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
            className="w-full bg-transparent text-blue-100 placeholder-blue-300/60 text-xl outline-none resize-none font-light"
            style={{ overflow: 'hidden' }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSubmit(e)
              }
            }}
          />

          {/* Submit button that appears when typing */}
          {input.trim() && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="flex justify-end mt-6"
            >
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-8 py-3 rounded-full overflow-hidden bg-gradient-to-r from-blue-500/30 to-purple-500/30 text-blue-300 border border-blue-400/30"
              >
                <span className="relative z-10 font-medium">Create 🚀</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-lg" />
              </motion.button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </form>
  )
}
