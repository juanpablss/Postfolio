import { BadRequest } from "@domain/error/HttpError";
import { CreateWorkDTO, UpdateWorkDTO } from "@dtos/WorkDTO";
import { RegisterWorkRequest, UpdateWorkRequest } from "@schamas/WorkSchema";
import workServiceImp from "@service/WorkServiceImp";
import WorkUseCase from "@useCases/WorkUseCase";
import { FastifyReply, FastifyRequest } from "fastify";

class WorkController {
  constructor(private readonly workService: WorkUseCase) {}

  async register(req: RegisterWorkRequest, reply: FastifyReply) {
    const createWorkDto: CreateWorkDTO = {
      name: req.body.name,
      description: req.body.description,
      githublink: req.body.githublink || null,
      portfolio: req.body.portfolio,
    };

    const response = await this.workService.register(createWorkDto);

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

  async update(req: UpdateWorkRequest, reply: FastifyReply) {
    const updateWorkDto: UpdateWorkDTO = {
      id: req.params.id,
      name: req.body.name,
      description: req.body.description,
      githublink: req.body.githublink || null,
      portfolio: req.body.portfolio,
    };

    const response = await this.workService.update(updateWorkDto);

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
