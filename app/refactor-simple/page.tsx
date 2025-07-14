'use client'

import { useState } from 'react'

export default function RefactorSimple() {
  const [code, setCode] = useState('console.log("hello world")')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleRefactor = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/refactor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          tier: 'free'
        })
      })
      
      if (response.ok) {
        const data = await response.json()
        setResult(data)
      } else {
        throw new Error('Failed to refactor')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">AI Code Refactoring - Simple Version</h1>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Enter your code:</label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-32 p-4 border border-gray-300 rounded-lg font-mono text-sm"
            placeholder="Enter your code here..."
          />
        </div>

        <button
          onClick={handleRefactor}
          disabled={loading || !code.trim()}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Refactoring...' : 'Refactor Code'}
        </button>

        {result && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Refactoring Results:</h2>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Refactored Code:</h3>
              <pre className="bg-white p-3 rounded border font-mono text-sm overflow-x-auto">
                {result.data?.refactored || 'No refactored code available'}
              </pre>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Suggestions:</h3>
              {result.data?.suggestions?.map((suggestion, index) => (
                <div key={index} className="mb-2 p-2 bg-white rounded">
                  <p className="font-medium">{suggestion.title}</p>
                  <p className="text-sm text-gray-600">{suggestion.description}</p>
                  <p className="text-xs text-gray-500">Impact: {suggestion.impact}</p>
                </div>
              )) || <p>No suggestions available</p>}
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Stats:</h3>
              <p>Improvements: {result.data?.improvements || 0}</p>
              <p>Confidence: {Math.round((result.data?.confidence || 0) * 100)}%</p>
              <p>Time Saved: {result.data?.estimated_time_saved || 0} minutes</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}