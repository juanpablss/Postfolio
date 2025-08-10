// import { Rating } from '../competition/domain/entities/Rating';
export class Rating {
  constructor(
    public id: string,
    public score: number,
    public userId: string,
    public portfolioId: string,
    public competitionId: string
  ) {}
}
