import { FastifyInstance } from "fastify";
import { UserControllerT } from "@controller/UserController";
import { UserMiddle } from "@middleware/UserMiddle";
import UserServiceImp from "@service/UserServiceImp";
import UserRepositoryImp from "@repository/userRep/UserRepositoryImp";
import PrismaUserRepositoryT from "@repository/userRep/PrismaUserRepository";
// import { UserServiceImp } from "@service/UserServiceImp";
// import UserServiceImp from "@service/UserServiceImp";

export async function UserRoutes(app: FastifyInstance) {
  const prismaUserRepository = new PrismaUserRepositoryT();
  const userRepository = new UserRepositoryImp(prismaUserRepository);
  const userService = new UserServiceImp(userRepository);
  const userController = new UserControllerT(userService);

  app.get("", (req, reply) => userController.hello(req, reply));

  app.post("", (req, reply) => userController.register(req, reply));
  app.post("/all", (req, reply) => userController.getAll(req, reply));
  app.post("/login", (req, reply) => userController.login(req, reply));

  app.post("/profile", { preHandler: UserMiddle.authenticate }, (req, reply) =>
    userController.getProfile(req, reply)
  );

  // app.post(
  //   "/portfolios",
  //   { preHandler: UserMiddle.authenticate },
  //   UserController.getPortfolios
  // );

  // app.post(
  //   "/ratings",
  //   { preHandler: UserMiddle.authenticate },
  //   UserController.getRatings
  // );

  app.delete("", { preHandler: UserMiddle.authenticate }, (req, reply) =>
    userController.deleteById(req, reply)
  );
}
