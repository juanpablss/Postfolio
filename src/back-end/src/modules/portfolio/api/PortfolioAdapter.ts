import { TYPES } from "@compositionRoot/Types";
import { IPortfolioPort } from "@portfolio/api/IPortfolioPort";
import { IPortfolioRepository } from "@portfolio/domain/entities/IPortfolioRepository";
import { inject, injectable } from "inversify";

@injectable()
export class PortfolioAdapter implements IPortfolioPort {
  constructor(
    @inject(TYPES.IPortfolioRepository)
    private portfolioRepository: IPortfolioRepository
  ) {}
  async exist(portfolioId: string): Promise<boolean> {
    const exist = await this.portfolioRepository.findById(portfolioId);

    return exist ? true : false;
  }
}
