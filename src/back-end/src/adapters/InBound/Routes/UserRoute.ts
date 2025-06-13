import { FastifyInstance } from "fastify";
import { UserController } from "@adapters/inBound/controller/UserController";
import { UserMiddle } from "@adapters/inBound/middleware/UserMiddle";

export async function UserRoutes(app: FastifyInstance) {
  app.post("", UserController.register);
  app.post("/all", UserController.getAll);
  app.post("/login", UserController.login);

  app.post(
    "/profile",
    { preHandler: UserMiddle.authenticate },
    UserController.getProfile
  );

  app.post(
    "/portfolios",
    { preHandler: UserMiddle.authenticate },
    UserController.getPortfolios
  );

  app.post(
    "/ratings",
    { preHandler: UserMiddle.authenticate },
    UserController.getRatings
  );

  app.delete(
    "",
    { preHandler: UserMiddle.authenticate },
    UserController.deleteById
  );
}
