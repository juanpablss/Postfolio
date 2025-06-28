import { FastifyInstance } from "fastify";
import { UserMiddle } from "@infrastructure/middleware/UserMiddle";
import competitionController from "@controller/CompetitionController";
import workCompDetailsController from "@controller/WorkCompDetailsController";
import ratingController from "@controller/RatingController";

export async function CompetitionRoute(app: FastifyInstance) {
  app.post("", { preValidation: UserMiddle.authenticate }, (req, rep) =>
    competitionController.register(req, rep)
  );

  app.post("/call", { preValidation: UserMiddle.authenticate }, (req, rep) =>
    competitionController.getAll(req, rep)
  );

  app.post(
    "/:competition",
    { preValidation: UserMiddle.authenticate },
    (req, rep) => competitionController.getById(req, rep)
  );

  app.put(
    "/:competition",
    { preValidation: UserMiddle.authenticate },
    (req, rep) => competitionController.update(req, rep)
  );

  app.delete(
    "/:competition",
    { preValidation: UserMiddle.authenticate },
    (req, rep) => competitionController.getById(req, rep)
  );

  app.post(
    "/:competition/work/:work/details",
    { preValidation: UserMiddle.authenticate },
    (req, rep) => workCompDetailsController.getWorkDetails(req, rep)
  );

  app.post(
    "/:competition/work/:work/rating",
    { preValidation: UserMiddle.authenticate },
    (req, rep) => ratingController.register(req, rep)
  );

  app.put(
    "/:competition/works/:work/ratings/:rating",
    { preValidation: UserMiddle.authenticate },
    (req, rep) => ratingController.update(req, rep)
  );

  app.delete(
    "/:competition/work/:work/rating/:rating",
    { preValidation: UserMiddle.authenticate },
    (req, rep) => ratingController.delete(req, rep)
  );
}
