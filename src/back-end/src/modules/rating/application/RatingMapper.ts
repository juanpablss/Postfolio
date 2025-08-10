import { Rating as RatingModel } from "@prisma/client";
import { Rating } from "@rating/domain/entities/Rating";
import { CreateRatingDTO } from "@rating/api/RatingDTO";

export const RatingMapper = {
  // fromCreateRatingDTOtoDomain(
  //   dto: CreateRatingDTO,
  //   workDetailsId: string
  // ): Rating {
  //   return new Rating("", dto.userId, workDetailsId, dto.score);
  // },
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
