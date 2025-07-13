'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Heart, MessageCircle, Share2, Eye, Star, Trophy,
    Users, Calendar, TrendingUp, Award, Zap, Rocket
} from 'lucide-react'

interface CommunityApp {
    id: string
    title: string
    description: string
    author: {
        name: string
        avatar: string
        level: 'beginner' | 'intermediate' | 'expert'
    }
    template: string
    votes: number
    comments: number
    views: number
    createdAt: string
    tags: string[]
    image: string
    isFeatured?: boolean
    isVoted?: boolean
}

interface Challenge {
    id: string
    title: string
    description: string
    prize: string
    participants: number
    deadline: string
    status: 'active' | 'upcoming' | 'completed'
    category: string
    difficulty: 'beginner' | 'intermediate' | 'advanced'
}

export function CommunityFeatures() {
    const [selectedTab, setSelectedTab] = useState<'showcase' | 'challenges' | 'leaderboard'>('showcase')
    const [sortBy, setSortBy] = useState<'popular' | 'recent' | 'trending'>('popular')
    const [communityApps, setCommunityApps] = useState<CommunityApp[]>([
        {
            id: '1',
            title: 'AI-Powered Task Manager',
            description: 'Smart task management with AI prioritization and natural language processing',
            author: {
                name: 'Sarah Chen',
                avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
                level: 'expert'
            },
            template: 'Next.js',
            votes: 234,
            comments: 45,
            views: 1234,
            createdAt: '2024-06-16T10:30:00Z',
            tags: ['AI', 'Productivity', 'Next.js'],
            image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=300&fit=crop',
            isFeatured: true
        },
        {
            id: '2',
            title: 'Real-time Weather Dashboard',
            description: 'Beautiful weather dashboard with interactive charts and multiple city support',
            author: {
                name: 'Mike Johnson',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
                level: 'intermediate'
            },
            template: 'React',
            votes: 189,
            comments: 32,
            views: 987,
            createdAt: '2024-06-16T09:15:00Z',
            tags: ['Data Science', 'Streamlit', 'API'],
            image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=400&h=300&fit=crop'
        },
        {
            id: '3',
            title: 'E-commerce Analytics Platform',
            description: 'Comprehensive analytics dashboard for e-commerce businesses with real-time insights',
            author: {
                name: 'Alex Rodriguez',
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
                level: 'expert'
            },
            template: 'Vue.js',
            votes: 156,
            comments: 28,
            views: 756,
            createdAt: '2024-06-16T08:45:00Z',
            tags: ['Analytics', 'Vue.js', 'Business'],
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop'
        }
    ])

    const [challenges, setChallenges] = useState<Challenge[]>([
        {
            id: '1',
            title: 'AI Integration Challenge',
            description: 'Build an app that seamlessly integrates AI features for enhanced user experience',
            prize: '$500 + Premium Credits',
            participants: 156,
            deadline: '2024-07-15T23:59:59Z',
            status: 'active',
            category: 'AI/ML',
            difficulty: 'intermediate'
        },
        {
            id: '2',
            title: 'Mobile-First Design',
            description: 'Create a responsive app with exceptional mobile user experience',
            prize: '$300 + Pro Credits',
            participants: 89,
            deadline: '2024-07-20T23:59:59Z',
            status: 'active',
            category: 'UI/UX',
            difficulty: 'beginner'
        },
        {
            id: '3',
            title: 'Real-time Collaboration',
            description: 'Build an app that enables real-time collaboration between multiple users',
            prize: '$750 + Enterprise Credits',
            participants: 67,
            deadline: '2024-08-01T23:59:59Z',
            status: 'upcoming',
            category: 'Real-time',
            difficulty: 'advanced'
        }
    ])

    const handleVote = (appId: string) => {
        setCommunityApps(apps =>
            apps.map(app =>
                app.id === appId
                    ? { ...app, votes: app.isVoted ? app.votes - 1 : app.votes + 1, isVoted: !app.isVoted }
                    : app
            )
        )
    }

    const getLevelColor = (level: string) => {
        switch (level) {
            case 'expert': return 'text-purple-400 bg-purple-500/20'
            case 'intermediate': return 'text-yellow-400 bg-yellow-500/20'
            case 'beginner': return 'text-green-400 bg-green-500/20'
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

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'text-green-400 bg-green-500/20'
            case 'upcoming': return 'text-blue-400 bg-blue-500/20'
            case 'completed': return 'text-gray-400 bg-gray-500/20'
            default: return 'text-gray-400 bg-gray-500/20'
        }
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white">Community Hub</h2>
                    <p className="text-gray-400">Share, discover, and collaborate with developers worldwide</p>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                    <Share2 className="w-4 h-4" />
                    Share Your App
                </motion.button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-1 bg-gray-800 rounded-lg p-1">
                {[
                    { id: 'showcase', label: 'App Showcase', icon: Star },
                    { id: 'challenges', label: 'Challenges', icon: Trophy },
                    { id: 'leaderboard', label: 'Leaderboard', icon: TrendingUp }
                ].map((tab) => (
                    <motion.button
                        key={tab.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedTab(tab.id as any)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${selectedTab === tab.id
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                    </motion.button>
                ))}
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
                {selectedTab === 'showcase' && (
                    <motion.div
                        key="showcase"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6"
                    >
                        {/* Sort Controls */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <span className="text-gray-400 text-sm">Sort by:</span>
                                <div className="flex gap-2">
                                    {[
                                        { id: 'popular', label: 'Most Popular' },
                                        { id: 'recent', label: 'Recently Added' },
                                        { id: 'trending', label: 'Trending' }
                                    ].map((option) => (
                                        <button
                                            key={option.id}
                                            onClick={() => setSortBy(option.id as any)}
                                            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${sortBy === option.id
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                                }`}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* App Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                            {communityApps.map((app, index) => (
                                <motion.div
                                    key={app.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`bg-gray-900 rounded-xl border overflow-hidden hover:border-blue-500/30 transition-all duration-300 ${app.isFeatured ? 'border-blue-500/50' : 'border-gray-700'
                                        }`}
                                >
                                    {/* Featured Badge */}
                                    {app.isFeatured && (
                                        <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium z-10">
                                            Featured
                                        </div>
                                    )}

                                    {/* App Image */}
                                    <div className="relative h-48 bg-gray-800">
                                        <img
                                            src={app.image}
                                            alt={app.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                    </div>

                                    {/* App Content */}
                                    <div className="p-6">
                                        {/* Author Info */}
                                        <div className="flex items-center gap-3 mb-4">
                                            <img
                                                src={app.author.avatar}
                                                alt={app.author.name}
                                                className="w-10 h-10 rounded-full"
                                            />
                                            <div className="flex-1">
                                                <h4 className="text-white font-medium">{app.author.name}</h4>
                                                <span className={`px-2 py-1 rounded text-xs font-medium ${getLevelColor(app.author.level)}`}>
                                                    {app.author.level}
                                                </span>
                                            </div>
                                        </div>

                                        {/* App Details */}
                                        <h3 className="text-lg font-semibold text-white mb-2">{app.title}</h3>
                                        <p className="text-gray-400 text-sm mb-4">{app.description}</p>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {app.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-md"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Stats */}
                                        <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                                            <span className="flex items-center gap-1">
                                                <Eye className="w-4 h-4" />
                                                {app.views}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <MessageCircle className="w-4 h-4" />
                                                {app.comments}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                {new Date(app.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center gap-2">
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => handleVote(app.id)}
                                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${app.isVoted
                                                        ? 'bg-red-600 hover:bg-red-700 text-white'
                                                        : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                                                    }`}
                                            >
                                                <Heart className={`w-4 h-4 ${app.isVoted ? 'fill-current' : ''}`} />
                                                {app.votes}
                                            </motion.button>

                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors"
                                            >
                                                View App
                                            </motion.button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {selectedTab === 'challenges' && (
                    <motion.div
                        key="challenges"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                            {challenges.map((challenge, index) => (
                                <motion.div
                                    key={challenge.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-blue-500/30 transition-all duration-300"
                                >
                                    {/* Challenge Header */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h3 className="text-lg font-semibold text-white mb-2">{challenge.title}</h3>
                                            <p className="text-gray-400 text-sm">{challenge.description}</p>
                                        </div>
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(challenge.status)}`}>
                                            {challenge.status}
                                        </span>
                                    </div>

                                    {/* Challenge Details */}
                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-400 text-sm">Prize</span>
                                            <span className="text-yellow-400 font-medium">{challenge.prize}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-400 text-sm">Participants</span>
                                            <span className="text-white font-medium">{challenge.participants}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-400 text-sm">Deadline</span>
                                            <span className="text-white font-medium">
                                                {new Date(challenge.deadline).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Tags */}
                                    <div className="flex items-center gap-2 mb-6">
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                                            {challenge.difficulty}
                                        </span>
                                        <span className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-md">
                                            {challenge.category}
                                        </span>
                                    </div>

                                    {/* Action */}
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Trophy className="w-4 h-4" />
                                        Join Challenge
                                    </motion.button>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {selectedTab === 'leaderboard' && (
                    <motion.div
                        key="leaderboard"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6"
                    >
                        <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                            <h3 className="text-lg font-semibold text-white mb-6">Top Contributors</h3>

                            <div className="space-y-4">
                                {[
                                    { rank: 1, name: 'Sarah Chen', points: 2847, apps: 23, level: 'expert' },
                                    { rank: 2, name: 'Mike Johnson', points: 2156, apps: 18, level: 'intermediate' },
                                    { rank: 3, name: 'Alex Rodriguez', points: 1987, apps: 15, level: 'expert' },
                                    { rank: 4, name: 'Emma Wilson', points: 1654, apps: 12, level: 'intermediate' },
                                    { rank: 5, name: 'David Kim', points: 1432, apps: 10, level: 'beginner' }
                                ].map((user, index) => (
                                    <motion.div
                                        key={user.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-8 h-8 flex items-center justify-center">
                                                {index < 3 ? (
                                                    <Award className={`w-6 h-6 ${index === 0 ? 'text-yellow-400' : index === 1 ? 'text-gray-400' : 'text-orange-600'}`} />
                                                ) : (
                                                    <span className="text-gray-400 font-medium">{user.rank}</span>
                                                )}
                                            </div>
                                            <div>
                                                <h4 className="text-white font-medium">{user.name}</h4>
                                                <span className={`px-2 py-1 rounded text-xs font-medium ${getLevelColor(user.level)}`}>
                                                    {user.level}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex-1 flex items-center justify-end gap-6">
                                            <div className="text-center">
                                                <div className="text-lg font-bold text-white">{user.points}</div>
                                                <div className="text-xs text-gray-400">Points</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-lg font-bold text-blue-400">{user.apps}</div>
                                                <div className="text-xs text-gray-400">Apps</div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
} 