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
  }

  async emit(data: UserCreatedEventData): Promise<string> {
    console.log("Emitir evento de criação para portfoio");

    return "emitido";
  }
}
