import PortfolioUseCases from "@application/useCases/PortfolioUseCases";
import userServiceImp from "@application/service/UserServiceImp";
import portfolioRepositoryImp from "@repository/portfolioRep/PortfolioRepositoryImp";
import Portfolio from "@domain/entities/portfolio/Portfolio";
import { BadRequest, NotFound } from "@domain/error/HttpError";
import PortfolioRepository from "@domain/entities/portfolio/PortfolioRepository";
import Work from "@domain/entities/work/Work";
import { UserRepository } from "@domain/entities/user/UserRepository";
import userRepositoryImp from "@repository/userRep/UserRepositoryImp";
import workRepositoryImp from "@repository/workRep/WorkRepositoryImp";
import WorkRepository from "@domain/entities/work/WorkRepository";

class PortfolioServiceImp implements PortfolioUseCases {
  constructor(
    private readonly portfolioRepository: PortfolioRepository,
    private readonly userRepository: UserRepository,
    private readonly workRepository: WorkRepository
  ) {}

  async register(portfolio: Portfolio): Promise<Portfolio> {
    const author = await this.userRepository.findById(portfolio.authorId);

    if (!author) throw new BadRequest("Author não registrado!");

    return await this.portfolioRepository.insert(portfolio);
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

  async update(portfolio: Portfolio): Promise<Portfolio> {
    return await this.portfolioRepository.update(portfolio);
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
