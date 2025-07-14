'use client'

import { useState } from 'react'
import { M3Button } from '@/components/ui/m3-button'
import { M3Card, M3CardContent, M3CardHeader, M3CardTitle } from '@/components/ui/m3-card'
import { Code, Zap, Shield, TrendingUp, CheckCircle, Star } from 'lucide-react'

export default function RefactorWorking() {
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
  
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [userTier, setUserTier] = useState('free')

  const tierFeatures = {
    free: ['Code Formatting', 'Basic Optimization', 'Variable Naming'],
    pro: ['Everything in Free', 'Security Scan', 'Performance Boost', 'TypeScript Improvements'],
    enterprise: ['Everything in Pro', 'Compliance Check', 'Architecture Review', 'Team Management']
  }

  const handleRefactor = async () => {
    setLoading(true)
    setResult(null)
    
    try {
      const response = await fetch('/api/refactor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          tier: userTier,
          userID: 'demo-user'
        })
      })
      
      if (response.ok) {
        const data = await response.json()
        setResult(data)
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to refactor code')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">AI Code Refactoring</h1>
            <p className="text-muted-foreground">Transform your code with AI-powered improvements</p>
          </div>
          
          <div className="flex items-center gap-4">
            <select
              value={userTier}
              onChange={(e) => setUserTier(e.target.value)}
              className="px-4 py-2 bg-surface-container rounded-lg border border-border"
            >
              <option value="free">Free Tier</option>
              <option value="pro">Pro Tier ($29/month)</option>
              <option value="enterprise">Enterprise ($199/month)</option>
            </select>
          </div>
        </div>

        {/* Pricing Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {Object.entries(tierFeatures).map(([tier, features]) => (
            <M3Card key={tier} variant={userTier === tier ? "elevated" : "filled"} className={userTier === tier ? "ring-2 ring-primary" : ""}>
              <M3CardHeader>
                <M3CardTitle className="flex items-center gap-2 capitalize">
                  {tier === 'free' && <Code className="w-5 h-5" />}
                  {tier === 'pro' && <Star className="w-5 h-5 text-yellow-500" />}
                  {tier === 'enterprise' && <Shield className="w-5 h-5 text-purple-500" />}
                  {tier}
                </M3CardTitle>
              </M3CardHeader>
              <M3CardContent>
                <ul className="space-y-1">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-success" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </M3CardContent>
            </M3Card>
          ))}
        </div>

        {/* Code Editor */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <M3Card variant="elevated">
            <M3CardHeader>
              <M3CardTitle>Original Code</M3CardTitle>
            </M3CardHeader>
            <M3CardContent>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-80 p-4 bg-surface-container rounded-lg border border-border font-mono text-sm resize-none"
                placeholder="Enter your code here..."
              />
            </M3CardContent>
          </M3Card>

          <M3Card variant="elevated">
            <M3CardHeader>
              <M3CardTitle>Refactored Code</M3CardTitle>
            </M3CardHeader>
            <M3CardContent>
              {result ? (
                <div className="space-y-4">
                  <pre className="w-full h-64 p-4 bg-surface-container rounded-lg border border-border font-mono text-sm overflow-auto">
                    {result.data?.refactored || 'No refactored code available'}
                  </pre>
                  
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">{result.data?.improvements || 0}</div>
                      <div className="text-sm text-muted-foreground">Improvements</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-success">{Math.round((result.data?.confidence || 0) * 100)}%</div>
                      <div className="text-sm text-muted-foreground">Confidence</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-warning">{result.data?.estimated_time_saved || 0}m</div>
                      <div className="text-sm text-muted-foreground">Time Saved</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-80 flex items-center justify-center bg-surface-container rounded-lg">
                  <div className="text-center">
                    <Zap className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Refactored code will appear here</p>
                  </div>
                </div>
              )}
            </M3CardContent>
          </M3Card>
        </div>

        {/* Refactor Button */}
        <div className="flex justify-center mb-8">
          <M3Button
            variant="filled"
            size="lg"
            onClick={handleRefactor}
            disabled={loading || !code.trim()}
            className="min-w-[200px]"
          >
            {loading ? (
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
        {result && result.data?.suggestions && (
          <M3Card variant="elevated">
            <M3CardHeader>
              <M3CardTitle>AI Suggestions</M3CardTitle>
            </M3CardHeader>
            <M3CardContent>
              <div className="space-y-4">
                {result.data.suggestions.map((suggestion, index) => (
                  <div key={index} className="p-4 bg-surface-container rounded-lg border border-border/50">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${
                        suggestion.impact === 'high' ? 'bg-error/20' :
                        suggestion.impact === 'medium' ? 'bg-warning/20' :
                        'bg-success/20'
                      }`}>
                        {suggestion.impact === 'high' && <Shield className="w-4 h-4 text-error" />}
                        {suggestion.impact === 'medium' && <TrendingUp className="w-4 h-4 text-warning" />}
                        {suggestion.impact === 'low' && <CheckCircle className="w-4 h-4 text-success" />}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground mb-1">{suggestion.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{suggestion.description}</p>
                        <div className="flex items-center gap-4 text-xs">
                          <span className={`px-2 py-1 rounded ${
                            suggestion.impact === 'high' ? 'bg-error/20 text-error' :
                            suggestion.impact === 'medium' ? 'bg-warning/20 text-warning' :
                            'bg-success/20 text-success'
                          }`}>
                            {suggestion.impact.toUpperCase()} IMPACT
                          </span>
                          <span className="text-muted-foreground">💡 {suggestion.savings}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </M3CardContent>
          </M3Card>
        )}
      </div>
    </div>
  )
}