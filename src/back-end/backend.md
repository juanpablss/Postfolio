# Tutorial
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
DATABASE_URL="mongodb://usuario:senha@localhost:27017/nome_do_banco?authSource=admin"

# Ou (para clusters na nuvem, como MongoDB Atlas)
DATABASE_URL="mongodb+srv://usuario:senha@cluster0.exemplo.mongodb.net/nome_do_banco?retryWrites=true&w=majority"
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

Descrição?

## 1. End-points

### users

- POST /api/user

endpoint onde o usuario será criado. Segui o formato de request e response realidados.

**request:**
```json
{
    "name": "test",
    "email": "test@gmail.com",
    "password": "123456789",
    "status": "None"
}
```
**response:**
```json
{
    "msg": "Usuario criado com sucesso!"
}
```


- POST /api/user/login

endpoint onde o login será feito. Segui o formato de request e response realidados.

**request:**
```json
{
    "email": "test@gmail.com",
    "password": "123456789"
}
```
**response:**
```json
{ 
    "msg": "Login bem-sucedido!", 
    "token": "token_jwt"
}
```

