import { Competition } from "@c";

export interface CompetitionRepository {
  insert(competition: Competition): Promise<Competition>;
  findById(id: string): Promise<Competition | null>;
  findMany(): Promise<Competition[]>;
  update(competition: Competition): Promise<Competition>;
  deleteById(id: string): Promise<Competition | null>;
}
