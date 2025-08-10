import { Project } from "@work/domain/entities/Project";
import { CreateWorkDTO, UpdateWorkDTO } from "@work/api/WorkDTO";

export interface IProjectService {
  create(createWorkDto: CreateWorkDTO): Promise<Project>;
  update(updateWorkDto: UpdateWorkDTO): Promise<Project>;
  delete(id: string): Promise<Project | null>;

  findMany(): Promise<Project[]>;
  findById(id: string): Promise<Project | null>;
}
