import { BadRequest } from "@shared/error/HttpError";

// import { Rating } from '../competition/domain/entities/Rating';
export class Rating {
  constructor(
    private id: string,
    private score: number,
    private userId: string,
    private projectId: string,
    private competitionId: string,
    private projectCompDetailsId: string
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

  public getId(): string {
    return this.id;
  }

  public getScore(): number {
    return this.score;
  }

  public getUserId(): string {
    return this.userId;
  }

  public getProjectId(): string {
    return this.projectId;
  }

  public getCompetitionId(): string {
    return this.competitionId;
  }

  public getProjectCompDetailsId(): string {
    return this.projectCompDetailsId;
  }
}
