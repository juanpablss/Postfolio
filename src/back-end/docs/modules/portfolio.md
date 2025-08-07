# Portfolio

Módulo responsavel por gerenciar os a conexão de user com seus works(trabalhos). É nele que será possivel recuperar a pagina do portfolio, se tiver, ver descrição e cadastrar em competições.

## 1. Como consumir

A seguir, estudaremos cada end-point, seus cabeçalhos, corpos e respostas. Para mais detalhes leia diretamente no arquivo fonte: [PortfolioRoutes.ts](../../src/modules/portfolio/inBound/PortfolioRoute.ts).
Segiu o local onde todos os end-poins estão sendo registrados pelo *app*

```shell
📦 module/
├── 📁 portfolio/
│   └── 📁 inBound/
│       ├── PortfolioController.ts
│       ├── PortfolioRoute.ts
│       └── PortfolioSchema.ts
....
```
<!-- **POST /api/portfolio**

Descrição: Cria um novo portfolio para o usuário autenticado
Autenticação: Requerida (Bearer Token)
Content-Type: application/json

```json
{
    "title": "Meu Portfolio",
    "description": "Descrição do meu trabalho",
    "category": "Design",
    "isPublic": true
}
``` -->

**POST /api/portfolio/user/me**

Descrição: Retorna todos os portfolios do usuário autenticado
Autenticação: Requerida (Bearer Token)
Content-Type: application/json


Response (`200`):
```json
{
    "id": "uuid",
    "name": "Meu Portfolio",
    "description": "Descrição do meu trabalho",
    "pageLink": "Design",
    "authorId": true
}
```
