import PrismaPortfolio from "../Entities/PrismaPortfolio";
import { prisma } from "../../../infrastructure/config/prisma";
import { HttpError } from "../../../infrastructure/error/HttpError";

export const PrismaPortfolioRepository = {
  insert: async (
    prismaPortfolio: PrismaPortfolio
  ): Promise<PrismaPortfolio> => {
    try {
      const portfolio = prisma.portfolio.create({
        data: {
          name: prismaPortfolio.name,
          description: prismaPortfolio.description,
          pageLink: prismaPortfolio.pageLink,
          authorId: prismaPortfolio.authorId,
        },
      });
      return portfolio;
    } catch (error) {
      throw new HttpError(500, "Erro ao salvar Portfolio!");
    }
  },
  findMany: async (): Promise<PrismaPortfolio[]> => {
    return prisma.portfolio.findMany();
  },
  findById: async (id: number): Promise<PrismaPortfolio | null> => {
    return prisma.portfolio.findUnique({
      where: {
        id,
      },
    });
  },
  findByAuthor: async (authorId: string): Promise<PrismaPortfolio[]> => {
    return prisma.portfolio.findMany({
      where: { authorId },
    });
  },
  deleteById: function (id: number): Promise<PrismaPortfolio | null> {
    try {
      return prisma.portfolio.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new HttpError(500, "Não foi possivel deletar o portfolio!");
    }
  },
};
