'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: 'Generate', active: pathname === '/' },
    { href: '/pricing', label: 'Pricing', active: pathname === '/pricing' },
    { href: '/dashboard', label: 'Dashboard', active: pathname === '/dashboard' },
    { href: '/about', label: 'About', active: pathname === '/about' }
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center"
            >
              <span className="text-white font-bold text-lg">⚡</span>
            </motion.div>
            <span className="text-xl font-bold text-blue-400">
              FragmentsPro
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  item.active
                    ? 'text-blue-400 bg-blue-500/10'
                    : 'text-gray-300 hover:text-blue-400 hover:bg-gray-800/50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="text-sm text-gray-400">
              <span className="text-green-400 font-semibold">12</span> credits
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/pricing'}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-medium transition-colors"
            >
              Buy Credits
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden py-4 border-t border-gray-800"
          >
            <div className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-2 rounded-lg transition-colors ${
                    item.active
                      ? 'text-blue-400 bg-blue-500/10'
                      : 'text-gray-300 hover:text-blue-400 hover:bg-gray-800/50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              <div className="pt-4 mt-4 border-t border-gray-700">
                <div className="px-3 py-2 text-sm text-gray-400">
                  <span className="text-green-400 font-semibold">12</span> credits remaining
                </div>
                <button
                  onClick={() => {
                    window.location.href = '/pricing'
                    setIsMenuOpen(false)
                  }}
                  className="w-full mt-2 px-3 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-medium transition-colors"
                >
                  Buy Credits
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}