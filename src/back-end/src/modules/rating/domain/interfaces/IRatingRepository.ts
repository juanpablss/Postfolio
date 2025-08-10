import { Rating } from "@rating/domain/entities/Rating";

export interface IRatingRepository {
  create(rating: Rating): Promise<Rating>;
  update(rating: Rating): Promise<Rating>;
  delete(id: string): Promise<Rating>;

  findById(id: string): Promise<Rating | null>;
  findByUserCompetitionProject(
    userId: string,
    competitionId: string,
    projectId: string
  ): Promise<Rating | null>;

  // findRatingByUserAndWorkCompDetails(
  //   userId: string,
  //   workCompDetailsId: string
  // ): Promise<Rating | null>;
}
