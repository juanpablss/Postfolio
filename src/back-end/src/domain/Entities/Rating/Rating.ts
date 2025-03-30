import { HttpError } from "../../../Infrastructure/Error/HttpError";

export default class Rating {
  userId: string;
  portfolioId: number;
  score: number;

  constructor(userId: string, portfolioId: number, score: number) {
    this.userId = userId;
    this.portfolioId = portfolioId;

    if (score > 100)
      throw new HttpError(400, "A nota não pode ser maior que 100!");
    if (score < 0) throw new HttpError(400, "A nota não pode ser negativa!");
    this.score = score;
  }
}
