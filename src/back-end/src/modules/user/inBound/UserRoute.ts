import { FastifyInstance } from "fastify";
import { UserController } from "@user/infra/inBound/UserController";
import { UserMiddle } from "@infrastructure/middleware/UserMiddle";
import {
  LoginRequest,
  RegisterUserRequest,
  userRouteSchema,
} from "@user/infra/inBound/UserSchema";

export async function UserRoutes(
  app: FastifyInstance,
  userController: UserController
) {
  app.get("", (req, reply) => userController.hello(req, reply));

  app.post("", { schema: userRouteSchema.create }, (req, reply) =>
    userController.register(req as RegisterUserRequest, reply)
  );
  app.post("/all", (req, reply) => userController.getAll(req, reply));

  app.post("/login", { schema: userRouteSchema.login }, (req, reply) =>
    userController.login(req as LoginRequest, reply)
  );

  app.post(
    "/profile",
    { preValidation: UserMiddle.authenticate },
    (req, reply) => userController.getProfile(req, reply)
  );

  app.delete("", { preValidation: UserMiddle.authenticate }, (req, reply) =>
    userController.deleteById(req, reply)
  );
}
