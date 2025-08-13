import { UpsertRatingDTO } from "@rating/api/RatingDTO";
import { Rating } from "@rating/domain/entities/Rating";

export interface IRatingService {
  upsert(dto: UpsertRatingDTO): Promise<Rating>;

  delete(id: string): Promise<Rating | null>;

  findById(id: string): Promise<Rating | null>;
}
