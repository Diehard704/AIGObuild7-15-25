'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Coins, Plus, Zap } from 'lucide-react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'

interface CreditDisplayProps {
    credits: number
    totalCredits?: number
    compact?: boolean
    showPurchaseButton?: boolean
}

export function CreditDisplay({
    credits,
    totalCredits = 15,
    compact = false,
    showPurchaseButton = true
}: CreditDisplayProps) {
    const [isHovered, setIsHovered] = useState(false)
    const percentage = (credits / totalCredits) * 100

    const handlePurchase = () => {
        window.location.href = '/pricing'
    }

    if (compact) {
        return (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            className="flex items-center gap-2 px-3 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                        >
                            <Coins className="w-4 h-4 text-yellow-400" />
                            <span className="text-sm font-medium text-white">{credits}</span>
                            {showPurchaseButton && credits < 3 && (
                                <Plus className="w-3 h-3 text-red-400" />
                            )}
                        </motion.button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <div className="text-center">
                            <p className="font-medium">{credits} credits remaining</p>
                            <p className="text-xs text-gray-400">Each generation uses 1 credit</p>
                            {showPurchaseButton && (
                                <button
                                    onClick={handlePurchase}
                                    className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 transition-colors"
                                >
                                    Buy More
                                </button>
                            )}
                        </div>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        )
    }

    return (
        <div className="bg-gray-900 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <Coins className="w-5 h-5 text-yellow-400" />
                    <span className="text-white font-semibold">Credits</span>
                </div>
                {showPurchaseButton && (
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handlePurchase}
                        className="flex items-center gap-1 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                        <Plus className="w-3 h-3" />
                        Buy
                    </motion.button>
                )}
            </div>

            <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                    <span className="text-2xl font-bold text-white">{credits}</span>
                    <span className="text-sm text-gray-400">of {totalCredits}</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                        className={`h-2 rounded-full transition-all duration-300 ${percentage > 50 ? 'bg-green-500' :
                                percentage > 25 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
            </div>

            {/* Credit Usage Info */}
            <div className="flex items-center gap-2 text-sm text-gray-400">
                <Zap className="w-4 h-4" />
                <span>1 credit per app generation</span>
            </div>

            {/* Low Credit Warning */}
            {credits < 3 && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 p-2 bg-red-500/10 border border-red-500/20 rounded-lg"
                >
                    <p className="text-red-400 text-sm font-medium">
                        ⚠️ Low credits remaining
                    </p>
                    <p className="text-red-300 text-xs">
                        Consider purchasing more credits to continue building
                    </p>
                </motion.div>
            )}
        </div>
    )
} 