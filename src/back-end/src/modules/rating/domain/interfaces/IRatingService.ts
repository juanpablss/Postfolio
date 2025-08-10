import { CreateRatingDTO } from "@rating/api/RatingDTO";
import { Rating } from "@rating/domain/entities/Rating";

export interface IRatingService {
  create(dto: CreateRatingDTO): Promise<void>;
  update(score: number): Promise<Rating>;
  delete(id: string): Promise<Rating>;

  findById(id: string): Promise<Rating | null>;
}
