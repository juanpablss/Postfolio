import Portfolio from "../../domain/Portfolio/Portfolio";

export default interface PortfolioUseCases {
  register: (portfolio: Portfolio) => Promise<void>;
  findMany: () => Promise<Portfolio[]>;
  findById: (id: number | null) => Promise<Portfolio | null>;
  findByAuthorId: (authorId: number | null) => Promise<Portfolio[]>;
}
