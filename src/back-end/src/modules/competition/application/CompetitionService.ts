import { Competition } from "@competition/domain/entities/Competition";
import { ICompetitionRepository } from "@competition/domain/interfaces/ICompetitionRepository";
import { ICompetitionService } from "@competition/domain/interfaces/ICompetitionService";
import { TYPES } from "@compositionRoot/Types";
import { Conflict, NotFound } from "@shared/error/HttpError";
import { UserPort } from "@user/domain/interfaces/UserPort";
import { ProjectPort } from "@project/domain/interfaces/ProjectPort";
import { inject, injectable } from "inversify";
import { ProjectCompDetailsPort } from "@projectCompDetails/domain/interfaces/ProjectCompDetailsPort";
import { ProjectContract } from "@shared/contracts/ProjectContracts";

@injectable()
export class CompetitionService implements ICompetitionService {
  constructor(
    @inject(TYPES.ICompetitionRepository)
    private competitionRepository: ICompetitionRepository,
    @inject(TYPES.ProjectPort)
    private projectPort: ProjectPort,
    @inject(TYPES.UserPort)
    private userPort: UserPort,
    @inject(TYPES.ProjectCompDetailsPort)
    private projectCompDetailsPort: ProjectCompDetailsPort
  ) {}

  async create(competition: Competition): Promise<Competition> {
    return await this.competitionRepository.create(competition);
  }

  async subscribeProject(
    competitionId: string,
    projectId: string
  ): Promise<boolean> {
    const [competition, project, details] = await Promise.all([
      this.competitionRepository.findById(competitionId),
      this.projectPort.exist(projectId),
      this.projectCompDetailsPort.exist(competitionId, projectId),
    ]);

    if (!competition) throw new NotFound("A competição não foi encontrada");
    if (!project) throw new NotFound("O trabalho não pode ser encontrado");

    if (details)
      throw new Conflict("O tralho já está cadastrado na competição");

    const result = await this.projectCompDetailsPort.create({
      totalReviewers: 0,
      totalScore: 0,
      competitionId: competition.id,
      projectId: project,
      checked: true,
    });

    return result;
  }

  async unsubscribeWork(
    competitionId: string,
    projectId: string
  ): Promise<void> {
    const details = await this.projectCompDetailsPort.exist(
      competitionId,
      projectId
    );

    if (!details)
      throw new NotFound(
        "Inscrição não encontrada para esta competição e projeto"
      );

    const response = await this.projectCompDetailsPort.delete(details);
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

  findSubscribedProjects(competitionId: string): Promise<ProjectContract[]> {
    throw new Error("Method not implemented.");
  }
  findProjecWithDetails(
    competitionId: string,
    projectId: string
  ): Promise<ProjectContract | null> {
    throw new Error("Method not implemented.");
  }

  // async findSubscribedProjects(
  //   competitionId: string
  // ): Promise<ProjectContract[]> {
  //   const details =
  //     await this.competitionRepository.findWorkCompDetailsByCompetition(
  //       competitionId
  //     );

  //   return details;
  // }

  // async findProjecWithDetails(
  //   competitionId: string,
  //   workId: string
  // ): Promise<WorkCompDetails | null> {
  //   const details = await this.competitionRepository.findWorkCompDetails(
  //     competitionId,
  //     workId
  //   );

  //   return details;
  // }

  // async createRating(ratingDto: CreaetRatingDTO): Promise<Rating> {
  //   const [existUser, existWorkCompDetails] = await Promise.all([
  //     this.userPort.exist(ratingDto.userId),
  //     this.competitionRepository.findWorkCompDetails(
  //       ratingDto.competitionId,
  //       ratingDto.workId
  //     ),
  //   ]);

  //   if (!existUser) throw new NotFound("Usuario não encontrado");
  //   if (!existWorkCompDetails)
  //     throw new NotFound(
  //       "É possivel que o trabalho não esteja inscrito nesta competição"
  //     );

  //   const existRating =
  //     await this.competitionRepository.findRatingByUserAndWorkCompDetails(
  //       ratingDto.userId,
  //       existWorkCompDetails.id
  //     );

  //   if (existRating) throw new Conflict("O usuario já avaliou este trabalho");

  //   const rating = RatingMapper.fromCreateRatingDTOtoDomain(
  //     ratingDto,
  //     existWorkCompDetails.id
  //   );

  //   existWorkCompDetails.addRating(rating.score);

  //   const [response] = await Promise.all([
  //     this.competitionRepository.createRating(rating),
  //     this.competitionRepository.updateWorkCompDetails(existWorkCompDetails),
  //   ]);

  //   return await this.competitionRepository.createRating(response);
  // }

  // async updateRating(rating: Rating): Promise<Rating> {
  //   const existRating = await this.competitionRepository.findRating(rating.id);

  //   if (!existRating) throw new NotFound("Sua avaliação não existe");

  //   const existWorkCompDetails =
  //     await this.competitionRepository.findWorkCompDetailsById(
  //       existRating.workDetailsId
  //     );

  //   if (!existWorkCompDetails)
  //     throw new NotFound(
  //       "É possivel que o trabalho não esteja inscrito nesta competição"
  //     );
  //   const oldScore = existRating.score;
  //   existRating.setScore(rating.score);

  //   existWorkCompDetails.updateTotalScore(oldScore, existRating.score);

  //   const [ratingResponse] = await Promise.all([
  //     this.competitionRepository.updateRating(existRating),
  //     this.competitionRepository.updateWorkCompDetails(existWorkCompDetails),
  //   ]);
  //   return ratingResponse;
  // }
  // async deleteRating(id: string): Promise<Rating> {
  //   const existRating = await this.competitionRepository.findRating(id);

  //   if (!existRating) throw new NotFound("Sua avaliação não existe");

  //   const existWorkCompDetails =
  //     await this.competitionRepository.findWorkCompDetailsById(
  //       existRating.workDetailsId
  //     );

  //   if (!existWorkCompDetails)
  //     throw new NotFound(
  //       "É possivel que o trabalho não esteja inscrito nesta competição"
  //     );

  //   existWorkCompDetails.removeRating(existRating);

  //   const [ratingResponse] = await Promise.all([
  //     this.competitionRepository.deleteRating(existRating.id),
  //     this.competitionRepository.updateWorkCompDetails(existWorkCompDetails),
  //   ]);

  //   return await this.competitionRepository.deleteRating(id);
  // }
  // async findRating(id: string): Promise<Rating | null> {
  //   return await this.competitionRepository.findRating(id);
  // }
}
