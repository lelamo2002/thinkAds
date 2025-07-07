'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { ExternalLink, ArrowLeft, Book, Code, FileText } from 'lucide-react'

export default function Documentacao() {
  // Redirecionamento automático após alguns segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      window.open('https://documentacao-6da943.gitlab.io/', '_blank')
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleRedirect = () => {
    window.open('https://documentacao-6da943.gitlab.io/', '_blank')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Navegação */}
        <div className="mb-8">
                      <Link 
              href="/"
              className="inline-flex items-center gap-2 text-accent-magenta hover:text-accent-violet font-medium"
            >
            <ArrowLeft size={20} />
            Voltar ao Início
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-accent-violet rounded-full flex items-center justify-center mx-auto mb-6">
            <Book className="text-white" size={40} />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Documentação Técnica
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Acesse nossa documentação completa para implementar e contribuir com o projeto ThinkAds.
          </p>
        </div>

        {/* Card de Redirecionamento */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Redirecionando para a Documentação
            </h2>
            <p className="text-gray-600 mb-6">
              Você será redirecionado automaticamente em alguns segundos para nossa documentação técnica completa.
            </p>
            
            <div className="flex justify-center mb-6">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-violet"></div>
            </div>

            <button
              onClick={handleRedirect}
              className="bg-accent-violet hover:bg-accent-purple text-white px-8 py-3 rounded-lg font-semibold inline-flex items-center gap-2 transition-colors"
            >
              Acessar Agora
              <ExternalLink size={20} />
            </button>
          </div>
        </div>

        {/* Informações Adicionais */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <FileText className="text-blue-600" size={24} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Guia de Instalação</h3>
            <p className="text-gray-600 text-sm">
              Instruções detalhadas para configurar e executar o ThinkAds em seu ambiente.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Code className="text-green-600" size={24} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">API Reference</h3>
            <p className="text-gray-600 text-sm">
              Referência completa da API para integração e desenvolvimento.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Book className="text-purple-600" size={24} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Tutoriais</h3>
            <p className="text-gray-600 text-sm">
              Exemplos práticos e tutoriais passo a passo para diferentes casos de uso.
            </p>
          </div>
        </div>

        {/* Link Manual */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Não foi redirecionado automaticamente?
          </p>
          <a
            href="https://documentacao-6da943.gitlab.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-magenta hover:text-accent-violet font-medium inline-flex items-center gap-2"
          >
            Clique aqui para acessar a documentação
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </div>
  )
} 