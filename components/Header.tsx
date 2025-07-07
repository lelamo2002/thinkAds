'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSectionContext } from '../app/contexts/SectionContext'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { currentSection } = useSectionContext()

  const navItems = [
    { name: 'Início', href: '/' },
    { name: 'Documentação', href: '/documentacao' },
    { name: 'Sobre', href: '/sobre' },
  ]

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  // Define header styles based on current section - full colored backgrounds
  const getSectionStyles = () => {
    switch (currentSection) {
      case 'hero':
        return {
          bgClass: 'bg-white/95 shadow-lg',
          textClass: 'text-gray-700',
          logoFilter: 'none', // Original logo
          borderClass: 'border-gray-300',
          hoverClass: 'hover:text-accent-magenta',
          mobileHoverClass: 'hover:bg-accent-magenta/10'
        }
      case 'how-it-works':
        return {
          bgClass: 'bg-secondary-500/95 shadow-secondary-500/20',
          textClass: 'text-white',
          logoFilter: 'brightness(0) invert(1)', // White logo
          borderClass: 'border-white/30',
          hoverClass: 'hover:text-secondary-100',
          mobileHoverClass: 'hover:bg-white/10'
        }
      case 'partners':
        return {
          bgClass: 'bg-accent-magenta/95 shadow-accent-magenta/20',
          textClass: 'text-white',
          logoFilter: 'brightness(0) invert(1)', // White logo
          borderClass: 'border-white/30',
          hoverClass: 'hover:text-pink-100',
          mobileHoverClass: 'hover:bg-white/10'
        }
      case 'cta':
        return {
          bgClass: 'bg-accent-violet/95 shadow-accent-violet/20',
          textClass: 'text-white',
          logoFilter: 'brightness(0) invert(1)', // White logo
          borderClass: 'border-white/30',
          hoverClass: 'hover:text-purple-100',
          mobileHoverClass: 'hover:bg-white/10'
        }
      default:
        return {
          bgClass: 'bg-white/95 shadow-lg',
          textClass: 'text-gray-700',
          logoFilter: 'none', // Original logo
          borderClass: 'border-gray-300',
          hoverClass: 'hover:text-accent-magenta',
          mobileHoverClass: 'hover:bg-accent-magenta/10'
        }
    }
  }

  const styles = getSectionStyles()

  return (
    <motion.header 
      className={`${styles.bgClass} backdrop-blur-md sticky top-0 z-50 transition-all duration-500 ease-in-out shadow-xl`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link href="/" className="flex items-center space-x-3">
              <motion.div
                initial={{ rotate: -10, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Image 
                  src="/logoH.png" 
                  alt="LabLivre" 
                  width={160} 
                  height={48}
                  className={`h-12 w-auto transition-all duration-500`}
                  style={{ filter: styles.logoFilter }}
                />
              </motion.div>
              <div className={`border-l ${styles.borderClass} h-10 transition-all duration-500`}></div>
              <motion.span 
                className={`text-2xl font-bold ${styles.textClass} transition-colors duration-500`}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                ThinkAds
              </motion.span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav 
            className="hidden md:flex space-x-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.3 }}
                whileHover={{ y: -2 }}
              >
                <Link
                  href={item.href}
                  className={`${styles.textClass} ${styles.hoverClass} font-medium transition-colors duration-300`}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </motion.nav>

          {/* Mobile menu button */}
          <motion.button
            onClick={toggleMenu}
            className={`md:hidden p-2 rounded-md ${styles.textClass} ${styles.hoverClass} focus:outline-none transition-colors duration-300`}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.3 }}
          >
            <motion.div
              animate={{ rotate: isMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.div>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className={`md:hidden py-4 border-t ${styles.borderClass} transition-all duration-500`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <nav className="flex flex-col space-y-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    whileHover={{ x: 5 }}
                    className={`${styles.mobileHoverClass} rounded-md transition-all duration-300`}
                  >
                    <Link
                      href={item.href}
                      className={`block px-4 py-2 ${styles.textClass} ${styles.hoverClass} font-medium transition-colors duration-300`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}

export default Header 