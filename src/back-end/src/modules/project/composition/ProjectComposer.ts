import { TYPES } from "@compositionRoot/Types";
import { WorkController } from "@project/api/ProjectController";
import { ProjectService } from "@project/application/ProjectService";
import { IProjectRepository } from "@project/domain/interfaces/IProjectRepository";
import { IProjectService } from "@project/domain/interfaces/IProjectService";
import { ProjectPort } from "@project/domain/interfaces/ProjectPort";
import { ProjectRepository } from "@project/infra/database/ProjectRepository";
import { ProjectAdapter } from "@project/infra/ProjectAdapter";
import { Container } from "inversify";

// import { IProjectRepository } from "@work/domain/interfaces/IProjectRepository";
// import { IProjectService } from "@work/domain/interfaces/IProjectService";
// import { ProjectPort } from "@work/domain/interfaces/ProjectPort";

// import { ProjectRepository } from "@work/infra/database/ProjectRepository";
// import { ProjectService } from "@work/application/ProjectService";
// import { WorkAdapter } from "@work/infra/ProjectAdapter";
// import { WorkController } from "@work/api/WorkController";

export function projectComposeModule(container: Container): void {
  container
    .bind<IProjectRepository>(TYPES.IProjectRepository)
    .to(ProjectRepository)
    .inRequestScope();
  container
    .bind<IProjectService>(TYPES.IProjectService)
    .to(ProjectService)
    .inRequestScope();
  container
    .bind<ProjectPort>(TYPES.ProjectPort)
    .to(ProjectAdapter)
    .inRequestScope();
  container
    .bind<WorkController>(TYPES.ProjectController)
    .to(WorkController)
    .inRequestScope();
}
