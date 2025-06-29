import { FastifyInstance, FastifyRequest } from "fastify";
import portfolioController from "@controller/PortfolioController";
import { UserMiddle } from "@infrastructure/middleware/UserMiddle";
import {
  portfolioRouteSchemas,
  RegisterPortfolioRequest,
  UpdatePortfolioRequest,
} from "@schamas/PortfolioSchema";

// import { portfolioSchemas } from "@schamas/PortofolioSchemas";

export async function PortfolioRoute(app: FastifyInstance) {
  app.post("/all", (req, rep) => portfolioController.getAll(req, rep));

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
    portfolioController.getByUser(req, rep)
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
