'use client'

import { useState } from 'react'
import { FragmentSchema } from '@/lib/schema'
import { motion } from 'framer-motion'

interface AppPreviewProps {
  fragment: FragmentSchema | null
  sandboxData: any
  prompt: string
}

export function AppPreview({ fragment, sandboxData, prompt }: AppPreviewProps) {
  const [deploymentMode, setDeploymentMode] = useState<'preview' | 'deploy'>('preview')

  const handleDeployToE2B = async () => {
    try {
      // Create E2B deployment
      const response = await fetch('/api/deploy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sandboxId: sandboxData?.sbxId,
          fragment: fragment
        })
      })

      if (response.ok) {
        const deployResult = await response.json()
        window.open(deployResult.url, '_blank')
      }
    } catch (error) {
      console.error('Deployment failed:', error)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-gray-800 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-blue-400">
                {fragment?.title || 'Generated App'}
              </h1>
              <p className="text-gray-400 mt-1">
                {fragment?.description || 'Your custom application'}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDeployToE2B}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-medium transition-colors"
              >
                Deploy to E2B 🚀
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.history.back()}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-colors"
              >
                Create New App
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - App Details */}
          <div className="space-y-6">
            {/* Project Info */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-4 text-blue-400">Project Details</h3>
              
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-400">Original Prompt</label>
                  <p className="text-white mt-1 bg-gray-800 rounded-lg p-3 text-sm">
                    {prompt}
                  </p>
                </div>
                
                <div>
                  <label className="text-sm text-gray-400">Template</label>
                  <p className="text-white mt-1">{fragment?.template}</p>
                </div>
                
                <div>
                  <label className="text-sm text-gray-400">Port</label>
                  <p className="text-white mt-1">{fragment?.port || 'N/A'}</p>
                </div>
                
                <div>
                  <label className="text-sm text-gray-400">File Path</label>
                  <p className="text-white mt-1 font-mono text-sm bg-gray-800 rounded px-2 py-1">
                    {fragment?.file_path}
                  </p>
                </div>
              </div>
            </div>

            {/* Dependencies */}
            {fragment?.has_additional_dependencies && (
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-semibold mb-4 text-blue-400">Dependencies</h3>
                <div className="space-y-2">
                  {fragment.additional_dependencies.map((dep, index) => (
                    <div
                      key={index}
                      className="px-3 py-2 bg-gray-800 rounded-lg text-sm font-mono"
                    >
                      {dep}
                    </div>
                  ))}
                </div>
                
                <div className="mt-4">
                  <label className="text-sm text-gray-400">Install Command</label>
                  <p className="text-white mt-1 font-mono text-sm bg-gray-800 rounded px-3 py-2">
                    {fragment.install_dependencies_command}
                  </p>
                </div>
              </div>
            )}

            {/* Sandbox Info */}
            {sandboxData && (
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-semibold mb-4 text-green-400">Live Sandbox</h3>
                <div className="space-y-2">
                  <div>
                    <label className="text-sm text-gray-400">Sandbox ID</label>
                    <p className="text-white mt-1 font-mono text-sm">{sandboxData.sbxId}</p>
                  </div>
                  
                  {sandboxData.url && (
                    <div>
                      <label className="text-sm text-gray-400">Live URL</label>
                      <a
                        href={sandboxData.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 mt-1 block text-sm underline"
                      >
                        {sandboxData.url}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Preview */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden">
              <div className="border-b border-gray-700 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-blue-400">Live Preview</h3>
                  
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="text-sm text-gray-400">Running</span>
                  </div>
                </div>
              </div>
              
              {/* Preview Frame */}
              <div className="relative" style={{ height: '600px' }}>
                {sandboxData?.url ? (
                  <iframe
                    src={sandboxData.url}
                    className="w-full h-full border-0"
                    title="App Preview"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-800">
                    <div className="text-center">
                      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                      <p className="text-gray-400">Preparing preview...</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Code View */}
            <div className="mt-6 bg-gray-900 rounded-xl border border-gray-700 overflow-hidden">
              <div className="border-b border-gray-700 p-4">
                <h3 className="text-lg font-semibold text-blue-400">Generated Code</h3>
              </div>
              
              <div className="p-4">
                <pre className="text-sm text-gray-300 overflow-x-auto bg-black rounded-lg p-4">
                  <code>{fragment?.code}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}