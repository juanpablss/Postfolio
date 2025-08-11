import { ProjectCompDetailsContract } from "@shared/contracts/ProjectCompDetailsContract";

export interface ProjectCompDetailsPort {
  create(data: ProjectCompDetailsContract): Promise<boolean>;
  update(id: string): Promise<void>;
  delete(id: string): Promise<void>;

  exist(competitionId: string, projectId: string): Promise<string | null>;
}
