'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { FragmentSchema } from '@/lib/schema'
import { ManusStyleLoader } from '@/components/manus-style-loader'
import { AppPreview } from '@/components/app-preview'

export default function BuildPage() {
  const searchParams = useSearchParams()
  const prompt = searchParams.get('prompt')
  const [currentPhase, setCurrentPhase] = useState<'loading' | 'preview' | 'error'>('loading')
  const [fragment, setFragment] = useState<FragmentSchema | null>(null)
  const [sandboxData, setSandboxData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (prompt) {
      generateApp(prompt)
    }
  }, [prompt])

  const generateApp = async (userPrompt: string) => {
    try {
      setCurrentPhase('loading')
      
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
      setCurrentPhase('preview')

    } catch (err) {
      console.error('Claude 3.5 Sonnet app generation error:', err)
      setError(err instanceof Error ? err.message : 'Failed to generate app with Claude 3.5 Sonnet')
      setCurrentPhase('error')
    }
  }

  if (currentPhase === 'loading') {
    return <ManusStyleLoader prompt={prompt || ''} />
  }

  if (currentPhase === 'error') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-red-400 text-center">
          <h2 className="text-2xl mb-4">Generation Failed</h2>
          <p>{error}</p>
          <button 
            onClick={() => window.history.back()}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
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