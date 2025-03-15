import { PrismaPortfolioRepository } from "./PrismaPortfolioRepository";
import PortfolioRepository from "../../domain/Portfolio/PortfolioRepository";
import Portflio from "../../domain/Portfolio/Portfolio";
import { PortfolioMapper } from "../../util/mapper";

export default class PortfolioRepositoryImp implements PortfolioRepository {
  async insert(portfolio: Portflio): Promise<void> {
    await PrismaPortfolioRepository.insert(PortfolioMapper.toPrisma(portfolio));
  }

  async findMany(): Promise<Portflio[]> {
    return (await PrismaPortfolioRepository.findMany()).map(
      PortfolioMapper.toDomain
    );
  }
  async findById(id: number): Promise<Portflio | null> {
    const portfolioEntity = await PrismaPortfolioRepository.findById(id);

    if (!portfolioEntity) return null;

    return PortfolioMapper.toDomain(portfolioEntity);
  }
  async findByAuthor(authorId: number): Promise<Portflio[]> {
    throw new Error("Function not implemented.");
  }
  async deleteById(id: number): Promise<Portflio | null> {
    throw new Error("Function not implemented.");
  }
}
