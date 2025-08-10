// api/rating
interface CreateRatingDTO {
  userId: string;
  projectId: string;
  competitionId: string;
  score: number;
}

interface UpdateRatingDTO {
  userId: string;
  projectId: string;
  competitionId: string;
  score: number;
}

export { CreateRatingDTO as UpsertRatingDTO };
