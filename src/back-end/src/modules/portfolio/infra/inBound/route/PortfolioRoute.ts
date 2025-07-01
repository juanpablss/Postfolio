import { FastifyInstance } from "fastify";
import { PortfolioController } from "@portfolio/infra/inBound/controller/PortfolioController";
import { UserMiddle } from "@infrastructure/middleware/UserMiddle";
import {
  portfolioRouteSchemas,
  RegisterPortfolioRequest,
  UpdatePortfolioRequest,
} from "@portfolio/infra/inBound/schema/PortfolioSchema";

export async function PortfolioRoutes(
  app: FastifyInstance,
  portfolioController: PortfolioController
) {
  app.post("/all", (req, rep) => portfolioController.findAll(req, rep));

  app.post(
    "",
    {
      schema: portfolioRouteSchemas.create,
      preValidation: UserMiddle.authenticate,
    },
    (req, rep) =>
      portfolioController.register(req as RegisterPortfolioRequest, rep)
  );

  app.post("/user/me", { preValidation: UserMiddle.authenticate }, (req, rep) =>
    portfolioController.findByUser(req, rep)
  );

  app.post("/works", { preValidation: UserMiddle.authenticate }, (req, rep) =>
    portfolioController.getWorks(req, rep)
  );

  app.put(
    "/:id",
    {
      schema: portfolioRouteSchemas.update,
      preValidation: UserMiddle.authenticate,
    },
    (req, rep) => portfolioController.update(req as UpdatePortfolioRequest, rep)
  );

  app.delete("", { preValidation: UserMiddle.authenticate }, (req, rep) =>
    portfolioController.deleteById(req, rep)
  );
}
