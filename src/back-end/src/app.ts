import Fastify from "fastify";
import { UserRoutes } from "./adapters/routes/UserRoute";
import fastifyCors from "@fastify/cors";
import { PortfolioRoute } from "./adapters/routes/PortfolioRoute";

const app = Fastify();
const PORT = 8080;

app.register(fastifyCors, {
  origin: "http://127.0.0.1:5500",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
});

app.register(UserRoutes, { prefix: "api/user" });
app.register(PortfolioRoute, { prefix: "api/portfolio" });

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
