// domains/user/infrastructure/adapters/outbound/ports/IPortfolioService.ts
export interface IPortfolioPort {
  createDefaultPortfolioForUser(userId: string): Promise<void>;
  // O User pode precisar verificar se um Portfolio existe para um dado User, etc.
  // checkIfUserHasPortfolio(userId: string): Promise<boolean>;
}
