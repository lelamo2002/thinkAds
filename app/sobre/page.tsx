import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Users, Target, Heart, Lightbulb, Shield, Globe } from 'lucide-react'

export default function Sobre() {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
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
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Sobre o ThinkAds
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Conheça mais sobre nosso projeto, a equipe envolvida e a parceria estratégica 
            que torna possível o combate à desinformação através da tecnologia.
          </p>
        </div>

        {/* Missão e Visão */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-primary-50 to-secondary-50 p-8 rounded-xl">
              <div className="w-16 h-16 bg-accent-violet rounded-full flex items-center justify-center mb-6">
                <Target className="text-white" size={32} />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Nossa Missão</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                Desenvolver e disponibilizar tecnologias avançadas de inteligência artificial 
                para identificar e combater a desinformação, fortalecendo o ecossistema de 
                informação confiável no Brasil e promovendo a democratização do acesso 
                a ferramentas de verificação de fatos.
              </p>
            </div>

            <div className="bg-gradient-to-br from-secondary-50 to-primary-50 p-8 rounded-xl">
              <div className="w-16 h-16 bg-accent-magenta rounded-full flex items-center justify-center mb-6">
                <Lightbulb className="text-white" size={32} />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Nossa Visão</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                Ser referência mundial em soluções tecnológicas para combate à desinformação, 
                contribuindo para um ambiente digital mais seguro e confiável, onde a 
                informação de qualidade seja acessível a todos os cidadãos.
              </p>
            </div>
          </div>
        </section>

        {/* A Parceria */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              A Parceria
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Uma colaboração estratégica entre organizações complementares, unindo expertise 
              em combate à desinformação, pesquisa acadêmica e desenvolvimento tecnológico.
            </p>
          </div>

          <div className="bg-gray-50 p-8 rounded-xl mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Sleeping Giants */}
              <div className="text-center">
                <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center mx-auto mb-4 p-3 border border-gray-200">
                  <Image 
                    src="/sleepingGiants.png" 
                    alt="Sleeping Giants Brasil" 
                    width={100} 
                    height={100}
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Sleeping Giants Brasil</h3>
                <p className="text-gray-600">
                  <strong>Expertise em combate à desinformação</strong><br />
                  Contribui com conhecimento prático sobre padrões de desinformação, 
                  metodologias de identificação e estratégias de resposta.
                </p>
              </div>

              {/* LabLivre */}
              <div className="text-center">
                <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center mx-auto mb-4 p-3 border border-gray-200">
                  <Image 
                    src="/logo.png" 
                    alt="LabLivre" 
                    width={100} 
                    height={100}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">LabLivre</h3>
                <p className="text-gray-600">
                  <strong>Desenvolvimento e inovação tecnológica</strong><br />
                  Responsável pela implementação técnica, desenvolvimento de algoritmos 
                  e integração de tecnologias de ponta.
                </p>
              </div>

              {/* UnB */}
              <div className="text-center">
                <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center mx-auto mb-4 p-3 border border-gray-200">
                  <Image 
                    src="/unb.png" 
                    alt="UnB" 
                    width={100} 
                    height={100}
                    className="w-full h-full object-contain p-2"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Universidade de Brasília</h3>
                <p className="text-gray-600">
                  <strong>Base acadêmica e científica</strong><br />
                  Fornece fundamentação teórica, metodologia de pesquisa e 
                  recursos acadêmicos para validação científica.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-primary-50 p-8 rounded-xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              Como Funciona a Colaboração
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Troca de Conhecimento</h4>
                <p className="text-gray-700 mb-4">
                  Reuniões regulares entre as equipes para compartilhar insights, 
                  discutir desafios e alinhar estratégias de desenvolvimento.
                </p>
                
                <h4 className="font-semibold text-gray-900 mb-2">Validação Cruzada</h4>
                <p className="text-gray-700">
                  Cada organização contribui com sua expertise específica para 
                  validar e aprimorar diferentes aspectos do projeto.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Desenvolvimento Iterativo</h4>
                <p className="text-gray-700 mb-4">
                  Ciclos de desenvolvimento que incorporam feedback contínuo 
                  das três organizações para garantir eficácia e relevância.
                </p>
                
                <h4 className="font-semibold text-gray-900 mb-2">Impacto Social</h4>
                <p className="text-gray-700">
                  Foco no desenvolvimento de soluções que tenham impacto real 
                  na sociedade e contribuam para o bem comum.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Equipe */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nossa Equipe
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Profissionais dedicados de diferentes áreas, unidos pelo objetivo comum 
              de combater a desinformação através da tecnologia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pesquisadores */}
            <div className="bg-white p-6 border border-gray-200 rounded-xl">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Pesquisadores</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Especialistas em Inteligência Artificial</li>
                <li>• Pesquisadores em Processamento de Linguagem Natural</li>
                <li>• Cientistas de Dados</li>
                <li>• Especialistas em Comunicação</li>
              </ul>
            </div>

            {/* Desenvolvedores */}
            <div className="bg-white p-6 border border-gray-200 rounded-xl">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="text-green-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Desenvolvedores</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Engenheiros de Software</li>
                <li>• Especialistas em Machine Learning</li>
                <li>• Desenvolvedores Full-Stack</li>
                <li>• Arquitetos de Sistemas</li>
              </ul>
            </div>

            {/* Especialistas */}
            <div className="bg-white p-6 border border-gray-200 rounded-xl">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-purple-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Especialistas</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Analistas de Conteúdo</li>
                <li>• Especialistas em Fact-checking</li>
                <li>• Consultores em Mídia Digital</li>
                <li>• Coordenadores de Projeto</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Valores */}
        <section className="mb-20">
                      <div className="bg-gradient-to-r from-accent-violet to-accent-magenta text-white p-8 rounded-xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Nossos Valores</h2>
              <p className="text-purple-100 text-lg">
                Princípios que guiam nosso trabalho e definem nossa abordagem
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield size={24} />
                </div>
                <h3 className="font-semibold mb-2">Transparência</h3>
                <p className="text-purple-100 text-sm">
                  Metodologias abertas e resultados rastreáveis
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users size={24} />
                </div>
                <h3 className="font-semibold mb-2">Colaboração</h3>
                <p className="text-purple-100 text-sm">
                  Trabalho em equipe e parceria estratégica
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Lightbulb size={24} />
                </div>
                <h3 className="font-semibold mb-2">Inovação</h3>
                <p className="text-purple-100 text-sm">
                  Tecnologias de ponta aplicadas responsavelmente
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart size={24} />
                </div>
                <h3 className="font-semibold mb-2">Impacto Social</h3>
                <p className="text-purple-100 text-sm">
                  Soluções que beneficiam a sociedade
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="bg-gray-50 p-8 rounded-xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Junte-se ao Movimento
            </h2>
                          <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
                Interessado em contribuir ou saber mais sobre o ThinkAds? 
                Explore nossa documentação e descubra como participar.
              </p>
            <Link
              href="/documentacao"
              className="bg-accent-violet hover:bg-accent-purple text-white px-8 py-3 rounded-lg font-semibold inline-flex items-center gap-2 transition-colors"
            >
              Explore a Documentação
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
} 