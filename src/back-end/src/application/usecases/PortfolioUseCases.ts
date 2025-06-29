import Portfolio from "@domain/entities/portfolio/Portfolio";
import Work from "@domain/entities/work/Work";
import { CreatePortfolioDTO, UpdatePortfolioDTO } from "@dtos/PortfolioDTO";

export default interface PortfolioUseCases {
  register(createPortfolioDto: CreatePortfolioDTO): Promise<Portfolio>;
  update(updatePortfolioDto: UpdatePortfolioDTO): Promise<Portfolio>;
  deleteById(id: string): Promise<Portfolio | null>;

  findMany(): Promise<Portfolio[]>;
  findById(id: string): Promise<Portfolio | null>;
  findByAuthor(authorId: string): Promise<Portfolio | null>;

  getWorks(portfolioId: string): Promise<Work[]>;
}
