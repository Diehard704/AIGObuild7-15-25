'use client'

import { motion } from 'framer-motion'
import { Code, Star, Download, Eye } from 'lucide-react'

export default function TemplatesPage() {
    const templates = [
        {
            id: 'nextjs-developer',
            name: 'Next.js Developer',
            description: 'Modern React applications with Next.js framework',
            category: 'Frontend',
            popularity: 95,
            downloads: 1247,
            rating: 4.8,
            features: ['TypeScript', 'Tailwind CSS', 'API Routes', 'SSR/SSG'],
            icon: '⚛️',
            color: 'from-blue-500 to-blue-600'
        },
        {
            id: 'vue-developer',
            name: 'Vue.js Developer',
            description: 'Progressive JavaScript framework for building UIs',
            category: 'Frontend',
            popularity: 87,
            downloads: 892,
            rating: 4.6,
            features: ['Vue 3', 'Composition API', 'Vite', 'TypeScript'],
            icon: '💚',
            color: 'from-green-500 to-green-600'
        },
        {
            id: 'streamlit-developer',
            name: 'Streamlit Developer',
            description: 'Data science and machine learning applications',
            category: 'Data Science',
            popularity: 92,
            downloads: 1567,
            rating: 4.9,
            features: ['Python', 'Interactive Charts', 'ML Integration', 'Real-time'],
            icon: '📊',
            color: 'from-purple-500 to-purple-600'
        },
        {
            id: 'gradio-developer',
            name: 'Gradio Developer',
            description: 'Machine learning model deployment and demos',
            category: 'ML/AI',
            popularity: 78,
            downloads: 634,
            rating: 4.5,
            features: ['Model Serving', 'Interface Builder', 'API Generation'],
            icon: '🤖',
            color: 'from-orange-500 to-orange-600'
        },
        {
            id: 'code-interpreter-v1',
            name: 'Code Interpreter',
            description: 'Interactive Python code execution environment',
            category: 'Development',
            popularity: 89,
            downloads: 1023,
            rating: 4.7,
            features: ['Python', 'Jupyter-like', 'File I/O', 'Visualization'],
            icon: '🐍',
            color: 'from-yellow-500 to-yellow-600'
        }
    ]

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <div className="border-b border-gray-800 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-blue-400">
                                Template Library
                            </h1>
                            <p className="text-gray-400 mt-1">
                                Browse and use pre-built templates for faster development
                            </p>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => window.location.href = '/build'}
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
                        >
                            Use Template
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Templates Grid */}
            <div className="max-w-7xl mx-auto p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {templates.map((template, index) => (
                        <motion.div
                            key={template.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-gray-900 rounded-xl border border-gray-700 hover:border-blue-500/30 transition-colors p-6 group"
                        >
                            {/* Template Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className={`w-12 h-12 bg-gradient-to-r ${template.color} rounded-lg flex items-center justify-center text-2xl`}>
                                        {template.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-white">
                                            {template.name}
                                        </h3>
                                        <span className="text-sm text-gray-400">
                                            {template.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 text-yellow-400">
                                    <Star className="w-4 h-4 fill-current" />
                                    <span className="text-sm font-medium">{template.rating}</span>
                                </div>
                            </div>

                            {/* Description */}
                            <p className="text-gray-400 text-sm mb-4">
                                {template.description}
                            </p>

                            {/* Features */}
                            <div className="mb-4">
                                <h4 className="text-sm font-medium text-white mb-2">Features</h4>
                                <div className="flex flex-wrap gap-2">
                                    {template.features.map((feature) => (
                                        <span
                                            key={feature}
                                            className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-md"
                                        >
                                            {feature}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="flex items-center justify-between mb-6 text-sm">
                                <div className="flex items-center gap-4">
                                    <span className="text-gray-400">
                                        <Download className="w-4 h-4 inline mr-1" />
                                        {template.downloads.toLocaleString()}
                                    </span>
                                    <span className="text-gray-400">
                                        Popularity: {template.popularity}%
                                    </span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => window.location.href = `/build?template=${template.id}`}
                                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                                >
                                    <Code className="w-4 h-4" />
                                    Use Template
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                                >
                                    <Eye className="w-4 h-4" />
                                    Preview
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Categories */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold text-blue-400 mb-6">Categories</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {[
                            { name: 'Frontend', count: 2, color: 'from-blue-500 to-blue-600' },
                            { name: 'Data Science', count: 1, color: 'from-purple-500 to-purple-600' },
                            { name: 'ML/AI', count: 1, color: 'from-orange-500 to-orange-600' },
                            { name: 'Development', count: 1, color: 'from-yellow-500 to-yellow-600' }
                        ].map((category, index) => (
                            <motion.div
                                key={category.name}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-gray-900 rounded-lg border border-gray-700 p-4 hover:border-blue-500/30 transition-colors cursor-pointer"
                            >
                                <div className={`w-8 h-8 bg-gradient-to-r ${category.color} rounded-lg mb-3`} />
                                <h3 className="text-lg font-semibold text-white mb-1">
                                    {category.name}
                                </h3>
                                <p className="text-gray-400 text-sm">
                                    {category.count} templates
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
} 