// src/compositionRoot/appComposer.ts

import { FastifyInstance } from "fastify";
import { Container } from "inversify";
import "reflect-metadata";

import { TYPES } from "@compositionRoot/Types";
import configureErrorHandling from "@infrastructure/fastify/ConfigureErrorHandling";

// Repositórios
import { PrismaUserRepository } from "@user/repository/PrismaUserRepository";
import { PrismaPortfolioRepository } from "@portfolio/repository/PrismaPortfolioRepository";

// Adaptadores de Saída de Serviço (Portas de Saída)
import { PortfolioAdapter } from "@user/Ports/PortfolioAdapter";
import { UserAdaper } from "@portfolio/ports/UserAdapter";
// ... Outros adaptadores de serviço (ex: para Email, Chat, se User precisar deles)

// Services (Orquestradores de Use Cases)
import { UserService } from "@user/service/UserService";
import { PortfolioService } from "@portfolio/service/PortfolioService";
// ... Outros Services

// Controladores
import { UserController } from "@user/inBound/UserController";
import { PortfolioController } from "@portfolio/inBound/PortfolioController";
// ... Outros Controladores

// Rotas
import { UserRoutes } from "@user/inBound/UserRoute";
import { PortfolioRoutes } from "@portfolio/inBound/PortfolioRoute";
// ... Outras funções de registro de rotas

const container = new Container();

container.bind(TYPES.IPortfolioPort).to(PortfolioAdapter).inSingletonScope();
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
    // // --- Composição das Dependências ---
    // // Nível mais baixo: Repositórios
    // const userRepository = new PrismaUserRepository();
    // const portfolioRepository = new PrismaPortfolioRepository();

    // const portfolioAdapter = new PortfolioAdapter();
    // const userAdapter = new UserAdaper();

    // // Service do Módulo Portfolio (implementa IPortfolioUseCases)
    // const userServiceInstance = new UserService(
    //   userRepository,
    //   portfolioAdapter
    // );
    // const portfolioServiceInstance = new PortfolioService(
    //   portfolioRepository,
    //   userAdapter
    // );
    // portfolioAdapter.setPortfolioService(portfolioServiceInstance);
    // userAdapter.setUserService(userServiceInstance);
    // // Adaptador de Saída do Módulo User para Portfolio

    // // Controladores (dependem dos Services/Use Cases de alto nível)
    // const userController = new UserController(userServiceInstance);
    // const portfolioController = new PortfolioController(
    //   portfolioServiceInstance
    // );

    return {
      userController,
      portfolioController,
      // ... retorne outras instâncias de controlador
    };
  }

  // Método para registrar todas as rotas no Fastify
  public registerRoutes(app: FastifyInstance): void {
    UserRoutes(app, this.controllers.userController);
    PortfolioRoutes(app, this.controllers.portfolioController);
  }

  // Se você tiver configurações globais do Fastify, pode tê-las aqui
  public configureFastify(app: FastifyInstance): void {
    app.setErrorHandler(configureErrorHandling);
  }
}
