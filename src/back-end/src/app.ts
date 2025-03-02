import Fastify, { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "./config/prisma";

const app = Fastify();
const PORT = 8080;

app.get("/api/user", async (req: FastifyRequest, reply: FastifyReply) => {
  reply.send(await prisma.user.findMany());
});

app.post("/api/user", async (req: FastifyRequest, reply: FastifyReply) => {
  const { name, email, passWord, status } = req.body as {
    name: string;
    email: string;
    passWord: string;
    status: string;
  };

  try {
    // const u = await prisma.
    const user = await prisma.user.create({
      data: { name, email, passWord, status },
    });
    reply.send(user);
  } catch (error) {
    console.log(error);
    reply.status(500).send({ error: "Erro ao criar usuário" });
  }
});

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
