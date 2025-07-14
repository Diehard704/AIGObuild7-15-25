'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { M3Button } from '@/components/ui/m3-button'
import { M3Card, M3CardContent, M3CardHeader, M3CardTitle } from '@/components/ui/m3-card'
import {
    FolderOpen,
    Eye,
    Edit3,
    Share2,
    Download,
    Trash2,
    Globe,
    Clock,
    Zap,
    Calendar,
    Star,
    Filter,
    Search,
    Plus,
    Sparkles,
    Rocket
} from 'lucide-react'

interface Project {
    id: string
    title: string
    description: string
    template: string
    createdAt: string
    status: 'generating' | 'ready' | 'deployed' | 'failed'
    previewUrl?: string
    deploymentUrl?: string
    tokensUsed: number
    generationTime: number
    views: number
    likes: number
}

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([
        {
            id: '1',
            title: 'E-commerce Platform',
            description: 'Modern e-commerce platform with cart functionality and payment integration',
            template: 'nextjs-developer',
            createdAt: '2024-06-16T10:30:00Z',
            status: 'deployed',
            previewUrl: 'https://preview-1.e2b.dev',
            deploymentUrl: 'https://ecommerce-app.e2b.dev',
            tokensUsed: 4200,
            generationTime: 32,
            views: 156,
            likes: 12
        },
        {
            id: '2',
            title: 'Task Manager',
            description: 'Drag and drop task management application with real-time updates',
            template: 'nextjs-developer',
            createdAt: '2024-06-16T09:15:00Z',
            status: 'ready',
            previewUrl: 'https://preview-2.e2b.dev',
            tokensUsed: 3800,
            generationTime: 28,
            views: 89,
            likes: 8
        },
        {
            id: '3',
            title: 'Weather Dashboard',
            description: 'Real-time weather dashboard with multiple city support',
            template: 'streamlit-developer',
            createdAt: '2024-06-16T08:45:00Z',
            status: 'generating',
            tokensUsed: 0,
            generationTime: 0,
            views: 0,
            likes: 0
        },
        {
            id: '4',
            title: 'Portfolio Website',
            description: 'Professional portfolio website with animations and contact form',
            template: 'nextjs-developer',
            createdAt: '2024-06-16T07:20:00Z',
            status: 'failed',
            tokensUsed: 3500,
            generationTime: 25,
            views: 45,
            likes: 3
        }
    ])

    const [selectedFilter, setSelectedFilter] = useState<'all' | 'ready' | 'deployed' | 'generating' | 'failed'>('all')
    const [searchQuery, setSearchQuery] = useState('')

    const filteredProjects = projects.filter(project => {
        const matchesFilter = selectedFilter === 'all' || project.status === selectedFilter
        const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesFilter && matchesSearch
    })

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'deployed': return 'text-success bg-success/20'
            case 'ready': return 'text-primary bg-primary/20'
            case 'generating': return 'text-warning bg-warning/20'
            case 'failed': return 'text-error bg-error/20'
            default: return 'text-muted-foreground bg-muted'
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'deployed': return <Globe className="w-4 h-4" />
            case 'ready': return <Eye className="w-4 h-4" />
            case 'generating': return <Clock className="w-4 h-4 animate-pulse" />
            case 'failed': return <Trash2 className="w-4 h-4" />
            default: return <Clock className="w-4 h-4" />
        }
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
                                Project Management
                            </motion.h1>
                            <p className="m3-body-large text-muted-foreground flex items-center gap-2">
                                <Sparkles className="w-4 h-4" />
                                Comprehensive application development tracking and management
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
                                Create New Project
                            </M3Button>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Filters and Search */}
            <div className="border-b border-border/50">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Search projects..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 pr-4 py-2 bg-surface-container border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder-muted-foreground"
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <Filter className="w-4 h-4 text-muted-foreground" />
                                <select
                                    value={selectedFilter}
                                    onChange={(e) => setSelectedFilter(e.target.value as any)}
                                    className="px-4 py-2 bg-surface-container border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                                >
                                    <option value="all">All Projects</option>
                                    <option value="ready">Ready</option>
                                    <option value="deployed">Deployed</option>
                                    <option value="generating">Generating</option>
                                    <option value="failed">Failed</option>
                                </select>
                            </div>
                        </div>

                        <div className="text-sm text-muted-foreground">
                            {filteredProjects.length} of {projects.length} projects
                        </div>
                    </div>
                </div>
            </div>

            {/* Projects Grid */}
            <div className="max-w-7xl mx-auto p-6">
                {filteredProjects.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-12"
                    >
                        <FolderOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                        <h3 className="m3-title-large font-semibold text-foreground mb-2">No projects found</h3>
                        <p className="m3-body-medium text-muted-foreground mb-6">
                            {searchQuery || selectedFilter !== 'all'
                                ? 'Try adjusting your search or filter criteria'
                                : 'Create your first project to get started'
                            }
                        </p>
                        <M3Button
                            variant="filled"
                            size="lg"
                            onClick={() => window.location.href = '/build'}
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Create New Project
                        </M3Button>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <M3Card variant="elevated" className="h-full hover:shadow-lg transition-shadow">
                                    <M3CardHeader>
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="m3-title-large font-semibold text-foreground">
                                                        {project.title}
                                                    </h3>
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(project.status)}`}>
                                                        {getStatusIcon(project.status)}
                                                        {project.status}
                                                    </span>
                                                </div>
                                                <p className="m3-body-medium text-muted-foreground">
                                                    {project.description}
                                                </p>
                                            </div>
                                        </div>
                                    </M3CardHeader>

                                    <M3CardContent>
                                        <div className="space-y-4">
                                            {/* Project Details */}
                                            <div className="grid grid-cols-2 gap-4 text-sm">
                                                <div className="flex items-center gap-2 text-muted-foreground">
                                                    <Zap className="w-4 h-4" />
                                                    <span>{project.tokensUsed.toLocaleString()} tokens</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-muted-foreground">
                                                    <Clock className="w-4 h-4" />
                                                    <span>{project.generationTime}s</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-muted-foreground">
                                                    <Eye className="w-4 h-4" />
                                                    <span>{project.views} views</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-muted-foreground">
                                                    <Star className="w-4 h-4" />
                                                    <span>{project.likes} likes</span>
                                                </div>
                                            </div>

                                            {/* Template and Date */}
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-muted-foreground">
                                                    Template: {project.template}
                                                </span>
                                                <span className="text-muted-foreground">
                                                    {new Date(project.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex items-center gap-2 pt-4 border-t border-border/50">
                                                {project.previewUrl && (
                                                    <M3Button
                                                        variant="outlined"
                                                        size="sm"
                                                        onClick={() => window.open(project.previewUrl, '_blank')}
                                                    >
                                                        <Eye className="w-4 h-4 mr-2" />
                                                        Preview
                                                    </M3Button>
                                                )}

                                                {project.deploymentUrl && (
                                                    <M3Button
                                                        variant="filled"
                                                        size="sm"
                                                        onClick={() => window.open(project.deploymentUrl, '_blank')}
                                                    >
                                                        <Globe className="w-4 h-4 mr-2" />
                                                        Live App
                                                    </M3Button>
                                                )}

                                                <M3Button variant="outlined" size="sm">
                                                    <Edit3 className="w-4 h-4 mr-2" />
                                                    Edit
                                                </M3Button>

                                                <M3Button variant="outlined" size="sm">
                                                    <Share2 className="w-4 h-4 mr-2" />
                                                    Share
                                                </M3Button>

                                                <M3Button variant="outlined" size="sm">
                                                    <Download className="w-4 h-4 mr-2" />
                                                    Export
                                                </M3Button>

                                                <M3Button variant="outlined" size="sm" className="text-error hover:text-error">
                                                    <Trash2 className="w-4 h-4 mr-2" />
                                                    Delete
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
                        Start New Development Project
                        <Sparkles className="w-4 h-4 ml-2 group-hover:rotate-12 transition-transform" />
                    </M3Button>
                </div>
            </div>
        </div>
    )
} 