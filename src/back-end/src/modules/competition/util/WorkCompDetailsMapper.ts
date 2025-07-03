import { WorkCompDetails as WorkCompDetailsModel } from "@prisma/client";
import { WorkCompDetails } from "@competition/domain/entities/WorkCompDetails";
import { Work as WorkModel } from "@prisma/client";
import { Work } from "@work/domain/entities/Work";
import { WorkMapper } from "@work/util/WorkMapper";

export const WorkCompDetailsMapper = {
  toDomain(
    workCompDetailsModel: WorkCompDetailsModel & { work?: WorkModel }
  ): WorkCompDetails {
    const workDomain = workCompDetailsModel.work
      ? WorkMapper.fromPrismatoDomain(workCompDetailsModel.work)
      : undefined;

    const details = new WorkCompDetails(
      workCompDetailsModel.id,
      workCompDetailsModel.totalReviewers,
      workCompDetailsModel.totalScore,
      workCompDetailsModel.competitionId,
      workCompDetailsModel.workId,
      workDomain
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
