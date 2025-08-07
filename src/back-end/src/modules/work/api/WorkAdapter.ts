import { IWorkPort } from "@work/api/IWorkPort";
import { IWorkService } from "@work/service/IWorkService";
import { injectable, inject } from "inversify";
import { TYPES } from "@compositionRoot/Types";
import { WorkContract } from "@shared/contracts/WorkContracts";
import { IWorkRepository } from "@work/domain/entities/IWorkRepository";

@injectable()
export class WorkAdapter implements IWorkPort {
  constructor(
    @inject(TYPES.IWorkService) private workService: IWorkService,
    @inject(TYPES.IWorkRepository)
    private workdRepository: IWorkRepository
  ) {}

  async workExists(workId: string): Promise<boolean> {
    const work = await this.workService.findById(workId);
    return work ? true : false;
  }

  async findWorkByPortfolio(portfolioId: string): Promise<WorkContract[]> {
    return await this.workdRepository.findByPortfolio(portfolioId);
  }
}
