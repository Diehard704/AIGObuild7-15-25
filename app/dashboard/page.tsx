'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart3,
  TrendingUp,
  Clock,
  Zap,
  Users,
  FolderOpen,
  Activity,
  Target,
  Calendar,
  Star,
  Download,
  Share2,
  Edit3,
  Trash2,
  Eye,
  Code,
  Globe,
  Rocket,
  Sparkles
} from 'lucide-react'

interface UserStats {
  totalCredits: number
  usedCredits: number
  remainingCredits: number
  totalAppsGenerated: number
  totalTokensUsed: number
  averageGenerationTime: number
  successRate: number
  monthlyUsage: number[]
  popularTemplates: { name: string; count: number }[]
}

interface GeneratedApp {
  id: string
  title: string
  prompt: string
  template: string
  createdAt: string
  status: 'generating' | 'ready' | 'deployed' | 'failed'
  previewUrl?: string
  deploymentUrl?: string
  tokensUsed: number
  generationTime: number
  views: number
  likes: number
}

export default function DashboardPage() {
  const [userStats, setUserStats] = useState<UserStats>({
    totalCredits: 15,
    usedCredits: 3,
    remainingCredits: 12,
    totalAppsGenerated: 3,
    totalTokensUsed: 12000,
    averageGenerationTime: 28,
    successRate: 95,
    monthlyUsage: [5, 8, 12, 15, 18, 22, 25, 28, 30, 32, 35, 38],
    popularTemplates: [
      { name: 'Next.js', count: 8 },
      { name: 'React', count: 6 },
      { name: 'Vue.js', count: 4 },
      { name: 'Streamlit', count: 3 }
    ]
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
      deploymentUrl: 'https://ecommerce-app.e2b.dev',
      tokensUsed: 4200,
      generationTime: 32,
      views: 156,
      likes: 12
    },
    {
      id: '2',
      title: 'Task Manager',
      prompt: 'Create a task management app with drag and drop',
      template: 'nextjs-developer',
      createdAt: '2024-06-16T09:15:00Z',
      status: 'ready',
      previewUrl: 'https://preview-2.e2b.dev',
      tokensUsed: 3800,
      generationTime: 28,
      views: 89,
      likes: 8
    },
    {
      id: '3',
      title: 'Weather Dashboard',
      prompt: 'Build a weather dashboard with multiple cities',
      template: 'streamlit-developer',
      createdAt: '2024-06-16T08:45:00Z',
      status: 'generating',
      tokensUsed: 0,
      generationTime: 0,
      views: 0,
      likes: 0
    }
  ])

  const [selectedTimeframe, setSelectedTimeframe] = useState<'7d' | '30d' | '90d'>('30d')
  const [selectedView, setSelectedView] = useState<'overview' | 'projects' | 'analytics'>('overview')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'deployed': return 'text-green-400 bg-green-500/20'
      case 'ready': return 'text-blue-400 bg-blue-500/20'
      case 'generating': return 'text-yellow-400 bg-yellow-500/20'
      case 'failed': return 'text-red-400 bg-red-500/20'
      default: return 'text-gray-400 bg-gray-500/20'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'deployed': return <Globe className="w-4 h-4" />
      case 'ready': return <Eye className="w-4 h-4" />
      case 'generating': return <Activity className="w-4 h-4 animate-pulse" />
      case 'failed': return <Trash2 className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 animated-gradient opacity-5" />

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-1 h-1 bg-blue-400 rounded-full"
          animate={{ y: [0, -20, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-40 right-32 w-1.5 h-1.5 bg-purple-400 rounded-full"
          animate={{ y: [0, -15, 0], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute bottom-32 left-1/4 w-1 h-1 bg-pink-400 rounded-full"
          animate={{ y: [0, -25, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      {/* Header */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="border-b border-gray-800/50 p-6 relative z-10"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <motion.h1
                className="text-3xl font-bold gradient-text mb-2"
                whileHover={{ scale: 1.02 }}
              >
                Strategic Development Dashboard
              </motion.h1>
              <p className="text-gray-400 mt-1 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Comprehensive backend infrastructure management and analytics
              </p>
            </div>

            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/build'}
                className="group px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl font-medium transition-all duration-300 hover-lift relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Rocket className="w-4 h-4" />
                  Generate New App
                </span>
                <div className="absolute inset-0 shimmer" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/pricing'}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-xl font-medium transition-all duration-300 hover-lift"
              >
                Buy Credits
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'projects', label: 'Projects', icon: FolderOpen },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp }
            ].map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedView(tab.id as any)}
                className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium transition-colors ${selectedView === tab.id
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-400 hover:text-white'
                  }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Dashboard */}
      <div className="max-w-7xl mx-auto p-6">

        {selectedView === 'overview' && (
          <>
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-blue-500/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm text-gray-400">Remaining Credits</h3>
                  <Zap className="w-5 h-5 text-yellow-400" />
                </div>
                <div className="text-3xl font-bold text-green-400 mb-2">
                  {userStats.remainingCredits}
                </div>
                <p className="text-sm text-gray-500">
                  of {userStats.totalCredits} total
                </p>
                <div className="mt-3 w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(userStats.remainingCredits / userStats.totalCredits) * 100}%` }}
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-blue-500/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm text-gray-400">Apps Generated</h3>
                  <FolderOpen className="w-5 h-5 text-blue-400" />
                </div>
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  {userStats.totalAppsGenerated}
                </div>
                <p className="text-sm text-gray-500">
                  Total applications
                </p>
                <div className="mt-3 flex items-center text-sm text-green-400">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +12% this month
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-blue-500/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm text-gray-400">Success Rate</h3>
                  <Target className="w-5 h-5 text-purple-400" />
                </div>
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  {userStats.successRate}%
                </div>
                <p className="text-sm text-gray-500">
                  Successful generations
                </p>
                <div className="mt-3 flex items-center text-sm text-green-400">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +5% improvement
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-blue-500/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm text-gray-400">Avg Generation</h3>
                  <Clock className="w-5 h-5 text-yellow-400" />
                </div>
                <div className="text-3xl font-bold text-yellow-400 mb-2">
                  {userStats.averageGenerationTime}s
                </div>
                <p className="text-sm text-gray-500">
                  Time per app
                </p>
                <div className="mt-3 flex items-center text-sm text-green-400">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  -3s faster
                </div>
              </motion.div>
            </div>

            {/* Usage Chart */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gray-900 rounded-xl border border-gray-700 p-6 mb-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-blue-400">
                  Monthly Usage Trends
                </h3>
                <div className="flex space-x-2">
                  {(['7d', '30d', '90d'] as const).map((timeframe) => (
                    <button
                      key={timeframe}
                      onClick={() => setSelectedTimeframe(timeframe)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${selectedTimeframe === timeframe
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                    >
                      {timeframe}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-64 flex items-end justify-between space-x-2">
                {userStats.monthlyUsage.slice(-12).map((value, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div className="w-full bg-gray-700 rounded-t-sm relative group">
                      <motion.div
                        className="bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-sm"
                        initial={{ height: 0 }}
                        animate={{ height: `${(value / Math.max(...userStats.monthlyUsage)) * 100}%` }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                      />
                      <div className="absolute inset-0 bg-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-xs text-gray-400 mt-2">{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Popular Templates */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gray-900 rounded-xl border border-gray-700 p-6 mb-8"
            >
              <h3 className="text-xl font-semibold text-blue-400 mb-6">
                Popular Templates
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {userStats.popularTemplates.map((template, index) => (
                  <motion.div
                    key={template.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="bg-gray-800 rounded-lg p-4 border border-gray-600 hover:border-blue-500/30 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-white">{template.name}</h4>
                      <Code className="w-4 h-4 text-blue-400" />
                    </div>
                    <p className="text-2xl font-bold text-blue-400">{template.count}</p>
                    <p className="text-sm text-gray-400">generations</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}

        {selectedView === 'projects' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden"
          >
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-blue-400">
                    Project Management
                  </h3>
                  <p className="text-gray-400 mt-1">
                    Comprehensive application development tracking and management
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <select
                    className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-sm"
                    aria-label="Filter by status"
                  >
                    <option>All Status</option>
                    <option>Ready</option>
                    <option>Deployed</option>
                    <option>Generating</option>
                  </select>
                  <select
                    className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-sm"
                    aria-label="Filter by template"
                  >
                    <option>All Templates</option>
                    <option>Next.js</option>
                    <option>React</option>
                    <option>Vue.js</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="divide-y divide-gray-700">
              {recentApps.map((app, index) => (
                <motion.div
                  key={app.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="p-6 hover:bg-gray-800/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-semibold text-white">
                          {app.title}
                        </h4>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(app.status)}`}>
                          {getStatusIcon(app.status)}
                          {app.status}
                        </span>
                      </div>

                      <p className="text-gray-400 mb-3">
                        {app.prompt}
                      </p>

                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Code className="w-4 h-4" />
                          {app.template}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(app.createdAt).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Zap className="w-4 h-4" />
                          {app.tokensUsed.toLocaleString()} tokens
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {app.generationTime}s
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {app.views} views
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4" />
                          {app.likes} likes
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {app.previewUrl && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => window.open(app.previewUrl, '_blank')}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          Preview
                        </motion.button>
                      )}

                      {app.deploymentUrl && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => window.open(app.deploymentUrl, '_blank')}
                          className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                        >
                          <Globe className="w-4 h-4" />
                          Live App
                        </motion.button>
                      )}

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                      >
                        <Edit3 className="w-4 h-4" />
                        Edit
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                      >
                        <Share2 className="w-4 h-4" />
                        Share
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Export
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {selectedView === 'analytics' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            {/* Performance Metrics */}
            <div className="bg-gray-900 rounded-xl border border-gray-700 p-6">
              <h3 className="text-xl font-semibold text-blue-400 mb-6">
                Performance Analytics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-400 mb-2">95%</div>
                  <p className="text-gray-400">Success Rate</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Successful app generations
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-400 mb-2">28s</div>
                  <p className="text-gray-400">Average Time</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Per app generation
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-400 mb-2">4.2k</div>
                  <p className="text-gray-400">Avg Tokens</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Per generation
                  </p>
                </div>
              </div>
            </div>

            {/* Usage Breakdown */}
            <div className="bg-gray-900 rounded-xl border border-gray-700 p-6">
              <h3 className="text-xl font-semibold text-blue-400 mb-6">
                Usage Breakdown
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Template Usage</h4>
                  <div className="space-y-3">
                    {userStats.popularTemplates.map((template, index) => (
                      <div key={template.name} className="flex items-center justify-between">
                        <span className="text-gray-300">{template.name}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${(template.count / Math.max(...userStats.popularTemplates.map(t => t.count))) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-400 w-8 text-right">{template.count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Monthly Trends</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Apps Generated</span>
                      <span className="text-green-400 font-semibold">+15%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Token Usage</span>
                      <span className="text-blue-400 font-semibold">+8%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Success Rate</span>
                      <span className="text-purple-400 font-semibold">+3%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Generation Time</span>
                      <span className="text-yellow-400 font-semibold">-12%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Quick Actions */}
        <div className="mt-8 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/build'}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl font-semibold text-lg transition-all"
          >
            Start New Development Project 🚀
          </motion.button>
        </div>
      </div>
    </div>
  )
}