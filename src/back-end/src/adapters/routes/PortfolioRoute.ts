import { FastifyInstance } from "fastify";
import { PorftolioController } from "../controller/PortfolioController";
import { UserMiddle } from "../middleware/UserMiddle";

export async function PortfolioRoute(app: FastifyInstance) {
  app.get("/all", PorftolioController.getAll);
  app.post(
    "",
    { preHandler: UserMiddle.authenticate },
    PorftolioController.register
  );
  app.get(
    "",
    { preHandler: UserMiddle.authenticate },
    PorftolioController.getByUser
  );

  // app.get("/:id", )
}
