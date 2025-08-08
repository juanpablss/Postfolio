import { WorkContract } from "@shared/contracts/WorkContracts";

export interface IWorkPort {
  workExists(workId: string): Promise<boolean>;
  findWorkByPortfolio(portfolioId: string): Promise<WorkContract[]>;
}
