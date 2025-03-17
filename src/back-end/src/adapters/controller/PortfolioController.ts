import { FastifyReply, FastifyRequest } from "fastify";
import Portfolio from "../../domain/Portfolio/Portfolio";
import { HttpError } from "../../infrastructure/error/HttpError";
import portfolioService from "../../application/service/PortfolioServiceImp";

export const PortfolioController = {
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

    console.log("Registrar portfolio\n");

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
    const strId = req.params as { id: string };
    const id = Number(strId);
    if (!id || typeof id !== "number")
      throw new HttpError(400, "Author é obrigatorio");

    const portfolio = portfolioService.findById(id);

    reply.send(portfolio);
  },
  getByUser: async (req: FastifyRequest, reply: FastifyReply) => {
    const authorId = Number(req.user?.id);

    if (!authorId || typeof authorId !== "number")
      throw new HttpError(400, "Author é obrigatorio");

    const portfolios = await portfolioService.findByAuthorId(authorId);

    reply.send(portfolios);
  },

  deleteById: async (req: FastifyRequest, reply: FastifyReply) => {
    const { id } = req.params as { id: string };
    console.log(id, "\n");
    let numId: number | null = null;
    if (!id) throw new HttpError(400, "Id do portofolio é obrigatorio!");

    try {
      numId = Number(id);
    } catch (error) {
      throw new HttpError(400, "Id é um número!");
    }

    const portfolio = await portfolioService.deleteById(numId);
    reply.send(portfolio);
  },
};
