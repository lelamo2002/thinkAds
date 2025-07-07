'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface SectionContextType {
  currentSection: string
  setCurrentSection: (section: string) => void
}

const SectionContext = createContext<SectionContextType>({
  currentSection: 'hero',
  setCurrentSection: () => {}
})

export const useSectionContext = () => useContext(SectionContext)

export const SectionProvider = ({ children }: { children: ReactNode }) => {
  const [currentSection, setCurrentSection] = useState('hero')

  return (
    <SectionContext.Provider value={{ currentSection, setCurrentSection }}>
      {children}
    </SectionContext.Provider>
  )
} 