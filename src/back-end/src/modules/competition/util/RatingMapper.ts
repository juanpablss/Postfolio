import { Rating as RatingModel } from "@prisma/client";
import { Rating } from "@competition/domain/entities/Rating";

export const RatingMapper = {
  toDomin(ratingModel: RatingModel): Rating {
    return new Rating(
      ratingModel.id,
      ratingModel.userId,
      ratingModel.workDetailsId,
      ratingModel.score
    );
  },
  toPrisma(rating: Rating): RatingModel {
    return {
      id: rating.id,
      userId: rating.userId,
      workDetailsId: rating.workDetailsId,
      score: rating.score,
    };
  },
};
