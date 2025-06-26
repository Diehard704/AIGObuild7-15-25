'use client'
import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import Logo from './logo'
import { User, Settings, LogOut, Sparkles } from 'lucide-react'
import { CreditDisplay } from './credit-display'

export function Sidebar() {
    const pathname = usePathname()
    const navItems = [
        { href: '/build', label: 'New Project', icon: '🪄', description: 'Create new app' },
        { href: '/dashboard', label: 'Dashboard', icon: '📊', description: 'View analytics' },
        { href: '/projects', label: 'Projects', icon: '📁', description: 'Manage projects' },
        { href: '/templates', label: 'Templates', icon: '🎨', description: 'Browse templates' },
        { href: '/community', label: 'Community', icon: '🌐', description: 'Join community' },
    ]

    return (
        <motion.aside
            initial={{ x: -256, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed left-0 top-0 z-40 h-screen w-64 bg-black/90 backdrop-blur-xl border-r border-gray-800/50 flex flex-col"
        >
            {/* Logo Section */}
            <motion.div
                className="flex items-center h-16 px-6 border-b border-gray-800/50"
                whileHover={{ scale: 1.02 }}
            >
                <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <Logo className="w-8 h-8 mr-3" />
                </motion.div>
                <span className="text-2xl font-bold gradient-text">FragmentsPro</span>
            </motion.div>

            {/* Navigation */}
            <nav className="flex-1 py-6 px-3 space-y-2">
                {navItems.map((item, index) => (
                    <motion.div
                        key={item.href}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                        <Link
                            href={item.href}
                            className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-sm font-medium hover-lift ${pathname === item.href
                                ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-400 border border-blue-500/30'
                                : 'text-gray-300 hover:text-blue-400 hover:bg-gray-800/30'
                                }`}
                        >
                            {/* Hover Effect Background */}
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            {/* Icon */}
                            <motion.span
                                className="relative z-10 text-lg"
                                whileHover={{ scale: 1.2, rotate: 10 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                {item.icon}
                            </motion.span>

                            {/* Label */}
                            <span className="relative z-10">{item.label}</span>

                            {/* Description Tooltip */}
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                whileHover={{ opacity: 1, x: 0 }}
                                className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
                            >
                                {item.description}
                            </motion.div>
                        </Link>
                    </motion.div>
                ))}
            </nav>

            {/* Recent Projects */}
            <div className="flex-1 px-4 py-4">
                <motion.h3
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2"
                >
                    <Sparkles className="w-3 h-3" />
                    Recent Projects
                </motion.h3>
                <div className="space-y-2">
                    {[
                        { name: 'E-commerce Platform', status: 'deployed' },
                        { name: 'Task Manager', status: 'ready' },
                        { name: 'Weather Dashboard', status: 'generating' }
                    ].map((project, index) => (
                        <motion.div
                            key={project.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7 + index * 0.1 }}
                            whileHover={{ x: 5, scale: 1.02 }}
                            className="group relative px-3 py-2 text-sm text-gray-400 hover:text-white cursor-pointer rounded-lg hover:bg-gray-800/50 transition-all duration-300"
                        >
                            <div className="flex items-center justify-between">
                                <span className="truncate">{project.name}</span>
                                <motion.div
                                    className={`w-2 h-2 rounded-full ${project.status === 'deployed' ? 'bg-green-500' :
                                        project.status === 'ready' ? 'bg-blue-500' :
                                            'bg-yellow-500'
                                        }`}
                                    animate={project.status === 'generating' ? { scale: [1, 1.5, 1] } : {}}
                                    transition={project.status === 'generating' ? { duration: 1, repeat: Infinity } : {}}
                                />
                            </div>
                            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* User Profile */}
            <motion.div
                className="p-4 border-t border-gray-800/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
            >
                <div className="flex items-center space-x-3 mb-4">
                    <motion.div
                        className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center relative overflow-hidden"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                        <User className="h-5 w-5 text-white relative z-10" />
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>
                    <div className="flex-1">
                        <p className="text-sm font-medium text-white">User</p>
                        <p className="text-xs text-gray-400">Pro Member</p>
                    </div>
                </div>

                {/* Credits Display */}
                <motion.div
                    className="mb-4"
                    whileHover={{ scale: 1.02 }}
                >
                    <CreditDisplay credits={12} showPurchaseButton={false} />
                </motion.div>

                <div className="space-y-2">
                    <motion.button
                        whileHover={{ x: 5, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-300 group"
                    >
                        <Settings className="h-4 w-4 group-hover:rotate-90 transition-transform duration-300" />
                        Settings
                    </motion.button>
                    <motion.button
                        whileHover={{ x: 5, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-300 group"
                    >
                        <LogOut className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
                        Sign out
                    </motion.button>
                </div>
            </motion.div>

            {/* Animated Border */}
            <motion.div
                className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-blue-500/50 to-transparent"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
            />
        </motion.aside>
    )
} 