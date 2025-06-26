import WorkCompDetails from "@domain/entities/workCompDetails/WorkCompDetails";

export default interface WorkCompDetailsRepository {
  insert(workCompDetails: WorkCompDetails): Promise<WorkCompDetails>;
  findMany(): Promise<WorkCompDetails[]>;
  findById(id: string): Promise<WorkCompDetails | null>;
  findByCompetition(competitionId: string): Promise<WorkCompDetails[]>;
  findByWork(workId: string): Promise<WorkCompDetails[]>;
  findByCompetitionAndWork(
    competitionId: string,
    workId: string
  ): Promise<WorkCompDetails | null>;
  update(workCompDetails: WorkCompDetails): Promise<WorkCompDetails>;
  delete(id: string): Promise<WorkCompDetails | null>;
}
