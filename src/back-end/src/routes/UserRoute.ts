import { FastifyInstance } from "fastify";
import { UserController } from "../controller/UserController";

export async function UserRoutes(app: FastifyInstance) {
  // app.get('/', UserController.page),

  app.post("/", UserController.create);
  app.get("/all", UserController.getAll);
  app.get("", UserController.getByEmail);

  // app.delete('/', UserController.delete)
  // app.delete('/', UserController.delete)
}
