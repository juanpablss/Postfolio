import Competition from "@domain/entities/competition/Competition";
import Work from "@domain/entities/work/Work";
import WorkCompDetails from "@domain/entities/workCompDetails/WorkCompDetails";

export default interface CompetitionUseCase {
  register(competition: Competition): Promise<Competition>;
  subscribeWork(
    competitionId: string,
    workId: string
  ): Promise<WorkCompDetails>;
  unsubscribeWork(competitionId: string, workId: string): Promise<void>;
  update(competition: Competition): Promise<Competition>;
  deleteById(id: string): Promise<Competition | null>;

  findMany(): Promise<Competition[]>;
  findById(id: string): Promise<Competition | null>;
  findSubscribedWorks(competitionId: string): Promise<Work[]>;
}
