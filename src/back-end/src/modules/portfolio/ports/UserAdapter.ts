import { TYPES } from "@compositionRoot/Types";
import { IUserPort } from "@portfolio/ports/IUserPort";
import { InternalServerError } from "@shared/error/HttpError";
import { IUserService } from "@user/service/IUserService";
import { inject, injectable } from "inversify";

@injectable()
export class UserAdaper implements IUserPort {
  constructor(
    @inject(TYPES.IUserService)
    private userService: IUserService
  ) {}

  async exist(userId: string): Promise<boolean> {
    const user = await this.userService.findById(userId);

    if (!user) return false;

    return true;
  }
}
