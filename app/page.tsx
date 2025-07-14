'use client'

import { motion } from 'framer-motion'
import { TypewriterChat } from '@/components/typewriter-chat'
import { M3Button } from '@/components/ui/m3-button'
import { M3Card, M3CardContent, M3CardHeader, M3CardTitle } from '@/components/ui/m3-card'
import {
  Rocket,
  Zap,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  Clock,
  TrendingUp
} from 'lucide-react'

export default function LandingPage() {
  const features = [
    {
      icon: Rocket,
      title: 'AI-Powered Generation',
      description: 'Create complete applications with advanced language models',
      color: 'text-primary'
    },
    {
      icon: Zap,
      title: 'Instant Deployment',
      description: 'Deploy your apps directly to production with E2B integration',
      color: 'text-secondary'
    },
    {
      icon: Sparkles,
      title: 'Smart Templates',
      description: 'Choose from hundreds of pre-built templates and frameworks',
      color: 'text-tertiary'
    }
  ]

  const stats = [
    { label: 'Apps Generated', value: '10,000+', icon: Rocket },
    { label: 'Active Users', value: '5,000+', icon: Users },
    { label: 'Success Rate', value: '95%', icon: CheckCircle },
    { label: 'Avg. Time', value: '28s', icon: Clock }
  ]

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Full Stack Developer',
      content: 'FragmentsPro has revolutionized how I build applications. The AI generation is incredibly accurate and the deployment is seamless.',
      rating: 5,
      avatar: 'SC'
    },
    {
      name: 'Mike Johnson',
      role: 'Startup Founder',
      content: 'I went from idea to deployed app in under 5 minutes. This platform is a game-changer for rapid prototyping.',
      rating: 5,
      avatar: 'MJ'
    },
    {
      name: 'Alex Rodriguez',
      role: 'Product Manager',
      content: 'The template library is extensive and the community features make it easy to find inspiration and help.',
      rating: 5,
      avatar: 'AR'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative pt-20 pb-16 px-6"
      >
        <div className="max-w-7xl mx-auto text-center">
          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="m3-display-large font-bold text-foreground mb-6">
              Build Anything with{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                AI
              </span>
            </h1>
            <p className="m3-headline-medium text-muted-foreground max-w-3xl mx-auto">
              Transform your ideas into fully functional applications with our advanced AI-powered development platform.
              Generate, deploy, and scale faster than ever before.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <M3Button
              size="lg"
              variant="filled"
              className="group"
              onClick={() => window.location.href = '/build'}
            >
              <Rocket className="mr-2 h-5 w-5" />
              Start Building
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </M3Button>
            <M3Button
              size="lg"
              variant="outlined"
              onClick={() => window.location.href = '/templates'}
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Browse Templates
            </M3Button>
          </motion.div>

          {/* Typewriter Chat */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <TypewriterChat onGenerate={(prompt) => {
              window.location.href = `/build/generate?prompt=${encodeURIComponent(prompt)}&template=nextjs-developer`
            }} isLoading={false} />
          </motion.div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute top-20 left-20 w-2 h-2 bg-primary/30 rounded-full"
            animate={{ y: [0, -20, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-40 right-32 w-1.5 h-1.5 bg-secondary/30 rounded-full"
            animate={{ y: [0, -15, 0], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          <motion.div
            className="absolute bottom-32 left-1/4 w-1 h-1 bg-tertiary/30 rounded-full"
            animate={{ y: [0, -25, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="py-16 px-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-3">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="m3-headline-small font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="m3-body-medium text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="py-16 px-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="m3-headline-large font-bold text-foreground mb-4">
              Why Choose FragmentsPro?
            </h2>
            <p className="m3-body-large text-muted-foreground max-w-2xl mx-auto">
              Experience the future of application development with our comprehensive AI-powered platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 + index * 0.2, duration: 0.5 }}
                  whileHover={{ y: -5 }}
                >
                  <M3Card variant="elevated" className="h-full">
                    <M3CardHeader>
                      <div className="flex items-center space-x-3">
                        <div className="p-3 bg-primary/10 rounded-xl">
                          <Icon className={`h-6 w-6 ${feature.color}`} />
                        </div>
                        <M3CardTitle>{feature.title}</M3CardTitle>
                      </div>
                    </M3CardHeader>
                    <M3CardContent>
                      <p className="m3-body-medium text-muted-foreground">
                        {feature.description}
                      </p>
                    </M3CardContent>
                  </M3Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="py-16 px-6 bg-surface-container"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="m3-headline-large font-bold text-foreground mb-4">
              What Our Users Say
            </h2>
            <p className="m3-body-large text-muted-foreground max-w-2xl mx-auto">
              Join thousands of developers who are already building faster with FragmentsPro.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 + index * 0.2, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <M3Card variant="filled" className="h-full">
                  <M3CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-3">
                        <span className="m3-label-medium font-medium text-primary-foreground">
                          {testimonial.avatar}
                        </span>
                      </div>
                      <div>
                        <div className="m3-title-medium font-medium text-foreground">
                          {testimonial.name}
                        </div>
                        <div className="m3-body-small text-muted-foreground">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                    <p className="m3-body-medium text-muted-foreground mb-4">
                      &quot;{testimonial.content}&quot;
                    </p>
                    <div className="flex items-center">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </M3CardContent>
                </M3Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.4, duration: 0.8 }}
        className="py-16 px-6"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="m3-headline-large font-bold text-foreground mb-4">
            Ready to Build Something Amazing?
          </h2>
          <p className="m3-body-large text-muted-foreground mb-8">
            Start creating your next application in minutes, not hours.
          </p>
          <M3Button
            size="lg"
            variant="filled"
            className="group"
            onClick={() => window.location.href = '/build'}
          >
            <Rocket className="mr-2 h-5 w-5" />
            Get Started Now
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </M3Button>
        </div>
      </motion.section>
    </div>
  )
}
