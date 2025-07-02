import { FastifyInstance } from "fastify";
import { UserController } from "@user/inBound/UserController";
import { UserMiddle } from "@infrastructure/middleware/UserMiddle";
import {
  LoginRequest,
  RegisterUserRequest,
  userRouteSchema,
} from "@user/inBound/UserSchema";

function userRoutesPlugin(
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

export class UserRoute {
  public static register(app: FastifyInstance, userController: UserController) {
    app.register((data) => userRoutesPlugin(data, userController), {
      prefix: "api/user",
    });
  }
}
