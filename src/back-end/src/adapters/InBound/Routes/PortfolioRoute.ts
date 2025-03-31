import { FastifyInstance } from "fastify";
import { PortfolioController } from "../Controller/PortfolioController";
import { UserMiddle } from "../Middleware/UserMiddle";

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

  app.put(
    "",
    { preHandler: UserMiddle.authenticate },
    PortfolioController.update
  );

  app.delete(
    "/:id",
    { preHandler: UserMiddle.authenticate },
    PortfolioController.deleteById
  );

  // app.get("/:id", )
}
