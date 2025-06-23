import { BadRequest } from "@domain/error/HttpError";

export default class Rating {
  id: string;
  score: number;
  workDetailsId: string;

  constructor(id: string, workDetailsId: string, score: number) {
    this.id = id;
    this.workDetailsId = workDetailsId;

    if (score > 100) throw new BadRequest("A nota não pode ser maior que 100!");
    if (score < 0) throw new BadRequest("A nota não pode ser negativa!");
    this.score = score;
  }
}
