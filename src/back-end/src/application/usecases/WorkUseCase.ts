import Work from "@domain/entities/work/Work";
import { CreateWorkDTO, UpdateWorkDTO } from "@dtos/WorkDTO";

export default interface WorkUseCase {
  register(createWorkDto: CreateWorkDTO): Promise<Work>;
  update(updateWorkDto: UpdateWorkDTO): Promise<Work>;
  delete(id: string): Promise<Work | null>;

  findMany(): Promise<Work[]>;
  findById(id: string): Promise<Work | null>;
}
