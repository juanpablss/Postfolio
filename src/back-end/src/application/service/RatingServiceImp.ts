import ratingRepositoryImp from "@repository/ratingRep/RatingRepositoryImp";
import Rating from "@domain/entities/rating/Rating";
import RatingUseCases from "@application/useCases/RatingUseCases";
import RatingRepository from "@domain/entities/rating/RatingRepository";
import { Conflict } from "@domain/error/HttpError";

class RatingServiceImp implements RatingUseCases {
  constructor(private readonly ratingRepository: RatingRepository) {}

  async register(rating: Rating): Promise<Rating> {
    const existeRating = await this.findByUserAndWorkCompDetails(
      rating.userId,
      rating.workDetailsId
    );

    if (existeRating)
      throw new Conflict("Não é permitido mais de uma avaliação");

    const ratingDomain = await this.ratingRepository.insert(rating);
    return ratingDomain;
  }

  async findMany(): Promise<Rating[]> {
    return await this.ratingRepository.findMany();
  }

  async findByUserId(userId: string): Promise<Rating[]> {
    return await this.ratingRepository.findByUserId(userId);
  }

  async findByWorkCompDetails(workCompDetailsId: string): Promise<Rating[]> {
    return await this.ratingRepository.findByWorkCompDetails(workCompDetailsId);
  }

  async findByUserAndWorkCompDetails(
    userId: string,
    workCompDetailsId: string
  ): Promise<Rating | null> {
    return await this.ratingRepository.findByUserAndWorkCompDetails(
      userId,
      workCompDetailsId
    );
  }

  async update(rating: Rating): Promise<Rating> {
    // Precisa atualzar o WorkCompDetails também
    return await this.ratingRepository.update(rating);
  }

  async delete(id: string): Promise<Rating> {
    // Precisa atualzar o WorkCompDetails também
    return await this.ratingRepository.delete(id);
  }
}

const ratingService: RatingUseCases = new RatingServiceImp(ratingRepositoryImp);
export default ratingService;
