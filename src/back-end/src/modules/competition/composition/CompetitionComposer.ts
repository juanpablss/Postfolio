import { TYPES } from "@compositionRoot/Types";
import { Container } from "inversify";

import { ICompetitionRepository } from "@competition/domain/entities/ICompetitionRepository";
import { ICompetitionService } from "@competition/service/ICompetitionService";
import { CompetitionController } from "@competition/inBound/CompetitionController";

import { PrismaCompetitionRepository } from "@competition/repository/PrismaCompetitionRepository";
import { CompetitionService } from "@competition/service/CompetitionServiceImp";

export function competitionComposeModule(container: Container): void {
  container
    .bind<ICompetitionRepository>(TYPES.ICompetitionRepository)
    .to(PrismaCompetitionRepository)
    .inRequestScope();
  container
    .bind<ICompetitionService>(TYPES.ICompetitionService)
    .to(CompetitionService)
    .inRequestScope();
  container
    .bind<CompetitionController>(TYPES.CompetitionController)
    .to(CompetitionController)
    .inRequestScope();
}
