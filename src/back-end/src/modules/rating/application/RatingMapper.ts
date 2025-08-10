import { Rating as RatingModel } from "@prisma/client";
import { Rating } from "@rating/domain/entities/Rating";
import { UpsertRatingDTO } from "@rating/api/RatingDTO";

export const RatingMapper = {
  fromUpsertRatingDTOtoDomain(
    dto: UpsertRatingDTO,
    projectDetailsId: string
  ): Rating {
    return new Rating(
      "",
      dto.score,
      dto.userId,
      dto.projectId,
      dto.competitionId,
      projectDetailsId
    );
  },
  // fromPrismatoDomin(ratingModel: RatingModel): Rating {
  //   return new Rating(
  //     ratingModel.id,
  //     ratingModel.userId,
  //     ratingModel.workDetailsId,
  //     ratingModel.score
  //   );
  // },
  // fromDomaintoPrisma(rating: Rating): RatingModel {
  //   return {
  //     id: rating.id,
  //     userId: rating.userId,
  //     workDetailsId: rating.workDetailsId,
  //     score: rating.score,
  //   };
  // },
};
