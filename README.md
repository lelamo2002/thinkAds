# ThinkAds Landing Page

Landing page moderna e responsiva para o projeto ThinkAds - Sistema inteligente de detecção de fake news utilizando tecnologia RAGFlow (Retrieval-Augmented Generation).

## 🚀 Visão Geral

Este projeto é uma landing page desenvolvida em **Next.js** com **TypeScript** e **Tailwind CSS** para apresentar o ThinkAds, um sistema avançado que utiliza a tecnologia RAGFlow para identificar conteúdos desinformativos em matérias jornalísticas.

A interface é projetada para ser elegante, intuitiva e totalmente responsiva, com animações sutis que guiam o usuário através das funcionalidades do sistema.

## ✨ Funcionalidades Principais

- **Hero Section**: Título impactante e descrição do ThinkAds
- **Carousel Interativo "Como Funciona"**: Uma simulação visual do processo de análise do RAGFlow, dividida em quatro etapas:
  1.  **Coleta**: O usuário insere a URL da notícia.
  2.  **Extração**: O sistema extrai o conteúdo da página.
  3.  **Análise**: O RAGFlow processa e classifica o conteúdo.
  4.  **Resultado**: Apresenta um veredito sobre a confiabilidade da notícia.
- **Seção de Parceiros**: Exibe os logotipos dos parceiros do projeto.
- **CTA (Call-to-Action)**: Incentiva os usuários a experimentarem a ferramenta ou a entrarem em contato.
- **Header e Footer Dinâmicos**: O header muda de cor e estilo com base na seção visível, e o footer contém links e informações importantes.
- **Design Responsivo**: Experiência otimizada para desktops, tablets e smartphones.
- **Animações com Framer Motion**: Animações fluidas e modernas para uma experiência de usuário mais agradável.

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

## 🎨 Design e Estilo

- **Cores**: A paleta de cores é definida no `tailwind.config.js` e utiliza variáveis CSS para fácil customização.
- **Fontes**: A fonte principal é a Inter, importada através do Google Fonts no `app/layout.tsx`.
- **Responsividade**: Utiliza as diretivas do Tailwind (`sm`, `md`, `lg`, `xl`) para garantir a adaptação a diferentes tamanhos de tela.

## 🤝 Contribuição

Contribuições são bem-vindas! Se você tiver sugestões, melhorias ou correções de bugs, sinta-se à vontade para abrir uma **Issue** ou enviar um **Pull Request**.

1.  Faça um fork do projeto.
2.  Crie uma nova branch (`git checkout -b feature/sua-feature`).
3.  Faça commit das suas alterações (`git commit -m 'Adiciona nova feature'`).
4.  Faça push para a branch (`git push origin feature/sua-feature`).
5.  Abra um Pull Request.

## 📜 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🧑‍💻 Desenvolvedores e Parceiros

Este projeto faz parte do ThinkAds, uma iniciativa colaborativa entre:

- **Sleeping Giants Brasil**: Ativismo digital contra o financiamento do discurso de ódio.
- **LabLivre/UnB**: Laboratório de pesquisa e desenvolvimento de software livre da Universidade de Brasília.

### Contato

Para mais informações sobre o projeto ThinkAds:

- **Email**: [contato@lablivre.unb.br](mailto:contato@lablivre.unb.br)
- **GitHub**: [LabLivre](https://github.com/lablivre)

---

Desenvolvido com ❤️ pela equipe ThinkAds 