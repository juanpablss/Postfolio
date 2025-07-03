import { Competition as CompetitionModel } from "@prisma/client";
import { Competition } from "@competition/domain/entities/Competition";

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
