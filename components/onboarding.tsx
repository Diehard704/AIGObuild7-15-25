'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, ArrowRight, Check, Play, Code, Rocket, Users } from 'lucide-react'

interface OnboardingStep {
    id: string
    title: string
    description: string
    icon: React.ReactNode
    action?: () => void
    completed?: boolean
}

interface UserProfile {
    experience: 'beginner' | 'intermediate' | 'advanced'
    interests: string[]
    goals: string[]
}

export function OnboardingFlow() {
    const [currentStep, setCurrentStep] = useState(0)
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
    const [showOnboarding, setShowOnboarding] = useState(true)
    const [isGeneratingSample, setIsGeneratingSample] = useState(false)

    const steps: OnboardingStep[] = [
        {
            id: 'welcome',
            title: 'Welcome to FragmentsPro!',
            description: 'Let\'s get you started with AI-powered app generation',
            icon: <Sparkles className="w-6 h-6" />
        },
        {
            id: 'experience',
            title: 'What\'s your experience level?',
            description: 'This helps us personalize your experience',
            icon: <Code className="w-6 h-6" />
        },
        {
            id: 'interests',
            title: 'What interests you most?',
            description: 'Select your preferred app types',
            icon: <Rocket className="w-6 h-6" />
        },
        {
            id: 'sample',
            title: 'Let\'s create your first app!',
            description: 'We\'ll generate a sample based on your preferences',
            icon: <Play className="w-6 h-6" />,
            action: generateSampleApp
        },
        {
            id: 'complete',
            title: 'You\'re all set!',
            description: 'Start building amazing applications',
            icon: <Check className="w-6 h-6" />
        }
    ]

    function generateSampleApp() {
        setIsGeneratingSample(true)
        // Simulate AI generation
        setTimeout(() => {
            setIsGeneratingSample(false)
            setCurrentStep(currentStep + 1)
        }, 3000)
    }

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1)
        } else {
            setShowOnboarding(false)
        }
    }

    const handleExperienceSelect = (experience: UserProfile['experience']) => {
        setUserProfile(prev => ({ ...prev, experience } as UserProfile))
        setCurrentStep(currentStep + 1)
    }

    const handleInterestSelect = (interest: string) => {
        setUserProfile(prev => ({
            ...prev,
            interests: [...(prev?.interests || []), interest]
        } as UserProfile))
    }

    if (!showOnboarding) {
        return null
    }

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gray-900 rounded-2xl border border-gray-700 max-w-2xl w-full p-8"
            >
                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-white">Getting Started</h2>
                        <span className="text-gray-400 text-sm">
                            {currentStep + 1} of {steps.length}
                        </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                        <motion.div
                            className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                </div>

                {/* Step Content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="min-h-64"
                    >
                        {currentStep === 0 && (
                            <div className="text-center">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6"
                                >
                                    <Sparkles className="w-8 h-8 text-white" />
                                </motion.div>
                                <h3 className="text-xl font-semibold text-white mb-4">
                                    Welcome to FragmentsPro!
                                </h3>
                                <p className="text-gray-400 mb-8">
                                    Build amazing applications with AI in minutes. Let's personalize your experience.
                                </p>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleNext}
                                    className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors flex items-center gap-2 mx-auto"
                                >
                                    Get Started
                                    <ArrowRight className="w-4 h-4" />
                                </motion.button>
                            </div>
                        )}

                        {currentStep === 1 && (
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-6">
                                    What's your experience level?
                                </h3>
                                <div className="space-y-4">
                                    {[
                                        { level: 'beginner' as const, title: 'Beginner', desc: 'New to coding, want to learn' },
                                        { level: 'intermediate' as const, title: 'Intermediate', desc: 'Some coding experience' },
                                        { level: 'advanced' as const, title: 'Advanced', desc: 'Experienced developer' }
                                    ].map((option) => (
                                        <motion.button
                                            key={option.level}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => handleExperienceSelect(option.level)}
                                            className="w-full p-4 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-600 hover:border-blue-500 transition-all text-left"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h4 className="text-white font-medium">{option.title}</h4>
                                                    <p className="text-gray-400 text-sm">{option.desc}</p>
                                                </div>
                                                <ArrowRight className="w-4 h-4 text-gray-400" />
                                            </div>
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {currentStep === 2 && (
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-6">
                                    What interests you most?
                                </h3>
                                <p className="text-gray-400 mb-6">Select all that apply</p>
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        'Web Apps', 'Mobile Apps', 'Data Visualization',
                                        'E-commerce', 'Social Media', 'Productivity Tools'
                                    ].map((interest) => (
                                        <motion.button
                                            key={interest}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => handleInterestSelect(interest)}
                                            className="p-4 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-600 hover:border-blue-500 transition-all text-center"
                                        >
                                            <span className="text-white font-medium">{interest}</span>
                                        </motion.button>
                                    ))}
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleNext}
                                    className="mt-6 px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
                                >
                                    Continue
                                </motion.button>
                            </div>
                        )}

                        {currentStep === 3 && (
                            <div className="text-center">
                                <h3 className="text-xl font-semibold text-white mb-6">
                                    Let's create your first app!
                                </h3>
                                <p className="text-gray-400 mb-8">
                                    Based on your preferences, we'll generate a sample application
                                </p>

                                {isGeneratingSample ? (
                                    <div className="space-y-4">
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                            className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"
                                        />
                                        <p className="text-blue-400">Generating your sample app...</p>
                                    </div>
                                ) : (
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={generateSampleApp}
                                        className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors flex items-center gap-2 mx-auto"
                                    >
                                        <Play className="w-4 h-4" />
                                        Generate Sample App
                                    </motion.button>
                                )}
                            </div>
                        )}

                        {currentStep === 4 && (
                            <div className="text-center">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6"
                                >
                                    <Check className="w-8 h-8 text-white" />
                                </motion.div>
                                <h3 className="text-xl font-semibold text-white mb-4">
                                    You're all set!
                                </h3>
                                <p className="text-gray-400 mb-8">
                                    Your sample app has been generated. Start building amazing applications!
                                </p>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleNext}
                                    className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
                                >
                                    Start Building
                                </motion.button>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </motion.div>
        </div>
    )
} 