'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface ExtractionStepProps {
  isActive: boolean
}

const ExtractionStep = ({ isActive }: ExtractionStepProps) => {
  const newsRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const articleTitleRef = useRef<HTMLDivElement>(null)
  const articleBodyRef = useRef<HTMLDivElement>(null)
  const highlightRef = useRef<HTMLDivElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (!isActive) {
      // Reset all elements to initial state when inactive
      gsap.set([newsRef.current, logoRef.current, titleRef.current, articleTitleRef.current, articleBodyRef.current, statusRef.current], {
        clearProps: "all"
      })
      gsap.set(highlightRef.current, { width: "0%" })
      return
    }
    
    const tl = gsap.timeline()
    
    // Phase 1: Portal materializes (0-1.5s)
    tl.fromTo(newsRef.current, 
      { opacity: 0, y: 20, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power2.out" }
    )
    
    // Elements appear sequentially
    tl.fromTo(logoRef.current, 
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" },
      "-=0.5"
    )
    tl.fromTo(titleRef.current, 
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.4 },
      "-=0.2"
    )
    tl.fromTo(articleTitleRef.current, 
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4 },
      "-=0.1"
    )
    tl.fromTo(articleBodyRef.current, 
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5 },
      "-=0.1"
    )
    
    // Phase 3: Selection process (2-4s)
    tl.to(highlightRef.current, {
      width: "100%",
      duration: 2,
      ease: "power2.inOut",
      delay: 0.5
    })
    
    // Phase 4: Status indicator (4-4.5s)
    tl.fromTo(statusRef.current, 
      { opacity: 0, y: 20, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.7)" },
      "-=0.5"
    )
    
    // Hold final state
    tl.set({}, {}, "+=1")
  }, [isActive])

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center px-4">
        <div className="w-full max-w-2xl mx-auto">
          {/* Simulated News Platform */}
          <div ref={newsRef} className="bg-white rounded-xl p-4 border border-gray-200 shadow-lg">
            {/* Header */}
            <div className="flex items-center mb-4 pb-3 border-b border-gray-100">
              <div 
                ref={logoRef}
                className="w-8 h-8 bg-gradient-to-br from-accent-magenta to-accent-violet rounded-full mr-3 flex items-center justify-center"
              >
                <span className="text-white font-bold text-xs">N</span>
              </div>
              <div>
                <h4 ref={titleRef} className="font-bold text-gray-800 text-base">Portal de Notícias</h4>
                <p className="text-gray-500 text-xs">portal-noticias.com.br</p>
              </div>
            </div>
            
            {/* Article Content */}
            <div className="relative">
              <h5 ref={articleTitleRef} className="text-lg font-bold text-gray-900 mb-3 leading-tight">
                Cientistas Descobrem que Gatos Podem Falar, Mas Apenas às Terças-feiras
              </h5>
              
              <div className="relative">
                <p ref={articleBodyRef} className="text-gray-700 leading-relaxed text-sm mx-2">
                  Um estudo surpreendente publicado na revista 'Ciência Felina Hoje' revelou 
                  que gatos domésticos podem se comunicar verbalmente com humanos, mas essa 
                  habilidade se manifesta exclusivamente às terças-feiras. A descoberta sugere 
                  que uma anomalia no cérebro felino é ativada pelo campo magnético da Terra 
                  em um ciclo semanal, um fenômeno que desafia a biologia. Críticos, no entanto, 
                  questionam a metodologia e pedem por replicação independente dos resultados.
                </p>
                
                {/* Advanced Highlight overlay */}
                <div 
                  ref={highlightRef}
                  className="absolute inset-0 bg-gradient-to-r from-accent-violet/25 to-accent-magenta/25 rounded-md border-l-4 border-accent-violet"
                  style={{ width: "0%" }}
                ></div>
              </div>
              
              {/* Metadata */}
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center text-xs text-gray-500">
                  <span>Por João Silva</span>
                  <span className="mx-2">•</span>
                  <span>12 de Dezembro, 2025</span>
                  <span className="mx-2">•</span>
                  <span>5 min de leitura</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Status Indicator - Fixed at bottom */}
      <div ref={statusRef} className="flex-shrink-0 text-center pb-4">
        <div className="inline-flex items-center bg-gradient-to-r from-accent-violet/10 to-accent-magenta/10 text-accent-violet px-4 py-2 rounded-full border border-accent-violet/20">
          <div className="w-2 h-2 bg-accent-violet rounded-full mr-2 animate-pulse"></div>
          <span className="font-medium text-sm">Extraindo conteúdo da matéria...</span>
        </div>
      </div>
    </div>
  )
}

export default ExtractionStep 