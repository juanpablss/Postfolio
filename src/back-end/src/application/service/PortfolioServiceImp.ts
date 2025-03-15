import Portfolio from "../../domain/Portfolio/Portfolio";
import PortfolioRepository from "../../domain/Portfolio/PortfolioRepository";
import { HttpError } from "../../infrastructure/error/HttpError";
import PortfolioUseCases from "../UseCases/PortfolioUseCases";

export const PortfolioServiceImp = (
  portfolioRepository: PortfolioRepository
): PortfolioUseCases => ({
  register: async (portfolio: Portfolio) => {
    await portfolioRepository.insert(portfolio);
  },
  findMany: async (): Promise<Portfolio[]> => {
    const portfolios = await portfolioRepository.findMany();
    return portfolios;
  },

  findById: async (id: number | null): Promise<Portfolio | null> => {
    if (!id || typeof id !== "number")
      throw new HttpError(400, "Author é obrigatorio");
    return await portfolioRepository.findById(id);
  },

  findByAuthorId: async (authorId: number | null): Promise<Portfolio[]> => {
    if (!authorId || typeof authorId !== "number")
      throw new HttpError(400, "Author é obrigatorio");

    return await portfolioRepository.findByAuthor(authorId);
  },
});
