import { IWorkService } from "@work/domain/interfaces/IWorkService";
import { FastifyReply, FastifyRequest } from "fastify";
import { RegisterWorkRequest, UpdateWorkRequest } from "@work/api/WorkSchema";
import { CreateWorkDTO, UpdateWorkDTO } from "@work/api/WorkDTO";
import { BadRequest } from "@shared/error/HttpError";
import { inject, injectable } from "inversify";
import { TYPES } from "@compositionRoot/Types";

@injectable()
export class WorkController {
  constructor(
    @inject(TYPES.IWorkService)
    private workService: IWorkService
  ) {}

  async register(req: RegisterWorkRequest, reply: FastifyReply) {
    const createWorkDto: CreateWorkDTO = {
      name: req.body.name,
      description: req.body.description,
      githublink: req.body.githublink || null,
      portfolio: req.body.portfolio,
    };

    const response = await this.workService.create(createWorkDto);

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
