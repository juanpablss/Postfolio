import WorkCompDetails from "@domain/entities/workCompDetails/WorkCompDetails";
import Work from "@domain/entities/work/Work";

export default interface WorkCompDetailsRepository {
  insert(workCompDetails: WorkCompDetails): Promise<WorkCompDetails>;
  update(workCompDetails: WorkCompDetails): Promise<WorkCompDetails>;
  delete(id: string): Promise<WorkCompDetails | null>;

  findById(id: string): Promise<WorkCompDetails | null>;
  findByCompetition(competitionId: string): Promise<WorkCompDetails[]>;
  findByWork(workId: string): Promise<WorkCompDetails[]>;
  findWorksByCompetition(competitionId: string): Promise<WorkCompDetails[]>;
  findByCompetitionAndWork(
    competitionId: string,
    workId: string
  ): Promise<WorkCompDetails | null>;
  findMany(): Promise<WorkCompDetails[]>;
}
