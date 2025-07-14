'use client'

import { motion } from 'framer-motion'
import { M3Button } from '@/components/ui/m3-button'
import { M3Card, M3CardContent, M3CardHeader, M3CardTitle } from '@/components/ui/m3-card'
import {
  Sparkles,
  Rocket,
  Code,
  Globe,
  Shield,
  Users,
  TrendingUp,
  Award,
  Zap,
  Clock,
  Star,
  ArrowRight,
  Heart,
  Target,
  Lightbulb
} from 'lucide-react'

export default function AboutPage() {
  const features = [
    {
      title: "AI-Powered Generation",
      description: "Advanced language models generate complete applications with 4,000 tokens per creation for comprehensive functionality",
      icon: <Sparkles className="w-6 h-6" />,
      color: "from-primary to-secondary"
    },
    {
      title: "Multiple Frameworks",
      description: "Support for Next.js, Vue.js, Streamlit, Python, and more comprehensive templates with modern tooling",
      icon: <Code className="w-6 h-6" />,
      color: "from-secondary to-tertiary"
    },
    {
      title: "Instant Deployment",
      description: "Seamless E2B integration for immediate sandbox preview and production deployment with global CDN",
      icon: <Globe className="w-6 h-6" />,
      color: "from-tertiary to-warning"
    },
    {
      title: "Competitive Pricing",
      description: "60% more affordable than competitors with transparent credit-based system and no hidden fees",
      icon: <Award className="w-6 h-6" />,
      color: "from-warning to-error"
    }
  ]

  const techStack = [
    { name: "Next.js 15", category: "Frontend Framework", icon: <Code className="w-4 h-4" /> },
    { name: "TypeScript", category: "Language", icon: <Code className="w-4 h-4" /> },
    { name: "Tailwind CSS", category: "Styling", icon: <Sparkles className="w-4 h-4" /> },
    { name: "E2B Sandboxes", category: "Runtime Environment", icon: <Globe className="w-4 h-4" /> },
    { name: "Stripe", category: "Payment Processing", icon: <Shield className="w-4 h-4" /> },
    { name: "Multiple AI Models", category: "Generation Engine", icon: <Zap className="w-4 h-4" /> }
  ]

  const stats = [
    { label: "Apps Generated", value: "12,847", icon: <Rocket className="w-4 h-4" /> },
    { label: "Active Users", value: "3,421", icon: <Users className="w-4 h-4" /> },
    { label: "Success Rate", value: "98.5%", icon: <Target className="w-4 h-4" /> },
    { label: "Avg Generation Time", value: "28s", icon: <Clock className="w-4 h-4" /> }
  ]

  const values = [
    {
      title: "Innovation First",
      description: "We push the boundaries of what's possible with AI-powered development",
      icon: <Lightbulb className="w-6 h-6" />,
      color: "from-primary to-secondary"
    },
    {
      title: "Developer Experience",
      description: "Every feature is designed with developers in mind for maximum productivity",
      icon: <Code className="w-6 h-6" />,
      color: "from-secondary to-tertiary"
    },
    {
      title: "Community Driven",
      description: "We believe in the power of community and open collaboration",
      icon: <Users className="w-6 h-6" />,
      color: "from-tertiary to-warning"
    }
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
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            className="m3-headline-large font-bold text-foreground mb-4"
            whileHover={{ scale: 1.02 }}
          >
            Strategic AI Development Platform
          </motion.h1>
          <p className="m3-body-large text-muted-foreground max-w-3xl mx-auto">
            Comprehensive backend infrastructure for AI-powered application generation
            with aggressive optimization and user-centric design principles.
          </p>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">

        {/* Mission Statement */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="m3-headline-medium font-bold text-foreground mb-6 text-center">
            Our Development Mission 🚀
          </h2>

          <M3Card variant="elevated" className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <M3CardContent className="p-8">
              <p className="m3-body-large text-foreground leading-relaxed text-center max-w-4xl mx-auto">
                We deliver <span className="text-primary font-semibold">uninterrupted backend infrastructure creation</span> through
                aggressive server-side implementation and non-stop architectural progression. Our platform maintains
                absolute backend momentum with <span className="text-success font-semibold">relentless, uncompromising efficiency</span>,
                enabling developers to focus on innovation while we handle the comprehensive system design.
              </p>
            </M3CardContent>
          </M3Card>
        </motion.section>

        {/* Stats Overview */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
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

        {/* Core Features */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="m3-headline-medium font-bold text-foreground mb-8 text-center">
            Backend Infrastructure Capabilities
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <M3Card variant="elevated" className="h-full hover:shadow-lg transition-shadow">
                  <M3CardContent className="p-6">
                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-4 text-white`}>
                      {feature.icon}
                    </div>
                    <h3 className="m3-title-large font-semibold text-foreground mb-3">
                      {feature.title}
                    </h3>
                    <p className="m3-body-medium text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </M3CardContent>
                </M3Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Technical Architecture */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-16"
        >
          <h2 className="m3-headline-medium font-bold text-foreground mb-8 text-center">
            Strategic Technology Stack 💡
          </h2>

          <M3Card variant="elevated">
            <M3CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {techStack.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.05 }}
                  >
                    <M3Card variant="filled" className="h-full">
                      <M3CardContent className="p-4 text-center">
                        <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                          {tech.icon}
                        </div>
                        <h4 className="m3-title-medium font-semibold text-foreground mb-1">{tech.name}</h4>
                        <p className="m3-body-small text-muted-foreground">{tech.category}</p>
                      </M3CardContent>
                    </M3Card>
                  </motion.div>
                ))}
              </div>
            </M3CardContent>
          </M3Card>
        </motion.section>

        {/* Our Values */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mb-16"
        >
          <h2 className="m3-headline-medium font-bold text-foreground mb-8 text-center">
            Our Core Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 + index * 0.1 }}
              >
                <M3Card variant="elevated" className="h-full text-center">
                  <M3CardContent className="p-6">
                    <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-4 text-white`}>
                      {value.icon}
                    </div>
                    <h3 className="m3-title-large font-semibold text-foreground mb-3">
                      {value.title}
                    </h3>
                    <p className="m3-body-medium text-muted-foreground">
                      {value.description}
                    </p>
                  </M3CardContent>
                </M3Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Development Approach */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="mb-16"
        >
          <h2 className="m3-headline-medium font-bold text-foreground mb-8 text-center">
            Our Development Approach
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Rocket className="w-8 h-8 text-primary" />
              </div>
              <h3 className="m3-title-large font-semibold text-foreground mb-3">
                Robust Architecture
              </h3>
              <p className="m3-body-medium text-muted-foreground">
                Scalable microservices architecture with comprehensive API design
                and performance optimization strategies.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-success/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-success" />
              </div>
              <h3 className="m3-title-large font-semibold text-foreground mb-3">
                User-Centric Design
              </h3>
              <p className="m3-body-medium text-muted-foreground">
                Responsive, intuitive interfaces with progressive enhancement
                and comprehensive accessibility considerations.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-tertiary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-tertiary" />
              </div>
              <h3 className="m3-title-large font-semibold text-foreground mb-3">
                Community-Driven
              </h3>
              <p className="m3-body-medium text-muted-foreground">
                Transparent value proposition with sustainable development
                model and community-driven innovation approach.
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
                Experience our comprehensive backend infrastructure with aggressive optimization
                and seamless development workflow.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <M3Button
                  variant="filled"
                  size="lg"
                  onClick={() => window.location.href = '/'}
                  className="group"
                >
                  <Rocket className="w-4 h-4 mr-2" />
                  Start Building Apps
                  <Sparkles className="w-4 h-4 ml-2 group-hover:rotate-12 transition-transform" />
                </M3Button>

                <M3Button
                  variant="outlined"
                  size="lg"
                  onClick={() => window.location.href = '/pricing'}
                >
                  <Star className="w-4 h-4 mr-2" />
                  View Pricing
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