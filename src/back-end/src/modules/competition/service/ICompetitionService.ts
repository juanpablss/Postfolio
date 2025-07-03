import { Competition } from "@competition/domain/entities/Competition";
// import Work from "@domain/entities/work/Work";
import { WorkCompDetails } from "@competition/domain/entities/WorkCompDetails";

export interface ICompetitionService {
  register(competition: Competition): Promise<Competition>;
  subscribeWork(
    competitionId: string,
    workId: string
  ): Promise<WorkCompDetails>;
  unsubscribeWork(competitionId: string, workId: string): Promise<void>;
  updateCompetition(competition: Competition): Promise<Competition>;
  deleteCompetition(id: string): Promise<Competition | null>;

  findMany(): Promise<Competition[]>;
  findById(id: string): Promise<Competition | null>;
  findSubscribedWorks(competitionId: string): Promise<WorkCompDetails[]>;
}
