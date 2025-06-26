'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FragmentSchema } from '@/lib/schema'
import { AppPreview } from '@/components/app-preview'
import { Loader2, RefreshCw, AlertCircle } from 'lucide-react'

export default function GeneratePage() {
    const searchParams = useSearchParams()
    const prompt = searchParams.get('prompt')
    const [currentPhase, setCurrentPhase] = useState<'loading' | 'preview' | 'error'>('loading')
    const [fragment, setFragment] = useState<FragmentSchema | null>(null)
    const [sandboxData, setSandboxData] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        if (prompt) {
            generateApp(prompt)
        }
    }, [prompt])

    const generateApp = async (userPrompt: string) => {
        try {
            setCurrentPhase('loading')
            setProgress(0)
            setError(null)

            // Simulate progress
            const progressInterval = setInterval(() => {
                setProgress(prev => Math.min(prev + Math.random() * 15, 90))
            }, 500)

            // Phase 1: Generate fragment via Claude 3.5 Sonnet API
            const chatResponse = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [
                        { role: 'user', content: userPrompt }
                    ],
                    userID: 'anonymous',
                    teamID: undefined,
                    template: 'nextjs-developer'
                })
            })

            if (!chatResponse.ok) {
                const errorText = await chatResponse.text()
                throw new Error(`Claude API Error: ${chatResponse.status} - ${errorText}`)
            }

            setProgress(50)

            // Parse streaming response from Claude 3.5 Sonnet
            const reader = chatResponse.body?.getReader()
            const decoder = new TextDecoder()
            let accumulatedData = ''
            let parsedFragment: FragmentSchema | null = null

            if (reader) {
                while (true) {
                    const { done, value } = await reader.read()
                    if (done) break

                    const chunk = decoder.decode(value, { stream: true })
                    accumulatedData += chunk

                    // Parse Claude streaming object format
                    const lines = accumulatedData.split('\n')
                    for (const line of lines) {
                        if (line.trim().startsWith('0:')) {
                            try {
                                const jsonStr = line.substring(2).trim()
                                if (jsonStr && jsonStr !== '{}') {
                                    const parsed = JSON.parse(jsonStr)
                                    if (parsed.object && typeof parsed.object === 'object') {
                                        parsedFragment = parsed.object as FragmentSchema
                                    }
                                }
                            } catch (parseError) {
                                console.log('Parsing Claude response chunk:', parseError)
                            }
                        }
                    }
                }
            }

            // Fallback parsing for direct Claude response
            if (!parsedFragment && accumulatedData) {
                try {
                    const fallbackParsed = JSON.parse(accumulatedData)
                    if (fallbackParsed.object) {
                        parsedFragment = fallbackParsed.object as FragmentSchema
                    } else if (fallbackParsed.code || fallbackParsed.title) {
                        parsedFragment = fallbackParsed as FragmentSchema
                    }
                } catch (error) {
                    console.error('Claude response parsing failed:', error)
                }
            }

            if (!parsedFragment) {
                throw new Error('Failed to parse fragment from Claude 3.5 Sonnet response')
            }

            setFragment(parsedFragment)
            setProgress(75)

            // Phase 2: Create E2B sandbox for preview
            const sandboxResponse = await fetch('/api/sandbox', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fragment: parsedFragment,
                    userID: 'anonymous',
                    teamID: undefined,
                    accessToken: undefined
                })
            })

            if (!sandboxResponse.ok) {
                const sandboxError = await sandboxResponse.text()
                throw new Error(`E2B Sandbox Error: ${sandboxResponse.status} - ${sandboxError}`)
            }

            const sandboxResult = await sandboxResponse.json()
            setSandboxData(sandboxResult)
            setProgress(100)
            clearInterval(progressInterval)
            setCurrentPhase('preview')

        } catch (err) {
            console.error('Claude 3.5 Sonnet app generation error:', err)
            setError(err instanceof Error ? err.message : 'Failed to generate app with Claude 3.5 Sonnet')
            setCurrentPhase('error')
        }
    }

    if (currentPhase === 'loading') {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black text-white">
                <div className="text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mb-8"
                    >
                        <Loader2 className="w-16 h-16 text-blue-400 animate-spin mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-white mb-2">Generating your app...</h2>
                        <p className="text-gray-400">This may take a few moments</p>
                    </motion.div>

                    {/* Progress Bar */}
                    <div className="w-80 bg-gray-800 rounded-full h-2 mb-4">
                        <motion.div
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>

                    <p className="text-sm text-gray-500">{Math.round(progress)}% complete</p>
                </div>
            </div>
        )
    }

    if (currentPhase === 'error') {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center max-w-md mx-auto p-8"
                >
                    <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-white mb-4">Generation Failed</h2>
                    <p className="text-gray-400 mb-6">{error}</p>

                    <div className="space-y-3">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => prompt && generateApp(prompt)}
                            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                        >
                            <RefreshCw className="w-4 h-4" />
                            Try Again
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => window.history.back()}
                            className="w-full px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                        >
                            Go Back
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-black">
            <AppPreview
                fragment={fragment}
                sandboxData={sandboxData}
                prompt={prompt || ''}
            />
        </div>
    )
} 