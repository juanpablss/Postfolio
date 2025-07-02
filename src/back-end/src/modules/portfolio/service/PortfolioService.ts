import { IPortfolioRepository } from "@portfolio/domain/entities/IPortfolioRepository";
import {
  CreatePortfolioDTO,
  UpdatePortfolioDTO,
} from "@portfolio/dtos/PortfolioDTO";
import { PortfolioMapper } from "@portfolio/util/PortfolioMapper";
import { BadRequest } from "@shared/error/HttpError";
import Portfolio from "@portfolio/domain/entities/Portfolio";
import { IUserPort } from "@portfolio/ports/IUserPort";
import { IPortfolioService } from "@portfolio/service/IPortfolioService";
import { inject, injectable } from "inversify";
import { TYPES } from "@compositionRoot/Types";
import { eventBus, EventTypes } from "@shared/event/EventBus";

@injectable()
export class PortfolioService implements IPortfolioService {
  constructor(
    @inject(TYPES.IPortfolioRepository)
    private portfolioRepository: IPortfolioRepository,
    @inject(TYPES.IUserPort)
    private userPort: IUserPort // private readonly workRepository: WorkRepository
  ) {
    this.subscribeToEvents();
  }

  async register(createPortfolioDto: CreatePortfolioDTO): Promise<Portfolio> {
    const exist = await this.userPort.exist(createPortfolioDto.authorId);

    if (!exist) throw new BadRequest("Author não registrado!");

    const portfoioDomain =
      PortfolioMapper.fromCreatePortfolioDTOtoDomain(createPortfolioDto);

    return await this.portfolioRepository.insert(portfoioDomain);
  }

  async findMany(): Promise<Portfolio[]> {
    const portfolios = await this.portfolioRepository.findMany();
    return portfolios;
  }

  async findById(id: string): Promise<Portfolio | null> {
    return await this.portfolioRepository.findById(id);
  }

  async findByAuthor(authorId: string): Promise<Portfolio | null> {
    return await this.portfolioRepository.findByAuthor(authorId);
  }

  async update(updatePortfolioDto: UpdatePortfolioDTO): Promise<Portfolio> {
    const exist = await this.userPort.exist(updatePortfolioDto.authorId);

    if (!exist) throw new BadRequest("Author não registrado!");

    const portfolioDomain =
      PortfolioMapper.fromUpdatePortfolioDTOtoDomain(updatePortfolioDto);
    return await this.portfolioRepository.update(portfolioDomain);
  }

  private subscribeToEvents(): void {
    eventBus.on(EventTypes.CreateUserEvent, async (data) => {
      console.log(`User created event received for user ID: ${data.userId}`);
      console.log(
        `Creating default portfolio for user: ${data.name} (${data.userId})`
      );

      await this.registerDefaultPortfolio({
        userId: data.userId,
        name: data.name, // Assuming 'name' is part of your CreateUserEvent payload
      });
      console.log(`Default portfolio registered for user: ${data.userId}`);
    });
  }

  private async registerDefaultPortfolio(data: {
    userId: string;
    name: string;
  }) {
    await this.register({
      name: data.name,
      pagelink: null,
      description: "not included",
      authorId: data.userId,
    });
  }

  // async getWorks(portfolioId: string): Promise<Work[]> {
  //   const existPortfolio = await this.portfolioRepository.findById(portfolioId);
  //   if (!existPortfolio) throw new NotFound("O portfolil não existe");

  //   return await this.workRepository.findByPortfolio(portfolioId);
  // }

  async deleteById(id: string): Promise<Portfolio | null> {
    const portfolio = await this.portfolioRepository.deleteById(id);
    return portfolio;
  }
}
