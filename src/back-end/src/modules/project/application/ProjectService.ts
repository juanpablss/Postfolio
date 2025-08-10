// import PortfolioRepository from "@domain/entities/por folio/PortfolioRepository";
import { Project } from "@project/domain/entities/Project";
import { BadRequest } from "@shared/error/HttpError";
import { CreateWorkDTO, UpdateWorkDTO } from "@project/api/ProjectDTO";
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
    private workRepository: IProjectRepository,
    @inject(TYPES.IPortfolioPort)
    private portfolioPort: IPortfolioPort
  ) {}

  async create(createWorkDto: CreateWorkDTO): Promise<Project> {
    if (!this.portfolioPort.exist(createWorkDto.portfolioId))
      throw new BadRequest("O portfolio não existe");

    const workDomain = ProjectMapper.fromCreateWorkDtoToDomain(createWorkDto);

    return await this.workRepository.create(workDomain);
  }

  async update(updateWorkDto: UpdateWorkDTO): Promise<Project> {
    const existeWork = await this.workRepository.findById(updateWorkDto.id);

    if (!existeWork) throw new BadRequest("O trabalho não existe");
    const workDomain = ProjectMapper.fromUpdateWorkDtoToDomain(updateWorkDto);

    return await this.workRepository.update(workDomain);
  }

  async delete(id: string): Promise<Project | null> {
    return await this.workRepository.delete(id);
  }

  async findMany(): Promise<Project[]> {
    return await this.workRepository.findMany();
  }

  async findById(id: string): Promise<Project | null> {
    return await this.workRepository.findById(id);
  }
}
