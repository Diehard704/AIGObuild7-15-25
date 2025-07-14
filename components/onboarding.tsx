'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Sparkles, ArrowRight, ArrowLeft, CheckCircle, Clock, Target,
    BookOpen, Code, Palette, Database, Globe, Smartphone, Monitor,
    Tablet, Zap, Lightbulb, Users, Star, Trophy, Award, Play,
    Pause, SkipForward, SkipBack, Volume2, VolumeX, Settings,
    HelpCircle, MessageCircle, Heart, Share2, Download, Eye
} from 'lucide-react'
import { M3Button } from '@/components/ui/m3-button'
import { M3Card, M3CardContent, M3CardHeader, M3CardTitle } from '@/components/ui/m3-card'

interface OnboardingStep {
    id: string
    title: string
    description: string
    icon: any
    duration: number
    isCompleted: boolean
    isInteractive: boolean
    content: {
        type: 'text' | 'video' | 'interactive' | 'quiz'
        data: any
    }
    tips: string[]
    nextSteps: string[]
}

interface UserProgress {
    currentStep: number
    completedSteps: string[]
    totalTime: number
    preferences: {
        skillLevel: 'beginner' | 'intermediate' | 'advanced'
        interests: string[]
        learningStyle: 'visual' | 'hands-on' | 'theoretical'
        timeAvailable: '15min' | '30min' | '1hour' | '2hours'
    }
    achievements: string[]
    streak: number
}

