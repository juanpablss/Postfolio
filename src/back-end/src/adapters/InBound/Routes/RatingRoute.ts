import { FastifyInstance } from "fastify";
import { UserMiddle } from "@middleware/UserMiddle";
import ratingController from "@controller/RatingController";

export async function RatingRoute(app: FastifyInstance) {
  app.post("/all", (req, rep) => ratingController.getAll(req, rep));

  app.post("", { preValidation: UserMiddle.authenticate }, (req, rep) =>
    ratingController.register(req, rep)
  );

  app.put("", { preValidation: UserMiddle.authenticate }, (req, rep) =>
    ratingController.update(req, rep)
  );

  app.delete(
    "/:portfolioId",
    { preValidation: UserMiddle.authenticate },
    (req, rep) => ratingController.delete(req, rep)
  );
}
