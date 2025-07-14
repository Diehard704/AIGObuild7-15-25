'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Play,
    Download,
    Copy,
    Settings,
    Sparkles,
    GitBranch,
    Users,
    Save,
    Share2,
    Eye,
    EyeOff,
    Code,
    Terminal,
    History,
    GitCommit,
    GitPullRequest,
    GitMerge,
    GitBranch as GitBranchIcon,
    GitCommit as GitCommitIcon,
    GitPullRequest as GitPullRequestIcon,
    GitMerge as GitMergeIcon,
    Plus,
    Minus,
    RotateCcw,
    CheckCircle,
    AlertCircle,
    Clock
} from 'lucide-react'
import { M3Button } from '@/components/ui/m3-button'
import { M3Card, M3CardContent, M3CardHeader, M3CardTitle } from '@/components/ui/m3-card'
import Editor from '@monaco-editor/react'
import * as monaco from 'monaco-editor'
import { io, Socket } from 'socket.io-client'
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import { MonacoBinding } from 'y-monaco'

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
    const [socket, setSocket] = useState<Socket | null>(null)
    const [ydoc, setYdoc] = useState<Y.Doc | null>(null)
    const [provider, setProvider] = useState<WebsocketProvider | null>(null)
    const [binding, setBinding] = useState<MonacoBinding | null>(null)
    const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    // Initialize real-time collaboration
    useEffect(() => {
        if (!isCollaborating || !projectId) return

        const initCollaboration = async () => {
            try {
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

                // Set up socket for cursor positions
                const socket = io('http://localhost:3001')
                setSocket(socket)

                socket.on('user-joined', (user: Collaborator) => {
                    setActiveCollaborators(prev => [...prev, user])
                })

                socket.on('user-left', (userId: string) => {
                    setActiveCollaborators(prev => prev.filter(u => u.id !== userId))
                })

                socket.on('cursor-update', (data: { userId: string; cursor: any }) => {
                    setActiveCollaborators(prev =>
                        prev.map(u => u.id === data.userId ? { ...u, cursor: data.cursor } : u)
                    )
                })

                socket.emit('join-room', { projectId, user: collaborators[0] })

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
    }, [isCollaborating, projectId, collaborators])

    // Initialize Monaco Editor
    useEffect(() => {
        const loadMonaco = async () => {
            try {
                await import('@monaco-editor/react')
                setIsMonacoLoaded(true)
            } catch (error) {
                console.error('Failed to load Monaco Editor:', error)
            }
        }
        loadMonaco()
    }, [])

    // Handle editor mount
    const handleEditorDidMount = useCallback((editor: monaco.editor.IStandaloneCodeEditor) => {
        editorRef.current = editor

        // Set up Monaco binding for real-time collaboration
        if (isCollaborating && ydoc && provider) {
            const ytext = ydoc.getText('monaco')
            const binding = new MonacoBinding(
                ytext,
                editor.getModel()!,
                new Set([editor]),
                provider.awareness
            )
            setBinding(binding)
        }

        // Set up cursor tracking
        editor.onDidChangeCursorPosition((e) => {
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
        a.click()
        URL.revokeObjectURL(url)
    }

    const handleSave = () => {
        // Simulate Git commit
        const newCommit: GitCommit = {
            id: `commit-${Date.now()}`,
            message: `Update ${fileName}`,
            author: 'Current User',
            timestamp: new Date().toISOString(),
            files: [fileName]
        }

        setGitStatus(prev => ({
            ...prev,
            commits: [newCommit, ...prev.commits],
            staged: [],
            unstaged: []
        }))
    }

    const handleGitStage = () => {
        setGitStatus(prev => ({
            ...prev,
            staged: [...prev.staged, fileName],
            unstaged: prev.unstaged.filter(f => f !== fileName)
        }))
    }

    const handleGitCommit = () => {
        if (gitStatus.staged.length > 0) {
            const newCommit: GitCommit = {
                id: `commit-${Date.now()}`,
                message: `Update ${gitStatus.staged.join(', ')}`,
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

    if (!isMonacoLoaded) {
        return (
            <M3Card variant="elevated" className="h-96">
                <M3CardContent className="p-6">
                    <div className="animate-pulse space-y-4">
                        <div className="h-4 bg-surface-container rounded w-1/4"></div>
                        <div className="h-4 bg-surface-container rounded w-3/4"></div>
                        <div className="h-4 bg-surface-container rounded w-1/2"></div>
                        <div className="h-4 bg-surface-container rounded w-2/3"></div>
                    </div>
                </M3CardContent>
            </M3Card>
        )
    }

    return (
        <div className="relative">
            {/* Enhanced Toolbar */}
            <M3Card variant="elevated" className="mb-4">
                <M3CardContent className="p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <Code className="w-4 h-4 text-primary" />
                                <span className="m3-body-medium text-foreground">{fileName}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="m3-body-small text-muted-foreground">Language:</span>
                                <span className="m3-body-medium font-medium text-foreground capitalize">{language}</span>
                            </div>

                            {gitEnabled && (
                                <div className="flex items-center gap-2">
                                    <GitBranch className="w-4 h-4 text-tertiary" />
                                    <span className="m3-body-small text-muted-foreground">{gitStatus.currentBranch}</span>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center gap-2">
                            {suggestions.length > 0 && (
                                <M3Button
                                    variant="outlined"
                                    size="sm"
                                    onClick={() => setShowSuggestions(!showSuggestions)}
                                    className="flex items-center gap-2"
                                >
                                    <Sparkles className="w-4 h-4" />
                                    AI Suggestions
                                </M3Button>
                            )}

                            {collaborators.length > 0 && (
                                <M3Button
                                    variant="outlined"
                                    size="sm"
                                    onClick={toggleCollaboration}
                                    className={`flex items-center gap-2 ${isCollaborating ? 'bg-success/20 text-success' : ''}`}
                                >
                                    <Users className="w-4 h-4" />
                                    {isCollaborating ? 'Collaborating' : 'Start Collaboration'}
                                </M3Button>
                            )}

                            {gitEnabled && (
                                <M3Button
                                    variant="outlined"
                                    size="sm"
                                    onClick={() => setShowGitPanel(!showGitPanel)}
                                    className="flex items-center gap-2"
                                >
                                    <GitBranch className="w-4 h-4" />
                                    Git
                                </M3Button>
                            )}

                            <M3Button
                                variant="outlined"
                                size="sm"
                                onClick={handleCopy}
                                className="flex items-center gap-2"
                            >
                                <Copy className="w-4 h-4" />
                                Copy
                            </M3Button>

                            <M3Button
                                variant="outlined"
                                size="sm"
                                onClick={handleDownload}
                                className="flex items-center gap-2"
                            >
                                <Download className="w-4 h-4" />
                                Download
                            </M3Button>

                            {onRun && (
                                <M3Button
                                    variant="filled"
                                    size="sm"
                                    onClick={onRun}
                                    className="flex items-center gap-2"
                                >
                                    <Play className="w-4 h-4" />
                                    Run
                                </M3Button>
                            )}
                        </div>
                    </div>
                </M3CardContent>
            </M3Card>

            {/* Main Editor Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Code Editor */}
                <div className="lg:col-span-2">
                    <M3Card variant="elevated" className="h-96">
                        <M3CardContent className="p-0 h-full">
                            <Editor
                                height="100%"
                                defaultLanguage={language}
                                value={code}
                                onChange={(value) => onChange(value || '')}
                                onMount={handleEditorDidMount}
                                options={{
                                    readOnly,
                                    minimap: { enabled: true },
                                    fontSize: 14,
                                    lineNumbers: 'on',
                                    roundedSelection: false,
                                    scrollBeyondLastLine: false,
                                    automaticLayout: true,
                                    wordWrap: 'on',
                                    theme: 'vs-dark',
                                    suggestOnTriggerCharacters: true,
                                    acceptSuggestionOnEnter: 'on',
                                    tabCompletion: 'off',
                                    wordBasedSuggestions: 'on',
                                    parameterHints: {
                                        enabled: true,
                                        cycle: true
                                    },
                                    hover: {
                                        enabled: true,
                                        delay: 300
                                    },
                                    formatOnPaste: true,
                                    formatOnType: true,
                                    folding: true,
                                    foldingStrategy: 'indentation',
                                    showFoldingControls: 'always',
                                    unfoldOnClickAfterEnd: false,
                                    links: true,
                                    colorDecorators: true
                                }}
                            />
                        </M3CardContent>
                    </M3Card>
                </div>

                {/* Side Panel */}
                <div className="space-y-4">
                    {/* Git Panel */}
                    {showGitPanel && gitEnabled && (
                        <M3Card variant="elevated">
                            <M3CardHeader>
                                <M3CardTitle className="flex items-center gap-2">
                                    <GitBranch className="w-5 h-5 text-tertiary" />
                                    Git Status
                                </M3CardTitle>
                            </M3CardHeader>
                            <M3CardContent className="space-y-4">
                                {/* Staged Files */}
                                {gitStatus.staged.length > 0 && (
                                    <div>
                                        <h4 className="m3-title-small font-medium text-foreground mb-2">Staged</h4>
                                        <div className="space-y-1">
                                            {gitStatus.staged.map((file) => (
                                                <div key={file} className="flex items-center gap-2 p-2 bg-success/10 rounded">
                                                    <CheckCircle className="w-4 h-4 text-success" />
                                                    <span className="m3-body-small text-foreground">{file}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Unstaged Files */}
                                {gitStatus.unstaged.length > 0 && (
                                    <div>
                                        <h4 className="m3-title-small font-medium text-foreground mb-2">Modified</h4>
                                        <div className="space-y-1">
                                            {gitStatus.unstaged.map((file) => (
                                                <div key={file} className="flex items-center gap-2 p-2 bg-warning/10 rounded">
                                                    <AlertCircle className="w-4 h-4 text-warning" />
                                                    <span className="m3-body-small text-foreground">{file}</span>
                                                    <M3Button
                                                        variant="outlined"
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

                                {/* Actions */}
                                <div className="flex items-center gap-2">
                                    <M3Button
                                        variant="filled"
                                        size="sm"
                                        onClick={handleGitCommit}
                                        disabled={gitStatus.staged.length === 0}
                                        className="flex-1"
                                    >
                                        <GitCommit className="w-4 h-4 mr-2" />
                                        Commit
                                    </M3Button>
                                </div>

                                {/* Recent Commits */}
                                {gitStatus.commits.length > 0 && (
                                    <div>
                                        <h4 className="m3-title-small font-medium text-foreground mb-2">Recent Commits</h4>
                                        <div className="space-y-2 max-h-32 overflow-y-auto">
                                            {gitStatus.commits.slice(0, 3).map((commit) => (
                                                <div key={commit.id} className="p-2 bg-surface-container rounded">
                                                    <div className="m3-body-small font-medium text-foreground">{commit.message}</div>
                                                    <div className="m3-body-small text-muted-foreground">
                                                        {new Date(commit.timestamp).toLocaleDateString()}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </M3CardContent>
                        </M3Card>
                    )}

                    {/* Collaboration Panel */}
                    {isCollaborating && activeCollaborators.length > 0 && (
                        <M3Card variant="elevated">
                            <M3CardHeader>
                                <M3CardTitle className="flex items-center gap-2">
                                    <Users className="w-5 h-5 text-primary" />
                                    Active Collaborators
                                </M3CardTitle>
                            </M3CardHeader>
                            <M3CardContent>
                                <div className="space-y-2">
                                    {activeCollaborators.map((collaborator) => (
                                        <div key={collaborator.id} className="flex items-center gap-3 p-2 bg-surface-container rounded">
                                            <div
                                                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
                                                style={{ backgroundColor: collaborator.color }}
                                            >
                                                {collaborator.name.charAt(0)}
                                            </div>
                                            <div className="flex-1">
                                                <div className="m3-body-medium font-medium text-foreground">{collaborator.name}</div>
                                                <div className="m3-body-small text-muted-foreground">Online</div>
                                            </div>
                                            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                                        </div>
                                    ))}
                                </div>
                            </M3CardContent>
                        </M3Card>
                    )}

                    {/* AI Suggestions Panel */}
                    {showSuggestions && suggestions.length > 0 && (
                        <M3Card variant="elevated">
                            <M3CardHeader>
                                <M3CardTitle className="flex items-center gap-2">
                                    <Sparkles className="w-5 h-5 text-primary" />
                                    AI Suggestions
                                </M3CardTitle>
                            </M3CardHeader>
                            <M3CardContent>
                                <div className="space-y-3 max-h-64 overflow-y-auto">
                                    {suggestions.map((suggestion, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="p-3 bg-surface-container rounded cursor-pointer hover:bg-surface-container/80 transition-colors"
                                        >
                                            <p className="m3-body-small text-foreground">{suggestion}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </M3CardContent>
                        </M3Card>
                    )}
                </div>
            </div>
        </div>
    )
} 