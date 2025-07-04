import { FastifyInstance } from "fastify";
import { UserMiddle } from "@infrastructure/middleware/UserMiddle";
import { CompetitionController } from "@competition/inBound/CompetitionController";

function competitionRoutesPlugin(
  app: FastifyInstance,
  competitionController: CompetitionController
) {
  /**
   * [Rota para registrar uma nova competição]
   * {
   *  body: {
   *    name: string,
   *  }
   * }
   */
  app.post("", { preValidation: UserMiddle.authenticate }, (req, rep) =>
    competitionController.register(req, rep)
  );

  app.put(
    "/:competitionId",
    { preValidation: UserMiddle.authenticate },
    (req, rep) => competitionController.update(req, rep)
  );

  app.delete(
    "/:competition",
    { preValidation: UserMiddle.authenticate },
    (req, rep) => competitionController.getCompetition(req, rep)
  );

  app.post(
    "/:competitionId/work/:workId",
    {
      preValidation: UserMiddle.authenticate,
    },
    (req, rep) => competitionController.subscribeWork(req, rep)
  );

  app.delete(
    "/:competitionId/work/:workId",
    {
      preValidation: UserMiddle.authenticate,
    },
    (req, rep) => competitionController.unsubscribeWork(req, rep)
  );

  app.post("/all", { preValidation: UserMiddle.authenticate }, (req, rep) =>
    competitionController.getAll(req, rep)
  );

  app.post(
    "/:competitionId",
    { preValidation: UserMiddle.authenticate },
    (req, rep) => competitionController.getCompetition(req, rep)
  );

  app.post(
    "/:competitionId/work",
    { preValidation: UserMiddle.authenticate },
    (req, rep) => competitionController.getWorkDetailsForCompetition(req, rep)
  );

  app.post(
    "/:competitionId/work/:workId/details",
    { preValidation: UserMiddle.authenticate },
    (req, rep) => competitionController.getWorkDetails(req, rep)
  );

  // About Rating
  app.post(
    "/:competition/work/:work/rating",
    { preValidation: UserMiddle.authenticate },
    (req, rep) => competitionController.createRating(req, rep)
  );

  app.put(
    "/:competition/works/:work/ratings/:rating",
    { preValidation: UserMiddle.authenticate },
    (req, rep) => competitionController.updateRating(req, rep)
  );

  app.delete(
    "/:competition/work/:work/rating/:rating",
    { preValidation: UserMiddle.authenticate },
    (req, rep) => competitionController.deleteRating(req, rep)
  );
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
