'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface AnalysisStepProps {
  isActive: boolean
}

const AnalysisStep = ({ isActive }: AnalysisStepProps) => {
  const [currentAnalysis, setCurrentAnalysis] = useState(0)
  
  const contexts = [
    { 
      name: "Credibilidade da Fonte", 
      type: "Revista desconhecida", 
      score: 94,
      color: "from-purple-500 to-purple-600",
      position: { top: "14%", left: "8%" }
    },
    { 
      name: "Plausibilidade Biológica", 
      type: "Alegação extraordinária", 
      score: 87,
      color: "from-purple-500 to-purple-600",
      position: { top: "34%", left: "5%" }
    },
    { 
      name: "Metodologia Científica", 
      type: "Falta de replicação", 
      score: 91,
      color: "from-purple-500 to-purple-600",
      position: { top: "54%", left: "10%" }
    }
  ]

  const newsParagraphs = [
    {
      id: 1,
      text: "Um estudo surpreendente publicado na revista 'Ciência Felina Hoje' revelou que gatos domésticos podem se comunicar...",
      classification: "fake",
      connectedContext: 0
    },
    {
      id: 2,
      text: "...habilidade se manifesta exclusivamente às terças-feiras, um fenômeno que desafia a biologia.",
      classification: "fake", 
      connectedContext: 1
    },
    {
      id: 3,
      text: "Críticos, no entanto, questionam a metodologia e pedem por replicação independente dos resultados.",
      classification: "informative",
      connectedContext: 2
    }
  ]
  
  useEffect(() => {
    if (!isActive) {
      setCurrentAnalysis(0)
      return
    }
    
    const analysisInterval = setInterval(() => {
      setCurrentAnalysis(prev => (prev + 1) % newsParagraphs.length)
    }, 2000)
    
    return () => clearInterval(analysisInterval)
  }, [isActive])



  return (
    <div className="h-full flex flex-col overflow-hidden relative">
      {/* Floating Context Blobs */}
      <AnimatePresence>
        {contexts.map((context, index) => (
          <motion.div
            key={index}
            className="absolute z-10"
            style={context.position}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: isActive ? 1 : 0,
              opacity: isActive ? 1 : 0,
              y: isActive ? [0, -10, 0] : 0
            }}
            transition={{ 
              duration: 0.6, 
              delay: index * 0.2,
              y: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            <div className={`w-28 h-28 bg-gradient-to-br ${context.color} rounded-full shadow-lg flex flex-col items-center justify-center text-white relative`}>
              <div className="text-xs font-bold text-center leading-tight">
                {context.name.split(' ').map((word, i) => (
                  <div key={i}>{word}</div>
                ))}
              </div>
              {/* <div className="text-xs mt-1 opacity-80">{context.score}%</div> */}
              
              {/* Pulse effect */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${context.color} rounded-full opacity-40`}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>

            {/* Connection line to current paragraph */}
            {currentAnalysis === index && (
              <motion.div
                className="absolute top-1/2 left-full w-32 h-0.5 bg-purple-400"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                style={{
                  background: `linear-gradient(90deg, ${newsParagraphs[currentAnalysis].classification === 'fake' ? '#ef4444' : '#10b981'}, transparent)`
                }}
              />
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* News Article Text */}
      <motion.div
        className="flex-1 overflow-y-auto px-8 py-4"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 50 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Artigo em Análise
          </h3>
          
          <div className="space-y-4 text-sm leading-relaxed text-gray-700">
            {newsParagraphs.map((paragraph, index) => (
              <motion.div
                key={paragraph.id}
                className={`transition-all duration-300 p-3 rounded-lg ${
                  currentAnalysis === index
                    ? paragraph.classification === 'fake'
                      ? 'bg-red-50 border-l-4 border-red-500 text-red-900'
                      : 'bg-green-50 border-l-4 border-green-500 text-green-900'
                    : 'bg-gray-50 text-gray-600'
                }`}
                animate={{
                  scale: currentAnalysis === index ? 1.02 : 1,
                  boxShadow: currentAnalysis === index 
                    ? "0 4px 12px rgba(0,0,0,0.1)" 
                    : "0 1px 3px rgba(0,0,0,0.05)"
                }}
                transition={{ duration: 0.3 }}
              >
                <p className="mb-0">
                  {paragraph.text}
                </p>
                
                {currentAnalysis === index && (
                  <motion.div
                    className="mt-2 flex items-center justify-between"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      paragraph.classification === 'fake'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {paragraph.classification === 'fake' ? '❌ Desinformação' : '✅ Informativo'}
                    </span>
                    
                    <div className="text-xs text-gray-500">
                      Contexto: {contexts[paragraph.connectedContext].name}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Status - Fixed at bottom */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
        <motion.div
          className="inline-flex items-center bg-gradient-to-r from-accent-orange/10 to-purple-50 text-accent-orange px-4 py-2 rounded-full border border-accent-orange/20"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: isActive ? 0 : 20, opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <motion.div
            className="w-2 h-2 bg-accent-orange rounded-full mr-2"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <span className="font-medium text-sm">Analisando conteúdo em tempo real...</span>
        </motion.div>
      </div>
    </div>
  )
}

export default AnalysisStep 