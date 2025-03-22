import Rating from "../../Domain/Entities/Rating/Rating";

export default interface RatingUseCases {
  register(rating: Rating): Promise<Rating>;
  findByPortfolioId(portfolioId: number): Promise<Rating[]>;
  findByUserId(userId: string): Promise<Rating[]>;
  update(userId: string, portfolioId: number): Promise<Rating>;
  delete(userId: string, portfolioId: number): Promise<Rating>;
}
