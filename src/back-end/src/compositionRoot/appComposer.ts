// src/compositionRoot/appComposer.ts

import { FastifyInstance } from "fastify";
import { Container } from "inversify";
import "reflect-metadata";

import { TYPES } from "@compositionRoot/Types";
import configureErrorHandling from "@infrastructure/fastify/ConfigureErrorHandling";

// --- Importações de Interfaces (Portas) ---
// Domínio

import { IPortfolioRepository } from "@portfolio/domain/entities/IPortfolioRepository";
import { IWorkRepository } from "@work/domain/entities/WorkRepository";
import { ICompetitionRepository } from "@competition/domain/entities/ICompetitionRepository";
// services

import { IPortfolioService } from "@portfolio/service/IPortfolioService";
import { IWorkService } from "@work/service/IWorkService";
import { ICompetitionService } from "@competition/service/ICompetitionService";

// Portas de Saída (entre domínios)

import { IPortfolioPort } from "@portfolio/api/IPortfolioPort";
import { IWorkPort } from "@work/api/IWorkPort";

// --- Importações de Implementações Concretas ---
// Repositórios

import { PrismaPortfolioRepository } from "@portfolio/repository/PrismaPortfolioRepository";
import { PrismaWorkRepository } from "@work/repository/PrismaWorkRepository";
import { PrismaCompetitionRepository } from "@competition/repository/PrismaCompetitionRepository";

// Adaptadores de Saída de Serviço (Portas de Saída)
import { PortfolioAdapter } from "@portfolio/api/PortfolioAdapter";

import { WorkAdapter } from "@work/api/WorkAdapter";
// ... Outros adaptadores de serviço (ex: para Email, Chat, se User precisar deles)

// Services

import { PortfolioService } from "@portfolio/service/PortfolioService";
import { WorkService } from "@work/service/WorkService";
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

// ... Outras funções de registro de rotas

const container = new Container();

userComposeModule(container);

// --- 1. BIND dos Repositórios (Implementações de Portas de Domínio) ---
// Estes são os adaptadores de saída para a persistência

container
  .bind<IPortfolioRepository>(TYPES.IPortfolioRepository)
  .to(PrismaPortfolioRepository)
  .inSingletonScope();
container
  .bind<IWorkRepository>(TYPES.IWorkRepository)
  .to(PrismaWorkRepository)
  .inSingletonScope();
container
  .bind<ICompetitionRepository>(TYPES.ICompetitionRepository)
  .to(PrismaCompetitionRepository)
  .inSingletonScope();

// --- 2. BIND dos Adaptadores de Serviço (Portas de Saída entre Domínios) ---
container
  .bind<IPortfolioPort>(TYPES.IPortfolioPort)
  .to(PortfolioAdapter)
  .inSingletonScope();

container.bind<IWorkPort>(TYPES.IWorkPort).to(WorkAdapter).inSingletonScope();

// --- 3. BIND dos Services (Orquestradores de IService - Implementações de Portas de Aplicação) ---

container
  .bind<IPortfolioService>(TYPES.IPortfolioService)
  .to(PortfolioService)
  .inSingletonScope();
container
  .bind<IWorkService>(TYPES.IWorkService)
  .to(WorkService)
  .inSingletonScope();
container
  .bind<ICompetitionService>(TYPES.ICompetitionService)
  .to(CompetitionService)
  .inSingletonScope();

// --- 4. BIND dos Controladores ---
// Eles dependem das Portas de Aplicação (IUserUseCases, IPortfolioUseCases, etc.)

container
  .bind<PortfolioController>(TYPES.PortfolioController)
  .to(PortfolioController)
  .inRequestScope();
container
  .bind<WorkController>(TYPES.WorkController)
  .to(WorkController)
  .inRequestScope();
container
  .bind<CompetitionController>(TYPES.CompetitionController)
  .to(CompetitionController)
  .inRequestScope();

// Handlers
container
  .bind<PortfolioUserCreatedHandler>(PortfolioUserCreatedHandler)
  .toSelf()
  .inSingletonScope();

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
