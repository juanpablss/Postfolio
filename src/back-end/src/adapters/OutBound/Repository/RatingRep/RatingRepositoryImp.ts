import Rating from "../../../../Domain/Entities/Rating/Rating";
import RatingRepository from "../../../../Domain/Entities/Rating/RatingRepository";
import Mapper from "../../../../Util/Mapper";
import { PrismaRatingRepository } from "./PrismaRatingRepository";

class RatingRepositoryImp implements RatingRepository {
  async insert(rating: Rating): Promise<Rating> {
    const ratingEntity = Mapper.Rating.toPrisma(rating);
    await PrismaRatingRepository.insert(ratingEntity);
    return rating;
  }
  async findByUserId(userId: string): Promise<Rating[]> {
    return (await PrismaRatingRepository.findByUserId(userId)).map(
      Mapper.Rating.toDomain
    );
  }

  async findByPortfolioId(portfolioId: number): Promise<Rating[]> {
    return (await PrismaRatingRepository.findByPortfolioId(portfolioId)).map(
      Mapper.Rating.toDomain
    );
  }

  async update(rating: Rating): Promise<Rating> {
    return Mapper.Rating.toDomain(await PrismaRatingRepository.update(rating));
  }

  async delete(userId: string, portfolioId: number): Promise<Rating> {
    return Mapper.Rating.toDomain(
      await PrismaRatingRepository.delete(userId, portfolioId)
    );
  }
}

const ratingRepository: RatingRepository = new RatingRepositoryImp();
export default ratingRepository;
