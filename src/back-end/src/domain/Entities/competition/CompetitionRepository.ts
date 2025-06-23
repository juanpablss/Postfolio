import Competition from "@domain/entities/competition/Competition";

export interface CompetitionRepository {
  insert(competition: Competition): Promise<Competition | null>;
  findById(id: string): Promise<Competition | null>;
  findMany(): Promise<Competition[]>;
  update(competition: Competition): Promise<Competition | null>;
  deleteById(id: string): Promise<Competition | null>;
}
