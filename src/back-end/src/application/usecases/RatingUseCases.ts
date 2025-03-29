import Rating from "../../Domain/Entities/Rating/Rating";

export default interface RatingUseCases {
  register(rating: Rating): Promise<Rating>;
  findMany(): Promise<Rating[]>;
  findByPortfolioId(portfolioId: number): Promise<Rating[]>;
  findByUserId(userId: string): Promise<Rating[]>;
  findByUserAndPortfolio(
    userId: string,
    portfolioId: number
  ): Promise<Rating | null>;
  update(rating: Rating): Promise<Rating>;
  delete(userId: string, portfolioId: number): Promise<Rating>;
}
