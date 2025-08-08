import { Competition } from "@competition/domain/entities/Competition";
import { ICompetitionRepository } from "@competition/domain/interfaces/ICompetitionRepository";
import { Rating } from "@competition/domain/entities/Rating";
import { WorkCompDetails } from "@competition/domain/entities/WorkCompDetails";
import { CreaetRatingDTO } from "@competition/dtos/RatingDTO";
import { ICompetitionService } from "@competition/domain/interfaces/ICompetitionService";
import { RatingMapper } from "@competition/util/RatingMapper";
import { TYPES } from "@compositionRoot/Types";
import { Conflict, NotFound } from "@shared/error/HttpError";
import { IUserPort } from "@user/domain/interfaces/UserPort";
import { IWorkPort } from "@work/domain/interfaces/IWorkPort";
import { inject, injectable } from "inversify";

@injectable()
export class CompetitionService implements ICompetitionService {
  constructor(
    @inject(TYPES.ICompetitionRepository)
    private competitionRepository: ICompetitionRepository,
    @inject(TYPES.IWorkPort)
    private workPort: IWorkPort,
    @inject(TYPES.IUserPort)
    private userPort: IUserPort
  ) {}

  async create(competition: Competition): Promise<Competition> {
    return await this.competitionRepository.create(competition);
  }

  async subscribeWork(
    competitionId: string,
    workId: string
  ): Promise<WorkCompDetails> {
    const [competition, work] = await Promise.all([
      this.competitionRepository.findById(competitionId),
      this.workPort.workExists(workId),
    ]);

    if (!competition) throw new NotFound("A competição não foi encontrada");
    if (!work) throw new NotFound("O trabalho não pode ser encontrado");

    const existDetails = await this.competitionRepository.findWorkCompDetails(
      competitionId,
      workId
    );

    if (existDetails)
      throw new Conflict("O tralho já está cadastrado na competição");

    const details = await this.competitionRepository.createWorkCompDetails(
      new WorkCompDetails("", 0, 0, competitionId, workId)
    );
    return details;
  }

  async unsubscribeWork(competitionId: string, workId: string): Promise<void> {
    const details = await this.competitionRepository.findWorkCompDetails(
      competitionId,
      workId
    );

    if (!details)
      throw new NotFound(
        "Inscrição não encontrada para esta competição e trabalho"
      );

    const response = await this.competitionRepository.deleteWorkCompDetails(
      details.id
    );

    // throw new Error("Method not implemented.");
  }

  async updateCompetition(competition: Competition): Promise<Competition> {
    return await this.competitionRepository.update(competition);
  }

  async deleteCompetition(id: string): Promise<Competition | null> {
    return await this.competitionRepository.deleteById(id);
  }

  async findMany(): Promise<Competition[]> {
    return await this.competitionRepository.findMany();
  }

  async findById(id: string): Promise<Competition | null> {
    return await this.competitionRepository.findById(id);
  }

  async findSubscribedWorks(competitionId: string): Promise<WorkCompDetails[]> {
    const details =
      await this.competitionRepository.findWorkCompDetailsByCompetition(
        competitionId
      );

    return details;
  }

  async findWorkCompDetails(
    competitionId: string,
    workId: string
  ): Promise<WorkCompDetails | null> {
    const details = await this.competitionRepository.findWorkCompDetails(
      competitionId,
      workId
    );

    return details;
  }

  async createRating(ratingDto: CreaetRatingDTO): Promise<Rating> {
    const [existUser, existWorkCompDetails] = await Promise.all([
      this.userPort.exist(ratingDto.userId),
      this.competitionRepository.findWorkCompDetails(
        ratingDto.competitionId,
        ratingDto.workId
      ),
    ]);

    if (!existUser) throw new NotFound("Usuario não encontrado");
    if (!existWorkCompDetails)
      throw new NotFound(
        "É possivel que o trabalho não esteja inscrito nesta competição"
      );

    const existRating =
      await this.competitionRepository.findRatingByUserAndWorkCompDetails(
        ratingDto.userId,
        existWorkCompDetails.id
      );

    if (existRating) throw new Conflict("O usuario já avaliou este trabalho");

    const rating = RatingMapper.fromCreateRatingDTOtoDomain(
      ratingDto,
      existWorkCompDetails.id
    );

    existWorkCompDetails.addRating(rating.score);

    const [response] = await Promise.all([
      this.competitionRepository.createRating(rating),
      this.competitionRepository.updateWorkCompDetails(existWorkCompDetails),
    ]);

    return await this.competitionRepository.createRating(response);
  }
  async updateRating(rating: Rating): Promise<Rating> {
    const existRating = await this.competitionRepository.findRating(rating.id);

    if (!existRating) throw new NotFound("Sua avaliação não existe");

    const existWorkCompDetails =
      await this.competitionRepository.findWorkCompDetailsById(
        existRating.workDetailsId
      );

    if (!existWorkCompDetails)
      throw new NotFound(
        "É possivel que o trabalho não esteja inscrito nesta competição"
      );
    const oldScore = existRating.score;
    existRating.setScore(rating.score);

    existWorkCompDetails.updateTotalScore(oldScore, existRating.score);

    const [ratingResponse] = await Promise.all([
      this.competitionRepository.updateRating(existRating),
      this.competitionRepository.updateWorkCompDetails(existWorkCompDetails),
    ]);
    return ratingResponse;
  }
  async deleteRating(id: string): Promise<Rating> {
    const existRating = await this.competitionRepository.findRating(id);

    if (!existRating) throw new NotFound("Sua avaliação não existe");

    const existWorkCompDetails =
      await this.competitionRepository.findWorkCompDetailsById(
        existRating.workDetailsId
      );

    if (!existWorkCompDetails)
      throw new NotFound(
        "É possivel que o trabalho não esteja inscrito nesta competição"
      );

    existWorkCompDetails.removeRating(existRating);

    const [ratingResponse] = await Promise.all([
      this.competitionRepository.deleteRating(existRating.id),
      this.competitionRepository.updateWorkCompDetails(existWorkCompDetails),
    ]);

    return await this.competitionRepository.deleteRating(id);
  }
  async findRating(id: string): Promise<Rating | null> {
    return await this.competitionRepository.findRating(id);
  }
}
