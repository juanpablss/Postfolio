import { ProjectPort } from "@project/domain/interfaces/ProjectPort";
import { injectable, inject } from "inversify";
import { TYPES } from "@compositionRoot/Types";
import { ProjectContract } from "@shared/contracts/ProjectContracts";
import { IProjectRepository } from "@project/domain/interfaces/IProjectRepository";

@injectable()
export class WorkAdapter implements ProjectPort {
  constructor(
    @inject(TYPES.IProjectRepository)
    private workRepository: IProjectRepository
  ) {}

  async exist(workId: string): Promise<boolean> {
    const work = await this.workRepository.findById(workId);
    return work ? true : false;
  }

  async findProjectsByPortfolioId(
    portfolioId: string
  ): Promise<ProjectContract[]> {
    return await this.workRepository.findByPortfolio(portfolioId);
  }
}
