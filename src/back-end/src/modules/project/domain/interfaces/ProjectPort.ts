import { ProjectContract } from "@shared/contracts/ProjectContracts";

export interface ProjectPort {
  workExists(workId: string): Promise<boolean>;
  findProjectsByPortfolioId(portfolioId: string): Promise<ProjectContract[]>;
}
