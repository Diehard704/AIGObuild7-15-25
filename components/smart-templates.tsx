'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Sparkles, Search, Filter, Star, Clock, TrendingUp, Users,
    Zap, Lightbulb, BookOpen, Code, Palette, Database, Globe,
    Smartphone, Monitor, Tablet, Plus, Heart, Share2, Download,
    Eye, EyeOff, ThumbsUp, MessageCircle, Bookmark, BookmarkCheck,
    BarChart3
} from 'lucide-react'
import { M3Button } from '@/components/ui/m3-button'
import { M3Card, M3CardContent, M3CardHeader, M3CardTitle } from '@/components/ui/m3-card'

interface Template {
    id: string
    name: string
    description: string
    category: string
    tags: string[]
    difficulty: 'beginner' | 'intermediate' | 'advanced'
    popularity: number
    rating: number
    downloads: number
    lastUpdated: string
    author: string
    preview: string
    aiRecommended: boolean
    personalized: boolean
    trending: boolean
    featured: boolean
    techStack: string[]
    estimatedTime: string
    useCases: string[]
}

interface UserPreferences {
    skillLevel: 'beginner' | 'intermediate' | 'advanced'
    interests: string[]
    recentProjects: string[]
    favoriteCategories: string[]
    preferredTechStack: string[]
}

