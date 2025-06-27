import PortfolioRepository from "@domain/entities/portfolio/PortfolioRepository";
import Work from "@domain/entities/work/Work";
import WorkRepository from "@domain/entities/work/WorkRepository";
import { BadRequest } from "@domain/error/HttpError";
import portfolioRepositoryImp from "@repository/portfolioRep/PortfolioRepositoryImp";
import workRepositoryImp from "@repository/workRep/WorkRepositoryImp";
import WorkUseCase from "@useCases/WorkUseCase";

class WorkServiceImp implements WorkUseCase {
  constructor(
    private readonly workRepository: WorkRepository,
    private readonly portfolioRepository: PortfolioRepository
  ) {}
  async register(work: Work): Promise<Work> {
    const existPortfolio = await this.portfolioRepository.findById(work.id);

    if (!existPortfolio) throw new BadRequest("O portfolio não existe");

    return await this.workRepository.insert(work);
  }

  async findMany(): Promise<Work[]> {
    return await this.workRepository.findMany();
  }

  async findById(id: string): Promise<Work | null> {
    return await this.workRepository.findById(id);
  }
  async update(work: Work): Promise<Work> {
    return await this.workRepository.update(work);
  }
  async delete(id: string): Promise<Work | null> {
    return await this.workRepository.delete(id);
  }
}

const workServiceImp: WorkUseCase = new WorkServiceImp(
  workRepositoryImp,
  portfolioRepositoryImp
);

export default workServiceImp;
