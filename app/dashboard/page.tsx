'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { M3Button } from '@/components/ui/m3-button'
import { M3Card, M3CardContent, M3CardHeader, M3CardTitle } from '@/components/ui/m3-card'
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
  Sparkles,
  Plus,
  Filter,
  Search
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
      case 'deployed': return 'text-success bg-success/20'
      case 'ready': return 'text-primary bg-primary/20'
      case 'generating': return 'text-warning bg-warning/20'
      case 'failed': return 'text-error bg-error/20'
      default: return 'text-muted-foreground bg-muted'
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="border-b border-border/50 p-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <motion.h1
                className="m3-headline-large font-bold text-foreground mb-2"
                whileHover={{ scale: 1.02 }}
              >
                Strategic Development Dashboard
              </motion.h1>
              <p className="m3-body-large text-muted-foreground flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Comprehensive backend infrastructure management and analytics
              </p>
            </div>

            <div className="flex items-center gap-4">
              <M3Button
                variant="filled"
                size="lg"
                onClick={() => window.location.href = '/build'}
                className="group"
              >
                <Rocket className="w-4 h-4 mr-2" />
                Generate New App
              </M3Button>

              <M3Button
                variant="outlined"
                size="lg"
                onClick={() => window.location.href = '/pricing'}
              >
                Buy Credits
              </M3Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Navigation Tabs */}
      <div className="border-b border-border/50">
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
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
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
              >
                <M3Card variant="elevated" className="h-full">
                  <M3CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="m3-title-medium text-muted-foreground">Remaining Credits</h3>
                      <Zap className="w-5 h-5 text-primary" />
                    </div>
                    <div className="m3-headline-large font-bold text-primary mb-2">
                      {userStats.remainingCredits}
                    </div>
                    <p className="m3-body-small text-muted-foreground mb-3">
                      of {userStats.totalCredits} total
                    </p>
                    <div className="w-full bg-surface-container rounded-full h-2">
                      <motion.div
                        className="bg-primary h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(userStats.remainingCredits / userStats.totalCredits) * 100}%` }}
                        transition={{ delay: 0.5, duration: 1 }}
                      />
                    </div>
                  </M3CardContent>
                </M3Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <M3Card variant="elevated" className="h-full">
                  <M3CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="m3-title-medium text-muted-foreground">Apps Generated</h3>
                      <FolderOpen className="w-5 h-5 text-secondary" />
                    </div>
                    <div className="m3-headline-large font-bold text-secondary mb-2">
                      {userStats.totalAppsGenerated}
                    </div>
                    <p className="m3-body-small text-muted-foreground mb-3">
                      Total applications
                    </p>
                    <div className="flex items-center text-sm text-success">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      +12% this month
                    </div>
                  </M3CardContent>
                </M3Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <M3Card variant="elevated" className="h-full">
                  <M3CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="m3-title-medium text-muted-foreground">Success Rate</h3>
                      <Target className="w-5 h-5 text-tertiary" />
                    </div>
                    <div className="m3-headline-large font-bold text-tertiary mb-2">
                      {userStats.successRate}%
                    </div>
                    <p className="m3-body-small text-muted-foreground mb-3">
                      Successful generations
                    </p>
                    <div className="flex items-center text-sm text-success">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      +5% improvement
                    </div>
                  </M3CardContent>
                </M3Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <M3Card variant="elevated" className="h-full">
                  <M3CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="m3-title-medium text-muted-foreground">Avg Generation</h3>
                      <Clock className="w-5 h-5 text-warning" />
                    </div>
                    <div className="m3-headline-large font-bold text-warning mb-2">
                      {userStats.averageGenerationTime}s
                    </div>
                    <p className="m3-body-small text-muted-foreground mb-3">
                      Time per app
                    </p>
                    <div className="flex items-center text-sm text-success">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      -3s faster
                    </div>
                  </M3CardContent>
                </M3Card>
              </motion.div>
            </div>

            {/* Usage Chart */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-8"
            >
              <M3Card variant="elevated">
                <M3CardHeader>
                  <div className="flex items-center justify-between">
                    <M3CardTitle>Monthly Usage Trends</M3CardTitle>
                    <div className="flex space-x-2">
                      {(['7d', '30d', '90d'] as const).map((timeframe) => (
                        <M3Button
                          key={timeframe}
                          variant={selectedTimeframe === timeframe ? 'filled' : 'outlined'}
                          size="sm"
                          onClick={() => setSelectedTimeframe(timeframe)}
                        >
                          {timeframe}
                        </M3Button>
                      ))}
                    </div>
                  </div>
                </M3CardHeader>
                <M3CardContent>
                  <div className="h-64 flex items-end justify-between space-x-2">
                    {userStats.monthlyUsage.slice(-12).map((value, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div className="w-full bg-surface-container rounded-t-sm relative group">
                          <motion.div
                            className="bg-gradient-to-t from-primary to-secondary rounded-t-sm"
                            initial={{ height: 0 }}
                            animate={{ height: `${(value / Math.max(...userStats.monthlyUsage)) * 100}%` }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                          />
                          <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <span className="m3-body-small text-muted-foreground mt-2">{value}</span>
                      </div>
                    ))}
                  </div>
                </M3CardContent>
              </M3Card>
            </motion.div>

            {/* Popular Templates */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <M3Card variant="elevated">
                <M3CardHeader>
                  <M3CardTitle>Popular Templates</M3CardTitle>
                </M3CardHeader>
                <M3CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {userStats.popularTemplates.map((template, index) => (
                      <motion.div
                        key={template.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                      >
                        <M3Card variant="filled" className="h-full">
                          <M3CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="m3-title-medium font-semibold text-foreground">{template.name}</h4>
                              <Code className="w-4 h-4 text-primary" />
                            </div>
                            <p className="m3-headline-small font-bold text-primary">{template.count}</p>
                            <p className="m3-body-small text-muted-foreground">generations</p>
                          </M3CardContent>
                        </M3Card>
                      </motion.div>
                    ))}
                  </div>
                </M3CardContent>
              </M3Card>
            </motion.div>
          </>
        )}

        {selectedView === 'projects' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <M3Card variant="elevated">
              <M3CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <M3CardTitle>Project Management</M3CardTitle>
                    <p className="m3-body-medium text-muted-foreground mt-1">
                      Comprehensive application development tracking and management
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <M3Button variant="outlined" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </M3Button>
                    <M3Button variant="filled" size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      New Project
                    </M3Button>
                  </div>
                </div>
              </M3CardHeader>
              <M3CardContent>
                <div className="space-y-4">
                  {recentApps.map((app, index) => (
                    <motion.div
                      key={app.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                    >
                      <M3Card variant="filled" className="hover:shadow-lg transition-shadow">
                        <M3CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h4 className="m3-title-large font-semibold text-foreground">
                                  {app.title}
                                </h4>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(app.status)}`}>
                                  {getStatusIcon(app.status)}
                                  {app.status}
                                </span>
                              </div>

                              <p className="m3-body-medium text-muted-foreground mb-3">
                                {app.prompt}
                              </p>

                              <div className="flex items-center gap-6 text-sm text-muted-foreground">
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
                                <M3Button
                                  variant="outlined"
                                  size="sm"
                                  onClick={() => window.open(app.previewUrl, '_blank')}
                                >
                                  <Eye className="w-4 h-4 mr-2" />
                                  Preview
                                </M3Button>
                              )}

                              {app.deploymentUrl && (
                                <M3Button
                                  variant="filled"
                                  size="sm"
                                  onClick={() => window.open(app.deploymentUrl, '_blank')}
                                >
                                  <Globe className="w-4 h-4 mr-2" />
                                  Live App
                                </M3Button>
                              )}

                              <M3Button variant="outlined" size="sm">
                                <Edit3 className="w-4 h-4 mr-2" />
                                Edit
                              </M3Button>

                              <M3Button variant="outlined" size="sm">
                                <Share2 className="w-4 h-4 mr-2" />
                                Share
                              </M3Button>

                              <M3Button variant="outlined" size="sm">
                                <Download className="w-4 h-4 mr-2" />
                                Export
                              </M3Button>
                            </div>
                          </div>
                        </M3CardContent>
                      </M3Card>
                    </motion.div>
                  ))}
                </div>
              </M3CardContent>
            </M3Card>
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
            <M3Card variant="elevated">
              <M3CardHeader>
                <M3CardTitle>Performance Analytics</M3CardTitle>
              </M3CardHeader>
              <M3CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="m3-display-small font-bold text-success mb-2">95%</div>
                    <p className="m3-body-medium text-muted-foreground">Success Rate</p>
                    <p className="m3-body-small text-muted-foreground mt-2">
                      Successful app generations
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="m3-display-small font-bold text-primary mb-2">28s</div>
                    <p className="m3-body-medium text-muted-foreground">Average Time</p>
                    <p className="m3-body-small text-muted-foreground mt-2">
                      Per app generation
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="m3-display-small font-bold text-secondary mb-2">4.2k</div>
                    <p className="m3-body-medium text-muted-foreground">Avg Tokens</p>
                    <p className="m3-body-small text-muted-foreground mt-2">
                      Per generation
                    </p>
                  </div>
                </div>
              </M3CardContent>
            </M3Card>

            {/* Usage Breakdown */}
            <M3Card variant="elevated">
              <M3CardHeader>
                <M3CardTitle>Usage Breakdown</M3CardTitle>
              </M3CardHeader>
              <M3CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="m3-title-large font-semibold text-foreground mb-4">Template Usage</h4>
                    <div className="space-y-3">
                      {userStats.popularTemplates.map((template, index) => (
                        <div key={template.name} className="flex items-center justify-between">
                          <span className="m3-body-medium text-foreground">{template.name}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-surface-container rounded-full h-2">
                              <div
                                className="bg-primary h-2 rounded-full"
                                style={{ width: `${(template.count / Math.max(...userStats.popularTemplates.map(t => t.count))) * 100}%` }}
                              />
                            </div>
                            <span className="m3-body-small text-muted-foreground w-8 text-right">{template.count}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="m3-title-large font-semibold text-foreground mb-4">Monthly Trends</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="m3-body-medium text-foreground">Apps Generated</span>
                        <span className="text-success font-semibold">+15%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="m3-body-medium text-foreground">Token Usage</span>
                        <span className="text-primary font-semibold">+8%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="m3-body-medium text-foreground">Success Rate</span>
                        <span className="text-secondary font-semibold">+3%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="m3-body-medium text-foreground">Generation Time</span>
                        <span className="text-warning font-semibold">-12%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </M3CardContent>
            </M3Card>
          </motion.div>
        )}

        {/* Quick Actions */}
        <div className="mt-8 text-center">
          <M3Button
            size="lg"
            variant="filled"
            onClick={() => window.location.href = '/build'}
            className="group"
          >
            <Rocket className="w-4 h-4 mr-2" />
            Start New Development Project
            <Sparkles className="w-4 h-4 ml-2 group-hover:rotate-12 transition-transform" />
          </M3Button>
        </div>
      </div>
    </div>
  )
}