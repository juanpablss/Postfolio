import { IProjectService } from "@project/domain/interfaces/IProjectService";
import { FastifyReply, FastifyRequest } from "fastify";
import {
  CreateProjectRequest,
  UpdateProjectRequest,
} from "@project/api/ProjectSchema";
import { CreateProjectDTO, UpdateProjectDTO } from "@project/api/ProjectDTO";
import { BadRequest } from "@shared/error/HttpError";
import { inject, injectable } from "inversify";
import { TYPES } from "@compositionRoot/Types";
import { ProjectCategoryMapper } from "@project/application/ProjectMapper";

@injectable()
export class WorkController {
  constructor(
    @inject(TYPES.IProjectService)
    private workService: IProjectService
  ) {}

  async create(req: CreateProjectRequest, reply: FastifyReply) {
    const dto: CreateProjectDTO = {
      ...req.body,
      category: ProjectCategoryMapper.fromSchemaToDomain(req.body.category),
      portfolioId: req.body.portfolio,
    };

    const response = await this.workService.create(dto);

    reply.send(response);
  }

  async update(req: UpdateProjectRequest, reply: FastifyReply) {
    const dto: UpdateProjectDTO = {
      ...req.body,
      id: req.params.projectId,
      category: req.body.category
        ? ProjectCategoryMapper.fromSchemaToDomain(req.body.category)
        : undefined,
    };

    const response = await this.workService.update(dto);

    reply.send(response);
  }

  async delete(req: FastifyRequest, reply: FastifyReply) {
    const { projectId } = req.params as { projectId: string };

    if (!projectId) throw new BadRequest("ID do trabalho é necessario");

    const response = await this.workService.delete(projectId);

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
}
