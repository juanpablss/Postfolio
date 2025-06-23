import WorkCompDetails from "@domain/entities/workCompDetails/WorkCompDetails";

export default interface WorkCompDetailsRepository {
  insert: (workCompDetails: WorkCompDetails) => Promise<WorkCompDetails | null>;
  findMany: () => Promise<WorkCompDetails[]>;
  findById: (id: string) => Promise<WorkCompDetails>;
  findByCompetition: (competitionId: string) => Promise<WorkCompDetails[]>;
  findByWork: (workId: string) => Promise<WorkCompDetails[]>;
  findByCompetitionAndWork: (
    competitionId: string,
    workId: string
  ) => Promise<WorkCompDetails>;
  update: (workCompDetails: WorkCompDetails) => Promise<WorkCompDetails>;
  delete: (id: string) => Promise<WorkCompDetails | null>;
}
