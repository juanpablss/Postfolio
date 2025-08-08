import { IWorkPort } from "@work/domain/interfaces/IWorkPort";
import { IWorkService } from "@work/domain/interfaces/IWorkService";
import { injectable, inject } from "inversify";
import { TYPES } from "@compositionRoot/Types";
import { WorkContract } from "@shared/contracts/WorkContracts";
import { IWorkRepository } from "@work/domain/interfaces/IWorkRepository";

@injectable()
export class WorkAdapter implements IWorkPort {
  constructor(
    @inject(TYPES.IWorkRepository)
    private workRepository: IWorkRepository
  ) {}

  async workExists(workId: string): Promise<boolean> {
    const work = await this.workRepository.findById(workId);
    return work ? true : false;
  }

  async findWorkByPortfolio(portfolioId: string): Promise<WorkContract[]> {
    return await this.workRepository.findByPortfolio(portfolioId);
  }
}
