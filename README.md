# FinanSee Frontend

Uma aplicação Vue.js SPA para gerenciamento financeiro com interface moderna e responsiva.

## 🚀 Tecnologias

- **Vue 3** - Framework JavaScript progressivo
- **TypeScript** - Superset JavaScript com tipagem estática
- **Vue Router** - Roteamento oficial para Vue.js
- **Tailwind CSS** - Framework CSS utilitário
- **Vite** - Build tool rápida e moderna

## 📋 Pré-requisitos

- Node.js 20.19.0 ou superior
- npm ou yarn

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd finanSeeFrontEnd
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

4. Abra [http://localhost:5173](http://localhost:5173) no seu navegador.

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   └── LoginForm.vue   # Formulário de login
├── views/              # Páginas/views da aplicação
│   └── LoginView.vue   # Página de login
├── router/             # Configuração de rotas
│   └── index.ts        # Definição das rotas
├── style.css           # Estilos globais e Tailwind CSS
├── main.ts             # Ponto de entrada da aplicação
└── App.vue             # Componente raiz
```

## 🎨 Funcionalidades

### Tela de Login
- Formulário de autenticação responsivo
- Validação de campos obrigatórios
- Opção "Lembrar de mim"
- Links para recuperação de senha e cadastro
- Botões de login social (Google e Twitter)
- Design moderno com Tailwind CSS
- Estados de loading e feedback visual
- Integração com API de autenticação
- Redirecionamento automático após login

### Sistema de Autenticação
- Integração com API REST
- Armazenamento seguro de tokens
- Guardas de rota para proteção
- Logout automático
- Redirecionamento inteligente
- **Interceptor global para Bearer token**
- **Renovação automática de tokens**
- **Tratamento automático de erros 401**

### Layout Principal
- **Menu lateral responsivo** com navegação intuitiva
- **Header fixo** com informações do usuário e notificações
- **Navegação entre páginas** com destaque visual do item ativo
- **Dropdown de perfil** com opções de configuração
- **Design moderno** com transições suaves e feedback visual
- **Responsivo** - adapta-se perfeitamente a dispositivos móveis e desktop
- **Ícones SVG** para melhor qualidade visual

### Dashboard
- Visão geral das finanças
- Cards de estatísticas
- Lista de transações recentes
- Interface responsiva

## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Constrói a aplicação para produção
- `npm run preview` - Visualiza a build de produção
- `npm run type-check` - Verifica tipos TypeScript

## 🌟 Características

- **SPA (Single Page Application)** - Navegação fluida sem recarregamento
- **Responsivo** - Funciona em dispositivos móveis e desktop
- **TypeScript** - Código mais seguro e manutenível
- **Tailwind CSS** - Estilização rápida e consistente
- **Vue 3 Composition API** - API moderna e reativa
- **Interceptor Global** - Bearer token automático em todas as requisições
- **Cliente HTTP Centralizado** - Gerenciamento unificado de requisições
- **Tratamento de Erros** - Gerenciamento automático de tokens expirados

## 📱 Design

A interface foi desenvolvida seguindo princípios de UX modernos:
- Gradientes suaves e sombras elegantes
- Transições e animações sutis
- Paleta de cores consistente
- Tipografia clara e legível
- Espaçamento harmonioso

## 🚧 Próximos Passos

- [ ] Implementar autenticação real
- [ ] Adicionar validação de formulários
- [ ] Criar dashboard principal
- [ ] Implementar sistema de navegação
- [ ] Adicionar testes unitários
- [ ] Configurar CI/CD

## 📄 Licença

Este projeto está sob a licença MIT.
