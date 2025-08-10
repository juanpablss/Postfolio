import { ProjectContract } from "@shared/contracts/ProjectContracts";

export interface ProjectPort {
  exist(workId: string): Promise<boolean>;
  findProjectsByPortfolioId(portfolioId: string): Promise<ProjectContract[]>;
}
