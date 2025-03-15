import { FastifyInstance } from "fastify";
import { UserController } from "../controller/UserController";
import { UserMiddle } from "../middleware/UserMiddle";

export async function UserRoutes(app: FastifyInstance) {
  app.post("/register", UserController.register);
  app.get("/all", UserController.getAll);
  app.post("/login", UserController.login);

  app.get(
    "/profile",
    { preHandler: UserMiddle.authenticate },
    UserController.getProfile
  );

  // app.delete('/', UserController.delete)
}
