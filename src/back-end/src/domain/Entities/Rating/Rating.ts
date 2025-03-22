export default class Rating {
  userId: string;
  portfolioId: number;
  score: number;

  constructor(userId: string, portfolioId: number, score: number) {
    this.userId = userId;
    this.portfolioId = portfolioId;
    this.score = score;
  }
}
