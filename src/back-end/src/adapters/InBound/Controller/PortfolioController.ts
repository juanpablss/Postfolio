import { FastifyReply, FastifyRequest } from "fastify";
import Portfolio from "@domain/entities/portfolio/Portfolio";
import { BadRequest } from "@domain/error/HttpError";
import PortfolioUseCases from "@useCases/PortfolioUseCases";
import portfolioService from "@service/PortfolioServiceImp";
// import portfolioService from "@application/service/PortfolioServiceImp";

class PortfolioController {
  constructor(private readonly portfolioService: PortfolioUseCases) {}

  async register(req: FastifyRequest, reply: FastifyReply) {
    const {
      name = null,
      description = null,
      pagelink = null,
      authorId = req.user?.id || null,
    } = req.body as Partial<{
      name: string;
      description: string;
      pagelink: string;
      authorId: string;
    }>;

    if (!name || !description || !pagelink || !authorId)
      throw new BadRequest("Todos os campos são obrigatórios!");

    const portfolio = await this.portfolioService.register(
      new Portfolio("", name, description, pagelink, authorId)
    );

    reply.send(portfolio);
  }

  async getAll(req: FastifyRequest, reply: FastifyReply) {
    const portfolios = await this.portfolioService.findMany();
    reply.send(portfolios);
    // const portfolios = portfolioService.
  }

  async getByUser(req: FastifyRequest, reply: FastifyReply) {
    console.log("AQUI");
    const authorId = req.user?.id || null;

    if (!authorId) throw new BadRequest("Id é obrigatorio");

    const portfolio = await this.portfolioService.findByAuthor(authorId);
    reply.send(portfolio);
  }

  async getById(req: FastifyRequest, reply: FastifyReply) {
    const { id = null } = req.body as Partial<{ id: string }>;

    if (!id) throw new BadRequest("Id é obrigatorio");

    const portfolio = await this.portfolioService.findById(id);

    reply.send(portfolio);
  }

  async getWorks(req: FastifyRequest, reply: FastifyReply) {
    console.log("AQUI 0");
    const { id = null } = req.body as Partial<{ id: string }>;

    if (!id) throw new BadRequest("Id é obrigatorio");

    console.log("AQUI 1");
    const works = await this.portfolioService.getWorks(id);

    reply.send(works);
  }

  async update(req: FastifyRequest, reply: FastifyReply) {
    const {
      id = null,
      name = null,
      description = null,
      pageLink = null,
      authorId = req.user?.id || null,
    } = req.body as Partial<{
      id: string;
      name: string;
      description: string;
      pageLink: string;
      authorId: string;
    }>;

    if (!id || !name || !description || !pageLink || !authorId)
      throw new BadRequest("Todos os campos são obrigatórios!");

    const portfolio = await this.portfolioService.update(
      new Portfolio(id, name, description, pageLink, authorId)
    );

    reply.send(portfolio);
  }

  async deleteById(req: FastifyRequest, reply: FastifyReply) {
    const { id = null } = req.body as Partial<{ id: string }>;

    if (!id) throw new BadRequest("Id é obrigatorio");

    const portfolio = await this.portfolioService.deleteById(id);
    reply.send(portfolio);
  }
}
const portfolioController = new PortfolioController(portfolioService);
export default portfolioController;
