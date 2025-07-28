// src/compositionRoot/types.ts

export const TYPES = {
  // Repositórios
  IUserRepository: Symbol.for("IUserRepository"),
  IPortfolioRepository: Symbol.for("IPortfolioRepository"),
  IRatingRepository: Symbol.for("IRatingRepository"),
  ICompetitionRepository: Symbol.for("ICompetitionRepository"),
  IWorkRepository: Symbol.for("IWorkRepository"),
  IWorkCompDetailsRepository: Symbol.for("IWorkCompDetailsRepository"),
  IMessageRepository: Symbol.for("IMessageRepository"),

  // Portas de Aplicação (Use Cases de alto nível)
  IUserService: Symbol.for("IUserService"),
  IPortfolioService: Symbol.for("IPortfolioService"),
  IRatingService: Symbol.for("IRatingService"),
  ICompetitionService: Symbol.for("ICompetitionService"),
  IWorkService: Symbol.for("IWorkService"),
  IWorkCompDetailsService: Symbol.for("IWorkCompDetailsService"),
  IMessageService: Symbol.for("IMessageService"),
  IUsersConnects: Symbol.for("IUsersConnects"),

  // Portas de Saída (Adapters entre Domínios)
  IPortfolioPort: Symbol.for("IPortfolioPort"), // User Module precisa interagir com Portfolio
  IUserPort: Symbol.for("IUserPort"), // Portfolio/Rating Module precisa interagir com User
  IWorkPort: Symbol.for("IWorkPort"), // WorkCompDetails Module precisa interagir com Work
  ICompetitionPort: Symbol.for("ICompetitionPort"), // WorkCompDetails Module precisa interagir com Competition
  IWorkCompDetailsPort: Symbol.for("IWorkCompDetailsPort"), // Rating Module precisa interagir com WorkCompDetails

  // Services (implementações concretas dos Use Cases de alto nível)
  UserService: Symbol.for("UserService"),
  PortfolioService: Symbol.for("PortfolioService"),
  RatingService: Symbol.for("RatingService"),
  CompetitionService: Symbol.for("CompetitionService"),
  WorkService: Symbol.for("WorkService"),
  WorkCompDetailsService: Symbol.for("WorkCompDetailsService"),

  // Controladores
  UserController: Symbol.for("UserController"),
  PortfolioController: Symbol.for("PortfolioController"),
  RatingController: Symbol.for("RatingController"),
  CompetitionController: Symbol.for("CompetitionController"),
  WorkController: Symbol.for("WorkController"),
  WorkCompDetailsController: Symbol.for("WorkCompDetailsController"),
  ChatController: Symbol.for("ChatController"),

  // Handlers
  // PortfolioUserCreatedHandler: Symbol.for("PortfolioUserCreatedHandler"),

  // Utilitários (se precisar injetar, embora muitos sejam estáticos)
  // PrismaClient: Symbol.for("PrismaClient"), // Se você quiser injetar a instância do Prisma
};
