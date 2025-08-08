import { WorkContract } from "@shared/contracts/WorkContracts";

export interface WorkPort {
  workExists(workId: string): Promise<boolean>;
  findWorkByPortfolio(portfolioId: string): Promise<WorkContract[]>;
}
