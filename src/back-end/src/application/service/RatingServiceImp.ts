import ratingRepositoryImp from "@repository/ratingRep/RatingRepositoryImp";
import Rating from "@domain/entities/rating/Rating";
import RatingUseCases from "@application/useCases/RatingUseCases";
import RatingRepository from "@domain/entities/rating/RatingRepository";
import { Conflict, NotFound } from "@domain/error/HttpError";
import WorkCompDetailsRepository from "@domain/entities/workCompDetails/WorkCompDetailsRepository";
import workCompDetailsRepositoryImp from "@repository/workCompDetailsRep/WorkCompDetailsRepository";

class RatingServiceImp implements RatingUseCases {
  constructor(
    private readonly ratingRepository: RatingRepository,
    private readonly workCompDetailsRepository: WorkCompDetailsRepository
  ) {}

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

  async findById(id: string): Promise<Rating | null> {
    return await this.ratingRepository.findById(id);
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

  async update(
    score: number,
    competitionId: string,
    workId: string,
    ratingId: string
  ): Promise<Rating> {
    const [oldRating, oldDetails] = await Promise.all([
      this.ratingRepository.findById(ratingId),
      this.workCompDetailsRepository.findByCompetitionAndWork(
        competitionId,
        workId
      ),
    ]);

    if (!oldRating) throw new NotFound("Avaliação não encontrada");
    if (!oldDetails) throw new NotFound("Avaliação não vinculada");

    oldDetails.totalScore = score - oldRating.score;
    oldRating.score = score;

    const [newRating, newDetails] = await Promise.all([
      this.ratingRepository.update(oldRating),
      this.workCompDetailsRepository.update(oldDetails),
    ]);

    return await this.ratingRepository.update(newRating);
  }

  async delete(id: string): Promise<Rating> {
    const rating = await this.ratingRepository.findById(id);

    if (!rating) throw new NotFound("Avaliação não encontrada");

    const details = await this.workCompDetailsRepository.findById(
      rating.workDetailsId
    );

    if (!details) throw new NotFound("Avaliação não vinculada");

    details.totalReviewers -= 1;
    details.totalScore -= rating.score;

    const [ratingDelete] = await Promise.all([
      this.ratingRepository.delete(id),
      this.workCompDetailsRepository.update(details),
    ]);

    return ratingDelete;
  }
}

const ratingService: RatingUseCases = new RatingServiceImp(
  ratingRepositoryImp,
  workCompDetailsRepositoryImp
);
export default ratingService;
