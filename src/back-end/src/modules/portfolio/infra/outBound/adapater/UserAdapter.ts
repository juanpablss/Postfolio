import { IUserPort } from "@portfolio/infra/outBound/ports/IUserPort";
import IUserUseCases from "@user/aplication/ports/IUserUseCases";

export class UserAdaper implements IUserPort {
  constructor(private readonly userService: IUserUseCases) {}

  async exist(userId: string): Promise<boolean> {
    const user = await this.userService.findById(userId);

    if (!user) return false;

    return true;
  }
}
