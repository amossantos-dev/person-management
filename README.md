# Person Management

Aplicação full-stack para gerenciamento de pessoas e endereços, construída com Clean Architecture no backend (.NET 10) e React no frontend.

---

## Subindo o projeto com Docker

> Requisito único: ter o [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado e rodando.

### 1. Clone o repositório

```bash
git clone https://github.com/amossantos-dev/person-management.git
cd person-management
```

### 2. Suba todos os serviços

```bash
docker-compose up --build
```

Aguarde até ver nos logs que a API está pronta. O comando sobe três serviços em paralelo:

| Serviço | O que é | Porta |
|---------|---------|-------|
| `sqlserver` | SQL Server 2022 | `1433` |
| `api` | ASP.NET Core (API REST) | `5045` |
| `frontend` | React servido pelo nginx | `3000` |

> As migrations do banco de dados são aplicadas automaticamente quando a API inicializa. Nenhum passo manual necessário.

### 3. Acesse a aplicação

- **Frontend:** http://localhost:3000
- **Swagger (API):** http://localhost:5045/swagger

---

## Testando a API pelo Swagger

### Passo 1 — Abra o Swagger

Acesse http://localhost:5045/swagger no navegador. Você verá todos os endpoints documentados.

### Passo 2 — Obtenha o token JWT

Localize o endpoint `POST /api/auth/login`, clique em **Try it out** e envie:

```json
{
  "username": "admin",
  "password": "admin"
}
```

A resposta será:

```json
{
  "success": true,
  "data": { "token": "<jwt>" },
  "message": "Login realizado com sucesso."
}
```

Copie o valor de `token`.

### Passo 3 — Autorize o Swagger

1. Clique no botão **Authorize** (cadeado) no topo da página
2. No campo `Value`, digite: `Bearer <cole-o-token-aqui>`
3. Clique em **Authorize** e depois em **Close**

A partir de agora, todas as requisições feitas pelo Swagger incluirão o token automaticamente.

### Passo 4 — Explore os endpoints

Com o token configurado, você pode testar qualquer endpoint. Exemplos rápidos:

**Criar uma pessoa** — `POST /api/persons`

```json
{
  "name": "João Silva",
  "dateOfBirth": "1990-05-15",
  "address": {
    "zipCode": "01310-100",
    "street": "Rua das Flores",
    "number": "123",
    "complement": "Apto 4",
    "neighborhood": "Centro",
    "city": "São Paulo",
    "state": "SP",
    "country": "BR"
  }
}
```

**Buscar pessoas paginadas** — `GET /api/persons/find?page=1&pageSize=10&search=João`

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

**Atualizar pessoa** — `PUT /api/persons/{id}`

**Deletar pessoa** — `DELETE /api/persons/{id}`

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
- GitHub Actions (CI)

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

## CI (Integração Contínua)

O projeto utiliza **GitHub Actions** com pipeline automático em todo push ou Pull Request para a branch `main`.

**Jobs executados em paralelo:**

| Job | Etapas |
|-----|--------|
| Backend | `dotnet restore` → `dotnet build` → unitários → integrados |
| Frontend | `npm ci` → `eslint` → `vite build` |

O workflow está em [.github/workflows/ci.yml](.github/workflows/ci.yml).

> Os testes de integração usam Testcontainers — o runner do GitHub Actions já vem com Docker, nenhuma configuração adicional é necessária.

---

## Decisões técnicas

- **Clean Architecture + DDD**: entidades com construtores controlados e `private set` garantem invariantes de domínio. Métodos `Update()` nas entidades evitam mutação direta de fora do domínio.
- **Unit of Work**: agrupa operações de persistência em uma única transação, evitando estados inconsistentes ao criar `Person` + `PersonAddress`.
- **Paginação no banco**: `Skip/Take` são traduzidos pelo EF Core para `OFFSET/FETCH` no SQL, evitando trazer dados desnecessários para memória.
- **FluentValidation antes da lógica**: toda entrada é validada antes de qualquer acesso ao banco, retornando `400` imediatamente com mensagens descritivas.
- **Testcontainers**: os testes integrados sobem um container SQL Server real, garantindo que as queries EF funcionam contra o banco de produção (não mocks).
- **Serilog**: logs estruturados em formato JSON-friendly, facilmente extensível para sinks como Seq ou Elasticsearch.
- **CORS configurável**: origens permitidas ficam no `appsettings.json` para serem ajustadas por ambiente sem recompilar.

---

## Possíveis melhorias futuras

- Refresh token para renovação automática do JWT
- Paginação com cursor em vez de offset para grandes volumes de dados
- Cache com Redis para consultas frequentes
- Testes de carga com k6 ou NBomber
- Cobertura de código com relatório automático
- Soft delete em vez de exclusão permanente
- Auditoria de alterações com timestamps de criação e atualização
