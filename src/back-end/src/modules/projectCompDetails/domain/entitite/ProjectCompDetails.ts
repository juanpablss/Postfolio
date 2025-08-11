export class ProjectCompDetails {
  constructor(
    public id: string,
    public totalReviewers: number,
    public totalScore: number,
    public competitionId: string,
    public projectId: string
  ) {}

  public addRating(score: number) {
    this.totalScore += score;
    this.totalReviewers += 1;
  }

  //   public removeRating(rating: Rating) {
  //     this.totalReviewers -= 1;
  //     this.totalScore -= rating.score;
  //   }

  public updateTotalScore(oldScore: number, newScore: number) {
    this.totalScore += newScore - oldScore;
  }
}
