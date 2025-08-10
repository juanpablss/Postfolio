import { FastifyInstance } from "fastify";
import { RatingController } from "@rating/api/RatingController";
import { UserMiddle } from "@infrastructure/middleware/UserMiddle";
import {
  ratingRouteSchema,
  UpsertRatingRequest,
} from "@rating/api/RatingSchema";

function ratingRoutesPlugin(
  app: FastifyInstance,
  controller: RatingController
) {
  app.post(
    "",
    {
      preValidation: UserMiddle.authenticate,
      schema: ratingRouteSchema.upsert,
    },
    (req, rep) => controller.upsert(req as UpsertRatingRequest, rep)
  );
}

export class RatingRoute {
  public static register(app: FastifyInstance, controller: RatingController) {
    app.register((data) => ratingRoutesPlugin(data, controller), {
      prefix: "api/rating",
    });
  }
}
