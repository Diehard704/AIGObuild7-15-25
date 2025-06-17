'use client'

import { motion } from 'framer-motion'

export default function AboutPage() {
  const features = [
    {
      title: "AI-Powered Generation",
      description: "Advanced language models generate complete applications with 4,000 tokens per creation",
      icon: "🤖"
    },
    {
      title: "Multiple Frameworks",
      description: "Support for Next.js, Vue.js, Streamlit, Python, and more comprehensive templates",
      icon: "⚡"
    },
    {
      title: "Instant Deployment",
      description: "Seamless E2B integration for immediate sandbox preview and production deployment",
      icon: "🚀"
    },
    {
      title: "Competitive Pricing",
      description: "60% more affordable than competitors with transparent credit-based system",
      icon: "💎"
    }
  ]

  const techStack = [
    { name: "Next.js 15", category: "Frontend Framework" },
    { name: "TypeScript", category: "Language" },
    { name: "Tailwind CSS", category: "Styling" },
    { name: "E2B Sandboxes", category: "Runtime Environment" },
    { name: "Stripe", category: "Payment Processing" },
    { name: "Multiple AI Models", category: "Generation Engine" }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-gray-800 p-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-blue-400 mb-4"
          >
            Strategic AI Development Platform
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Comprehensive backend infrastructure for AI-powered application generation 
            with aggressive optimization and user-centric design principles.
          </motion.p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-8">
        
        {/* Mission Statement */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-blue-400 mb-6 text-center">
            Our Development Mission 🚀
          </h2>
          
          <div className="bg-gray-900 rounded-2xl p-8 border border-gray-700">
            <p className="text-lg text-gray-300 leading-relaxed text-center max-w-4xl mx-auto">
              We deliver <span className="text-blue-400 font-semibold">uninterrupted backend infrastructure creation</span> through 
              aggressive server-side implementation and non-stop architectural progression. Our platform maintains 
              absolute backend momentum with <span className="text-green-400 font-semibold">relentless, uncompromising efficiency</span>, 
              enabling developers to focus on innovation while we handle the comprehensive system design.
            </p>
          </div>
        </motion.section>

        {/* Core Features */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-blue-400 mb-8 text-center">
            Backend Infrastructure Capabilities
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-blue-500/30 transition-colors"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-blue-400 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Technical Architecture */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-blue-400 mb-8 text-center">
            Strategic Technology Stack 💡
          </h2>
          
          <div className="bg-gray-900 rounded-2xl p-8 border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.05 }}
                  className="text-center p-4 bg-gray-800 rounded-lg border border-gray-600"
                >
                  <h4 className="font-semibold text-white mb-1">{tech.name}</h4>
                  <p className="text-sm text-gray-400">{tech.category}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Development Approach */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-blue-400 mb-8 text-center">
            Our Development Approach
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏗️</span>
              </div>
              <h3 className="text-xl font-semibold text-blue-400 mb-3">
                Robust Architecture
              </h3>
              <p className="text-gray-300">
                Scalable microservices architecture with comprehensive API design 
                and performance optimization strategies.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-xl font-semibold text-green-400 mb-3">
                User-Centric Design
              </h3>
              <p className="text-gray-300">
                Responsive, intuitive interfaces with progressive enhancement 
                and comprehensive accessibility considerations.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="text-xl font-semibold text-purple-400 mb-3">
                Community-Driven
              </h3>
              <p className="text-gray-300">
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
          transition={{ delay: 1.0 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-8 border border-blue-500/20">
            <h2 className="text-2xl font-bold text-blue-400 mb-4">
              Ready to Build Something Amazing? 🚀
            </h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Experience our comprehensive backend infrastructure with aggressive optimization 
              and seamless development workflow.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/'}
                className="px-8 py-4 bg-blue-500 hover:bg-blue-600 rounded-xl font-semibold transition-colors"
              >
                Start Building Apps
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/pricing'}
                className="px-8 py-4 bg-gray-700 hover:bg-gray-600 rounded-xl font-semibold transition-colors"
              >
                View Pricing
              </motion.button>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}