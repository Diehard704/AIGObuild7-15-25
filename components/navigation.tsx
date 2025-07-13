'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Bell, User, Menu, X } from 'lucide-react'
import { CreditDisplay } from './credit-display'
import { ThemeToggle } from './theme-toggle'

export function Navigation() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-64 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-gray-800/50"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Left Section */}
          <div className="flex items-center space-x-8">
            {/* Search Bar */}
            <div className="relative">
              <motion.div
                className={`flex items-center ${isSearchOpen ? 'w-80' : 'w-64'} transition-all duration-300`}
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search projects, templates..."
                    className="w-full pl-10 pr-4 py-2 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 glass-dark"
                  />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 rounded-xl bg-gray-900/50 border border-gray-700/50 hover:bg-gray-800/50 transition-all duration-300 glass-dark group"
            >
              <Bell className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.button>

            {/* Credits Display */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="hidden md:block"
            >
              <CreditDisplay credits={12} compact={true} />
            </motion.div>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* User Menu */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 p-2 rounded-xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 hover:from-blue-600/30 hover:to-purple-600/30 transition-all duration-300 group"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-medium hidden lg:block">User</span>
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-gray-900/50 border border-gray-700/50 hover:bg-gray-800/50 transition-all duration-300 glass-dark"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-gray-300" />
              ) : (
                <Menu className="w-5 h-5 text-gray-300" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t border-gray-800/50 mt-4 pb-4"
            >
              <div className="space-y-4 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Credits</span>
                  <CreditDisplay credits={12} compact={true} />
                </div>
                <div className="space-y-2">
                  <motion.a
                    href="/dashboard"
                    whileHover={{ x: 5 }}
                    className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200"
                  >
                    Dashboard
                  </motion.a>
                  <motion.a
                    href="/build"
                    whileHover={{ x: 5 }}
                    className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200"
                  >
                    New Project
                  </motion.a>
                  <motion.a
                    href="/pricing"
                    whileHover={{ x: 5 }}
                    className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200"
                  >
                    Pricing
                  </motion.a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Animated Border */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </motion.nav>
  )
}