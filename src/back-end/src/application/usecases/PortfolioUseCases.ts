import Portfolio from "@domain/entities/portfolio/Portfolio";
import Work from "@domain/entities/work/Work";

export default interface PortfolioUseCases {
  register(portfolio: Portfolio): Promise<Portfolio>;
  update(portfolio: Portfolio): Promise<Portfolio>;
  deleteById(id: string): Promise<Portfolio | null>;

  findMany(): Promise<Portfolio[]>;
  findById(id: string): Promise<Portfolio | null>;
  findByAuthor(authorId: string): Promise<Portfolio | null>;

  getWorks(portfolioId: string): Promise<Work[]>;
}
