import Rating from "@domain/entities/rating/Rating";

export default interface RatingUseCases {
  register(rating: Rating): Promise<Rating>;
  update(
    score: number,
    competitionId: string,
    workId: string,
    ratingId: string
  ): Promise<Rating>;
  delete(id: string): Promise<Rating>;
  // deleteByCompetitionAndWorkAndUser(id: string): Promise<Rating>;

  findMany(): Promise<Rating[]>;
  findById(id: string): Promise<Rating | null>;
  findByUserId(userId: string): Promise<Rating[]>;
  findByWorkCompDetails(workCompDetailsId: string): Promise<Rating[]>;
  findByUserAndWorkCompDetails(
    userId: string,
    workCompDetailsId: string
  ): Promise<Rating | null>;
}
