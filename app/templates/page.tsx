'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { M3Button } from '@/components/ui/m3-button'
import { M3Card, M3CardContent, M3CardHeader, M3CardTitle } from '@/components/ui/m3-card'
import {
    Code,
    Star,
    TrendingUp,
    Clock,
    Users,
    Zap,
    Filter,
    Search,
    Sparkles,
    Rocket,
    Eye,
    Download,
    Share2,
    BookOpen,
    Play,
    Settings
} from 'lucide-react'

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

export default function TemplatesPage() {
    const [templates, setTemplates] = useState<Template[]>([
        {
            id: 'nextjs-developer',
            name: 'Next.js Developer',
            description: 'Full-stack React applications with Next.js 15, TypeScript, and modern tooling',
            category: 'Web Development',
            difficulty: 'intermediate',
            popularity: 95,
            successRate: 98,
            avgGenerationTime: 28,
            tags: ['React', 'TypeScript', 'Next.js', 'Full-stack'],
            icon: '⚛️',
            isRecommended: true,
            reason: 'Most popular and versatile',
            usageCount: 1247,
            rating: 4.8,
            reviews: 342
        },
        {
            id: 'streamlit-developer',
            name: 'Streamlit Developer',
            description: 'Data science applications with Python, Streamlit, and interactive visualizations',
            category: 'Data Science',
            difficulty: 'beginner',
            popularity: 87,
            successRate: 94,
            avgGenerationTime: 22,
            tags: ['Python', 'Data Science', 'Streamlit', 'Analytics'],
            icon: '📊',
            usageCount: 892,
            rating: 4.6,
            reviews: 156
        },
        {
            id: 'vue-developer',
            name: 'Vue.js Developer',
            description: 'Modern Vue.js applications with Composition API and Vue 3 features',
            category: 'Web Development',
            difficulty: 'intermediate',
            popularity: 73,
            successRate: 96,
            avgGenerationTime: 25,
            tags: ['Vue.js', 'JavaScript', 'Composition API', 'SPA'],
            icon: '💚',
            usageCount: 634,
            rating: 4.7,
            reviews: 98
        },
        {
            id: 'gradio-developer',
            name: 'Gradio Developer',
            description: 'Machine learning interfaces with Gradio for model deployment and demos',
            category: 'Machine Learning',
            difficulty: 'intermediate',
            popularity: 68,
            successRate: 92,
            avgGenerationTime: 30,
            tags: ['Python', 'ML', 'Gradio', 'AI'],
            icon: '🤖',
            usageCount: 445,
            rating: 4.5,
            reviews: 67
        },
        {
            id: 'code-interpreter-v1',
            name: 'Code Interpreter',
            description: 'Interactive code execution environment for data analysis and prototyping',
            category: 'Development Tools',
            difficulty: 'advanced',
            popularity: 45,
            successRate: 89,
            avgGenerationTime: 35,
            tags: ['Python', 'Jupyter', 'Data Analysis', 'Prototyping'],
            icon: '🔬',
            usageCount: 234,
            rating: 4.3,
            reviews: 45
        }
    ])

    const [selectedCategory, setSelectedCategory] = useState<string>('all')
    const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all')
    const [searchQuery, setSearchQuery] = useState('')
    const [sortBy, setSortBy] = useState<'popularity' | 'successRate' | 'avgTime'>('popularity')

    const categories = ['all', ...new Set(templates.map(t => t.category))]
    const difficulties = ['all', 'beginner', 'intermediate', 'advanced']

    const filteredTemplates = templates
        .filter(template => {
            const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory
            const matchesDifficulty = selectedDifficulty === 'all' || template.difficulty === selectedDifficulty
            const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
            return matchesCategory && matchesDifficulty && matchesSearch
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'popularity': return b.popularity - a.popularity
                case 'successRate': return b.successRate - a.successRate
                case 'avgTime': return a.avgGenerationTime - b.avgGenerationTime
                default: return 0
            }
        })

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'beginner': return 'text-success bg-success/20'
            case 'intermediate': return 'text-warning bg-warning/20'
            case 'advanced': return 'text-error bg-error/20'
            default: return 'text-muted-foreground bg-muted'
        }
    }

    const getPopularityColor = (popularity: number) => {
        if (popularity >= 90) return 'text-success'
        if (popularity >= 70) return 'text-warning'
        return 'text-muted-foreground'
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
                                Template Marketplace
                            </motion.h1>
                            <p className="m3-body-large text-muted-foreground flex items-center gap-2">
                                <Sparkles className="w-4 h-4" />
                                Choose from our curated collection of development templates
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
                                Start Building
                            </M3Button>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Filters and Search */}
            <div className="border-b border-border/50">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                        <div className="flex items-center gap-4 flex-wrap">
                            <div className="relative">
                                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Search templates..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 pr-4 py-2 bg-surface-container border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder-muted-foreground"
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <Filter className="w-4 h-4 text-muted-foreground" />
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="px-4 py-2 bg-surface-container border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                                >
                                    {categories.map(category => (
                                        <option key={category} value={category}>
                                            {category === 'all' ? 'All Categories' : category}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    value={selectedDifficulty}
                                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                                    className="px-4 py-2 bg-surface-container border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                                >
                                    {difficulties.map(difficulty => (
                                        <option key={difficulty} value={difficulty}>
                                            {difficulty === 'all' ? 'All Levels' : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as any)}
                                    className="px-4 py-2 bg-surface-container border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                                >
                                    <option value="popularity">Sort by Popularity</option>
                                    <option value="successRate">Sort by Success Rate</option>
                                    <option value="avgTime">Sort by Generation Time</option>
                                </select>
                            </div>
                        </div>

                        <div className="text-sm text-muted-foreground">
                            {filteredTemplates.length} of {templates.length} templates
                        </div>
                    </div>
                </div>
            </div>

            {/* Templates Grid */}
            <div className="max-w-7xl mx-auto p-6">
                {filteredTemplates.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-12"
                    >
                        <Code className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                        <h3 className="m3-title-large font-semibold text-foreground mb-2">No templates found</h3>
                        <p className="m3-body-medium text-muted-foreground mb-6">
                            Try adjusting your search or filter criteria
                        </p>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {filteredTemplates.map((template, index) => (
                            <motion.div
                                key={template.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <M3Card variant="elevated" className="h-full hover:shadow-lg transition-shadow">
                                    <M3CardHeader>
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <span className="text-2xl">{template.icon}</span>
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2">
                                                            <h3 className="m3-title-large font-semibold text-foreground">
                                                                {template.name}
                                                            </h3>
                                                            {template.isRecommended && (
                                                                <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full flex items-center gap-1">
                                                                    <Star className="w-3 h-3" />
                                                                    Recommended
                                                                </span>
                                                            )}
                                                        </div>
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(template.difficulty)}`}>
                                                            {template.difficulty.charAt(0).toUpperCase() + template.difficulty.slice(1)}
                                                        </span>
                                                    </div>
                                                </div>
                                                <p className="m3-body-medium text-muted-foreground mb-3">
                                                    {template.description}
                                                </p>
                                                {template.isRecommended && template.reason && (
                                                    <p className="text-sm text-primary mb-3">
                                                        💡 {template.reason}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </M3CardHeader>

                                    <M3CardContent>
                                        <div className="space-y-4">
                                            {/* Tags */}
                                            <div className="flex flex-wrap gap-2">
                                                {template.tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="px-2 py-1 bg-surface-container text-muted-foreground text-xs rounded-md"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Stats Grid */}
                                            <div className="grid grid-cols-2 gap-4 text-sm">
                                                <div className="flex items-center gap-2 text-muted-foreground">
                                                    <TrendingUp className="w-4 h-4" />
                                                    <span className={getPopularityColor(template.popularity)}>
                                                        {template.popularity}% popular
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2 text-muted-foreground">
                                                    <Star className="w-4 h-4" />
                                                    <span>{template.successRate}% success</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-muted-foreground">
                                                    <Clock className="w-4 h-4" />
                                                    <span>{template.avgGenerationTime}s avg</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-muted-foreground">
                                                    <Users className="w-4 h-4" />
                                                    <span>{template.usageCount} uses</span>
                                                </div>
                                            </div>

                                            {/* Rating and Reviews */}
                                            <div className="flex items-center justify-between text-sm">
                                                <div className="flex items-center gap-2">
                                                    <div className="flex items-center gap-1">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                className={`w-4 h-4 ${i < Math.floor(template.rating) ? 'text-warning fill-current' : 'text-muted-foreground'}`}
                                                            />
                                                        ))}
                                                    </div>
                                                    <span className="text-muted-foreground">
                                                        {template.rating} ({template.reviews} reviews)
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex items-center gap-2 pt-4 border-t border-border/50">
                                                <M3Button
                                                    variant="filled"
                                                    size="sm"
                                                    onClick={() => window.location.href = `/build?template=${template.id}`}
                                                    className="flex-1"
                                                >
                                                    <Play className="w-4 h-4 mr-2" />
                                                    Use Template
                                                </M3Button>

                                                <M3Button variant="outlined" size="sm">
                                                    <Eye className="w-4 h-4 mr-2" />
                                                    Preview
                                                </M3Button>

                                                <M3Button variant="outlined" size="sm">
                                                    <BookOpen className="w-4 h-4 mr-2" />
                                                    Docs
                                                </M3Button>

                                                <M3Button variant="outlined" size="sm">
                                                    <Share2 className="w-4 h-4 mr-2" />
                                                    Share
                                                </M3Button>
                                            </div>
                                        </div>
                                    </M3CardContent>
                                </M3Card>
                            </motion.div>
                        ))}
                    </div>
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
                        Start Building with Templates
                        <Sparkles className="w-4 h-4 ml-2 group-hover:rotate-12 transition-transform" />
                    </M3Button>
                </div>
            </div>
        </div>
    )
} 