import PortfolioUseCases from "@application/useCases/PortfolioUseCases";
import portfolioRepositoryImp from "@repository/portfolioRep/PortfolioRepositoryImp";
import Portfolio from "@domain/entities/portfolio/Portfolio";
import { BadRequest, NotFound } from "@domain/error/HttpError";
import PortfolioRepository from "@domain/entities/portfolio/PortfolioRepository";
import Work from "@domain/entities/work/Work";
import { UserRepository } from "@domain/entities/user/UserRepository";
import userRepositoryImp from "@repository/userRep/UserRepositoryImp";
import workRepositoryImp from "@repository/workRep/WorkRepositoryImp";
import WorkRepository from "@domain/entities/work/WorkRepository";
import { CreatePortfolioDTO, UpdatePortfolioDTO } from "@dtos/PortfolioDTO";
import Mapper from "@shared/util/Mapper";

class PortfolioServiceImp implements PortfolioUseCases {
  constructor(
    private readonly portfolioRepository: PortfolioRepository,
    private readonly userRepository: UserRepository,
    private readonly workRepository: WorkRepository
  ) {}

  async register(createPortfolioDto: CreatePortfolioDTO): Promise<Portfolio> {
    const author = await this.userRepository.findById(
      createPortfolioDto.authorId
    );

    if (!author) throw new BadRequest("Author não registrado!");

    const portfoioDomain =
      Mapper.Portfolio.fromCreatePortfolioDTOtoDomain(createPortfolioDto);

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
    const portfolioDomain =
      Mapper.Portfolio.fromUpdatePortfolioDTOtoDomain(updatePortfolioDto);
    return await this.portfolioRepository.update(portfolioDomain);
  }

  async getWorks(portfolioId: string): Promise<Work[]> {
    const existPortfolio = await this.portfolioRepository.findById(portfolioId);
    if (!existPortfolio) throw new NotFound("O portfolil não existe");

    return await this.workRepository.findByPortfolio(portfolioId);
  }

  async deleteById(id: string): Promise<Portfolio | null> {
    const portfolio = await this.portfolioRepository.deleteById(id);
    return portfolio;
  }
}

const portfolioService: PortfolioUseCases = new PortfolioServiceImp(
  portfolioRepositoryImp,
  userRepositoryImp,
  workRepositoryImp
);
export default portfolioService;
