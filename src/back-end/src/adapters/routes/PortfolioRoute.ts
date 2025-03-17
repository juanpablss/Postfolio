import { FastifyInstance } from "fastify";
import { PortfolioController } from "../controller/PortfolioController";
import { UserMiddle } from "../middleware/UserMiddle";

export async function PortfolioRoute(app: FastifyInstance) {
  app.post("/all", PortfolioController.getAll);
  app.post(
    "",
    { preHandler: UserMiddle.authenticate },
    PortfolioController.register
  );
  // app.post(
  //   "/",
  //   { preHandler: UserMiddle.authenticate },
  //   PortfolioController.getByUser
  // );

  app.delete(
    "/:id",
    { preHandler: UserMiddle.authenticate },
    PortfolioController.deleteById
  );

  // app.get("/:id", )
}
