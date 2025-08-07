import { TYPES } from "@compositionRoot/Types";
import { Container } from "inversify";

import { IWorkRepository } from "@work/domain/entities/IWorkRepository";
import { IWorkService } from "@work/service/IWorkService";
import { IWorkPort } from "@work/api/IWorkPort";

import { PrismaWorkRepository } from "@work/repository/PrismaWorkRepository";
import { WorkService } from "@work/service/WorkService";
import { WorkAdapter } from "@work/api/WorkAdapter";
import { WorkController } from "@work/inBound/WorkController";

export function workComposeModule(container: Container): void {
  container
    .bind<IWorkRepository>(TYPES.IWorkRepository)
    .to(PrismaWorkRepository)
    .inSingletonScope();
  container
    .bind<IWorkService>(TYPES.IWorkService)
    .to(WorkService)
    .inSingletonScope();
  container.bind<IWorkPort>(TYPES.IWorkPort).to(WorkAdapter).inSingletonScope();
  container
    .bind<WorkController>(TYPES.WorkController)
    .to(WorkController)
    .inRequestScope();
}
