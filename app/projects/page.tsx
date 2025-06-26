'use client'

import { motion } from 'framer-motion'
import { FolderOpen, Eye, Globe, Edit3, Share2, Download } from 'lucide-react'

export default function ProjectsPage() {
    const projects = [
        {
            id: '1',
            title: 'E-commerce Platform',
            description: 'Modern e-commerce platform with cart functionality',
            template: 'nextjs-developer',
            status: 'deployed',
            createdAt: '2024-06-16T10:30:00Z',
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
            description: 'Task management app with drag and drop',
            template: 'nextjs-developer',
            status: 'ready',
            createdAt: '2024-06-16T09:15:00Z',
            previewUrl: 'https://preview-2.e2b.dev',
            tokensUsed: 3800,
            generationTime: 28,
            views: 89,
            likes: 8
        },
        {
            id: '3',
            title: 'Weather Dashboard',
            description: 'Weather dashboard with multiple cities',
            template: 'streamlit-developer',
            status: 'generating',
            createdAt: '2024-06-16T08:45:00Z',
            tokensUsed: 0,
            generationTime: 0,
            views: 0,
            likes: 0
        }
    ]

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'deployed': return 'text-green-400 bg-green-500/20'
            case 'ready': return 'text-blue-400 bg-blue-500/20'
            case 'generating': return 'text-yellow-400 bg-yellow-500/20'
            case 'failed': return 'text-red-400 bg-red-500/20'
            default: return 'text-gray-400 bg-gray-500/20'
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'deployed': return <Globe className="w-4 h-4" />
            case 'ready': return <Eye className="w-4 h-4" />
            case 'generating': return <div className="w-4 h-4 animate-spin rounded-full border-2 border-yellow-400 border-t-transparent" />
            case 'failed': return <div className="w-4 h-4 text-red-400">✕</div>
            default: return <div className="w-4 h-4" />
        }
    }

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <div className="border-b border-gray-800 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-blue-400">
                                Project Management
                            </h1>
                            <p className="text-gray-400 mt-1">
                                Manage and track your generated applications
                            </p>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => window.location.href = '/build'}
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
                        >
                            Create New Project
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Projects Grid */}
            <div className="max-w-7xl mx-auto p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-gray-900 rounded-xl border border-gray-700 hover:border-blue-500/30 transition-colors p-6"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold text-white mb-2">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm mb-3">
                                        {project.description}
                                    </p>
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(project.status)}`}>
                                            {getStatusIcon(project.status)}
                                            {project.status}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            {project.template}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Created</span>
                                    <span className="text-white">
                                        {new Date(project.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Tokens Used</span>
                                    <span className="text-white">{project.tokensUsed.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Generation Time</span>
                                    <span className="text-white">{project.generationTime}s</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Views</span>
                                    <span className="text-white">{project.views}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                {project.previewUrl && (
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => window.open(project.previewUrl, '_blank')}
                                        className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Eye className="w-4 h-4" />
                                        Preview
                                    </motion.button>
                                )}

                                {project.deploymentUrl && (
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => window.open(project.deploymentUrl, '_blank')}
                                        className="flex-1 px-3 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Globe className="w-4 h-4" />
                                        Live
                                    </motion.button>
                                )}

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors"
                                >
                                    <Edit3 className="w-4 h-4" />
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors"
                                >
                                    <Share2 className="w-4 h-4" />
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors"
                                >
                                    <Download className="w-4 h-4" />
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
} 