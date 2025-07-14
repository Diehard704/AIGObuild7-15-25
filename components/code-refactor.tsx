'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { M3Button } from '@/components/ui/m3-button'
import { M3Card, M3CardContent, M3CardHeader, M3CardTitle } from '@/components/ui/m3-card'
import {
  Code,
  Zap,
  Shield,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Clock,
  CreditCard,
  Star,
  Lock,
  Copy,
  Download,
  Eye,
  EyeOff,
  Sparkles,
  Trophy,
  Target,
  Gauge
} from 'lucide-react'
import dynamic from 'next/dynamic'

// Dynamically import Monaco Editor
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-64 bg-surface-container flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
        <p className="text-sm text-muted-foreground">Loading editor...</p>
      </div>
    </div>
  )
})

interface RefactorResult {
  original: string
  refactored: string
  suggestions: Array<{
    type: string
    title: string
    description: string
    impact: 'low' | 'medium' | 'high'
    savings: string
  }>
  improvements: number
  confidence: number
  estimated_time_saved: number
}

interface CodeRefactorProps {
  userTier?: 'free' | 'pro' | 'enterprise'
  userCredits?: number
  onUpgrade?: () => void
}

export function CodeRefactor({ 
  userTier = 'free', 
  userCredits = 5,
  onUpgrade 
}: CodeRefactorProps) {
  const [code, setCode] = useState(`import React, { useState, useEffect } from 'react'

function UserProfile({ userId }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    fetchUser(userId).then(data => {
      setUser(data)
      setLoading(false)
    })
  }, [userId])
  
  if (loading) return <div>Loading...</div>
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  )
}`)
  
  const [language, setLanguage] = useState('typescript')
  const [isRefactoring, setIsRefactoring] = useState(false)
  const [result, setResult] = useState<RefactorResult | null>(null)
  const [showOriginal, setShowOriginal] = useState(false)
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])

  const tierFeatures = {
    free: [
      { id: 'formatting', name: 'Code Formatting', icon: Code, available: true },
      { id: 'basic_optimization', name: 'Basic Optimization', icon: Zap, available: true },
      { id: 'variable_naming', name: 'Variable Naming', icon: Target, available: true },
      { id: 'security_scan', name: 'Security Scan', icon: Shield, available: false },
      { id: 'performance_boost', name: 'Performance Boost', icon: TrendingUp, available: false },
      { id: 'type_improvements', name: 'TypeScript Improvements', icon: CheckCircle, available: false }
    ],
    pro: [
      { id: 'formatting', name: 'Code Formatting', icon: Code, available: true },
      { id: 'basic_optimization', name: 'Basic Optimization', icon: Zap, available: true },
      { id: 'variable_naming', name: 'Variable Naming', icon: Target, available: true },
      { id: 'security_scan', name: 'Security Scan', icon: Shield, available: true },
      { id: 'performance_boost', name: 'Performance Boost', icon: TrendingUp, available: true },
      { id: 'type_improvements', name: 'TypeScript Improvements', icon: CheckCircle, available: true },
      { id: 'error_handling', name: 'Error Handling', icon: AlertCircle, available: true },
      { id: 'code_splitting', name: 'Code Splitting', icon: Sparkles, available: true }
    ],
    enterprise: [
      { id: 'formatting', name: 'Code Formatting', icon: Code, available: true },
      { id: 'basic_optimization', name: 'Basic Optimization', icon: Zap, available: true },
      { id: 'variable_naming', name: 'Variable Naming', icon: Target, available: true },
      { id: 'security_scan', name: 'Security Scan', icon: Shield, available: true },
      { id: 'performance_boost', name: 'Performance Boost', icon: TrendingUp, available: true },
      { id: 'type_improvements', name: 'TypeScript Improvements', icon: CheckCircle, available: true },
      { id: 'error_handling', name: 'Error Handling', icon: AlertCircle, available: true },
      { id: 'code_splitting', name: 'Code Splitting', icon: Sparkles, available: true },
      { id: 'compliance_check', name: 'Compliance Check', icon: Shield, available: true },
      { id: 'architecture_review', name: 'Architecture Review', icon: Trophy, available: true },
      { id: 'documentation_gen', name: 'Documentation Gen', icon: Code, available: true }
    ]
  }

  const handleRefactor = useCallback(async () => {
    if (!code.trim()) return
    
    setIsRefactoring(true)
    setResult(null)
    
    try {
      const response = await fetch('/api/refactor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          language,
          tier: userTier,
          features: selectedFeatures,
          userID: 'demo-user'
        })
      })
      
      if (!response.ok) {
        if (response.status === 402) {
          throw new Error('Insufficient credits. Please upgrade your plan.')
        }
        throw new Error('Failed to refactor code')
      }
      
      const data = await response.json()
      setResult(data.data)
      
    } catch (error) {
      console.error('Refactoring error:', error)
      alert(error instanceof Error ? error.message : 'Failed to refactor code')
    } finally {
      setIsRefactoring(false)
    }
  }, [code, language, userTier, selectedFeatures])

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      // Show success toast
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-error'
      case 'medium': return 'text-warning'
      case 'low': return 'text-success'
      default: return 'text-muted-foreground'
    }
  }

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case 'high': return AlertCircle
      case 'medium': return Clock
      case 'low': return CheckCircle
      default: return CheckCircle
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="m3-headline-large font-bold text-foreground">AI Code Refactoring</h2>
          <p className="m3-body-large text-muted-foreground">
            Improve your code quality with AI-powered suggestions
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="m3-body-small text-muted-foreground">Current Plan</p>
            <p className="m3-title-medium font-semibold text-foreground capitalize">{userTier}</p>
          </div>
          
          {userTier === 'free' && (
            <M3Button
              variant="filled"
              size="sm"
              onClick={onUpgrade}
              className="bg-gradient-to-r from-primary to-secondary"
            >
              <Star className="w-4 h-4 mr-1" />
              Upgrade
            </M3Button>
          )}
        </div>
      </div>

      {/* Pricing Banner */}
      {userTier === 'free' && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-lg p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="m3-title-medium font-semibold text-foreground">
                Unlock Advanced Refactoring
              </h3>
              <p className="m3-body-small text-muted-foreground">
                Get security scans, performance optimizations, and more with Pro
              </p>
            </div>
            <M3Button variant="filled" size="sm" onClick={onUpgrade}>
              Upgrade to Pro - $29/month
            </M3Button>
          </div>
        </motion.div>
      )}

      {/* Features Selection */}
      <M3Card variant="elevated">
        <M3CardHeader>
          <M3CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Refactoring Features
          </M3CardTitle>
        </M3CardHeader>
        <M3CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tierFeatures[userTier].map((feature) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.id}
                  className={`p-4 rounded-lg border transition-all ${
                    feature.available
                      ? 'border-border hover:border-primary cursor-pointer'
                      : 'border-border/50 opacity-50 cursor-not-allowed'
                  }`}
                  onClick={() => {
                    if (feature.available) {
                      setSelectedFeatures(prev => 
                        prev.includes(feature.id) 
                          ? prev.filter(f => f !== feature.id)
                          : [...prev, feature.id]
                      )
                    }
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      feature.available ? 'bg-primary/20' : 'bg-muted/20'
                    }`}>
                      <Icon className={`w-4 h-4 ${
                        feature.available ? 'text-primary' : 'text-muted-foreground'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="m3-title-small font-semibold text-foreground">
                        {feature.name}
                      </h4>
                      {!feature.available && (
                        <div className="flex items-center gap-1 mt-1">
                          <Lock className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {userTier === 'free' ? 'Pro' : 'Enterprise'} only
                          </span>
                        </div>
                      )}
                    </div>
                    {feature.available && selectedFeatures.includes(feature.id) && (
                      <CheckCircle className="w-4 h-4 text-success" />
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </M3CardContent>
      </M3Card>

      {/* Code Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <M3Card variant="elevated">
          <M3CardHeader>
            <M3CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Code className="w-5 h-5" />
                Original Code
              </span>
              <div className="flex items-center gap-2">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="px-3 py-1 bg-surface-container rounded text-sm"
                >
                  <option value="typescript">TypeScript</option>
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                </select>
              </div>
            </M3CardTitle>
          </M3CardHeader>
          <M3CardContent className="p-0">
            <MonacoEditor
              height="400px"
              language={language}
              value={code}
              onChange={(value) => setCode(value || '')}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                roundedSelection: false,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                theme: 'vs-dark'
              }}
            />
          </M3CardContent>
        </M3Card>

        {/* Refactored Code */}
        <M3Card variant="elevated">
          <M3CardHeader>
            <M3CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                Refactored Code
              </span>
              {result && (
                <div className="flex items-center gap-2">
                  <M3Button
                    variant="outlined"
                    size="sm"
                    onClick={() => setShowOriginal(!showOriginal)}
                  >
                    {showOriginal ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    {showOriginal ? 'Hide' : 'Compare'}
                  </M3Button>
                  <M3Button
                    variant="outlined"
                    size="sm"
                    onClick={() => handleCopy(result.refactored)}
                  >
                    <Copy className="w-4 h-4" />
                    Copy
                  </M3Button>
                </div>
              )}
            </M3CardTitle>
          </M3CardHeader>
          <M3CardContent className="p-0">
            {result ? (
              <MonacoEditor
                height="400px"
                language={language}
                value={showOriginal ? result.original : result.refactored}
                options={{
                  readOnly: true,
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  roundedSelection: false,
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  theme: 'vs-dark'
                }}
              />
            ) : (
              <div className="h-[400px] flex items-center justify-center bg-surface-container">
                <div className="text-center">
                  <Zap className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="m3-body-medium text-muted-foreground">
                    Refactored code will appear here
                  </p>
                </div>
              </div>
            )}
          </M3CardContent>
        </M3Card>
      </div>

      {/* Refactor Button */}
      <div className="flex justify-center">
        <M3Button
          variant="filled"
          size="lg"
          onClick={handleRefactor}
          disabled={isRefactoring || !code.trim()}
          className="min-w-[200px]"
        >
          {isRefactoring ? (
            <>
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
              Refactoring...
            </>
          ) : (
            <>
              <Zap className="w-4 h-4 mr-2" />
              Refactor Code
            </>
          )}
        </M3Button>
      </div>

      {/* Results */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <M3Card variant="filled">
                <M3CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {result.improvements}
                  </div>
                  <div className="text-sm text-muted-foreground">Improvements</div>
                </M3CardContent>
              </M3Card>
              
              <M3Card variant="filled">
                <M3CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-success mb-1">
                    {Math.round(result.confidence * 100)}%
                  </div>
                  <div className="text-sm text-muted-foreground">Confidence</div>
                </M3CardContent>
              </M3Card>
              
              <M3Card variant="filled">
                <M3CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-warning mb-1">
                    {result.estimated_time_saved}m
                  </div>
                  <div className="text-sm text-muted-foreground">Time Saved</div>
                </M3CardContent>
              </M3Card>
            </div>

            {/* Suggestions */}
            <M3Card variant="elevated">
              <M3CardHeader>
                <M3CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Refactoring Suggestions
                </M3CardTitle>
              </M3CardHeader>
              <M3CardContent>
                <div className="space-y-4">
                  {result.suggestions.map((suggestion, index) => {
                    const ImpactIcon = getImpactIcon(suggestion.impact)
                    return (
                      <div
                        key={index}
                        className="p-4 bg-surface-container rounded-lg border border-border/50"
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-primary/20 rounded-lg">
                            <ImpactIcon className={`w-4 h-4 ${getImpactColor(suggestion.impact)}`} />
                          </div>
                          <div className="flex-1">
                            <h4 className="m3-title-small font-semibold text-foreground mb-1">
                              {suggestion.title}
                            </h4>
                            <p className="m3-body-small text-muted-foreground mb-2">
                              {suggestion.description}
                            </p>
                            <div className="flex items-center gap-4 text-xs">
                              <span className={`px-2 py-1 rounded ${
                                suggestion.impact === 'high' ? 'bg-error/20 text-error' :
                                suggestion.impact === 'medium' ? 'bg-warning/20 text-warning' :
                                'bg-success/20 text-success'
                              }`}>
                                {suggestion.impact.toUpperCase()} IMPACT
                              </span>
                              <span className="text-muted-foreground">
                                💡 {suggestion.savings}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </M3CardContent>
            </M3Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}