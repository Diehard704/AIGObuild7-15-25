'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { M3Button } from '@/components/ui/m3-button'
import { M3Card, M3CardContent, M3CardHeader, M3CardTitle } from '@/components/ui/m3-card'
import {
  Eye,
  EyeOff,
  Smartphone,
  Tablet,
  Monitor,
  Maximize2,
  Minimize2,
  RotateCcw,
  ExternalLink,
  Code,
  Zap,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Clock,
  Globe,
  Rocket,
  Settings,
  Play,
  Pause,
  Volume2,
  VolumeX
} from 'lucide-react'

interface LivePreviewProps {
  generatedApp: {
    id: string
    name: string
    description: string
    template: string
    status: string
    previewUrl?: string
    deploymentUrl?: string
    fragment?: {
      code: string
      html?: string
      css?: string
      js?: string
    }
    sandboxId?: string
  } | null
  isGenerating: boolean
  onDeploy?: () => void
  onEdit?: () => void
}

type DeviceType = 'mobile' | 'tablet' | 'desktop'
type ViewMode = 'preview' | 'code' | 'split'

export function LivePreview({ 
  generatedApp, 
  isGenerating, 
  onDeploy, 
  onEdit 
}: LivePreviewProps) {
  const [device, setDevice] = useState<DeviceType>('desktop')
  const [viewMode, setViewMode] = useState<ViewMode>('preview')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isInteractive, setIsInteractive] = useState(true)
  const [previewError, setPreviewError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [previewContent, setPreviewContent] = useState<string>('')

  // Device dimensions
  const deviceDimensions = {
    mobile: { width: 375, height: 667, icon: Smartphone },
    tablet: { width: 768, height: 1024, icon: Tablet },
    desktop: { width: 1400, height: 900, icon: Monitor }
  }

  // Generate preview content from the app data
  useEffect(() => {
    if (generatedApp?.fragment) {
      const { code, html, css, js } = generatedApp.fragment
      
      // Create a complete HTML document for preview
      const fullHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${generatedApp.name}</title>
          <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
          <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
          <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            body {
              margin: 0;
              padding: 0;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
              background: #f8fafc;
            }
            .container {
              max-width: 1200px;
              margin: 0 auto;
              padding: 20px;
            }
            .hero-section {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 80px 20px;
              text-align: center;
              margin-bottom: 40px;
            }
            .hero-title {
              font-size: 3rem;
              font-weight: bold;
              margin-bottom: 20px;
              text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            }
            .hero-subtitle {
              font-size: 1.2rem;
              margin-bottom: 30px;
              opacity: 0.9;
            }
            .cta-button {
              background: #ffffff;
              color: #667eea;
              padding: 15px 30px;
              border-radius: 30px;
              font-weight: bold;
              text-decoration: none;
              display: inline-block;
              transition: all 0.3s ease;
              box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            }
            .cta-button:hover {
              transform: translateY(-2px);
              box-shadow: 0 6px 20px rgba(0,0,0,0.3);
            }
            .features-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
              gap: 30px;
              margin: 60px 0;
            }
            .feature-card {
              background: white;
              padding: 30px;
              border-radius: 15px;
              box-shadow: 0 5px 15px rgba(0,0,0,0.1);
              text-align: center;
              transition: transform 0.3s ease;
            }
            .feature-card:hover {
              transform: translateY(-5px);
            }
            .feature-icon {
              width: 60px;
              height: 60px;
              background: linear-gradient(135deg, #667eea, #764ba2);
              border-radius: 50%;
              margin: 0 auto 20px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 24px;
              color: white;
            }
            .feature-title {
              font-size: 1.5rem;
              font-weight: bold;
              margin-bottom: 15px;
              color: #2d3748;
            }
            .feature-description {
              color: #718096;
              line-height: 1.6;
            }
            .footer {
              background: #2d3748;
              color: white;
              padding: 40px 20px;
              text-align: center;
              margin-top: 60px;
            }
            ${css || ''}
          </style>
        </head>
        <body>
          <div id="root">
            <!-- Hero Section -->
            <section class="hero-section">
              <div class="container">
                <h1 class="hero-title">${generatedApp.name}</h1>
                <p class="hero-subtitle">${generatedApp.description}</p>
                <a href="#features" class="cta-button">Get Started</a>
              </div>
            </section>

            <!-- Features Section -->
            <section id="features" class="container">
              <div class="features-grid">
                <div class="feature-card">
                  <div class="feature-icon">🚀</div>
                  <h3 class="feature-title">Fast & Reliable</h3>
                  <p class="feature-description">Built with modern technologies for optimal performance and reliability.</p>
                </div>
                <div class="feature-card">
                  <div class="feature-icon">⚡</div>
                  <h3 class="feature-title">Lightning Fast</h3>
                  <p class="feature-description">Optimized for speed with instant loading and smooth interactions.</p>
                </div>
                <div class="feature-card">
                  <div class="feature-icon">🎨</div>
                  <h3 class="feature-title">Beautiful Design</h3>
                  <p class="feature-description">Stunning visuals and user experience that converts visitors.</p>
                </div>
              </div>
            </section>

            <!-- Footer -->
            <footer class="footer">
              <div class="container">
                <p>&copy; 2024 ${generatedApp.name}. Built with AI-powered tools.</p>
              </div>
            </footer>
          </div>

          <script>
            // Add some interactive elements
            document.addEventListener('DOMContentLoaded', function() {
              const ctaButton = document.querySelector('.cta-button');
              const featureCards = document.querySelectorAll('.feature-card');
              
              // Smooth scrolling for CTA
              ctaButton.addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelector('#features').scrollIntoView({ 
                  behavior: 'smooth' 
                });
              });

              // Add click animations to feature cards
              featureCards.forEach(card => {
                card.addEventListener('click', function() {
                  this.style.transform = 'scale(0.95)';
                  setTimeout(() => {
                    this.style.transform = 'translateY(-5px)';
                  }, 150);
                });
              });

              // Add some dynamic content
              const heroTitle = document.querySelector('.hero-title');
              if (heroTitle) {
                heroTitle.style.animation = 'fadeInUp 1s ease-out';
              }
            });

            // Custom JavaScript from generated app
            ${js || ''}
          </script>

          <style>
            @keyframes fadeInUp {
              from {
                opacity: 0;
                transform: translateY(30px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          </style>
        </body>
        </html>
      `
      
      setPreviewContent(fullHtml)
      setPreviewError(null)
    }
  }, [generatedApp])

  // Load preview content into iframe
  useEffect(() => {
    if (previewContent && iframeRef.current) {
      setIsLoading(true)
      const iframe = iframeRef.current
      
      try {
        const blob = new Blob([previewContent], { type: 'text/html' })
        const url = URL.createObjectURL(blob)
        iframe.src = url
        
        iframe.onload = () => {
          setIsLoading(false)
          URL.revokeObjectURL(url)
        }
        
        iframe.onerror = () => {
          setIsLoading(false)
          setPreviewError('Failed to load preview')
        }
      } catch (error) {
        setIsLoading(false)
        setPreviewError('Error creating preview')
      }
    }
  }, [previewContent])

  const getCurrentDimensions = () => {
    const dim = deviceDimensions[device]
    return {
      width: isFullscreen ? '100%' : `${dim.width}px`,
      height: isFullscreen ? '100vh' : `${dim.height}px`
    }
  }

  const handleRefresh = () => {
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src
    }
  }

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const handleExternalOpen = () => {
    if (generatedApp?.previewUrl) {
      window.open(generatedApp.previewUrl, '_blank')
    }
  }

  if (isGenerating) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-medium text-foreground">Generating your app...</p>
          <p className="text-sm text-muted-foreground">This may take a few moments</p>
        </div>
      </div>
    )
  }

  if (!generatedApp) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <Eye className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-lg font-medium text-foreground">No Preview Available</p>
          <p className="text-sm text-muted-foreground">Generate an app to see the preview</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      {/* Preview Controls */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-surface-container">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-surface rounded-lg p-1">
            {Object.entries(deviceDimensions).map(([key, { icon: Icon }]) => (
              <button
                key={key}
                onClick={() => setDevice(key as DeviceType)}
                className={`p-2 rounded-md transition-colors ${
                  device === key 
                    ? 'bg-primary text-primary-foreground' 
                    : 'hover:bg-surface-container'
                }`}
              >
                <Icon className="w-4 h-4" />
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-1 bg-surface rounded-lg p-1">
            <button
              onClick={() => setViewMode('preview')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                viewMode === 'preview' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-surface-container'
              }`}
            >
              Preview
            </button>
            <button
              onClick={() => setViewMode('code')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                viewMode === 'code' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-surface-container'
              }`}
            >
              Code
            </button>
            <button
              onClick={() => setViewMode('split')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                viewMode === 'split' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-surface-container'
              }`}
            >
              Split
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsInteractive(!isInteractive)}
            className="p-2 rounded-md hover:bg-surface-container transition-colors"
            title={isInteractive ? 'Disable interactions' : 'Enable interactions'}
          >
            {isInteractive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
          
          <button
            onClick={handleRefresh}
            className="p-2 rounded-md hover:bg-surface-container transition-colors"
            title="Refresh preview"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          
          <button
            onClick={handleFullscreen}
            className="p-2 rounded-md hover:bg-surface-container transition-colors"
            title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          
          <button
            onClick={handleExternalOpen}
            className="p-2 rounded-md hover:bg-surface-container transition-colors"
            title="Open in new tab"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 flex overflow-hidden">
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'w-1/2' : 'w-full'} flex items-center justify-center p-4 bg-slate-100`}>
            <div 
              className="bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300"
              style={getCurrentDimensions()}
            >
              {previewError ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <AlertCircle className="w-16 h-16 text-error mx-auto mb-4" />
                    <p className="text-lg font-medium text-foreground">Preview Error</p>
                    <p className="text-sm text-muted-foreground">{previewError}</p>
                    <M3Button
                      variant="outlined"
                      size="sm"
                      onClick={handleRefresh}
                      className="mt-4"
                    >
                      Try Again
                    </M3Button>
                  </div>
                </div>
              ) : (
                <div className="relative h-full">
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/90 z-10">
                      <div className="text-center">
                        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                        <p className="text-sm text-muted-foreground">Loading preview...</p>
                      </div>
                    </div>
                  )}
                  
                  <iframe
                    ref={iframeRef}
                    className="w-full h-full border-0"
                    sandbox={isInteractive ? "allow-scripts allow-same-origin" : "allow-same-origin"}
                    title="App Preview"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {(viewMode === 'code' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'w-1/2 border-l border-border' : 'w-full'} flex flex-col`}>
            <div className="flex items-center justify-between p-4 border-b border-border bg-surface-container">
              <h3 className="font-medium text-foreground">Generated Code</h3>
              <M3Button
                variant="outlined"
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(generatedApp.fragment?.code || '')
                  alert('Code copied to clipboard!')
                }}
              >
                <Code className="w-4 h-4 mr-2" />
                Copy Code
              </M3Button>
            </div>
            
            <div className="flex-1 overflow-auto">
              <pre className="p-4 text-sm font-mono text-foreground bg-surface-container h-full overflow-auto">
                {generatedApp.fragment?.code || 'No code available'}
              </pre>
            </div>
          </div>
        )}
      </div>

      {/* Preview Actions */}
      <div className="p-4 border-t border-border bg-surface-container">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-success" />
              <span className="text-sm text-foreground">Preview Ready</span>
            </div>
            <div className="text-sm text-muted-foreground">
              {device} • {deviceDimensions[device].width}×{deviceDimensions[device].height}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {onEdit && (
              <M3Button
                variant="outlined"
                size="sm"
                onClick={onEdit}
              >
                <Settings className="w-4 h-4 mr-2" />
                Edit App
              </M3Button>
            )}
            
            {onDeploy && (
              <M3Button
                variant="filled"
                size="sm"
                onClick={onDeploy}
              >
                <Rocket className="w-4 h-4 mr-2" />
                Deploy App
              </M3Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}