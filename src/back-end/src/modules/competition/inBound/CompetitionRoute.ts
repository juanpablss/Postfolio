import { FastifyInstance } from "fastify";
import { UserMiddle } from "@infrastructure/middleware/UserMiddle";
import { CompetitionController } from "@competition/inBound/CompetitionController";

function competitionRoutesPlugin(
  app: FastifyInstance,
  competitionController: CompetitionController
) {
  app.post("", { preValidation: UserMiddle.authenticate }, (req, rep) =>
    competitionController.register(req, rep)
  );

  app.post("/call", { preValidation: UserMiddle.authenticate }, (req, rep) =>
    competitionController.getAll(req, rep)
  );

  app.post(
    "/:competition",
    { preValidation: UserMiddle.authenticate },
    (req, rep) => competitionController.getCompetition(req, rep)
  );

  app.put(
    "/:competition",
    { preValidation: UserMiddle.authenticate },
    (req, rep) => competitionController.update(req, rep)
  );

  app.delete(
    "/:competition",
    { preValidation: UserMiddle.authenticate },
    (req, rep) => competitionController.getCompetition(req, rep)
  );

  app.post(
    "/:competitionId/work/:workId/details",
    { preValidation: UserMiddle.authenticate },
    (req, rep) => competitionController.getWorkDetails(req, rep)
  );

  // app.post(
  //   "/:competition/work/:work/rating",
  //   { preValidation: UserMiddle.authenticate },
  //   (req, rep) => ratingController.register(req, rep)
  // );

  // app.put(
  //   "/:competition/works/:work/ratings/:rating",
  //   { preValidation: UserMiddle.authenticate },
  //   (req, rep) => ratingController.update(req, rep)
  // );

  // app.delete(
  //   "/:competition/work/:work/rating/:rating",
  //   { preValidation: UserMiddle.authenticate },
  //   (req, rep) => ratingController.delete(req, rep)
  // );
}

export class CompetitionRoute {
  public static register(
    app: FastifyInstance,
    competitionController: CompetitionController
  ) {
    app.register(
      (data) => competitionRoutesPlugin(data, competitionController),
      {
        prefix: "api/competition",
      }
    );
  }
}
