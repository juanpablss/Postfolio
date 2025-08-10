import { WorkContract } from "@shared/contracts/WorkContracts";

export interface ProjectPort {
  workExists(workId: string): Promise<boolean>;
  findWorkByPortfolio(portfolioId: string): Promise<WorkContract[]>;
}
