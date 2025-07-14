'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

// Dynamically import the enhanced code editor to avoid SSR issues
const EnhancedCodeEditor = dynamic(() => import('@/components/enhanced-code-editor').then(mod => ({ default: mod.EnhancedCodeEditor })), {
    ssr: false,
    loading: () => (
        <div className="w-full h-96 bg-surface-container flex items-center justify-center">
            <div className="text-center">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                <p className="text-sm text-muted-foreground">Loading enhanced code editor...</p>
            </div>
        </div>
    )
})
import { M3Button } from '@/components/ui/m3-button'
import { M3Card, M3CardContent, M3CardHeader, M3CardTitle } from '@/components/ui/m3-card'
import {
    Code,
    GitBranch,
    Users,
    Sparkles,
    Play,
    Settings,
    Terminal,
    History,
    Share2,
    Eye,
    EyeOff,
    Zap,
    Rocket,
    Star,
    CheckCircle
} from 'lucide-react'

export default function CodeEditorDemoPage() {
    const [code, setCode] = useState(`import React from 'react'
import { motion } from 'framer-motion'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md' 
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={\`btn btn-\${variant} btn-\${size}\`}
    >
      {children}
    </motion.button>
  )
}

// Example usage
export function App() {
  return (
    <div className="app">
      <h1>Welcome to My App</h1>
      <Button onClick={() => console.log('Clicked!')}>
        Click Me
      </Button>
    </div>
  )
}`)

    const [language, setLanguage] = useState('typescript')
    const [fileName, setFileName] = useState('Button.tsx')
    const [isCollaborating, setIsCollaborating] = useState(false)
    const [showGitPanel, setShowGitPanel] = useState(true)

    const sampleCollaborators = [
        {
            id: '1',
            name: 'Alice Johnson',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop',
            color: '#3B82F6'
        },
        {
            id: '2',
            name: 'Bob Smith',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop',
            color: '#10B981'
        },
        {
            id: '3',
            name: 'Carol Davis',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop',
            color: '#F59E0B'
        }
    ]

    const aiSuggestions = [
        'Add TypeScript strict mode for better type safety',
        'Consider using a more semantic HTML structure',
        'Add accessibility attributes (aria-label, role)',
        'Implement error boundaries for better error handling',
        'Add unit tests for the Button component',
        'Consider using CSS-in-JS for better styling control'
    ]

    const handleRunCode = () => {
        // Simulate running the code
        console.log('Running code...')
        alert('Code executed successfully!')
    }

    const handleLanguageChange = (newLanguage: string) => {
        setLanguage(newLanguage)
        setFileName(`app.${newLanguage === 'typescript' ? 'tsx' : 'jsx'}`)
    }

    const [editorError, setEditorError] = useState<string | null>(null)

    const handleEditorError = (error: Error) => {
        console.error('Editor error:', error)
        setEditorError(error.message)
    }

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
                                Enhanced Code Editor Demo
                            </motion.h1>
                            <p className="m3-body-large text-muted-foreground flex items-center gap-2">
                                <Sparkles className="w-4 h-4" />
                                Experience the power of real-time collaboration and Git integration
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <M3Button
                                variant="outlined"
                                size="lg"
                                onClick={() => setIsCollaborating(!isCollaborating)}
                                className="flex items-center gap-2"
                            >
                                <Users className="w-4 h-4" />
                                {isCollaborating ? 'Stop Collaboration' : 'Start Collaboration'}
                            </M3Button>

                            <M3Button
                                variant="filled"
                                size="lg"
                                onClick={handleRunCode}
                                className="flex items-center gap-2"
                            >
                                <Play className="w-4 h-4" />
                                Run Code
                            </M3Button>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto p-6">
                {/* Features Overview */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8"
                >
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <M3Card variant="elevated" className="text-center">
                            <M3CardContent className="p-6">
                                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <Code className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="m3-title-medium font-semibold text-foreground mb-2">
                                    Monaco Editor
                                </h3>
                                <p className="m3-body-small text-muted-foreground">
                                    Full-featured code editor with syntax highlighting and IntelliSense
                                </p>
                            </M3CardContent>
                        </M3Card>

                        <M3Card variant="elevated" className="text-center">
                            <M3CardContent className="p-6">
                                <div className="w-12 h-12 bg-success/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <Users className="w-6 h-6 text-success" />
                                </div>
                                <h3 className="m3-title-medium font-semibold text-foreground mb-2">
                                    Real-time Collaboration
                                </h3>
                                <p className="m3-body-small text-muted-foreground">
                                    Live editing with multiple users and cursor tracking
                                </p>
                            </M3CardContent>
                        </M3Card>

                        <M3Card variant="elevated" className="text-center">
                            <M3CardContent className="p-6">
                                <div className="w-12 h-12 bg-tertiary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <GitBranch className="w-6 h-6 text-tertiary" />
                                </div>
                                <h3 className="m3-title-medium font-semibold text-foreground mb-2">
                                    Git Integration
                                </h3>
                                <p className="m3-body-small text-muted-foreground">
                                    Built-in version control with staging and commits
                                </p>
                            </M3CardContent>
                        </M3Card>

                        <M3Card variant="elevated" className="text-center">
                            <M3CardContent className="p-6">
                                <div className="w-12 h-12 bg-warning/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <Sparkles className="w-6 h-6 text-warning" />
                                </div>
                                <h3 className="m3-title-medium font-semibold text-foreground mb-2">
                                    AI Suggestions
                                </h3>
                                <p className="m3-body-small text-muted-foreground">
                                    Intelligent code improvements and best practices
                                </p>
                            </M3CardContent>
                        </M3Card>
                    </div>
                </motion.section>

                {/* Language Selector */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-6"
                >
                    <M3Card variant="elevated">
                        <M3CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <span className="m3-body-medium text-foreground">Language:</span>
                                    <div className="flex gap-2">
                                        {['typescript', 'javascript', 'python', 'java', 'cpp'].map((lang) => (
                                            <M3Button
                                                key={lang}
                                                variant={language === lang ? "filled" : "outlined"}
                                                size="sm"
                                                onClick={() => handleLanguageChange(lang)}
                                                className="capitalize"
                                            >
                                                {lang}
                                            </M3Button>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <span className="m3-body-medium text-foreground">File:</span>
                                    <span className="m3-title-small font-semibold text-foreground">{fileName}</span>
                                </div>
                            </div>
                        </M3CardContent>
                    </M3Card>
                </motion.section>

                {/* Enhanced Code Editor */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mb-8"
                >
                    {editorError ? (
                        <M3Card variant="elevated" className="bg-error/10 border-error/20">
                            <M3CardContent className="p-6">
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-error/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                                        <Code className="w-6 h-6 text-error" />
                                    </div>
                                    <h3 className="m3-title-medium font-semibold text-error mb-2">
                                        Editor Error
                                    </h3>
                                    <p className="m3-body-medium text-muted-foreground mb-4">
                                        {editorError}
                                    </p>
                                    <M3Button
                                        variant="filled"
                                        size="sm"
                                        onClick={() => setEditorError(null)}
                                    >
                                        Try Again
                                    </M3Button>
                                </div>
                            </M3CardContent>
                        </M3Card>
                    ) : (
                        <EnhancedCodeEditor
                            code={code}
                            language={language}
                            onChange={setCode}
                            onRun={handleRunCode}
                            suggestions={aiSuggestions}
                            projectId="demo-project"
                            fileName={fileName}
                            collaborators={isCollaborating ? sampleCollaborators : []}
                            gitEnabled={true}
                        />
                    )}
                </motion.section>

                {/* Collaboration Status */}
                {isCollaborating && (
                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mb-8"
                    >
                        <M3Card variant="elevated">
                            <M3CardHeader>
                                <M3CardTitle className="flex items-center gap-2">
                                    <Users className="w-5 h-5 text-primary" />
                                    Active Collaborators
                                </M3CardTitle>
                            </M3CardHeader>
                            <M3CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {sampleCollaborators.map((collaborator) => (
                                        <div key={collaborator.id} className="flex items-center gap-3 p-3 bg-surface-container rounded">
                                            <div
                                                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
                                                style={{ backgroundColor: collaborator.color }}
                                            >
                                                {collaborator.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="m3-body-medium font-medium text-foreground">{collaborator.name}</div>
                                                <div className="m3-body-small text-muted-foreground">Online</div>
                                            </div>
                                            <div className="w-2 h-2 bg-success rounded-full animate-pulse ml-auto"></div>
                                        </div>
                                    ))}
                                </div>
                            </M3CardContent>
                        </M3Card>
                    </motion.section>
                )}

                {/* Features Demo */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <h2 className="m3-headline-medium font-bold text-foreground mb-6">
                        Key Features
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <M3Card variant="elevated">
                            <M3CardHeader>
                                <M3CardTitle className="flex items-center gap-2">
                                    <Code className="w-5 h-5 text-primary" />
                                    Advanced Editor Features
                                </M3CardTitle>
                            </M3CardHeader>
                            <M3CardContent className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-success" />
                                    <span className="m3-body-medium text-foreground">Syntax highlighting for 50+ languages</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-success" />
                                    <span className="m3-body-medium text-foreground">IntelliSense and auto-completion</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-success" />
                                    <span className="m3-body-medium text-foreground">Error detection and linting</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-success" />
                                    <span className="m3-body-medium text-foreground">Code formatting and refactoring</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-success" />
                                    <span className="m3-body-medium text-foreground">Multi-cursor editing</span>
                                </div>
                            </M3CardContent>
                        </M3Card>

                        <M3Card variant="elevated">
                            <M3CardHeader>
                                <M3CardTitle className="flex items-center gap-2">
                                    <GitBranch className="w-5 h-5 text-tertiary" />
                                    Git Integration
                                </M3CardTitle>
                            </M3CardHeader>
                            <M3CardContent className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-success" />
                                    <span className="m3-body-medium text-foreground">Real-time Git status tracking</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-success" />
                                    <span className="m3-body-medium text-foreground">Stage and commit changes</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-success" />
                                    <span className="m3-body-medium text-foreground">Branch management</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-success" />
                                    <span className="m3-body-medium text-foreground">Commit history visualization</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-success" />
                                    <span className="m3-body-medium text-foreground">Diff highlighting</span>
                                </div>
                            </M3CardContent>
                        </M3Card>
                    </div>
                </motion.section>
            </div>
        </div>
    )
} 