// import PortfolioRepository from "@domain/entities/portfolio/PortfolioRepository";
import { Work } from "@work/domain/entities/Work";
import { BadRequest } from "@shared/error/HttpError";
import { CreateWorkDTO, UpdateWorkDTO } from "@work/dtos/WorkDTO";
import { WorkMapper } from "@work/util/WorkMapper";
import { IWorkService } from "@work/service/IWorkService";
import { IWorkRepository } from "@work/domain/entities/IWorkRepository";
import { IPortfolioPort } from "@portfolio/api/IPortfolioPort";
import { inject, injectable } from "inversify";
import { TYPES } from "@compositionRoot/Types";

@injectable()
export class WorkService implements IWorkService {
  constructor(
    @inject(TYPES.IWorkRepository)
    private workRepository: IWorkRepository,
    @inject(TYPES.IPortfolioPort)
    private portfolioPort: IPortfolioPort
  ) {}
  async create(createWorkDto: CreateWorkDTO): Promise<Work> {
    if (!this.portfolioPort.exist(createWorkDto.portfolio))
      throw new BadRequest("O portfolio não existe");

    const workDomain = WorkMapper.fromCreateWorkDtoToDomain(createWorkDto);

    return await this.workRepository.create(workDomain);
  }

  async update(updateWorkDto: UpdateWorkDTO): Promise<Work> {
    const existeWork = await this.workRepository.findById(updateWorkDto.id);

    if (!existeWork) throw new BadRequest("O trabalho não existe");
    const workDomain = WorkMapper.fromUpdateWorkDtoToDomain(updateWorkDto);

    return await this.workRepository.update(workDomain);
  }

  async delete(id: string): Promise<Work | null> {
    return await this.workRepository.delete(id);
  }

  async findMany(): Promise<Work[]> {
    return await this.workRepository.findMany();
  }

  async findById(id: string): Promise<Work | null> {
    return await this.workRepository.findById(id);
  }
}
