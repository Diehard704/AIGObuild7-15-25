'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Code, Sparkles, Rocket, Brain, CircuitBoard } from 'lucide-react'

interface LoadingScreenProps {
  type: 'neural' | 'matrix' | 'ai-brain' | 'code-gen' | 'hologram' | 'particle'
  onComplete?: () => void
  duration?: number
}

export function LoadingScreen({ type = 'neural', onComplete, duration = 3000 }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [currentPhase, setCurrentPhase] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / (duration / 50))
        if (newProgress >= 100) {
          clearInterval(interval)
          setTimeout(() => onComplete?.(), 500)
          return 100
        }
        return newProgress
      })
    }, 50)

    const phaseInterval = setInterval(() => {
      setCurrentPhase(prev => (prev + 1) % 4)
    }, duration / 4)

    return () => {
      clearInterval(interval)
      clearInterval(phaseInterval)
    }
  }, [duration, onComplete])

  const phases = [
    'Initializing AI Systems...',
    'Loading Neural Networks...',
    'Optimizing Code Generation...',
    'Ready to Build!'
  ]

  switch (type) {
    case 'neural':
      return <NeuralNetworkLoading progress={progress} phase={phases[currentPhase]} />
    case 'matrix':
      return <MatrixLoading progress={progress} phase={phases[currentPhase]} />
    case 'ai-brain':
      return <AIBrainLoading progress={progress} phase={phases[currentPhase]} />
    case 'code-gen':
      return <CodeGenerationLoading progress={progress} phase={phases[currentPhase]} />
    case 'hologram':
      return <HologramLoading progress={progress} phase={phases[currentPhase]} />
    case 'particle':
      return <ParticleLoading progress={progress} phase={phases[currentPhase]} />
    default:
      return <NeuralNetworkLoading progress={progress} phase={phases[currentPhase]} />
  }
}

// 1. Neural Network Loading
function NeuralNetworkLoading({ progress, phase }: { progress: number; phase: string }) {
  const nodes = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.cos((i * 2 * Math.PI) / 12) * 120,
    y: Math.sin((i * 2 * Math.PI) / 12) * 120,
    delay: i * 0.1
  }))

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center z-50"
    >
      <div className="text-center">
        {/* Neural Network Visualization */}
        <div className="relative w-80 h-80 mx-auto mb-8">
          {/* Connections */}
          <svg className="absolute inset-0 w-full h-full">
            {nodes.map((node, i) => 
              nodes.slice(i + 1).map((otherNode, j) => (
                <motion.line
                  key={`${i}-${j}`}
                  x1={node.x + 160}
                  y1={node.y + 160}
                  x2={otherNode.x + 160}
                  y2={otherNode.y + 160}
                  stroke="url(#gradient)"
                  strokeWidth="1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: progress / 100,
                    opacity: progress > 20 ? 0.6 : 0 
                  }}
                  transition={{ delay: (i + j) * 0.1 }}
                />
              ))
            )}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>

          {/* Nodes */}
          {nodes.map((node) => (
            <motion.div
              key={node.id}
              className="absolute w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
              style={{
                left: node.x + 152,
                top: node.y + 152
              }}
              animate={{
                scale: [1, 1.5, 1],
                boxShadow: [
                  "0 0 0 0 rgba(59, 130, 246, 0.7)",
                  "0 0 0 10px rgba(59, 130, 246, 0)",
                  "0 0 0 0 rgba(59, 130, 246, 0)"
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: node.delay
              }}
            />
          ))}

          {/* Center AI Icon */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Brain className="w-8 h-8 text-white" />
            </div>
          </motion.div>
        </div>

        {/* Progress Bar */}
        <div className="w-80 mx-auto mb-4">
          <div className="w-full bg-slate-700 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Status Text */}
        <motion.p
          key={phase}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white text-lg font-medium"
        >
          {phase}
        </motion.p>

        <motion.p
          className="text-blue-300 text-sm mt-2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {Math.round(progress)}% Complete
        </motion.p>
      </div>
    </motion.div>
  )
}

