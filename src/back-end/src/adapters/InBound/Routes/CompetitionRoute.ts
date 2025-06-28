import { FastifyInstance } from "fastify";
import { UserMiddle } from "@infrastructure/middleware/UserMiddle";
import competitionController from "@controller/CompetitionController";
import workCompDetailsController from "@controller/WorkCompDetailsController";
import ratingController from "@controller/RatingController";

export async function CompetitionRoute(app: FastifyInstance) {
  app.post(
    "/competition",
    { preValidation: UserMiddle.authenticate },
    (req, rep) => competitionController.register(req, rep)
  );

  app.post(
    "/competition/all",
    { preValidation: UserMiddle.authenticate },
    (req, rep) => competitionController.getAll(req, rep)
  );

  app.post(
    "/competition/:competition",
    { preValidation: UserMiddle.authenticate },
    (req, rep) => competitionController.getById(req, rep)
  );

  app.put(
    "/competition/:competition",
    { preValidation: UserMiddle.authenticate },
    (req, rep) => competitionController.update(req, rep)
  );

  app.delete(
    "/competition/:competition",
    { preValidation: UserMiddle.authenticate },
    (req, rep) => competitionController.getById(req, rep)
  );

  app.post(
    "/competition/:competition/work/:work/details",
    { preValidation: UserMiddle.authenticate },
    (req, rep) => workCompDetailsController.getWorkDetails(req, rep)
  );

  app.post(
    "/competition/:competition/work/:work/rating",
    { preValidation: UserMiddle.authenticate },
    (req, rep) => ratingController.register(req, rep)
  );

  app.put(
    "/competitions/:competition/works/:work/ratings/:rating",
    { preValidation: UserMiddle.authenticate },
    (req, rep) => ratingController.update(req, rep)
  );

  app.delete(
    "/competition/:competition/work/:work/rating/:rating",
    { preValidation: UserMiddle.authenticate },
    (req, rep) => ratingController.delete(req, rep)
  );
}
