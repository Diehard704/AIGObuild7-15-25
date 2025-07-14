'use client'

import { motion } from 'framer-motion'
import {
    Home,
    BarChart3,
    FolderOpen,
    LayoutTemplate,
    Users,
    Settings,
    HelpCircle,
    Zap,
    Rocket,
    Sparkles,
    Code
} from 'lucide-react'
import { usePathname } from 'next/navigation'

const navigationItems = [
    {
        name: 'Build',
        href: '/build',
        icon: Rocket,
        description: 'Create new applications'
    },
    {
        name: 'Dashboard',
        href: '/dashboard',
        icon: BarChart3,
        description: 'View analytics and stats'
    },
    {
        name: 'Projects',
        href: '/projects',
        icon: FolderOpen,
        description: 'Manage your projects'
    },
    {
        name: 'Templates',
        href: '/templates',
        icon: LayoutTemplate,
        description: 'Browse templates'
    },
    {
        name: 'Community',
        href: '/community',
        icon: Users,
        description: 'Connect with developers'
    },
    {
        name: 'Code Editor',
        href: '/code-editor-demo',
        icon: Code,
        description: 'Enhanced editor demo'
    },
    {
        name: 'AI Refactor',
        href: '/refactor-working',
        icon: Zap,
        description: 'AI-powered code refactoring'
    }
]

const bottomItems = [
    {
        name: 'Settings',
        href: '/settings',
        icon: Settings,
        description: 'Configure your account'
    },
    {
        name: 'Help',
        href: '/help',
        icon: HelpCircle,
        description: 'Get support'
    }
]

export function Sidebar() {
    const pathname = usePathname()

    return (
        <motion.aside
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="fixed left-0 top-0 h-full w-64 bg-surface-container border-r border-border/50 z-40"
        >
            <div className="flex flex-col h-full">
                {/* Header */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="p-6 border-b border-border/50"
                >
                    <div className="flex items-center space-x-3">
                        <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center"
                        >
                            <Sparkles className="w-6 h-6 text-primary-foreground" />
                        </motion.div>
                        <div>
                            <h1 className="m3-title-large font-bold text-foreground">FragmentsPro</h1>
                            <p className="m3-body-small text-muted-foreground">AI-Powered Development</p>
                        </div>
                    </div>
                </motion.div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-6">
                    <div className="space-y-2">
                        {navigationItems.map((item, index) => {
                            const isActive = pathname === item.href
                            const Icon = item.icon

                            return (
                                <motion.a
                                    key={item.name}
                                    href={item.href}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                                    whileHover={{ x: 4, scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`m3-ripple group relative flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                                        ? 'bg-primary text-primary-foreground shadow-lg'
                                        : 'text-foreground hover:bg-surface-container-high hover:text-primary'
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <div className="flex-1">
                                        <span className="m3-title-medium font-medium">{item.name}</span>
                                        <p className="m3-body-small text-muted-foreground group-hover:text-primary-foreground">
                                            {item.description}
                                        </p>
                                    </div>
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeIndicator"
                                            className="absolute right-2 w-2 h-2 bg-primary-foreground rounded-full"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                        />
                                    )}
                                </motion.a>
                            )
                        })}
                    </div>

                    {/* Credits Section */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                        className="mt-8 p-4 bg-surface-container-high rounded-xl border border-border/50"
                    >
                        <div className="flex items-center space-x-3 mb-3">
                            <Zap className="w-5 h-5 text-primary" />
                            <span className="m3-title-medium font-medium text-foreground">Credits</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="m3-body-medium text-muted-foreground">Available</span>
                            <span className="m3-title-large font-bold text-primary">12</span>
                        </div>
                        <div className="mt-2 w-full bg-surface-container rounded-full h-2">
                            <motion.div
                                className="bg-primary h-2 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: '60%' }}
                                transition={{ delay: 1, duration: 1 }}
                            />
                        </div>
                    </motion.div>
                </nav>

                {/* Bottom Section */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                    className="p-4 border-t border-border/50"
                >
                    <div className="space-y-2">
                        {bottomItems.map((item, index) => {
                            const Icon = item.icon

                            return (
                                <motion.a
                                    key={item.name}
                                    href={item.href}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                                    whileHover={{ x: 4, scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="m3-ripple group flex items-center space-x-3 px-4 py-3 rounded-xl text-foreground hover:bg-surface-container-high hover:text-primary transition-all duration-200"
                                >
                                    <Icon className="w-5 h-5" />
                                    <div className="flex-1">
                                        <span className="m3-title-medium font-medium">{item.name}</span>
                                        <p className="m3-body-small text-muted-foreground group-hover:text-primary">
                                            {item.description}
                                        </p>
                                    </div>
                                </motion.a>
                            )
                        })}
                    </div>
                </motion.div>
            </div>

            {/* Animated Background Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    className="absolute top-20 left-20 w-1 h-1 bg-primary/20 rounded-full"
                    animate={{ y: [0, -20, 0], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute top-40 right-32 w-1.5 h-1.5 bg-secondary/20 rounded-full"
                    animate={{ y: [0, -15, 0], opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
                <motion.div
                    className="absolute bottom-32 left-1/4 w-1 h-1 bg-tertiary/20 rounded-full"
                    animate={{ y: [0, -25, 0], opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                />
            </div>
        </motion.aside>
    )
} 