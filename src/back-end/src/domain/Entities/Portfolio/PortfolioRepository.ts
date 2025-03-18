import Portfolio from "./Portfolio";

export default interface PortfolioRepository {
  insert: (portfolio: Portfolio) => Promise<Portfolio>;
  findMany: () => Promise<Portfolio[]>;
  findById: (id: number) => Promise<Portfolio | null>;
  findByAuthor: (authorId: number) => Promise<Portfolio[]>;
  deleteById: (id: number) => Promise<Portfolio | null>;
}
