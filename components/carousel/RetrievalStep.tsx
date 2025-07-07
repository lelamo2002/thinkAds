'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'

interface RetrievalStepProps {
  isActive: boolean
}

interface QueuedChunk {
  id: number
  score: number
  content: string
  source: string
  uniqueKey: string
}

const RetrievalStep = ({ isActive }: RetrievalStepProps) => {
  const neuralNetRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const lastChunkTimeRef = useRef<number>(0)
  const [visibleChunks, setVisibleChunks] = useState<QueuedChunk[]>([])
  const [nextChunkIndex, setNextChunkIndex] = useState(0)
  
  const chunks = [
    { 
      id: 1,
      score: 0.94, 
      content: "Alegações extraordinárias que desafiam a biologia conhecida...",
      source: "Padrões de Pseudociência"
    },
    { 
      id: 2,
      score: 0.87, 
      content: "Estudos publicados em revistas sem revisão por pares ou de baixo impacto...",
      source: "Metodologia Científica Duvidosa"
    },
    { 
      id: 3,
      score: 0.91, 
      content: "Uso de 'anomalias' ou 'fenômenos quânticos' para explicar o inexplicado...",
      source: "Análise de Discurso Sensacionalista"
    },
    { 
      id: 4,
      score: 0.83, 
      content: "A necessidade de replicação independente para validar descobertas...",
      source: "Princípios do Ceticismo Científico"
    }
  ]
  
  const addNextChunk = () => {
    const now = Date.now()
    
    // Prevent rapid-fire additions (minimum 2 seconds between chunks)
    if (now - lastChunkTimeRef.current < 2000) {
      return
    }
    
    lastChunkTimeRef.current = now
    
    const chunkIndex = nextChunkIndex % chunks.length
    const chunk = chunks[chunkIndex]
    const newChunk: QueuedChunk = {
      ...chunk,
      uniqueKey: `${chunk.id}-${now}`
    }
    
    setVisibleChunks(prev => {
      const newArray = [...prev, newChunk]
      // Enforce limit of 2 - remove oldest if we exceed
      return newArray.length > 2 ? newArray.slice(-2) : newArray
    })
    
    setNextChunkIndex(prev => prev + 1)
  }
  
  useEffect(() => {
    const scheduleNextChunk = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      
      timeoutRef.current = setTimeout(() => {
        // Only add chunk if page is visible and component is still active
        if (!document.hidden && isActive) {
          addNextChunk()
          scheduleNextChunk() // Schedule the next one
        }
      }, 2500)
    }
    // Cleanup any existing timers
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    
    if (!isActive) {
      // Reset all elements to initial state when inactive
      gsap.set(neuralNetRef.current, { clearProps: "all" })
      gsap.set(".neural-connection", { strokeDashoffset: 75 })
      setVisibleChunks([])
      setNextChunkIndex(0)
      lastChunkTimeRef.current = 0
      return
    }
    
    const tl = gsap.timeline()
    
    // Phase 1: Neural network activation (0-2s)
    tl.fromTo(neuralNetRef.current, 
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.8 },
      0
    )
    
    // Animate neural connections
    tl.to(".neural-connection", {
      strokeDashoffset: 0,
      duration: 1.5,
      stagger: 0.2,
      ease: "power2.inOut"
    }, "-=0.5")
    
    // Phase 2: Start adding chunks after neural network is ready
    tl.call(() => {
      // Add first chunk immediately
      addNextChunk()
      
      // Then schedule subsequent chunks
      scheduleNextChunk()
    }, undefined, "+=0.5")
    
    // Handle page visibility changes
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Page is hidden, clear any pending timeouts
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
          timeoutRef.current = null
        }
      } else if (isActive) {
        // Page is visible again, restart the scheduling
        scheduleNextChunk()
      }
    }
    
    document.addEventListener('visibilitychange', handleVisibilityChange)
    
    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [isActive])

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center px-4">
        {/* Neural Network Visualization */}
        <div ref={neuralNetRef} className="mb-6">
          <h4 className="text-base font-semibold text-gray-700 mb-3 text-center">
            Busca de Chunks Similares
          </h4>
          <div className="relative flex justify-center">
            <svg width="240" height="120" className="mx-auto">
              {/* Input Layer */}
              <circle cx="40" cy="30" r="6" fill="#3B82F6" className="animate-pulse" />
              <circle cx="40" cy="60" r="6" fill="#3B82F6" className="animate-pulse" />
              <circle cx="40" cy="90" r="6" fill="#3B82F6" className="animate-pulse" />
              
              {/* Hidden Layer */}
              <circle cx="120" cy="20" r="6" fill="#10B981" />
              <circle cx="120" cy="45" r="6" fill="#10B981" />
              <circle cx="120" cy="70" r="6" fill="#10B981" />
              <circle cx="120" cy="95" r="6" fill="#10B981" />
              
              {/* Output Layer */}
              <circle cx="200" cy="45" r="6" fill="#8B5CF6" />
              <circle cx="200" cy="75" r="6" fill="#8B5CF6" />
              
              {/* Connections */}
              <line x1="46" y1="30" x2="114" y2="20" stroke="#6B7280" strokeWidth="1" 
                    className="neural-connection" strokeDasharray="75" strokeDashoffset="75" />
              <line x1="46" y1="60" x2="114" y2="45" stroke="#6B7280" strokeWidth="1" 
                    className="neural-connection" strokeDasharray="75" strokeDashoffset="75" />
              <line x1="46" y1="90" x2="114" y2="70" stroke="#6B7280" strokeWidth="1" 
                    className="neural-connection" strokeDasharray="75" strokeDashoffset="75" />
              
              <line x1="126" y1="45" x2="194" y2="45" stroke="#6B7280" strokeWidth="1" 
                    className="neural-connection" strokeDasharray="75" strokeDashoffset="75" />
              <line x1="126" y1="70" x2="194" y2="75" stroke="#6B7280" strokeWidth="1" 
                    className="neural-connection" strokeDasharray="75" strokeDashoffset="75" />
            </svg>
          </div>
        </div>

        {/* Chunks Found - Queue display with fixed height */}
        <div className="w-full max-w-2xl mx-auto">
          <h4 className="text-base font-semibold text-gray-700 mb-3 text-center">
            Chunks Encontrados
          </h4>
          <div className="h-[220px] flex flex-col justify-end space-y-3">
            <AnimatePresence mode="popLayout">
              {visibleChunks.map((chunk) => (
                <motion.div
                  key={chunk.uniqueKey}
                  layout
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -50, scale: 0.9 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                    mass: 1
                  }}
                  className="bg-white rounded-lg p-3 shadow-sm border border-gray-200"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mr-2">
                        <span className="text-white font-bold text-xs">{Math.ceil(Math.random() * 10)}</span>
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-medium text-gray-500 mb-1">{chunk.source}</div>
                      </div>
                    </div>
                    {/* <div className="text-right">
                      <div className="text-sm font-bold text-gray-800">{chunk.score.toFixed(2)}</div>
                      <div className="text-xs text-gray-500">Score</div>
                    </div> */}
                  </div>
                  
                  <div className="bg-gray-50 rounded p-2">
                    <p className="text-xs text-gray-700 italic">
                      "{chunk.content}"
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Status - Fixed at bottom */}
      <div className="flex-shrink-0 text-center pb-4">
        <div className="inline-flex items-center bg-gradient-to-r from-secondary-50 to-blue-50 text-secondary-700 px-4 py-2 rounded-full border border-secondary-200">
          <div className="flex space-x-1 mr-2">
            <div className="w-1.5 h-1.5 bg-secondary-500 rounded-full animate-bounce"></div>
            <div className="w-1.5 h-1.5 bg-secondary-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
            <div className="w-1.5 h-1.5 bg-secondary-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          </div>
          <span className="font-medium text-sm">Consultando base de conhecimento...</span>
        </div>
      </div>
    </div>
  )
}

export default RetrievalStep 