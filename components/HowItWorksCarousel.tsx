'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react'

// Import step components
import { ExtractionStep, AnalysisStep, RetrievalStep, ResultStep } from './carousel'

gsap.registerPlugin(ScrollTrigger)

interface CarouselStep {
  id: number
  title: string
  subtitle: string
  componentType: 'extraction' | 'analysis' | 'retrieval' | 'result'
}

const HowItWorksCarousel = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isInView, setIsInView] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement[]>([])
  const progressRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<GSAPTimeline>()
  const autoPlayRef = useRef<NodeJS.Timeout>()
  const currentStepRef = useRef(0)
  const isTransitioningRef = useRef(false)

  const steps: CarouselStep[] = [
    {
      id: 1,
      title: "Extração de Conteúdo",
      subtitle: "Coleta inteligente de matérias jornalísticas",
      componentType: 'extraction'
    },
    {
      id: 2,
      title: "Verificando Base de Conhecimento",
      subtitle: "Buscando contexto relevante sobre padrões de desinformação em nossa base de dados",
      componentType: 'retrieval'
    },
    {
      id: 3,
      title: "Análise",
      subtitle: "Comparando a matéria com o contexto de verificação para identificar padrões de desinformação",
      componentType: 'analysis'
    },
    {
      id: 4,
      title: "Resultado Final",
      subtitle: "Classificação precisa e transparente",
      componentType: 'result'
    }
  ]

  const renderStepComponent = (stepType: string, isActive: boolean) => {
    switch (stepType) {
      case 'extraction':
        return <ExtractionStep isActive={isActive} />
      case 'analysis':
        return <AnalysisStep isActive={isActive} />
      case 'retrieval':
        return <RetrievalStep isActive={isActive} />
      case 'result':
        return <ResultStep isActive={isActive} />
      default:
        return null
    }
  }

  // Initialize timeline and scroll trigger on mount
  useEffect(() => {
    timelineRef.current = gsap.timeline({ paused: true })
    
    // Set up scroll trigger to detect when carousel is in view
    const scrollTrigger = ScrollTrigger.create({
      trigger: carouselRef.current,
      start: "top 90%", // When top of carousel is 90% down the viewport
      end: "bottom 10%", // When bottom of carousel is 10% from top of viewport
      onEnter: () => setIsInView(true),
      onLeave: () => setIsInView(false),
      onEnterBack: () => setIsInView(true),
      onLeaveBack: () => setIsInView(false),
    })

    return () => {
      scrollTrigger.kill()
    }
  }, [])

  const startAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearTimeout(autoPlayRef.current)
    }
    
    // Only start auto-play if carousel is in view and playing is enabled
    if (isInView && isPlaying) {
      autoPlayRef.current = setTimeout(() => {
        if (isPlaying && isInView) {
          const nextStep = (currentStepRef.current + 1) % steps.length
          goToStep(nextStep)
        }
      }, 8000) // 8 seconds per step
    }
  }, [steps.length, isPlaying, isInView])

  const goToStep = useCallback((stepIndex: number) => {
    if (stepIndex === currentStepRef.current || isTransitioningRef.current) return

    // Clear any existing auto-play timer
    if (autoPlayRef.current) {
      clearTimeout(autoPlayRef.current)
    }

    // Set transition lock
    isTransitioningRef.current = true

    const isNext = stepIndex > currentStepRef.current
    animateToStep(stepIndex, isNext)
    setCurrentStep(stepIndex)
    currentStepRef.current = stepIndex
    
    // Unlock transition after animation completes
    setTimeout(() => {
      isTransitioningRef.current = false
      
      // Restart auto-play if it's enabled and in view
      if (isPlaying && isInView) {
        startAutoPlay()
      }
    }, 800) // Match the animation duration
  }, [isPlaying, startAutoPlay])

  const goToNextStep = useCallback(() => {
    const nextStep = (currentStepRef.current + 1) % steps.length
    goToStep(nextStep)
  }, [steps.length, goToStep])

  const goToPrevStep = useCallback(() => {
    const prevStep = currentStepRef.current === 0 ? steps.length - 1 : currentStepRef.current - 1
    goToStep(prevStep)
  }, [steps.length, goToStep])

  // Handle auto-play when play state or visibility changes
  useEffect(() => {
    if (isPlaying && isInView) {
      startAutoPlay()
    } else {
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current)
      }
    }

    return () => {
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current)
      }
    }
  }, [isPlaying, isInView, startAutoPlay])

  // Handle tab visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Tab is hidden, clear auto-play
        if (autoPlayRef.current) {
          clearTimeout(autoPlayRef.current)
        }
              } else {
          // Tab is visible again, restart auto-play if enabled and in view
          if (isPlaying && isInView) {
            startAutoPlay()
          }
        // Ensure the current step is properly displayed
        const activeStep = stepsRef.current[currentStepRef.current]
        if (activeStep) {
          gsap.set(activeStep, {
            opacity: 1,
            x: 0,
            scale: 1
          })
        }
        // Hide all other steps
        stepsRef.current.forEach((step, index) => {
          if (index !== currentStepRef.current && step) {
            gsap.set(step, {
              opacity: 0,
              x: index < currentStepRef.current ? -100 : 100,
              scale: 0.95
            })
          }
        })
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    
         return () => {
       document.removeEventListener('visibilitychange', handleVisibilityChange)
     }
   }, [isPlaying, isInView, startAutoPlay])

  const animateToStep = (stepIndex: number, isNext: boolean = true) => {
    // Kill all existing animations on steps
    stepsRef.current.forEach((step) => {
      if (step) gsap.killTweensOf(step)
    })
    
    const tl = gsap.timeline()
    
    // Animate progress bar
    tl.to(progressRef.current, {
      width: `${((stepIndex + 1) / steps.length) * 100}%`,
      duration: 0.6,
      ease: "power2.out"
    })

    // First, immediately set all steps to their final hidden state
    stepsRef.current.forEach((step, index) => {
      if (index !== stepIndex && step) {
        gsap.set(step, {
          opacity: 0,
          x: index < stepIndex ? -100 : 100,
          scale: 0.95
        })
      }
    })

    // Then animate only the active step
    const activeStep = stepsRef.current[stepIndex]
    if (activeStep) {
      tl.fromTo(activeStep, 
        { 
          opacity: 0, 
          x: isNext ? 100 : -100,
          scale: 0.95
        },
        { 
          opacity: 1, 
          x: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out"
        }, 
        "-=0.4"
      )
    }
  }

  const toggleAutoPlay = () => {
    setIsPlaying(!isPlaying)
    if (autoPlayRef.current) {
      clearTimeout(autoPlayRef.current)
    }
  }

  return (
    <div ref={carouselRef} className="w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Como Funciona
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Nossa solução integra Modelos de Linguagem de Grande Escala (LLMs) com uma base de 
          conhecimento estruturada para análise precisa de conteúdo jornalístico.
        </p>
      </div>

      {/* Progress Bar */}
      {/* <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
        <div 
          ref={progressRef}
          className="bg-gradient-to-r from-accent-violet to-accent-magenta h-2 rounded-full transition-all duration-600"
          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        />
      </div> */}

      {/* Step Indicators */}
      {/* <div className="flex justify-center space-x-4 mb-8">
        {steps.map((step, index) => (
          <button
            key={step.id}
            onClick={() => goToStep(index)}
            className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
              index === currentStep
                ? 'bg-accent-violet text-white shadow-lg scale-110'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            {step.id}
          </button>
        ))}
      </div> */}

      {/* Main Carousel Area */}
      <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden h-[700px]">
        {/* Step Content */}
        <div className="relative w-full h-full">
          {steps.map((step, index) => (
            <div
              key={step.id}
              ref={(el) => {
                if (el) stepsRef.current[index] = el
              }}
              className={`absolute inset-0 p-6 md:p-8 flex flex-col ${
                index === currentStep ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="mb-6 flex-shrink-0">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-lg text-gray-600">
                  {step.subtitle}
                </p>
              </div>
              <div className="flex-1 overflow-hidden">
                {renderStepComponent(step.componentType, index === currentStep && isInView)}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Controls */}
        <div className="absolute bottom-6 left-6 flex items-center space-x-4">
          <button
            onClick={goToPrevStep}
            className="bg-white/90 hover:bg-white text-gray-700 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-105"
          >
            <ChevronLeft size={20} />
          </button>
          
          <button
            onClick={toggleAutoPlay}
            className="bg-white/90 hover:bg-white text-gray-700 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-105"
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          
          <button
            onClick={goToNextStep}
            className="bg-white/90 hover:bg-white text-gray-700 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-105"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Step Counter */}
        <div className="absolute bottom-6 right-6 bg-white/90 px-4 py-2 rounded-full shadow-lg">
          <span className="text-sm font-medium text-gray-700">
            {currentStep + 1} / {steps.length}
          </span>
        </div>
      </div>
    </div>
  )
}

export default HowItWorksCarousel 