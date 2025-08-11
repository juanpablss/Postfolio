import { TYPES } from "@compositionRoot/Types";
import { IProjectCompDetailsRepository } from "@projectCompDetails/domain/interfaces/IProjectCompDetailsRepository";
import { ProjectCompDetailsPort } from "@projectCompDetails/domain/interfaces/ProjectCompDetailsPort";
import { ProjectCompDetailsRepository } from "@projectCompDetails/infra/database/ProjectCompDetailsRepository";
import { ProjectCompDetailsAdapter } from "@projectCompDetails/infra/ProjectCompDetailsAdapter";
import { Container } from "inversify";

export function projectCompDetailsComposeModule(container: Container) {
  container
    .bind<IProjectCompDetailsRepository>(TYPES.IProjectCompDetailsRepository)
    .to(ProjectCompDetailsRepository)
    .inRequestScope();
  container
    .bind<ProjectCompDetailsPort>(TYPES.ProjectCompDetailsPort)
    .to(ProjectCompDetailsAdapter)
    .inRequestScope();
}
