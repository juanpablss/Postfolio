import { FastifyReply, FastifyRequest } from "fastify";
import Portflio from "../../domain/Portfolio/Portfolio";
import { HttpError } from "../../infrastructure/error/HttpError";
import PortfolioUseCases from "../../application/UseCases/PortfolioUseCases";

export const PortfolioController = (portfolioService: PortfolioUseCases) => ({
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

    if (!name || !description || !pageLink || !authorId)
      throw new HttpError(400, "Todos os campos são obrigatórios!");

    await portfolioService.register(
      new Portflio(-1, name, description, pageLink, authorId)
    );

    reply.send({ msg: "Portfolio criado com sucesso!" });
  },
  getAll: async (req: FastifyRequest, reply: FastifyReply) => {
    const portfolios = await portfolioService.findMany();
    reply.send(portfolios);
    // const portfolios = portfolioService.
  },
  getById: async (req: FastifyRequest, reply: FastifyReply) => {
    const id = req.params as { id: string };

    const portfolio = portfolioService.findById(Number(id));

    reply.send(portfolio);
  },
  getByUser: async (req: FastifyRequest, reply: FastifyReply) => {
    const authorId = Number(req.user?.id);

    const portfolios = await portfolioService.findByAuthorId(authorId);

    reply.send(portfolios);
  },
});
