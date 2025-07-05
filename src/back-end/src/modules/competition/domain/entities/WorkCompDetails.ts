import { Rating } from "@competition/domain/entities/Rating";

export class WorkData {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public githubLink: string | null,
    public portfolioId: string
  ) {}
}
export class WorkCompDetails {
  constructor(
    public id: string,
    public totalReviewers: number,
    public totalScore: number,
    public competitionId: string,
    public workId: string,
    public work?: WorkData,
    public ratings?: Rating[]
  ) {}

  public addRating(score: number) {
    this.totalScore += score;
    this.totalReviewers += 1;
  }

  public removeRating(rating: Rating) {
    this.totalReviewers -= 1;
    this.totalScore -= rating.score;
  }

  public updateTotalScore(oldScore: number, newScore: number) {
    this.totalScore += newScore - oldScore;
  }
}
