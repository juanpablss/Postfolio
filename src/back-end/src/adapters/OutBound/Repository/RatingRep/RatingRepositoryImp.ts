import Rating from "@domain/entities/rating/Rating";
import RatingRepository from "@domain/entities/rating/RatingRepository";
import Mapper from "@util/Mapper";
import { PrismaRatingRepository } from "@adapters/outBound/repository/ratingRep/PrismaRatingRepository";

class RatingRepositoryImp implements RatingRepository {
  async insert(rating: Rating): Promise<Rating> {
    const ratingEntity = Mapper.Rating.toPrisma(rating);
    await PrismaRatingRepository.insert(ratingEntity);
    return rating;
  }

  async findMany(): Promise<Rating[]> {
    return (await PrismaRatingRepository.findMany()).map(
      Mapper.Rating.toDomain
    );
  }

  async findByUserId(userId: string): Promise<Rating[]> {
    return (await PrismaRatingRepository.findByUserId(userId)).map(
      Mapper.Rating.toDomain
    );
  }

  async findByPortfolioId(portfolioId: string): Promise<Rating[]> {
    return (await PrismaRatingRepository.findByPortfolioId(portfolioId)).map(
      Mapper.Rating.toDomain
    );
  }

  async findByUserAndPortfolio(
    userId: string,
    portfolioId: string
  ): Promise<Rating | null> {
    const rating = await PrismaRatingRepository.findByUserAndPortfolio(
      userId,
      portfolioId
    );
    if (!rating) return null;

    return Mapper.Rating.toDomain(rating);
  }

  async update(rating: Rating): Promise<Rating> {
    const ratingEntity = Mapper.Rating.toPrisma(rating);
    return Mapper.Rating.toDomain(
      await PrismaRatingRepository.update(ratingEntity)
    );
  }

  async delete(id: string): Promise<Rating> {
    return Mapper.Rating.toDomain(await PrismaRatingRepository.delete(id));
  }
}

const ratingRepository: RatingRepository = new RatingRepositoryImp();
export default ratingRepository;
