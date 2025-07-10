# ThinkAds Landing Page

Landing page moderna e responsiva para o projeto ThinkAds - Sistema inteligente de detecção de fake news utilizando tecnologia RAGFlow (Retrieval-Augmented Generation).

## 🚀 Visão Geral

Este projeto é uma landing page desenvolvida em **Next.js** com **TypeScript** e **Tailwind CSS** para apresentar o ThinkAds, um sistema avançado que utiliza a tecnologia RAGFlow para identificar conteúdos desinformativos em matérias jornalísticas.

A interface é projetada para ser elegante, intuitiva e totalmente responsiva, com animações sutis que guiam o usuário através das funcionalidades do sistema.

## 🛠️ Tecnologias Utilizadas

- **Framework**: [Next.js](https://nextjs.org/) (v14+)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/) (v3+)
- **Animações**: [Framer Motion](https://www.framer.com/motion/)
- **Ícones**: [Lucide React](https://lucide.dev/)
- **Linting e Formatting**: ESLint e Prettier
- **Gerenciador de Pacotes**: NPM

## ⚙️ Estrutura do Projeto

```
├── app/                  # Rotas e páginas principais (App Router)
│   ├── layout.tsx        # Layout principal
│   ├── page.tsx          # Página inicial (Hero, Como Funciona, etc.)
│   ├── documentacao/     # Página de documentação
│   └── sobre/            # Página sobre o projeto
├── components/           # Componentes reutilizáveis
│   ├── carousel/         # Componentes do carousel interativo
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── ...
├── contexts/             # Contextos React (ex: SectionContext)
├── public/               # Arquivos estáticos (imagens, fontes)
├── styles/               # Estilos globais
├── ...
```

## 🚀 Como Executar o Projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/en/) (v18+)
- [NPM](https://www.npmjs.com/)

### Instalação

1.  Clone o repositório:
    ```bash
    git clone https://github.com/seu-usuario/thinkads-landing.git
    ```
2.  Navegue até o diretório do projeto:
    ```bash
    cd thinkads-landing
    ```
3.  Instale as dependências:
    ```bash
    npm install
    ```

### Executando em Modo de Desenvolvimento

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

### Build para Produção

Para criar uma versão otimizada para produção:

```bash
npm run build
```

O projeto buildado estará na pasta `.next`.

## 📜 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.