import Portfolio from "@portfolio/domain/entities/Portfolio";

export default interface IPortfolioRepository {
  insert(portfolio: Portfolio): Promise<Portfolio>;
  findMany(): Promise<Portfolio[]>;
  findById(id: string): Promise<Portfolio | null>;
  findByAuthor(authorId: string): Promise<Portfolio | null>;
  update(portfolio: Portfolio): Promise<Portfolio>;
  deleteById(id: string): Promise<Portfolio | null>;
}
