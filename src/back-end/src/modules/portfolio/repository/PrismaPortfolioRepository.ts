import { prisma } from "@infrastructure/config/Prisma";
import { InternalServerError } from "@shared/error/HttpError";
import Portfolio from "@portfolio/domain/entities/Portfolio";
import IPortfolioRepository from "@portfolio/repository/IPortfolioRepository";
// import { Portfolio as PortfolioModel } from "@prisma/client";
import { PortfolioMapper } from "@portfolio/util/PortfolioMapper";

export class PrismaPortfolioRepository implements IPortfolioRepository {
  async insert(portfolio: Portfolio): Promise<Portfolio> {
    try {
      const portfolioModel = await prisma.portfolio.create({
        data: {
          name: portfolio.name,
          description: portfolio.description,
          pageLink: portfolio.pageLink,
          authorId: portfolio.authorId,
        },
      });

      return PortfolioMapper.fromPrismatoDomain(portfolioModel);
    } catch (error) {
      throw new InternalServerError("Erro ao salvar Portfolio!");
    }
  }

  async findMany(): Promise<Portfolio[]> {
    const portfolioModel = await prisma.portfolio.findMany();
    return portfolioModel.map(PortfolioMapper.fromPrismatoDomain);
  }

  async findById(id: string): Promise<Portfolio | null> {
    const portfolioModel = await prisma.portfolio.findUnique({
      where: {
        id,
      },
    });
    return portfolioModel
      ? PortfolioMapper.fromPrismatoDomain(portfolioModel)
      : null;
  }

  async findByAuthor(authorId: string): Promise<Portfolio | null> {
    const portfolioModel = await prisma.portfolio.findUnique({
      where: { authorId },
    });

    return portfolioModel
      ? PortfolioMapper.fromPrismatoDomain(portfolioModel)
      : null;
  }

  async update(portfolio: Portfolio): Promise<Portfolio> {
    try {
      const portfolioModel = await prisma.portfolio.update({
        where: {
          id: portfolio.id,
        },
        data: {
          name: portfolio.name,
          description: portfolio.description,
          pageLink: portfolio.pageLink,
        },
      });

      return PortfolioMapper.fromPrismatoDomain(portfolioModel);
    } catch (error) {
      throw new InternalServerError("Não foi possivel atualizar o portfolio!");
    }
  }

  async deleteById(id: string): Promise<Portfolio | null> {
    try {
      const portfolioModel = await prisma.portfolio.delete({
        where: {
          id,
        },
      });

      return portfolioModel
        ? PortfolioMapper.fromPrismatoDomain(portfolioModel)
        : null;
    } catch (error) {
      throw new InternalServerError("Não foi possivel deletar o portfolio!");
    }
  }
}
