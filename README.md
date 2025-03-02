
<p align="center">
  <img width="225px" src="assets/postfolio-logo.png" alt="ArenaPortfolio">
</p>

## 📌 Visão Geral

🖥️ O Postfolio é uma plataforma colaborativa para desenvolvedores, designers e profissionais de tecnologia apresentarem seus portfólios. O objetivo é oferecer um espaço onde os usuários possam compartilhar seus trabalhos de forma competitiva e receberem avaliações. O projeto foi criado para estimular o aprendizado dos alunos e promover o compartilhamento de experiências no desenvolvimento de software e design.

## 🚀 Como Executar o Projeto

Caso não tenha o yarn, instale globalmente:
```bash
npm i -g yarn
```

### 🔥 Configurando o Frontend

1. Navegue até a pasta frontend:

```bash
cd src/frontend
```
2. Instale as dependências:

```bash
yarn install
```

3️. Inicie o servidor de desenvolvimento:

```bash 
yarn run dev
```

**O frontend estará rodando em: http://localhost:5173 (ou a porta definida).**


### 🔥 Configurando o Backend

1. Navegue até a pasta backend:

```bash
cd src/backend
```

2. Inicialize o Prisma:

```bash
yarn install
yarn prisma init
```

3. Configure o banco de dados no arquivo .env:

```bash
DATABASE_URL="postgresql://usuario:senha@localhost:5432/postfolio"
```

4. Gere os modelos do banco de dados:

```bash
yarn prisma generate
yarn prisma db push
```

5. Inicie o servidor backend:

```bash
yarn run dev
```

**📍 O backend estará rodando em: http://localhost:3333 (ou a porta definida).**


## 📝 Considerações Finais
🔧 O projeto Postfolio está em fase inicial e em constante desenvolvimento. Todas as decisões serão discutidas pela equipe e sugestões são sempre bem-vindas!

🚀 Se quiser contribuir, entre em contato ou abra uma issue no repositório!
