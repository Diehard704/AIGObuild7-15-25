'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    TrendingUp, TrendingDown, Users, Clock, Zap, Target,
    BarChart3, PieChart, Activity, Eye, MousePointer, Filter
} from 'lucide-react'

interface AnalyticsData {
    totalUsers: number
    activeUsers: number
    generationSuccess: number
    averageTime: number
    popularTemplates: { name: string; count: number }[]
    userBehavior: { action: string; count: number }[]
    conversionRates: { step: string; rate: number }[]
    realTimeData: { timestamp: string; value: number }[]
}

export function AdvancedAnalytics() {
    const [selectedTimeframe, setSelectedTimeframe] = useState<'24h' | '7d' | '30d'>('7d')
    const [selectedMetric, setSelectedMetric] = useState<'users' | 'generations' | 'conversions'>('users')
    const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
        totalUsers: 1247,
        activeUsers: 892,
        generationSuccess: 94.2,
        averageTime: 28.5,
        popularTemplates: [
            { name: 'Next.js', count: 156 },
            { name: 'React', count: 134 },
            { name: 'Vue.js', count: 89 },
            { name: 'Streamlit', count: 67 }
        ],
        userBehavior: [
            { action: 'App Generation', count: 445 },
            { action: 'Template Browse', count: 234 },
            { action: 'Code Preview', count: 189 },
            { action: 'Deployment', count: 123 }
        ],
        conversionRates: [
            { step: 'Landing Page', rate: 100 },
            { step: 'Prompt Input', rate: 78 },
            { step: 'Generation', rate: 65 },
            { step: 'Preview', rate: 52 },
            { step: 'Deployment', rate: 34 }
        ],
        realTimeData: Array.from({ length: 24 }, (_, i) => ({
            timestamp: `${i}:00`,
            value: Math.floor(Math.random() * 50) + 20
        }))
    })

    const metrics = [
        {
            label: 'Total Users',
            value: analyticsData.totalUsers,
            change: '+12.5%',
            trend: 'up',
            icon: Users
        },
        {
            label: 'Active Users',
            value: analyticsData.activeUsers,
            change: '+8.3%',
            trend: 'up',
            icon: Activity
        },
        {
            label: 'Success Rate',
            value: `${analyticsData.generationSuccess}%`,
            change: '+2.1%',
            trend: 'up',
            icon: Target
        },
        {
            label: 'Avg Generation Time',
            value: `${analyticsData.averageTime}s`,
            change: '-3.2s',
            trend: 'down',
            icon: Clock
        }
    ]

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white">Advanced Analytics</h2>
                    <p className="text-gray-400">Real-time insights and performance metrics</p>
                </div>

                <div className="flex items-center gap-4">
                    <select
                        value={selectedTimeframe}
                        onChange={(e) => setSelectedTimeframe(e.target.value as any)}
                        className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-sm"
                    >
                        <option value="24h">Last 24 Hours</option>
                        <option value="7d">Last 7 Days</option>
                        <option value="30d">Last 30 Days</option>
                    </select>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                    >
                        <Filter className="w-4 h-4" />
                        Export Data
                    </motion.button>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {metrics.map((metric, index) => (
                    <motion.div
                        key={metric.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-blue-500/30 transition-colors"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <metric.icon className="w-8 h-8 text-blue-400" />
                            <div className={`flex items-center gap-1 text-sm ${metric.trend === 'up' ? 'text-green-400' : 'text-red-400'
                                }`}>
                                {metric.trend === 'up' ? (
                                    <TrendingUp className="w-4 h-4" />
                                ) : (
                                    <TrendingDown className="w-4 h-4" />
                                )}
                                {metric.change}
                            </div>
                        </div>

                        <div className="text-3xl font-bold text-white mb-1">
                            {metric.value}
                        </div>
                        <div className="text-gray-400 text-sm">{metric.label}</div>
                    </motion.div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Real-time Activity Chart */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-gray-900 rounded-xl p-6 border border-gray-700"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-white">Real-time Activity</h3>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-sm text-gray-400">Live</span>
                        </div>
                    </div>

                    <div className="h-64 flex items-end justify-between space-x-1">
                        {analyticsData.realTimeData.map((point, index) => (
                            <div key={index} className="flex-1 flex flex-col items-center">
                                <div className="w-full bg-gray-700 rounded-t-sm relative group">
                                    <motion.div
                                        className="bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-sm"
                                        initial={{ height: 0 }}
                                        animate={{ height: `${(point.value / 70) * 100}%` }}
                                        transition={{ delay: index * 0.05, duration: 0.5 }}
                                    />
                                    <div className="absolute inset-0 bg-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <span className="text-xs text-gray-400 mt-2">{point.timestamp}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Conversion Funnel */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-gray-900 rounded-xl p-6 border border-gray-700"
                >
                    <h3 className="text-lg font-semibold text-white mb-6">Conversion Funnel</h3>

                    <div className="space-y-4">
                        {analyticsData.conversionRates.map((step, index) => (
                            <div key={step.step} className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-300">{step.step}</span>
                                    <span className="text-sm text-white font-medium">{step.rate}%</span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-2">
                                    <motion.div
                                        className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${step.rate}%` }}
                                        transition={{ delay: index * 0.1, duration: 0.8 }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Detailed Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Popular Templates */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-900 rounded-xl p-6 border border-gray-700"
                >
                    <h3 className="text-lg font-semibold text-white mb-6">Popular Templates</h3>

                    <div className="space-y-4">
                        {analyticsData.popularTemplates.map((template, index) => (
                            <div key={template.name} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 bg-blue-500 rounded-full" />
                                    <span className="text-gray-300">{template.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-24 bg-gray-700 rounded-full h-2">
                                        <div
                                            className="bg-blue-500 h-2 rounded-full"
                                            style={{ width: `${(template.count / Math.max(...analyticsData.popularTemplates.map(t => t.count))) * 100}%` }}
                                        />
                                    </div>
                                    <span className="text-sm text-gray-400 w-12 text-right">{template.count}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* User Behavior */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-900 rounded-xl p-6 border border-gray-700"
                >
                    <h3 className="text-lg font-semibold text-white mb-6">User Behavior</h3>

                    <div className="space-y-4">
                        {analyticsData.userBehavior.map((behavior, index) => (
                            <div key={behavior.action} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                                        <MousePointer className="w-4 h-4 text-blue-400" />
                                    </div>
                                    <span className="text-gray-300">{behavior.action}</span>
                                </div>
                                <span className="text-white font-medium">{behavior.count}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* A/B Testing Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-900 rounded-xl p-6 border border-gray-700"
            >
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-white">A/B Testing</h3>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-medium transition-colors"
                    >
                        Create New Test
                    </motion.button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        { name: 'Landing Page CTA', variant: 'A', conversion: 12.5, status: 'active' },
                        { name: 'Landing Page CTA', variant: 'B', conversion: 15.2, status: 'active' },
                        { name: 'Prompt Input UI', variant: 'A', conversion: 8.9, status: 'completed' }
                    ].map((test, index) => (
                        <div key={`${test.name}-${test.variant}`} className="p-4 bg-gray-800 rounded-lg border border-gray-600">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-gray-300">{test.name}</span>
                                <span className={`px-2 py-1 rounded text-xs font-medium ${test.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                                    }`}>
                                    {test.status}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-lg font-bold text-white">Variant {test.variant}</span>
                                <span className="text-sm text-blue-400">{test.conversion}%</span>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    )
} 