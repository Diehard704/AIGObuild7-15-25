'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    TrendingUp, TrendingDown, Users, Clock, Zap, Target,
    BarChart3, PieChart, Activity, Eye, MousePointer, Filter,
    TestTube, Split, Target as TargetIcon, DollarSign, Award,
    Calendar, Globe, Smartphone, Monitor, Tablet, Plus
} from 'lucide-react'
import { M3Button } from '@/components/ui/m3-button'
import { M3Card, M3CardContent, M3CardHeader, M3CardTitle } from '@/components/ui/m3-card'

interface AnalyticsData {
    totalUsers: number
    activeUsers: number
    generationSuccess: number
    averageTime: number
    popularTemplates: { name: string; count: number }[]
    userBehavior: { action: string; count: number }[]
    conversionRates: { step: string; rate: number }[]
    realTimeData: { timestamp: string; value: number }[]
    abTests: ABTest[]
    deviceUsage: { device: string; percentage: number }[]
    geographicData: { country: string; users: number }[]
    revenueMetrics: { period: string; revenue: number; growth: number }[]
}

interface ABTest {
    id: string
    name: string
    description: string
    status: 'active' | 'paused' | 'completed'
    variants: ABVariant[]
    startDate: string
    endDate?: string
    goal: string
    confidence: number
}

interface ABVariant {
    id: string
    name: string
    description: string
    users: number
    conversions: number
    conversionRate: number
    isWinner?: boolean
}

