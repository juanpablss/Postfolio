import Portfolio from "@portfolio/domain/entities/Portfolio";
// import Work from "@";
import {
  CreatePortfolioDTO,
  UpdatePortfolioDTO,
} from "@portfolio/aplication/dtos/PortfolioDTO";

export interface IPortfolioService {
  register(createPortfolioDto: CreatePortfolioDTO): Promise<Portfolio>;
  update(updatePortfolioDto: UpdatePortfolioDTO): Promise<Portfolio>;
  deleteById(id: string): Promise<Portfolio | null>;

  findMany(): Promise<Portfolio[]>;
  findById(id: string): Promise<Portfolio | null>;
  findByAuthor(authorId: string): Promise<Portfolio | null>;

  // getWorks(portfolioId: string): Promise<Work[]>;
}
