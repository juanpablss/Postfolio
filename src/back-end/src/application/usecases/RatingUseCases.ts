import Rating from "@domain/entities/rating/Rating";

export default interface RatingUseCases {
  register(rating: Rating): Promise<Rating>;
  update(rating: Rating): Promise<Rating>;
  delete(id: string): Promise<Rating>;

  findMany(): Promise<Rating[]>;
  findById(id: string): Promise<Rating | null>;
  findByUserId(userId: string): Promise<Rating[]>;
  findByWorkCompDetails(workCompDetailsId: string): Promise<Rating[]>;
  findByUserAndWorkCompDetails(
    userId: string,
    workCompDetailsId: string
  ): Promise<Rating | null>;
}
