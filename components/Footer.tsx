import Link from 'next/link'
import Image from 'next/image'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo e Descrição */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Image 
                src="/logoH.png" 
                alt="LabLivre" 
                width={160} 
                height={48}
                className="h-12 w-auto"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
              <div className="border-l border-gray-400 h-10"></div>
              <span className="text-2xl font-bold">ThinkAds</span>
            </div>
            <p className="text-gray-300 text-sm">
              Sistema inteligente de detecção de fake news utilizando 
              tecnologia RAGFlow para análise de conteúdo jornalístico.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Links Úteis</h3>
            <div className="space-y-2">
              <Link href="/" className="block text-gray-300 hover:text-white transition-colors">
                Início
              </Link>
              <Link href="/documentacao" className="block text-gray-300 hover:text-white transition-colors">
                Documentação
              </Link>
              <Link href="/sobre" className="block text-gray-300 hover:text-white transition-colors">
                Sobre
              </Link>
            </div>
          </div>

          {/* Parceiros */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Parceiros</h3>
            <div className="flex items-center space-x-4">
              <Image 
                src="/sleepingGiants.png" 
                alt="Sleeping Giants Brasil" 
                width={40} 
                height={40}
                className="h-10 w-auto rounded-full"
              />
              <Image 
                src="/logo.png" 
                alt="LabLivre" 
                width={40} 
                height={40}
                className="h-10 w-auto"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
               <Image 
                src="/unb.png" 
                alt="UnB" 
                width={40} 
                height={40}
                className="h-10 w-auto"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2025 ThinkAds. Desenvolvido em parceria com Sleeping Giants, LabLivre e UnB.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 