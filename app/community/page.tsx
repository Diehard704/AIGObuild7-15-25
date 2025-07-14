'use client'

import { motion } from 'framer-motion'
import { M3Button } from '@/components/ui/m3-button'
import { M3Card, M3CardContent, M3CardHeader, M3CardTitle } from '@/components/ui/m3-card'
import {
    Users,
    MessageCircle,
    Heart,
    Share2,
    Star,
    TrendingUp,
    Eye,
    Sparkles,
    Rocket,
    Filter,
    Search,
    Calendar,
    Code,
    Globe,
    Award,
    Users2,
    Download
} from 'lucide-react'

export default function CommunityPage() {
    const featuredProjects = [
        {
            id: '1',
            title: 'AI-Powered Task Manager',
            author: 'Sarah Chen',
            description: 'A smart task manager that uses AI to prioritize and categorize tasks with natural language processing',
            likes: 234,
            comments: 45,
            views: 1234,
            tags: ['AI', 'Productivity', 'Next.js', 'Machine Learning'],
            image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=300&fit=crop',
            rating: 4.8,
            downloads: 156,
            category: 'Productivity'
        },
        {
            id: '2',
            title: 'Real-time Weather Dashboard',
            author: 'Mike Johnson',
            description: 'Beautiful weather dashboard with real-time data and interactive charts using multiple weather APIs',
            likes: 189,
            comments: 32,
            views: 987,
            tags: ['Data Science', 'Streamlit', 'API', 'Visualization'],
            image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=400&h=300&fit=crop',
            rating: 4.6,
            downloads: 89,
            category: 'Data Science'
        },
        {
            id: '3',
            title: 'E-commerce Analytics Platform',
            author: 'Alex Rodriguez',
            description: 'Comprehensive analytics dashboard for e-commerce businesses with advanced reporting and insights',
            likes: 156,
            comments: 28,
            views: 756,
            tags: ['Analytics', 'Vue.js', 'Business', 'Dashboard'],
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
            rating: 4.7,
            downloads: 67,
            category: 'Business'
        }
    ]

    const communityStats = [
        { label: 'Active Members', value: '12,847', icon: Users, color: 'text-primary' },
        { label: 'Projects Shared', value: '3,421', icon: Share2, color: 'text-secondary' },
        { label: 'Total Likes', value: '89,234', icon: Heart, color: 'text-error' },
        { label: 'Comments', value: '15,678', icon: MessageCircle, color: 'text-tertiary' }
    ]

    const trendingTopics = [
        { name: 'AI Integration', posts: 156, growth: '+23%', category: 'Technology' },
        { name: 'Next.js 15', posts: 89, growth: '+45%', category: 'Development' },
        { name: 'Streamlit Apps', posts: 234, growth: '+12%', category: 'Data Science' },
        { name: 'Vue.js 3', posts: 67, growth: '+18%', category: 'Development' },
        { name: 'ML Deployment', posts: 123, growth: '+34%', category: 'Machine Learning' }
    ]

    const recentActivities = [
        { user: 'Sarah Chen', action: 'shared a new project', project: 'AI Task Manager', time: '2 hours ago' },
        { user: 'Mike Johnson', action: 'commented on', project: 'Weather Dashboard', time: '4 hours ago' },
        { user: 'Alex Rodriguez', action: 'liked', project: 'E-commerce Analytics', time: '6 hours ago' },
        { user: 'Emma Wilson', action: 'joined the community', project: '', time: '1 day ago' }
    ]

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
                                Community Hub
                            </motion.h1>
                            <p className="m3-body-large text-muted-foreground flex items-center gap-2">
                                <Sparkles className="w-4 h-4" />
                                Connect with developers, share projects, and get inspired
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
                                Share Project
                            </M3Button>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Community Stats */}
            <div className="max-w-7xl mx-auto p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    {communityStats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <M3Card variant="elevated" className="h-full">
                                <M3CardContent className="p-6 text-center">
                                    <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                                    <div className="m3-headline-large font-bold text-foreground mb-1">{stat.value}</div>
                                    <div className="m3-body-small text-muted-foreground">{stat.label}</div>
                                </M3CardContent>
                            </M3Card>
                        </motion.div>
                    ))}
                </div>

                {/* Featured Projects */}
                <div className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="m3-headline-medium font-bold text-foreground">Featured Projects</h2>
                        <M3Button variant="outlined" size="sm">
                            <Filter className="w-4 h-4 mr-2" />
                            Filter
                        </M3Button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {featuredProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <M3Card variant="elevated" className="h-full hover:shadow-lg transition-shadow overflow-hidden">
                                    <div className="h-48 bg-surface-container relative">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute top-3 right-3">
                                            <M3Button
                                                variant="filled"
                                                size="sm"
                                                className="bg-surface-container/80 hover:bg-surface-container/90"
                                            >
                                                <Heart className="w-4 h-4" />
                                            </M3Button>
                                        </div>
                                        <div className="absolute bottom-3 left-3">
                                            <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full">
                                                {project.category}
                                            </span>
                                        </div>
                                    </div>

                                    <M3CardContent className="p-6">
                                        <div className="flex items-start justify-between mb-2">
                                            <h3 className="m3-title-large font-semibold text-foreground">
                                                {project.title}
                                            </h3>
                                            <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4 text-warning fill-current" />
                                                <span className="text-sm font-medium">{project.rating}</span>
                                            </div>
                                        </div>

                                        <p className="m3-body-small text-muted-foreground mb-3">
                                            by {project.author}
                                        </p>

                                        <p className="m3-body-medium text-muted-foreground mb-4">
                                            {project.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.tags.map((tag) => (
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
                                            <span className="flex items-center gap-1">
                                                <Download className="w-4 h-4" />
                                                {project.downloads}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <M3Button variant="filled" size="sm" className="flex-1">
                                                <Eye className="w-4 h-4 mr-2" />
                                                View Project
                                            </M3Button>
                                            <M3Button variant="outlined" size="sm">
                                                <Share2 className="w-4 h-4 mr-2" />
                                                Share
                                            </M3Button>
                                        </div>
                                    </M3CardContent>
                                </M3Card>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Community Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Trending Topics */}
                    <div>
                        <h2 className="m3-headline-medium font-bold text-foreground mb-6">Trending Topics</h2>
                        <M3Card variant="elevated">
                            <M3CardContent className="p-6">
                                {trendingTopics.map((topic, index) => (
                                    <motion.div
                                        key={topic.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-center justify-between py-3 border-b border-border/50 last:border-b-0"
                                    >
                                        <div className="flex items-center gap-3">
                                            <TrendingUp className="w-4 h-4 text-success" />
                                            <div>
                                                <span className="text-foreground font-medium">{topic.name}</span>
                                                <div className="text-xs text-muted-foreground">{topic.category}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm">
                                            <span className="text-muted-foreground">{topic.posts} posts</span>
                                            <span className="text-success font-medium">{topic.growth}</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </M3CardContent>
                        </M3Card>
                    </div>

                    {/* Recent Activity */}
                    <div>
                        <h2 className="m3-headline-medium font-bold text-foreground mb-6">Recent Activity</h2>
                        <M3Card variant="elevated">
                            <M3CardContent className="p-6">
                                {recentActivities.map((activity, index) => (
                                    <motion.div
                                        key={`${activity.user}-${activity.time}`}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-center gap-3 py-3 border-b border-border/50 last:border-b-0"
                                    >
                                        <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                                            <Users2 className="w-4 h-4 text-primary" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm text-foreground">
                                                <span className="font-medium">{activity.user}</span> {activity.action}
                                                {activity.project && (
                                                    <span className="font-medium text-primary"> {activity.project}</span>
                                                )}
                                            </p>
                                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </M3CardContent>
                        </M3Card>
                    </div>
                </div>

                {/* Community Guidelines */}
                <div className="mt-12">
                    <h2 className="m3-headline-medium font-bold text-foreground mb-6">Community Guidelines</h2>
                    <M3Card variant="elevated">
                        <M3CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                                            1
                                        </div>
                                        <div>
                                            <h4 className="m3-title-medium font-semibold text-foreground mb-1">Be Respectful</h4>
                                            <p className="m3-body-small text-muted-foreground">
                                                Treat all community members with respect and kindness
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                                            2
                                        </div>
                                        <div>
                                            <h4 className="m3-title-medium font-semibold text-foreground mb-1">Share Quality Content</h4>
                                            <p className="m3-body-small text-muted-foreground">
                                                Share well-documented and functional projects
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 bg-tertiary rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                                            3
                                        </div>
                                        <div>
                                            <h4 className="m3-title-medium font-semibold text-foreground mb-1">Help Others</h4>
                                            <p className="m3-body-small text-muted-foreground">
                                                Provide constructive feedback and help fellow developers
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 bg-warning rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                                            4
                                        </div>
                                        <div>
                                            <h4 className="m3-title-medium font-semibold text-foreground mb-1">Stay On Topic</h4>
                                            <p className="m3-body-small text-muted-foreground">
                                                Keep discussions relevant to AI development and app creation
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </M3CardContent>
                    </M3Card>
                </div>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mt-12 text-center"
                >
                    <M3Card variant="elevated" className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
                        <M3CardContent className="p-8">
                            <h2 className="m3-headline-medium font-bold text-foreground mb-4">
                                Join the Conversation! 🚀
                            </h2>
                            <p className="m3-body-large text-muted-foreground mb-6 max-w-2xl mx-auto">
                                Share your projects, get feedback, and connect with developers from around the world.
                                Build amazing things together!
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <M3Button
                                    variant="filled"
                                    size="lg"
                                    onClick={() => window.location.href = '/build'}
                                    className="group"
                                >
                                    <Rocket className="w-4 h-4 mr-2" />
                                    Share Your Project
                                    <Sparkles className="w-4 h-4 ml-2 group-hover:rotate-12 transition-transform" />
                                </M3Button>

                                <M3Button
                                    variant="outlined"
                                    size="lg"
                                    onClick={() => window.location.href = '/projects'}
                                >
                                    <Globe className="w-4 h-4 mr-2" />
                                    Browse Projects
                                </M3Button>
                            </div>
                        </M3CardContent>
                    </M3Card>
                </motion.div>
            </div>
        </div>
    )
} 