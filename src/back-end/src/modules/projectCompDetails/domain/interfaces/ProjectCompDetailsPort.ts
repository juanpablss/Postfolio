export interface ProjectCompDetailsPort {
  create(
    totalReviewers: number,
    totalScore: number,
    competitionId: string,
    projectId: string
  ): Promise<boolean>;
  update(id: string): Promise<void>;
  delete(id: string): Promise<void>;

  exist(competitionId: string, projectId: string): Promise<string | null>;
}
