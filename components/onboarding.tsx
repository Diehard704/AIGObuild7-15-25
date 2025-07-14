'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, ArrowRight, Check, Play, Code, Rocket, Users } from 'lucide-react'
import { M3Button } from '@/components/ui/m3-button'
import { M3Card, M3CardContent, M3CardHeader, M3CardTitle } from '@/components/ui/m3-card'

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
        <div className="fixed inset-0 bg-surface/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <M3Card
                variant="elevated"
                className="max-w-2xl w-full"
            >
                <M3CardContent className="p-8">
                    {/* Progress Bar */}
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="m3-headline-medium font-bold text-foreground">Getting Started</h2>
                            <span className="m3-body-small text-muted-foreground">
                                {currentStep + 1} of {steps.length}
                            </span>
                        </div>
                        <div className="w-full bg-surface-container rounded-full h-2">
                            <motion.div
                                className="h-2 bg-gradient-to-r from-primary to-secondary rounded-full"
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
                                        className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6"
                                    >
                                        <Sparkles className="w-8 h-8 text-primary-foreground" />
                                    </motion.div>
                                    <h3 className="m3-headline-small font-semibold text-foreground mb-4">
                                        Welcome to FragmentsPro!
                                    </h3>
                                    <p className="m3-body-medium text-muted-foreground mb-8">
                                        Build amazing applications with AI in minutes. Let's personalize your experience.
                                    </p>
                                    <M3Button
                                        variant="filled"
                                        size="lg"
                                        onClick={handleNext}
                                        className="mx-auto"
                                    >
                                        Get Started
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </M3Button>
                                </div>
                            )}

                            {currentStep === 1 && (
                                <div>
                                    <h3 className="m3-headline-small font-semibold text-foreground mb-6">
                                        What's your experience level?
                                    </h3>
                                    <div className="space-y-4">
                                        {[
                                            { level: 'beginner' as const, title: 'Beginner', desc: 'New to coding, want to learn' },
                                            { level: 'intermediate' as const, title: 'Intermediate', desc: 'Some coding experience' },
                                            { level: 'advanced' as const, title: 'Advanced', desc: 'Experienced developer' }
                                        ].map((option) => (
                                            <M3Button
                                                key={option.level}
                                                variant="tonal"
                                                onClick={() => handleExperienceSelect(option.level)}
                                                className="w-full p-4 justify-between text-left"
                                            >
                                                <div>
                                                    <h4 className="m3-title-medium font-medium text-foreground">{option.title}</h4>
                                                    <p className="m3-body-small text-muted-foreground">{option.desc}</p>
                                                </div>
                                                <ArrowRight className="w-4 h-4 text-muted-foreground" />
                                            </M3Button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {currentStep === 2 && (
                                <div>
                                    <h3 className="m3-headline-small font-semibold text-foreground mb-6">
                                        What interests you most?
                                    </h3>
                                    <p className="m3-body-medium text-muted-foreground mb-6">Select all that apply</p>
                                    <div className="grid grid-cols-2 gap-4">
                                        {[
                                            'Web Apps', 'Mobile Apps', 'Data Visualization',
                                            'E-commerce', 'Social Media', 'Productivity Tools'
                                        ].map((interest) => (
                                            <M3Button
                                                key={interest}
                                                variant="tonal"
                                                onClick={() => handleInterestSelect(interest)}
                                                className="p-4 text-center"
                                            >
                                                <span className="m3-body-medium text-foreground">{interest}</span>
                                            </M3Button>
                                        ))}
                                    </div>
                                    <div className="mt-6">
                                        <M3Button
                                            variant="filled"
                                            onClick={handleNext}
                                            className="w-full"
                                        >
                                            Continue
                                            <ArrowRight className="w-4 h-4 ml-2" />
                                        </M3Button>
                                    </div>
                                </div>
                            )}

                            {currentStep === 3 && (
                                <div className="text-center">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6"
                                    >
                                        <Play className="w-8 h-8 text-primary-foreground" />
                                    </motion.div>
                                    <h3 className="m3-headline-small font-semibold text-foreground mb-4">
                                        Let's create your first app!
                                    </h3>
                                    <p className="m3-body-medium text-muted-foreground mb-8">
                                        We'll generate a sample based on your preferences
                                    </p>
                                    {isGeneratingSample ? (
                                        <div className="flex items-center justify-center gap-3">
                                            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                                            <span className="m3-body-medium text-foreground">Generating your app...</span>
                                        </div>
                                    ) : (
                                        <M3Button
                                            variant="filled"
                                            size="lg"
                                            onClick={generateSampleApp}
                                            className="mx-auto"
                                        >
                                            Generate Sample App
                                            <Sparkles className="w-4 h-4 ml-2" />
                                        </M3Button>
                                    )}
                                </div>
                            )}

                            {currentStep === 4 && (
                                <div className="text-center">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-6"
                                    >
                                        <Check className="w-8 h-8 text-success-foreground" />
                                    </motion.div>
                                    <h3 className="m3-headline-small font-semibold text-foreground mb-4">
                                        You're all set!
                                    </h3>
                                    <p className="m3-body-medium text-muted-foreground mb-8">
                                        Start building amazing applications
                                    </p>
                                    <M3Button
                                        variant="filled"
                                        size="lg"
                                        onClick={handleNext}
                                        className="mx-auto"
                                    >
                                        Start Building
                                        <Rocket className="w-4 h-4 ml-2" />
                                    </M3Button>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </M3CardContent>
            </M3Card>
        </div>
    )
} 