import { ProjectContract } from "@shared/contracts/ProjectContracts";

export interface ProjectPort {
  exist(projectId: string): Promise<string | null>;
  findProjectsByPortfolioId(portfolioId: string): Promise<ProjectContract[]>;
}
