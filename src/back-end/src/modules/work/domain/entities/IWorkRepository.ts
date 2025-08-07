import { WorkContract } from "@shared/contracts/WorkContracts";
import { Work } from "@work/domain/entities/Work";

export interface IWorkRepository {
  create(work: Work): Promise<Work>;
  update(work: Work): Promise<Work>;
  delete(id: string): Promise<Work | null>;

  findMany(): Promise<Work[]>;
  findById(id: string): Promise<Work | null>;
  findByPortfolio(portfolioId: string): Promise<WorkContract[]>;
}
