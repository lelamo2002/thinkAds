'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import Image from 'next/image'

interface CardProps {
  // For step cards
  icon?: LucideIcon
  stepNumber?: string
  
  // For partner cards with custom content
  customIcon?: React.ReactNode
  
  // Common props
  title: string
  description: string
  borderColor?: string
  backgroundColor?: string
  iconBgColor?: string
  titleSize?: 'normal' | 'large'
  variants?: any
}

export default function Card({
  icon: Icon,
  stepNumber,
  customIcon,
  title,
  description,
  borderColor = 'border-white/20',
  backgroundColor = 'bg-white/10',
  iconBgColor = 'bg-gradient-to-br from-blue-500/80 to-purple-600/80',
  titleSize = 'normal',
  variants
}: CardProps) {
  const cardVariants = variants || {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <motion.div 
      className={`
        text-center p-6 ${backgroundColor} 
        backdrop-blur-md backdrop-saturate-150
        rounded-2xl shadow-xl border ${borderColor}
        relative overflow-hidden
        before:absolute before:inset-0 
        before:bg-gradient-to-br before:from-white/10 before:to-transparent
        before:rounded-2xl before:pointer-events-none
      `}
      variants={cardVariants}
      whileHover={{ 
        y: -12, 
        scale: 1.03,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl pointer-events-none" />
      
      {/* Icon container */}
      <motion.div 
        className={`
          relative z-10 w-16 h-16 ${iconBgColor} 
          rounded-2xl flex items-center justify-center mx-auto mb-6
          backdrop-blur-sm shadow-lg border border-white/20
          ${customIcon ? 'w-28 h-28 bg-white/90 backdrop-blur-md shadow-2xl p-3' : ''}
        `}
        whileHover={{ 
          rotate: [0, -5, 5, 0], 
          scale: 1.15,
          boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.3)"
        }}
        transition={{ duration: 0.6 }}
      >
        {customIcon ? (
          customIcon
        ) : Icon ? (
          <Icon className="text-white drop-shadow-sm" size={32} />
        ) : (
          <span className="text-white font-bold text-2xl drop-shadow-sm">{stepNumber}</span>
        )}
      </motion.div>
      
      {/* Content */}
      <div className="relative z-10">
        <h3 className={`
          ${titleSize === 'large' ? 'text-2xl font-bold' : 'text-xl font-semibold'} 
          text-gray-900 mb-3 drop-shadow-sm
        `}>
          {title}
        </h3>
        <p className="text-gray-700 leading-relaxed drop-shadow-sm">
          {description}
        </p>
      </div>
      
      {/* Subtle bottom highlight */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
    </motion.div>
  )
} 