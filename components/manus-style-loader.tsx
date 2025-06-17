'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ManusStyleLoaderProps {
  prompt: string
}

interface LoadingStep {
  id: string
  title: string
  status: 'pending' | 'active' | 'complete'
  description: string
}

interface BrowserTab {
  title: string
  url: string
  screenshot: string
  active: boolean
}

export function ManusStyleLoader({ prompt }: ManusStyleLoaderProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [currentTabIndex, setCurrentTabIndex] = useState(0)
  const [steps, setSteps] = useState<LoadingStep[]>([
    {
      id: 'research',
      title: 'Research and planning',
      status: 'active',
      description: 'Creating todo.'
    },
    {
      id: 'design',
      title: 'Design and architecture',
      status: 'pending', 
      description: 'Analyzing design patterns and UI frameworks.'
    },
    {
      id: 'development',
      title: 'Development and implementation',
      status: 'pending',
      description: 'Building application with modern frameworks.'
    },
    {
      id: 'testing',
      title: 'Testing and optimization',
      status: 'pending',
      description: 'Ensuring performance and reliability.'
    },
    {
      id: 'deployment',
      title: 'Deployment and finalization',
      status: 'pending',
      description: 'Preparing production-ready application.'
    }
  ])

  const browserTabs: BrowserTab[] = [
    {
      title: 'React Documentation - Components',
      url: 'https://react.dev/learn/your-first-component',
      screenshot: '/screenshots/react-docs.png',
      active: false
    },
    {
      title: 'Next.js App Router Guide',
      url: 'https://nextjs.org/docs/app',
      screenshot: '/screenshots/nextjs-docs.png', 
      active: false
    },
    {
      title: 'Tailwind CSS Framework',
      url: 'https://tailwindcss.com/docs',
      screenshot: '/screenshots/tailwind-docs.png',
      active: false
    },
    {
      title: 'TypeScript Handbook',
      url: 'https://www.typescriptlang.org/docs/',
      screenshot: '/screenshots/typescript-docs.png',
      active: false
    },
    {
      title: 'Best Practices for Modern Web Apps',
      url: 'https://web.dev/learn/design/', 
      screenshot: '/screenshots/web-dev.png',
      active: false
    },
    {
      title: 'Component Design Inspiration',
      url: 'https://dribbble.com/search/web-app',
      screenshot: '/screenshots/dribbble-design.png',
      active: false
    }
  ]

  const [activeTabs, setActiveTabs] = useState<BrowserTab[]>([browserTabs[0]])

  useEffect(() => {
    const stepTimer = setInterval(() => {
      setSteps(prev => {
        const newSteps = [...prev]
        
        // Complete current step
        if (currentStepIndex < newSteps.length) {
          newSteps[currentStepIndex].status = 'complete'
          
          // Start next step
          if (currentStepIndex + 1 < newSteps.length) {
            newSteps[currentStepIndex + 1].status = 'active'
            setCurrentStepIndex(currentStepIndex + 1)
          }
        }
        
        return newSteps
      })
    }, 3000)

    return () => clearInterval(stepTimer)
  }, [currentStepIndex])

  useEffect(() => {
    const tabTimer = setInterval(() => {
      setCurrentTabIndex(prev => (prev + 1) % browserTabs.length)
      
      // Simulate opening new tabs
      setActiveTabs(prev => {
        const newTab = browserTabs[currentTabIndex]
        const updatedTabs = prev.map(tab => ({ ...tab, active: false }))
        
        // Add new tab if not already open
        if (!updatedTabs.find(tab => tab.url === newTab.url)) {
          updatedTabs.push({ ...newTab, active: true })
        } else {
          const existingTabIndex = updatedTabs.findIndex(tab => tab.url === newTab.url)
          updatedTabs[existingTabIndex].active = true
        }
        
        // Keep max 4 tabs open
        return updatedTabs.slice(-4)
      })
    }, 2000)

    return () => clearInterval(tabTimer)
  }, [currentTabIndex])

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Left Sidebar - Progress */}
      <div className="w-80 bg-gray-900 p-6 border-r border-gray-700">
        <div className="mb-8">
          <h1 className="text-xl font-semibold mb-2">Building a Modern App</h1>
          <div className="text-sm text-gray-400 bg-gray-800 rounded-lg p-3">
            <p className="text-blue-300">build a modern app</p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-medium text-white mb-4">Progress</h2>
          
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              className={`p-4 rounded-lg border ${
                step.status === 'complete' 
                  ? 'bg-green-900/20 border-green-500/30' 
                  : step.status === 'active'
                  ? 'bg-blue-900/20 border-blue-500/30'
                  : 'bg-gray-800/50 border-gray-600/30'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${
                  step.status === 'complete' 
                    ? 'bg-green-500' 
                    : step.status === 'active'
                    ? 'bg-blue-500 animate-pulse'
                    : 'bg-gray-500'
                }`} />
                <h3 className="font-medium">{step.title}</h3>
              </div>
              <p className="text-sm text-gray-400 mt-2 ml-6">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-gray-700">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span>AI is working: Research and planning</span>
          </div>
          <div className="text-xs text-gray-500 mt-1">1 / 5</div>
        </div>
      </div>

      {/* Right Side - Faux Computer Browser */}
      <div className="flex-1 p-6">
        <div className="bg-gray-900 rounded-lg overflow-hidden h-full">
          {/* Browser Header */}
          <div className="bg-gray-800 p-4 border-b border-gray-700">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="text-sm text-gray-400">AI's Computer</div>
            </div>
            
            {/* Browser Tabs */}
            <div className="flex gap-1 mb-3">
              {activeTabs.map((tab, index) => (
                <motion.div
                  key={tab.url}
                  className={`px-3 py-2 rounded-t-lg text-xs max-w-48 truncate ${
                    tab.active ? 'bg-white text-black' : 'bg-gray-700 text-gray-300'
                  }`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {tab.title}
                </motion.div>
              ))}
            </div>
            
            {/* Address Bar */}
            <div className="bg-gray-700 rounded-lg p-2 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <span className="text-green-400">🔒</span>
                <span className="text-blue-400">
                  {activeTabs.find(tab => tab.active)?.url || browserTabs[0].url}
                </span>
              </div>
            </div>
          </div>

          {/* Browser Content - Simulated Screenshots */}
          <div className="p-6 h-full bg-white text-black overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTabIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5 }}
                className="h-full"
              >
                {/* Simulated Documentation Page */}
                <div className="space-y-4">
                  <div className="h-16 bg-blue-600 rounded-lg flex items-center px-6">
                    <h1 className="text-white text-2xl font-bold">
                      {activeTabs.find(tab => tab.active)?.title.split(' - ')[0] || 'Documentation'}
                    </h1>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 h-64">
                    <div className="bg-gray-100 rounded-lg p-4">
                      <div className="h-4 bg-gray-300 rounded mb-2" />
                      <div className="h-3 bg-gray-200 rounded mb-1" />
                      <div className="h-3 bg-gray-200 rounded mb-1" />
                      <div className="h-3 bg-gray-200 rounded w-2/3" />
                    </div>
                    <div className="bg-gray-100 rounded-lg p-4">
                      <div className="h-4 bg-gray-300 rounded mb-2" />
                      <div className="h-20 bg-blue-100 rounded mb-2" />
                      <div className="h-3 bg-gray-200 rounded" />
                    </div>
                    <div className="bg-gray-100 rounded-lg p-4">
                      <div className="h-4 bg-gray-300 rounded mb-2" />
                      <div className="space-y-1">
                        <div className="h-2 bg-gray-200 rounded" />
                        <div className="h-2 bg-gray-200 rounded" />
                        <div className="h-2 bg-gray-200 rounded w-3/4" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="h-6 bg-gray-300 rounded mb-3 w-1/3" />
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded" />
                      <div className="h-3 bg-gray-200 rounded" />
                      <div className="h-3 bg-gray-200 rounded w-4/5" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}