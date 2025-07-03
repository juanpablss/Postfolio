import { Competition } from "@competition/domain/entities/Competition";
import { WorkCompDetails } from "@competition/domain/entities/WorkCompDetails";

export interface CompetitionRepository {
  insert(competition: Competition): Promise<Competition>;
  update(competition: Competition): Promise<Competition>;
  deleteById(id: string): Promise<Competition | null>;

  findById(id: string): Promise<Competition | null>;
  findMany(): Promise<Competition[]>;

  insertWorkCompDetails(
    workCompDetails: WorkCompDetails
  ): Promise<WorkCompDetails>;
  updateWorkCompDetails(
    workCompDetails: WorkCompDetails
  ): Promise<WorkCompDetails>;
  deleteWorkCompDetails(id: string): Promise<WorkCompDetails | null>;

  findWorkCompDetails(
    competitionId: string,
    workId: string
  ): Promise<WorkCompDetails | null>;
  findWorkCompDetailsByCompetition(
    competitionId: string
  ): Promise<WorkCompDetails[]>;
}
