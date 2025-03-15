import Portflio from "./Portfolio";

export default interface PortfolioRepository {
  insert: (portfolio: Portflio) => Promise<void>;
  findMany: () => Promise<Portflio[]>;
  findById: (id: number) => Promise<Portflio | null>;
  findByAuthor: (authorId: number) => Promise<Portflio[]>;
  deleteById: (id: number) => Promise<Portflio | null>;
}
