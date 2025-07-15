'use client'

import { useState } from 'react'
import { signIn, getSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import { M3Button } from '@/components/ui/m3-button'
import { M3Card, M3CardContent, M3CardHeader, M3CardTitle } from '@/components/ui/m3-card'
import { 
  LogIn, 
  Sparkles, 
  Rocket, 
  Shield, 
  Star,
  CheckCircle,
  ArrowRight 
} from 'lucide-react'

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    try {
      const result = await signIn('google', { 
        callbackUrl: '/dashboard',
        redirect: false 
      })
      
      if (result?.error) {
        console.error('Sign in error:', result.error)
      } else {
        // Check if sign in was successful
        const session = await getSession()
        if (session) {
          window.location.href = '/dashboard'
        }
      }
    } catch (error) {
      console.error('Sign in error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const benefits = [
    {
      icon: Rocket,
      title: 'Unlimited AI Generations',
      description: 'Create as many websites as you need'
    },
    {
      icon: Shield,
      title: 'Premium Templates',
      description: 'Access to exclusive design templates'
    },
    {
      icon: Star,
      title: 'Priority Support',
      description: 'Get help when you need it most'
    },
    {
      icon: CheckCircle,
      title: 'Advanced Features',
      description: 'Unlock powerful customization tools'
    }
  ]

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left side - Sign in form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <M3Card variant="elevated" className="h-full">
            <M3CardHeader className="text-center">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Sparkles className="w-8 h-8 text-white" />
              </motion.div>
              <M3CardTitle className="text-2xl font-bold text-foreground">
                Welcome to aiGo.build
              </M3CardTitle>
              <p className="text-muted-foreground mt-2">
                Sign in to start building amazing websites with AI
              </p>
            </M3CardHeader>
            
            <M3CardContent className="space-y-6">
              <div className="space-y-4">
                <M3Button
                  variant="filled"
                  size="lg"
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <LogIn className="w-5 h-5 mr-2" />
                      Continue with Google
                    </>
                  )}
                </M3Button>
              </div>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  By signing in, you agree to our{' '}
                  <a href="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </a>
                </p>
              </div>

              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-4 h-4 text-primary" />
                  <span className="font-medium text-foreground">Free to Start</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Get 3 free AI generations and access to basic templates. 
                  Upgrade anytime for unlimited features.
                </p>
              </div>
            </M3CardContent>
          </M3Card>
        </motion.div>

        {/* Right side - Benefits */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Why Choose aiGo.build?
            </h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of developers who are building faster with AI-powered tools
            </p>
          </div>

          <div className="space-y-4">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                >
                  <M3Card variant="filled" className="hover:shadow-lg transition-shadow">
                    <M3CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">
                            {benefit.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                    </M3CardContent>
                  </M3Card>
                </motion.div>
              )
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-6 border border-primary/20"
          >
            <div className="flex items-center gap-2 mb-3">
              <Rocket className="w-5 h-5 text-primary" />
              <span className="font-semibold text-foreground">Ready to Start Building?</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Transform your ideas into fully functional websites in minutes, not hours.
            </p>
            <div className="flex items-center gap-2 text-sm text-primary">
              <span>Get started today</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}