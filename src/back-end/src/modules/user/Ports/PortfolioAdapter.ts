// import { TYPES } from "@compositionRoot/Types";
// import { IPortfolioService } from "@portfolio/service/IPortfolioService";
// import { IPortfolioPort } from "@user/ports/IPortfolioPort";
// import { inject, injectable } from "inversify";

// @injectable()
// export class PortfolioAdapter implements IPortfolioPort {
//   constructor(
//     @inject(TYPES.IPortfolioService)
//     private portfolioService: IPortfolioService
//   ) {}

//   async createDefaultPortfolioForUser(userId: string): Promise<void> {
//     throw new Error("Method not implemented.");
//   }

//   // setPortfolioService(portfolioService: IPortfolioService) {
//   //   this.portfolioService = portfolioService;
//   // }
// }

// domains/user/infrastructure/adapters/outbound/services/PortfolioServiceAdapter.ts

// import { IPortfolioUseCases } from '../../../../portfolio/application/ports/IPortfolioUseCases'; // Porta de entrada REAL do Portfolio
// import { IPortfolioService } from '../ports/IPortfolioService'; // Porta de saída que o User espera
// import { CreatePortfolioDto } from '../../../../portfolio/application/dtos/CreatePortfolioDto';

// export class PortfolioServiceAdapter implements IPortfolioService {
//     constructor(private portfolioUseCases: IPortfolioUseCases) {} // <--- Injeta a interface real do Portfolio!

//     async createDefaultPortfolioForUser(userId: string): Promise<void> {
//         const createDto: CreatePortfolioDto = {
//             authorId: userId,
//             name: `Portfolio de ${userId}`, // Nome padrão ou buscar do usuário
//             description: "Este é o seu portfólio padrão.",
//             pageLink: null,
//         };
//         await this.portfolioUseCases.register(createDto); // Chama o método real do módulo Portfolio
//     }
// }
