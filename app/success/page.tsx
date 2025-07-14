'use client'

import { motion } from 'framer-motion'
import { M3Button } from '@/components/ui/m3-button'
import { M3Card, M3CardContent, M3CardHeader, M3CardTitle } from '@/components/ui/m3-card'
import {
  CheckCircle,
  Sparkles,
  Rocket,
  Star,
  ArrowRight,
  Gift,
  Users,
  Globe,
  Zap,
  Heart
} from 'lucide-react'

export default function SuccessPage() {
  const benefits = [
    {
      title: "Unlimited App Generation",
      description: "Create as many applications as you need with our comprehensive AI platform",
      icon: <Rocket className="w-6 h-6" />,
      color: "from-primary to-secondary"
    },
    {
      title: "Advanced Templates",
      description: "Access to all premium templates including Next.js, Vue.js, Streamlit, and more",
      icon: <Star className="w-6 h-6" />,
      color: "from-secondary to-tertiary"
    },
    {
      title: "Instant Deployment",
      description: "Deploy your apps instantly with E2B integration and global CDN",
      icon: <Globe className="w-6 h-6" />,
      color: "from-tertiary to-warning"
    },
    {
      title: "Priority Support",
      description: "Get priority access to our support team and community resources",
      icon: <Users className="w-6 h-6" />,
      color: "from-warning to-error"
    }
  ]

  const nextSteps = [
    {
      title: "Start Building",
      description: "Create your first AI-powered application",
      action: "Go to Builder",
      href: "/build",
      icon: <Rocket className="w-4 h-4" />
    },
    {
      title: "Explore Templates",
      description: "Browse our collection of ready-to-use templates",
      action: "View Templates",
      href: "/templates",
      icon: <Star className="w-4 h-4" />
    },
    {
      title: "Join Community",
      description: "Connect with other developers and share your projects",
      action: "Visit Community",
      href: "/community",
      icon: <Users className="w-4 h-4" />
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Success Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="border-b border-border/50 p-6"
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-10 h-10 text-success" />
          </motion.div>

          <motion.h1
            className="m3-headline-large font-bold text-foreground mb-4"
            whileHover={{ scale: 1.02 }}
          >
            Welcome to FragmentsPro! 🎉
          </motion.h1>

          <p className="m3-body-large text-muted-foreground max-w-3xl mx-auto">
            Your account has been successfully created and you&apos;re now ready to start building
            amazing AI-powered applications. Let&apos;s get started!
          </p>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">

        {/* Welcome Message */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <M3Card variant="elevated" className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <M3CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>

              <h2 className="m3-headline-medium font-bold text-foreground mb-4">
                You&apos;re All Set! 🚀
              </h2>

              <p className="m3-body-large text-muted-foreground mb-6 max-w-2xl mx-auto">
                Your FragmentsPro account is now active and ready to use. You have access to all our
                premium features including unlimited app generation, advanced templates, and instant deployment.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <M3Button
                  variant="filled"
                  size="lg"
                  onClick={() => window.location.href = '/build'}
                  className="group"
                >
                  <Rocket className="w-4 h-4 mr-2" />
                  Start Building Your First App
                  <Sparkles className="w-4 h-4 ml-2 group-hover:rotate-12 transition-transform" />
                </M3Button>

                <M3Button
                  variant="outlined"
                  size="lg"
                  onClick={() => window.location.href = '/dashboard'}
                >
                  <Globe className="w-4 h-4 mr-2" />
                  Go to Dashboard
                  <ArrowRight className="w-4 h-4 ml-2" />
                </M3Button>
              </div>
            </M3CardContent>
          </M3Card>
        </motion.section>

        {/* Your Benefits */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="m3-headline-medium font-bold text-foreground mb-8 text-center">
            What You Now Have Access To
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <M3Card variant="elevated" className="h-full hover:shadow-lg transition-shadow">
                  <M3CardContent className="p-6">
                    <div className={`w-16 h-16 bg-gradient-to-r ${benefit.color} rounded-2xl flex items-center justify-center mb-4 text-white`}>
                      {benefit.icon}
                    </div>
                    <h3 className="m3-title-large font-semibold text-foreground mb-3">
                      {benefit.title}
                    </h3>
                    <p className="m3-body-medium text-muted-foreground">
                      {benefit.description}
                    </p>
                  </M3CardContent>
                </M3Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Next Steps */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mb-16"
        >
          <h2 className="m3-headline-medium font-bold text-foreground mb-8 text-center">
            Recommended Next Steps
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {nextSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 + index * 0.1 }}
              >
                <M3Card variant="filled" className="h-full hover:shadow-lg transition-shadow">
                  <M3CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                      {step.icon}
                    </div>
                    <h3 className="m3-title-large font-semibold text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="m3-body-small text-muted-foreground mb-4">
                      {step.description}
                    </p>
                    <M3Button
                      variant="outlined"
                      size="sm"
                      onClick={() => window.location.href = step.href}
                      className="w-full"
                    >
                      {step.action}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </M3Button>
                  </M3CardContent>
                </M3Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Quick Stats */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mb-16"
        >
          <M3Card variant="elevated" className="bg-gradient-to-r from-success/10 to-primary/10 border-success/20">
            <M3CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="m3-display-small font-bold text-success mb-2">4,000</div>
                  <p className="m3-body-medium text-muted-foreground">Tokens per Generation</p>
                </div>
                <div>
                  <div className="m3-display-small font-bold text-primary mb-2">5+</div>
                  <p className="m3-body-medium text-muted-foreground">Framework Templates</p>
                </div>
                <div>
                  <div className="m3-display-small font-bold text-tertiary mb-2">∞</div>
                  <p className="m3-body-medium text-muted-foreground">App Generations</p>
                </div>
              </div>
            </M3CardContent>
          </M3Card>
        </motion.section>

        {/* Community Welcome */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="mb-16"
        >
          <M3Card variant="elevated" className="bg-gradient-to-r from-tertiary/10 to-warning/10 border-tertiary/20">
            <M3CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-tertiary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-tertiary" />
              </div>

              <h2 className="m3-headline-medium font-bold text-foreground mb-4">
                Join Our Community! 💙
              </h2>

              <p className="m3-body-large text-muted-foreground mb-6 max-w-2xl mx-auto">
                Connect with thousands of developers, share your projects, and get inspired by
                the amazing applications being built every day.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <M3Button
                  variant="filled"
                  size="lg"
                  onClick={() => window.location.href = '/community'}
                  className="group"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Join Community
                  <Sparkles className="w-4 h-4 ml-2 group-hover:rotate-12 transition-transform" />
                </M3Button>

                <M3Button
                  variant="outlined"
                  size="lg"
                  onClick={() => window.location.href = '/projects'}
                >
                  <Globe className="w-4 h-4 mr-2" />
                  Browse Projects
                  <ArrowRight className="w-4 h-4 ml-2" />
                </M3Button>
              </div>
            </M3CardContent>
          </M3Card>
        </motion.section>

        {/* Help & Support */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="text-center"
        >
          <M3Card variant="elevated">
            <M3CardContent className="p-8">
              <h2 className="m3-headline-medium font-bold text-foreground mb-4">
                Need Help Getting Started?
              </h2>

              <p className="m3-body-large text-muted-foreground mb-6 max-w-2xl mx-auto">
                We&apos;re here to help! Check out our documentation, join our community,
                or reach out to our support team.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <M3Button
                  variant="filled"
                  size="lg"
                  onClick={() => window.location.href = '/about'}
                >
                  <Gift className="w-4 h-4 mr-2" />
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </M3Button>

                <M3Button
                  variant="outlined"
                  size="lg"
                  onClick={() => window.location.href = '/pricing'}
                >
                  <Star className="w-4 h-4 mr-2" />
                  View Plans
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