export function SmartTemplates() {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState<string>('all')
    const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all')
    const [sortBy, setSortBy] = useState<'popularity' | 'rating' | 'recent' | 'trending'>('popularity')
    const [showAIRecommendations, setShowAIRecommendations] = useState(true)
    const [showPersonalized, setShowPersonalized] = useState(true)
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
    const [selectedTemplates, setSelectedTemplates] = useState<string[]>([])

    const [userPreferences] = useState<UserPreferences>({
        skillLevel: 'intermediate',
        interests: ['web-development', 'ai', 'data-science'],
        recentProjects: ['e-commerce', 'dashboard', 'api'],
        favoriteCategories: ['web-apps', 'ai-tools', 'data-visualization'],
        preferredTechStack: ['react', 'nextjs', 'typescript', 'python']
    })

    const [templates, setTemplates] = useState<Template[]>([
        {
            id: '1',
            name: 'AI-Powered E-commerce Platform',
            description: 'Modern e-commerce solution with AI product recommendations and dynamic pricing',
            category: 'web-apps',
            tags: ['e-commerce', 'ai', 'react', 'nextjs'],
            difficulty: 'advanced',
            popularity: 95,
            rating: 4.8,
            downloads: 1247,
            lastUpdated: '2024-06-15',
            author: 'AI Studio',
            preview: 'Modern e-commerce platform with AI-powered recommendations...',
            aiRecommended: true,
            personalized: true,
            trending: true,
            featured: true,
            techStack: ['react', 'nextjs', 'typescript', 'openai'],
            estimatedTime: '2-3 hours',
            useCases: ['online-store', 'product-catalog', 'payment-processing']
        },
        {
            id: '2',
            name: 'Real-time Dashboard',
            description: 'Interactive dashboard with real-time data visualization and analytics',
            category: 'data-visualization',
            tags: ['dashboard', 'analytics', 'real-time', 'charts'],
            difficulty: 'intermediate',
            popularity: 87,
            rating: 4.6,
            downloads: 892,
            lastUpdated: '2024-06-10',
            author: 'DataViz Pro',
            preview: 'Interactive dashboard with real-time charts and analytics...',
            aiRecommended: true,
            personalized: false,
            trending: true,
            featured: false,
            techStack: ['react', 'd3', 'websockets', 'nodejs'],
            estimatedTime: '1-2 hours',
            useCases: ['business-intelligence', 'monitoring', 'analytics']
        },
        {
            id: '3',
            name: 'AI Chat Assistant',
            description: 'Intelligent chat interface with natural language processing',
            category: 'ai-tools',
            tags: ['chat', 'ai', 'nlp', 'conversation'],
            difficulty: 'intermediate',
            popularity: 92,
            rating: 4.7,
            downloads: 1056,
            lastUpdated: '2024-06-12',
            author: 'AI Labs',
            preview: 'Intelligent chat assistant with natural language processing...',
            aiRecommended: true,
            personalized: true,
            trending: true,
            featured: true,
            techStack: ['react', 'openai', 'socket.io', 'express'],
            estimatedTime: '1-2 hours',
            useCases: ['customer-support', 'virtual-assistant', 'chatbot']
        },
        {
            id: '4',
            name: 'Portfolio Website',
            description: 'Professional portfolio with modern design and animations',
            category: 'web-apps',
            tags: ['portfolio', 'design', 'animation', 'responsive'],
            difficulty: 'beginner',
            popularity: 78,
            rating: 4.5,
            downloads: 634,
            lastUpdated: '2024-06-08',
            author: 'Design Studio',
            preview: 'Professional portfolio website with modern animations...',
            aiRecommended: false,
            personalized: false,
            trending: false,
            featured: false,
            techStack: ['html', 'css', 'javascript', 'gsap'],
            estimatedTime: '30-45 minutes',
            useCases: ['personal-branding', 'showcase', 'resume']
        },
        {
            id: '5',
            name: 'Data Science Notebook',
            description: 'Interactive Jupyter-style notebook for data analysis',
            category: 'data-science',
            tags: ['data-analysis', 'python', 'jupyter', 'ml'],
            difficulty: 'advanced',
            popularity: 83,
            rating: 4.4,
            downloads: 445,
            lastUpdated: '2024-06-14',
            author: 'Data Science Hub',
            preview: 'Interactive notebook environment for data analysis...',
            aiRecommended: true,
            personalized: true,
            trending: false,
            featured: false,
            techStack: ['python', 'jupyter', 'pandas', 'matplotlib'],
            estimatedTime: '2-3 hours',
            useCases: ['data-analysis', 'machine-learning', 'research']
        }
    ])

    const categories = [
        { id: 'all', name: 'All Templates', icon: Code },
        { id: 'web-apps', name: 'Web Apps', icon: Globe },
        { id: 'ai-tools', name: 'AI Tools', icon: Sparkles },
        { id: 'data-visualization', name: 'Data Visualization', icon: BarChart3 },
        { id: 'mobile-apps', name: 'Mobile Apps', icon: Smartphone },
        { id: 'api-services', name: 'API Services', icon: Database }
    ]

    const difficulties = [
        { id: 'all', name: 'All Levels' },
        { id: 'beginner', name: 'Beginner' },
        { id: 'intermediate', name: 'Intermediate' },
        { id: 'advanced', name: 'Advanced' }
    ]

    const filteredTemplates = useMemo(() => {
        return templates.filter(template => {
            const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))

            const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory
            const matchesDifficulty = selectedDifficulty === 'all' || template.difficulty === selectedDifficulty

            return matchesSearch && matchesCategory && matchesDifficulty
        }).sort((a, b) => {
            switch (sortBy) {
                case 'popularity': return b.popularity - a.popularity
                case 'rating': return b.rating - a.rating
                case 'recent': return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
                case 'trending': return (b.trending ? 1 : 0) - (a.trending ? 1 : 0)
                default: return 0
            }
        })
    }, [templates, searchQuery, selectedCategory, selectedDifficulty, sortBy])

    const aiRecommendedTemplates = useMemo(() => {
        return filteredTemplates.filter(template => template.aiRecommended)
    }, [filteredTemplates])

    const personalizedTemplates = useMemo(() => {
        return filteredTemplates.filter(template =>
            template.personalized ||
            template.techStack.some(tech => userPreferences.preferredTechStack.includes(tech)) ||
            template.tags.some(tag => userPreferences.interests.includes(tag))
        )
    }, [filteredTemplates, userPreferences])

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'beginner': return 'text-success bg-success/20'
            case 'intermediate': return 'text-warning bg-warning/20'
            case 'advanced': return 'text-error bg-error/20'
            default: return 'text-muted-foreground bg-muted/20'
        }
    }

    const handleTemplateSelect = (templateId: string) => {
        setSelectedTemplates(prev =>
            prev.includes(templateId)
                ? prev.filter(id => id !== templateId)
                : [...prev, templateId]
        )
    }

    const handleUseTemplate = (template: Template) => {
        // Handle template usage
        console.log('Using template:', template.name)
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="m3-headline-medium font-bold text-foreground">Smart Templates</h2>
                    <p className="m3-body-large text-muted-foreground">AI-powered template recommendations</p>
                </div>

                <div className="flex items-center gap-4">
                    <M3Button
                        variant="filled"
                        size="sm"
                        onClick={() => setShowAIRecommendations(!showAIRecommendations)}
                        className="flex items-center gap-2"
                    >
                        <Sparkles className="w-4 h-4" />
                        AI Recommendations
                    </M3Button>

                    <M3Button
                        variant="outlined"
                        size="sm"
                        onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                        className="flex items-center gap-2"
                    >
                        {viewMode === 'grid' ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        {viewMode === 'grid' ? 'List' : 'Grid'}
                    </M3Button>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="space-y-4">
                {/* Search Bar */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search templates..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-surface-container border border-outline rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-4">
                    {/* Categories */}
                    <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4 text-muted-foreground" />
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="px-3 py-2 bg-surface-container border border-outline rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Difficulty */}
                    <select
                        value={selectedDifficulty}
                        onChange={(e) => setSelectedDifficulty(e.target.value)}
                        className="px-3 py-2 bg-surface-container border border-outline rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        {difficulties.map(difficulty => (
                            <option key={difficulty.id} value={difficulty.id}>{difficulty.name}</option>
                        ))}
                    </select>

                    {/* Sort By */}
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className="px-3 py-2 bg-surface-container border border-outline rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        <option value="popularity">Most Popular</option>
                        <option value="rating">Highest Rated</option>
                        <option value="recent">Recently Updated</option>
                        <option value="trending">Trending</option>
                    </select>
                </div>
            </div>

            {/* AI Recommendations Section */}
            {showAIRecommendations && aiRecommendedTemplates.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                >
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-primary" />
                        <h3 className="m3-headline-small font-semibold text-foreground">AI Recommendations</h3>
                        <div className="flex-1 h-px bg-outline" />
                    </div>

                    <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                        {aiRecommendedTemplates.slice(0, 3).map((template, index) => (
                            <motion.div
                                key={template.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <M3Card variant="elevated" className="h-full relative overflow-hidden">
                                    {template.featured && (
                                        <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-2 py-1 text-xs font-medium rounded-bl-lg">
                                            Featured
                                        </div>
                                    )}
                                    <M3CardHeader>
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <M3CardTitle className="flex items-center gap-2">
                                                    {template.name}
                                                    {template.aiRecommended && (
                                                        <Sparkles className="w-4 h-4 text-primary" />
                                                    )}
                                                </M3CardTitle>
                                                <p className="m3-body-small text-muted-foreground mt-2">{template.description}</p>
                                            </div>
                                        </div>
                                    </M3CardHeader>
                                    <M3CardContent className="space-y-4">
                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2">
                                            {template.tags.slice(0, 3).map(tag => (
                                                <span key={tag} className="px-2 py-1 bg-surface-container text-xs rounded-full text-muted-foreground">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Stats */}
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-1">
                                                    <Star className="w-4 h-4 text-warning fill-current" />
                                                    <span className="text-foreground">{template.rating}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Download className="w-4 h-4 text-muted-foreground" />
                                                    <span className="text-muted-foreground">{template.downloads}</span>
                                                </div>
                                            </div>
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(template.difficulty)}`}>
                                                {template.difficulty}
                                            </span>
                                        </div>

                                        {/* Tech Stack */}
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-muted-foreground">Tech:</span>
                                            <div className="flex gap-1">
                                                {template.techStack.slice(0, 3).map(tech => (
                                                    <span key={tech} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center gap-2">
                                            <M3Button
                                                variant="filled"
                                                size="sm"
                                                onClick={() => handleUseTemplate(template)}
                                                className="flex-1"
                                            >
                                                <Zap className="w-4 h-4 mr-2" />
                                                Use Template
                                            </M3Button>
                                            <M3Button
                                                variant="outlined"
                                                size="sm"
                                                onClick={() => handleTemplateSelect(template.id)}
                                            >
                                                <Bookmark className="w-4 h-4" />
                                            </M3Button>
                                        </div>
                                    </M3CardContent>
                                </M3Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Personalized Templates */}
            {showPersonalized && personalizedTemplates.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                >
                    <div className="flex items-center gap-2">
                        <Lightbulb className="w-5 h-5 text-primary" />
                        <h3 className="m3-headline-small font-semibold text-foreground">Personalized for You</h3>
                        <div className="flex-1 h-px bg-outline" />
                    </div>

                    <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                        {personalizedTemplates.slice(0, 6).map((template, index) => (
                            <motion.div
                                key={template.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <M3Card variant="elevated" className="h-full">
                                    <M3CardHeader>
                                        <M3CardTitle className="flex items-center gap-2">
                                            {template.name}
                                            {template.personalized && (
                                                <Lightbulb className="w-4 h-4 text-primary" />
                                            )}
                                        </M3CardTitle>
                                        <p className="m3-body-small text-muted-foreground">{template.description}</p>
                                    </M3CardHeader>
                                    <M3CardContent className="space-y-4">
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-1">
                                                    <Star className="w-4 h-4 text-warning fill-current" />
                                                    <span>{template.rating}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Clock className="w-4 h-4 text-muted-foreground" />
                                                    <span className="text-muted-foreground">{template.estimatedTime}</span>
                                                </div>
                                            </div>
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(template.difficulty)}`}>
                                                {template.difficulty}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <M3Button
                                                variant="filled"
                                                size="sm"
                                                onClick={() => handleUseTemplate(template)}
                                                className="flex-1"
                                            >
                                                Use Template
                                            </M3Button>
                                            <M3Button
                                                variant="outlined"
                                                size="sm"
                                            >
                                                <Bookmark className="w-4 h-4" />
                                            </M3Button>
                                        </div>
                                    </M3CardContent>
                                </M3Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* All Templates */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="m3-headline-small font-semibold text-foreground">All Templates</h3>
                    <span className="text-sm text-muted-foreground">{filteredTemplates.length} templates</span>
                </div>

                <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                    {filteredTemplates.map((template, index) => (
                        <motion.div
                            key={template.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <M3Card variant="elevated" className="h-full">
                                <M3CardHeader>
                                    <M3CardTitle className="flex items-center gap-2">
                                        {template.name}
                                        {template.trending && (
                                            <TrendingUp className="w-4 h-4 text-success" />
                                        )}
                                    </M3CardTitle>
                                    <p className="m3-body-small text-muted-foreground">{template.description}</p>
                                </M3CardHeader>
                                <M3CardContent className="space-y-4">
                                    <div className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4 text-warning fill-current" />
                                                <span>{template.rating}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Users className="w-4 h-4 text-muted-foreground" />
                                                <span className="text-muted-foreground">{template.downloads}</span>
                                            </div>
                                        </div>
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(template.difficulty)}`}>
                                            {template.difficulty}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <M3Button
                                            variant="filled"
                                            size="sm"
                                            onClick={() => handleUseTemplate(template)}
                                            className="flex-1"
                                        >
                                            Use Template
                                        </M3Button>
                                        <M3Button
                                            variant="outlined"
                                            size="sm"
                                        >
                                            <Bookmark className="w-4 h-4" />
                                        </M3Button>
                                    </div>
                                </M3CardContent>
                            </M3Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
} 