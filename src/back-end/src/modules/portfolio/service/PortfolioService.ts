import IPortfolioRepository from "@portfolio/repository/IPortfolioRepository";
import {
  CreatePortfolioDTO,
  UpdatePortfolioDTO,
} from "@portfolio/dtos/PortfolioDTO";
import { PortfolioMapper } from "@portfolio/util/PortfolioMapper";
import { BadRequest } from "@shared/error/HttpError";
import Portfolio from "@portfolio/domain/entities/Portfolio";
import { IUserPort } from "@portfolio/ports/IUserPort";
import { IPortfolioService } from "@portfolio/aplication/useCases/IPortfolioService";

export class PortfolioService implements IPortfolioService {
  constructor(
    private readonly portfolioRepository: IPortfolioRepository,
    private readonly userPort: IUserPort // private readonly workRepository: WorkRepository
  ) {}

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
