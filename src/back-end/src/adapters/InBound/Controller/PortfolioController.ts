import { FastifyReply, FastifyRequest } from "fastify";
import Portfolio from "@domain/entities/portfolio/Portfolio";
import { BadRequest } from "@domain/error/HttpError";
import PortfolioUseCases from "@useCases/PortfolioUseCases";
import portfolioService from "@service/PortfolioServiceImp";
import {
  RegisterPortfolioRequest,
  UpdatePortfolioRequest,
} from "@schamas/PortfolioSchema";
import { CreatePortfolioDTO, UpdatePortfolioDTO } from "@dtos/PortfolioDTO";
class PortfolioController {
  constructor(private readonly portfolioService: PortfolioUseCases) {}

  async register(req: RegisterPortfolioRequest, reply: FastifyReply) {
    const authorId = req.user?.id;

    if (!authorId) throw new BadRequest("Autor é obrigatorio");

    const createPortfolioDto: CreatePortfolioDTO = { ...req.body, authorId };

    const portfolio = await this.portfolioService.register(createPortfolioDto);

    reply.send(portfolio);
  }

  async getAll(req: FastifyRequest, reply: FastifyReply) {
    const portfolios = await this.portfolioService.findMany();
    reply.send(portfolios);
    // const portfolios = portfolioService.
  }

  async getByUser(req: FastifyRequest, reply: FastifyReply) {
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
    const { id = null } = req.body as Partial<{ id: string }>;

    if (!id) throw new BadRequest("Id é obrigatorio");

    const works = await this.portfolioService.getWorks(id);

    reply.send(works);
  }

  async update(req: UpdatePortfolioRequest, reply: FastifyReply) {
    const authorId = req.user?.id;

    if (!authorId) throw new BadRequest("Autor é obrigatorio");

    const updatePortfolioDto: UpdatePortfolioDTO = {
      id: req.params.id,
      ...req.body,
      authorId,
    };

    const response = await this.portfolioService.update(updatePortfolioDto);

    reply.send(response);
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
