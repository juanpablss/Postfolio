# User

O módulo `USER` é o coração da gestão de usuários em nossa aplicação. Ele encapsula toda a lógica de negócio e as funcionalidades relacionadas à criação, leitura, atualização e exclusão (CRUD) de usuários, garantindo a integridade e a consistência dos dados de usuário em todo o sistema.

## Índice

- [1. Como consumir](#1-como-consumir)
- [2. Componentes Chave e Fluxos de Dados](#2-componentes-chave-e-fluxos-de-dados)
- [3. Estrutura de Pastas e Arquivos](#3-estrutura-de-pastas-e-arquivos)

## 1. Como consumir

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

## 2. Componentes Chave e Fluxos de Dados

## 3. Estrutura de Pastas e Arquivos

A organização do módulo foi projetada para ser intuitiva e escalável. Abaixo, detalhamos o propósito de cada diretório e arquivo principal:

Estrutura de pastas do modulo:
```shell
MODULES\USER
├───api
│       IUserPort.ts
│       UserAdapter.ts
│
├───composition
│       UserComposer.ts
│
├───domain
│   ├───entities
│   │       IUserRepository.ts
│   │       User.ts
│   │
│   └───valueObject
│           Email.ts
│
├───dtos
│       UserDTO.ts
│
├───inBound
│       UserController.ts
│       UserRoute.ts
│       UserSchema.ts
│
├───repository
│       PrismaUserRepository.ts
│
├───service
│       IUserService.ts
│       UserService.ts
│
└───util
        UserMapper.ts
```
---
`api`
Define as portas de saída (outbound ports) e seus adaptadores para interações com modulos externos ou sistemas de terceiros (e.g., modulo de e-mail, APIs externas).

- `IUserPort.ts`: Interface que estabelece o contrato para a comunicação com adaptadores externos.
```ts
export interface IUserPort {
  exist(userId: string): Promise<boolean>;
}
```
- `UserAdapter.ts`: Implementação concreta de `IUserPort`, responsável por traduzir as chamadas para o formato esperado pelo 
serviço externo. Veja a implementação em [`UserAdapter.ts`](../../src/modules/user/api/UserAdapter.ts)

---
`composition`
Orquestra a injeção de dependências e a montagem de todas as partes do módulo. Para mais detalhes, leia o arquivo responsavem [`UserComposer.ts`](../../src/modules/user/composition/UserComposer.ts)

---
`domain`
A camada mais central e agnóstica a tecnologias, contendo a lógica de negócio pura, as regras de domínio e as entidades.

- `entities`
    - `IUserRepository.ts`: Interface que define o contrato para a persistência da entidade `User`, abstraindo os detalhes do banco de dados.
    ```ts
    import User from "@user/domain/entities/User";
    import Email from "@user/domain/valueObject/Email";

    export interface IUserRepository {
        create: (user: User) => Promise<User | null>;
        deleteById: (id: string) => Promise<User | null>;

        findMany: () => Promise<User[]>;
        findById: (id: string) => Promise<User | null>;
        findByEmail: (email: Email) => Promise<User | null>;
    }
    ```
    - `User.ts`: A entidade principal do domínio, contendo os atributos e comportamentos fundamentais de um usuário. Veja mais detalhes [`User.ts`](../../src/modules/user/domain/entities/User.ts)

- `valueObject`
    - `Email.ts`: Um objeto de valor que encapsula a lógica e validações relacionadas a endereços de e-mail, garantindo sua validade e consistência.
    
--- 