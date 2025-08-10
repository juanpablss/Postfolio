import { WorkCompDetails as WorkCompDetailsModel } from "@prisma/client";
import {
  WorkCompDetails,
  WorkData,
} from "@competition/domain/entities/WorkCompDetails";
import { Work as WorkModel } from "@prisma/client";
import { Rating as RatingModel } from "@prisma/client";
import { RatingMapper } from "@rating/application/RatingMapper";

export const WorkCompDetailsMapper = {
  toDomain(
    workCompDetailsModel: WorkCompDetailsModel & { work?: WorkModel } & {
      rating?: RatingModel[];
    }
  ): WorkCompDetails {
    let workData = undefined;
    let ratings = undefined;

    if (workCompDetailsModel.work) {
      workData = new WorkData(
        workCompDetailsModel.work.id,
        workCompDetailsModel.work.name,
        workCompDetailsModel.work.description,
        workCompDetailsModel.work.githubLink,
        workCompDetailsModel.work.portfolioId
      );
    }

    if (workCompDetailsModel.rating) {
      ratings = workCompDetailsModel.rating.map(RatingMapper.fromPrismatoDomin);
    }

    const details = new WorkCompDetails(
      workCompDetailsModel.id,
      workCompDetailsModel.totalReviewers,
      workCompDetailsModel.totalScore,
      workCompDetailsModel.competitionId,
      workCompDetailsModel.workId,
      workData,
      ratings
    );

    return details;
  },
  toPrisma(workCompDetails: WorkCompDetails): WorkCompDetailsModel {
    return {
      id: workCompDetails.id,
      totalReviewers: workCompDetails.totalReviewers,
      totalScore: workCompDetails.totalScore,
      competitionId: workCompDetails.competitionId,
      workId: workCompDetails.workId,
    };
  },
};
