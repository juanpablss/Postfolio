import { TYPES } from "@compositionRoot/Types";
import { IPortfolioPort } from "@portfolio/api/IPortfolioPort";
import { PortfolioService } from "@portfolio/service/PortfolioService";
import { inject, injectable } from "inversify";

@injectable()
export class PortfolioAdapter implements IPortfolioPort {
  constructor(
    @inject(TYPES.IPortfolioService)
    private portfolioService: PortfolioService
  ) {}
  async exist(portfolioId: string): Promise<boolean> {
    const exist = await this.portfolioService.findById(portfolioId);

    return exist ? true : false;
  }
}
