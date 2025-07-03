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
    public work?: WorkData
  ) {}
}
