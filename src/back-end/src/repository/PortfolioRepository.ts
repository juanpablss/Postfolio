import { Portfolio } from "@prisma/client";
import { prisma } from "../config/prisma";
import { IPortfolioRepository } from "./contracts/IPortfolioRepository";
import { HttpError } from "../util/error/HttpError";

export const PortfolioRepository: IPortfolioRepository = {
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
  findById: function (id: number): Promise<Portfolio | null> {
    throw new Error("Function not implemented.");
  },
  findByAuthor: function (authorId: number): Promise<Portfolio[]> {
    throw new Error("Function not implemented.");
  },
  deleteById: function (id: number): Promise<Portfolio | null> {
    throw new Error("Function not implemented.");
  },
};
