'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Star, DollarSign, Download, Eye, Heart, Filter,
    Search, TrendingUp, Clock, Users, Award, Crown
} from 'lucide-react'

interface TemplateCreator {
    id: string
    name: string
    avatar: string
    level: 'creator' | 'expert' | 'verified'
    rating: number
    sales: number
    followers: number
    bio: string
}

interface MarketplaceTemplate {
    id: string
    title: string
    description: string
    creator: TemplateCreator
    price: number
    originalPrice?: number
    rating: number
    reviews: number
    downloads: number
    category: string
    tags: string[]
    preview: string
    isFeatured?: boolean
    isOnSale?: boolean
    isLiked?: boolean
    difficulty: 'beginner' | 'intermediate' | 'advanced'
    lastUpdated: string
}

export function TemplateMarketplace() {
    const [selectedCategory, setSelectedCategory] = useState<string>('all')
    const [sortBy, setSortBy] = useState<'popular' | 'recent' | 'price' | 'rating'>('popular')
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 100])
    const [searchQuery, setSearchQuery] = useState('')
    const [templates, setTemplates] = useState<MarketplaceTemplate[]>([
        {
            id: '1',
            title: 'Advanced E-commerce Suite',
            description: 'Complete e-commerce solution with advanced features like AI recommendations, inventory management, and analytics dashboard',
            creator: {
                id: '1',
                name: 'Sarah Chen',
                avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
                level: 'verified',
                rating: 4.9,
                sales: 234,
                followers: 1234,
                bio: 'Full-stack developer specializing in e-commerce solutions'
            },
            price: 49.99,
            originalPrice: 79.99,
            rating: 4.8,
            reviews: 156,
            downloads: 892,
            category: 'E-commerce',
            tags: ['shopping', 'payment', 'analytics', 'AI'],
            preview: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
            isFeatured: true,
            isOnSale: true,
            difficulty: 'advanced',
            lastUpdated: '2024-06-15T10:30:00Z'
        },
        {
            id: '2',
            title: 'Social Media Dashboard',
            description: 'Comprehensive social media management platform with scheduling, analytics, and multi-platform integration',
            creator: {
                id: '2',
                name: 'Mike Johnson',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
                level: 'expert',
                rating: 4.7,
                sales: 189,
                followers: 987,
                bio: 'Social media expert and full-stack developer'
            },
            price: 29.99,
            rating: 4.7,
            reviews: 89,
            downloads: 567,
            category: 'Social Media',
            tags: ['dashboard', 'analytics', 'scheduling', 'multi-platform'],
            preview: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
            difficulty: 'intermediate',
            lastUpdated: '2024-06-14T15:45:00Z'
        },
        {
            id: '3',
            title: 'AI Chatbot Platform',
            description: 'Intelligent chatbot builder with natural language processing and custom training capabilities',
            creator: {
                id: '3',
                name: 'Alex Rodriguez',
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
                level: 'creator',
                rating: 4.6,
                sales: 145,
                followers: 756,
                bio: 'AI/ML specialist and chatbot developer'
            },
            price: 39.99,
            rating: 4.6,
            reviews: 67,
            downloads: 423,
            category: 'AI/ML',
            tags: ['chatbot', 'AI', 'NLP', 'training'],
            preview: 'https://images.unsplash.com/photo-1677442136019-21780ecadf73?w=400&h=300&fit=crop',
            difficulty: 'advanced',
            lastUpdated: '2024-06-13T09:20:00Z'
        },
        {
            id: '4',
            title: 'Portfolio Builder Pro',
            description: 'Professional portfolio website with animations, SEO optimization, and contact forms',
            creator: {
                id: '4',
                name: 'Emma Wilson',
                avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
                level: 'expert',
                rating: 4.9,
                sales: 312,
                followers: 1456,
                bio: 'UI/UX designer and frontend developer'
            },
            price: 19.99,
            rating: 4.9,
            reviews: 234,
            downloads: 1234,
            category: 'Portfolio',
            tags: ['portfolio', 'animations', 'SEO', 'contact'],
            preview: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
            isFeatured: true,
            difficulty: 'beginner',
            lastUpdated: '2024-06-12T14:15:00Z'
        }
    ])

    const categories = ['all', 'E-commerce', 'Social Media', 'AI/ML', 'Portfolio', 'Dashboard', 'Blog', 'Landing Page']

    const handleLike = (templateId: string) => {
        setTemplates(templates =>
            templates.map(template =>
                template.id === templateId
                    ? { ...template, isLiked: !template.isLiked }
                    : template
            )
        )
    }

    const getLevelColor = (level: string) => {
        switch (level) {
            case 'verified': return 'text-blue-400 bg-blue-500/20'
            case 'expert': return 'text-purple-400 bg-purple-500/20'
            case 'creator': return 'text-green-400 bg-green-500/20'
            default: return 'text-gray-400 bg-gray-500/20'
        }
    }

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'beginner': return 'text-green-400 bg-green-500/20'
            case 'intermediate': return 'text-yellow-400 bg-yellow-500/20'
            case 'advanced': return 'text-red-400 bg-red-500/20'
            default: return 'text-gray-400 bg-gray-500/20'
        }
    }

    const filteredTemplates = templates.filter(template => {
        const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory
        const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            template.description.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesPrice = template.price >= priceRange[0] && template.price <= priceRange[1]

        return matchesCategory && matchesSearch && matchesPrice
    })

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white">Template Marketplace</h2>
                    <p className="text-gray-400">Discover and purchase premium templates from expert creators</p>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                    <DollarSign className="w-4 h-4" />
                    Sell Your Template
                </motion.button>
            </div>

            {/* Search and Filters */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search templates..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Category Filter */}
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category === 'all' ? 'All Categories' : category}
                            </option>
                        ))}
                    </select>

                    {/* Sort By */}
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="popular">Most Popular</option>
                        <option value="recent">Recently Added</option>
                        <option value="price">Price</option>
                        <option value="rating">Highest Rated</option>
                    </select>

                    {/* Price Range */}
                    <div className="flex items-center gap-2">
                        <input
                            type="number"
                            placeholder="Min"
                            value={priceRange[0]}
                            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                            className="w-20 px-2 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="text-gray-400">-</span>
                        <input
                            type="number"
                            placeholder="Max"
                            value={priceRange[1]}
                            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                            className="w-20 px-2 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </div>

            {/* Templates Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredTemplates.map((template, index) => (
                    <motion.div
                        key={template.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`bg-gray-900 rounded-xl border overflow-hidden hover:border-blue-500/30 transition-all duration-300 ${template.isFeatured ? 'border-blue-500/50' : 'border-gray-700'
                            }`}
                    >
                        {/* Featured Badge */}
                        {template.isFeatured && (
                            <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium z-10">
                                Featured
                            </div>
                        )}

                        {/* Sale Badge */}
                        {template.isOnSale && (
                            <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium z-10">
                                Sale
                            </div>
                        )}

                        {/* Template Preview */}
                        <div className="relative h-48 bg-gray-800">
                            <img
                                src={template.preview}
                                alt={template.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                            {/* Quick Actions */}
                            <div className="absolute top-3 right-3 flex gap-2">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => handleLike(template.id)}
                                    className={`p-2 rounded-lg transition-colors ${template.isLiked
                                            ? 'bg-red-500 text-white'
                                            : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700/80'
                                        }`}
                                >
                                    <Heart className={`w-4 h-4 ${template.isLiked ? 'fill-current' : ''}`} />
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="p-2 bg-gray-800/80 text-gray-300 hover:bg-gray-700/80 rounded-lg transition-colors"
                                >
                                    <Eye className="w-4 h-4" />
                                </motion.button>
                            </div>
                        </div>

                        {/* Template Content */}
                        <div className="p-6">
                            {/* Creator Info */}
                            <div className="flex items-center gap-3 mb-4">
                                <img
                                    src={template.creator.avatar}
                                    alt={template.creator.name}
                                    className="w-8 h-8 rounded-full"
                                />
                                <div className="flex-1">
                                    <h4 className="text-white font-medium text-sm">{template.creator.name}</h4>
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${getLevelColor(template.creator.level)}`}>
                                        {template.creator.level}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                    <span className="text-sm text-white">{template.creator.rating}</span>
                                </div>
                            </div>

                            {/* Template Details */}
                            <h3 className="text-lg font-semibold text-white mb-2">{template.title}</h3>
                            <p className="text-gray-400 text-sm mb-4">{template.description}</p>

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
                            <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                                <div>
                                    <div className="text-lg font-bold text-white">{template.rating}</div>
                                    <div className="text-xs text-gray-400">Rating</div>
                                </div>
                                <div>
                                    <div className="text-lg font-bold text-blue-400">{template.downloads}</div>
                                    <div className="text-xs text-gray-400">Downloads</div>
                                </div>
                                <div>
                                    <div className="text-lg font-bold text-green-400">{template.reviews}</div>
                                    <div className="text-xs text-gray-400">Reviews</div>
                                </div>
                            </div>

                            {/* Difficulty and Price */}
                            <div className="flex items-center justify-between mb-4">
                                <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(template.difficulty)}`}>
                                    {template.difficulty}
                                </span>
                                <div className="flex items-center gap-2">
                                    {template.originalPrice && (
                                        <span className="text-gray-500 line-through text-sm">
                                            ${template.originalPrice}
                                        </span>
                                    )}
                                    <span className="text-xl font-bold text-white">
                                        ${template.price}
                                    </span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                                >
                                    <Download className="w-4 h-4" />
                                    Purchase
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors"
                                >
                                    Preview
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Featured Creators */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-6">Featured Creators</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {templates.slice(0, 3).map((template) => (
                        <div key={template.creator.id} className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg">
                            <img
                                src={template.creator.avatar}
                                alt={template.creator.name}
                                className="w-12 h-12 rounded-full"
                            />
                            <div className="flex-1">
                                <h4 className="text-white font-medium">{template.creator.name}</h4>
                                <p className="text-gray-400 text-sm">{template.creator.bio}</p>
                                <div className="flex items-center gap-4 mt-2 text-sm">
                                    <span className="text-gray-400">{template.creator.sales} sales</span>
                                    <span className="text-gray-400">{template.creator.followers} followers</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                    <span className="text-white font-medium">{template.creator.rating}</span>
                                </div>
                                <span className={`px-2 py-1 rounded text-xs font-medium ${getLevelColor(template.creator.level)}`}>
                                    {template.creator.level}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
} 