// 2. Matrix Code Rain Loading
function MatrixLoading({ progress, phase }: { progress: number; phase: string }) {
  const [matrixChars, setMatrixChars] = useState<string[]>([])

  useEffect(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()'.split('')
    const columns = Math.floor(window.innerWidth / 20)
    const drops = Array(columns).fill(1)
    
    const interval = setInterval(() => {
      setMatrixChars(prev => {
        const newChars = [...prev]
        drops.forEach((drop, i) => {
          const char = chars[Math.floor(Math.random() * chars.length)]
          newChars[i * 50 + drop] = char
          if (drop * 20 > window.innerHeight && Math.random() > 0.975) {
            drops[i] = 0
          }
          drops[i]++
        })
        return newChars
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black flex items-center justify-center z-50 overflow-hidden"
    >
      {/* Matrix Rain Background */}
      <div className="absolute inset-0">
        {matrixChars.map((char, i) => (
          <motion.span
            key={i}
            className="absolute text-green-400 font-mono text-sm"
            style={{
              left: (i % 50) * 20,
              top: Math.floor(i / 50) * 20
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.5 }}
          >
            {char}
          </motion.span>
        ))}
      </div>

      {/* Center Content */}
      <div className="relative z-10 text-center">
        <motion.div
          className="text-6xl font-bold text-green-400 mb-8 font-mono"
          animate={{
            textShadow: [
              "0 0 10px #00ff00",
              "0 0 20px #00ff00",
              "0 0 10px #00ff00"
            ]
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          AI.BUILD
        </motion.div>

        <motion.div
          className="w-80 bg-green-900 rounded-full h-2 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-green-400 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            style={{
              boxShadow: "0 0 10px #00ff00"
            }}
          />
        </motion.div>

        <motion.p
          className="text-green-400 font-mono text-lg"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          {phase}
        </motion.p>
      </div>
    </motion.div>
  )
}

// 3. AI Brain Loading
function AIBrainLoading({ progress, phase }: { progress: number; phase: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center z-50"
    >
      <div className="text-center">
        {/* 3D Brain Visualization */}
        <motion.div
          className="relative w-64 h-64 mx-auto mb-8"
          animate={{ rotateY: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          {/* Brain Outline */}
          <motion.svg
            className="w-full h-full"
            viewBox="0 0 200 200"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <path
              d="M100 20C130 20 160 40 170 70C180 100 170 130 150 150C130 170 70 170 50 150C30 130 20 100 30 70C40 40 70 20 100 20Z"
              fill="none"
              stroke="url(#brainGradient)"
              strokeWidth="3"
            />
            <defs>
              <linearGradient id="brainGradient">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </motion.svg>

          {/* Neural Pulses */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-cyan-400 rounded-full"
              style={{
                left: `${20 + (i * 20)}%`,
                top: `${30 + Math.sin(i) * 40}%`
              }}
              animate={{
                scale: [0, 1.5, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </motion.div>

        {/* Thinking Bubbles */}
        <div className="flex justify-center space-x-4 mb-8">
          {['AI', 'ML', 'CODE'].map((text, i) => (
            <motion.div
              key={text}
              className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm"
              animate={{
                y: [0, -10, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3
              }}
            >
              {text}
            </motion.div>
          ))}
        </div>

        {/* Progress */}
        <div className="w-80 mx-auto">
          <motion.div
            className="bg-gradient-to-r from-purple-500 to-cyan-500 h-1 rounded-full mb-4"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
          <motion.p
            className="text-white text-lg font-medium"
            key={phase}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {phase}
          </motion.p>
        </div>
      </div>
    </motion.div>
  )
}

// 4. Code Generation Loading
function CodeGenerationLoading({ progress, phase }: { progress: number; phase: string }) {
  const [codeLines, setCodeLines] = useState<string[]>([])

  const sampleCode = [
    "import React from 'react'",
    "function App() {",
    "  const [state, setState] = useState()",
    "  return (",
    "    <div className='app'>",
    "      <h1>AI Generated App</h1>",
    "    </div>",
    "  )",
    "}"
  ]

  useEffect(() => {
    let lineIndex = 0
    const interval = setInterval(() => {
      if (lineIndex < sampleCode.length) {
        setCodeLines(prev => [...prev, sampleCode[lineIndex]])
        lineIndex++
      } else {
        setCodeLines([])
        lineIndex = 0
      }
    }, 300)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-slate-900 flex items-center justify-center z-50"
    >
      <div className="text-center max-w-2xl">
        {/* Code Editor Mockup */}
        <div className="bg-slate-800 rounded-lg p-6 mb-8 text-left">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-slate-400 text-sm ml-2">Generating App.tsx</span>
          </div>

          <div className="font-mono text-sm space-y-1">
            {codeLines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-slate-300"
              >
                <span className="text-slate-500 mr-4">{i + 1}</span>
                <span className="text-blue-400">
                  {line.includes('import') && 'import '}
                  {line.includes('function') && 'function '}
                  {line.includes('const') && 'const '}
                </span>
                <span className="text-emerald-400">
                  {line.replace(/^(import |function |const )/, '')}
                </span>
              </motion.div>
            ))}
            
            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-slate-300"
            >
              <span className="text-slate-500 mr-4">{codeLines.length + 1}</span>
              <span className="bg-blue-500 w-2 h-5 inline-block">│</span>
            </motion.div>
          </div>
        </div>

        {/* Progress and Status */}
        <div className="w-96 mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <Code className="w-6 h-6 text-blue-400" />
            <div className="flex-1 bg-slate-700 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-emerald-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-slate-400 text-sm">{Math.round(progress)}%</span>
          </div>

          <motion.p
            className="text-white text-lg font-medium"
            key={phase}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {phase}
          </motion.p>
        </div>
      </div>
    </motion.div>
  )
}

// 5. Hologram Loading
function HologramLoading({ progress, phase }: { progress: number; phase: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black flex items-center justify-center z-50"
    >
      <div className="text-center">
        {/* Hologram Effect */}
        <motion.div
          className="relative w-80 h-80 mx-auto mb-8"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {/* Scanning Lines */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent"
            animate={{ y: [-320, 320] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            style={{
              height: "2px",
              boxShadow: "0 0 20px #00ffff"
            }}
          />

          {/* Holographic Logo */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              opacity: [0.7, 1, 0.7],
              filter: [
                "blur(0px) hue-rotate(0deg)",
                "blur(1px) hue-rotate(90deg)",
                "blur(0px) hue-rotate(180deg)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="text-6xl font-bold text-cyan-400 font-mono">
              AI
            </div>
          </motion.div>

          {/* Glitch Lines */}
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-cyan-400/20 h-0.5 w-full"
              style={{ top: `${i * 20}%` }}
              animate={{
                opacity: [0, 1, 0],
                scaleX: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 0.1,
                repeat: Infinity,
                delay: Math.random() * 2,
                repeatDelay: Math.random() * 3
              }}
            />
          ))}
        </motion.div>

        {/* Status */}
        <motion.div
          className="text-cyan-400 font-mono"
          animate={{
            textShadow: [
              "0 0 10px #00ffff",
              "0 0 20px #00ffff",
              "0 0 10px #00ffff"
            ]
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <p className="text-xl mb-2">SYSTEM LOADING...</p>
          <p className="text-sm opacity-75">{phase}</p>
          <p className="text-lg mt-2">[{Math.round(progress)}%]</p>
        </motion.div>
      </div>
    </motion.div>
  )
}

// 6. Particle System Loading
function ParticleLoading({ progress, phase }: { progress: number; phase: string }) {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    delay: Math.random() * 2,
    duration: 2 + Math.random() * 3,
    size: 2 + Math.random() * 4
  }))

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-br from-slate-900 to-indigo-900 flex items-center justify-center z-50 overflow-hidden"
    >
      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 100 - 50, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Center Content */}
      <div className="relative z-10 text-center">
        <motion.div
          className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Sparkles className="w-16 h-16 text-white" />
        </motion.div>

        <motion.h2
          className="text-4xl font-bold text-white mb-4"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          AI Builder
        </motion.h2>

        <div className="w-80 mx-auto">
          <div className="w-full bg-slate-700 rounded-full h-2 mb-4">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
            />
          </div>

          <motion.p
            className="text-white text-lg"
            key={phase}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {phase}
          </motion.p>
        </div>
      </div>
    </motion.div>
  )
}