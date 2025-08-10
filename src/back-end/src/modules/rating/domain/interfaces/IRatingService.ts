import { UpsertRatingDTO } from "@rating/api/RatingDTO";
import { Rating } from "@rating/domain/entities/Rating";

export interface IRatingService {
  upsert(dto: UpsertRatingDTO): Promise<Rating>;
  // update(score: number): Promise<Rating>;
  delete(id: string): Promise<Rating>;

  findById(id: string): Promise<Rating | null>;
}
