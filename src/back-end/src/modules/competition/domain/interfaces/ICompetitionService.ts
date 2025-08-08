import { Competition } from "@competition/domain/entities/Competition";
import { Rating } from "@competition/domain/entities/Rating";
// import Work from "@domain/entities/work/Work";
import { WorkCompDetails } from "@competition/domain/entities/WorkCompDetails";
import { CreaetRatingDTO } from "@competition/api/RatingDTO";

export interface ICompetitionService {
  create(competition: Competition): Promise<Competition>;
  subscribeWork(
    competitionId: string,
    workId: string
  ): Promise<WorkCompDetails>;
  unsubscribeWork(competitionId: string, workId: string): Promise<void>;
  updateCompetition(competition: Competition): Promise<Competition>;
  deleteCompetition(id: string): Promise<Competition | null>;

  findMany(): Promise<Competition[]>;
  findById(id: string): Promise<Competition | null>;
  findSubscribedWorks(competitionId: string): Promise<WorkCompDetails[]>;
  findWorkCompDetails(
    competitionId: string,
    workId: string
  ): Promise<WorkCompDetails | null>;

  createRating(ratingDto: CreaetRatingDTO): Promise<Rating>;
  updateRating(rating: Rating): Promise<Rating>;
  deleteRating(id: string): Promise<Rating>;
  findRating(id: string): Promise<Rating | null>;
}
