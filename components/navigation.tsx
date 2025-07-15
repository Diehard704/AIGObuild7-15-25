'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSession, signIn, signOut } from 'next-auth/react'
import Image from 'next/image'
import { Search, Bell, Settings, User, Menu, X, LogIn, LogOut } from 'lucide-react'
import { CreditDisplay } from './credit-display'
import { ThemeToggle } from './theme-toggle'

export function Navigation() {
  const { data: session } = useSession()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [notifications, setNotifications] = useState(3)

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-64 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Left Section */}
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden m3-ripple p-2 rounded-md hover:m3-state-hover transition-all duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 text-foreground" />
              ) : (
                <Menu className="h-5 w-5 text-foreground" />
              )}
            </button>

            {/* Search Bar */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search apps, templates, or features..."
                className="w-80 pl-10 pr-4 py-2 bg-surface-container rounded-lg border border-outline focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 m3-body-medium"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Credits Display */}
            <div className="hidden sm:block">
              <CreditDisplay credits={12} compact />
            </div>

            {/* Notifications */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="m3-ripple relative p-2 rounded-full hover:m3-state-hover transition-all duration-200"
            >
              <Bell className="h-5 w-5 text-foreground" />
              {notifications > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 h-5 w-5 bg-error text-error-foreground rounded-full flex items-center justify-center text-xs font-medium"
                >
                  {notifications}
                </motion.span>
              )}
            </motion.button>

            {/* Settings */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="m3-ripple p-2 rounded-full hover:m3-state-hover transition-all duration-200"
            >
              <Settings className="h-5 w-5 text-foreground" />
            </motion.button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* User Profile */}
            {session?.user ? (
              <div className="flex items-center space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="m3-ripple flex items-center space-x-2 p-2 rounded-full hover:m3-state-hover transition-all duration-200"
                >
                  {session.user.image ? (
                    <Image 
                      src={session.user.image} 
                      alt={session.user.name || 'User'}
                      width={32}
                      height={32}
                      className="h-8 w-8 rounded-full"
                    />
                  ) : (
                    <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => signOut()}
                  className="m3-ripple p-2 rounded-full hover:m3-state-hover transition-all duration-200"
                  title="Sign out"
                >
                  <LogOut className="h-4 w-4 text-foreground" />
                </motion.button>
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => signIn()}
                className="m3-ripple flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all duration-200"
              >
                <LogIn className="h-4 w-4" />
                <span className="hidden sm:inline">Sign In</span>
              </motion.button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden bg-surface-container border-t border-border/50"
          >
            <div className="px-6 py-4 space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 bg-surface rounded-lg border border-outline focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 m3-body-medium"
                />
              </div>

              {/* Mobile Credits */}
              <div className="flex items-center justify-between">
                <span className="m3-body-medium text-foreground">Credits</span>
                <CreditDisplay credits={12} compact />
              </div>

              {/* Mobile Navigation Links */}
              <div className="space-y-2">
                <motion.a
                  href="/dashboard"
                  whileHover={{ x: 4 }}
                  className="block m3-body-medium text-foreground hover:text-primary transition-colors duration-200"
                >
                  Dashboard
                </motion.a>
                <motion.a
                  href="/build"
                  whileHover={{ x: 4 }}
                  className="block m3-body-medium text-foreground hover:text-primary transition-colors duration-200"
                >
                  Build Apps
                </motion.a>
                <motion.a
                  href="/projects"
                  whileHover={{ x: 4 }}
                  className="block m3-body-medium text-foreground hover:text-primary transition-colors duration-200"
                >
                  Projects
                </motion.a>
                <motion.a
                  href="/templates"
                  whileHover={{ x: 4 }}
                  className="block m3-body-medium text-foreground hover:text-primary transition-colors duration-200"
                >
                  Templates
                </motion.a>
                <motion.a
                  href="/pricing"
                  whileHover={{ x: 4 }}
                  className="block m3-body-medium text-foreground hover:text-primary transition-colors duration-200"
                >
                  Pricing
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}