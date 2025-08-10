import { Rating } from "@rating/domain/entities/Rating";
import { IRatingRepository } from "@rating/domain/interfaces/IRatingRepository";

export class RatingRepository implements IRatingRepository {
  create(rating: Rating): Promise<Rating> {
    throw new Error("Method not implemented.");
  }
  update(rating: Rating): Promise<Rating> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<Rating> {
    throw new Error("Method not implemented.");
  }
  findById(id: string): Promise<Rating | null> {
    throw new Error("Method not implemented.");
  }
  findByUserCompetitionProject(
    userId: string,
    competitionId: string,
    projectId: string
  ): Promise<Rating | null> {
    throw new Error("Method not implemented.");
  }
}
