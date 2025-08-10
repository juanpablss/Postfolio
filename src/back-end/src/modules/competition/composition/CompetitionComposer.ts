import { TYPES } from "@compositionRoot/Types";
import { Container } from "inversify";

import { ICompetitionRepository } from "@competition/domain/interfaces/ICompetitionRepository";
import { ICompetitionService } from "@competition/domain/interfaces/ICompetitionService";
import { CompetitionController } from "@competition/api/CompetitionController";

import { PrismaCompetitionRepository } from "@competition/infra/database/CompetitionRepository";
import { CompetitionService } from "@competition/application/CompetitionService";

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
