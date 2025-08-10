// api/rating
interface UpsertRatingDTO {
  userId: string;
  projectId: string;
  competitionId: string;
  score: number;
}

export { UpsertRatingDTO };
