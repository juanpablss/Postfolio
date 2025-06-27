import Competition from "@domain/entities/competition/Competition";
import CompetitionRepository from "@domain/entities/competition/CompetitionRepository";
import Work from "@domain/entities/work/Work";
import WorkRepository from "@domain/entities/work/WorkRepository";
import WorkCompDetails from "@domain/entities/workCompDetails/WorkCompDetails";
import WorkCompDetailsRepository from "@domain/entities/workCompDetails/WorkCompDetailsRepository";
import { Conflict, NotFound } from "@domain/error/HttpError";
import competitionRepositoryImp from "@repository/competitionRep/CompetitionRepositoryImp";
import workCompDetailsRepositoryImp from "@repository/workCompDetailsRep/WorkCompDetailsRepository";
import workRepositoryImp from "@repository/workRep/WorkRepositoryImp";
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

  async unsubscribeWork(competitionId: string, workId: string): Promise<void> {
    const details =
      await this.workCompDetailsRepository.findByCompetitionAndWork(
        competitionId,
        workId
      );

    if (!details)
      throw new NotFound(
        "Inscrição não encontrada para esta competição e trabalho"
      );

    throw new Error("Method not implemented.");
  }

  async update(competition: Competition): Promise<Competition> {
    return await this.competitionRepository.update(competition);
  }

  async deleteById(id: string): Promise<Competition | null> {
    return await this.competitionRepository.deleteById(id);
  }

  async findMany(): Promise<Competition[]> {
    return await this.competitionRepository.findMany();
  }

  async findById(id: string): Promise<Competition | null> {
    return await this.competitionRepository.findById(id);
  }

  async findSubscribedWorks(competitionId: string): Promise<Work[]> {
    const details = await this.workCompDetailsRepository.findWorksByCompetition(
      competitionId
    );
    const works = details.map((d) => {
      if (!d.work) throw new NotFound("Dados do trabalho estão imcompletos");
      return d.work;
    });

    return works;
  }
}

const competitionServiceImp: CompetitionUseCase = new CompetitionServiceImp(
  competitionRepositoryImp,
  workCompDetailsRepositoryImp,
  workRepositoryImp
);
export default competitionServiceImp;
