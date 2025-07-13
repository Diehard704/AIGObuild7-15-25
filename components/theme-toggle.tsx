'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Palette, Settings, Check } from 'lucide-react'
import { useTheme } from 'next-themes'

interface CustomTheme {
    name: string
    primary: string
    secondary: string
    accent: string
    background: string
}

const customThemes: CustomTheme[] = [
    {
        name: 'Ocean',
        primary: '#3B82F6',
        secondary: '#1E40AF',
        accent: '#06B6D4',
        background: '#0F172A'
    },
    {
        name: 'Forest',
        primary: '#10B981',
        secondary: '#059669',
        accent: '#84CC16',
        background: '#064E3B'
    },
    {
        name: 'Sunset',
        primary: '#F59E0B',
        secondary: '#D97706',
        accent: '#EF4444',
        background: '#451A03'
    },
    {
        name: 'Purple',
        primary: '#8B5CF6',
        secondary: '#7C3AED',
        accent: '#EC4899',
        background: '#2E1065'
    }
]

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const [showCustomThemes, setShowCustomThemes] = useState(false)
    const [selectedCustomTheme, setSelectedCustomTheme] = useState<CustomTheme | null>(null)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <div className="w-12 h-12 bg-gray-700 rounded-lg animate-pulse" />
        )
    }

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }

    const applyCustomTheme = (customTheme: CustomTheme) => {
        setSelectedCustomTheme(customTheme)
        // Apply custom CSS variables
        document.documentElement.style.setProperty('--primary', customTheme.primary)
        document.documentElement.style.setProperty('--secondary', customTheme.secondary)
        document.documentElement.style.setProperty('--accent', customTheme.accent)
        document.documentElement.style.setProperty('--background', customTheme.background)
    }

    return (
        <div className="relative">
            {/* Main Theme Toggle */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="relative w-12 h-12 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-600 flex items-center justify-center transition-colors"
            >
                <AnimatePresence mode="wait">
                    {theme === 'dark' ? (
                        <motion.div
                            key="moon"
                            initial={{ opacity: 0, rotate: -90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 90 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Moon className="w-5 h-5 text-yellow-400" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="sun"
                            initial={{ opacity: 0, rotate: 90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: -90 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Sun className="w-5 h-5 text-orange-400" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* Custom Theme Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowCustomThemes(!showCustomThemes)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors"
            >
                <Palette className="w-3 h-3 text-white" />
            </motion.button>

            {/* Custom Themes Panel */}
            <AnimatePresence>
                {showCustomThemes && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-16 right-0 w-64 bg-gray-900 border border-gray-700 rounded-xl shadow-xl z-50"
                    >
                        <div className="p-4 border-b border-gray-700">
                            <h3 className="text-sm font-medium text-white mb-2">Custom Themes</h3>
                            <p className="text-xs text-gray-400">Choose a custom color scheme</p>
                        </div>

                        <div className="p-4 space-y-3">
                            {customThemes.map((customTheme) => (
                                <motion.button
                                    key={customTheme.name}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => applyCustomTheme(customTheme)}
                                    className="w-full p-3 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-4 h-4 rounded-full"
                                            style={{ backgroundColor: customTheme.primary }}
                                        />
                                        <span className="text-sm text-white">{customTheme.name}</span>
                                    </div>

                                    {selectedCustomTheme?.name === customTheme.name && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center"
                                        >
                                            <Check className="w-2 h-2 text-white" />
                                        </motion.div>
                                    )}
                                </motion.button>
                            ))}
                        </div>

                        {/* Theme Builder */}
                        <div className="p-4 border-t border-gray-700">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full p-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                            >
                                <Settings className="w-4 h-4" />
                                Build Custom Theme
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Theme Transition Overlay */}
            <AnimatePresence>
                {theme === 'light' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-white pointer-events-none z-40"
                        style={{ mixBlendMode: 'difference' }}
                    />
                )}
            </AnimatePresence>
        </div>
    )
} 