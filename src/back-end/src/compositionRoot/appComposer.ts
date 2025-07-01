// src/compositionRoot/appComposer.ts

import { FastifyInstance } from "fastify";

// Repositórios
import { PrismaUserRepository } from "@user/infra/outBound/persistence/PrismaUserRepository";
import { PrismaPortfolioRepository } from "@portfolio/infra/outBound/persistence/PrismaPortfolioRepository";

// Adaptadores de Saída de Serviço (Portas de Saída)
import { PortfolioAdapter } from "@user/infra/outBound/adapter/PortfolioAdapter";
import { UserAdaper } from "@portfolio/infra/outBound/adapater/UserAdapter";
// ... Outros adaptadores de serviço (ex: para Email, Chat, se User precisar deles)

// Services (Orquestradores de Use Cases)
import { UserService } from "@user/aplication/useCases/UserService";
import { PortfolioService } from "@portfolio/aplication/useCases/PortfolioService";
// ... Outros Services

// Controladores
import { UserController } from "@user/infra/inBound/controller/UserController";
import { PortfolioController } from "@portfolio/infra/inBound/controller/PortfolioController";
// ... Outros Controladores

// Rotas
import { UserRoutes } from "@user/infra/inBound/route/UserRoute";
import { PortfolioRoutes } from "@portfolio/infra/inBound/route/PortfolioRoute";
import configureErrorHandling from "@infrastructure/fastify/ConfigureErrorHandling";
// ... Outras funções de registro de rotas

// Interfaces dos Controladores (opcional, para tipagem mais clara)
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
    // --- Composição das Dependências ---
    // Nível mais baixo: Repositórios
    const userRepository = new PrismaUserRepository();
    const portfolioRepository = new PrismaPortfolioRepository();

    const portfolioAdapter = new PortfolioAdapter();
    const userAdapter = new UserAdaper();

    // Service do Módulo Portfolio (implementa IPortfolioUseCases)
    const userServiceInstance = new UserService(
      userRepository,
      portfolioAdapter
    );
    const portfolioServiceInstance = new PortfolioService(
      portfolioRepository,
      userAdapter
    );
    portfolioAdapter.setPortfolioService(portfolioServiceInstance);
    userAdapter.setUserService(userServiceInstance);
    // Adaptador de Saída do Módulo User para Portfolio

    // Controladores (dependem dos Services/Use Cases de alto nível)
    const userController = new UserController(userServiceInstance);
    const portfolioController = new PortfolioController(
      portfolioServiceInstance
    );

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
