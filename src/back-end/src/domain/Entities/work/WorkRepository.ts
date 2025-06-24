import Work from "@domain/entities/work/Work";

export default interface WorkRepository {
  insert(work: Work): Promise<Work | null>;
  findMany(): Promise<Work[]>;
  findById(id: string): Promise<Work>;
  findByPortfolio(portfolioId: string): Promise<Work[]>;
  update(work: Work): Promise<Work>;
  delete(id: string): Promise<Work | null>;
}
