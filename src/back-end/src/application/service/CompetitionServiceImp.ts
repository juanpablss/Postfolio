import Competition from "@domain/entities/competition/Competition";
import CompetitionRepository from "@domain/entities/competition/CompetitionRepository";
import Work from "@domain/entities/work/Work";
import WorkRepository from "@domain/entities/work/WorkRepository";
import WorkCompDetails from "@domain/entities/workCompDetails/WorkCompDetails";
import WorkCompDetailsRepository from "@domain/entities/workCompDetails/WorkCompDetailsRepository";
import { Conflict, NotFound } from "@domain/error/HttpError";
import CompetitionUseCase from "@useCases/CompetitionUseCase";

class CompetitionServiceImp implements CompetitionUseCase {
  constructor(
    private readonly competitionRepository: CompetitionRepository,
    private readonly workCompDetailsRepository: WorkCompDetailsRepository,
    private readonly workRepository: WorkRepository
  ) {}

  async register(competition: Competition): Promise<Competition> {
    return await this.competitionRepository.insert(competition);
  }

  async subscribeWork(
    competitionId: string,
    workId: string
  ): Promise<WorkCompDetails> {
    const [competition, work] = await Promise.all([
      this.competitionRepository.findById(competitionId),
      this.workRepository.findById(workId),
    ]);

    if (!competition) throw new NotFound("A competição não foi encontrada");
    if (!work) throw new NotFound("O trabalho não pode ser encontrado");

    const existDetails =
      await this.workCompDetailsRepository.findByCompetitionAndWork(
        competitionId,
        workId
      );

    if (existDetails)
      throw new Conflict("O tralho já está cadastrado na competição");

    const details = await this.workCompDetailsRepository.insert(
      new WorkCompDetails("", 0, 0, competitionId, workId)
    );
    return details;
  }

  unsubscribeWork(competitionId: string, workId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  update(competition: Competition): Promise<Competition> {
    throw new Error("Method not implemented.");
  }
  deleteById(id: string): Promise<Competition | null> {
    throw new Error("Method not implemented.");
  }
  findMany(): Promise<Competition[]> {
    throw new Error("Method not implemented.");
  }
  findById(id: string): Promise<Competition | null> {
    throw new Error("Method not implemented.");
  }
  findSubscribedWorks(competitionId: string): Promise<Work[]> {
    throw new Error("Method not implemented.");
  }
}
