'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { M3Button } from '@/components/ui/m3-button'
import { M3Card, M3CardContent, M3CardHeader, M3CardTitle } from '@/components/ui/m3-card'
import {
    Code,
    Play,
    Copy,
    Download,
    Save,
    GitBranch,
    Users,
    Lightbulb,
    Settings,
    Eye,
    EyeOff,
    Plus,
    Check,
    X,
    MessageSquare,
    Zap
} from 'lucide-react'
import dynamic from 'next/dynamic'

// Dynamically import Monaco Editor to avoid SSR issues
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-96 bg-surface-container flex items-center justify-center">
            <div className="text-center">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                <p className="text-sm text-muted-foreground">Loading editor...</p>
            </div>
        </div>
    )
})

interface EnhancedCodeEditorProps {
    code: string
    language: string
    onChange: (code: string) => void
    onRun?: () => void
    suggestions?: string[]
    readOnly?: boolean
    projectId?: string
    fileName?: string
    collaborators?: Collaborator[]
    gitEnabled?: boolean
}

interface Collaborator {
    id: string
    name: string
    avatar: string
    color: string
    cursor?: { line: number; column: number }
}

interface GitCommit {
    id: string
    message: string
    author: string
    timestamp: string
    files: string[]
}

interface GitStatus {
    staged: string[]
    unstaged: string[]
    untracked: string[]
    currentBranch: string
    branches: string[]
    commits: GitCommit[]
}

