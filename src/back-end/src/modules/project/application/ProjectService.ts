// import PortfolioRepository from "@domain/entities/por folio/PortfolioRepository";
import { Project } from "@project/domain/entities/Project";
import { BadRequest } from "@shared/error/HttpError";
import { CreateProjectDTO, UpdateProjectDTO } from "@project/api/ProjectDTO";
import { ProjectMapper } from "@project/application/ProjectMapper";
import { IProjectService } from "@project/domain/interfaces/IProjectService";
import { IProjectRepository } from "@project/domain/interfaces/IProjectRepository";
import { IPortfolioPort } from "@portfolio/domain/interfaces/PortfolioPort";
import { inject, injectable } from "inversify";
import { TYPES } from "@compositionRoot/Types";

@injectable()
export class ProjectService implements IProjectService {
  constructor(
    @inject(TYPES.IProjectRepository)
    private repository: IProjectRepository,
    @inject(TYPES.PortfolioPort)
    private portfolioPort: IPortfolioPort
  ) {}

  async create(createProjectDto: CreateProjectDTO): Promise<Project> {
    if (!this.portfolioPort.exist(createProjectDto.portfolioId))
      throw new BadRequest("O portfolio não existe");

    const workDomain =
      ProjectMapper.fromCreateProjectDtoToDomain(createProjectDto);

    return await this.repository.create(workDomain);
  }

  async update(updateProjectDto: UpdateProjectDTO): Promise<Project> {
    const project = await this.repository.findById(updateProjectDto.id);

    if (!project) throw new BadRequest("O trabalho não existe");

    project.update(updateProjectDto);

    return await this.repository.update(project);
  }

  async delete(id: string): Promise<Project | null> {
    return await this.repository.delete(id);
  }

  async findMany(): Promise<Project[]> {
    return await this.repository.findMany();
  }

  async findById(id: string): Promise<Project | null> {
    return await this.repository.findById(id);
  }
}
