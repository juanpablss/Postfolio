import { FastifyInstance } from "fastify";
import { UserController } from "../controller/UserController";
import { UserMiddle } from "../middleware/UserMiddle";
import { UserServiceImp } from "../../application/service/UserServiceImp";
import UserRepositoryImp from "../repository/UserRepositoryImp";

const userRepository = new UserRepositoryImp();
const userService = UserServiceImp(userRepository);
const userController = UserController(userService);

export async function UserRoutes(app: FastifyInstance) {
  app.post("/register", userController.register);
  app.get("/all", userController.getAll);
  app.post("/login", userController.login);

  app.get(
    "/profile",
    { preHandler: UserMiddle.authenticate },
    userController.getProfile
  );

  app.delete(
    "",
    { preHandler: UserMiddle.authenticate },
    userController.deleteById
  );
}
