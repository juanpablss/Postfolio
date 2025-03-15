import { Portfolio } from "@prisma/client";
import { prisma } from "../../infrastructure/config/prisma";
import { IPortfolioRepository } from "./contracts/IPortfolioRepository";
import { HttpError } from "../../infrastructure/error/HttpError";

export const PrismaPortfolioRepository: IPortfolioRepository = {
  insert: async (
    name: string,
    description: string,
    pageLink: string,
    authorId: number
  ): Promise<Portfolio> => {
    try {
      const portfolio = prisma.portfolio.create({
        data: {
          name,
          description,
          pageLink,
          authorId,
        },
      });
      return portfolio;
    } catch (error) {
      throw new HttpError(500, "Erro ao salvar Portfolio!");
    }
  },
  findMany: async (): Promise<Portfolio[]> => {
    return prisma.portfolio.findMany();
  },
  findById: async (id: number): Promise<Portfolio | null> => {
    return prisma.portfolio.findUnique({
      where: {
        id,
      },
    });
  },
  findByAuthor: async (authorId: number): Promise<Portfolio[]> => {
    return prisma.portfolio.findMany({
      where: { authorId },
    });
  },
  deleteById: function (id: number): Promise<Portfolio | null> {
    throw new Error("Function not implemented.");
  },
};
