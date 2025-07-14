'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Users, MessageCircle, Heart, Share2, Bookmark, Star, TrendingUp,
    Award, Trophy, Calendar, Clock, MapPin, Globe, Filter, Search,
    Plus, Edit, Trash2, Flag, MoreHorizontal, UserPlus, Users2,
    MessageSquare, ThumbsUp, Eye, Download, Code, Palette, Database,
    Smartphone, Monitor, Tablet, Zap, Lightbulb, Target, BarChart3,
    BookOpen, HelpCircle, Newspaper
} from 'lucide-react'
import { M3Button } from '@/components/ui/m3-button'
import { M3Card, M3CardContent, M3CardHeader, M3CardTitle } from '@/components/ui/m3-card'

interface CommunityPost {
    id: string
    author: {
        id: string
        name: string
        avatar: string
        level: 'beginner' | 'intermediate' | 'expert'
        badges: string[]
        followers: number
        projects: number
    }
    content: string
    title: string
    category: string
    tags: string[]
    likes: number
    comments: number
    shares: number
    views: number
    createdAt: string
    isLiked: boolean
    isBookmarked: boolean
    attachments?: {
        type: 'image' | 'video' | 'code' | 'file'
        url: string
        name: string
    }[]
    project?: {
        id: string
        name: string
        description: string
        preview: string
        techStack: string[]
        liveUrl?: string
        githubUrl?: string
    }
}

interface CommunityEvent {
    id: string
    title: string
    description: string
    date: string
    time: string
    location: string
    type: 'workshop' | 'hackathon' | 'meetup' | 'webinar'
    attendees: number
    maxAttendees: number
    organizer: {
        name: string
        avatar: string
    }
    tags: string[]
    isRegistered: boolean
}

interface LeaderboardUser {
    id: string
    name: string
    avatar: string
    rank: number
    points: number
    level: string
    achievements: string[]
    projects: number
    contributions: number
    streak: number
}

