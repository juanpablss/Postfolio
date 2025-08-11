export interface CompetitionPort {
  exist(id: string): Promise<boolean>;
  // getProjectDetailsId(
  //   userId: string,
  //   competitionId: string,
  //   projectId: string
  // ): Promise<string | null>;
}
