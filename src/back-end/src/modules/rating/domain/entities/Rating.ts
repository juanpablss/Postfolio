import { BadRequest } from "@shared/error/HttpError";

// import { Rating } from '../competition/domain/entities/Rating';
export class Rating {
  constructor(
    private id: string,
    private score: number,
    public userId: string,
    public projectId: string,
    public competitionId: string,
    public projectCompDetailsID: string
  ) {
    this.validateScore(score);
    this.id = id;
    this.score = score;
  }

  public updateScore(score: number) {
    this.validateScore(score);
    this.score = score;
  }

  private validateScore(score: number) {
    if (score > 5) throw new BadRequest("A nota não pode ser maior que 5!");
    if (score < 0) throw new BadRequest("A nota não pode ser negativa!");
  }
}
