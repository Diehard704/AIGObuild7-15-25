'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface UserStats {
  totalCredits: number
  usedCredits: number
  remainingCredits: number
  totalAppsGenerated: number
  totalTokensUsed: number
}

interface GeneratedApp {
  id: string
  title: string
  prompt: string
  template: string
  createdAt: string
  status: 'generating' | 'ready' | 'deployed'
  previewUrl?: string
  deploymentUrl?: string
}

export default function DashboardPage() {
  const [userStats, setUserStats] = useState<UserStats>({
    totalCredits: 15,
    usedCredits: 3,
    remainingCredits: 12,
    totalAppsGenerated: 3,
    totalTokensUsed: 12000
  })

  const [recentApps, setRecentApps] = useState<GeneratedApp[]>([
    {
      id: '1',
      title: 'E-commerce Platform',
      prompt: 'Build a modern e-commerce platform with cart functionality',
      template: 'nextjs-developer',
      createdAt: '2024-06-16T10:30:00Z',
      status: 'deployed',
      previewUrl: 'https://preview-1.e2b.dev',
      deploymentUrl: 'https://ecommerce-app.e2b.dev'
    },
    {
      id: '2', 
      title: 'Task Manager',
      prompt: 'Create a task management app with drag and drop',
      template: 'nextjs-developer',
      createdAt: '2024-06-16T09:15:00Z',
      status: 'ready',
      previewUrl: 'https://preview-2.e2b.dev'
    },
    {
      id: '3',
      title: 'Weather Dashboard',
      prompt: 'Build a weather dashboard with multiple cities',
      template: 'streamlit-developer',
      createdAt: '2024-06-16T08:45:00Z',
      status: 'generating'
    }
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'deployed': return 'text-green-400 bg-green-500/20'
      case 'ready': return 'text-blue-400 bg-blue-500/20'
      case 'generating': return 'text-yellow-400 bg-yellow-500/20'
      default: return 'text-gray-400 bg-gray-500/20'
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-gray-800 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-blue-400">
                Strategic Development Dashboard
              </h1>
              <p className="text-gray-400 mt-1">
                Comprehensive backend infrastructure management and analytics
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/'}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
              >
                Generate New App 🚀
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/pricing'}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-medium transition-colors"
              >
                Buy Credits
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard */}
      <div className="max-w-7xl mx-auto p-6">
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-900 rounded-xl p-6 border border-gray-700"
          >
            <h3 className="text-sm text-gray-400 mb-2">Remaining Credits</h3>
            <div className="text-3xl font-bold text-green-400">
              {userStats.remainingCredits}
            </div>
            <p className="text-sm text-gray-500 mt-1">
              of {userStats.totalCredits} total
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-900 rounded-xl p-6 border border-gray-700"
          >
            <h3 className="text-sm text-gray-400 mb-2">Apps Generated</h3>
            <div className="text-3xl font-bold text-blue-400">
              {userStats.totalAppsGenerated}
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Total applications
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-900 rounded-xl p-6 border border-gray-700"
          >
            <h3 className="text-sm text-gray-400 mb-2">Tokens Consumed</h3>
            <div className="text-3xl font-bold text-purple-400">
              {userStats.totalTokensUsed.toLocaleString()}
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Total processing power
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-900 rounded-xl p-6 border border-gray-700"
          >
            <h3 className="text-sm text-gray-400 mb-2">Efficiency Rate</h3>
            <div className="text-3xl font-bold text-yellow-400">
              4.0k
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Avg tokens per app
            </p>
          </motion.div>
        </div>

        {/* Recent Applications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden"
        >
          <div className="p-6 border-b border-gray-700">
            <h3 className="text-xl font-semibold text-blue-400">
              Recent App Generation History
            </h3>
            <p className="text-gray-400 mt-1">
              Comprehensive application development tracking and management
            </p>
          </div>

          <div className="divide-y divide-gray-700">
            {recentApps.map((app, index) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="p-6 hover:bg-gray-800/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-lg font-semibold text-white">
                        {app.title}
                      </h4>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                        {app.status}
                      </span>
                    </div>
                    
                    <p className="text-gray-400 mb-2">
                      {app.prompt}
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Template: {app.template}</span>
                      <span>•</span>
                      <span>{new Date(app.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {app.previewUrl && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.open(app.previewUrl, '_blank')}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors"
                      >
                        Preview
                      </motion.button>
                    )}
                    
                    {app.deploymentUrl && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.open(app.deploymentUrl, '_blank')}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-medium transition-colors"
                      >
                        Live App
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <div className="mt-8 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/'}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl font-semibold text-lg transition-all"
          >
            Start New Development Project 🚀
          </motion.button>
        </div>
      </div>
    </div>
  )
}