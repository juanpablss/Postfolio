export interface ProjectCompDetailsContract {
  id?: string;
  totalReviewers: number;
  totalScore: number;
  competitionId: string;
  projectId: string;
  checked: boolean;
}
