import { TYPES } from "@compositionRoot/Types";
import { IProjectCompDetailsRepository } from "@projectCompDetails/domain/interfaces/IProjectCompDetailsRepository";
import { ProjectCompDetailsPort } from "@projectCompDetails/domain/interfaces/ProjectCompDetailsPort";
import { ProjectCompDetailsContract } from "@shared/contracts/ProjectCompDetailsContract";
import { inject, injectable } from "inversify";

@injectable()
export class ProjectCompDetailsAdapter implements ProjectCompDetailsPort {
  constructor(
    @inject(TYPES.IProjectCompDetailsRepository)
    private repository: IProjectCompDetailsRepository
  ) {}

  create(data: ProjectCompDetailsContract): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  update(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  exist(competitionId: string, projectId: string): Promise<string | null> {
    throw new Error("Method not implemented.");
  }
}