export function EnhancedCodeEditor({
    code,
    language,
    onChange,
    onRun,
    suggestions = [],
    readOnly = false,
    projectId = 'default',
    fileName = 'app.tsx',
    collaborators = [],
    gitEnabled = true
}: EnhancedCodeEditorProps) {
    const [isMonacoLoaded, setIsMonacoLoaded] = useState(false)
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [showGitPanel, setShowGitPanel] = useState(false)
    const [showCollaborators, setShowCollaborators] = useState(false)
    const [isCollaborating, setIsCollaborating] = useState(false)
    const [gitStatus, setGitStatus] = useState<GitStatus>({
        staged: [],
        unstaged: [],
        untracked: [],
        currentBranch: 'main',
        branches: ['main', 'develop'],
        commits: []
    })
    const [activeCollaborators, setActiveCollaborators] = useState<Collaborator[]>([])
    const [socket, setSocket] = useState<any>(null)
    const [ydoc, setYdoc] = useState<any>(null)
    const [provider, setProvider] = useState<any>(null)
    const [binding, setBinding] = useState<any>(null)
    const editorRef = useRef<any>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    // Initialize real-time collaboration
    useEffect(() => {
        if (!isCollaborating || !projectId) return

        const initCollaboration = async () => {
            try {
                // Dynamically import Yjs and related libraries
                const [Y, { WebsocketProvider }] = await Promise.all([
                    import('yjs'),
                    import('y-websocket')
                ])

                // Initialize Yjs document
                const doc = new Y.Doc()
                const wsProvider = new WebsocketProvider(
                    'ws://localhost:1234', // WebSocket server URL
                    projectId,
                    doc
                )

                // Create text type for the document
                const ytext = doc.getText('monaco')

                // Wait for connection
                wsProvider.on('status', ({ status }: { status: string }) => {
                    console.log('Connection status:', status)
                })

                setYdoc(doc)
                setProvider(wsProvider)

                // Set up socket for cursor positions (simplified for now)
                console.log('Collaboration initialized')

            } catch (error) {
                console.error('Failed to initialize collaboration:', error)
            }
        }

        initCollaboration()

        return () => {
            if (provider) {
                provider.destroy()
            }
            if (socket) {
                socket.disconnect()
            }
            if (binding) {
                binding.destroy()
            }
        }
    }, [isCollaborating, projectId, collaborators, provider, socket, binding])

    // Initialize Monaco Editor
    useEffect(() => {
        const loadMonaco = async () => {
            try {
                setIsMonacoLoaded(true)
            } catch (error) {
                console.error('Failed to load Monaco Editor:', error)
            }
        }
        loadMonaco()
    }, [])

    // Handle editor mount
    const handleEditorDidMount = useCallback((editor: any) => {
        editorRef.current = editor

        // Set up Monaco binding for real-time collaboration
        if (isCollaborating && ydoc && provider) {
            try {
                const ytext = ydoc.getText('monaco')
                // MonacoBinding is dynamically imported, so we'll handle it safely
                console.log('Monaco binding would be set up here')
                // const binding = new MonacoBinding(
                //     ytext,
                //     editor.getModel(),
                //     new Set([editor]),
                //     provider.awareness
                // )
                // setBinding(binding)
            } catch (error) {
                console.error('Failed to set up Monaco binding:', error)
            }
        }

        // Set up cursor tracking
        editor.onDidChangeCursorPosition((e: any) => {
            if (socket && isCollaborating) {
                socket.emit('cursor-update', {
                    projectId,
                    cursor: {
                        line: e.position.lineNumber,
                        column: e.position.column
                    }
                })
            }
        })

        // Set up change tracking for Git
        if (gitEnabled) {
            editor.onDidChangeModelContent(() => {
                // Simulate Git status update
                setGitStatus(prev => ({
                    ...prev,
                    unstaged: [fileName]
                }))
            })
        }
    }, [isCollaborating, ydoc, provider, socket, projectId, gitEnabled, fileName])

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code)
            // Show success toast
        } catch (error) {
            console.error('Failed to copy code:', error)
        }
    }

    const handleDownload = () => {
        const blob = new Blob([code], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = fileName
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }

    const handleSave = () => {
        // Simulate save operation
        console.log('Saving code...')
        // In a real app, this would save to backend
    }

    const handleGitStage = () => {
        setGitStatus(prev => ({
            ...prev,
            staged: [...prev.staged, fileName],
            unstaged: prev.unstaged.filter(f => f !== fileName)
        }))
    }

    const handleGitCommit = () => {
        const commitMessage = prompt('Enter commit message:')
        if (commitMessage) {
            const newCommit: GitCommit = {
                id: Date.now().toString(),
                message: commitMessage,
                author: 'Current User',
                timestamp: new Date().toISOString(),
                files: gitStatus.staged
            }
            setGitStatus(prev => ({
                ...prev,
                commits: [newCommit, ...prev.commits],
                staged: []
            }))
        }
    }

    const toggleCollaboration = () => {
        setIsCollaborating(!isCollaborating)
    }

    const handleLanguageChange = (newLanguage: string) => {
        // This would update the language prop
        console.log('Language changed to:', newLanguage)
    }

    const handleSuggestionClick = (suggestion: string) => {
        onChange(suggestion)
        setShowSuggestions(false)
    }

    return (
        <div className="w-full space-y-4">
            {/* Editor Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <h3 className="m3-title-medium font-semibold text-foreground">
                        {fileName}
                    </h3>
                    <div className="flex items-center gap-2">
                        <Code className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{language}</span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {onRun && (
                        <M3Button
                            variant="filled"
                            size="sm"
                            onClick={onRun}
                            className="bg-success hover:bg-success/90"
                        >
                            <Play className="w-4 h-4 mr-1" />
                            Run
                        </M3Button>
                    )}

                    <M3Button
                        variant="outlined"
                        size="sm"
                        onClick={handleCopy}
                    >
                        <Copy className="w-4 h-4 mr-1" />
                        Copy
                    </M3Button>

                    <M3Button
                        variant="outlined"
                        size="sm"
                        onClick={handleDownload}
                    >
                        <Download className="w-4 h-4 mr-1" />
                        Download
                    </M3Button>

                    <M3Button
                        variant="outlined"
                        size="sm"
                        onClick={handleSave}
                    >
                        <Save className="w-4 h-4 mr-1" />
                        Save
                    </M3Button>

                    {gitEnabled && (
                        <M3Button
                            variant="outlined"
                            size="sm"
                            onClick={() => setShowGitPanel(!showGitPanel)}
                        >
                            <GitBranch className="w-4 h-4 mr-1" />
                            Git
                        </M3Button>
                    )}

                    <M3Button
                        variant="outlined"
                        size="sm"
                        onClick={toggleCollaboration}
                        className={isCollaborating ? 'bg-primary text-primary-foreground' : ''}
                    >
                        <Users className="w-4 h-4 mr-1" />
                        {isCollaborating ? 'Collaborating' : 'Collaborate'}
                    </M3Button>
                </div>
            </div>

            {/* Main Editor */}
            <M3Card variant="elevated" className="overflow-hidden">
                <M3CardContent className="p-0">
                    <div ref={containerRef} className="w-full h-96">
                        {isMonacoLoaded && (
                            <MonacoEditor
                                height="100%"
                                language={language}
                                value={code}
                                onChange={(value) => onChange(value || '')}
                                onMount={handleEditorDidMount}
                                options={{
                                    readOnly,
                                    minimap: { enabled: false },
                                    fontSize: 14,
                                    lineNumbers: 'on' as const,
                                    roundedSelection: false,
                                    scrollBeyondLastLine: false,
                                    automaticLayout: true,
                                    theme: 'vs-dark'
                                }}
                            />
                        )}
                    </div>
                </M3CardContent>
            </M3Card>

            {/* AI Suggestions */}
            {suggestions.length > 0 && (
                <M3Card variant="filled" className="bg-primary/10 border-primary/20">
                    <M3CardHeader>
                        <M3CardTitle className="flex items-center gap-2 text-primary">
                            <Lightbulb className="w-5 h-5" />
                            AI Suggestions
                        </M3CardTitle>
                    </M3CardHeader>
                    <M3CardContent>
                        <div className="space-y-2">
                            {suggestions.map((suggestion, index) => (
                                <div
                                    key={index}
                                    className="p-3 bg-surface-container rounded-lg cursor-pointer hover:bg-surface-container-high transition-colors"
                                    onClick={() => handleSuggestionClick(suggestion)}
                                >
                                    <p className="text-sm text-foreground">{suggestion}</p>
                                </div>
                            ))}
                        </div>
                    </M3CardContent>
                </M3Card>
            )}

            {/* Git Panel */}
            {showGitPanel && gitEnabled && (
                <M3Card variant="filled" className="bg-surface-container">
                    <M3CardHeader>
                        <M3CardTitle className="flex items-center gap-2">
                            <GitBranch className="w-5 h-5" />
                            Git Status
                        </M3CardTitle>
                    </M3CardHeader>
                    <M3CardContent>
                        <div className="space-y-4">
                            {/* Staged Changes */}
                            {gitStatus.staged.length > 0 && (
                                <div>
                                    <h4 className="m3-title-small font-semibold text-foreground mb-2">
                                        Staged Changes
                                    </h4>
                                    <div className="space-y-1">
                                        {gitStatus.staged.map((file, index) => (
                                            <div key={index} className="flex items-center gap-2 text-sm">
                                                <Check className="w-4 h-4 text-success" />
                                                <span className="text-foreground">{file}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Unstaged Changes */}
                            {gitStatus.unstaged.length > 0 && (
                                <div>
                                    <h4 className="m3-title-small font-semibold text-foreground mb-2">
                                        Unstaged Changes
                                    </h4>
                                    <div className="space-y-1">
                                        {gitStatus.unstaged.map((file, index) => (
                                            <div key={index} className="flex items-center gap-2 text-sm">
                                                <X className="w-4 h-4 text-warning" />
                                                <span className="text-foreground">{file}</span>
                                                <M3Button
                                                    variant="text"
                                                    size="sm"
                                                    onClick={handleGitStage}
                                                    className="ml-auto"
                                                >
                                                    Stage
                                                </M3Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Commit Actions */}
                            {gitStatus.staged.length > 0 && (
                                <div className="flex gap-2">
                                    <M3Button
                                        variant="filled"
                                        size="sm"
                                        onClick={handleGitCommit}
                                    >
                                        <Plus className="w-4 h-4 mr-1" />
                                        Commit
                                    </M3Button>
                                </div>
                            )}
                        </div>
                    </M3CardContent>
                </M3Card>
            )}

            {/* Collaborators Panel */}
            {showCollaborators && isCollaborating && (
                <M3Card variant="filled" className="bg-surface-container">
                    <M3CardHeader>
                        <M3CardTitle className="flex items-center gap-2">
                            <Users className="w-5 h-5" />
                            Active Collaborators
                        </M3CardTitle>
                    </M3CardHeader>
                    <M3CardContent>
                        <div className="space-y-2">
                            {activeCollaborators.map((collaborator) => (
                                <div key={collaborator.id} className="flex items-center gap-3">
                                    <div
                                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
                                        style={{ backgroundColor: collaborator.color }}
                                    >
                                        {collaborator.name.charAt(0)}
                                    </div>
                                    <span className="text-sm text-foreground">{collaborator.name}</span>
                                    {collaborator.cursor && (
                                        <span className="text-xs text-muted-foreground">
                                            Line {collaborator.cursor.line}, Col {collaborator.cursor.column}
                                        </span>
                                    )}
                                </div>
                            ))}
                            {activeCollaborators.length === 0 && (
                                <p className="text-sm text-muted-foreground">No active collaborators</p>
                            )}
                        </div>
                    </M3CardContent>
                </M3Card>
            )}
        </div>
    )
} 