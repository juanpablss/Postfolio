import { FastifyInstance } from "fastify";
import RatingController from "@controller/RatingController";
import { UserMiddle } from "@middleware/UserMiddle";
import ratingService from "@service/RatingServiceImp";

export async function RatingRoute(app: FastifyInstance) {
  const ratingController = new RatingController(ratingService);
  app.post("/all", (req, rep) => ratingController.getAll(req, rep));

  app.post("", { preHandler: UserMiddle.authenticate }, (req, rep) =>
    ratingController.register(req, rep)
  );

  app.put("", { preHandler: UserMiddle.authenticate }, (req, rep) =>
    ratingController.update(req, rep)
  );

  app.delete(
    "/:portfolioId",
    { preHandler: UserMiddle.authenticate },
    (req, rep) => ratingController.delete(req, rep)
  );
}
