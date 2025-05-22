# EstoqueJá - Backend API

Backend para o sistema de gerenciamento de estoque EstoqueJá, construído com Node.js e PostgreSQL.

## Tecnologias Utilizadas

- Node.js
- Express
- Sequelize (ORM)
- PostgreSQL

## Configuração

1. Instale as dependências:
```bash
npm install
```

2. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```
DATABASE_URL=sua_url_do_postgres
PORT=3000
```

3. Inicie o servidor em modo desenvolvimento:
```bash
npm run dev
```

## Rotas Disponíveis

### Produtos

- `POST /api/products`: Criar novo produto
- `GET /api/products`: Listar todos os produtos
- `GET /api/products/:id`: Buscar produto por ID
- `PUT /api/products/:id`: Atualizar produto
- `DELETE /api/products/:id`: Deletar produto

### Formato do Produto

```json
{
  "name": "Nome do Produto",
  "description": "Descrição do produto",
  "price": 99.99,
  "quantity": 100,
  "category": "Categoria",
  "sku": "SKU123",
  "minimumStock": 10
}
```

## Estrutura do Projeto

```
backend/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   └── ProductController.js
│   ├── models/
│   │   └── Product.js
│   ├── routes/
│   │   └── products.js
│   └── server.js
├── .env
└── package.json
``` 