export function CommunityFeatures() {
    const [activeTab, setActiveTab] = useState<'feed' | 'events' | 'leaderboard' | 'projects'>('feed')
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState<string>('all')
    const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'trending'>('recent')
    const [showCreatePost, setShowCreatePost] = useState(false)
    const [selectedPost, setSelectedPost] = useState<string | null>(null)

    const [posts, setPosts] = useState<CommunityPost[]>([
        {
            id: '1',
            author: {
                id: 'user1',
                name: 'Sarah Chen',
                avatar: '/avatars/sarah.jpg',
                level: 'expert',
                badges: ['Top Contributor', 'AI Expert', 'Community Leader'],
                followers: 1247,
                projects: 23
            },
            title: 'Building AI-Powered Apps with FragmentsPro',
            content: 'Just finished building an amazing AI-powered e-commerce platform using FragmentsPro! The AI suggestions were incredibly helpful in optimizing the user experience. Here are some key insights I learned...',
            category: 'tutorial',
            tags: ['ai', 'e-commerce', 'tutorial', 'nextjs'],
            likes: 156,
            comments: 23,
            shares: 12,
            views: 892,
            createdAt: '2024-06-15T10:30:00Z',
            isLiked: true,
            isBookmarked: false,
            project: {
                id: 'proj1',
                name: 'AI E-commerce Platform',
                description: 'Modern e-commerce solution with AI recommendations',
                preview: '/projects/ai-ecommerce.jpg',
                techStack: ['react', 'nextjs', 'openai', 'stripe'],
                liveUrl: 'https://ai-ecommerce.demo.com',
                githubUrl: 'https://github.com/sarah/ai-ecommerce'
            }
        },
        {
            id: '2',
            author: {
                id: 'user2',
                name: 'Alex Rodriguez',
                avatar: '/avatars/alex.jpg',
                level: 'intermediate',
                badges: ['Rising Star', 'Data Enthusiast'],
                followers: 456,
                projects: 8
            },
            title: 'Data Visualization Dashboard Tutorial',
            content: 'Created a comprehensive guide on building interactive dashboards with FragmentsPro. The real-time collaboration features made it so easy to work with my team remotely...',
            category: 'guide',
            tags: ['data-viz', 'dashboard', 'tutorial', 'collaboration'],
            likes: 89,
            comments: 15,
            shares: 8,
            views: 445,
            createdAt: '2024-06-14T15:45:00Z',
            isLiked: false,
            isBookmarked: true,
            attachments: [
                {
                    type: 'image',
                    url: '/uploads/dashboard-preview.png',
                    name: 'Dashboard Preview'
                }
            ]
        },
        {
            id: '3',
            author: {
                id: 'user3',
                name: 'Emma Thompson',
                avatar: '/avatars/emma.jpg',
                level: 'beginner',
                badges: ['Newcomer', 'Quick Learner'],
                followers: 123,
                projects: 3
            },
            title: 'My First AI Chatbot Project',
            content: 'As a beginner, I was amazed by how easy it was to create an AI chatbot using FragmentsPro! The step-by-step guidance and AI suggestions helped me understand complex concepts...',
            category: 'showcase',
            tags: ['ai', 'chatbot', 'beginner', 'showcase'],
            likes: 67,
            comments: 12,
            shares: 5,
            views: 234,
            createdAt: '2024-06-13T09:15:00Z',
            isLiked: true,
            isBookmarked: false
        }
    ])

    const [events, setEvents] = useState<CommunityEvent[]>([
        {
            id: '1',
            title: 'AI App Development Workshop',
            description: 'Learn how to build AI-powered applications using FragmentsPro. Hands-on workshop with real-world examples.',
            date: '2024-06-25',
            time: '14:00-17:00',
            location: 'Virtual',
            type: 'workshop',
            attendees: 45,
            maxAttendees: 50,
            organizer: {
                name: 'FragmentsPro Team',
                avatar: '/avatars/team.jpg'
            },
            tags: ['ai', 'workshop', 'hands-on'],
            isRegistered: true
        },
        {
            id: '2',
            title: 'Community Hackathon 2024',
            description: '24-hour hackathon to build innovative applications using FragmentsPro. Prizes for the best projects!',
            date: '2024-07-15',
            time: '09:00-09:00',
            location: 'Hybrid (Virtual + San Francisco)',
            type: 'hackathon',
            attendees: 89,
            maxAttendees: 100,
            organizer: {
                name: 'Community Leaders',
                avatar: '/avatars/community.jpg'
            },
            tags: ['hackathon', 'innovation', 'prizes'],
            isRegistered: false
        }
    ])

    const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([
        {
            id: 'user1',
            name: 'Sarah Chen',
            avatar: '/avatars/sarah.jpg',
            rank: 1,
            points: 2847,
            level: 'Expert',
            achievements: ['Top Contributor', 'AI Expert', 'Community Leader'],
            projects: 23,
            contributions: 156,
            streak: 45
        },
        {
            id: 'user4',
            name: 'Michael Park',
            avatar: '/avatars/michael.jpg',
            rank: 2,
            points: 2156,
            level: 'Expert',
            achievements: ['Code Master', 'Mentor'],
            projects: 18,
            contributions: 134,
            streak: 32
        },
        {
            id: 'user2',
            name: 'Alex Rodriguez',
            avatar: '/avatars/alex.jpg',
            rank: 3,
            points: 1892,
            level: 'Intermediate',
            achievements: ['Rising Star', 'Data Enthusiast'],
            projects: 8,
            contributions: 89,
            streak: 28
        }
    ])

    const categories = [
        { id: 'all', name: 'All Posts', icon: MessageCircle },
        { id: 'tutorial', name: 'Tutorials', icon: BookOpen },
        { id: 'showcase', name: 'Showcase', icon: Star },
        { id: 'guide', name: 'Guides', icon: BookOpen },
        { id: 'question', name: 'Questions', icon: HelpCircle },
        { id: 'news', name: 'News', icon: Newspaper }
    ]

    const handleLikePost = (postId: string) => {
        setPosts(prev => prev.map(post =>
            post.id === postId
                ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
                : post
        ))
    }

    const handleBookmarkPost = (postId: string) => {
        setPosts(prev => prev.map(post =>
            post.id === postId
                ? { ...post, isBookmarked: !post.isBookmarked }
                : post
        ))
    }

    const handleRegisterEvent = (eventId: string) => {
        setEvents(prev => prev.map(event =>
            event.id === eventId
                ? { ...event, isRegistered: !event.isRegistered, attendees: event.isRegistered ? event.attendees - 1 : event.attendees + 1 }
                : event
        ))
    }

    const getLevelColor = (level: string) => {
        switch (level) {
            case 'expert': return 'text-error bg-error/20'
            case 'intermediate': return 'text-warning bg-warning/20'
            case 'beginner': return 'text-success bg-success/20'
            default: return 'text-muted-foreground bg-muted/20'
        }
    }

    const getEventTypeColor = (type: string) => {
        switch (type) {
            case 'workshop': return 'text-primary bg-primary/20'
            case 'hackathon': return 'text-success bg-success/20'
            case 'meetup': return 'text-warning bg-warning/20'
            case 'webinar': return 'text-secondary bg-secondary/20'
            default: return 'text-muted-foreground bg-muted/20'
        }
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="m3-headline-medium font-bold text-foreground">Community</h2>
                    <p className="m3-body-large text-muted-foreground">Connect, learn, and grow with fellow developers</p>
                </div>

                <div className="flex items-center gap-4">
                    <M3Button
                        variant="filled"
                        size="sm"
                        onClick={() => setShowCreatePost(true)}
                        className="flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Create Post
                    </M3Button>

                    <M3Button
                        variant="outlined"
                        size="sm"
                        className="flex items-center gap-2"
                    >
                        <UserPlus className="w-4 h-4" />
                        Invite Friends
                    </M3Button>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-1 bg-surface-container rounded-lg p-1">
                {[
                    { id: 'feed', label: 'Feed', icon: MessageCircle },
                    { id: 'events', label: 'Events', icon: Calendar },
                    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
                    { id: 'projects', label: 'Projects', icon: Code }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === tab.id
                                ? 'bg-primary text-primary-foreground'
                                : 'text-muted-foreground hover:text-foreground'
                            }`}
                    >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Search and Filters */}
            <div className="flex items-center gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search community..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-surface-container border border-outline rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                {activeTab === 'feed' && (
                    <>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="px-3 py-2 bg-surface-container border border-outline rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as any)}
                            className="px-3 py-2 bg-surface-container border border-outline rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                            <option value="recent">Most Recent</option>
                            <option value="popular">Most Popular</option>
                            <option value="trending">Trending</option>
                        </select>
                    </>
                )}
            </div>

            {/* Content Area */}
            <AnimatePresence mode="wait">
                {activeTab === 'feed' && (
                    <motion.div
                        key="feed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6"
                    >
                        {posts.map((post, index) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <M3Card variant="elevated">
                                    <M3CardHeader>
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold">
                                                {post.author.name.charAt(0)}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="m3-title-medium font-semibold text-foreground">{post.author.name}</h3>
                                                    <span className={`px-2 py-1 rounded text-xs font-medium ${getLevelColor(post.author.level)}`}>
                                                        {post.author.level}
                                                    </span>
                                                    {post.author.badges.slice(0, 1).map(badge => (
                                                        <span key={badge} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                                                            {badge}
                                                        </span>
                                                    ))}
                                                </div>
                                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                    <span>{post.author.followers} followers</span>
                                                    <span>{post.author.projects} projects</span>
                                                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                            <button className="p-2 hover:bg-surface-container rounded-lg">
                                                <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                                            </button>
                                        </div>
                                    </M3CardHeader>
                                    <M3CardContent className="space-y-4">
                                        <h4 className="m3-title-large font-semibold text-foreground">{post.title}</h4>
                                        <p className="m3-body-medium text-muted-foreground">{post.content}</p>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2">
                                            {post.tags.map(tag => (
                                                <span key={tag} className="px-2 py-1 bg-surface-container text-xs rounded-full text-muted-foreground">
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Project Preview */}
                                        {post.project && (
                                            <div className="p-4 bg-surface-container rounded-lg border border-outline">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <Code className="w-5 h-5 text-primary" />
                                                    <h5 className="m3-title-medium font-semibold text-foreground">{post.project.name}</h5>
                                                </div>
                                                <p className="m3-body-small text-muted-foreground mb-3">{post.project.description}</p>
                                                <div className="flex items-center gap-2">
                                                    {post.project.techStack.slice(0, 3).map(tech => (
                                                        <span key={tech} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Attachments */}
                                        {post.attachments && post.attachments.length > 0 && (
                                            <div className="space-y-2">
                                                {post.attachments.map(attachment => (
                                                    <div key={attachment.name} className="p-3 bg-surface-container rounded-lg border border-outline">
                                                        <div className="flex items-center gap-2">
                                                            <Download className="w-4 h-4 text-muted-foreground" />
                                                            <span className="m3-body-small text-foreground">{attachment.name}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Actions */}
                                        <div className="flex items-center justify-between pt-4 border-t border-outline">
                                            <div className="flex items-center gap-6">
                                                <button
                                                    onClick={() => handleLikePost(post.id)}
                                                    className={`flex items-center gap-2 text-sm transition-colors ${post.isLiked ? 'text-error' : 'text-muted-foreground hover:text-foreground'
                                                        }`}
                                                >
                                                    <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
                                                    {post.likes}
                                                </button>
                                                <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                                                    <MessageSquare className="w-4 h-4" />
                                                    {post.comments}
                                                </button>
                                                <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                                                    <Share2 className="w-4 h-4" />
                                                    {post.shares}
                                                </button>
                                                <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                                                    <Eye className="w-4 h-4" />
                                                    {post.views}
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => handleBookmarkPost(post.id)}
                                                className={`p-2 rounded-lg transition-colors ${post.isBookmarked
                                                        ? 'text-primary bg-primary/10'
                                                        : 'text-muted-foreground hover:bg-surface-container'
                                                    }`}
                                            >
                                                <Bookmark className={`w-4 h-4 ${post.isBookmarked ? 'fill-current' : ''}`} />
                                            </button>
                                        </div>
                                    </M3CardContent>
                                </M3Card>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {activeTab === 'events' && (
                    <motion.div
                        key="events"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6"
                    >
                        {events.map((event, index) => (
                            <motion.div
                                key={event.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <M3Card variant="elevated">
                                    <M3CardHeader>
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className={`px-2 py-1 rounded text-xs font-medium ${getEventTypeColor(event.type)}`}>
                                                        {event.type}
                                                    </span>
                                                    <span className="text-sm text-muted-foreground">
                                                        {event.attendees}/{event.maxAttendees} attendees
                                                    </span>
                                                </div>
                                                <M3CardTitle>{event.title}</M3CardTitle>
                                                <p className="m3-body-medium text-muted-foreground mt-2">{event.description}</p>
                                            </div>
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold">
                                                {event.organizer.name.charAt(0)}
                                            </div>
                                        </div>
                                    </M3CardHeader>
                                    <M3CardContent className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-muted-foreground" />
                                                <span className="text-foreground">{event.date}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-4 h-4 text-muted-foreground" />
                                                <span className="text-foreground">{event.time}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-4 h-4 text-muted-foreground" />
                                                <span className="text-foreground">{event.location}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Users2 className="w-4 h-4 text-muted-foreground" />
                                                <span className="text-foreground">{event.organizer.name}</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {event.tags.map(tag => (
                                                <span key={tag} className="px-2 py-1 bg-surface-container text-xs rounded-full text-muted-foreground">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <M3Button
                                            variant={event.isRegistered ? "outlined" : "filled"}
                                            size="sm"
                                            onClick={() => handleRegisterEvent(event.id)}
                                            className="w-full"
                                        >
                                            {event.isRegistered ? 'Registered' : 'Register Now'}
                                        </M3Button>
                                    </M3CardContent>
                                </M3Card>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {activeTab === 'leaderboard' && (
                    <motion.div
                        key="leaderboard"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6"
                    >
                        {leaderboard.map((user, index) => (
                            <motion.div
                                key={user.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <M3Card variant="elevated">
                                    <M3CardContent className="p-6">
                                        <div className="flex items-center gap-4">
                                            <div className="relative">
                                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg">
                                                    {user.name.charAt(0)}
                                                </div>
                                                {user.rank <= 3 && (
                                                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-warning flex items-center justify-center">
                                                        <Trophy className="w-4 h-4 text-warning-foreground" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <h3 className="m3-title-large font-semibold text-foreground">{user.name}</h3>
                                                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                                                        {user.level}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                                                    <span>{user.points} points</span>
                                                    <span>{user.projects} projects</span>
                                                    <span>{user.contributions} contributions</span>
                                                    <span>{user.streak} day streak</span>
                                                </div>
                                                <div className="flex flex-wrap gap-1">
                                                    {user.achievements.slice(0, 2).map(achievement => (
                                                        <span key={achievement} className="px-2 py-1 bg-success/10 text-success text-xs rounded">
                                                            {achievement}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-2xl font-bold text-foreground">#{user.rank}</div>
                                                <div className="text-sm text-muted-foreground">Rank</div>
                                            </div>
                                        </div>
                                    </M3CardContent>
                                </M3Card>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {activeTab === 'projects' && (
                    <motion.div
                        key="projects"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6"
                    >
                        <div className="text-center py-12">
                            <Code className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                            <h3 className="m3-headline-small font-semibold text-foreground mb-2">Community Projects</h3>
                            <p className="m3-body-medium text-muted-foreground">Discover amazing projects built by the community</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
} 