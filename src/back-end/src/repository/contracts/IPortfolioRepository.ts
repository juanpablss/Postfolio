import { Portfolio } from "@prisma/client";

export interface IPortfolioRepository {
  insert: (
    name: string,
    description: string,
    pageLink: string,
    authorId: number
  ) => Promise<Portfolio>;
  findMany: () => Promise<Portfolio[]>;
  findById: (id: number) => Promise<Portfolio | null>;
  findByAuthor: (authorId: number) => Promise<Portfolio[]>;
  deleteById: (id: number) => Promise<Portfolio | null>;
}
