import Rating from "./Rating";

export default interface RatingRepository {
  insert(rating: Rating): Promise<Rating>;
  findByPortfolioId(portfolioId: number): Promise<Rating[]>;
  findByUserId(userId: string): Promise<Rating[]>;
  update(rating: Rating): Promise<Rating>;
  delete(userId: string, portfolioId: number): Promise<Rating>;
}
