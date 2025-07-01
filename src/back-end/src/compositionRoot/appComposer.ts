// src/compositionRoot/appComposer.ts

import { FastifyInstance } from "fastify";

// Repositórios
import { PrismaUserRepository } from "@user/infra/outBound/persistence/PrismaUserRepository";
import { PrismaPortfolioRepository } from "../domains/portfolio/infrastructure/adapters/outbound/persistence/PrismaPortfolioRepository";

// Adaptadores de Saída de Serviço (Portas de Saída)
import { PortfolioServiceAdapter } from "../domains/user/infrastructure/adapters/outbound/services/PortfolioServiceAdapter";
// ... Outros adaptadores de serviço (ex: para Email, Chat, se User precisar deles)

// Use Cases Granulares
import { CreateUserUseCase } from "../domains/user/application/useCases/CreateUserUseCase";
import { LoginUserUseCase } from "../domains/user/application/useCases/LoginUserUseCase";
// ... Outros Use Cases de User
import { CreatePortfolioUseCase } from "../domains/portfolio/application/useCases/CreatePortfolioUseCase";
import { AddWorkToPortfolioUseCase } from "../domains/portfolio/application/useCases/AddWorkToPortfolioUseCase";
// ... Outros Use Cases de Portfolio
// ... Use Cases de Competition, Work, WorkCompDetails, Rating

// Services (Orquestradores de Use Cases)
import { UserService } from "../domains/user/application/useCases/UserService";
import { PortfolioService } from "../domains/portfolio/application/useCases/PortfolioService";
// ... Outros Services

// Controladores
import { UserController } from "../domains/user/infrastructure/adapters/inbound/controllers/UserController";
import { PortfolioController } from "../domains/portfolio/infrastructure/adapters/inbound/controllers/PortfolioController";
// ... Outros Controladores

// Rotas
import { registerUserRoutes } from "../domains/user/infrastructure/adapters/inbound/routes/UserRoutes";
import { registerPortfolioRoutes } from "../domains/portfolio/infrastructure/adapters/inbound/routes/PortfolioRoutes";
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
    // ... instancie outros repositórios aqui (competitionRepository, workRepository, etc.)

    // Use Cases Granulares do Módulo Portfolio
    const createPortfolioUseCase = new CreatePortfolioUseCase(
      portfolioRepository
    );
    const addWorkToPortfolioUseCase = new AddWorkToPortfolioUseCase(
      portfolioRepository
    ); // Exemplo de Work
    // ... instancie outros use cases de Portfolio aqui

    // Service do Módulo Portfolio (implementa IPortfolioUseCases)
    const portfolioUseCasesInstance = new PortfolioService(
      createPortfolioUseCase,
      addWorkToPortfolioUseCase
    );

    // Adaptador de Saída do Módulo User para Portfolio
    const portfolioServiceForUserModule = new PortfolioServiceAdapter(
      portfolioUseCasesInstance
    );

    // Use Cases Granulares do Módulo User
    const createUserUseCase = new CreateUserUseCase(
      userRepository,
      portfolioServiceForUserModule
    );
    const loginUserUseCase = new LoginUserUseCase(userRepository);
    // ... instancie outros use cases de User aqui

    // Service do Módulo User (implementa IUserUseCases)
    const userUseCasesInstance = new UserService(
      createUserUseCase,
      loginUserUseCase
    );

    // Controladores (dependem dos Services/Use Cases de alto nível)
    const userController = new UserController(userUseCasesInstance);
    const portfolioController = new PortfolioController(
      portfolioUseCasesInstance
    );
    // ... instancie outros controladores aqui

    return {
      userController,
      portfolioController,
      // ... retorne outras instâncias de controlador
    };
  }

  // Método para registrar todas as rotas no Fastify
  public registerRoutes(app: FastifyInstance): void {
    registerUserRoutes(app, this.controllers.userController);
    registerPortfolioRoutes(app, this.controllers.portfolioController);
    // ... registre outras rotas aqui
  }

  // Se você tiver configurações globais do Fastify, pode tê-las aqui
  public configureFastify(app: FastifyInstance): void {
    // Exemplo: configureErrorHandling(app);
    // Exemplo: configurePlugins(app);
  }
}
