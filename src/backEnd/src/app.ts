import Fastify, { FastifyRequest, FastifyReply } from "fastify";

const app = Fastify();
const PORT = 8080;

app.get("/", async (req: FastifyRequest, reply: FastifyReply) => {
  reply.send({
    msg: "Back tá funcionando José",
  });
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
