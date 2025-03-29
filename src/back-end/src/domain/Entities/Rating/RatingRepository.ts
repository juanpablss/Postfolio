import Rating from "./Rating";

export default interface RatingRepository {
  insert(rating: Rating): Promise<Rating>;
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