export function AdvancedAnalytics() {
    const [selectedTimeframe, setSelectedTimeframe] = useState<'24h' | '7d' | '30d'>('7d')
    const [selectedMetric, setSelectedMetric] = useState<'users' | 'generations' | 'conversions' | 'revenue'>('users')
    const [showABTesting, setShowABTesting] = useState(false)
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
        })),
        abTests: [
            {
                id: '1',
                name: 'Landing Page CTA',
                description: 'Testing different call-to-action buttons',
                status: 'active',
                variants: [
                    { id: 'a', name: 'Original', description: 'Blue button', users: 1200, conversions: 144, conversionRate: 12.0 },
                    { id: 'b', name: 'Variant A', description: 'Green button', users: 1180, conversions: 179, conversionRate: 15.2, isWinner: true }
                ],
                startDate: '2024-06-01',
                goal: 'Increase sign-ups',
                confidence: 95.2
            },
            {
                id: '2',
                name: 'Prompt Input UI',
                description: 'Testing different input field designs',
                status: 'active',
                variants: [
                    { id: 'a', name: 'Original', description: 'Single line input', users: 800, conversions: 64, conversionRate: 8.0 },
                    { id: 'b', name: 'Variant A', description: 'Multi-line input', users: 820, conversions: 82, conversionRate: 10.0, isWinner: true }
                ],
                startDate: '2024-06-10',
                goal: 'Increase prompt completion',
                confidence: 87.5
            }
        ],
        deviceUsage: [
            { device: 'Desktop', percentage: 65 },
            { device: 'Mobile', percentage: 28 },
            { device: 'Tablet', percentage: 7 }
        ],
        geographicData: [
            { country: 'United States', users: 456 },
            { country: 'United Kingdom', users: 234 },
            { country: 'Germany', users: 189 },
            { country: 'Canada', users: 156 },
            { country: 'Australia', users: 123 }
        ],
        revenueMetrics: [
            { period: 'Jan', revenue: 12500, growth: 12.5 },
            { period: 'Feb', revenue: 13800, growth: 10.4 },
            { period: 'Mar', revenue: 15200, growth: 10.1 },
            { period: 'Apr', revenue: 16800, growth: 10.5 },
            { period: 'May', revenue: 18500, growth: 10.1 },
            { period: 'Jun', revenue: 20400, growth: 10.3 }
        ]
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

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'text-success bg-success/20'
            case 'paused': return 'text-warning bg-warning/20'
            case 'completed': return 'text-muted-foreground bg-muted/20'
            default: return 'text-muted-foreground bg-muted/20'
        }
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="m3-headline-medium font-bold text-foreground">Advanced Analytics</h2>
                    <p className="m3-body-large text-muted-foreground">Real-time insights and performance metrics</p>
                </div>

                <div className="flex items-center gap-4">
                    <select
                        value={selectedTimeframe}
                        onChange={(e) => setSelectedTimeframe(e.target.value as any)}
                        className="px-3 py-2 bg-surface-container border border-outline rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        <option value="24h">Last 24 Hours</option>
                        <option value="7d">Last 7 Days</option>
                        <option value="30d">Last 30 Days</option>
                    </select>

                    <M3Button
                        variant="filled"
                        size="sm"
                        onClick={() => setShowABTesting(!showABTesting)}
                        className="flex items-center gap-2"
                    >
                        <TestTube className="w-4 h-4" />
                        A/B Testing
                    </M3Button>

                    <M3Button
                        variant="outlined"
                        size="sm"
                        className="flex items-center gap-2"
                    >
                        <Filter className="w-4 h-4" />
                        Export Data
                    </M3Button>
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
                    >
                        <M3Card variant="elevated" className="h-full">
                            <M3CardContent className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <metric.icon className="w-8 h-8 text-primary" />
                                    <div className={`flex items-center gap-1 text-sm ${metric.trend === 'up' ? 'text-success' : 'text-error'}`}>
                                        {metric.trend === 'up' ? (
                                            <TrendingUp className="w-4 h-4" />
                                        ) : (
                                            <TrendingDown className="w-4 h-4" />
                                        )}
                                        {metric.change}
                                    </div>
                                </div>

                                <div className="text-3xl font-bold text-foreground mb-1">
                                    {metric.value}
                                </div>
                                <div className="text-muted-foreground text-sm">{metric.label}</div>
                            </M3CardContent>
                        </M3Card>
                    </motion.div>
                ))}
            </div>

            {/* A/B Testing Section */}
            {showABTesting && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    <div className="flex items-center justify-between">
                        <h3 className="m3-headline-small font-semibold text-foreground">A/B Testing</h3>
                        <M3Button
                            variant="filled"
                            size="sm"
                            className="flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            Create New Test
                        </M3Button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {analyticsData.abTests.map((test, index) => (
                            <motion.div
                                key={test.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <M3Card variant="elevated">
                                    <M3CardHeader>
                                        <div className="flex items-center justify-between">
                                            <M3CardTitle className="flex items-center gap-2">
                                                <TestTube className="w-5 h-5 text-primary" />
                                                {test.name}
                                            </M3CardTitle>
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(test.status)}`}>
                                                {test.status}
                                            </span>
                                        </div>
                                    </M3CardHeader>
                                    <M3CardContent>
                                        <p className="m3-body-medium text-muted-foreground mb-4">{test.description}</p>

                                        <div className="space-y-4">
                                            {test.variants.map((variant) => (
                                                <div key={variant.id} className={`p-4 rounded-lg border ${variant.isWinner ? 'border-success bg-success/10' : 'border-outline bg-surface-container'}`}>
                                                    <div className="flex items-center justify-between mb-2">
                                                        <div className="flex items-center gap-2">
                                                            <h4 className="m3-title-medium font-semibold text-foreground">{variant.name}</h4>
                                                            {variant.isWinner && (
                                                                <Award className="w-4 h-4 text-success" />
                                                            )}
                                                        </div>
                                                        <span className="text-lg font-bold text-foreground">{variant.conversionRate}%</span>
                                                    </div>
                                                    <p className="m3-body-small text-muted-foreground mb-3">{variant.description}</p>
                                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                                        <div>
                                                            <span className="text-muted-foreground">Users:</span>
                                                            <span className="ml-2 font-medium text-foreground">{variant.users.toLocaleString()}</span>
                                                        </div>
                                                        <div>
                                                            <span className="text-muted-foreground">Conversions:</span>
                                                            <span className="ml-2 font-medium text-foreground">{variant.conversions.toLocaleString()}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-4 pt-4 border-t border-outline">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-muted-foreground">Confidence:</span>
                                                <span className="font-medium text-foreground">{test.confidence}%</span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-muted-foreground">Goal:</span>
                                                <span className="font-medium text-foreground">{test.goal}</span>
                                            </div>
                                        </div>
                                    </M3CardContent>
                                </M3Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Real-time Activity Chart */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <M3Card variant="elevated">
                        <M3CardHeader>
                            <div className="flex items-center justify-between">
                                <M3CardTitle className="flex items-center gap-2">
                                    <Activity className="w-5 h-5 text-primary" />
                                    Real-time Activity
                                </M3CardTitle>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-success rounded-full animate-pulse" />
                                    <span className="text-sm text-muted-foreground">Live</span>
                                </div>
                            </div>
                        </M3CardHeader>
                        <M3CardContent>
                            <div className="h-64 flex items-end justify-between space-x-1">
                                {analyticsData.realTimeData.map((point, index) => (
                                    <div key={index} className="flex-1 flex flex-col items-center">
                                        <div className="w-full bg-surface-container rounded-t-sm relative group">
                                            <motion.div
                                                className="bg-gradient-to-t from-primary to-secondary rounded-t-sm"
                                                initial={{ height: 0 }}
                                                animate={{ height: `${(point.value / 70) * 100}%` }}
                                                transition={{ delay: index * 0.05, duration: 0.5 }}
                                            />
                                            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                        <span className="text-xs text-muted-foreground mt-2">{point.timestamp}</span>
                                    </div>
                                ))}
                            </div>
                        </M3CardContent>
                    </M3Card>
                </motion.div>

                {/* Conversion Funnel */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <M3Card variant="elevated">
                        <M3CardHeader>
                            <M3CardTitle className="flex items-center gap-2">
                                <TargetIcon className="w-5 h-5 text-primary" />
                                Conversion Funnel
                            </M3CardTitle>
                        </M3CardHeader>
                        <M3CardContent>
                            <div className="space-y-4">
                                {analyticsData.conversionRates.map((step, index) => (
                                    <div key={step.step} className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="m3-body-medium text-foreground">{step.step}</span>
                                            <span className="m3-body-medium font-medium text-foreground">{step.rate}%</span>
                                        </div>
                                        <div className="w-full bg-surface-container rounded-full h-2">
                                            <motion.div
                                                className="h-2 bg-gradient-to-r from-primary to-secondary rounded-full"
                                                initial={{ width: 0 }}
                                                animate={{ width: `${step.rate}%` }}
                                                transition={{ delay: index * 0.1, duration: 0.8 }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </M3CardContent>
                    </M3Card>
                </motion.div>
            </div>

            {/* Additional Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Device Usage */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <M3Card variant="elevated">
                        <M3CardHeader>
                            <M3CardTitle className="flex items-center gap-2">
                                <Globe className="w-5 h-5 text-primary" />
                                Device Usage
                            </M3CardTitle>
                        </M3CardHeader>
                        <M3CardContent>
                            <div className="space-y-4">
                                {analyticsData.deviceUsage.map((device, index) => (
                                    <div key={device.device} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            {device.device === 'Desktop' && <Monitor className="w-4 h-4 text-primary" />}
                                            {device.device === 'Mobile' && <Smartphone className="w-4 h-4 text-success" />}
                                            {device.device === 'Tablet' && <Tablet className="w-4 h-4 text-warning" />}
                                            <span className="m3-body-medium text-foreground">{device.device}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-24 bg-surface-container rounded-full h-2">
                                                <div
                                                    className="bg-primary h-2 rounded-full"
                                                    style={{ width: `${device.percentage}%` }}
                                                />
                                            </div>
                                            <span className="text-sm text-muted-foreground w-12 text-right">{device.percentage}%</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </M3CardContent>
                    </M3Card>
                </motion.div>

                {/* Revenue Metrics */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <M3Card variant="elevated">
                        <M3CardHeader>
                            <M3CardTitle className="flex items-center gap-2">
                                <DollarSign className="w-5 h-5 text-primary" />
                                Revenue Growth
                            </M3CardTitle>
                        </M3CardHeader>
                        <M3CardContent>
                            <div className="space-y-4">
                                {analyticsData.revenueMetrics.map((metric, index) => (
                                    <div key={metric.period} className="flex items-center justify-between">
                                        <span className="m3-body-medium text-foreground">{metric.period}</span>
                                        <div className="flex items-center gap-2">
                                            <span className="m3-body-medium font-medium text-foreground">
                                                ${metric.revenue.toLocaleString()}
                                            </span>
                                            <span className={`text-sm ${metric.growth > 0 ? 'text-success' : 'text-error'}`}>
                                                +{metric.growth}%
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </M3CardContent>
                    </M3Card>
                </motion.div>

                {/* Geographic Distribution */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <M3Card variant="elevated">
                        <M3CardHeader>
                            <M3CardTitle className="flex items-center gap-2">
                                <Globe className="w-5 h-5 text-primary" />
                                Top Countries
                            </M3CardTitle>
                        </M3CardHeader>
                        <M3CardContent>
                            <div className="space-y-4">
                                {analyticsData.geographicData.map((country, index) => (
                                    <div key={country.country} className="flex items-center justify-between">
                                        <span className="m3-body-medium text-foreground">{country.country}</span>
                                        <div className="flex items-center gap-2">
                                            <div className="w-24 bg-surface-container rounded-full h-2">
                                                <div
                                                    className="bg-primary h-2 rounded-full"
                                                    style={{ width: `${(country.users / Math.max(...analyticsData.geographicData.map(c => c.users))) * 100}%` }}
                                                />
                                            </div>
                                            <span className="text-sm text-muted-foreground w-12 text-right">{country.users}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </M3CardContent>
                    </M3Card>
                </motion.div>
            </div>
        </div>
    )
} 