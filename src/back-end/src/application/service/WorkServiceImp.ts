import PortfolioRepository from "@domain/entities/portfolio/PortfolioRepository";
import Work from "@domain/entities/work/Work";
import WorkRepository from "@domain/entities/work/WorkRepository";
import { BadRequest } from "@domain/error/HttpError";
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

  findById(id: string): Promise<Work | null> {
    return this.workRepository.findById(id);
  }
  findByPortfolio(portfolioId: string): Promise<Work[]> {
    throw new Error("Method not implemented.");
  }
  update(work: Work): Promise<Work> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<Work | null> {
    throw new Error("Method not implemented.");
  }
}
