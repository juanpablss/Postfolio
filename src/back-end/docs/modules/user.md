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
📦 module/
├── 📁 user/
│   └── 📁 inBound/
│       └── 📁 inBound/ 
│           ├── UserController.ts
│           ├── UserRoute.ts
│           └── UserSchema.ts
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
    "password": "12345678", // senha de pelo menos 8 digitos
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

request :
```json
{
    "email": "test@gmail.com",
    "password": "12345678"
}
```
response (`200`):
```json
{ 
    "msg": "Login bem-sucedido!", 
    "token": "jwt_token_gerado_pelo_sistema"
}
```
| Código HTTP | Resposta (JSON) | 
|:-------------:|:-----------------:|
| 400         | {"message": "O email é obrigatório!"} | 
| 400         | {"message": "A senha é obrigatória!"} |
| 400         | {"message": "Email inválido!"} |
| 404         | {"message": "Usuário não encontrado!"} |
| 401         | {"message": "Senha incorreta!"} |

**- POST /api/user/profile**

Descrição: Retorna as informações do usuário logado com base no token de autenticação enviado no cabeçalho.
Autenticação: Requerida (via Bearer Token no header Authorization)
Content-Type: application/json

Requisição: Sem corpo.

response (`200`):
```json
{
    "id": "123abc",
    "email": "test@gmail.com",
}
```

**- DELETE /api/user**

Descrição: Remove o usuário logado do sistema permanentemente com base no token de autenticação.
Autenticação: Requerida (via Bearer Token no header Authorization)
Content-Type: application/json

Requisição: Sem corpo.
response (`200`):
```json
{
    "name": "test",
    "email": "test@gmail.com",
    "password": "12345678",
    "status": "None"
}
```

**- GET /auth/google**

Descrição:  Inicia o processo de autenticação via Google, redirecionando o usuário para o consentimento de login do Google.
Autenticação: Não requerida.
Content-Type: application/json

Requisição: Sem corpo.
| Código HTTP | Resposta (JSON) | 
|:-------------:|:-----------------:|
| 302         | Redirecionamento para o Google Login | 
| 500         | {"message": "Erro interno na autenticação."} |

**- GET /auth/google/callback**

Descrição: Endpoint chamado automaticamente pelo Google após o login bem-sucedido. Processa o token retornado, cria/atualiza o usuário no sistema e retorna um token JWT para uso interno.
Autenticação: Não requerida.
Content-Type: application/json
Requisição: Automática pelo Google (callback).
response (`200`) ou (`201`):
```json
{
    "msg": "Login bem-sucedido!",
    "token": "jwt_token_gerado_pelo_sistema"
}
```


## 2. Componentes Chave e Fluxos de Dados
