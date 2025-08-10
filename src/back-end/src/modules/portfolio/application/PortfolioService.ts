import { IPortfolioRepository } from "@portfolio/domain/interfaces/IPortfolioRepository";
import {
  CreatePortfolioDTO,
  UpdatePortfolioDTO,
} from "@portfolio/api/PortfolioDTO";
import { PortfolioMapper } from "@portfolio/application/PortfolioMapper";
import { BadRequest } from "@shared/error/HttpError";
import { Portfolio } from "@portfolio/domain/entities/Portfolio";
import { UserPort } from "@user/domain/interfaces/UserPort";
import { IPortfolioService } from "@portfolio/domain/interfaces/IPortfolioService";
import { inject, injectable } from "inversify";
import { TYPES } from "@compositionRoot/Types";
import { ProjectPort } from "@work/domain/interfaces/ProjectPort";
import { ProjectContract } from "@shared/contracts/ProjectContracts";

@injectable()
export class PortfolioService implements IPortfolioService {
  constructor(
    @inject(TYPES.IPortfolioRepository)
    private portfolioRepository: IPortfolioRepository,
    @inject(TYPES.UserPort)
    private userPort: UserPort,
    @inject(TYPES.ProjectPort)
    private workPort: ProjectPort
  ) {}

  async create(createPortfolioDto: CreatePortfolioDTO): Promise<Portfolio> {
    const exist = await this.userPort.exist(createPortfolioDto.authorId);

    if (!exist) throw new BadRequest("Author não registrado!");

    const portfoioDomain =
      PortfolioMapper.fromCreatePortfolioDTOtoDomain(createPortfolioDto);

    return await this.portfolioRepository.create(portfoioDomain);
  }

  async findMany(): Promise<Portfolio[]> {
    const portfolios = await this.portfolioRepository.findMany();
    return portfolios;
  }

  async findById(id: string): Promise<Portfolio | null> {
    return await this.portfolioRepository.findById(id);
  }

  async findWorks(id: string): Promise<ProjectContract[]> {
    return await this.workPort.findWorkByPortfolio(id);
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
