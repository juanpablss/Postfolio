import { TYPES } from "@compositionRoot/Types";
import { Container } from "inversify";

import { IPortfolioRepository } from "@portfolio/domain/entities/IPortfolioRepository";
import { IPortfolioService } from "@portfolio/service/IPortfolioService";
import { IPortfolioPort } from "@portfolio/api/IPortfolioPort";

import { PrismaPortfolioRepository } from "@portfolio/repository/PrismaPortfolioRepository";
import { PortfolioService } from "@portfolio/service/PortfolioService";
import { PortfolioAdapter } from "@portfolio/api/PortfolioAdapter";
import { PortfolioController } from "@portfolio/inBound/PortfolioController";
import { PortfolioUserCreatedHandler } from "@portfolio/handler/PortfolioUserCreatedHandler";

export function portfolioComposeModule(container: Container): void {
  container
    .bind<IPortfolioRepository>(TYPES.IPortfolioRepository)
    .to(PrismaPortfolioRepository)
    .inSingletonScope();
  container
    .bind<IPortfolioService>(TYPES.IPortfolioService)
    .to(PortfolioService)
    .inSingletonScope();
  container
    .bind<IPortfolioPort>(TYPES.IPortfolioPort)
    .to(PortfolioAdapter)
    .inSingletonScope();
  container
    .bind<PortfolioController>(TYPES.PortfolioController)
    .to(PortfolioController)
    .inRequestScope();

  // Handlers
  container
    .bind<PortfolioUserCreatedHandler>(PortfolioUserCreatedHandler)
    .toSelf()
    .inSingletonScope();
}
