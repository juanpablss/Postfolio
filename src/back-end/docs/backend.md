---
version: 1.0.0
---
# Tutorial
**Versão:** 1.0.0
Está seção trata do tutorial para fazer a api ser executada. De prefencia, tenho o gerenciador de pacotes **yarn** instalado em sua maquina, caso não tenha, pode prosseguir com **npm.** Os seguintes comandos serão feitos em **yarn.** 

1. Nague ou abra o terminal do diretorio back-end do projeto.
```bash
cd src/back-end
```

2. Execute a instalação das dependencias.
```bash
yarn add
```
3. O banco escolhido para o projeto foi o MongoDB, caso queria outro banco, basta fazer as alterações necessarias no arquivo schama.prisma dentro de da pasta prisma.
```bash
# MongoDB (Formato padrão)
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

# Ou outro banco de sua prferencia, só alerar o arquivo schema.prisma
DATABASE_URL="mongodb://usuario:senha@localhost:27017/nome_do_banco?authSource=admin"
```

4. Gere os modelos do banco de dados.
```bash
yarn prisma generate
yarn prisma db push 
```

5. Basta executar que já deve estar rodando.
```bash
yarn run dev
```
# Documentação da api

A api foi desenvolvida para ser usada como backend do projeto Postfolio. Sua estrutura geral foi pensada para ser um monólito modular. Cada module compõe uma pequena parte do dominio da aplicação, tendo cada um deles o máximo de independencia possivel.

## Índice
- [0. Sobre app.ts](#0-sobre-appts)
- [1. Modulos](#1-modulos)
  - [1.1 Sobre infrastructure](#11-sobre-infrastructure)
  - [1.2 Sobre Shared](#12-sobre-shared)
- [1. Endpoints](#1-endpoints)
- [2. Arquitetura](#2-arquitetura)
  - [2.1 Descrição da Arquitetura](#21-descrição-da-arquitetura)
  - [2.2 Estrutura de Pastas](#22-estrutura-de-pastas)
- [3. Código e Propósitos](#3-código-e-propósitos)
- [4. Conclusão](#4-conclusão)

---

## 0. Sobre app.ts

O arquivo app.ts é a porta de entrada para a execução da api. É onde as configurações são feitas e definidas.

Importação necessarias:
```ts
import Fastify from "fastify"; // Importação do fastify
import fastifyCors from "@fastify/cors"; // dos cors
import "@infrastructure/types/fastify"; // modulo de infra, será detalhado em outra seção.
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod"; // dados necessarios para o zod.
import { AppComposer } from "compositionRoot/appComposer"; // Será detalhado em outro modulo.

```

Inicialização do app:
```ts
// Configurações necessarias
const app = Fastify({
  // Os logs são apenas a nivel de erro.
  logger: {
    level: "error",
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        ignore: "pid,hostname,reqId,req,res",
      },
    },
  },
}).withTypeProvider<ZodTypeProvider>(); // Adicionar zod como Um provider.
const PORT = 8080; // A porta da api

// Necessario para o bom funcionamento do zod.
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
```
Onde é CORS é configurado:
```ts
app.register(fastifyCors, {
  origin: true, // Permite todas as fontes
  methods: ["GET", "POST", "PUT", "DELETE"], // Métodos HTTP permitidos
  allowedHeaders: ["Content-Type", "Authorization"], // Headers permitidos
});
```
Registros e outras configurações:
```ts
const appCompose = new AppComposer();
appCompose.registerRoutes(app);
appCompose.configureFastify(app);
appCompose.registerHandlers();
```
E onde é vervidor é executado:
```ts
const start = async () => {
  try {
    await app.listen({ port: PORT, host: "0.0.0.0" });
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
```

## 1. Módulos

A API foi construída com base em uma arquitetura de monólito modular, onde cada módulo representa uma pequena porção isolada do domínio da aplicação. Cada módulo contém tudo o que é necessário para seu funcionamento, incluindo entidades, casos de uso, controladores, repositórios, validações e mapeamentos.

Essa abordagem permite que os módulos sejam o mais independentes possível uns dos outros, facilitando a manutenção, a escalabilidade e até mesmo uma futura migração para uma arquitetura de microsserviços, se necessário.

A seguir, os principais diretórios da estrutura de código:

```shell
📦 back-end/
├── 📁 src/
│   ├── 📁 compositionRoot/     # Composição de dependências e injeção
│   ├── 📁 infrastructure/      # Infraestrutura geral (ex: conexão com DB, middleware)
│   ├── 📁 modules/             # Módulos de domínio independentes (ex: user, work, competition)
│   ├── 📁 shared/              # Código e utilitários reutilizáveis entre módulos
│   └── 📁 test/                # Testes automatizados da aplicação

....
```
Cada pasta em modules/ representa um contexto isolado do domínio, como:

```shell
📦 modules/
├── 📁 competition/
├── 📁 portfolio/
├── 📁 user/
└── 📁 work/
```

Dentro de cada módulo, seguimos uma estrutura comum com pastas como controller, service, repository, dtos, domain, etc., mantendo o princípio de coesão alta e acoplamento baixo.

### 1.1 Sobre infrastructure

### 1.2 Sobre Shared

### 

## 1. Endpoints

A seguir, estudaremos cada end-point, seus cabeçalhos, corpos e respostas.
Segiu o local onde todos os end-poins estão sendo registrados pelo *app*

```shell
📦 back-end/
├── 📁 src/
│   └── 📁 adapters/
│       └── 📁 inBound/
│           ├── 📁 controllers/
|           ├── 📁 middleware/
|           └── 📁 routes/
|               ├── PortfolioRoute.ts
|               ├── RatingRoute.ts
|               └── UserRoute.ts
....
```
obs: Estudaremos mais sobre a arquitetura e estrutura de pastas do projeto no tópico [2. Arquitetura](#2-arquitetura)

### users

**- POST /api/user**

Descrição: Cria um novo usuário no sistema.
Autenticação: Não requerida.
Content-Type: application/json.

request:
```json
{
    "name": "test", // nome do user.
    "email": "test@gmail.com", // email valido e único.
    "password": "123456789", // senha de pelo menos 8 digitos
    "status": "None" // Ainda não disponivel na atual verção.
}
```
response (`201`):
```json
{
    "msg": "Usuario criado com sucesso!"
}
```
| Código HTTP   | Resposta (JSON) | 
|:-------------:|:--------------------------------------------------:|
| 400           | {"message": "Todos os campos são obrigatórios!"}   | 
| 400           | {"message": "Senha muito fraca!"}                  |
| 400           | {"message": "Email inválido!"}                     |
| 400           | {"message": "Por favor, use outro email!"}         |


**- POST /api/user/login**

Descrição: Faz o login de um usuario no sistema.
Autenticação: Não requerida.
Content-Type: application/json.

request:
```json
{
    "email": "test@gmail.com",
    "password": "123456789"
}
```
response:
```json
{ 
    "msg": "Login bem-sucedido!", 
    "token": "alsnfqoboiqroho8hf0h3ub1oius7dg9qeboh0HhOH0HH89H1R" // token_jwt
}
```
| Código HTTP | Resposta (JSON) | 
|:-------------:|:-----------------:|
| 400         | {"message": "O email é obrigatório!"} | 
| 400         | {"message": "A senha é obrigatória!"} |
| 400         | {"message": "Email inválido!"} |
| 404         | {"message": "Usuário não encontrado!"} |
| 401         | {"message": "Senha incorreta!"} |

## 2. Arquitetura

### 2.1 Descrição da Arquitetura

### 2.2 Estrutura de Pastas

## 3. Código e Propósitos

## 4. Conclusão