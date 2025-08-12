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
│   └── 📁 shared/              # Código e utilitários reutilizáveis entre módulos
# │   └── 📁 test/                # Testes automatizados da aplicação

....
```
Cada pasta em modules/ representa um contexto isolado do domínio, como:

```shell
📦 modules/
├── 📁 chat/
├── 📁 competition/
├── 📁 email/
├── 📁 portfolio/
├── 📁 project/
├── 📁 projectCompDetais/
├── 📁 rating/
└── 📁 user/
```

Dentro de cada módulo, seguimos uma estrutura comum com pastas como controller, service, repository, dtos, domain, etc., mantendo o princípio de coesão alta e acoplamento baixo.

### 1.1 Modulos do dominio

A estruturação de cada modulo do dominio foi projetada para ser intuitiva e escalável. Todos foram seguiem a mesma estrutura de pastas e lógica, . Abaixo, detalhamos o propósito de cada diretório e arquivo principal:

```shell
MODULES\NAME_MODULE
├───api
├───application
├───composition
├───domain
│   ├───entities
│   ├───enum
│   ├───interfaces
│   └───valueObject # (opcional) Vai depender da modelagem do domain.
├───handler # (opcional) Local onde o module reage a certos eventos.
├───infra
└───test
```

---
`api`
Lida com a entrada e saída de dados da aplicação. É a interface com o mundo externo, responsável por receber requisições HTTP e enviar respostas. É nela que fica as *rotas*, *controllers*, *schemas* e *dtos*.

---
`application`
Orquestra a lógica do domínio. Gerencia os fluxos de dados, interage com o camada de domínio para executar ações e se comunica com a camada de infraestrutura. É nela que fica o *service* e o *mapper*.

---
`composition`
Orquestra a injeção de dependências e a montagem de todas as partes do módulo dentro do container. Para mais detalhes, leia o dentro da pasta `composition` de cada modulo.

---
`domain`
A camada mais central e agnóstica a tecnologias, contendo a lógica de negócio pura, as regras de domínio e as entidades.

- `entities`: Local onde fica a interface do repository e a entidade(s) principal(ais) do modulo.
- `enum`: Onde ficam os enums.
- `interfaces`: Onde fica os contratos da apliação.
- `valueObject`: Um objeto de valor que encapsula a lógica e validações relacionadas a uma coluna do banco.

---
`handler`
Abriga classes que vão reagir a eventos emitios em outro lugar. Para saber mais sobre eventos, vá para [event](#event).

---
`infra`
Lida com todos os detalhes técnicos e externos. É a camada de persistência (banco de dados), serviços externos (APIs de terceiros) e implementações concretas de interfaces definidas no domínio.

---
`test`
Local onde fica os testes especificos do modulo.

Segue uma forma de consimir cada modulo, especificados em seus respectivos arquivos: [User](modules/user.md).



### 1.2 Sobre infrastructure



### 1.3 Sobre Shared

A pasta `shared` é o hub central da sua aplicação para o código que precisa ser reutilizado por múltiplos módulos, mas que não pertence a um domínio específico. O objetivo principal é evitar duplicação de código e garantir o desacoplamento.

#### contracts

Contém as interfaces e DTOs (Data Transfer Objects) que definem o contrato de comunicação entre os módulos. É essencial para o desacoplamento, permitindo que os módulos interajam sem dependerem diretamente das classes de domínio uns dos outros.

#### error

Define a estratégia de tratamento de erros global da aplicação. Inclui classes de exceção personalizadas que garantem uma resposta de erro consistente para todos os módulos.

#### event

Abriga a lógica central para a comunicação entre os modulos. Inclui a classe do EventListener e as definições base de eventos de domínio. Para mais detalhes, leia [event](./shared/event.ts)

#### util

### 

## 2. Guias de Contribuição

## 3. Tratamento de Erros e Logs

## 4. Segurança

## 4. Conclusão