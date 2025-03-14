import { IPortfolioRepository } from "../repository/contracts/IPortfolioRepository";
import { HttpError } from "../util/error/HttpError";
import { Portfolio } from "@prisma/client";

export const PortfolioService = (
  portfolioRepository: IPortfolioRepository
) => ({
  register: async (
    name: string | null,
    description: string | null,
    pageLink: string | null,
    authorId: number | null
  ) => {
    if (!name) throw new HttpError(400, "Nome é obrigatório!");
    if (!description) throw new HttpError(400, "Descrição é obrigatório!");
    if (!pageLink) throw new HttpError(400, "Link da página é obrigatório!");
    if (!authorId) throw new HttpError(400, "Author é obrigatório!");

    const portfolio = await portfolioRepository.insert(
      name,
      description,
      pageLink,
      authorId
    );

    return portfolio;
  },
  getAll: async (): Promise<Portfolio[]> => {
    const portfolios = await portfolioRepository.findMany();
    return portfolios;
  },
});
