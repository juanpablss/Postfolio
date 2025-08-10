import { CompetitionPort } from "@competition/domain/interfaces/CompetitionPort";
import { TYPES } from "@compositionRoot/Types";
import { UpsertRatingDTO } from "@rating/api/RatingDTO";
import { Rating } from "@rating/domain/entities/Rating";
import { IRatingRepository } from "@rating/domain/interfaces/IRatingRepository";
import { IRatingService } from "@rating/domain/interfaces/IRatingService";
import { NotFound } from "@shared/error/HttpError";
import { UserPort } from "@user/domain/interfaces/UserPort";
import { ProjectPort } from "@work/domain/interfaces/ProjectPort";
import { inject, injectable } from "inversify";
import { RatingMapper } from "@rating/application/RatingMapper";

@injectable()
export class RatingService implements IRatingService {
  constructor(
    @inject(TYPES.IRatingRepository)
    private ratingRepsotory: IRatingRepository,
    @inject(TYPES.CompetitionPort)
    private competitionPort: CompetitionPort,
    @inject(TYPES.UserPort)
    private userPort: UserPort,
    @inject(TYPES.ProjectPort)
    private projectPort: ProjectPort
  ) {}

  async upsert(dto: UpsertRatingDTO): Promise<Rating> {
    const [user, competition, project, details, existRating] =
      await Promise.all([
        this.userPort.exist(dto.userId),
        this.competitionPort.exist(dto.competitionId),
        this.projectPort.workExists(dto.projectId),
        this.competitionPort.getProjectDetailsId(
          dto.userId,
          dto.competitionId,
          dto.projectId
        ),
        this.ratingRepsotory.findByUserCompetitionProject(
          dto.userId,
          dto.competitionId,
          dto.projectId
        ),
      ]);

    if (!user || !competition || !project || !details)
      throw new NotFound("Dados não encontrados");

    if (!existRating) {
      const rating = RatingMapper.fromUpsertRatingDTOtoDomain(dto, details);
      return await this.ratingRepsotory.create(rating);
    }

    existRating.updateScore(dto.score);
    return this.ratingRepsotory.update(existRating);
  }

  delete(id: string): Promise<Rating> {
    throw new Error("Method not implemented.");
  }
  findById(id: string): Promise<Rating | null> {
    throw new Error("Method not implemented.");
  }
}
