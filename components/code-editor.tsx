'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Play, Download, Copy, Settings, Sparkles } from 'lucide-react'

interface CodeEditorProps {
    code: string
    language: string
    onChange: (code: string) => void
    onRun?: () => void
    suggestions?: string[]
    readOnly?: boolean
}

export function CodeEditor({
    code,
    language,
    onChange,
    onRun,
    suggestions = [],
    readOnly = false
}: CodeEditorProps) {
    const [isMonacoLoaded, setIsMonacoLoaded] = useState(false)
    const [showSuggestions, setShowSuggestions] = useState(false)
    const editorRef = useRef<HTMLDivElement>(null)
    const monacoRef = useRef<any>(null)

    useEffect(() => {
        // Dynamically load Monaco Editor
        const loadMonaco = async () => {
            try {
                const monaco = await import('@monaco-editor/react')
                setIsMonacoLoaded(true)
            } catch (error) {
                console.error('Failed to load Monaco Editor:', error)
            }
        }
        loadMonaco()
    }, [])

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
        a.download = `app.${language === 'typescript' ? 'tsx' : 'jsx'}`
        a.click()
        URL.revokeObjectURL(url)
    }

    if (!isMonacoLoaded) {
        return (
            <div className="bg-gray-900 rounded-lg border border-gray-700 p-4">
                <div className="animate-pulse">
                    <div className="h-4 bg-gray-700 rounded mb-2"></div>
                    <div className="h-4 bg-gray-700 rounded mb-2 w-3/4"></div>
                    <div className="h-4 bg-gray-700 rounded mb-2 w-1/2"></div>
                </div>
            </div>
        )
    }

    return (
        <div className="relative">
            {/* Toolbar */}
            <div className="flex items-center justify-between bg-gray-800 border-b border-gray-700 px-4 py-2 rounded-t-lg">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">Language:</span>
                    <span className="text-sm font-medium text-blue-400 capitalize">{language}</span>
                </div>

                <div className="flex items-center gap-2">
                    {suggestions.length > 0 && (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowSuggestions(!showSuggestions)}
                            className="flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-xs font-medium transition-colors"
                        >
                            <Sparkles className="w-3 h-3" />
                            AI Suggestions
                        </motion.button>
                    )}

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleCopy}
                        className="p-2 text-gray-400 hover:text-white transition-colors"
                        title="Copy code"
                    >
                        <Copy className="w-4 h-4" />
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleDownload}
                        className="p-2 text-gray-400 hover:text-white transition-colors"
                        title="Download code"
                    >
                        <Download className="w-4 h-4" />
                    </motion.button>

                    {onRun && (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onRun}
                            className="flex items-center gap-1 px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-xs font-medium transition-colors"
                        >
                            <Play className="w-3 h-3" />
                            Run
                        </motion.button>
                    )}
                </div>
            </div>

            {/* Editor Container */}
            <div className="relative">
                <div
                    ref={editorRef}
                    className="h-96 bg-gray-900 rounded-b-lg overflow-hidden"
                />

                {/* AI Suggestions Panel */}
                {showSuggestions && suggestions.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute top-0 right-0 w-80 bg-gray-800 border border-gray-600 rounded-lg shadow-xl z-10"
                    >
                        <div className="p-4 border-b border-gray-600">
                            <h3 className="text-sm font-medium text-white mb-2">AI Suggestions</h3>
                            <p className="text-xs text-gray-400">Improve your code with AI-powered suggestions</p>
                        </div>
                        <div className="max-h-64 overflow-y-auto">
                            {suggestions.map((suggestion, index) => (
                                <div
                                    key={index}
                                    className="p-3 border-b border-gray-700 hover:bg-gray-700 cursor-pointer transition-colors"
                                >
                                    <p className="text-sm text-gray-300">{suggestion}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    )
} 