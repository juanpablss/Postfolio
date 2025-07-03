import { WorkCompDetails as WorkCompDetailsModel } from "@prisma/client";
import {
  WorkCompDetails,
  WorkData,
} from "@competition/domain/entities/WorkCompDetails";
import { Work as WorkModel } from "@prisma/client";

export const WorkCompDetailsMapper = {
  toDomain(
    workCompDetailsModel: WorkCompDetailsModel & { work?: WorkModel }
  ): WorkCompDetails {
    let workData = undefined;

    if (workCompDetailsModel.work) {
      workData = new WorkData(
        workCompDetailsModel.work.id,
        workCompDetailsModel.work.name,
        workCompDetailsModel.work.description,
        workCompDetailsModel.work.githubLink,
        workCompDetailsModel.work.portfolioId
      );
    }

    const details = new WorkCompDetails(
      workCompDetailsModel.id,
      workCompDetailsModel.totalReviewers,
      workCompDetailsModel.totalScore,
      workCompDetailsModel.competitionId,
      workCompDetailsModel.workId,
      workData
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
