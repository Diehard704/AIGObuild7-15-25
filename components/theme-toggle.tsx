'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Palette, Settings, Check } from 'lucide-react'
import { useTheme } from 'next-themes'
import { M3Button } from '@/components/ui/m3-button'
import { M3Card, M3CardContent, M3CardHeader, M3CardTitle } from '@/components/ui/m3-card'

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
            <div className="w-12 h-12 bg-surface-container rounded-xl animate-pulse" />
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
            <M3Button
                variant="tonal"
                size="icon"
                onClick={toggleTheme}
                className="relative w-12 h-12"
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
                            <Moon className="w-5 h-5 text-warning" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="sun"
                            initial={{ opacity: 0, rotate: 90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: -90 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Sun className="w-5 h-5 text-warning" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </M3Button>

            {/* Custom Theme Button */}
            <M3Button
                variant="filled"
                size="icon"
                onClick={() => setShowCustomThemes(!showCustomThemes)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-primary hover:bg-primary/90 rounded-full"
            >
                <Palette className="w-3 h-3 text-primary-foreground" />
            </M3Button>

            {/* Custom Themes Panel */}
            <AnimatePresence>
                {showCustomThemes && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-16 right-0 w-64 z-50"
                    >
                        <M3Card variant="elevated" className="w-full">
                            <M3CardHeader className="pb-4">
                                <M3CardTitle className="m3-title-medium font-medium text-foreground mb-2">
                                    Custom Themes
                                </M3CardTitle>
                                <p className="m3-body-small text-muted-foreground">
                                    Choose a custom color scheme
                                </p>
                            </M3CardHeader>

                            <M3CardContent className="space-y-3">
                                {customThemes.map((customTheme) => (
                                    <M3Button
                                        key={customTheme.name}
                                        variant="tonal"
                                        onClick={() => applyCustomTheme(customTheme)}
                                        className="w-full p-3 justify-between"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-4 h-4 rounded-full"
                                                style={{ backgroundColor: customTheme.primary }}
                                            />
                                            <span className="m3-body-medium text-foreground">
                                                {customTheme.name}
                                            </span>
                                        </div>

                                        {selectedCustomTheme?.name === customTheme.name && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="w-4 h-4 bg-success rounded-full flex items-center justify-center"
                                            >
                                                <Check className="w-2 h-2 text-success-foreground" />
                                            </motion.div>
                                        )}
                                    </M3Button>
                                ))}
                            </M3CardContent>

                            {/* Theme Builder */}
                            <M3CardContent className="pt-0">
                                <M3Button
                                    variant="filled"
                                    className="w-full"
                                >
                                    <Settings className="w-4 h-4 mr-2" />
                                    Build Custom Theme
                                </M3Button>
                            </M3CardContent>
                        </M3Card>
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
                        className="fixed inset-0 bg-surface pointer-events-none z-40"
                        style={{ mixBlendMode: 'difference' }}
                    />
                )}
            </AnimatePresence>
        </div>
    )
} 