import Portfolio from "../../Domain/Entities/Portfolio/Portfolio";

export default interface PortfolioUseCases {
  register(portfolio: Portfolio): Promise<Portfolio>;
  findMany(): Promise<Portfolio[]>;
  findById(id: number): Promise<Portfolio | null>;
  findByAuthorId(authorId: string): Promise<Portfolio[]>;
  deleteById(id: number): Promise<Portfolio | null>;
}
