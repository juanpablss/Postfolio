import { Competition as CompetitionModel } from "@prisma/client";
import { WorkCompDetails as WorkCompDetailsModel } from "@prisma/client";
import { Competition } from "@competition/domain/entities/Competition";
import { WorkCompDetails } from "@competition/domain/entities/WorkCompDetails";

export const CompetitionMapper = {
  toDomain(competitionModel: CompetitionModel): Competition {
    return new Competition(
      competitionModel.id,
      competitionModel.name,
      competitionModel.createdAt,
      competitionModel.startsAt,
      competitionModel.endsAt
    );
  },
  toPrisma(competition: Competition): CompetitionModel {
    return {
      id: competition.id,
      name: competition.name,
      createdAt: competition.createdAt,
      startsAt: competition.startsAt,
      endsAt: competition.endsAt,
    };
  },
};

export const WorkCompDetailsMapper = {
  toDomain(workCompDetailsModel: WorkCompDetailsModel): WorkCompDetails {
    const details = new WorkCompDetails(
      workCompDetailsModel.id,
      workCompDetailsModel.totalReviewers,
      workCompDetailsModel.totalScore,
      workCompDetailsModel.competitionId,
      workCompDetailsModel.workId
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
