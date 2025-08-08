import { Portfolio } from "@portfolio/domain/entities/Portfolio";
// import Work from "@";
import {
  CreatePortfolioDTO,
  UpdatePortfolioDTO,
} from "@portfolio/api/PortfolioDTO";
import { WorkContract } from "@shared/contracts/WorkContracts";

export interface IPortfolioService {
  create(createPortfolioDto: CreatePortfolioDTO): Promise<Portfolio>;
  update(updatePortfolioDto: UpdatePortfolioDTO): Promise<Portfolio>;
  deleteById(id: string): Promise<Portfolio | null>;

  findMany(): Promise<Portfolio[]>;
  findById(id: string): Promise<Portfolio | null>;
  findWorks(id: string): Promise<WorkContract[]>;
  findByAuthor(authorId: string): Promise<Portfolio | null>;

  // getWorks(portfolioId: string): Promise<Work[]>;
}
