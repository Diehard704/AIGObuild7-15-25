'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { M3Button } from '@/components/ui/m3-button'
import { M3Card, M3CardContent, M3CardHeader, M3CardTitle } from '@/components/ui/m3-card'
import { TypewriterChat } from '@/components/typewriter-chat'
import {
  Sparkles,
  Rocket,
  Code,
  Globe,
  Zap,
  Star,
  ArrowRight,
  Play,
  Settings,
  BookOpen,
  Lightbulb,
  Target,
  Clock,
  Users,
  TrendingUp
} from 'lucide-react'

export default function BuildPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)

  const templates = [
    {
      id: 'nextjs-developer',
      name: 'Next.js Developer',
      description: 'Full-stack React applications with modern tooling and deployment',
      icon: <Code className="w-6 h-6" />,
      color: 'from-primary to-secondary',
      features: ['TypeScript', 'Tailwind CSS', 'API Routes', 'Vercel Deployment'],
      difficulty: 'Intermediate',
      popularity: 95
    },
    {
      id: 'vue-developer',
      name: 'Vue.js Developer',
      description: 'Progressive JavaScript framework for building user interfaces',
      icon: <Globe className="w-6 h-6" />,
      color: 'from-secondary to-tertiary',
      features: ['Composition API', 'Vue Router', 'Pinia State', 'Vite Build'],
      difficulty: 'Beginner',
      popularity: 88
    },
    {
      id: 'streamlit-developer',
      name: 'Streamlit Developer',
      description: 'Data science applications with interactive visualizations',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'from-tertiary to-warning',
      features: ['Python', 'Data Visualization', 'ML Integration', 'Cloud Deployment'],
      difficulty: 'Beginner',
      popularity: 92
    },
    {
      id: 'gradio-developer',
      name: 'Gradio Developer',
      description: 'Machine learning interfaces and model deployment',
      icon: <Zap className="w-6 h-6" />,
      color: 'from-warning to-error',
      features: ['ML Models', 'Interactive UI', 'API Endpoints', 'Hugging Face'],
      difficulty: 'Advanced',
      popularity: 85
    }
  ]

  const features = [
    {
      title: "AI-Powered Generation",
      description: "Advanced language models create complete applications with comprehensive functionality",
      icon: <Sparkles className="w-6 h-6" />,
      color: "from-primary to-secondary"
    },
    {
      title: "Instant Deployment",
      description: "Deploy your apps immediately with E2B integration and global CDN",
      icon: <Rocket className="w-6 h-6" />,
      color: "from-secondary to-tertiary"
    },
    {
      title: "Multiple Frameworks",
      description: "Support for Next.js, Vue.js, Streamlit, Gradio, and more",
      icon: <Code className="w-6 h-6" />,
      color: "from-tertiary to-warning"
    },
    {
      title: "Real-time Preview",
      description: "See your app come to life with live preview and instant updates",
      icon: <Play className="w-6 h-6" />,
      color: "from-warning to-error"
    }
  ]

  const stats = [
    { label: "Apps Generated", value: "12,847", icon: <Rocket className="w-4 h-4" /> },
    { label: "Success Rate", value: "98.5%", icon: <Target className="w-4 h-4" /> },
    { label: "Avg Generation Time", value: "28s", icon: <Clock className="w-4 h-4" /> },
    { label: "Active Users", value: "3,421", icon: <Users className="w-4 h-4" /> }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="border-b border-border/50 p-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <motion.h1
                className="m3-headline-large font-bold text-foreground mb-2"
                whileHover={{ scale: 1.02 }}
              >
                AI App Builder
              </motion.h1>
              <p className="m3-body-large text-muted-foreground flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Create amazing applications with AI in seconds
              </p>
            </div>

            <div className="flex items-center gap-4">
              <M3Button
                variant="outlined"
                size="lg"
                onClick={() => window.location.href = '/templates'}
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Browse Templates
              </M3Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">

        {/* Stats Overview */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <M3Card variant="elevated" className="h-full text-center">
                  <M3CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                      {stat.icon}
                    </div>
                    <div className="m3-headline-large font-bold text-foreground mb-1">{stat.value}</div>
                    <div className="m3-body-small text-muted-foreground">{stat.label}</div>
                  </M3CardContent>
                </M3Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Quick Start Chat */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <M3Card variant="elevated" className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <M3CardHeader>
              <M3CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Describe Your App Idea
              </M3CardTitle>
            </M3CardHeader>
            <M3CardContent className="p-6">
              <TypewriterChat onGenerate={(prompt) => {
                window.location.href = `/build/generate?prompt=${encodeURIComponent(prompt)}&template=nextjs-developer`
              }} isLoading={false} />
            </M3CardContent>
          </M3Card>
        </motion.section>

        {/* Template Selection */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="m3-headline-medium font-bold text-foreground">
              Choose Your Template
            </h2>
            <M3Button
              variant="outlined"
              size="sm"
              onClick={() => window.location.href = '/templates'}
            >
              <Settings className="w-4 h-4 mr-2" />
              View All Templates
            </M3Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {templates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <M3Card
                  variant={selectedTemplate === template.id ? "elevated" : "filled"}
                  className={`h-full cursor-pointer transition-all duration-300 hover:shadow-lg ${selectedTemplate === template.id ? 'ring-2 ring-primary' : ''
                    }`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <M3CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-16 h-16 bg-gradient-to-r ${template.color} rounded-2xl flex items-center justify-center text-white`}>
                        {template.icon}
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-warning fill-current" />
                        <span className="text-sm font-medium">{template.popularity}%</span>
                      </div>
                    </div>

                    <h3 className="m3-title-large font-semibold text-foreground mb-2">
                      {template.name}
                    </h3>

                    <p className="m3-body-medium text-muted-foreground mb-4">
                      {template.description}
                    </p>

                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-2 py-1 bg-surface-container text-muted-foreground text-xs rounded-md">
                        {template.difficulty}
                      </span>
                    </div>

                    <div className="space-y-2 mb-6">
                      {template.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-success rounded-full" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <M3Button
                      variant={selectedTemplate === template.id ? "filled" : "outlined"}
                      size="sm"
                      className="w-full"
                      onClick={() => window.location.href = `/build/generate?template=${template.id}`}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Start Building
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </M3Button>
                  </M3CardContent>
                </M3Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Features */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-16"
        >
          <h2 className="m3-headline-medium font-bold text-foreground mb-8 text-center">
            Why Choose Our AI Builder?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
              >
                <M3Card variant="elevated" className="h-full hover:shadow-lg transition-shadow">
                  <M3CardContent className="p-6">
                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-4 text-white`}>
                      {feature.icon}
                    </div>
                    <h3 className="m3-title-large font-semibold text-foreground mb-3">
                      {feature.title}
                    </h3>
                    <p className="m3-body-medium text-muted-foreground">
                      {feature.description}
                    </p>
                  </M3CardContent>
                </M3Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Quick Start Guide */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mb-16"
        >
          <h2 className="m3-headline-medium font-bold text-foreground mb-8 text-center">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-8 h-8 text-primary" />
              </div>
              <h3 className="m3-title-large font-semibold text-foreground mb-3">
                1. Describe Your App
              </h3>
              <p className="m3-body-medium text-muted-foreground">
                Tell us what you want to build in natural language. Our AI understands your requirements.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-success/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-success" />
              </div>
              <h3 className="m3-title-large font-semibold text-foreground mb-3">
                2. AI Generates Code
              </h3>
              <p className="m3-body-medium text-muted-foreground">
                Our advanced AI creates complete, functional applications with modern best practices.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-tertiary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Rocket className="w-8 h-8 text-tertiary" />
              </div>
              <h3 className="m3-title-large font-semibold text-foreground mb-3">
                3. Deploy Instantly
              </h3>
              <p className="m3-body-medium text-muted-foreground">
                Deploy your app immediately with one click. No configuration needed.
              </p>
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="text-center"
        >
          <M3Card variant="elevated" className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <M3CardContent className="p-8">
              <h2 className="m3-headline-medium font-bold text-foreground mb-4">
                Ready to Build Something Amazing? 🚀
              </h2>
              <p className="m3-body-large text-muted-foreground mb-6 max-w-2xl mx-auto">
                Choose a template and start building your AI-powered application in minutes.
                No coding experience required!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <M3Button
                  variant="filled"
                  size="lg"
                  onClick={() => window.location.href = '/build/generate'}
                  className="group"
                >
                  <Rocket className="w-4 h-4 mr-2" />
                  Start Building Now
                  <Sparkles className="w-4 h-4 ml-2 group-hover:rotate-12 transition-transform" />
                </M3Button>

                <M3Button
                  variant="outlined"
                  size="lg"
                  onClick={() => window.location.href = '/templates'}
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Explore Templates
                  <ArrowRight className="w-4 h-4 ml-2" />
                </M3Button>
              </div>
            </M3CardContent>
          </M3Card>
        </motion.section>
      </div>
    </div>
  )
}