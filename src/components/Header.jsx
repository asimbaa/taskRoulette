import React from 'react'
import { motion } from 'framer-motion'

function Header() {
  return (
    <header className="text-center">
      <motion.h1 
        className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Task Roulette
      </motion.h1>
      <motion.p 
        className="mt-2 text-gray-600 dark:text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Beat procrastination with a spin of chance
      </motion.p>
    </header>
  )
}

export default Header
