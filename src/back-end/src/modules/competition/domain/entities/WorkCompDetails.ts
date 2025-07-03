export class WorkCompDetails {
  constructor(
    public id: string,
    public totalReviewers: number,
    public totalScore: number,
    public competitionId: string,
    public workId: string
  ) {}
}
