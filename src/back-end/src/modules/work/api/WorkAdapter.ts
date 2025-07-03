import { IWorkPort } from "@work/api/IWorkPort";
import { IWorkService } from "@work/service/IWorkService";
import { injectable, inject } from "inversify";
import { TYPES } from "@compositionRoot/Types";

@injectable()
export class WorkAdapter implements IWorkPort {
  constructor(@inject(TYPES.IWorkService) private workService: IWorkService) {}

  async workExists(workId: string): Promise<boolean> {
    const work = await this.workService.findById(workId);
    return work ? true : false;
  }
}
