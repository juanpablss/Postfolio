import { IUserPort } from "@portfolio/infra/outBound/ports/IUserPort";
import { InternalServerError } from "@shared/error/HttpError";
import IUserService from "@user/service/IUserService";

export class UserAdaper implements IUserPort {
  private userService?: IUserService;

  async exist(userId: string): Promise<boolean> {
    if (!this.userService)
      throw new InternalServerError("userService não instanciado");

    const user = await this.userService.findById(userId);

    if (!user) return false;

    return true;
  }

  setUserService(userService: IUserService) {
    this.userService = userService;
  }
}
