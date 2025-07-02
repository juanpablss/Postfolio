// src/compositionRoot/appComposer.ts

import { FastifyInstance } from "fastify";
import { Container } from "inversify";
import "reflect-metadata";

import { TYPES } from "@compositionRoot/Types";
import configureErrorHandling from "@infrastructure/fastify/ConfigureErrorHandling";

// --- Importações de Interfaces (Portas) ---
// Domínio
import { IUserRepository } from "@user/domain/entities/IUserRepository";
import { IPortfolioRepository } from "@portfolio/domain/entities/IPortfolioRepository";

// services
import { IUserService } from "@user/service/IUserService";
import { IPortfolioService } from "@portfolio/service/IPortfolioService";

// Portas de Saída (entre domínios)
import { IUserPort } from "@portfolio/ports/IUserPort";
// import { IPortfolioPort } from "@user/ports/IPortfolioPort";

// --- Importações de Implementações Concretas ---
// Repositórios
import { PrismaUserRepository } from "@user/repository/PrismaUserRepository";
import { PrismaPortfolioRepository } from "@portfolio/repository/PrismaPortfolioRepository";

// Adaptadores de Saída de Serviço (Portas de Saída)
// import { PortfolioAdapter } from "@user/ports/PortfolioAdapter";
import { UserAdaper } from "@portfolio/ports/UserAdapter";
// ... Outros adaptadores de serviço (ex: para Email, Chat, se User precisar deles)

// Services
import { UserService } from "@user/service/UserService";
import { PortfolioService } from "@portfolio/service/PortfolioService";
// ... Outros Services

// Controladores
import { UserController } from "@user/inBound/UserController";
import { PortfolioController } from "@portfolio/inBound/PortfolioController";
// ... Outros Controladores

// Rotas
import { UserRoute } from "@user/inBound/UserRoute";
import { PortfolioRoute } from "@portfolio/inBound/PortfolioRoute";
import { PortfolioUserCreatedHandler } from "@portfolio/handler/PortfolioUserCreatedHandler";

// ... Outras funções de registro de rotas

const container = new Container();

// --- 1. BIND dos Repositórios (Implementações de Portas de Domínio) ---
// Estes são os adaptadores de saída para a persistência
container
  .bind<IUserRepository>(TYPES.IUserRepository)
  .to(PrismaUserRepository)
  .inSingletonScope();
container
  .bind<IPortfolioRepository>(TYPES.IPortfolioRepository)
  .to(PrismaPortfolioRepository)
  .inSingletonScope();

// --- 2. BIND dos Adaptadores de Serviço (Portas de Saída entre Domínios) ---
// container
//   .bind<IPortfolioPort>(TYPES.IPortfolioPort)
//   .to(PortfolioAdapter)
//   .inSingletonScope();
container.bind<IUserPort>(TYPES.IUserPort).to(UserAdaper).inSingletonScope();

// --- 3. BIND dos Services (Orquestradores de IService - Implementações de Portas de Aplicação) ---
container
  .bind<IUserService>(TYPES.IUserService)
  .to(UserService)
  .inSingletonScope();
container
  .bind<IPortfolioService>(TYPES.IPortfolioService)
  .to(PortfolioService)
  .inSingletonScope();

// --- 4. BIND dos Controladores ---
// Eles dependem das Portas de Aplicação (IUserUseCases, IPortfolioUseCases, etc.)
container
  .bind<UserController>(TYPES.UserController)
  .to(UserController)
  .inRequestScope(); // Ou inSingletonScope
container
  .bind<PortfolioController>(TYPES.PortfolioController)
  .to(PortfolioController)
  .inRequestScope();

// Handlers
container
  .bind<PortfolioUserCreatedHandler>(PortfolioUserCreatedHandler)
  .toSelf()
  .inSingletonScope();

interface IApplicationControllers {
  userController: UserController;
  portfolioController: PortfolioController;
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

    return {
      userController,
      portfolioController,
      // ... retorne outras instâncias de controlador
    };
  }

  // Método para registrar todas as rotas no Fastify
  public registerRoutes(app: FastifyInstance): void {
    UserRoute.register(app, this.controllers.userController);
    PortfolioRoute.register(app, this.controllers.portfolioController);
  }

  public registerHandlers(): void {
    const portfolioHandler = container.get(PortfolioUserCreatedHandler);
  }

  // Se você tiver configurações globais do Fastify, pode tê-las aqui
  public configureFastify(app: FastifyInstance): void {
    app.setErrorHandler(configureErrorHandling);
  }
}
