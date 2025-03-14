import { FastifyInstance } from "fastify";
import { PorftolioController } from "../controller/PortfolioController";
import { UserMiddle } from "../middleware/UserMiddle";

export async function PortfolioRoute(app: FastifyInstance) {
  app.get("/all", PorftolioController.getAll);
  app.post(
    "/register",
    { preHandler: UserMiddle.authenticate },
    PorftolioController.register
  );
}
