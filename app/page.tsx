'use client'

import Logo from '../components/logo'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function LandingPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Animated Background */}
      <div className="absolute inset-0 animated-gradient opacity-20" />

      {/* Particle Background */}
      <div className="absolute inset-0 particles">
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full float" style={{ animationDelay: '0s' }} />
        <div className="absolute top-40 right-32 w-3 h-3 bg-purple-400 rounded-full float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-32 left-1/4 w-1 h-1 bg-pink-400 rounded-full float" style={{ animationDelay: '4s' }} />
        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-cyan-400 rounded-full float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 right-20 w-1 h-1 bg-yellow-400 rounded-full float" style={{ animationDelay: '3s' }} />
      </div>

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-32 left-16 w-32 h-32 border border-blue-400/20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-32 right-16 w-24 h-24 border border-purple-400/20 morphing-shape"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-16 h-16 border border-pink-400/20 rounded-lg"
          animate={{ rotate: 180, scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block"
          >
            <Logo className="w-24 h-24 mb-6 neon-glow" />
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-6xl md:text-8xl font-black mb-6"
        >
          <span className="gradient-text">Build</span>
          <br />
          <span className="text-white">Anything with AI</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-xl md:text-2xl text-blue-200 mb-12 max-w-3xl leading-relaxed"
        >
          Instantly generate, edit, and deploy web apps, dashboards, and more—just by chatting with AI.
          <span className="typewriter-cursor ml-1">|</span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-6 mb-16"
        >
          <motion.a
            href="/build"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-12 py-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xl font-bold rounded-2xl overflow-hidden ripple hover-lift"
          >
            <span className="relative z-10">Start Building Now</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 shimmer" />
          </motion.a>

          <motion.a
            href="/dashboard"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="group px-12 py-6 bg-transparent text-white text-xl font-bold rounded-2xl border-2 border-white/30 hover:border-white/60 transition-all duration-300 hover-lift glass-dark"
          >
            View Dashboard
          </motion.a>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full"
        >
          {[
            {
              icon: "🚀",
              title: "Instant Generation",
              description: "Create complete applications in seconds with AI-powered code generation"
            },
            {
              icon: "🎨",
              title: "Multiple Frameworks",
              description: "Support for Next.js, Vue, React, Python, and more frameworks"
            },
            {
              icon: "⚡",
              title: "Live Preview",
              description: "See your app running instantly with real-time sandbox deployment"
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 + index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="group relative p-8 rounded-2xl glass-dark hover-lift card-3d"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl w-full"
        >
          {[
            { number: "10K+", label: "Apps Generated" },
            { number: "4K", label: "Tokens per App" },
            { number: "60%", label: "Cost Savings" },
            { number: "5+", label: "Frameworks" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.0 + index * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">{stat.number}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Mouse Follower */}
      <motion.div
        className="fixed w-6 h-6 bg-blue-400 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
    </div>
  )
}
