import Work from "@domain/entities/work/Work";
import { BadRequest } from "@domain/error/HttpError";
import workServiceImp from "@service/WorkServiceImp";
import WorkUseCase from "@useCases/WorkUseCase";
import { FastifyReply, FastifyRequest } from "fastify";

class WorkController {
  constructor(private readonly workService: WorkUseCase) {}

  async register(req: FastifyRequest, reply: FastifyReply) {
    const {
      name = null,
      description = null,
      githubLink = null,
      portfolio = null,
    } = req.body as Partial<{
      name: string;
      description: string;
      githubLink: string;
      portfolio: string;
    }>;

    if (!portfolio) throw new BadRequest("O portfolio é obrigatorio");
    if (!name) throw new BadRequest("O nome é obrigatorio");
    if (!description) throw new BadRequest("A descrição é obrigatorio");

    const response = await this.workService.register(
      new Work("", name, description, githubLink, portfolio)
    );

    reply.send(response);
  }

  async getAll(req: FastifyRequest, reply: FastifyReply) {
    const response = await this.workService.findMany();
    reply.send(response);
  }

  async getById(req: FastifyRequest, reply: FastifyReply) {
    const { work } = req.params as { work: string };

    if (!work) throw new BadRequest("ID do trabalho é necessario");

    const response = await this.workService.findById(work);

    reply.send(response);
  }

  async update(req: FastifyRequest, reply: FastifyReply) {
    const { work } = req.params as { work: string };
    const {
      name = null,
      description = null,
      githubLink = null,
      portfolio = null,
    } = req.body as Partial<{
      name: string;
      description: string;
      githubLink: string;
      portfolio: string;
    }>;

    if (!work) throw new BadRequest("ID do trabalho é obrigatorio");
    if (!portfolio) throw new BadRequest("O portfolio é obrigatorio");
    if (!name) throw new BadRequest("O nome é obrigatorio");
    if (!description) throw new BadRequest("A descrição é obrigatorio");

    const response = await this.workService.update(
      new Work(work, name, description, githubLink, portfolio)
    );

    reply.send(response);
  }

  async delete(req: FastifyRequest, reply: FastifyReply) {
    const { work } = req.params as { work: string };

    if (!work) throw new BadRequest("ID do trabalho é necessario");

    const response = await this.workService.delete(work);

    reply.send(response);
  }
}
const workController = new WorkController(workServiceImp);
export default workController;