export function Onboarding() {
    const [currentStepIndex, setCurrentStepIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [showTips, setShowTips] = useState(false)
    const [userProgress, setUserProgress] = useState<UserProgress>({
        currentStep: 0,
        completedSteps: [],
        totalTime: 0,
        preferences: {
            skillLevel: 'beginner',
            interests: ['web-development', 'ai', 'data-science'],
            learningStyle: 'hands-on',
            timeAvailable: '30min'
        },
        achievements: [],
        streak: 0
    })

    const [steps, setSteps] = useState<OnboardingStep[]>([
        {
            id: 'welcome',
            title: 'Welcome to FragmentsPro',
            description: 'Let\'s get you started with AI-powered app development',
            icon: Sparkles,
            duration: 2,
            isCompleted: false,
            isInteractive: false,
            content: {
                type: 'text',
                data: {
                    text: 'FragmentsPro is your AI-powered platform for building applications. We\'ll guide you through the basics and help you create your first app in minutes.',
                    highlights: ['AI-powered', 'Quick setup', 'No coding required']
                }
            },
            tips: [
                'Take your time exploring each feature',
                'Don\'t worry about making mistakes - you can always start over',
                'The AI will guide you through the process'
            ],
            nextSteps: ['Choose your project type', 'Set up your preferences', 'Start building']
        },
        {
            id: 'preferences',
            title: 'Set Your Preferences',
            description: 'Tell us about your experience and interests',
            icon: Settings,
            duration: 3,
            isCompleted: false,
            isInteractive: true,
            content: {
                type: 'interactive',
                data: {
                    questions: [
                        {
                            id: 'skill-level',
                            question: 'What\'s your experience level?',
                            options: [
                                { value: 'beginner', label: 'Beginner', description: 'New to programming' },
                                { value: 'intermediate', label: 'Intermediate', description: 'Some coding experience' },
                                { value: 'advanced', label: 'Advanced', description: 'Experienced developer' }
                            ]
                        },
                        {
                            id: 'interests',
                            question: 'What interests you most?',
                            options: [
                                { value: 'web-development', label: 'Web Development', icon: Globe },
                                { value: 'ai', label: 'AI & Machine Learning', icon: Sparkles },
                                { value: 'data-science', label: 'Data Science', icon: Database },
                                { value: 'mobile', label: 'Mobile Apps', icon: Smartphone },
                                { value: 'desktop', label: 'Desktop Apps', icon: Monitor }
                            ]
                        },
                        {
                            id: 'learning-style',
                            question: 'How do you prefer to learn?',
                            options: [
                                { value: 'visual', label: 'Visual', description: 'Videos and diagrams' },
                                { value: 'hands-on', label: 'Hands-on', description: 'Practice and experimentation' },
                                { value: 'theoretical', label: 'Theoretical', description: 'Reading and concepts' }
                            ]
                        }
                    ]
                }
            },
            tips: [
                'Be honest about your skill level - it helps us provide better guidance',
                'You can change these preferences later in settings',
                'Your preferences help personalize the AI suggestions'
            ],
            nextSteps: ['Explore the interface', 'Learn about AI features', 'Start your first project']
        },
        {
            id: 'interface-tour',
            title: 'Interface Tour',
            description: 'Learn about the key features and tools',
            icon: Eye,
            duration: 5,
            isCompleted: false,
            isInteractive: true,
            content: {
                type: 'interactive',
                data: {
                    tour: [
                        {
                            target: 'chat-input',
                            title: 'AI Chat Interface',
                            description: 'Describe your app idea in natural language',
                            position: 'bottom'
                        },
                        {
                            target: 'code-editor',
                            title: 'Code Editor',
                            description: 'View and edit the generated code',
                            position: 'left'
                        },
                        {
                            target: 'preview',
                            title: 'Live Preview',
                            description: 'See your app in real-time',
                            position: 'right'
                        },
                        {
                            target: 'templates',
                            title: 'Template Library',
                            description: 'Browse pre-built templates and components',
                            position: 'top'
                        }
                    ]
                }
            },
            tips: [
                'The interface adapts to your preferences',
                'You can customize the layout in settings',
                'All features are accessible via keyboard shortcuts'
            ],
            nextSteps: ['Try the AI chat', 'Explore templates', 'Create your first app']
        },
        {
            id: 'ai-features',
            title: 'AI Features Overview',
            description: 'Discover how AI enhances your development workflow',
            icon: Sparkles,
            duration: 4,
            isCompleted: false,
            isInteractive: false,
            content: {
                type: 'video',
                data: {
                    videoUrl: '/videos/ai-features.mp4',
                    transcript: 'Learn about AI-powered code generation, intelligent suggestions, and automated testing...',
                    highlights: [
                        'Natural language to code',
                        'Intelligent code completion',
                        'Automated testing and debugging',
                        'Smart template recommendations'
                    ]
                }
            },
            tips: [
                'The AI learns from your preferences and past projects',
                'You can always override AI suggestions',
                'The more you use it, the better it gets'
            ],
            nextSteps: ['Practice with AI chat', 'Try code generation', 'Build your first app']
        },
        {
            id: 'first-project',
            title: 'Create Your First Project',
            description: 'Let\'s build something amazing together',
            icon: Code,
            duration: 8,
            isCompleted: false,
            isInteractive: true,
            content: {
                type: 'interactive',
                data: {
                    projectTypes: [
                        {
                            id: 'todo-app',
                            name: 'Todo App',
                            description: 'A simple task management app',
                            difficulty: 'beginner',
                            estimatedTime: '15 minutes',
                            features: ['Add tasks', 'Mark complete', 'Delete tasks', 'Local storage']
                        },
                        {
                            id: 'weather-app',
                            name: 'Weather App',
                            description: 'Display weather information for any city',
                            difficulty: 'intermediate',
                            estimatedTime: '25 minutes',
                            features: ['API integration', 'Search cities', 'Weather display', 'Responsive design']
                        },
                        {
                            id: 'chat-app',
                            name: 'Chat App',
                            description: 'Real-time messaging application',
                            difficulty: 'advanced',
                            estimatedTime: '45 minutes',
                            features: ['Real-time messaging', 'User authentication', 'Message history', 'File sharing']
                        }
                    ]
                }
            },
            tips: [
                'Start with a simple project to get familiar with the platform',
                'Don\'t worry about perfection - focus on learning',
                'You can always modify and improve your app later'
            ],
            nextSteps: ['Deploy your app', 'Share with others', 'Explore advanced features']
        }
    ])

    const currentStep = steps[currentStepIndex]

    const handleNext = () => {
        if (currentStepIndex < steps.length - 1) {
            setCurrentStepIndex(prev => prev + 1)
            setUserProgress(prev => ({
                ...prev,
                currentStep: prev.currentStep + 1,
                completedSteps: [...prev.completedSteps, currentStep.id]
            }))
        }
    }

    const handlePrevious = () => {
        if (currentStepIndex > 0) {
            setCurrentStepIndex(prev => prev - 1)
            setUserProgress(prev => ({
                ...prev,
                currentStep: prev.currentStep - 1
            }))
        }
    }

    const handleStepComplete = (stepId: string) => {
        setSteps(prev => prev.map(step =>
            step.id === stepId ? { ...step, isCompleted: true } : step
        ))
        setUserProgress(prev => ({
            ...prev,
            completedSteps: [...prev.completedSteps, stepId]
        }))
    }

    const handlePreferenceChange = (questionId: string, value: string) => {
        setUserProgress(prev => ({
            ...prev,
            preferences: {
                ...prev.preferences,
                [questionId]: value
            }
        }))
    }

    const getProgressPercentage = () => {
        return (userProgress.completedSteps.length / steps.length) * 100
    }

    const getTimeEstimate = () => {
        const remainingSteps = steps.slice(currentStepIndex)
        const totalMinutes = remainingSteps.reduce((acc, step) => acc + step.duration, 0)
        return Math.ceil(totalMinutes / 60)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-surface to-surface-container">
            {/* Header */}
            <div className="p-6 border-b border-outline">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                            FP
                        </div>
                        <div>
                            <h1 className="m3-headline-medium font-bold text-foreground">Welcome to FragmentsPro</h1>
                            <p className="m3-body-medium text-muted-foreground">Let's get you started</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">~{getTimeEstimate()} min remaining</span>
                        </div>
                        <M3Button
                            variant="outlined"
                            size="sm"
                            onClick={() => setShowTips(!showTips)}
                        >
                            <HelpCircle className="w-4 h-4 mr-2" />
                            Tips
                        </M3Button>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                        <span>Progress</span>
                        <span>{Math.round(getProgressPercentage())}%</span>
                    </div>
                    <div className="w-full bg-surface-container rounded-full h-2">
                        <motion.div
                            className="h-2 bg-gradient-to-r from-primary to-secondary rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${getProgressPercentage()}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="p-6">
                <div className="max-w-4xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            {/* Step Header */}
                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                                    <currentStep.icon className="w-8 h-8 text-white" />
                                </div>
                                <h2 className="m3-headline-large font-bold text-foreground mb-2">{currentStep.title}</h2>
                                <p className="m3-body-large text-muted-foreground">{currentStep.description}</p>
                            </div>

                            {/* Step Content */}
                            <M3Card variant="elevated" className="min-h-96">
                                <M3CardContent className="p-8">
                                    {currentStep.content.type === 'text' && (
                                        <div className="space-y-6">
                                            <div className="prose prose-invert max-w-none">
                                                <p className="m3-body-large text-foreground leading-relaxed">
                                                    {currentStep.content.data.text}
                                                </p>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                {currentStep.content.data.highlights.map((highlight: string, index: number) => (
                                                    <motion.div
                                                        key={highlight}
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: index * 0.1 }}
                                                        className="p-4 bg-surface-container rounded-lg border border-outline"
                                                    >
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <Sparkles className="w-4 h-4 text-primary" />
                                                            <span className="m3-title-small font-semibold text-foreground">{highlight}</span>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {currentStep.content.type === 'interactive' && currentStep.id === 'preferences' && (
                                        <div className="space-y-6">
                                            {currentStep.content.data.questions.map((question: any, qIndex: number) => (
                                                <div key={question.id} className="space-y-4">
                                                    <h3 className="m3-title-large font-semibold text-foreground">{question.question}</h3>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        {question.options.map((option: any) => (
                                                            <button
                                                                key={option.value}
                                                                onClick={() => handlePreferenceChange(question.id, option.value)}
                                                                className={`p-4 rounded-lg border transition-all duration-200 text-left ${userProgress.preferences[question.id as keyof typeof userProgress.preferences] === option.value
                                                                        ? 'border-primary bg-primary/10 text-primary'
                                                                        : 'border-outline bg-surface-container hover:border-primary/50'
                                                                    }`}
                                                            >
                                                                <div className="flex items-center gap-3">
                                                                    {option.icon && <option.icon className="w-5 h-5" />}
                                                                    <div>
                                                                        <div className="m3-title-medium font-semibold text-foreground">{option.label}</div>
                                                                        {option.description && (
                                                                            <div className="m3-body-small text-muted-foreground">{option.description}</div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {currentStep.content.type === 'interactive' && currentStep.id === 'first-project' && (
                                        <div className="space-y-6">
                                            <h3 className="m3-title-large font-semibold text-foreground text-center mb-6">Choose Your First Project</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                {currentStep.content.data.projectTypes.map((project: any, index: number) => (
                                                    <motion.div
                                                        key={project.id}
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: index * 0.1 }}
                                                    >
                                                        <M3Card variant="elevated" className="h-full cursor-pointer hover:shadow-lg transition-shadow">
                                                            <M3CardContent className="p-6">
                                                                <div className="text-center mb-4">
                                                                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                                                                        <Code className="w-6 h-6 text-white" />
                                                                    </div>
                                                                    <h4 className="m3-title-medium font-semibold text-foreground">{project.name}</h4>
                                                                    <p className="m3-body-small text-muted-foreground mt-1">{project.description}</p>
                                                                </div>

                                                                <div className="space-y-3">
                                                                    <div className="flex items-center justify-between text-sm">
                                                                        <span className="text-muted-foreground">Difficulty:</span>
                                                                        <span className={`px-2 py-1 rounded text-xs font-medium ${project.difficulty === 'beginner' ? 'text-success bg-success/20' :
                                                                                project.difficulty === 'intermediate' ? 'text-warning bg-warning/20' :
                                                                                    'text-error bg-error/20'
                                                                            }`}>
                                                                            {project.difficulty}
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex items-center justify-between text-sm">
                                                                        <span className="text-muted-foreground">Time:</span>
                                                                        <span className="text-foreground">{project.estimatedTime}</span>
                                                                    </div>
                                                                </div>

                                                                <div className="mt-4">
                                                                    <h5 className="m3-body-medium font-medium text-foreground mb-2">Features:</h5>
                                                                    <div className="space-y-1">
                                                                        {project.features.map((feature: string) => (
                                                                            <div key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                                                                                <CheckCircle className="w-3 h-3 text-success" />
                                                                                {feature}
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>

                                                                <M3Button
                                                                    variant="filled"
                                                                    size="sm"
                                                                    className="w-full mt-4"
                                                                    onClick={() => handleStepComplete(currentStep.id)}
                                                                >
                                                                    <Play className="w-4 h-4 mr-2" />
                                                                    Start Project
                                                                </M3Button>
                                                            </M3CardContent>
                                                        </M3Card>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </M3CardContent>
                            </M3Card>

                            {/* Tips Panel */}
                            {showTips && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-surface-container rounded-lg p-6 border border-outline"
                                >
                                    <div className="flex items-center gap-2 mb-4">
                                        <Lightbulb className="w-5 h-5 text-warning" />
                                        <h3 className="m3-title-medium font-semibold text-foreground">Pro Tips</h3>
                                    </div>
                                    <div className="space-y-3">
                                        {currentStep.tips.map((tip, index) => (
                                            <div key={index} className="flex items-start gap-3">
                                                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                                                <p className="m3-body-medium text-muted-foreground">{tip}</p>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Navigation */}
                            <div className="flex items-center justify-between">
                                <M3Button
                                    variant="outlined"
                                    size="lg"
                                    onClick={handlePrevious}
                                    disabled={currentStepIndex === 0}
                                    className="flex items-center gap-2"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Previous
                                </M3Button>

                                <div className="flex items-center gap-4">
                                    <span className="text-sm text-muted-foreground">
                                        Step {currentStepIndex + 1} of {steps.length}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        {steps.map((step, index) => (
                                            <div
                                                key={step.id}
                                                className={`w-2 h-2 rounded-full transition-colors ${index === currentStepIndex
                                                        ? 'bg-primary'
                                                        : step.isCompleted
                                                            ? 'bg-success'
                                                            : 'bg-muted'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <M3Button
                                    variant="filled"
                                    size="lg"
                                    onClick={handleNext}
                                    disabled={currentStepIndex === steps.length - 1}
                                    className="flex items-center gap-2"
                                >
                                    {currentStepIndex === steps.length - 1 ? 'Finish' : 'Next'}
                                    <ArrowRight className="w-4 h-4" />
                                </M3Button>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
} 