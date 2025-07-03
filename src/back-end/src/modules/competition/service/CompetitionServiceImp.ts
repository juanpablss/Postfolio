import { Competition } from "@competition/domain/entities/Competition";
import { ICompetitionRepository } from "@competition/domain/entities/ICompetitionRepository";
import { WorkCompDetails } from "@competition/domain/entities/WorkCompDetails";
import { ICompetitionService } from "@competition/service/ICompetitionService";
import { TYPES } from "@compositionRoot/Types";
import { Conflict, NotFound } from "@shared/error/HttpError";
import { IWorkPort } from "@work/api/IWorkPort";
import { inject, injectable } from "inversify";

@injectable()
export class CompetitionService implements ICompetitionService {
  constructor(
    @inject(TYPES.ICompetitionRepository)
    private competitionRepository: ICompetitionRepository,
    @inject(TYPES.IWorkPort)
    private workPort: IWorkPort
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
      this.workPort.workExists(workId),
    ]);

    if (!competition) throw new NotFound("A competição não foi encontrada");
    if (!work) throw new NotFound("O trabalho não pode ser encontrado");

    const existDetails = await this.competitionRepository.findWorkCompDetails(
      competitionId,
      workId
    );

    if (!existDetails)
      throw new Conflict("O tralho já está cadastrado na competição");

    const details = await this.competitionRepository.insertWorkCompDetails(
      new WorkCompDetails("", 0, 0, competitionId, workId)
    );
    return details;
  }

  async unsubscribeWork(competitionId: string, workId: string): Promise<void> {
    // const details =
    //   await this.workCompDetailsRepository.findByCompetitionAndWork(
    //     competitionId,
    //     workId
    //   );

    // if (!details)
    //   throw new NotFound(
    //     "Inscrição não encontrada para esta competição e trabalho"
    //   );

    throw new Error("Method not implemented.");
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
}
