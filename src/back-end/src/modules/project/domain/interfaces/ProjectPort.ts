import { ProjectContract } from "@shared/contracts/ProjectContracts";

export interface ProjectPort {
  workExists(workId: string): Promise<boolean>;
  findWorkByPortfolio(portfolioId: string): Promise<ProjectContract[]>;
}
