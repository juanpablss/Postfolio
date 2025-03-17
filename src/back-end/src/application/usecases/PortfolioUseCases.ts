import Portfolio from "../../domain/Portfolio/Portfolio";

export default interface PortfolioUseCases {
  register(portfolio: Portfolio): Promise<Portfolio>;
  findMany(): Promise<Portfolio[]>;
  findById(id: number): Promise<Portfolio | null>;
  findByAuthorId(authorId: number): Promise<Portfolio[]>;
  deleteById(id: number): Promise<Portfolio | null>;
}
