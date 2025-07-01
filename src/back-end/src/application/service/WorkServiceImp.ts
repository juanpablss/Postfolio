import PortfolioRepository from "@domain/entities/portfolio/PortfolioRepository";
import Work from "@domain/entities/work/Work";
import WorkRepository from "@domain/entities/work/WorkRepository";
import { BadRequest } from "@domain/error/HttpError";
import { CreateWorkDTO, UpdateWorkDTO } from "@dtos/WorkDTO";
import portfolioRepositoryImp from "@repository/portfolioRep/PortfolioRepositoryImp";
import workRepositoryImp from "@repository/workRep/WorkRepositoryImp";
import WorkUseCase from "@useCases/WorkUseCase";
import Mapper from "@shared/util/Mapper";

class WorkServiceImp implements WorkUseCase {
  constructor(
    private readonly workRepository: WorkRepository,
    private readonly portfolioRepository: PortfolioRepository
  ) {}
  async register(createWorkDto: CreateWorkDTO): Promise<Work> {
    const existPortfolio = await this.portfolioRepository.findById(
      createWorkDto.portfolio
    );

    if (!existPortfolio) throw new BadRequest("O portfolio não existe");

    const workDomain = Mapper.Work.fromCreateWorkDTOtoDomain(createWorkDto);

    return await this.workRepository.insert(workDomain);
  }

  async update(updateWorkDto: UpdateWorkDTO): Promise<Work> {
    const existeWork = await this.workRepository.findById(updateWorkDto.id);

    if (!existeWork) throw new BadRequest("O trabalho não existe");
    const workDomain = Mapper.Work.fromUpdateWorkDTOtoDomain(updateWorkDto);

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

const workServiceImp: WorkUseCase = new WorkServiceImp(
  workRepositoryImp,
  portfolioRepositoryImp
);

export default workServiceImp;
