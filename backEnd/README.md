# API de Gerenciamento de Apiário 🐝

Backend robusto e seguro para gerenciamento de apiários, desenvolvido com Node.js, Express e Prisma.

## 🚀 Características

- **Arquitetura Limpa**: Estrutura modular e bem organizada
- **Segurança**: Middlewares de segurança, rate limiting, validação de dados
- **Logging Estruturado**: Sistema de logs completo para monitoramento
- **Tratamento de Erros**: Sistema centralizado de tratamento de erros
- **Validação**: Validação de dados com Zod
- **Autenticação**: JWT com refresh tokens
- **Documentação**: API documentada e exemplos de uso
- **Testes**: Configuração para testes unitários e de integração

## 📋 Pré-requisitos

- Node.js >= 18.0.0
- npm >= 8.0.0
- SQLite (ou outro banco suportado pelo Prisma)

## 🛠️ Instalação

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd api-apiario-backend
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:
```env
# Configurações do Servidor
PORT=3000
NODE_ENV=development

# Configurações do Banco de Dados
DATABASE_URL="file:./dev.db"

# Configurações JWT
JWT_SECRET=sua_chave_secreta_muito_segura_aqui
JWT_EXPIRES_IN=24h

# Configurações CORS
CORS_ORIGIN=*
```

4. **Configure o banco de dados**
```bash
npm run db:generate
npm run db:migrate
```

5. **Inicie o servidor**
```bash
# Desenvolvimento
npm run dev

# Produção
npm start
```

## 📁 Estrutura do Projeto

```
src/
├── config/           # Configurações da aplicação
│   ├── app.js       # Configurações gerais
│   └── database.js  # Configuração do banco de dados
├── controllers/     # Controladores da API
├── middlewares/     # Middlewares customizados
│   ├── auth.js      # Autenticação JWT
│   ├── errorHandler.js # Tratamento de erros
│   └── security.js  # Middlewares de segurança
├── routers/         # Rotas da API
├── schemas/         # Schemas de validação (Zod)
├── utils/           # Utilitários
│   ├── errors.js    # Classes de erro customizadas
│   ├── logger.js    # Sistema de logging
│   └── response.js  # Padronização de respostas
└── tests/           # Testes
```

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia o servidor em modo desenvolvimento
npm run lint         # Executa o linter
npm run lint:fix     # Corrige problemas do linter
npm run format       # Formata o código com Prettier

# Banco de Dados
npm run db:migrate   # Executa migrações
npm run db:generate  # Gera cliente Prisma
npm run db:studio    # Abre Prisma Studio
npm run db:seed      # Executa seed do banco

# Testes
npm test             # Executa todos os testes
npm run test:watch   # Executa testes em modo watch
npm run test:coverage # Executa testes com cobertura
```

## 🔐 Autenticação

A API usa JWT (JSON Web Tokens) para autenticação.

### Login
```http
POST /api/v1/login
Content-Type: application/json

{
  "email": "produtor@exemplo.com",
  "password": "senha123"
}
```

### Resposta
```json
{
  "success": true,
  "message": "Login realizado com sucesso",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "name": "João Silva",
      "email": "produtor@exemplo.com",
      "status": "Ativo"
    }
  }
}
```

### Usando o Token
```http
GET /api/v1/beehive
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 📚 Endpoints da API

### Produtores
- `GET /api/v1/producer` - Lista todos os produtores
- `GET /api/v1/producer/:id` - Busca produtor por ID
- `POST /api/v1/producer` - Cria novo produtor
- `PUT /api/v1/producer/:id` - Atualiza produtor
- `DELETE /api/v1/producer/:id` - Remove produtor

### Colmeias
- `GET /api/v1/beehive` - Lista todas as colmeias
- `GET /api/v1/beehive/:id` - Busca colmeia por ID
- `POST /api/v1/beehive` - Cria nova colmeia
- `PUT /api/v1/beehive/:id` - Atualiza colmeia
- `DELETE /api/v1/beehive/:id` - Remove colmeia

### Atividades
- `GET /api/v1/activity` - Lista todas as atividades
- `GET /api/v1/activity/:id` - Busca atividade por ID
- `POST /api/v1/activity` - Cria nova atividade
- `PUT /api/v1/activity/:id` - Atualiza atividade
- `DELETE /api/v1/activity/:id` - Remove atividade

### Produção de Mel
- `GET /api/v1/production_honey` - Lista todas as produções
- `GET /api/v1/production_honey/:id` - Busca produção por ID
- `POST /api/v1/production_honey` - Registra nova produção
- `PUT /api/v1/production_honey/:id` - Atualiza produção
- `DELETE /api/v1/production_honey/:id` - Remove produção

### Temperatura e Umidade
- `GET /api/v1/temperature_humidity` - Lista todas as medições
- `GET /api/v1/temperature_humidity/:id` - Busca medição por ID
- `POST /api/v1/temperature_humidity` - Registra nova medição
- `PUT /api/v1/temperature_humidity/:id` - Atualiza medição
- `DELETE /api/v1/temperature_humidity/:id` - Remove medição

### Alimentação
- `GET /api/v1/food` - Lista todas as alimentações
- `GET /api/v1/food/:id` - Busca alimentação por ID
- `POST /api/v1/food` - Registra nova alimentação
- `PUT /api/v1/food/:id` - Atualiza alimentação
- `DELETE /api/v1/food/:id` - Remove alimentação

### Doenças
- `GET /api/v1/disease` - Lista todas as doenças
- `GET /api/v1/disease/:id` - Busca doença por ID
- `POST /api/v1/disease` - Registra nova doença
- `PUT /api/v1/disease/:id` - Atualiza doença
- `DELETE /api/v1/disease/:id` - Remove doença

## 🛡️ Segurança

- **Helmet**: Headers de segurança
- **Rate Limiting**: Limitação de requisições por IP
- **CORS**: Configuração de Cross-Origin Resource Sharing
- **Validação**: Validação de entrada com Zod
- **Sanitização**: Sanitização de dados de entrada
- **JWT**: Autenticação segura com tokens

## 📊 Logging

O sistema usa logging estruturado com diferentes níveis:

- **INFO**: Informações gerais
- **WARN**: Avisos
- **ERROR**: Erros
- **DEBUG**: Informações de debug (apenas em desenvolvimento)

## 🧪 Testes

```bash
# Executar todos os testes
npm test

# Executar testes com cobertura
npm run test:coverage

# Executar testes em modo watch
npm run test:watch
```

## 🚀 Deploy

### Variáveis de Ambiente para Produção

```env
NODE_ENV=production
PORT=3000
DATABASE_URL="file:./prod.db"
JWT_SECRET=chave_super_secreta_producao
JWT_EXPIRES_IN=24h
CORS_ORIGIN=https://seu-dominio.com
```

### Docker (opcional)

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Suporte

Para suporte, envie um email para suporte@apiario.com ou abra uma issue no repositório.

---

Desenvolvido com ❤️ para o gerenciamento eficiente de apiários. 