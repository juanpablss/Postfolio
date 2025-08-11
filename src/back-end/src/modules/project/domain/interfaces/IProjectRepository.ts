import { ProjectContract } from "@shared/contracts/ProjectContracts";
import { Project } from "@project/domain/entities/Project";

export interface IProjectRepository {
  create(work: Project): Promise<Project>;
  update(work: Project): Promise<Project>;
  delete(id: string): Promise<Project | null>;

  findMany(): Promise<Project[]>;
  findById(id: string): Promise<Project | null>;
  findByPortfolio(portfolioId: string): Promise<ProjectContract[]>;
}
