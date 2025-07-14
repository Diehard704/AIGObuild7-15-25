'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { M3Button } from '@/components/ui/m3-button'
import { M3Card, M3CardContent, M3CardHeader, M3CardTitle } from '@/components/ui/m3-card'
import { TypewriterChat } from '@/components/typewriter-chat'
import {
    Sparkles,
    Rocket,
    Code,
    Globe,
    Zap,
    Star,
    ArrowRight,
    Play,
    Settings,
    BookOpen,
    Lightbulb,
    Target,
    Clock,
    Users,
    TrendingUp,
    Loader2,
    CheckCircle,
    AlertCircle
} from 'lucide-react'

export default function GeneratePage() {
    const searchParams = useSearchParams()
    const template = searchParams.get('template')
    const prompt = searchParams.get('prompt')

    const [isGenerating, setIsGenerating] = useState(false)
    const [generationStep, setGenerationStep] = useState<string>('')
    const [progress, setProgress] = useState(0)
    const [generatedApp, setGeneratedApp] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)

    const templates = {
        nextjs: {
            name: 'Next.js Developer',
            description: 'Full-stack React applications with modern tooling',
            icon: <Code className="w-6 h-6" />,
            color: 'from-primary to-secondary'
        },
        vue: {
            name: 'Vue.js Developer',
            description: 'Progressive JavaScript framework for building UIs',
            icon: <Globe className="w-6 h-6" />,
            color: 'from-secondary to-tertiary'
        },
        streamlit: {
            name: 'Streamlit Developer',
            description: 'Data science applications with visualizations',
            icon: <TrendingUp className="w-6 h-6" />,
            color: 'from-tertiary to-warning'
        },
        gradio: {
            name: 'Gradio Developer',
            description: 'Machine learning interfaces and model deployment',
            icon: <Zap className="w-6 h-6" />,
            color: 'from-warning to-error'
        }
    }

    const selectedTemplate = template ? templates[template as keyof typeof templates] : null

    const generationSteps = [
        'Analyzing requirements...',
        'Generating code structure...',
        'Creating components...',
        'Setting up styling...',
        'Configuring deployment...',
        'Finalizing application...'
    ]

    const handleGenerateApp = async (prompt: string) => {
        setIsGenerating(true)
        setError(null)
        setProgress(0)
        setGenerationStep('')

        try {
            // Simulate generation process
            for (let i = 0; i < generationSteps.length; i++) {
                setGenerationStep(generationSteps[i])
                setProgress(((i + 1) / generationSteps.length) * 100)
                await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))
            }

            // Simulate successful generation
            setGeneratedApp({
                id: 'app-' + Date.now(),
                name: 'Generated App',
                description: prompt,
                template: template || 'nextjs',
                status: 'ready',
                previewUrl: 'https://example.com/preview',
                deploymentUrl: 'https://example.com/deploy'
            })

        } catch (err) {
            setError('Failed to generate application. Please try again.')
        } finally {
            setIsGenerating(false)
        }
    }

    useEffect(() => {
        if (prompt) {
            handleGenerateApp(prompt)
        }
    }, [prompt])

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="border-b border-border/50 p-6"
            >
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between">
                        <div>
                            <motion.h1
                                className="m3-headline-large font-bold text-foreground mb-2"
                                whileHover={{ scale: 1.02 }}
                            >
                                Generate Your App
                            </motion.h1>
                            <p className="m3-body-large text-muted-foreground flex items-center gap-2">
                                <Sparkles className="w-4 h-4" />
                                Describe your idea and watch AI build it for you
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <M3Button
                                variant="outlined"
                                size="lg"
                                onClick={() => window.location.href = '/build'}
                            >
                                <ArrowRight className="w-4 h-4 mr-2" />
                                Back to Builder
                            </M3Button>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto p-6">

                {/* Template Info */}
                {selectedTemplate && (
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-8"
                    >
                        <M3Card variant="elevated" className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
                            <M3CardContent className="p-6">
                                <div className="flex items-center gap-4">
                                    <div className={`w-16 h-16 bg-gradient-to-r ${selectedTemplate.color} rounded-2xl flex items-center justify-center text-white`}>
                                        {selectedTemplate.icon}
                                    </div>
                                    <div>
                                        <h2 className="m3-headline-medium font-bold text-foreground mb-1">
                                            {selectedTemplate.name}
                                        </h2>
                                        <p className="m3-body-medium text-muted-foreground">
                                            {selectedTemplate.description}
                                        </p>
                                    </div>
                                </div>
                            </M3CardContent>
                        </M3Card>
                    </motion.section>
                )}

                {/* Generation Interface */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Chat Interface */}
                    <motion.section
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <M3Card variant="elevated" className="h-full">
                            <M3CardHeader>
                                <M3CardTitle className="flex items-center gap-2">
                                    <Lightbulb className="w-5 h-5 text-primary" />
                                    Describe Your App
                                </M3CardTitle>
                            </M3CardHeader>
                            <M3CardContent className="p-6">
                                <TypewriterChat onGenerate={handleGenerateApp} />
                            </M3CardContent>
                        </M3Card>
                    </motion.section>

                    {/* Generation Status */}
                    <motion.section
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <M3Card variant="elevated" className="h-full">
                            <M3CardHeader>
                                <M3CardTitle className="flex items-center gap-2">
                                    <Rocket className="w-5 h-5 text-primary" />
                                    Generation Status
                                </M3CardTitle>
                            </M3CardHeader>
                            <M3CardContent className="p-6">

                                {isGenerating && (
                                    <div className="space-y-6">
                                        {/* Progress Bar */}
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="m3-body-medium text-foreground">Generating...</span>
                                                <span className="m3-body-medium text-muted-foreground">{Math.round(progress)}%</span>
                                            </div>
                                            <div className="w-full bg-surface-container rounded-full h-2">
                                                <motion.div
                                                    className="bg-primary h-2 rounded-full"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${progress}%` }}
                                                    transition={{ duration: 0.5 }}
                                                />
                                            </div>
                                        </div>

                                        {/* Current Step */}
                                        <div className="flex items-center gap-3">
                                            <Loader2 className="w-5 h-5 text-primary animate-spin" />
                                            <span className="m3-body-medium text-foreground">{generationStep}</span>
                                        </div>

                                        {/* Generation Steps */}
                                        <div className="space-y-3">
                                            {generationSteps.map((step, index) => (
                                                <div key={step} className="flex items-center gap-3">
                                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${index < Math.floor(progress / (100 / generationSteps.length))
                                                            ? 'bg-success text-success-foreground'
                                                            : 'bg-surface-container text-muted-foreground'
                                                        }`}>
                                                        {index < Math.floor(progress / (100 / generationSteps.length)) ? (
                                                            <CheckCircle className="w-4 h-4" />
                                                        ) : (
                                                            <div className="w-2 h-2 rounded-full bg-current" />
                                                        )}
                                                    </div>
                                                    <span className={`m3-body-small ${index < Math.floor(progress / (100 / generationSteps.length))
                                                            ? 'text-foreground'
                                                            : 'text-muted-foreground'
                                                        }`}>
                                                        {step}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {error && (
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 text-error">
                                            <AlertCircle className="w-5 h-5" />
                                            <span className="m3-body-medium font-medium">Generation Failed</span>
                                        </div>
                                        <p className="m3-body-small text-muted-foreground">{error}</p>
                                        <M3Button
                                            variant="filled"
                                            size="sm"
                                            onClick={() => setError(null)}
                                        >
                                            Try Again
                                        </M3Button>
                                    </div>
                                )}

                                {generatedApp && !isGenerating && (
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-3 text-success">
                                            <CheckCircle className="w-5 h-5" />
                                            <span className="m3-body-medium font-medium">Generation Complete!</span>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <h3 className="m3-title-medium font-semibold text-foreground mb-2">
                                                    {generatedApp.name}
                                                </h3>
                                                <p className="m3-body-small text-muted-foreground">
                                                    {generatedApp.description}
                                                </p>
                                            </div>

                                            <div className="grid grid-cols-1 gap-3">
                                                <M3Button
                                                    variant="filled"
                                                    size="sm"
                                                    onClick={() => window.open(generatedApp.previewUrl, '_blank')}
                                                >
                                                    <Play className="w-4 h-4 mr-2" />
                                                    Preview App
                                                </M3Button>

                                                <M3Button
                                                    variant="outlined"
                                                    size="sm"
                                                    onClick={() => window.open(generatedApp.deploymentUrl, '_blank')}
                                                >
                                                    <Rocket className="w-4 h-4 mr-2" />
                                                    Deploy App
                                                </M3Button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {!isGenerating && !error && !generatedApp && (
                                    <div className="text-center space-y-4">
                                        <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto">
                                            <Lightbulb className="w-8 h-8 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="m3-title-large font-semibold text-foreground mb-2">
                                                Ready to Generate
                                            </h3>
                                            <p className="m3-body-medium text-muted-foreground">
                                                Describe your app idea in the chat and we'll generate it for you
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </M3CardContent>
                        </M3Card>
                    </motion.section>
                </div>

                {/* Tips Section */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-16"
                >
                    <h2 className="m3-headline-medium font-bold text-foreground mb-6 text-center">
                        Tips for Better Results
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <M3Card variant="filled">
                            <M3CardContent className="p-6 text-center">
                                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <Target className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="m3-title-medium font-semibold text-foreground mb-2">
                                    Be Specific
                                </h3>
                                <p className="m3-body-small text-muted-foreground">
                                    Describe features, functionality, and design preferences in detail
                                </p>
                            </M3CardContent>
                        </M3Card>

                        <M3Card variant="filled">
                            <M3CardContent className="p-6 text-center">
                                <div className="w-12 h-12 bg-success/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <Users className="w-6 h-6 text-success" />
                                </div>
                                <h3 className="m3-title-medium font-semibold text-foreground mb-2">
                                    Think User-First
                                </h3>
                                <p className="m3-body-small text-muted-foreground">
                                    Consider user experience and what problems your app solves
                                </p>
                            </M3CardContent>
                        </M3Card>

                        <M3Card variant="filled">
                            <M3CardContent className="p-6 text-center">
                                <div className="w-12 h-12 bg-tertiary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <Sparkles className="w-6 h-6 text-tertiary" />
                                </div>
                                <h3 className="m3-title-medium font-semibold text-foreground mb-2">
                                    Iterate & Improve
                                </h3>
                                <p className="m3-body-small text-muted-foreground">
                                    Generate multiple versions and refine based on results
                                </p>
                            </M3CardContent>
                        </M3Card>
                    </div>
                </motion.section>
            </div>
        </div>
    )
} 