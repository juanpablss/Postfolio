import { TYPES } from "@compositionRoot/Types";
import { Container } from "inversify";

import { IWorkRepository } from "@work/domain/interfaces/IWorkRepository";
import { IWorkService } from "@work/domain/interfaces/IWorkService";
import { IWorkPort } from "@work/api/IWorkPort";

import { PrismaWorkRepository } from "@work/infra/database/PrismaWorkRepository";
import { WorkService } from "@work/service/WorkService";
import { WorkAdapter } from "@work/api/WorkAdapter";
import { WorkController } from "@work/inBound/WorkController";

export function workComposeModule(container: Container): void {
  container
    .bind<IWorkRepository>(TYPES.IWorkRepository)
    .to(PrismaWorkRepository)
    .inRequestScope();
  container
    .bind<IWorkService>(TYPES.IWorkService)
    .to(WorkService)
    .inRequestScope();
  container.bind<IWorkPort>(TYPES.IWorkPort).to(WorkAdapter).inRequestScope();
  container
    .bind<WorkController>(TYPES.WorkController)
    .to(WorkController)
    .inRequestScope();
}
