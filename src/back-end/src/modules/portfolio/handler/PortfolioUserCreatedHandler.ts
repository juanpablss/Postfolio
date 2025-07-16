import { TYPES } from "@compositionRoot/Types";
import { IPortfolioService } from "@portfolio/service/IPortfolioService";
import {
  AppEvents,
  UserCreatedEventData,
  IUserCreatedEventHandler,
} from "@shared/event/AppEvents";
import { inject, injectable } from "inversify";

@injectable()
export class PortfolioUserCreatedHandler implements IUserCreatedEventHandler {
  constructor(
    @inject(TYPES.IPortfolioService)
    private portfolioService: IPortfolioService
  ) {
    AppEvents.userCreated.add(this);
    console.log("[PortfolioUserCreatedHandler] foi criado");
  }

  async emit(data: UserCreatedEventData): Promise<string> {
    this.portfolioService.register({
      name: "default",
      description: "not found",
      pagelink: null,
      authorId: data.userId,
    });

    return "emitido";
  }
}
