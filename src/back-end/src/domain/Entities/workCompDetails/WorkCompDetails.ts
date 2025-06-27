import Work from "@domain/entities/work/Work";

export default class WorkCompDetails {
  constructor(
    public id: string,
    public totalReviewers: number,
    public totalScore: number,
    public competitionId: string,
    public workId: string,
    public work?: Work
  ) {}
}
