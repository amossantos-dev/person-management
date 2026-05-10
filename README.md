# Person Management

Aplicação full-stack para gerenciamento de pessoas e endereços, construída com Clean Architecture no backend (.NET 10) e React no frontend.

---

## Tecnologias

**Backend**

- .NET 10 / ASP.NET Core
- Entity Framework Core 10 + SQL Server
- JWT Authentication
- FluentValidation
- AutoMapper
- Serilog
- Swashbuckle (Swagger)
- xUnit + Testcontainers

**Frontend**

- React 19 + TypeScript
- Vite
- React Router v7
- Axios
- Tailwind CSS + shadcn/ui
- Zod + react-hook-form

**Infraestrutura**

- Docker + Docker Compose

---

## Arquitetura

O backend segue Clean Architecture com quatro camadas isoladas:

```
backend/
├── PersonManagement.Domain          # Entidades, interfaces de repositório, IUnitOfWork
├── PersonManagement.Application     # DTOs, validators, serviços, AutoMapper
├── PersonManagement.Infrastructure  # EF Core, repositórios, migrations, UnitOfWork
└── PersonManagement.Api             # Controllers, middlewares, Program.cs
```

- **Domain**: nenhuma dependência externa. Contém `Person`, `PersonAddress`, `IPersonRepository`, `IPersonAddressRepository` e `IUnitOfWork`.
- **Application**: orquestra regras de negócio via `PersonService`. Valida entradas com FluentValidation antes de qualquer operação.
- **Infrastructure**: implementa os repositórios e o `AppDbContext`. Paginação feita direto no SQL via `Skip/Take`.
- **Api**: expõe os endpoints REST, configura JWT, Swagger, CORS e o middleware global de exceções.

---

## Pré-requisitos

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- .NET 10 SDK (para rodar fora do Docker)
- Node.js 20+ (para rodar o frontend fora do Docker)

---

## Rodar tudo com Docker Compose (recomendado)

```bash
docker-compose up --build
```

Isso sobe três serviços:

- **sqlserver** — SQL Server 2022 na porta `1433`
- **api** — API na porta `5045` (internamente `8080`)
- **frontend** — nginx servindo o React na porta `3000`

Acesse:

- Frontend: http://localhost:3000
- Swagger: http://localhost:5045/swagger

> As migrations são aplicadas automaticamente na inicialização da API.

---

## Rodar localmente (sem Docker)

### 1. SQL Server com Docker

**Bash / Git Bash / WSL:**
```bash
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=Admin@123456" \
  -p 1433:1433 --name sqlserver \
  -d mcr.microsoft.com/mssql/server:2022-latest
```

**PowerShell:**
```powershell
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=Admin@123456" -p 1433:1433 --name sqlserver -d mcr.microsoft.com/mssql/server:2022-latest
```

### 2. Configurar a connection string

Edite `backend/PersonManagement.Api/appsettings.json`:

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=localhost,1433;Database=PersonManagement;User Id=sa;Password=Admin@123456;TrustServerCertificate=True"
}
```

### 3. Aplicar as migrations

```bash
cd backend/PersonManagement.Api
dotnet ef database update
```

### 4. Rodar a API

```bash
cd backend/PersonManagement.Api
dotnet run
```

A API estará disponível em `http://localhost:5045`.

### 5. Rodar o frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

O frontend estará disponível em `http://localhost:5173`.

---

## Testes

> Execute os comandos abaixo a partir da raiz do projeto.

### Unitários

```bash
dotnet test tests/PersonManagement.UnitTests
```

Cobrem: validators (FluentValidation), `PersonService` (criar, atualizar, deletar, buscar, paginar) e `AuthController` (login correto e incorreto).

### Integrados

```bash
dotnet test tests/PersonManagement.IntegrationTests
```

Usam `WebApplicationFactory` + `Testcontainers` com SQL Server real. Cobrem todos os endpoints: autenticação, CRUD de pessoas, paginação e proteção de rotas.

> Requer Docker em execução para os testes integrados (Testcontainers sobe o container automaticamente).

---

## Autenticação

A API usa JWT Bearer. As credenciais fixas são:

```
username: admin
password: admin
```

### Obter o token

```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin"
}
```

Resposta:

```json
{
  "success": true,
  "data": { "token": "<jwt>" },
  "message": "Login realizado com sucesso."
}
```

---

## Usar o Swagger com Bearer Token

1. Acesse `http://localhost:5045/swagger`
2. Clique em **Authorize** (cadeado)
3. Digite: `Bearer <seu-token>`
4. Clique em **Authorize** e feche o modal
5. Todas as requisições subsequentes enviarão o token automaticamente

---

## Exemplos de requests

### Criar pessoa

```http
POST /api/persons
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "João Silva",
  "dateOfBirth": "1990-05-15",
  "address": {
    "street": "Rua das Flores",
    "number": "123",
    "complement": "Apto 4",
    "neighborhood": "Centro",
    "city": "São Paulo",
    "state": "SP",
    "country": "Brasil"
  }
}
```

### Buscar pessoas paginadas

```http
GET /api/persons/find?page=1&pageSize=10&search=João
Authorization: Bearer <token>
```

Resposta:

```json
{
  "success": true,
  "data": {
    "items": [...],
    "page": 1,
    "pageSize": 10,
    "totalItems": 42,
    "totalPages": 5
  }
}
```

### Atualizar pessoa

```http
PUT /api/persons/{id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "João Silva Atualizado",
  "dateOfBirth": "1990-05-15",
  "address": { ... }
}
```

### Deletar pessoa

```http
DELETE /api/persons/{id}
Authorization: Bearer <token>
```

---

## Padrão de resposta da API

Todas as respostas seguem o mesmo envelope:

**Sucesso:**

```json
{ "success": true, "data": {}, "message": "..." }
```

**Erro:**

```json
{ "success": false, "errors": ["mensagem de erro"] }
```

Status HTTP utilizados: `200`, `400`, `401`, `404`, `500`.

---

## Decisões técnicas

- **Clean Architecture + DDD**: entidades com construtores controlados e `private set` garantem invariantes de domínio. Métodos `Update()` nas entidades evitam mutação direta de fora do domínio.
- **Unit of Work**: agrupa operações de persistência em uma única transação, evitando estados inconsistentes ao criar `Person` + `PersonAddress`.
- **Paginação no banco**: `Skip/Take` são traduzidos pelo EF Core para `OFFSET/FETCH` no SQL, evitando trazer dados desnecessários para memória.
- **FluentValidation antes da lógica**: toda entrada é validada antes de qualquer acesso ao banco, retornando `400` imediatamente com mensagens descritivas.
- **Testcontainers**: os testes integrados sobem um container SQL Server real, garantindo que as queries EF funcionam contra o banco de produção (não mocks).
- **Serilog**: logs estruturados em formato JSON-friendly, facilmente extensível para sinks como Seq ou Elasticsearch.
- **CORS configurável**: origens permitidas ficam no `appsettings.json` para serem ajustadas por ambiente sem recompilar.

## Possíveis melhorias futuras

- Refresh token para renovação automática do JWT
- Paginação com cursor em vez de offset para grandes volumes de dados
- Cache com Redis para consultas frequentes
- Testes de carga com k6 ou NBomber
- CI/CD com GitHub Actions
- Cobertura de código com relatório automático
- Soft delete em vez de exclusão permanente
- Auditoria de alterações com timestamps de criação e atualização
