import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { SectionProvider } from '@/app/contexts/SectionContext'

export const metadata: Metadata = {
  title: 'ThinkAds - Detecção de Fake News',
  description: 'Sistema inteligente para detecção de fake news utilizando tecnologia RAGFlow e Retrieval-Augmented Generation',
  keywords: 'fake news, detecção, RAG, inteligência artificial, jornalismo, ThinkAds',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen flex flex-col">
        <SectionProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </SectionProvider>
      </body>
    </html>
  )
} 