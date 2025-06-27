import Work from "@domain/entities/work/Work";

export default interface WorkUseCase {
  register(work: Work): Promise<Work>;
  findMany(): Promise<Work[]>;
  findById(id: string): Promise<Work | null>;
  update(work: Work): Promise<Work>;
  delete(id: string): Promise<Work | null>;
}
