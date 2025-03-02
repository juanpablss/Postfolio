import Fastify, { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "./config/prisma";
import { UserRoutes } from "./routes/UserRoute";

const app = Fastify();
const PORT = 8080;

app.register(UserRoutes, { prefix: "api/user" });

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
