import Fastify from "fastify";
import { UserRoutes } from "./adapters/inBound/routes/UserRoute";
import fastifyCors from "@fastify/cors";
import "@infrastructure/@types/fastify";
import { PortfolioRoute } from "./adapters/inBound/routes/PortfolioRoute";
import { RatingRoute } from "./adapters/inBound/routes/RatingRoute";
import { configureFastify } from "@infrastructure/fastify/ConfigureFastify";
import { WorkRoutes } from "@routes/WorkRoute";
import { CompetitionRoute } from "@routes/CompetitionRoute";
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";

const app = Fastify({
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
}).withTypeProvider<ZodTypeProvider>();
const PORT = 8080;

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, {
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
});

app.register(UserRoutes, { prefix: "api/user" });
app.register(PortfolioRoute, { prefix: "api/portfolio" });
app.register(RatingRoute, { prefix: "api/rating" });
app.register(WorkRoutes, { prefix: "api/work" });
app.register(CompetitionRoute, { prefix: "api/competition" });

configureFastify(app);

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
