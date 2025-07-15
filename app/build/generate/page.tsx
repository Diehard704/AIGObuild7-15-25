'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { M3Button } from '@/components/ui/m3-button'
import { M3Card, M3CardContent, M3CardHeader, M3CardTitle } from '@/components/ui/m3-card'
import { TypewriterChat } from '@/components/typewriter-chat'
import { LivePreview } from '@/components/live-preview'
import { DeepSeekUpsellBot, DeepSeekBotToggle } from '@/components/deepseek-upsell-bot'
import { AdvancedAIHelper, AIHelperToggle } from '@/components/advanced-ai-helper'
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
    AlertCircle,
    Eye
} from 'lucide-react'

function GeneratePageContent() {
    const searchParams = useSearchParams()
    const template = searchParams.get('template')
    const prompt = searchParams.get('prompt')

    const [isGenerating, setIsGenerating] = useState(false)
    const [generationStep, setGenerationStep] = useState<string>('')
    const [progress, setProgress] = useState(0)
    const [generatedApp, setGeneratedApp] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)
    const [showDeepSeekBot, setShowDeepSeekBot] = useState(false)
    const [showAdvancedAI, setShowAdvancedAI] = useState(false)

    const templates = {
        'nextjs-developer': {
            name: 'Next.js Developer',
            description: 'Full-stack React applications with modern tooling',
            icon: <Code className="w-6 h-6" />,
            color: 'from-primary to-secondary'
        },
        'vue-developer': {
            name: 'Vue.js Developer',
            description: 'Progressive JavaScript framework for building UIs',
            icon: <Globe className="w-6 h-6" />,
            color: 'from-secondary to-tertiary'
        },
        'streamlit-developer': {
            name: 'Streamlit Developer',
            description: 'Data science applications with visualizations',
            icon: <TrendingUp className="w-6 h-6" />,
            color: 'from-tertiary to-warning'
        },
        'gradio-developer': {
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

    const handleGenerateApp = useCallback(async (prompt: string) => {
        setIsGenerating(true)
        setError(null)
        setProgress(0)
        setGenerationStep('')

        try {
            // Step 1: Analyzing requirements
            setGenerationStep('Analyzing requirements...')
            setProgress(10)
            await new Promise(resolve => setTimeout(resolve, 1000))

            // Step 2: Generating code structure
            setGenerationStep('Generating code structure...')
            setProgress(25)
            await new Promise(resolve => setTimeout(resolve, 1000))

            // Step 3: Creating components
            setGenerationStep('Creating components...')
            setProgress(40)
            await new Promise(resolve => setTimeout(resolve, 1000))

            // Step 4: Setting up styling
            setGenerationStep('Setting up styling...')
            setProgress(60)
            await new Promise(resolve => setTimeout(resolve, 1000))

            // Step 5: Configuring deployment
            setGenerationStep('Configuring deployment...')
            setProgress(80)
            await new Promise(resolve => setTimeout(resolve, 1000))

            // Step 6: Call AI API to generate actual code
            setGenerationStep('Finalizing application...')
            setProgress(90)

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: [
                        {
                            role: 'user',
                            content: prompt
                        }
                    ],
                    template: template || 'nextjs-developer',
                    userID: 'anonymous',
                    teamID: undefined
                })
            })

            if (!response.ok) {
                const errorText = await response.text()
                throw new Error(`AI API request failed: ${response.status} - ${errorText}`)
            }

            const data = await response.json()

            if (!data || !data.code) {
                throw new Error('AI generated invalid response. Please try again with a different prompt.')
            }
            setProgress(100)

            // Create sandbox for the generated app
            const sandboxResponse = await fetch('/api/sandbox', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fragment: data,
                    userID: 'anonymous',
                    teamID: undefined,
                    accessToken: undefined
                })
            })

            if (!sandboxResponse.ok) {
                throw new Error('Failed to create sandbox')
            }

            const sandboxData = await sandboxResponse.json()

            // Set the generated app with real data
            setGeneratedApp({
                id: 'app-' + Date.now(),
                name: data.title || 'Generated App',
                description: prompt,
                template: template || 'nextjs-developer',
                status: 'ready',
                previewUrl: sandboxData.url || 'https://example.com/preview',
                deploymentUrl: sandboxData.url || 'https://example.com/deploy',
                fragment: data,
                sandboxId: sandboxData.sbxId
            })

        } catch (err) {
            console.error('Generation error:', err)
            setError(err instanceof Error ? err.message : 'Failed to generate application. Please try again.')
        } finally {
            setIsGenerating(false)
        }
    }, [template])

    useEffect(() => {
        if (prompt) {
            handleGenerateApp(prompt)
        }
    }, [prompt, handleGenerateApp])

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
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Chat Interface */}
                    <motion.section
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="lg:col-span-1"
                    >
                        <M3Card variant="elevated" className="h-full">
                            <M3CardHeader>
                                <M3CardTitle className="flex items-center gap-2">
                                    <Lightbulb className="w-5 h-5 text-primary" />
                                    Describe Your App
                                </M3CardTitle>
                            </M3CardHeader>
                            <M3CardContent className="p-6">
                                <TypewriterChat onGenerate={handleGenerateApp} isLoading={isGenerating} />
                                
                                {/* Generation Status */}
                                <div className="mt-6 space-y-4">
                                    {isGenerating && (
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-foreground">Generating...</span>
                                                <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
                                            </div>
                                            <div className="w-full bg-surface-container rounded-full h-2">
                                                <motion.div
                                                    className="bg-primary h-2 rounded-full"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${progress}%` }}
                                                    transition={{ duration: 0.5 }}
                                                />
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Loader2 className="w-4 h-4 text-primary animate-spin" />
                                                <span className="text-sm text-foreground">{generationStep}</span>
                                            </div>
                                        </div>
                                    )}

                                    {error && (
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2 text-error">
                                                <AlertCircle className="w-4 h-4" />
                                                <span className="text-sm font-medium">Generation Failed</span>
                                            </div>
                                            <p className="text-sm text-muted-foreground">{error}</p>
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
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2 text-success">
                                                <CheckCircle className="w-4 h-4" />
                                                <span className="text-sm font-medium">App Generated!</span>
                                            </div>
                                            
                                            <div className="space-y-2">
                                                <h3 className="font-semibold text-foreground">
                                                    {generatedApp.name}
                                                </h3>
                                                <p className="text-sm text-muted-foreground">
                                                    {generatedApp.description}
                                                </p>
                                            </div>

                                            <div className="grid grid-cols-1 gap-2">
                                                <M3Button
                                                    variant="filled"
                                                    size="sm"
                                                    onClick={() => window.open(generatedApp.previewUrl, '_blank')}
                                                >
                                                    <Play className="w-4 h-4 mr-2" />
                                                    Open in New Tab
                                                </M3Button>

                                                <M3Button
                                                    variant="outlined"
                                                    size="sm"
                                                    onClick={() => window.open(generatedApp.deploymentUrl, '_blank')}
                                                >
                                                    <Rocket className="w-4 h-4 mr-2" />
                                                    Deploy App
                                                </M3Button>

                                                <M3Button
                                                    variant="outlined"
                                                    size="sm"
                                                    onClick={() => {
                                                        if (generatedApp.fragment && generatedApp.fragment.code) {
                                                            const codeStr = typeof generatedApp.fragment.code === 'string'
                                                                ? generatedApp.fragment.code
                                                                : JSON.stringify(generatedApp.fragment.code, null, 2)
                                                            navigator.clipboard.writeText(codeStr)
                                                            alert('Code copied to clipboard!')
                                                        }
                                                    }}
                                                >
                                                    <Code className="w-4 h-4 mr-2" />
                                                    Copy Code
                                                </M3Button>
                                            </div>
                                        </div>
                                    )}

                                    {!isGenerating && !error && !generatedApp && (
                                        <div className="text-center space-y-3">
                                            <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto">
                                                <Lightbulb className="w-6 h-6 text-primary" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-foreground">
                                                    Ready to Generate
                                                </h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Describe your app idea and we&apos;ll generate it for you
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </M3CardContent>
                        </M3Card>
                    </motion.section>

                    {/* Live Preview */}
                    <motion.section
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="lg:col-span-2"
                    >
                        <M3Card variant="elevated" className="h-full">
                            <M3CardHeader>
                                <M3CardTitle className="flex items-center gap-2">
                                    <Eye className="w-5 h-5 text-primary" />
                                    Live Preview
                                </M3CardTitle>
                            </M3CardHeader>
                            <M3CardContent className="p-0 h-full">
                                <div className="h-[700px]">
                                    <LivePreview
                                        generatedApp={generatedApp}
                                        isGenerating={isGenerating}
                                        onDeploy={() => window.open(generatedApp?.deploymentUrl, '_blank')}
                                        onEdit={() => {
                                            // Handle edit action
                                            console.log('Edit app:', generatedApp)
                                        }}
                                    />
                                </div>
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

            {/* DeepSeek Upselling Bot */}
            <DeepSeekUpsellBot
                generatedApp={generatedApp}
                userTier="free"
                onUpgrade={(feature, price) => {
                    console.log('Upgrade requested:', feature, price)
                    // Here you would integrate with Stripe
                    alert(`Upgrade to ${feature} for $${price}`)
                }}
                isVisible={showDeepSeekBot}
                onToggle={() => setShowDeepSeekBot(false)}
            />
            
            <DeepSeekBotToggle
                onClick={() => setShowDeepSeekBot(true)}
                isVisible={showDeepSeekBot}
            />
            
            {/* Advanced AI Helper */}
            <AdvancedAIHelper
                userContext={{
                    tier: 'free',
                    generatedApps: 3,
                    credits: 12,
                    lastActivity: new Date(),
                    preferences: ['modern design', 'performance'],
                    painPoints: ['slow loading', 'mobile responsiveness'],
                    currentProject: generatedApp
                }}
                generatedApp={generatedApp}
                onUpgrade={(offer) => {
                    console.log('Upgrade requested:', offer)
                    // Integrate with Stripe payment
                    window.location.href = '/pricing'
                }}
                isVisible={showAdvancedAI}
                onToggle={() => setShowAdvancedAI(false)}
            />
            
            <AIHelperToggle
                onClick={() => setShowAdvancedAI(true)}
                isVisible={showAdvancedAI}
            />
        </div>
    )
}

export default function GeneratePage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>}>
            <GeneratePageContent />
        </Suspense>
    )
} 