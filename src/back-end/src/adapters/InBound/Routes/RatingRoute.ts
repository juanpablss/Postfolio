import { FastifyInstance } from "fastify";
import { RatingController } from "../controller/RatingController";
import { UserMiddle } from "../middleware/UserMiddle";

export async function RatingRoute(app: FastifyInstance) {
  app.post("", RatingController.register);

  app.post("/all", RatingController.getAll);

  app.put("", { preHandler: UserMiddle.authenticate }, RatingController.update);

  app.delete(
    "/:portfolioId",
    { preHandler: UserMiddle.authenticate },
    RatingController.delete
  );
}
