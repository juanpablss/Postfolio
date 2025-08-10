import { TYPES } from "@compositionRoot/Types";
import { Container } from "inversify";

import { IWorkRepository } from "@work/domain/interfaces/IWorkRepository";
import { IWorkService } from "@work/domain/interfaces/IWorkService";
import { ProjectPort } from "@work/domain/interfaces/WorkPort";

import { PrismaWorkRepository } from "@work/infra/database/WorkRepository";
import { WorkService } from "@work/application/WorkService";
import { WorkAdapter } from "@work/infra/WorkAdapter";
import { WorkController } from "@work/api/WorkController";

export function workComposeModule(container: Container): void {
  container
    .bind<IWorkRepository>(TYPES.IWorkRepository)
    .to(PrismaWorkRepository)
    .inRequestScope();
  container
    .bind<IWorkService>(TYPES.IWorkService)
    .to(WorkService)
    .inRequestScope();
  container
    .bind<ProjectPort>(TYPES.ProjectPort)
    .to(WorkAdapter)
    .inRequestScope();
  container
    .bind<WorkController>(TYPES.WorkController)
    .to(WorkController)
    .inRequestScope();
}
