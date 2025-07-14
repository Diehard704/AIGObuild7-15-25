'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { M3Button } from '@/components/ui/m3-button'
import { M3Card, M3CardContent } from '@/components/ui/m3-card'
import { Sparkles, Star, TrendingUp, Clock, Users, Zap, Filter, Search, Play, BookOpen } from 'lucide-react'

interface Template {
    id: string
    name: string
    description: string
    category: string
    difficulty: 'beginner' | 'intermediate' | 'advanced'
    popularity: number
    successRate: number
    avgGenerationTime: number
    tags: string[]
    icon: string
    isRecommended?: boolean
    reason?: string
    usageCount: number
    rating: number
    reviews: number
}

export function SmartTemplates() {
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [searchQuery, setSearchQuery] = useState('')

    const categories = ['all', 'web-apps', 'data-science', 'mobile', 'api', 'dashboard', 'ecommerce']

    const templates: Template[] = [
        {
            id: '1',
            name: 'Next.js E-commerce Platform',
            description: 'Full-featured online store with payment integration',
            category: 'ecommerce',
            difficulty: 'intermediate',
            popularity: 95,
            successRate: 98,
            avgGenerationTime: 45,
            tags: ['Next.js', 'Stripe', 'Tailwind', 'TypeScript'],
            icon: '🛒',
            isRecommended: true,
            reason: 'High success rate and modern tech stack',
            usageCount: 1247,
            rating: 4.8,
            reviews: 156
        },
        {
            id: '2',
            name: 'Streamlit Data Dashboard',
            description: 'Interactive data visualization with real-time analytics',
            category: 'data-science',
            difficulty: 'beginner',
            popularity: 88,
            successRate: 96,
            avgGenerationTime: 32,
            tags: ['Python', 'Streamlit', 'Plotly', 'Pandas'],
            icon: '📊',
            isRecommended: true,
            reason: 'Perfect for data scientists and analysts',
            usageCount: 892,
            rating: 4.6,
            reviews: 89
        },
        {
            id: '3',
            name: 'Vue.js Task Manager',
            description: 'Collaborative project management with real-time updates',
            category: 'web-apps',
            difficulty: 'intermediate',
            popularity: 92,
            successRate: 94,
            avgGenerationTime: 38,
            tags: ['Vue.js', 'Firebase', 'Vuetify', 'PWA'],
            icon: '📋',
            isRecommended: true,
            reason: 'Excellent for team collaboration',
            usageCount: 756,
            rating: 4.7,
            reviews: 67
        },
        {
            id: '4',
            name: 'Gradio ML Interface',
            description: 'Machine learning model deployment with interactive UI',
            category: 'data-science',
            difficulty: 'advanced',
            popularity: 85,
            successRate: 91,
            avgGenerationTime: 52,
            tags: ['Python', 'Gradio', 'Hugging Face', 'ML'],
            icon: '🤖',
            isRecommended: false,
            reason: 'Advanced ML capabilities',
            usageCount: 445,
            rating: 4.5,
            reviews: 34
        }
    ]

    const filteredTemplates = templates.filter(template => {
        const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory
        const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            template.description.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
    })

    const recommendedTemplates = filteredTemplates.filter(t => t.isRecommended)
    const otherTemplates = filteredTemplates.filter(t => !t.isRecommended)

    return (
        <div className="space-y-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center justify-between"
            >
                <div>
                    <h2 className="m3-headline-medium font-bold text-foreground mb-2">
                        Smart Template Recommendations
                    </h2>
                    <p className="m3-body-large text-muted-foreground">
                        AI-powered suggestions based on your preferences
                    </p>
                </div>

                <M3Button
                    variant="filled"
                    size="lg"
                    className="group"
                >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Refresh Recommendations
                    <Zap className="w-4 h-4 ml-2 group-hover:rotate-12 transition-transform" />
                </M3Button>
            </motion.div>

            {/* Search and Filter */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="space-y-4"
            >
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search templates..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-outline rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 m3-body-medium bg-surface-container placeholder:text-muted-foreground"
                    />
                </div>

                {/* Category Filter */}
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                    {categories.map((category) => (
                        <motion.button
                            key={category}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap ${selectedCategory === category
                                    ? 'bg-primary text-primary-foreground shadow-lg'
                                    : 'bg-surface-container text-muted-foreground hover:bg-surface-container/80 border border-outline'
                                }`}
                        >
                            {category === 'all' ? 'All Templates' : category.replace('-', ' ')}
                        </motion.button>
                    ))}
                </div>
            </motion.div>

            {/* Recommended Templates */}
            {recommendedTemplates.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="space-y-4"
                >
                    <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-warning fill-current" />
                        <h3 className="m3-title-large font-semibold text-foreground">
                            Recommended for You
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {recommendedTemplates.map((template, index) => (
                            <motion.div
                                key={template.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                            >
                                <M3Card variant="elevated" className="h-full hover:shadow-lg transition-shadow border-primary/20">
                                    <M3CardContent className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="text-3xl">{template.icon}</div>
                                            <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4 text-warning fill-current" />
                                                <span className="text-sm font-medium">{template.rating}</span>
                                            </div>
                                        </div>

                                        <h4 className="m3-title-large font-semibold text-foreground mb-2">
                                            {template.name}
                                        </h4>

                                        <p className="m3-body-medium text-muted-foreground mb-4">
                                            {template.description}
                                        </p>

                                        <div className="flex items-center gap-2 mb-4">
                                            <span className={`px-2 py-1 rounded-md text-xs font-medium ${template.difficulty === 'beginner' ? 'bg-success/20 text-success' :
                                                    template.difficulty === 'intermediate' ? 'bg-warning/20 text-warning' :
                                                        'bg-error/20 text-error'
                                                }`}>
                                                {template.difficulty}
                                            </span>
                                            <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-md">
                                                {template.successRate}% success
                                            </span>
                                        </div>

                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {template.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-2 py-1 bg-surface-container text-muted-foreground text-xs rounded-md"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                                            <div className="flex items-center gap-4">
                                                <span className="flex items-center gap-1">
                                                    <Users className="w-4 h-4" />
                                                    {template.usageCount}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-4 h-4" />
                                                    {template.avgGenerationTime}s
                                                </span>
                                            </div>
                                            <span className="flex items-center gap-1">
                                                <TrendingUp className="w-4 h-4" />
                                                {template.popularity}%
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <M3Button variant="filled" size="sm" className="flex-1">
                                                <Play className="w-4 h-4 mr-2" />
                                                Use Template
                                            </M3Button>
                                            <M3Button variant="outlined" size="sm">
                                                <BookOpen className="w-4 h-4" />
                                            </M3Button>
                                        </div>
                                    </M3CardContent>
                                </M3Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Other Templates */}
            {otherTemplates.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="space-y-4"
                >
                    <h3 className="m3-title-large font-semibold text-foreground">
                        All Templates
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {otherTemplates.map((template, index) => (
                            <motion.div
                                key={template.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                            >
                                <M3Card variant="filled" className="h-full hover:shadow-lg transition-shadow">
                                    <M3CardContent className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="text-3xl">{template.icon}</div>
                                            <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4 text-warning fill-current" />
                                                <span className="text-sm font-medium">{template.rating}</span>
                                            </div>
                                        </div>

                                        <h4 className="m3-title-large font-semibold text-foreground mb-2">
                                            {template.name}
                                        </h4>

                                        <p className="m3-body-medium text-muted-foreground mb-4">
                                            {template.description}
                                        </p>

                                        <div className="flex items-center gap-2 mb-4">
                                            <span className={`px-2 py-1 rounded-md text-xs font-medium ${template.difficulty === 'beginner' ? 'bg-success/20 text-success' :
                                                    template.difficulty === 'intermediate' ? 'bg-warning/20 text-warning' :
                                                        'bg-error/20 text-error'
                                                }`}>
                                                {template.difficulty}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                                            <span className="flex items-center gap-1">
                                                <Users className="w-4 h-4" />
                                                {template.usageCount} users
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                {template.avgGenerationTime}s
                                            </span>
                                        </div>

                                        <M3Button variant="outlined" size="sm" className="w-full">
                                            <Play className="w-4 h-4 mr-2" />
                                            Use Template
                                        </M3Button>
                                    </M3CardContent>
                                </M3Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}
        </div>
    )
} 