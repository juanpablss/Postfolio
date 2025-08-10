import { Competition } from "@competition/domain/entities/Competition";
// import Work from "@domain/entities/work/Work";
import { ProjectContract } from "@shared/contracts/ProjectContracts";

export interface ICompetitionService {
  create(competition: Competition): Promise<Competition>;

  updateCompetition(competition: Competition): Promise<Competition>;
  deleteCompetition(id: string): Promise<Competition | null>;

  subscribeWork(competitionId: string, projectId: string): Promise<boolean>;
  unsubscribeWork(competitionId: string, projectId: string): Promise<void>;

  findMany(): Promise<Competition[]>;
  findById(id: string): Promise<Competition | null>;

  findSubscribedProjects(competitionId: string): Promise<ProjectContract[]>;
  findProjecWithDetails(
    competitionId: string,
    projectId: string
  ): Promise<ProjectContract | null>;

  // createRating(ratingDto: CreaetRatingDTO): Promise<Rating>;
  // updateRating(rating: Rating): Promise<Rating>;
  // deleteRating(id: string): Promise<Rating>;
  // findRating(id: string): Promise<Rating | null>;
}
