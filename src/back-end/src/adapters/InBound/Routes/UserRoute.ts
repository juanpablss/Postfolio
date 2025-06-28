import { FastifyInstance } from "fastify";
import userController from "@controller/UserController";
import { UserMiddle } from "@infrastructure/middleware/UserMiddle";

export async function UserRoutes(app: FastifyInstance) {
  app.get("", (req, reply) => userController.hello(req, reply));

  app.post("", (req, reply) => userController.register(req, reply));
  app.post("/all", (req, reply) => userController.getAll(req, reply));
  app.post("/login", (req, reply) => userController.login(req, reply));

  app.post(
    "/profile",
    { preValidation: UserMiddle.authenticate },
    (req, reply) => userController.getProfile(req, reply)
  );

  app.delete("", { preValidation: UserMiddle.authenticate }, (req, reply) =>
    userController.deleteById(req, reply)
  );
}
