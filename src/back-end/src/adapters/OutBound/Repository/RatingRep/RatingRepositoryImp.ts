import Rating from "@domain/entities/rating/Rating";
import RatingRepository from "@domain/entities/rating/RatingRepository";
import Mapper from "@util/Mapper";
import { PrismaRatingRepository } from "@repository/ratingRep/PrismaRatingRepository";
import prismaRatingRepository from "@repository/ratingRep/PrismaRatingRepository";

class RatingRepositoryImp implements RatingRepository {
  constructor(
    private readonly prismaRatingRepository: PrismaRatingRepository
  ) {}

  async insert(rating: Rating): Promise<Rating> {
    const ratingModel = Mapper.Rating.fromDomaintoPrisma(rating);
    await this.prismaRatingRepository.insert(ratingModel);
    return rating;
  }

  async findMany(): Promise<Rating[]> {
    return (await this.prismaRatingRepository.findMany()).map(
      Mapper.Rating.fromPrismatoDomain
    );
  }

  async findById(id: string): Promise<Rating | null> {
    const ratingModel = await this.prismaRatingRepository.findById(id);
    if (!ratingModel) return null;
    return Mapper.Rating.fromPrismatoDomain(ratingModel);
  }

  async findByUserId(userId: string): Promise<Rating[]> {
    return (await this.prismaRatingRepository.findByUserId(userId)).map(
      Mapper.Rating.fromPrismatoDomain
    );
  }

  async findByWorkCompDetails(workCompDetailsId: string): Promise<Rating[]> {
    return (
      await this.prismaRatingRepository.findByWorkCompDetails(workCompDetailsId)
    ).map(Mapper.Rating.fromPrismatoDomain);
  }

  async findByUserAndWorkCompDetails(
    userId: string,
    workCompDetailsId: string
  ): Promise<Rating | null> {
    const rating =
      await this.prismaRatingRepository.findByUserAndWorkCompDetails(
        userId,
        workCompDetailsId
      );
    if (!rating) return null;

    return Mapper.Rating.fromPrismatoDomain(rating);
  }

  async update(rating: Rating): Promise<Rating> {
    const ratingModel = Mapper.Rating.fromDomaintoPrisma(rating);
    return Mapper.Rating.fromPrismatoDomain(
      await this.prismaRatingRepository.update(ratingModel)
    );
  }

  async delete(id: string): Promise<Rating> {
    return Mapper.Rating.fromPrismatoDomain(
      await this.prismaRatingRepository.delete(id)
    );
  }
}

const ratingRepositoryImp: RatingRepository = new RatingRepositoryImp(
  prismaRatingRepository
);
export default ratingRepositoryImp;
