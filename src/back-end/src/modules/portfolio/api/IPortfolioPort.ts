export interface IPortfolioPort {
  exist(portfolioId: string): Promise<boolean>;
}
