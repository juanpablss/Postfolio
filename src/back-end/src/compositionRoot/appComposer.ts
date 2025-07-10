// src/compositionRoot/appComposer.ts

import { FastifyInstance } from "fastify";
import { Container } from "inversify";
import "reflect-metadata";

import { TYPES } from "@compositionRoot/Types";
import configureErrorHandling from "@infrastructure/fastify/ConfigureErrorHandling";

import { ICompetitionRepository } from "@competition/domain/entities/ICompetitionRepository";

import { ICompetitionService } from "@competition/service/ICompetitionService";

import { PrismaCompetitionRepository } from "@competition/repository/PrismaCompetitionRepository";

import { CompetitionService } from "@competition/service/CompetitionServiceImp";
// ... Outros Services

// Controladores
import { UserController } from "@user/inBound/UserController";
import { PortfolioController } from "@portfolio/inBound/PortfolioController";
import { WorkController } from "@work/inBound/WorkController";
import { CompetitionController } from "@competition/inBound/CompetitionController";
// ... Outros Controladores

// Rotas
import { UserRoute } from "@user/inBound/UserRoute";
import { PortfolioRoute } from "@portfolio/inBound/PortfolioRoute";
import { WorkRoute } from "@work/inBound/WorkRoute";
import { CompetitionRoute } from "@competition/inBound/CompetitionRoute";

// Handlers
import { PortfolioUserCreatedHandler } from "@portfolio/handler/PortfolioUserCreatedHandler";
import { userComposeModule } from "@user/composition/userComposer";
import { portfolioComposeModule } from "@portfolio/composition/portfolioComposer";
import { workComposeModule } from "@work/composition/WorkComposer";

// ... Outras funções de registro de rotas

const container = new Container();

userComposeModule(container);
portfolioComposeModule(container);
workComposeModule(container);

// --- 1. BIND dos Repositórios (Implementações de Portas de Domínio) ---
// Estes são os adaptadores de saída para a persistência

container
  .bind<ICompetitionRepository>(TYPES.ICompetitionRepository)
  .to(PrismaCompetitionRepository)
  .inSingletonScope();

// --- 2. BIND dos Adaptadores de Serviço (Portas de Saída entre Domínios) ---

// --- 3. BIND dos Services (Orquestradores de IService - Implementações de Portas de Aplicação) ---

container
  .bind<ICompetitionService>(TYPES.ICompetitionService)
  .to(CompetitionService)
  .inSingletonScope();

// --- 4. BIND dos Controladores ---
// Eles dependem das Portas de Aplicação (IUserUseCases, IPortfolioUseCases, etc.)

container
  .bind<CompetitionController>(TYPES.CompetitionController)
  .to(CompetitionController)
  .inRequestScope();

interface IApplicationControllers {
  userController: UserController;
  portfolioController: PortfolioController;
  workController: WorkController;
  competitionController: CompetitionController;
  // ... outros controladores
}

export class AppComposer {
  private controllers: IApplicationControllers;

  constructor() {
    this.controllers = this.composeControllers();
  }

  private composeControllers(): IApplicationControllers {
    // // Controladores (dependem dos Services/Use Cases de alto nível)
    const userController = container.get<UserController>(TYPES.UserController);
    const portfolioController = container.get<PortfolioController>(
      TYPES.PortfolioController
    );
    const workController = container.get<WorkController>(TYPES.WorkController);
    const competitionController = container.get<CompetitionController>(
      TYPES.CompetitionController
    );

    return {
      userController,
      portfolioController,
      workController,
      competitionController,
      // ... retorne outras instâncias de controlador
    };
  }

  // Método para registrar todas as rotas no Fastify
  public registerRoutes(app: FastifyInstance): void {
    UserRoute.register(app, this.controllers.userController);
    PortfolioRoute.register(app, this.controllers.portfolioController);
    WorkRoute.register(app, this.controllers.workController);
    CompetitionRoute.register(app, this.controllers.competitionController);
  }

  public registerHandlers(): void {
    const portfolioHandler = container.get(PortfolioUserCreatedHandler);
  }

  // Se você tiver configurações globais do Fastify, pode tê-las aqui
  public configureFastify(app: FastifyInstance): void {
    app.setErrorHandler(configureErrorHandling);
  }
}
