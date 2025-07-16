import { BadRequest } from "@shared/error/HttpError";

export class Rating {
  id: string;
  score: number;
  workDetailsId: string;
  userId: string;

  constructor(
    id: string,
    userId: string,
    workDetailsId: string,
    score: number
  ) {
    this.id = id;
    this.userId = userId;
    this.workDetailsId = workDetailsId;

    if (score > 100) throw new BadRequest("A nota não pode ser maior que 100!");
    if (score < 0) throw new BadRequest("A nota não pode ser negativa!");

    this.score = score;
  }

  public setScore(score: number) {
    if (score > 100) throw new BadRequest("A nota não pode ser maior que 100!");
    if (score < 0) throw new BadRequest("A nota não pode ser negativa!");
    this.score = score;
  }
}
