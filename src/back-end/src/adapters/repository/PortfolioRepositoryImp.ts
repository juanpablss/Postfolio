import { PrismaPortfolioRepository } from "./PrismaPortfolioRepository";
import PortfolioRepository from "../../domain/Portfolio/PortfolioRepository";
import Portfolio from "../../domain/Portfolio/Portfolio";
import { PortfolioMapper } from "../../util/mapper";

class PortfolioRepositoryImp implements PortfolioRepository {
  async insert(portfolio: Portfolio): Promise<Portfolio> {
    const portfolioEntity = PortfolioMapper.toPrisma(portfolio);
    portfolio.id = (await PrismaPortfolioRepository.insert(portfolioEntity)).id;
    return portfolio;
  }

  async findMany(): Promise<Portfolio[]> {
    return (await PrismaPortfolioRepository.findMany()).map(
      PortfolioMapper.toDomain
    );
  }
  async findById(id: number): Promise<Portfolio | null> {
    const portfolioEntity = await PrismaPortfolioRepository.findById(id);

    if (!portfolioEntity) return null;

    return PortfolioMapper.toDomain(portfolioEntity);
  }
  async findByAuthor(authorId: number): Promise<Portfolio[]> {
    throw new Error("Function not implemented.");
  }
  async deleteById(id: number): Promise<Portfolio | null> {
    return await PrismaPortfolioRepository.deleteById(id);
  }
}

const portfolioRepository: PortfolioRepository = new PortfolioRepositoryImp();
export default portfolioRepository;
