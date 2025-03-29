import ratingRepository from "../../Adapters/OutBound/Repository/RatingRep/RatingRepositoryImp";
import Rating from "../../Domain/Entities/Rating/Rating";
import RatingUseCases from "../UseCases/RatingUseCases";

class RatingServiceImp implements RatingUseCases {
  async register(rating: Rating): Promise<Rating> {
    const ratingDomain = ratingRepository.insert(rating);
    return ratingDomain;
  }

  async findMany(): Promise<Rating[]> {
    return await ratingRepository.findMany();
  }

  async findByUserId(userId: string): Promise<Rating[]> {
    return await ratingRepository.findByUserId(userId);
  }

  async findByPortfolioId(portfolioId: number): Promise<Rating[]> {
    return await ratingRepository.findByPortfolioId(portfolioId);
  }

  async findByUserAndPortfolio(
    userId: string,
    portfolioId: number
  ): Promise<Rating | null> {
    return await ratingRepository.findByUserAndPortfolio(userId, portfolioId);
  }

  async update(rating: Rating): Promise<Rating> {
    return await ratingRepository.update(rating);
  }

  async delete(userId: string, portfolioId: number): Promise<Rating> {
    return await ratingRepository.delete(userId, portfolioId);
  }
}

const ratingService: RatingUseCases = new RatingServiceImp();
export default ratingService;
