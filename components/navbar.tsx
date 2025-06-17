'use client'

import { motion } from 'framer-motion'

export function NavBar() {
  return (
    <motion.header 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="p-6 flex justify-end items-center z-50 absolute top-0 right-0"
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 blur-xl rounded-full" />
        <div className="relative px-6 py-3 rounded-full overflow-hidden border border-blue-500/30 bg-black/30 backdrop-blur-sm">
          <span className="text-blue-400 font-medium text-sm">
            Begin 🚀
          </span>
        </div>
      </motion.button>
    </motion.header>
  )
}
