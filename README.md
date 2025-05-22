# EstoqueJá - Sistema de Gerenciamento de Estoque

Sistema web moderno para gerenciamento de estoque, desenvolvido com tecnologias atuais e boas práticas de desenvolvimento.

## 🚀 Tecnologias Utilizadas

### Frontend
- React 18
- TypeScript
- Vite
- TailwindCSS
- React Router DOM
- Lucide React (ícones)

### Backend
- Node.js
- Express
- Sequelize (ORM)
- SQLite (banco de dados local)
- Dotenv (configuração)
- CORS
- Helmet (segurança)
- Morgan (logging)

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- NPM ou Yarn

## 🔧 Instalação

### Frontend

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITÓRIO]
cd SISTEMA-DE-ESTOQUE-
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto em modo de desenvolvimento:
```bash
npm run dev
```

### Backend

1. Navegue até a pasta do backend:
```bash
cd backend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz do backend com as seguintes variáveis:
```env
PORT=3000
```

4. Execute o servidor:
```bash
npm run dev
```

O banco de dados SQLite será criado automaticamente na primeira execução do servidor.

## 🏗️ Estrutura do Projeto

### Frontend
```
src/
├── components/     # Componentes React reutilizáveis
├── pages/         # Páginas da aplicação
├── routes/        # Configuração de rotas
├── services/      # Serviços e chamadas API
└── styles/        # Estilos e configuração do Tailwind
```

### Backend
```
src/
├── controllers/   # Controladores da aplicação
├── models/        # Modelos do Sequelize
├── routes/        # Rotas da API
├── config/        # Configurações
└── middleware/    # Middlewares
```

## 🛠️ Funcionalidades

- Gestão de produtos
- Controle de estoque
- Registro de entradas e saídas
- Relatórios
- Gestão de usuários
- Dashboard com métricas

## 📦 Scripts Disponíveis

### Frontend
- `npm run dev`: Inicia o servidor de desenvolvimento
- `npm run build`: Gera build de produção
- `npm run preview`: Visualiza a build de produção
- `npm run lint`: Executa o linter

### Backend
- `npm run start`: Inicia o servidor em produção
- `npm run dev`: Inicia o servidor em modo desenvolvimento com hot-reload

## 🔐 Segurança

O sistema implementa várias camadas de segurança:
- Helmet para proteção de cabeçalhos HTTP
- CORS configurado adequadamente
- Variáveis de ambiente para dados sensíveis
- Validação de dados nas requisições

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC. Veja o arquivo `LICENSE` para mais detalhes.

## ✨ Autores

* **[Nome do Autor]** - *Trabalho inicial*

## 📝 Notas de Versão

### v0.1.0
- Implementação inicial do sistema
- Configuração básica do frontend e backend
- Integração com banco de dados
- Interface básica de usuário
