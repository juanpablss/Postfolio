import { Work } from "@work/domain/entities/Work";

export interface IWorkRepository {
  insert(work: Work): Promise<Work>;
  findMany(): Promise<Work[]>;
  findById(id: string): Promise<Work | null>;
  findByPortfolio(portfolioId: string): Promise<Work[]>;
  update(work: Work): Promise<Work>;
  delete(id: string): Promise<Work | null>;
}
