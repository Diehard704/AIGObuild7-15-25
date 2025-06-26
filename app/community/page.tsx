'use client'

import { motion } from 'framer-motion'
import { Users, MessageCircle, Heart, Share2, Star, TrendingUp, Eye } from 'lucide-react'

export default function CommunityPage() {
    const featuredProjects = [
        {
            id: '1',
            title: 'AI-Powered Task Manager',
            author: 'Sarah Chen',
            description: 'A smart task manager that uses AI to prioritize and categorize tasks',
            likes: 234,
            comments: 45,
            views: 1234,
            tags: ['AI', 'Productivity', 'Next.js'],
            image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=300&fit=crop'
        },
        {
            id: '2',
            title: 'Real-time Weather Dashboard',
            author: 'Mike Johnson',
            description: 'Beautiful weather dashboard with real-time data and interactive charts',
            likes: 189,
            comments: 32,
            views: 987,
            tags: ['Data Science', 'Streamlit', 'API'],
            image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=400&h=300&fit=crop'
        },
        {
            id: '3',
            title: 'E-commerce Analytics Platform',
            author: 'Alex Rodriguez',
            description: 'Comprehensive analytics dashboard for e-commerce businesses',
            likes: 156,
            comments: 28,
            views: 756,
            tags: ['Analytics', 'Vue.js', 'Business'],
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop'
        }
    ]

    const communityStats = [
        { label: 'Active Members', value: '12,847', icon: Users, color: 'text-blue-400' },
        { label: 'Projects Shared', value: '3,421', icon: Share2, color: 'text-green-400' },
        { label: 'Total Likes', value: '89,234', icon: Heart, color: 'text-red-400' },
        { label: 'Comments', value: '15,678', icon: MessageCircle, color: 'text-purple-400' }
    ]

    const trendingTopics = [
        { name: 'AI Integration', posts: 156, growth: '+23%' },
        { name: 'Next.js 15', posts: 89, growth: '+45%' },
        { name: 'Streamlit Apps', posts: 234, growth: '+12%' },
        { name: 'Vue.js 3', posts: 67, growth: '+18%' },
        { name: 'ML Deployment', posts: 123, growth: '+34%' }
    ]

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <div className="border-b border-gray-800 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-blue-400">
                                Community Hub
                            </h1>
                            <p className="text-gray-400 mt-1">
                                Connect with developers, share projects, and get inspired
                            </p>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => window.location.href = '/build'}
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
                        >
                            Share Project
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Community Stats */}
            <div className="max-w-7xl mx-auto p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    {communityStats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-gray-900 rounded-xl border border-gray-700 p-6 text-center"
                        >
                            <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                            <div className="text-gray-400 text-sm">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Featured Projects */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-blue-400 mb-6">Featured Projects</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {featuredProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-gray-900 rounded-xl border border-gray-700 hover:border-blue-500/30 transition-colors overflow-hidden"
                            >
                                <div className="h-48 bg-gray-800 relative">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-3 right-3">
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="p-2 bg-gray-900/80 rounded-lg text-white hover:bg-gray-800/80 transition-colors"
                                        >
                                            <Heart className="w-4 h-4" />
                                        </motion.button>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-white mb-2">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm mb-3">
                                        by {project.author}
                                    </p>
                                    <p className="text-gray-300 text-sm mb-4">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-md"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex items-center justify-between text-sm text-gray-400">
                                        <div className="flex items-center gap-4">
                                            <span className="flex items-center gap-1">
                                                <Heart className="w-4 h-4" />
                                                {project.likes}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <MessageCircle className="w-4 h-4" />
                                                {project.comments}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Eye className="w-4 h-4" />
                                                {project.views}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Trending Topics */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-2xl font-bold text-blue-400 mb-6">Trending Topics</h2>
                        <div className="bg-gray-900 rounded-xl border border-gray-700 p-6">
                            {trendingTopics.map((topic, index) => (
                                <motion.div
                                    key={topic.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-center justify-between py-3 border-b border-gray-700 last:border-b-0"
                                >
                                    <div className="flex items-center gap-3">
                                        <TrendingUp className="w-4 h-4 text-green-400" />
                                        <span className="text-white font-medium">{topic.name}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <span className="text-gray-400">{topic.posts} posts</span>
                                        <span className="text-green-400 font-medium">{topic.growth}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-blue-400 mb-6">Community Guidelines</h2>
                        <div className="bg-gray-900 rounded-xl border border-gray-700 p-6">
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                                        1
                                    </div>
                                    <div>
                                        <h4 className="text-white font-medium mb-1">Be Respectful</h4>
                                        <p className="text-gray-400 text-sm">
                                            Treat all community members with respect and kindness
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                                        2
                                    </div>
                                    <div>
                                        <h4 className="text-white font-medium mb-1">Share Quality Content</h4>
                                        <p className="text-gray-400 text-sm">
                                            Share well-documented and functional projects
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                                        3
                                    </div>
                                    <div>
                                        <h4 className="text-white font-medium mb-1">Help Others</h4>
                                        <p className="text-gray-400 text-sm">
                                            Provide constructive feedback and help fellow developers
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                                        4
                                    </div>
                                    <div>
                                        <h4 className="text-white font-medium mb-1">Stay On Topic</h4>
                                        <p className="text-gray-400 text-sm">
                                            Keep discussions relevant to AI development and app creation
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mt-12 text-center"
                >
                    <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-8 border border-blue-500/20">
                        <h2 className="text-2xl font-bold text-blue-400 mb-4">
                            Join the Conversation! 🚀
                        </h2>
                        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                            Share your projects, get feedback, and connect with developers from around the world.
                            Build amazing things together!
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => window.location.href = '/build'}
                                className="px-8 py-4 bg-blue-500 hover:bg-blue-600 rounded-xl font-semibold transition-colors"
                            >
                                Share Your Project
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-gray-700 hover:bg-gray-600 rounded-xl font-semibold transition-colors"
                            >
                                Browse Projects
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
} 