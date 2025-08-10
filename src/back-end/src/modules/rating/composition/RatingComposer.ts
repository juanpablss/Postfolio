import { TYPES } from "@compositionRoot/Types";
import { RatingController } from "@rating/api/RatingController";
import { RatingService } from "@rating/application/RatingService";
import { IRatingRepository } from "@rating/domain/interfaces/IRatingRepository";
import { IRatingService } from "@rating/domain/interfaces/IRatingService";
import { RatingPort } from "@rating/domain/interfaces/RatingPort";
import { RatingRepository } from "@rating/infra/database/RatingRepository";
import { RatingAdapter } from "@rating/infra/RatingAdapter";
import { Container } from "inversify";

export function ratingComposerModule(container: Container) {
  container
    .bind<IRatingRepository>(TYPES.IRatingRepository)
    .to(RatingRepository)
    .inRequestScope();
  container
    .bind<IRatingService>(TYPES.IRatingService)
    .to(RatingService)
    .inRequestScope();
  container
    .bind<RatingPort>(TYPES.RatingPort)
    .to(RatingAdapter)
    .inRequestScope();
  container
    .bind<RatingController>(TYPES.RatingController)
    .to(RatingController)
    .inRequestScope();
}
