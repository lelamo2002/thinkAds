'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Shield, Brain, Search, Users } from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import { useRef, useEffect } from 'react'
import { useSectionContext } from './contexts/SectionContext'
import Card from '../components/Card'
import HowItWorksCarousel from '../components/HowItWorksCarousel'

export default function Home() {
  const { setCurrentSection } = useSectionContext()
  
  // Refs for each section and their animations
  const heroRef = useRef<HTMLElement>(null)
  const howItWorksRef = useRef<HTMLElement>(null)
  const partnersRef = useRef<HTMLElement>(null)
  const ctaRef = useRef<HTMLElement>(null)
  
  // Individual isInView for each section
  const heroInView = useInView(heroRef, { once: true, margin: "-100px" })
  const howItWorksInView = useInView(howItWorksRef, { once: true, margin: "-100px" })
  const partnersInView = useInView(partnersRef, { once: true, margin: "-100px" })
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" })

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('data-section')
          if (sectionId) {
            setCurrentSection(sectionId)
          }
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    // Observe all sections
    const sections = [heroRef, howItWorksRef, partnersRef, ctaRef]
    sections.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current)
      }
    })

    return () => {
      sections.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current)
        }
      })
    }
  }, [])

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
      <div className="bg-white">
        {/* Hero Section */}
        <section 
          ref={heroRef}
          data-section="hero"
          className="bg-gradient-to-br from-primary-50 to-secondary-50 py-20 px-4 sm:px-6 lg:px-8 min-h-[80vh] flex items-center"
        >
          <div className="max-w-7xl mx-auto text-center w-full">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <motion.span 
                className="text-accent-magenta"
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
              >
                ThinkAds
              </motion.span>
              <br />
              <motion.span
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                Detecção Inteligente de Fake News
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto"
              {...fadeInUp}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              Sistema avançado que utiliza tecnologia <strong>RAGFlow (Retrieval-Augmented Generation)</strong> para 
              identificar conteúdos desinformativos em matérias jornalísticas com precisão e transparência.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  href="/documentacao"
                  className="bg-accent-violet hover:bg-accent-purple text-white px-8 py-3 rounded-lg font-semibold inline-flex items-center justify-center gap-2 transition-colors w-full sm:w-auto min-w-[200px]"
                >
                  Ver Documentação
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <ArrowRight size={20} />
                  </motion.div>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  href="/sobre"
                  className="border-2 border-accent-magenta text-accent-magenta hover:bg-accent-magenta hover:text-white px-8 py-3 rounded-lg font-semibold inline-flex items-center justify-center transition-colors w-full sm:w-auto min-w-[200px]"
                >
                  Saiba Mais
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Como Funciona */}
        <section 
          ref={howItWorksRef}
          data-section="how-it-works"
          className="relative bg-gray-50 py-20 px-4 sm:px-6 lg:px-8"
        >
          {/* Thin left bar */}
          <div className="absolute left-0 top-0 w-2 h-full bg-gradient-to-b from-secondary-400 via-secondary-500 to-secondary-600"></div>
          
          <motion.div 
            className="max-w-7xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={howItWorksInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <HowItWorksCarousel />
          </motion.div>
        </section>

        {/* Parceiros */}
        <section 
          ref={partnersRef}
          data-section="partners"
          className="relative bg-white py-20 px-4 sm:px-6 lg:px-8"
        >
          {/* Thin left bar */}
          <div className="absolute left-0 top-0 w-2 h-full bg-gradient-to-b from-accent-magenta via-accent-magenta to-accent-violet"></div>
          
          <div className="max-w-7xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              animate={partnersInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Parceiros e Colaboradores
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Este projeto é resultado da colaboração entre organizações comprometidas com o 
                combate à desinformação e o fortalecimento do jornalismo.
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="hidden"
              animate={partnersInView ? "visible" : "hidden"}
            >
              <Card
                customIcon={
                  <Image 
                    src="/sleepingGiants.png" 
                    alt="Sleeping Giants Brasil" 
                    width={100} 
                    height={100}
                    className="w-full h-full object-contain p-2 rounded-full"
                  />
                }
                title="Sleeping Giants Brasil"
                description="Organização dedicada ao combate à desinformação e promoção da responsabilidade na mídia digital brasileira."
                iconBgColor="bg-white"
                titleSize="large"
                variants={cardVariants}
              />

              <Card
                customIcon={
                  <Image 
                    src="/logo.png" 
                    alt="LabLivre" 
                    width={100} 
                    height={100}
                    className="w-full h-full object-contain"
                  />
                }
                title="LabLivre"
                description="Laboratório de pesquisa e desenvolvimento em tecnologias livres da Universidade de Brasília, focado em inovação tecnológica."
                titleSize="large"
                iconBgColor='bg-white'
                variants={cardVariants}
              />

              <Card
                customIcon={
                  <Image 
                    src="/unb.png" 
                    alt="UnB" 
                    width={100} 
                    height={100}
                    className="w-full h-full object-contain p-2"
                  />
                }
                title="Universidade de Brasília"
                description="Instituição de ensino superior de excelência, proporcionando a base acadêmica e científica para o desenvolvimento do projeto."
                iconBgColor="bg-white"
                titleSize="large"
                variants={cardVariants}
              />
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section 
          ref={ctaRef}
          data-section="cta"
          className="relative bg-gray-50 py-20 px-4 sm:px-6 lg:px-8"
        >
          {/* Thin left bar */}
          <div className="absolute left-0 top-0 w-2 h-full bg-gradient-to-b from-accent-violet via-accent-purple to-accent-violet"></div>
          
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={ctaInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Participe do Combate à Desinformação
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Acesse nossa documentação técnica e descubra como implementar e contribuir 
              com o projeto ThinkAds.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/documentacao"
                className="bg-accent-violet text-white hover:bg-accent-purple px-8 py-3 rounded-lg font-semibold inline-flex items-center gap-2 transition-colors shadow-lg"
              >
                Acessar Documentação
                <ArrowRight size={20} />
              </Link>
            </motion.div>
          </motion.div>
        </section>
       </div>
   )
} 