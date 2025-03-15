import { FastifyReply, FastifyRequest } from "fastify";
import { PortfolioRepository } from "../repository/PortfolioRepository";
import { PortfolioService } from "../service/PortfolioService";

export const PorftolioController = {
  register: async (req: FastifyRequest, reply: FastifyReply) => {
    const {
      name = null,
      description = null,
      pageLink = null,
      authorId = Number(req.user?.id) || null,
    } = req.body as Partial<{
      name: string;
      description: string;
      pageLink: string;
      authorId: number;
    }>;

    const portfolioService = PortfolioService(PortfolioRepository);

    await portfolioService.register(name, description, pageLink, authorId);

    reply.send({ msg: "Portfolio criado com sucesso!" });
  },
  getAll: async (req: FastifyRequest, reply: FastifyReply) => {
    const portfolioService = PortfolioService(PortfolioRepository);
    const portfolios = await portfolioService.getAll();
    reply.send(portfolios);
    // const portfolios = portfolioService.
  },
  getById: async (req: FastifyRequest, reply: FastifyReply) => {
    const id = req.params as { id: string };

    const portfolioService = PortfolioService(PortfolioRepository);
    const portfolio = portfolioService.getById(Number(id));

    reply.send(portfolio);
  },
  getByUser: async (req: FastifyRequest, reply: FastifyReply) => {
    const authorId = Number(req.user?.id);

    const portfolioService = PortfolioService(PortfolioRepository);
    const portfolios = await portfolioService.getByAuthorId(authorId);

    reply.send(portfolios);
  },
};
