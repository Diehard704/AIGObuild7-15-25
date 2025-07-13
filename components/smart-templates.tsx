'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Sparkles, Star, TrendingUp, Clock, Zap,
    ThumbsUp, ThumbsDown, Eye, Code, Rocket
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
}

interface UserPreferences {
    experience: 'beginner' | 'intermediate' | 'advanced'
    interests: string[]
    recentSearches: string[]
    favoriteCategories: string[]
}

export function SmartTemplates() {
    const [selectedCategory, setSelectedCategory] = useState<string>('all')
    const [userPreferences, setUserPreferences] = useState<UserPreferences>({
        experience: 'intermediate',
        interests: ['Web Apps', 'Data Visualization'],
        recentSearches: ['e-commerce', 'dashboard', 'task manager'],
        favoriteCategories: ['Next.js', 'React']
    })

    const [templates, setTemplates] = useState<Template[]>([
        {
            id: '1',
            name: 'E-commerce Platform',
            description: 'Complete online store with cart and payment integration',
            category: 'Next.js',
            difficulty: 'intermediate',
            popularity: 95,
            successRate: 92,
            avgGenerationTime: 32,
            tags: ['e-commerce', 'shopping', 'payment'],
            icon: '🛒',
            isRecommended: true,
            reason: 'Matches your interest in Web Apps'
        },
        {
            id: '2',
            name: 'Data Dashboard',
            description: 'Interactive charts and real-time data visualization',
            category: 'React',
            difficulty: 'intermediate',
            popularity: 88,
            successRate: 89,
            avgGenerationTime: 28,
            tags: ['dashboard', 'charts', 'analytics'],
            icon: '📊',
            isRecommended: true,
            reason: 'Perfect for your Data Visualization interest'
        },
        {
            id: '3',
            name: 'Task Manager',
            description: 'Todo app with drag-and-drop functionality',
            category: 'Vue.js',
            difficulty: 'beginner',
            popularity: 76,
            successRate: 94,
            avgGenerationTime: 25,
            tags: ['productivity', 'todo', 'management'],
            icon: '📋',
            isRecommended: false
        },
        {
            id: '4',
            name: 'Social Network',
            description: 'User profiles, posts, and real-time messaging',
            category: 'Next.js',
            difficulty: 'advanced',
            popularity: 82,
            successRate: 87,
            avgGenerationTime: 45,
            tags: ['social', 'messaging', 'profiles'],
            icon: '👥',
            isRecommended: false
        },
        {
            id: '5',
            name: 'Weather App',
            description: 'Real-time weather data with beautiful UI',
            category: 'React',
            difficulty: 'beginner',
            popularity: 91,
            successRate: 96,
            avgGenerationTime: 22,
            tags: ['weather', 'api', 'ui'],
            icon: '🌤️',
            isRecommended: true,
            reason: 'Great for beginners, high success rate'
        },
        {
            id: '6',
            name: 'Portfolio Website',
            description: 'Professional portfolio with animations',
            category: 'Next.js',
            difficulty: 'intermediate',
            popularity: 85,
            successRate: 90,
            avgGenerationTime: 30,
            tags: ['portfolio', 'personal', 'showcase'],
            icon: '🎨',
            isRecommended: false
        }
    ])

    const categories = ['all', 'Next.js', 'React', 'Vue.js', 'Streamlit', 'Python']

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'beginner': return 'text-green-400 bg-green-500/20'
            case 'intermediate': return 'text-yellow-400 bg-yellow-500/20'
            case 'advanced': return 'text-red-400 bg-red-500/20'
            default: return 'text-gray-400 bg-gray-500/20'
        }
    }

    const filteredTemplates = templates.filter(template =>
        selectedCategory === 'all' || template.category === selectedCategory
    )

    const recommendedTemplates = filteredTemplates.filter(t => t.isRecommended)
    const otherTemplates = filteredTemplates.filter(t => !t.isRecommended)

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white">Smart Template Recommendations</h2>
                    <p className="text-gray-400">AI-powered suggestions based on your preferences</p>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                >
                    <Sparkles className="w-4 h-4" />
                    Refresh Recommendations
                </motion.button>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-4 overflow-x-auto pb-2">
                {categories.map((category) => (
                    <motion.button
                        key={category}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${selectedCategory === category
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                            }`}
                    >
                        {category === 'all' ? 'All Templates' : category}
                    </motion.button>
                ))}
            </div>

            {/* Recommended Templates */}
            {recommendedTemplates.length > 0 && (
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <Sparkles className="w-5 h-5 text-yellow-400" />
                        <h3 className="text-lg font-semibold text-white">Recommended for You</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {recommendedTemplates.map((template, index) => (
                            <motion.div
                                key={template.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="relative bg-gray-900 rounded-xl p-6 border border-blue-500/30 hover:border-blue-500/50 transition-all duration-300 group"
                            >
                                {/* Recommendation Badge */}
                                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                                    Recommended
                                </div>

                                {/* Template Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="text-3xl">{template.icon}</div>
                                        <div>
                                            <h4 className="text-lg font-semibold text-white">{template.name}</h4>
                                            <p className="text-sm text-gray-400">{template.category}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-gray-300 text-sm mb-4">{template.description}</p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {template.tags.slice(0, 3).map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-md"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-3 gap-4 mb-4">
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-white">{template.popularity}%</div>
                                        <div className="text-xs text-gray-400">Popularity</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-green-400">{template.successRate}%</div>
                                        <div className="text-xs text-gray-400">Success Rate</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-blue-400">{template.avgGenerationTime}s</div>
                                        <div className="text-xs text-gray-400">Avg Time</div>
                                    </div>
                                </div>

                                {/* Difficulty */}
                                <div className="flex items-center justify-between mb-4">
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(template.difficulty)}`}>
                                        {template.difficulty}
                                    </span>
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                        <span className="text-sm text-gray-400">{template.popularity}</span>
                                    </div>
                                </div>

                                {/* Reason */}
                                {template.reason && (
                                    <div className="mb-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                                        <p className="text-sm text-blue-400">
                                            <Sparkles className="w-3 h-3 inline mr-1" />
                                            {template.reason}
                                        </p>
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="flex items-center gap-2">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Rocket className="w-4 h-4" />
                                        Use Template
                                    </motion.button>

                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                                    >
                                        <Eye className="w-4 h-4 text-gray-400" />
                                    </motion.button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}

            {/* Other Templates */}
            {otherTemplates.length > 0 && (
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Other Templates</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {otherTemplates.map((template, index) => (
                            <motion.div
                                key={template.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: (recommendedTemplates.length + index) * 0.1 }}
                                className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300 group"
                            >
                                {/* Template Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="text-3xl">{template.icon}</div>
                                        <div>
                                            <h4 className="text-lg font-semibold text-white">{template.name}</h4>
                                            <p className="text-sm text-gray-400">{template.category}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-gray-300 text-sm mb-4">{template.description}</p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {template.tags.slice(0, 3).map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-md"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-3 gap-4 mb-4">
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-white">{template.popularity}%</div>
                                        <div className="text-xs text-gray-400">Popularity</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-green-400">{template.successRate}%</div>
                                        <div className="text-xs text-gray-400">Success Rate</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-blue-400">{template.avgGenerationTime}s</div>
                                        <div className="text-xs text-gray-400">Avg Time</div>
                                    </div>
                                </div>

                                {/* Difficulty */}
                                <div className="flex items-center justify-between mb-4">
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(template.difficulty)}`}>
                                        {template.difficulty}
                                    </span>
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                        <span className="text-sm text-gray-400">{template.popularity}</span>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Code className="w-4 h-4" />
                                        Use Template
                                    </motion.button>

                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                                    >
                                        <Eye className="w-4 h-4 text-gray-400" />
                                    </motion.button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
} 