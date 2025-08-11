import { ProjectCompDetails } from "@projectCompDetails/domain/entitite/ProjectCompDetails";
import { IProjectCompDetailsRepository } from "@projectCompDetails/domain/interfaces/IProjectCompDetailsRepository";

export class ProjectCompDetailsRepository
  implements IProjectCompDetailsRepository
{
  create(projectCompDetails: ProjectCompDetails): Promise<ProjectCompDetails> {
    throw new Error("Method not implemented.");
  }

  update(projectCompDetails: ProjectCompDetails): Promise<ProjectCompDetails> {
    throw new Error("Method not implemented.");
  }

  delete(id: string): Promise<ProjectCompDetails> {
    throw new Error("Method not implemented.");
  }

  findById(id: string): Promise<ProjectCompDetails | null> {
    throw new Error("Method not implemented.");
  }
}
