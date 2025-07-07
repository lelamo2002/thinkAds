'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

interface ResultStepProps {
  isActive: boolean
}

const ResultStep = ({ isActive }: ResultStepProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const verdictRef = useRef<HTMLDivElement>(null)
  const suspiciousRef = useRef<HTMLDivElement[]>([])
  const actionRef = useRef<HTMLDivElement>(null)
  
  const suspiciousExcerpts = [
    { 
      id: 1,
      text: "gatos domésticos podem se comunicar verbalmente...", 
      reason: "Afirmação extraordinária sem evidências robustas ou consenso científico."
    },
    { 
      id: 2,
      text: "...publicado na revista 'Ciência Felina Hoje'...", 
      reason: "Fonte sem credibilidade ou fator de impacto conhecido na comunidade."
    }
  ]
  
  useEffect(() => {
    if (!isActive) {
      // Reset all elements to initial state when inactive
      gsap.set(containerRef.current, { clearProps: "all" })
      gsap.set(verdictRef.current, { clearProps: "all" })
      gsap.set(suspiciousRef.current, { clearProps: "all" })
      gsap.set(actionRef.current, { clearProps: "all" })
      return
    }
    
    const tl = gsap.timeline()
    
    // Phase 1: Data convergence (0-1s)
    tl.fromTo(containerRef.current, 
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }
    )
    
    // Phase 2: Verdict appears (1-2s)  
    tl.fromTo(verdictRef.current, 
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, rotate: 0, duration: 1, ease: "back.out(1.7)" },
      "-=0.3"
    )
    
    // Phase 3: Suspicious excerpts appear (2-3s)
    tl.fromTo(suspiciousRef.current, 
      { opacity: 0, x: -30, scale: 0.9 },
      { 
        opacity: 1, 
        x: 0, 
        scale: 1, 
        duration: 0.6,
        stagger: 0.2,
        ease: "back.out(1.7)"
      },
      "-=0.5"
    )
    
    // Phase 4: Action buttons (3-4s)
    tl.fromTo(actionRef.current, 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
      "-=0.3"
    )
    
    // Hold final state
    tl.set({}, {}, "+=1")
  }, [isActive])

  return (
    <div ref={containerRef} className="h-full flex flex-col overflow-hidden">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-4 py-2">
        {/* Main Verdict */}
        <div className="text-center mb-6">
          <div 
            ref={verdictRef}
            className="inline-flex items-center bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full shadow-lg"
          >
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-3">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-xl font-bold">SUSPEITO</span>
          </div>
        </div>

        {/* Suspicious Excerpts */}
        <div className="w-full mb-4">
          <h4 className="text-sm font-bold text-gray-800 mb-3 text-center">
            Trechos Suspeitos Identificados
          </h4>
          
          <div className="space-y-2">
            {suspiciousExcerpts.map((excerpt, index) => (
              <div 
                key={excerpt.id}
                ref={(el) => {
                  if (el) suspiciousRef.current[index] = el
                }}
                className="bg-white rounded-lg p-3 shadow-sm border-l-4 border-orange-500"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center">
                    <span className="w-2 h-2 rounded-full mr-2 bg-orange-500"></span>
                    <span className="text-xs font-medium text-gray-700">Trecho {excerpt.id}</span>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded p-2 mb-2">
                  <p className="text-xs text-gray-700 italic">
                    "{excerpt.text}"
                  </p>
                </div>
                
                <p className="text-xs text-gray-600">
                  <strong>Justificativa:</strong> {excerpt.reason}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Analysis Details */}
        {/* <div className="w-full">
          <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
            <div className="text-center">
              <h5 className="font-semibold text-gray-800 mb-2 text-sm">
                Detalhes da Análise
              </h5>
              <div className="grid grid-cols-3 gap-3 text-xs text-gray-600">
                <div className="text-center">
                  <div className="font-bold text-gray-800">2</div>
                  <div>Trechos Suspeitos</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-gray-800">5</div>
                  <div>Fontes Consultadas</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-gray-800">RAGFlow</div>
                  <div>Método Usado</div>
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Processado: 12/12/2024 14:32:18
              </div>
            </div>
          </div>
        </div> */}
      </div>

      {/* Action Buttons - Fixed at bottom */}
      {/* <div ref={actionRef} className="flex-shrink-0 flex justify-center gap-2 pb-2">
        <button className="bg-accent-violet hover:bg-accent-purple text-white px-3 py-1.5 rounded-lg font-semibold transition-colors shadow-md flex items-center justify-center text-xs">
          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a1 1 0 102 0V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 2a1 1 0 011-1h1a1 1 0 110 2H8a1 1 0 01-1-1zm3 0a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
          Relatório Completo
        </button>
        
        <button className="border border-accent-magenta text-accent-magenta hover:bg-accent-magenta hover:text-white px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center justify-center text-xs">
          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0011.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
          </svg>
          Nova Análise
        </button>
      </div> */}
    </div>
  )
}

export default ResultStep 