import { Work } from "@work/domain/entities/Work";
import { CreateWorkDTO, UpdateWorkDTO } from "@work/dtos/WorkDTO";

export default interface IWorkService {
  register(createWorkDto: CreateWorkDTO): Promise<Work>;
  update(updateWorkDto: UpdateWorkDTO): Promise<Work>;
  delete(id: string): Promise<Work | null>;

  findMany(): Promise<Work[]>;
  findById(id: string): Promise<Work | null>;
}
