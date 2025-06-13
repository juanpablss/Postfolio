import { FastifyInstance } from "fastify";
import { PortfolioController } from "@adapters/inBound/controller/PortfolioController";
import { UserMiddle } from "@adapters/inBound/middleware/UserMiddle";

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
