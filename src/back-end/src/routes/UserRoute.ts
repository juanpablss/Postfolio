import { FastifyInstance } from "fastify";
import { UserController } from "../controller/UserController";

export async function UserRoutes(app: FastifyInstance) {
  // app.get('/', UserController.page),

  app.post("/register", UserController.register);
  app.get("/all", UserController.getAll);
  app.get("", UserController.getByEmail);
  app.post("/login", UserController.login);

  // app.delete('/', UserController.delete)
  // app.delete('/', UserController.delete)
}
