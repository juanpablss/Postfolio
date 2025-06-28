import { FastifyInstance } from "fastify";
import portfolioController from "@controller/PortfolioController";
import { UserMiddle } from "@infrastructure/middleware/UserMiddle";

export async function PortfolioRoute(app: FastifyInstance) {
  app.post("/all", (req, rep) => portfolioController.getAll(req, rep));

  app.post("", { preValidation: UserMiddle.authenticate }, (req, rep) =>
    portfolioController.register(req, rep)
  );

  app.post("/user/me", { preValidation: UserMiddle.authenticate }, (req, rep) =>
    portfolioController.getByUser(req, rep)
  );

  app.post("/works", { preValidation: UserMiddle.authenticate }, (req, rep) =>
    portfolioController.getWorks(req, rep)
  );

  app.put("", { preValidation: UserMiddle.authenticate }, (req, rep) =>
    portfolioController.update(req, rep)
  );

  app.delete("", { preValidation: UserMiddle.authenticate }, (req, rep) =>
    portfolioController.deleteById(req, rep)
  );
}
