import { FastifyReply, FastifyRequest } from "fastify";
import Portfolio from "../../../domain/Entities/Portfolio/Portfolio";
import { HttpError } from "../../../infrastructure/error/HttpError";
import portfolioService from "../../../application/service/PortfolioServiceImp";

export const PortfolioController = {
  register: async (req: FastifyRequest, reply: FastifyReply) => {
    const {
      name = null,
      description = null,
      pageLink = null,
      authorId = req.user?.id || null,
    } = req.body as Partial<{
      name: string;
      description: string;
      pageLink: string;
      authorId: number;
    }>;

    if (!name || !description || !pageLink || !authorId)
      throw new HttpError(400, "Todos os campos são obrigatórios!");

    const portfolio = await portfolioService.register(
      new Portfolio(-1, name, description, pageLink, authorId)
    );

    reply.send(portfolio);
  },
  getAll: async (req: FastifyRequest, reply: FastifyReply) => {
    const portfolios = await portfolioService.findMany();
    reply.send(portfolios);
    // const portfolios = portfolioService.
  },
  getById: async (req: FastifyRequest, reply: FastifyReply) => {
    const params = req.params as { id: string };
    const id = Number(params.id);
    if (!id || typeof id !== "number")
      throw new HttpError(400, "Id é obrigatorio");

    const portfolio = portfolioService.findById(id);

    reply.send(portfolio);
  },

  deleteById: async (req: FastifyRequest, reply: FastifyReply) => {
    const params = req.params as { id: string };
    const id = Number(params.id);

    if (!id || typeof id !== "number")
      throw new HttpError(400, "Id do portofolio é obrigatorio!");

    const portfolio = await portfolioService.deleteById(id);
    reply.send(portfolio);
  },
};
