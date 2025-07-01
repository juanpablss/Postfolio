// domains/user/infrastructure/adapters/outbound/ports/IPortfolioService.ts
export interface IPortfolioService {
  createDefaultPortfolioForUser(userId: string): Promise<void>;
  // O User pode precisar verificar se um Portfolio existe para um dado User, etc.
  // checkIfUserHasPortfolio(userId: string): Promise<boolean>;
}
