'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, Loader2, Sparkles, Heart, Star } from 'lucide-react'

// Loading Button with Skeleton
export function LoadingButton({
    children,
    loading = false,
    success = false,
    error = false,
    onClick
}: {
    children: React.ReactNode
    loading?: boolean
    success?: boolean
    error?: boolean
    onClick?: () => void
}) {
    const [isPressed, setIsPressed] = useState(false)

    return (
        <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onPointerDown={() => setIsPressed(true)}
            onPointerUp={() => setIsPressed(false)}
            onClick={onClick}
            disabled={loading}
            className={`relative px-6 py-3 rounded-lg font-medium transition-all duration-300 overflow-hidden ${loading
                ? 'bg-gray-600 cursor-not-allowed'
                : success
                    ? 'bg-green-600 hover:bg-green-700'
                    : error
                        ? 'bg-red-600 hover:bg-red-700'
                        : 'bg-blue-600 hover:bg-blue-700'
                }`}
        >
            <AnimatePresence mode="wait">
                {loading ? (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                    >
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Loading...</span>
                    </motion.div>
                ) : success ? (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center gap-2"
                    >
                        <Check className="w-4 h-4" />
                        <span>Success!</span>
                    </motion.div>
                ) : error ? (
                    <motion.div
                        key="error"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center gap-2"
                    >
                        <X className="w-4 h-4" />
                        <span>Error</span>
                    </motion.div>
                ) : (
                    <motion.div
                        key="default"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Ripple Effect */}
            {isPressed && (
                <motion.div
                    initial={{ scale: 0, opacity: 0.5 }}
                    animate={{ scale: 4, opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 bg-white/20 rounded-full pointer-events-none"
                />
            )}
        </motion.button>
    )
}

// Interactive Card with Hover Effects
export function InteractiveCard({
    children,
    title,
    description,
    icon,
    onClick
}: {
    children?: React.ReactNode
    title: string
    description: string
    icon: React.ReactNode
    onClick?: () => void
}) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onClick={onClick}
            className="relative p-6 bg-gray-900 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 cursor-pointer group"
        >
            {/* Background Glow */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 0.1 : 0 }}
                className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl"
            />

            {/* Icon */}
            <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: isHovered ? 1.1 : 1 }}
                className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-500 transition-colors"
            >
                {icon}
            </motion.div>

            {/* Content */}
            <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
            <p className="text-gray-400 text-sm">{description}</p>

            {/* Hover Indicator */}
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: isHovered ? '100%' : 0 }}
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-b-xl"
            />

            {children}
        </motion.div>
    )
}

// Success Animation with Confetti
export function SuccessAnimation({ show, onComplete }: { show: boolean; onComplete?: () => void }) {
    const confettiColors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
                >
                    {/* Confetti */}
                    {Array.from({ length: 50 }).map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{
                                x: Math.random() * window.innerWidth,
                                y: -10,
                                opacity: 1,
                                rotate: 0
                            }}
                            animate={{
                                y: window.innerHeight + 10,
                                opacity: 0,
                                rotate: 360
                            }}
                            transition={{
                                duration: 3 + Math.random() * 2,
                                delay: Math.random() * 0.5
                            }}
                            className="absolute w-2 h-2 rounded-full"
                            style={{
                                backgroundColor: confettiColors[Math.floor(Math.random() * confettiColors.length)]
                            }}
                        />
                    ))}

                    {/* Success Icon */}
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 180 }}
                        transition={{ type: "spring", stiffness: 200, damping: 10 }}
                        className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-2xl"
                        onAnimationComplete={onComplete}
                    >
                        <Check className="w-12 h-12 text-white" />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

// Floating Action Button
export function FloatingActionButton({
    icon,
    onClick,
    label
}: {
    icon: React.ReactNode
    onClick: () => void
    label: string
}) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <motion.button
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onClick={onClick}
            className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg flex items-center justify-center transition-colors z-40"
        >
            <motion.div
                animate={{ rotate: isHovered ? 180 : 0 }}
                transition={{ duration: 0.3 }}
            >
                {icon}
            </motion.div>

            {/* Tooltip */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="absolute right-16 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap"
                    >
                        {label}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
    )
}

// Progress Bar with Animation
export function AnimatedProgressBar({
    progress,
    total,
    label
}: {
    progress: number
    total: number
    label: string
}) {
    const percentage = (progress / total) * 100

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">{label}</span>
                <span className="text-sm text-white">{progress}/{total}</span>
            </div>

            <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full relative"
                >
                    {/* Shimmer Effect */}
                    <motion.div
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    />
                </motion.div>
            </div>
        </div>
    )
}

// Like Button with Heart Animation
export function LikeButton({
    liked,
    count,
    onToggle
}: {
    liked: boolean
    count: number
    onToggle: () => void
}) {
    const [isAnimating, setIsAnimating] = useState(false)

    const handleClick = () => {
        setIsAnimating(true)
        onToggle()
        setTimeout(() => setIsAnimating(false), 600)
    }

    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleClick}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
        >
            <motion.div
                animate={{
                    scale: isAnimating ? [1, 1.3, 1] : 1,
                    rotate: isAnimating ? [0, -10, 10, 0] : 0
                }}
                transition={{ duration: 0.6 }}
            >
                <Heart
                    className={`w-5 h-5 ${liked ? 'text-red-500 fill-current' : 'text-gray-400'}`}
                />
            </motion.div>

            <span className="text-white">{count}</span>

            {/* Particle Effect */}
            {isAnimating && (
                <motion.div
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 pointer-events-none"
                >
                    <Sparkles className="w-4 h-4 text-red-500" />
                </motion.div>
            )}
        </motion.button>
    )
} 