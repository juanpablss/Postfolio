import { FastifyInstance } from "fastify";
import { Container } from "inversify";
import "reflect-metadata";

import { TYPES } from "@compositionRoot/Types";
import configureErrorHandling from "@infrastructure/fastify/ConfigureErrorHandling";

// Controladores
import { UserController } from "@user/api/UserController";
import { PortfolioController } from "@portfolio/api/PortfolioController";
import { WorkController } from "@work/api/WorkController";
import { CompetitionController } from "@competition/inBound/CompetitionController";
import { ChatController } from "@chat/inBound/ChatController";
import { EmailController } from "@email/api/EmailController";

// Rotas
import { UserRoute } from "@user/api/UserRoute";
import { PortfolioRoute } from "@portfolio/api/PortfolioRoute";
import { WorkRoute } from "@work/api/WorkRoute";
import { CompetitionRoute } from "@competition/inBound/CompetitionRoute";
import { ChatRoute } from "@chat/inBound/ChatRoute";
import { EmailRoute } from "@email/api/EmailRoute";

// Handlers
import { PortfolioUserCreatedHandler } from "@portfolio/handler/PortfolioUserCreatedHandler";

// Composition
import { userComposeModule } from "@user/composition/UserComposer";
import { portfolioComposeModule } from "@portfolio/composition/PortfolioComposer";
import { workComposeModule } from "@work/composition/WorkComposer";
import { competitionComposeModule } from "@competition/composition/CompetitionComposer";
import { chatComposerModule } from "@chat/composition/ChatComposer";
import { emailComposerModuler } from "@email/composition/EmailComposer";
import { EmailUserCreatedHandler } from "@email/handler/EmailUserCreatedHandler";

const container = new Container();

userComposeModule(container);
portfolioComposeModule(container);
workComposeModule(container);
competitionComposeModule(container);
chatComposerModule(container);
emailComposerModuler(container);

interface IApplicationControllers {
  userController: UserController;
  portfolioController: PortfolioController;
  workController: WorkController;
  competitionController: CompetitionController;
  chatController: ChatController;
  emailController: EmailController;
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
    const chatController = container.get<ChatController>(TYPES.ChatController);
    const emailController = container.get<EmailController>(
      TYPES.EmailController
    );

    return {
      userController,
      portfolioController,
      workController,
      competitionController,
      chatController,
      emailController,
      // ... retorne outras instâncias de controlador
    };
  }

  // Método para registrar todas as rotas no Fastify
  public registerRoutes(app: FastifyInstance): void {
    UserRoute.register(app, this.controllers.userController);
    PortfolioRoute.register(app, this.controllers.portfolioController);
    WorkRoute.register(app, this.controllers.workController);
    CompetitionRoute.register(app, this.controllers.competitionController);
    ChatRoute.register(app, this.controllers.chatController);
    EmailRoute.register(app, this.controllers.emailController);
  }

  public registerHandlers(): void {
    const portfolioHandler = container.get(PortfolioUserCreatedHandler);
    const emailHandler = container.get(EmailUserCreatedHandler);
  }

  // Se você tiver configurações globais do Fastify, pode tê-las aqui
  public configureFastify(app: FastifyInstance): void {
    app.setErrorHandler(configureErrorHandling);
  }
}
