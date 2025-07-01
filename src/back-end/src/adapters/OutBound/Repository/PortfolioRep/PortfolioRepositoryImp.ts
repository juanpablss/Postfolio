import prismaPortfolioRepository, {
  PrismaPortfolioRepository,
} from "@repository/portfolioRep/PrismaPortfolioRepository";
import PortfolioRepository from "@domain/entities/portfolio/PortfolioRepository";
import Portfolio from "@domain/entities/portfolio/Portfolio";
import Mapper from "@shared/util/Mapper";

class PortfolioRepositoryImp implements PortfolioRepository {
  constructor(
    private readonly prismaPortfolioRepository: PrismaPortfolioRepository
  ) {}

  async insert(portfolio: Portfolio): Promise<Portfolio> {
    const portfolioModel = Mapper.Portfolio.fromDomaintoPrisma(portfolio);
    portfolio.id = (
      await this.prismaPortfolioRepository.insert(portfolioModel)
    ).id;
    return portfolio;
  }

  async findMany(): Promise<Portfolio[]> {
    return (await this.prismaPortfolioRepository.findMany()).map(
      Mapper.Portfolio.fromPrismatoDomain
    );
  }

  async findById(id: string): Promise<Portfolio | null> {
    const portfolioModel = await this.prismaPortfolioRepository.findById(id);

    if (!portfolioModel) return null;

    return Mapper.Portfolio.fromPrismatoDomain(portfolioModel);
  }
  async findByAuthor(authorId: string): Promise<Portfolio | null> {
    const existPortfolioModel =
      await this.prismaPortfolioRepository.findByAuthor(authorId);
    if (!existPortfolioModel) return null;

    const portfolios = Mapper.Portfolio.fromPrismatoDomain(existPortfolioModel);
    return portfolios;
  }

  async update(portfolio: Portfolio): Promise<Portfolio> {
    const portfolioModel = Mapper.Portfolio.fromDomaintoPrisma(portfolio);
    await this.prismaPortfolioRepository.update(portfolioModel);
    return portfolio;
  }

  async deleteById(id: string): Promise<Portfolio | null> {
    return await this.prismaPortfolioRepository.deleteById(id);
  }
}

const portfolioRepositoryImp: PortfolioRepository = new PortfolioRepositoryImp(
  prismaPortfolioRepository
);
export default portfolioRepositoryImp;
